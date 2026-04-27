import { useEffect, useRef, useState } from 'react';

interface HlsVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  desaturated?: boolean;
}

export const HlsVideo = ({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  desaturated = false,
}: HlsVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: { destroy: () => void } | null = null;
    let cancelled = false;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      const onMeta = () => { if (autoPlay) video.play().catch(() => {}); };
      video.addEventListener('loadedmetadata', onMeta, { once: true });
      return () => video.removeEventListener('loadedmetadata', onMeta);
    }

    import('hls.js').then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;
      const hls = new Hls();
      hlsInstance = hls;
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) video.play().catch(() => {});
      });
    });

    return () => {
      cancelled = true;
      hlsInstance?.destroy();
    };
  }, [shouldLoad, src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={`${className} ${desaturated ? 'saturate-0' : ''}`}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload="none"
    />
  );
};
