import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

/* ── SVG Icons ── */
type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };
const Ic = ({ size = 24, children, ...p }: IconProps & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>{children}</svg>
);
const ITruck = (p: IconProps) => <Ic {...p}><path d="M3 17V6a1 1 0 0 1 1-1h11v12"/><path d="M15 9h4l3 4v4h-3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></Ic>;
const ISparkles = (p: IconProps) => <Ic {...p}><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1"/></Ic>;
const IShield = (p: IconProps) => <Ic {...p}><path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></Ic>;
const IWrench = (p: IconProps) => <Ic {...p}><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8a3 3 0 0 1-4.2-4.2l8-8 1.9.5Z"/><path d="m6 17 3 3"/></Ic>;
const ICpu = (p: IconProps) => <Ic {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/><path d="M10 10h4v4h-4z"/></Ic>;
const IArrowR = (p: IconProps) => <Ic {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Ic>;
const IPin = (p: IconProps) => <Ic {...p}><path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0c0 5.5-7 13-7 13Z"/><circle cx="12" cy="9" r="2.5"/></Ic>;
const IPhone = (p: IconProps) => <Ic {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></Ic>;
const IMail = (p: IconProps) => <Ic {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Ic>;
const IGlobe = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Ic>;
const IHandshake = (p: IconProps) => <Ic {...p}><path d="m11 17 2 2 4-4 4 4-2 2-4-4"/><path d="M3 11 7 7l3 3"/><path d="M7 7 4 4"/><path d="m21 7-3-3-4 4"/><path d="m18 11-2 2"/></Ic>;
const IZap = (p: IconProps) => <Ic {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></Ic>;
const IClock = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ic>;
const ICompass = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 6-6 2 2-6 6-2Z"/></Ic>;
const IFactory = (p: IconProps) => <Ic {...p}><path d="M3 21V10l6 4V10l6 4V6l6 4v11H3Z"/><path d="M9 17h2m4 0h2"/></Ic>;

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

/* ── Fade-up on scroll ── */
function useFadeOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.wup-section');
    els.forEach(el => el.classList.add('fade-up'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Ambient background ── */
function Ambient() {
  return (
    <>
      <div className="wup-orb" style={{ top: '-10%', left: '-8%', width: 560, height: 560, background: 'rgba(59,130,246,0.22)', animation: 'wupFloatA 14s ease-in-out infinite' }} />
      <div className="wup-orb" style={{ top: '50%', right: '-12%', width: 640, height: 640, background: 'rgba(34,211,238,0.12)', animation: 'wupFloatB 18s ease-in-out infinite' }} />
      <div className="wup-orb" style={{ bottom: '-15%', left: '40%', width: 520, height: 520, background: 'rgba(37,99,235,0.18)', animation: 'wupFloatA 22s ease-in-out infinite' }} />
      <div className="grid-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div className="noise" style={{ position: 'fixed', inset: 0, zIndex: 1 }} />
    </>
  );
}

/* ── Hero ── */
function Hero() {
  const navigate = useNavigate();
  return (
    <header className="wup-section" style={{ paddingTop: 180, paddingBottom: 100, position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px 8px 8px', flexWrap: 'wrap', justifyContent: 'center' }} className="wup-hero-pill">
            <span style={{ background: '#3b82f6', color: '#fff', borderRadius: 9999, padding: '3px 10px', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>PET Manufacturer</span>
            <span style={{ color: '#bfdbfe', fontWeight: 500, fontSize: 13 }}>Chișinău · Republic of Moldova</span>
            <span className="live-dot" style={{ marginLeft: 4 }} />
          </div>
        </div>

        <h1 className="wup-h-hero" style={{ textAlign: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <span style={{ fontStyle: 'normal' }}>Engineered to</span><br />
          <span className="gradient-text">contain what matters.</span>
        </h1>

        <p style={{ marginTop: 36, fontSize: 20, color: 'rgba(191,219,254,0.65)', maxWidth: 720, lineHeight: 1.55, textAlign: 'center', marginInline: 'auto' }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>InvestComPlast</span> manufactures PET bottles and plastic packaging for the brands that demand the most — custom shapes, sizes, colors and weights, from 50 ml flacons to 5 L containers.
        </p>

        <div style={{ marginTop: 48, display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="icp-btn-primary" onClick={() => navigate('/contact', { state: { scrollTo: 'form' } })}>Get in touch</button>
        </div>

        <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid rgba(96,165,250,0.18)', borderBottom: '1px solid rgba(96,165,250,0.18)' }} className="wup-hero-stats">
          {[
            { k: '15+', l: 'Years per engineer', sub: 'senior team experience' },
            { k: '50ml–5L', l: 'Volume range', sub: 'flacon → bulk' },
            { k: 'Auto.', l: 'Blow molding', sub: 'automatic + semi-automatic' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '32px 28px', borderLeft: i === 0 ? 'none' : '1px solid rgba(96,165,250,0.18)' }}>
              <div className="wup-h-display" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', color: '#fff', fontStyle: 'italic', lineHeight: 0.95 }}>{s.k}</div>
              <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600 }}>{s.l}</div>
              <div className="mono" style={{ marginTop: 4, fontSize: 11, color: 'rgba(147,197,253,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.wup-hero-stats { } @media(max-width:960px){.wup-hero-stats{grid-template-columns:1fr!important;}.wup-hero-stats>*{border-left:none!important;}.wup-hero-stats>*+*{border-top:1px solid rgba(96,165,250,0.18);}}`}</style>
    </header>
  );
}

/* ── Story / Mission ── */
function Story() {
  return (
    <section className="wup-section" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 1fr', gap: 80, alignItems: 'start' }} className="wup-story-grid">
          <div style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>01 · The Company</div>
            <div className="wup-progress-bar" style={{ width: 60, marginBottom: 28 }} />
            <div className="mono" style={{ fontSize: 12, color: 'rgba(147,197,253,0.5)', lineHeight: 1.7 }}>
              BASED IN<br />
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Chișinău, MD</span><br /><br />
              ENGINEERS<br />
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>15+ years each</span><br /><br />
              TECHNOLOGY<br />
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Automatic + semi-automatic blow molding</span>
            </div>
          </div>

          <div>
            <h2 className="wup-h-section" style={{ maxWidth: 900 }}>
              We make the bottles<br />
              <span className="gradient-text">your products live in.</span>
            </h2>

            <div style={{ marginTop: 48 }}>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(219,234,254,0.78)', maxWidth: 820 }}>
                We are an <span style={{ color: '#fff', fontWeight: 600 }}>ambitious Moldovan company</span> built on vision, discipline and a long-term view of what manufacturing in this region can become. Our Chișinău facility runs both <span style={{ color: '#fff', fontWeight: 600 }}>automatic and semi-automatic blow molding</span> lines side by side — capabilities most local competitors don't have — letting us hold tight tolerances, switch fast between SKUs, and produce custom PET shapes at the volume and quality that serious brands actually need to grow.
              </p>
            </div>

            <div className="liquid-glass-card-blue" style={{ marginTop: 60, padding: '40px 44px', position: 'relative' }}>
              <div className="wup-grid-bg-tight" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none', borderRadius: 'inherit' }} />
              <div style={{ position: 'relative', display: 'flex', gap: 32, alignItems: 'center' }} className="wup-quote-row">
                <div style={{ fontSize: 80, lineHeight: 0.7, fontStyle: 'italic', color: '#3b82f6', fontWeight: 900 }}>"</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.4, fontStyle: 'italic' }}>
                    Twenty years of running blow-molding lines teaches you one thing: there are no shortcuts to consistency. Every bottle either earns the brand it carries — or it doesn't.
                  </div>
                  <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 9999, background: 'linear-gradient(135deg, #3b82f6, #67e8f9)' }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>Lead Engineering Team</div>
                      <div className="mono" style={{ fontSize: 11, color: 'rgba(147,197,253,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>InvestComPlast · Chișinău</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 56 }}>
              <div className="liquid-glass-card-blue" style={{ padding: '32px 36px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(96,165,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd', flexShrink: 0 }}>
                  <IGlobe size={24} />
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Any industry is welcome.</div>
                  <div className="mono" style={{ marginTop: 6, fontSize: 12, color: 'rgba(147,197,253,0.6)', letterSpacing: '0.08em' }}>If it needs a bottle, we'll build it.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:960px){.wup-story-grid{grid-template-columns:1fr!important;gap:40px!important;}.wup-quote-row{flex-direction:column!important;align-items:flex-start!important;gap:16px!important;}}`}</style>
    </section>
  );
}

/* ── From The Floor ── */
function FromTheFloor() {
  return (
    <section className="wup-section" style={{ padding: '40px 0 80px', position: 'relative' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>// From the floor</div>
            <h3 style={{ fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.02em', margin: 0, maxWidth: 640 }}>
              Heat. Tooling. Tolerance. <span style={{ color: 'rgba(147,197,253,0.5)' }}>The work, up close.</span>
            </h3>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(147,197,253,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            <span className="live-dot" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }} /> Chișinău · Production Line
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 20 }} className="wup-floor-grid">
          {[
            { src: '/gallery/machine2.jpg', label: 'Automatic line', cap: 'Stretch-blow process · 01' },
            { src: '/gallery/machine3.jpg', label: 'Mold tooling · grippers', cap: 'Cavity inspection · 02' },
            { src: '/gallery/machine_semi_closeup.jpg', label: 'Semi-automatic line', cap: 'Twin cavity blow · 03' },
            { src: '/gallery/machine4.png', label: 'Infrared heat array', cap: 'Preform conditioning · 04' },
          ].map((p, i) => (
            <div key={i} className="tilt" style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(96,165,250,0.22)', aspectRatio: '5 / 4', boxShadow: '0 30px 60px rgba(0,0,0,0.4)' }}>
              <img src={p.src} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.85) contrast(1.05)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,12,27,0) 40%, rgba(4,12,27,0.85) 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(59,130,246,0.18), transparent 50%)', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
              <svg viewBox="0 0 400 400" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <g fill="none" stroke="rgba(191,219,254,0.5)" strokeWidth="1">
                  <path d="M16 16 H42 M16 16 V42" /><path d="M384 16 H358 M384 16 V42" />
                  <path d="M16 384 H42 M16 384 V358" /><path d="M384 384 H358 M384 384 V358" />
                </g>
              </svg>
              <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22 }}>
                <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){.wup-floor-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Advantages ── */
const ADVANTAGES = [
  { n: '01', t: 'Automatic & semi-automatic blow molding', s: 'We run both automatic and semi-automatic blow molding lines — so we can match the right process to the order, from short specialized runs to high-volume production.', icon: <ICpu size={22} />, feature: true, metric: 'Auto + Semi', metricLabel: 'blow molding lines' },
  { n: '02', t: 'Custom-engineered PET bottles', s: 'Custom shapes, volumes from 50 ml to 5 L, weights, colors and finishes. We build the mold around your product — not the other way around.', icon: <IWrench size={22} />, metric: '50ml–5L', metricLabel: 'volume range' },
  { n: '03', t: 'Engineers with 15+ years of experience', s: 'A senior team that has been running industrial molding lines for over a decade and a half. You get specialized consulting, not a sales pitch.', icon: <ISparkles size={22} />, metric: '15+', metricLabel: 'years per engineer' },
  { n: '04', t: 'Certified, food-grade quality', s: 'Quality certificates on request. We use only food-grade resins that comply with applicable EU and national standards for direct-contact packaging.', icon: <IShield size={22} />, metric: 'Food-grade', metricLabel: 'certified resin' },
  { n: '05', t: 'Fast & complete delivery', s: 'Direct transport to clients on our own logistics fleet. Predictable lead times, palletized loads, and safe deliveries across the entire country.', icon: <ITruck size={22} />, metric: 'Own fleet', metricLabel: 'across Moldova' },
  { n: '06', t: 'Made-to-order, full support', s: 'From initial spec sheet to final pallet. Expert consulting on resin choice, neck finish, label compatibility and the optimal packaging for your category.', icon: <IHandshake size={22} />, metric: 'End-to-end', metricLabel: 'product development' },
];

function Advantages() {
  const staggerLayout = [
    { gridColumn: 'span 2', marginTop: 0 },
    { gridColumn: 'span 2', marginTop: 24 },
    { gridColumn: 'span 2', marginTop: 0 },
    { gridColumn: 'span 3', marginTop: 0 },
    { gridColumn: 'span 3', marginTop: 32 },
  ];

  return (
    <section className="wup-section" style={{ padding: '140px 0', position: 'relative' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 80 }} className="wup-adv-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>02 · Why InvestComPlast</div>
            <h2 className="wup-h-section">
              Six reasons<br />
              <span style={{ color: 'rgba(191,219,254,0.4)' }}>brands keep</span><br />
              <span className="gradient-text">coming back.</span>
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(191,219,254,0.6)', maxWidth: 480, justifySelf: 'end' }}>
            We're not the only PET supplier in the region — but we're the one most clients stay with. Here's the short version of why.
          </p>
        </div>

        {/* Feature card #01 */}
        <div className="liquid-glass-card-blue tilt wup-shine" style={{ padding: 0, overflow: 'hidden', position: 'relative', marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: 360 }} className="wup-feat-grid">
            <div style={{ padding: '56px', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <span className="mono" style={{ fontSize: 11, color: '#67e8f9', letterSpacing: '0.2em' }}>★ FLAGSHIP CAPABILITY</span>
                <span className="mono" style={{ fontSize: 11, color: 'rgba(147,197,253,0.5)' }}>// 01</span>
              </div>
              <h3 className="wup-h-display" style={{ fontSize: 'clamp(34px, 3.6vw, 52px)', maxWidth: 540 }}>
                Automatic & semi-automatic,<br />
                <span className="gradient-text" style={{ fontStyle: 'italic' }}>blow molding at scale.</span>
              </h3>
              <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.7, color: 'rgba(191,219,254,0.65)', maxWidth: 480 }}>
                We operate both <em style={{ color: '#fff', fontStyle: 'normal', fontWeight: 600 }}>automatic</em> and <em style={{ color: '#fff', fontStyle: 'normal', fontWeight: 600 }}>semi-automatic</em> blow molding lines — the right process matched to the right run, from specialized short batches to high-volume production.
              </p>
            </div>

            <div style={{ position: 'relative', borderLeft: '1px solid rgba(96,165,250,0.15)', overflow: 'hidden', minHeight: 560 }}>
              <div className="wup-dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 1 }} />
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', padding: 32, gap: 16 }}>
                <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/gallery/machine.png" alt="Automatic blow molding machine" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))' }} />
                  <div className="mono" style={{ position: 'absolute', top: 0, left: 0, fontSize: 9, color: '#67e8f9', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>// Auto</div>
                </div>
                <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/gallery/machine_semi.png" alt="Semi-automatic blow molding machine" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))' }} />
                  <div className="mono" style={{ position: 'absolute', top: 0, right: 0, fontSize: 9, color: '#93c5fd', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>Semi //</div>
                </div>
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 60%, rgba(59,130,246,0.35), transparent 65%)', zIndex: 1 }} />
              <svg viewBox="0 0 400 400" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}>
                <g fill="none" stroke="rgba(103,232,249,0.55)" strokeWidth="1">
                  <path d="M20 20 H50 M20 20 V50" /><path d="M380 20 H350 M380 20 V50" />
                  <path d="M20 380 H50 M20 380 V350" /><path d="M380 380 H350 M380 380 V350" />
                </g>
              </svg>
              <div className="wup-spec-card" style={{ position: 'absolute', bottom: 24, right: 24, zIndex: 4 }}>
                <div className="mono" style={{ fontSize: 9, color: '#93c5fd', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>FACILITY</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2, whiteSpace: 'nowrap' }}>Auto + semi-auto lines</div>
              </div>
            </div>
          </div>
        </div>

        {/* Remaining 5 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 28 }} className="wup-adv-grid">
          {ADVANTAGES.slice(1).map((a, i) => (
            <div key={i} className="liquid-glass-card-blue tilt wup-shine" style={{ gridColumn: staggerLayout[i].gridColumn, marginTop: staggerLayout[i].marginTop, padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(96,165,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd' }}>
                  {a.icon}
                </div>
                <span className="mono" style={{ fontSize: 11, color: 'rgba(147,197,253,0.5)', letterSpacing: '0.18em' }}>// {a.n}</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{a.t}</h3>
              <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.65, color: 'rgba(191,219,254,0.6)' }}>{a.s}</p>
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px dashed rgba(96,165,250,0.2)', display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <div className="wup-h-display" style={{ fontSize: 24, fontStyle: 'italic', color: '#67e8f9' }}>{a.metric}</div>
                <div className="mono" style={{ fontSize: 11, color: 'rgba(147,197,253,0.55)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{a.metricLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width:1100px){.wup-feat-grid{grid-template-columns:1fr!important;}}
        @media(max-width:960px){.wup-adv-head{grid-template-columns:1fr!important;}.wup-adv-grid{grid-template-columns:1fr!important;}.wup-adv-grid>*{grid-column:span 1!important;margin-top:0!important;}}
      `}</style>
    </section>
  );
}

/* ── Stats ── */
function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const v2 = useCountUp(15, 1500, visible);
  const v3 = useCountUp(50, 1500, visible);

  return (
    <section ref={ref} className="wup-section" style={{ padding: '120px 0', position: 'relative', background: 'linear-gradient(180deg, transparent, rgba(4,12,27,0.4), transparent)' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="liquid-glass-card-blue" style={{ padding: '70px 60px', position: 'relative', overflow: 'hidden' }}>
          <div className="wup-grid-bg-tight" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 60%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 20 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>03 · By the Numbers</div>
                <h2 className="wup-h-section" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
                  Built to spec, <span className="gradient-text">measured.</span>
                </h2>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(147,197,253,0.55)', letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'right' }}>
                LIVE FACILITY METRICS<br />
                <span style={{ color: '#34d399', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <span className="live-dot" /> CHIȘINĂU · OPERATIONAL
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }} className="wup-stats-grid">
              {[
                { v: `${v2}+`, l: 'Years per Engineer', sub: 'senior team experience' },
                { v: `${v3}–5000`, l: 'ml Volume Range', sub: 'from sample to bulk' },
                { v: 'Auto + Semi', l: 'Blow Molding', sub: 'automatic + semi-automatic lines' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '24px 30px', borderLeft: i === 0 ? 'none' : '1px solid rgba(96,165,250,0.18)' }}>
                  <div className="wup-h-display gradient-text" style={{ fontSize: 'clamp(48px, 5.5vw, 80px)', fontStyle: 'italic', lineHeight: 0.95 }}>{s.v}</div>
                  <div style={{ marginTop: 16, fontSize: 14, fontWeight: 600, color: '#fff' }}>{s.l}</div>
                  <div className="mono" style={{ marginTop: 4, fontSize: 11, color: 'rgba(147,197,253,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:960px){.wup-stats-grid{grid-template-columns:1fr!important;}.wup-stats-grid>*{border-left:none!important;border-top:1px solid rgba(96,165,250,0.18);}.wup-stats-grid>*:first-child{border-top:none!important;}}`}</style>
    </section>
  );
}

/* ── Process ── */
const STEPS = [
  { n: '01', t: 'Consultation', s: 'A call with our packaging engineers to understand your product, market, volume and timeline.', icon: <IHandshake size={20} />, dur: 'Step 1' },
  { n: '02', t: 'Design', s: 'Technical drawing, mold concept and resin selection — reviewed and approved together before any tooling.', icon: <ICompass size={20} />, dur: 'Step 2' },
  { n: '03', t: 'Production', s: 'Automatic and semi-automatic blow molding lines run your spec at production scale.', icon: <IFactory size={20} />, dur: 'Step 3' },
  { n: '04', t: 'Quality control', s: 'Wall thickness, neck finish, drop-test and visual QC sampled on every batch. Certificates on request.', icon: <IShield size={20} />, dur: 'Step 4' },
  { n: '05', t: 'Delivery', s: 'Palletized, shrink-wrapped and dispatched on our own fleet. Direct to your dock, anywhere in Moldova.', icon: <ITruck size={20} />, dur: 'Step 5' },
];

function Process() {
  const [active, setActive] = useState(0);
  return (
    <section className="wup-section" style={{ padding: '140px 0', position: 'relative' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end', marginBottom: 70 }} className="wup-proc-head">
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>04 · How We Work</div>
            <h2 className="wup-h-section">
              From spec sheet<br />
              <span className="gradient-text">to loading dock.</span>
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(191,219,254,0.6)', maxWidth: 480, justifySelf: 'end' }}>
            A standard custom run takes about two weeks from first call to first pallet. Here's exactly what happens, day by day.
          </p>
        </div>

        <div style={{ position: 'relative', padding: '20px 0 60px' }}>
          <div className="wup-step-line" style={{ position: 'absolute', top: 124, left: '5%', right: '5%' }} />
          <div style={{ position: 'absolute', top: 124, left: '5%', width: `${(active / (STEPS.length - 1)) * 90}%`, height: 1, background: 'linear-gradient(90deg, #3b82f6, #67e8f9)', transition: 'width .5s' }} />
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${STEPS.length}, 1fr)`, gap: 0 }} className="wup-proc-steps">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button key={i} onClick={() => setActive(i)} style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: 0, textAlign: 'left', color: 'inherit' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                    <div className="mono" style={{ fontSize: 11, color: isActive ? '#67e8f9' : 'rgba(147,197,253,0.45)', letterSpacing: '0.2em', transition: 'color .3s' }}>{step.n}</div>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: isActive ? 'linear-gradient(180deg, #3b82f6, #1d4ed8)' : (isPast ? 'rgba(59,130,246,0.15)' : 'rgba(4,12,27,0.7)'), border: `1px solid ${isActive ? 'rgba(147,197,253,0.6)' : 'rgba(96,165,250,0.25)'}`, boxShadow: isActive ? '0 0 30px rgba(59,130,246,0.5)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#fff' : (isPast ? '#67e8f9' : 'rgba(147,197,253,0.6)'), transition: 'all .35s' }}>
                      {step.icon}
                    </div>
                    <div style={{ textAlign: 'center', maxWidth: 160, marginTop: 14 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: isActive ? '#fff' : 'rgba(219,234,254,0.7)', transition: 'color .3s' }}>{step.t}</div>
                      <div className="mono" style={{ fontSize: 10, color: 'rgba(147,197,253,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>{step.dur}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="liquid-glass-card-blue" style={{ padding: '40px 48px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 40, alignItems: 'center' }} className="wup-proc-detail">
            <div>
              <div className="mono" style={{ fontSize: 11, color: '#67e8f9', letterSpacing: '0.2em' }}>STEP {STEPS[active].n} · {STEPS[active].dur.toUpperCase()}</div>
              <h3 className="wup-h-display" style={{ fontSize: 36, marginTop: 8, fontStyle: 'italic' }}>{STEPS[active].t}.</h3>
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(219,234,254,0.7)' }}>{STEPS[active].s}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setActive(Math.max(0, active - 1))} className="icp-btn-ghost" style={{ padding: '12px 16px' }} disabled={active === 0}>
                <IArrowR size={14} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button onClick={() => setActive(Math.min(STEPS.length - 1, active + 1))} className="icp-btn-ghost" style={{ padding: '12px 16px' }} disabled={active === STEPS.length - 1}>
                <IArrowR size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:960px){.wup-proc-head{grid-template-columns:1fr!important;}.wup-proc-steps{grid-template-columns:repeat(5,1fr)!important;gap:4px;}.wup-proc-detail{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Values ── */
const VALUES = [
  { t: 'Quality', s: 'Food-grade resins, certified processes, and a sample on every batch. Quality is a default, not an upcharge.', icon: <IShield size={22} /> },
  { t: 'Innovation', s: 'Both automatic and semi-automatic blow molding lines under one roof, matched to the order at hand. We re-tool every year.', icon: <IZap size={22} /> },
  { t: 'Partnership', s: 'We work like an extension of your team — direct line to engineering, no account-manager telephone.', icon: <IHandshake size={22} /> },
  { t: 'Reliability', s: 'On-time delivery, predictable lead times, and our own fleet across Moldova — your line never waits on ours.', icon: <IClock size={22} /> },
];

function Values() {
  return (
    <section className="wup-section" style={{ padding: '120px 0', position: 'relative' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>05 · Operating Principles</div>
          <h2 className="wup-h-section">
            Four ideas we<br /><span className="gradient-text">don't compromise on.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid rgba(96,165,250,0.18)', borderRadius: 24, overflow: 'hidden' }} className="wup-val-grid">
          {VALUES.map((v, i) => (
            <div key={i} className="wup-val-cell" style={{ padding: '48px 36px', borderLeft: i === 0 ? 'none' : '1px solid rgba(96,165,250,0.18)', position: 'relative', transition: 'background .35s' }}>
              <div className="mono" style={{ position: 'absolute', top: 20, right: 24, fontSize: 11, color: 'rgba(147,197,253,0.4)', letterSpacing: '0.2em' }}>0{i + 1}</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(59,130,246,0.18)', border: '1px solid rgba(96,165,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd', marginBottom: 28 }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.015em' }}>{v.t}.</h3>
              <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.65, color: 'rgba(191,219,254,0.6)' }}>{v.s}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`.wup-val-cell:hover{background:rgba(59,130,246,0.05);}@media(max-width:960px){.wup-val-grid{grid-template-columns:repeat(2,1fr)!important;}.wup-val-grid>*{border-left:none!important;border-top:1px solid rgba(96,165,250,0.18);}.wup-val-grid>*:nth-child(2n){border-left:1px solid rgba(96,165,250,0.18)!important;}.wup-val-grid>*:nth-child(-n+2){border-top:none!important;}}`}</style>
    </section>
  );
}

/* ── CTA ── */
function CTA() {
  const navigate = useNavigate();
  return (
    <section className="wup-section" style={{ padding: '120px 0 160px', position: 'relative' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="liquid-glass-card-blue" style={{ padding: '80px 64px', position: 'relative', overflow: 'hidden' }}>
          <div className="wup-grid-bg-tight" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
          <div style={{ position: 'absolute', top: '-50%', left: '20%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 60%)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: '-50%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,211,238,0.25), transparent 60%)', filter: 'blur(60px)' }} />

          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center' }} className="wup-cta-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: 18 }}>06 · Let's Build Together</div>
              <h2 className="wup-h-section" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
                Tell us what you<br />
                <span className="gradient-text">need to bottle.</span>
              </h2>
              <p style={{ marginTop: 28, fontSize: 18, lineHeight: 1.65, color: 'rgba(191,219,254,0.7)', maxWidth: 540 }}>
                Send us a spec — even a rough one. You'll hear back from a senior engineer within one business day, with a feasibility note, suggested resin, and a quote range.
              </p>
              <div style={{ marginTop: 44, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button className="icp-btn-primary" onClick={() => navigate('/contact', { state: { scrollTo: 'form' } })}>Get in touch</button>
                <Link to="/products" className="icp-btn-ghost" style={{ textDecoration: 'none' }}>Browse the catalog</Link>
              </div>
            </div>

            <div className="liquid-glass-card-blue" style={{ padding: 36, background: 'rgba(4,12,27,0.5)' }}>
              <div className="mono" style={{ fontSize: 11, color: '#67e8f9', letterSpacing: '0.2em', marginBottom: 24 }}>DIRECT LINE</div>
              {[
                { i: <IPin size={18} />, l: 'Strada Drumul Vilelor 1A', s: 'Dumbrava, Moldova · Headquarters' },
                { i: <IPhone size={18} />, l: '069 096 174', s: 'Sales · Mon–Fri' },
                { i: <IMail size={18} />, l: 'hello@investcomplast.md', s: 'Reply within 1 business day' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, paddingBlock: 18, borderTop: i === 0 ? 'none' : '1px solid rgba(96,165,250,0.15)' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(96,165,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd', flexShrink: 0 }}>
                    {row.i}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{row.l}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'rgba(147,197,253,0.55)', letterSpacing: '0.08em', marginTop: 4 }}>{row.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:960px){.wup-cta-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Page ── */
export default function WhyUsPage() {
  useFadeOnScroll();
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#040c1b', color: '#fff', fontFamily: "'Figtree', system-ui, sans-serif" }}>
      <Ambient />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <Story />
        <FromTheFloor />
        <Advantages />
        <Stats />
        <Process />
        <Values />
        <CTA />
      </main>
    </div>
  );
}
