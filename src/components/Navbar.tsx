import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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

      {/* Dropdown menu — mobile only */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden liquid-glass mt-3 rounded-2xl p-2 flex flex-col min-w-[220px]"
          >
            {isHome ? (
              <a href="#home" onClick={closeMenu} className="px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">Home</a>
            ) : (
              <Link to="/" onClick={closeMenu} className="px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">Home</Link>
            )}
            <Link to="/products" onClick={closeMenu} className="px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">Products</Link>
            <Link to="/why-us" onClick={closeMenu} className="px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">Why us?</Link>
            <Link to="/contact" onClick={closeMenu} className="px-4 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm font-medium">Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
