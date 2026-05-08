import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Lock body scroll while the slide-out menu is open
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-6"
    >
      <div className="nav-bar liquid-glass flex items-center pl-2 pr-1.5 py-1.5 gap-6 min-[400px]:gap-12 md:gap-10 min-[400px]:pl-3 md:pl-5">
        {/* Left group: hamburger (mobile only) + logo, tightly grouped */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="md:hidden p-1.5 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center text-white"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <Link to="/" className="font-black text-base min-[400px]:text-lg md:text-xl tracking-tighter md:mr-5 hover:opacity-90 transition-opacity whitespace-nowrap">
            Investcomplast
          </Link>
        </div>

        {/* Center: Nav Links (desktop only) */}
        <div className="hidden md:flex items-center gap-6 text-[13px] font-medium opacity-80">
          {isHome ? (
            <a href="#home" className="hover:opacity-100 transition-opacity">Home</a>
          ) : (
            <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
          )}
          <Link to="/products" className="hover:opacity-100 transition-opacity">Products</Link>
          <Link to="/why-us" className="hover:opacity-100 transition-opacity">Why us?</Link>
          <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
        </div>

        {/* Right: CTA */}
        <button
          onClick={() => navigate('/contact', { state: { scrollTo: 'form' } })}
          className="bg-white text-black rounded-full px-3 min-[400px]:px-4 md:px-[18px] py-2 text-[12px] min-[400px]:text-[13px] font-semibold flex items-center gap-1 hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          Get in touch
        </button>
      </div>

      {/* Slide-in mobile menu (80% width drawer + scrim) */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop scrim — tap to close (no blur for mobile perf) */}
            <motion.div
              key="mobile-menu-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={closeMenu}
              className="md:hidden fixed inset-0 z-40 bg-black/60"
              style={{ willChange: 'opacity' }}
            />

            {/* Drawer panel — 80% of viewport, slides from left */}
            <motion.div
              key="mobile-menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col text-white shadow-2xl"
              style={{
                width: '80%',
                background:
                  'radial-gradient(ellipse at 80% -10%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(ellipse at -10% 110%, rgba(34,211,238,0.18), transparent 55%), #040c1b',
                borderRight: '1px solid rgba(96,165,250,0.18)',
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Header: logo + dedicated close button */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
                <span className="font-black text-lg tracking-tighter">Investcomplast</span>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center text-white"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Inner content fades in once drawer settles — single fade, no per-link transforms */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, delay: 0.18, ease: 'easeOut' }}
                className="flex-1 flex flex-col"
              >
                {/* Nav links */}
                <nav className="flex-1 flex flex-col justify-center px-7 gap-1">
                  {[
                    { label: 'Home', to: '/', anchor: '#home' },
                    { label: 'Products', to: '/products' },
                    { label: 'Why us?', to: '/why-us' },
                    { label: 'Contact', to: '/contact' },
                  ].map((item, i) => {
                    const linkProps = {
                      onClick: closeMenu,
                      className:
                        'group flex items-center justify-between py-5 border-b border-white/10 text-[28px] font-black tracking-tighter italic hover:opacity-80 transition-opacity',
                    };
                    return (
                      <div key={item.label}>
                        {item.anchor && isHome ? (
                          <a href={item.anchor} {...linkProps}>
                            <span>{item.label}</span>
                            <span className="text-white/40 text-sm font-mono not-italic font-normal">0{i + 1}</span>
                          </a>
                        ) : (
                          <Link to={item.to} {...linkProps}>
                            <span>{item.label}</span>
                            <span className="text-white/40 text-sm font-mono not-italic font-normal">0{i + 1}</span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>

                {/* Footer: CTA + location stamp */}
                <div className="px-6 pb-8 pt-4 flex flex-col gap-3 border-t border-white/10">
                  <button
                    onClick={() => { closeMenu(); navigate('/contact', { state: { scrollTo: 'form' } }); }}
                    className="w-full bg-white text-black rounded-full py-3.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                  >
                    Get in touch
                  </button>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45 text-center">
                    Chișinău · Moldova
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
