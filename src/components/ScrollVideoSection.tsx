import { useEffect, useRef, useState } from 'react';

// Frames extracted per second during preload — higher = smoother, more memory
const EXTRACT_FPS = 20;
// How many pixels of scroll delta advance one frame
const PX_PER_FRAME = 22;

interface Props {
  onComplete?: () => void;
}

export default function ScrollVideoSection({ onComplete }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const idxRef = useRef(0);           // current displayed frame index
  const lockedRef = useRef(false);
  const inViewRef = useRef(false);
  const accRef = useRef(0);           // accumulated scroll delta between RAF ticks
  const rafRef = useRef<number | null>(null);
  const touchYRef = useRef(0);

  const [progress, setProgress] = useState(0); // 0–1 during extraction
  const [ready, setReady] = useState(false);

  // ── Phase 1: preload & extract all frames ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dead = false;

    const vid = document.createElement('video');
    vid.src = '/gallery/van_explosion.mp4';
    vid.preload = 'auto';
    vid.muted = true;
    vid.playsInline = true;

    (async () => {
      await new Promise<void>(res =>
        vid.addEventListener('loadedmetadata', () => res(), { once: true })
      );
      if (dead) return;

      const { duration, videoWidth: vw, videoHeight: vh } = vid;
      const total = Math.max(2, Math.round(duration * EXTRACT_FPS));

      // Canvas pixel dimensions = video native resolution
      canvas.width = vw || 1280;
      canvas.height = vh || 720;
      const ctx = canvas.getContext('2d')!;
      const frames: ImageBitmap[] = [];

      for (let i = 0; i < total; i++) {
        if (dead) return;
        vid.currentTime = (i / (total - 1)) * duration;
        await new Promise<void>(res =>
          vid.addEventListener('seeked', () => res(), { once: true })
        );
        ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
        frames.push(await createImageBitmap(canvas));
        if (i % 4 === 0 || i === total - 1) setProgress((i + 1) / total);
      }

      if (dead) return;
      framesRef.current = frames;
      ctx.drawImage(frames[0], 0, 0);
      setReady(true);
    })();

    return () => { dead = true; };
  }, []);

  // ── Phase 2: scroll interaction once frames are ready ──────────────────────
  useEffect(() => {
    if (!ready) return;
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d')!;
    const frames = framesRef.current;
    const last = frames.length - 1;

    function paint(i: number) {
      const clamped = Math.max(0, Math.min(last, Math.round(i)));
      idxRef.current = clamped;
      ctx.drawImage(frames[clamped], 0, 0);
    }

    // Timestamp of last unlock — prevents immediate re-lock on iOS where
    // getBoundingClientRect can return stale positions right after unlock
    let lastUnlockAt = 0;

    function lock() {
      if (lockedRef.current) return;
      lockedRef.current = true;
      document.body.style.overflow = 'hidden';
    }

    function unlock() {
      if (!lockedRef.current) return;
      lockedRef.current = false;
      accRef.current = 0;
      lastUnlockAt = Date.now();
      document.body.style.overflow = '';
    }

    function flush() {
      rafRef.current = null;
      if (!lockedRef.current) return;
      const d = accRef.current;
      accRef.current = 0;
      const next = idxRef.current + d / PX_PER_FRAME;
      paint(next);
      if (d > 0 && idxRef.current >= last) { unlock(); onComplete?.(); }
      else if (d < 0 && idxRef.current <= 0) unlock();
    }

    function schedule() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(flush);
    }

    function consume(delta: number): boolean {
      if (!frames.length) return false;
      const atEnd = idxRef.current >= last;
      const atStart = idxRef.current <= 0;
      if (!lockedRef.current) {
        if (!((delta > 0 && !atEnd) || (delta < 0 && !atStart))) return false;
        lock();
      }
      accRef.current += delta;
      schedule();
      return true;
    }

    // Use visualViewport for accurate iOS measurements (window.innerHeight
    // changes as Safari's URL bar hides/shows, causing false positives).
    // Also enforce a 400ms cooldown after unlock so stale getBoundingClientRect
    // values on iOS don't immediately re-lock.
    function isCentred(): boolean {
      if (Date.now() - lastUnlockAt < 400) return false;
      const vv = window.visualViewport;
      const vh = vv ? vv.height : window.innerHeight;
      const vt = vv ? vv.offsetTop : 0;
      const rect = section.getBoundingClientRect();
      const sc = rect.top + rect.height / 2;
      const vc = vt + vh / 2;
      return Math.abs(sc - vc) < vh * 0.2;
    }

    function onWheel(e: WheelEvent) {
      const centred = isCentred();
      inViewRef.current = centred;
      if (!centred) { unlock(); return; }
      if (consume(e.deltaY)) e.preventDefault();
    }

    function onTouchStart(e: TouchEvent) {
      touchYRef.current = e.touches[0].clientY;
    }

    function onTouchMove(e: TouchEvent) {
      const centred = isCentred();
      inViewRef.current = centred;
      if (!centred) { unlock(); return; }
      const delta = touchYRef.current - e.touches[0].clientY;
      touchYRef.current = e.touches[0].clientY;
      if (consume(delta)) e.preventDefault();
    }

    // Scroll listener still handles unlock when section drifts off centre
    function onScroll() {
      if (!isCentred()) {
        inViewRef.current = false;
        unlock();
      }
    }

    window.addEventListener('scroll',     onScroll,     { passive: true  });
    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true  });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });

    return () => {
      window.removeEventListener('scroll',     onScroll);
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      unlock();
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="h-[30vh] md:h-[55vh]"
      style={{ position: 'relative', width: '100%' }}
    >
      {/* Constrain to site max-width, centred */}
      <div
        style={{
          maxWidth: '80rem',
          width: '100%',
          height: '100%',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 12%, black 28%, black 75%, rgba(0,0,0,0.5) 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 12%, black 28%, black 75%, rgba(0,0,0,0.5) 90%, transparent 100%)',
        }}
      >
        {/* Canvas sized to video native res; CSS centering gives object-fit:cover */}
        <canvas
          ref={canvasRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-auto md:w-auto md:h-auto md:min-w-full md:min-h-full"
          style={{ display: ready ? 'block' : 'none' }}
        />

        {/* Slim extraction progress bar — disappears once ready */}
        {!ready && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 96,
                height: 2,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress * 100}%`,
                  height: '100%',
                  background: 'rgba(147,197,253,0.5)',
                  transition: 'width 0.12s linear',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
