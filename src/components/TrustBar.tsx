const partners = [
  { name: 'Roman',   logo: '/gallery/partners/roman.png',        whiteBg: true  },
  { name: 'BioMilk', logo: '/gallery/partners/biomilk.jpg',      whiteBg: true  },
  { name: 'EFES Moldova', logo: '/gallery/partners/efes_moldova.png', whiteBg: false },
  { name: 'Lactis', logo: '/gallery/partners/lactis.png',        whiteBg: false },
  { name: 'Vintage', logo: '/gallery/partners/vintage.png',      whiteBg: false },
  { name: 'Delcon',  logo: '/gallery/partners/delcon.png',       whiteBg: false },
];

const logos = [...partners, ...partners, ...partners];

export function TrustBar() {
  return (
    <section className="relative z-10 py-8 md:py-14 border-y border-blue-400/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-5 md:mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-300">
              Trusted by
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-blue-200/40">
            <span className="icp-live-dot" />
            Shipping orders today
          </div>
        </div>

        <div className="trust-mask overflow-hidden">
          <div className="trust-logo-row">
            {logos.map((p, i) => (
              <div key={i} className={`trust-logo-item${p.whiteBg ? ' trust-logo-item--white' : ''}`}>
                <img src={p.logo} alt={p.name} loading="lazy" decoding="async" className="trust-logo-img" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
