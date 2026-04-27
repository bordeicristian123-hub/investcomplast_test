import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { useLocation } from 'react-router-dom';

/* ─── Inline SVG Icons (exact from example) ─── */
const IPin = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 22s-7-7.5-7-13a7 7 0 0 1 14 0c0 5.5-7 13-7 13Z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const IPhone = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IMail = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
);
const IClock = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);
const IArrow = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
  </svg>
);
const ICheck = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const IChev = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const IAlert = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" /><path d="M12 8v4" /><path d="M12 16h.01" />
  </svg>
);
const ILoader = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M21 12a9 9 0 1 1-6.2-8.55" />
  </svg>
);
/* ─── Ambient background ─── */
function Ambient() {
  return (
    <>
      <div className="icp-orb" style={{ top: '-10%', left: '-8%', width: 560, height: 560, background: 'rgba(59,130,246,0.22)', animation: 'icpFloatA 14s ease-in-out infinite' }} />
      <div className="icp-orb" style={{ top: '40%', right: '-10%', width: 640, height: 640, background: 'rgba(34,211,238,0.14)', animation: 'icpFloatB 18s ease-in-out infinite' }} />
      <div className="icp-orb" style={{ bottom: '-15%', left: '30%', width: 520, height: 520, background: 'rgba(37,99,235,0.18)', animation: 'icpFloatA 22s ease-in-out infinite' }} />
      <div className="icp-grid-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          background: 'rgba(147,197,253,0.35)',
          width: 3 + (i % 3) * 2, height: 3 + (i % 3) * 2,
          left: `${10 + i * 14}%`, top: `${12 + (i % 4) * 18}%`,
          animation: `icpFloatA ${5 + i}s ease-in-out infinite`,
          opacity: .5, pointerEvents: 'none',
        }} />
      ))}
    </>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <header style={{ paddingTop: 160, paddingBottom: 70, position: 'relative' }}>
      <div className="icp-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="icp-fade-up icp-d1" style={{ display: 'inline-flex' }}>
          <span className="liquid-glass-blue" style={{ padding: '8px 18px 8px 8px', display: 'inline-flex', alignItems: 'center', gap: 10, borderRadius: 9999, fontSize: 13 }}>
            <span style={{ background: '#3b82f6', color: '#fff', borderRadius: 9999, padding: '2px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ready</span>
            <span style={{ color: '#bfdbfe', fontWeight: 500 }}>Let’s Get Started</span>
          </span>
        </div>

        <h1 className="icp-heading-hero icp-fade-up icp-d2" style={{ marginTop: 28, marginBottom: 0 }}>
          <span style={{ fontStyle: 'normal', fontWeight: 900, letterSpacing: '-0.04em' }}>Let's build<br /></span>
          <span style={{
            backgroundImage: 'linear-gradient(90deg,#bfdbfe,#93c5fd,#67e8f9,#93c5fd,#bfdbfe)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'icpShimmer 7s linear infinite',
          }}>what's next, together.</span>
        </h1>

        <p className="icp-fade-up icp-d3" style={{ marginTop: 28, fontSize: 19, color: 'rgba(191,219,254,0.55)', maxWidth: 640, lineHeight: 1.6 }}>
          Speak to our packaging engineers about custom PET solutions, bulk orders, sustainability audits,
          or anything in between. We reply within one business day — usually much faster.
        </p>

        <div className="icp-fade-up icp-d4" style={{ marginTop: 44, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, maxWidth: 780 }}>
          {[
            { k: '<1 business day', v: 'Avg. response time' },
            { k: '15+', v: 'Partners' },
            { k: '15+ Years', v: 'Experience' },
          ].map((s, i) => (
            <div key={i} className="liquid-glass-card-blue" style={{ padding: '18px 20px', borderRadius: 18 }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
                {i === 0 && <span className="icp-live-dot" />}
                {s.k}
              </div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(147,197,253,0.55)', marginTop: 6, fontWeight: 500 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ─── Info Cards ─── */
const INFO_CARDS = [
  { icon: <IPin width={20} height={20} />, label: 'Headquarters', lines: ['Strada Drumul Vilelor 1A', 'Dumbrava, Moldova'], cta: 'Open in Maps', href: 'https://www.google.com/maps/search/?api=1&query=Strada+Drumul+Vilelor+1A,+Dumbrava,+Moldova' },
  { icon: <IPhone width={20} height={20} />, label: 'Sales', lines: ['069 096 174'], cta: 'Call sales', href: 'tel:+37369096174' },
  { icon: <IMail width={20} height={20} />, label: 'Email', lines: ['hello@investcomplast.md', 'quotes@investcomplast.md'], cta: 'Compose email', href: 'mailto:hello@investcomplast.md' },
  { icon: <IClock width={20} height={20} />, label: 'Hours', lines: ['Mon–Fri · 08:00 – 19:00 EET', 'Sat · 10:00 – 14:00'], cta: 'Book a call', href: '#form' },
];

function InfoCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
      {INFO_CARDS.map((c, i) => (
        <div key={i} className={`liquid-glass-card-blue icp-fade-up`} style={{ padding: 26, borderRadius: 20, animationDelay: `${0.1 + i * 0.06}s` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(96,165,250,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#93c5fd'
            }}>{c.icon}</div>
            <span className="icp-eyebrow">{c.label}</span>
          </div>
          <div>
            {c.lines.map((l, j) => (
              <div key={j} style={{
                fontSize: 15, fontWeight: j === 0 ? 600 : 400,
                color: j === 0 ? '#fff' : 'rgba(191,219,254,0.55)',
                marginBottom: 4, letterSpacing: j === 0 ? '-0.01em' : 0,
              }}>{l}</div>
            ))}
          </div>
          <a
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              marginTop: 22, background: 'transparent', border: 0, color: '#60a5fa',
              padding: 0, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none',
            }}
          >
            {c.cta} <IArrow width={14} height={14} />
          </a>
        </div>
      ))}
    </div>
  );
}

/* ─── Contact Form ─── */
const INQUIRY_TYPES = [
  { id: 'quote', label: 'Request a quote' },
  { id: 'custom', label: 'Custom design' },
  { id: 'bulk', label: 'Bulk order' },
{ id: 'partnership', label: 'Partnership' },
  { id: 'other', label: 'Other' },
];

function ContactForm({ layout = 'stacked' }: { layout?: string }) {
  const [inquiry, setInquiry] = useState('quote');
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    volume: '', message: '', consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const set = (k: string, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please tell us your name';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'That email looks off';
    if (!form.company.trim()) e.company = 'Company name helps us route you';
    if (!form.message.trim()) e.message = 'A short note helps us prepare';
    else if (form.message.trim().length < 12) e.message = 'A little more detail, please (12+ chars)';
    if (!form.consent) e.consent = 'Please accept the privacy terms';
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const firstKey = ['name', 'email', 'company', 'phone', 'volume', 'message', 'consent'].find(k => e[k]);
      const el = document.querySelector(`[data-field="${firstKey}"]`) as HTMLElement;
      el?.focus?.();
      return;
    }
    setState('submitting');
    setTimeout(() => setState('success'), 1400);
  };

  const reset = () => {
    setForm({ name: '', email: '', company: '', phone: '', volume: '', message: '', consent: false });
    setErrors({}); setState('idle'); setInquiry('quote');
  };

  if (state === 'success') {
    return (
      <div className="liquid-glass-card-blue icp-fade-up" style={{ padding: '48px 40px', borderRadius: 28, textAlign: 'center' }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%', margin: '0 auto 24px',
          background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399',
        }}>
          <ICheck width={32} height={32} />
        </div>
        <h3 className="icp-heading-section" style={{ fontSize: 'clamp(32px,3.4vw,44px)', marginBottom: 14 }}>Message received.</h3>
        <p style={{ color: 'rgba(191,219,254,0.65)', fontSize: 16, maxWidth: 520, margin: '0 auto 10px' }}>
          Thanks, {form.name.split(' ')[0] || 'there'} — we'll be in touch at <strong style={{ color: '#bfdbfe' }}>{form.email}</strong> within one business day.
        </p>
        <p style={{ color: 'rgba(191,219,254,0.4)', fontSize: 13, marginBottom: 28 }}>Reference #ICP-{Math.floor(Math.random() * 900000 + 100000)}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="icp-btn-ghost" onClick={reset}>Send another</button>
          <button className="icp-btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <IArrow width={16} height={16} />
          </button>
        </div>
      </div>
    );
  }

  const fieldWrap = (k: string, node: React.ReactNode) => (
    <div>
      {node}
      {errors[k] && (
        <div className="icp-field-error"><IAlert width={13} height={13} /> {errors[k]}</div>
      )}
    </div>
  );

  const twoCol = layout === 'two-col';

  return (
    <form id="form" onSubmit={submit} className="liquid-glass-card-blue icp-fade-up" style={{ padding: '40px 36px', borderRadius: 28 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
        <div>
          <span className="icp-eyebrow">Send us a message</span>
          <h2 className="icp-heading-section" style={{ fontSize: 'clamp(30px,3vw,42px)', marginTop: 10 }}>
            Tell us about your project.
          </h2>
        </div>
        <span className="liquid-glass" style={{ padding: '8px 14px', fontSize: 12, fontWeight: 500, color: '#bfdbfe', display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999 }}>
          <span className="icp-live-dot" /> Live support online
        </span>
      </div>

      {/* Inquiry chips */}
      <div style={{ marginBottom: 26 }}>
        <label className="icp-field-label">What brings you here?</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {INQUIRY_TYPES.map(t => (
            <button key={t.id} type="button" onClick={() => setInquiry(t.id)}
              className={`icp-chip${inquiry === t.id ? ' active' : ''}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: twoCol ? '1fr 1fr' : '1fr', gap: 18, marginBottom: 18 }}>
        {fieldWrap('name', (
          <>
            <label className="icp-field-label" htmlFor="f-name">Full name</label>
            <input id="f-name" data-field="name" className={`icp-glass-field${errors.name ? ' error' : ''}`}
              placeholder="Jane Doe" value={form.name} onChange={e => set('name', e.target.value)} />
          </>
        ))}
        {fieldWrap('email', (
          <>
            <label className="icp-field-label" htmlFor="f-email">Work email</label>
            <input id="f-email" data-field="email" type="email" className={`icp-glass-field${errors.email ? ' error' : ''}`}
              placeholder="jane@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
          </>
        ))}
        {fieldWrap('company', (
          <>
            <label className="icp-field-label" htmlFor="f-company">Company</label>
            <input id="f-company" data-field="company" className={`icp-glass-field${errors.company ? ' error' : ''}`}
              placeholder="Acme Beverages" value={form.company} onChange={e => set('company', e.target.value)} />
          </>
        ))}
        {fieldWrap('phone', (
          <>
            <label className="icp-field-label" htmlFor="f-phone">Phone <span style={{ textTransform: 'none', color: 'rgba(147,197,253,0.4)', fontWeight: 400, letterSpacing: 0 }}>(optional)</span></label>
            <input id="f-phone" data-field="phone" className="icp-glass-field"
              placeholder="+1 555 123 4567" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </>
        ))}
      </div>

      {(inquiry === 'quote' || inquiry === 'bulk') && (
        <div style={{ marginBottom: 18 }}>
          <label className="icp-field-label" htmlFor="f-volume">Estimated monthly volume</label>
          <select id="f-volume" data-field="volume" className="icp-glass-field"
            value={form.volume} onChange={e => set('volume', e.target.value)}
            style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2393c5fd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 18px center', backgroundSize: 16, paddingRight: 44 }}>
            <option value="" style={{ color: '#000' }}>Select range…</option>
            <option value="<10k" style={{ color: '#000' }}>Under 10,000 units</option>
            <option value="10-50k" style={{ color: '#000' }}>10,000 – 50,000 units</option>
            <option value="50-250k" style={{ color: '#000' }}>50,000 – 250,000 units</option>
            <option value="250k-1m" style={{ color: '#000' }}>250,000 – 1,000,000 units</option>
            <option value="1m+" style={{ color: '#000' }}>1,000,000+ units</option>
          </select>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        {fieldWrap('message', (
          <>
            <label className="icp-field-label" htmlFor="f-msg">Project details</label>
            <textarea id="f-msg" data-field="message" className={`icp-glass-field${errors.message ? ' error' : ''}`}
              placeholder="Bottle specs, material preferences, timelines, target markets…"
              value={form.message} onChange={e => set('message', e.target.value)} rows={5} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 12, color: 'rgba(147,197,253,0.4)', marginTop: 6 }}>
              {form.message.length} / 2000
            </div>
          </>
        ))}
      </div>

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24, cursor: 'pointer' }}>
        <input type="checkbox" data-field="consent" checked={form.consent}
          onChange={e => set('consent', e.target.checked)}
          style={{
            width: 18, height: 18, marginTop: 2, accentColor: '#3b82f6',
            outline: errors.consent ? '2px solid #f87171' : 'none',
          }} />
        <span style={{ fontSize: 13, color: 'rgba(191,219,254,0.65)', lineHeight: 1.5 }}>
          I agree to be contacted about my inquiry and have read the{' '}
          <a href="#" style={{ color: '#93c5fd', textDecoration: 'underline', textUnderlineOffset: 3 }}>privacy policy</a>.
          We never share your details with third parties.
        </span>
      </label>
      {errors.consent && (
        <div className="icp-field-error" style={{ marginTop: -14, marginBottom: 16 }}>
          <IAlert width={13} height={13} /> {errors.consent}
        </div>
      )}

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="submit" disabled={state === 'submitting'} className="icp-btn-primary">
          {state === 'submitting' ? (
            <><ILoader className="icp-spin" width={16} height={16} /> Sending…</>
          ) : (
            <>Send message <IArrow width={16} height={16} /></>
          )}
        </button>
        <span style={{ fontSize: 12, color: 'rgba(147,197,253,0.45)' }}>
          We typically reply within one business day.
        </span>
      </div>
    </form>
  );
}

/* ─── FAQ ─── */
const FAQ_ITEMS = [
  { q: 'What is your minimum order quantity?', a: 'For stock PET bottles, MOQ starts at 5,000 units. Custom molds begin at 50,000 units per SKU, with tooling amortized across the run.' },
  { q: 'Do you ship internationally?', a: 'Yes — we ship across the EU, CIS, and to partner distributors in MENA and the US. Lead times vary from 10 to 28 days depending on destination and customs.' },
  { q: 'Can you produce from 100% recycled PET?', a: 'Absolutely. We offer certified rPET blends from 30% up to 100%, with matching clarity and FDA/EU food-contact approvals.' },
  { q: 'How long does custom design take?', a: 'A typical custom project runs 4–8 weeks: 2 weeks for design & prototyping, 2–3 for tooling, and 1–2 for first production and QC.' },
  { q: 'Do you sign NDAs?', a: 'Yes, and routinely — we can send our mutual NDA on request, or countersign yours within 24 hours.' },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="icp-lg-card" style={{ padding: '14px 28px', borderRadius: 24 }}>
      {FAQ_ITEMS.map((q, i) => (
        <div key={i} className="icp-acc-item" style={i === FAQ_ITEMS.length - 1 ? { borderBottom: 'none' } : {}}>
          <button className="icp-acc-btn" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span style={{ paddingRight: 16 }}>{q.q}</span>
            <IChev className={`icp-chev${open === i ? ' open' : ''}`} width={20} height={20} />
          </button>
          <div className={`icp-acc-panel${open === i ? ' open' : ''}`}>{q.a}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Office Map ─── */
function OfficeMap() {
  return (
    <div className="liquid-glass-card-blue" style={{ padding: 0, borderRadius: 28, overflow: 'hidden', position: 'relative', aspectRatio: '16 / 9' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle at 35% 45%, rgba(59,130,246,0.25), transparent 45%),
          radial-gradient(circle at 70% 65%, rgba(34,211,238,0.15), transparent 45%),
          linear-gradient(180deg, #071a38 0%, #040c1b 100%)`,
      }} />
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
        <defs>
          <pattern id="streets" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M0 25 H50 M25 0 V50" stroke="rgba(96,165,250,0.15)" strokeWidth="1" />
          </pattern>
          <pattern id="diag" width="140" height="140" patternUnits="userSpaceOnUse">
            <path d="M-20 20 L160 200" stroke="rgba(96,165,250,0.08)" strokeWidth="1" />
            <path d="M20 -20 L200 160" stroke="rgba(96,165,250,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="450" fill="url(#streets)" />
        <rect width="800" height="450" fill="url(#diag)" />
        <path d="M0 320 Q200 260 400 300 T800 260" stroke="rgba(103,232,249,0.35)" strokeWidth="3" fill="none" />
        <path d="M0 330 Q200 270 400 310 T800 270" stroke="rgba(103,232,249,0.15)" strokeWidth="8" fill="none" />
        <path d="M0 180 L800 210" stroke="rgba(147,197,253,0.25)" strokeWidth="2" />
        <path d="M300 0 L340 450" stroke="rgba(147,197,253,0.25)" strokeWidth="2" />
      </svg>

      {/* Pin */}
      <div style={{ position: 'absolute', left: '42%', top: '48%', transform: 'translate(-50%,-100%)' }}>
        <div style={{
          background: 'linear-gradient(180deg,#60a5fa,#2563eb)',
          width: 44, height: 44, borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
          boxShadow: '0 10px 30px rgba(59,130,246,0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
          border: '2px solid rgba(191,219,254,0.6)',
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: 14, transform: 'translateX(-50%)',
          width: 14, height: 14, borderRadius: '50%',
          background: '#fff',
        }} />
      </div>
      {/* Ripple */}
      <div style={{ position: 'absolute', left: '42%', top: '48%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
        <div style={{ width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(96,165,250,0.4)', animation: 'icpRipple 3s ease-out infinite' }} />
      </div>

      {/* Label card */}
      <div className="icp-lg-card" style={{ position: 'absolute', left: 24, bottom: 24, padding: '16px 20px', borderRadius: 16, maxWidth: 300 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: 6 }}>Headquarters</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Dumbrava HQ &amp; Factory</div>
        <div style={{ fontSize: 13, color: 'rgba(191,219,254,0.55)' }}>Strada Drumul Vilelor 1A · Moldova</div>
      </div>

      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 8 }}>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Strada+Drumul+Vilelor+1A,+Dumbrava,+Moldova"
          target="_blank"
          rel="noopener noreferrer"
          className="icp-btn-ghost"
          style={{ padding: '8px 14px', fontSize: 12 }}
        >Directions</a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Strada+Drumul+Vilelor+1A,+Dumbrava,+Moldova"
          target="_blank"
          rel="noopener noreferrer"
          className="icp-btn-ghost"
          style={{ padding: '8px 14px', fontSize: 12 }}
        >Open in Maps ↗</a>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function ContactPage() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const target = state.scrollTo;
      const timer = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState({}, '');
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [location.state]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#040c1b', overflow: 'clip', color: '#fff', fontFamily: 'inherit' }}>
      <Ambient />
      <Navbar />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <Hero />

        {/* Info cards */}
        <section className="icp-container" style={{ marginTop: 12, marginBottom: 80, position: 'relative', zIndex: 2 }}>
          <InfoCards />
        </section>

        {/* Main grid: form + map */}
        <section className="icp-container" style={{ marginBottom: 100, position: 'relative', zIndex: 2 }}>
          <div className="icp-main-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            gap: 28,
            alignItems: 'start',
          }}>
            <ContactForm layout="two-col" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 110 }}>
              <OfficeMap />
              <div className="liquid-glass-card-blue" style={{ padding: 28, borderRadius: 24 }}>
                <span className="icp-eyebrow">Prefer a conversation?</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, fontStyle: 'italic', letterSpacing: '-0.015em', margin: '10px 0 12px' }}>
                  Book a 30-min discovery call.
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(191,219,254,0.55)', lineHeight: 1.6, marginBottom: 20 }}>
                  Walk our engineers through your project — no slides, just questions and answers. Free, no commitment.
                </p>
                <button className="icp-btn-primary" style={{ padding: '12px 22px', fontSize: 14 }}>
                  Pick a time <IArrow width={14} height={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="icp-container" style={{ marginBottom: 100, position: 'relative', zIndex: 2 }}>
          <div className="icp-faq-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)', gap: 40, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 110 }}>
              <span className="icp-eyebrow">Frequently asked</span>
              <h2 className="icp-heading-section" style={{ marginTop: 12, fontSize: 'clamp(36px,4vw,56px)' }}>
                Answers, before<br />you even ask.
              </h2>
              <p style={{ color: 'rgba(191,219,254,0.5)', fontSize: 16, marginTop: 18, lineHeight: 1.6, maxWidth: 380 }}>
                Still stuck? Drop us a line above — real humans, real answers.
              </p>
            </div>
            <FAQ />
          </div>
        </section>

        {/* Closer CTA */}
        <section className="icp-container" style={{ marginBottom: 20, position: 'relative', zIndex: 2 }}>
          <div className="liquid-glass-card-blue" style={{
            padding: '56px 48px', borderRadius: 32, textAlign: 'center',
            background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.14), rgba(59,130,246,0.04))',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 9999, fontSize: 11,
              fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#93c5fd', background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(96,165,250,0.3)', marginBottom: 18,
            }}>
              <span className="icp-live-dot" /> Still open
            </div>
            <h2 className="icp-heading-section">Shaping the future of packaging —<br />one conversation at a time.</h2>
            <p style={{ color: 'rgba(191,219,254,0.55)', fontSize: 17, marginTop: 18, maxWidth: 620, marginInline: 'auto', lineHeight: 1.6 }}>
              Whether it's 5,000 bottles or 5 million, the first step is the same: a quick chat.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
