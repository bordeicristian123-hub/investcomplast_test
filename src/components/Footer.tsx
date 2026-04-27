import { motion } from "motion/react";
import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <img src="/gallery/logo/logo.png" alt="InvestComPlast" loading="lazy" decoding="async" className="h-14 w-auto" />
        </div>
        <div className="flex gap-8 text-blue-200/35 text-sm font-medium">
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy</a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms</a>
          <Link to="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          {[
            { Icon: Instagram, href: '#' },
            { Icon: Facebook, href: '#' },
            { Icon: Mail, href: 'mailto:hello@investcomplast.md' },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full flex items-center justify-center liquid-glass text-white/60 hover:text-white transition-colors duration-300"
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
        <div className="text-blue-200/20 text-xs">
          © 2026 InvestComPlast. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
