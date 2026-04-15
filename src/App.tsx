/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Search, Menu, X } from "lucide-react";
import HeroVideo from "./components/HeroVideo";
import { useState } from "react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white selection:bg-blue-500/30 bg-[#040c1b]">
      
      {/* ═══════════════════════════════════════════ */}
      {/* NAVIGATION BAR                              */}
      {/* ═══════════════════════════════════════════ */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50">
        <div className="flex items-center justify-between px-8 py-4 bg-white/8 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl shadow-black/20">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tight text-blue-100">
            Invest<span className="text-white">ComPlast</span>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {["Home", "Catalog", "Why Us", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <button className="text-white/70 hover:text-white transition-colors duration-300">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* CTA Button */}
          <button className="hidden md:block px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 active:scale-95 hover:-translate-y-0.5">
            Get in touch
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 px-6 py-6 bg-white/8 backdrop-blur-2xl border border-white/15 rounded-2xl md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {["Home", "Catalog", "Why Us", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25 w-full">
                Get in touch
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION WITH VIDEO BACKGROUND          */}
      {/* ═══════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        {/* Video Background */}
        <HeroVideo src="/gallery/Background.mp4" overlayOpacity={0.35} />

        {/* ── Decorative floating particles ── */}
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-blue-400/20"
              style={{
                width: `${4 + i * 3}px`,
                height: `${4 + i * 3}px`,
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30 - i * 10, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* ── Glowing ring decoration (right side) ── */}
        <motion.div
          className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blue-400/10 z-[5] pointer-events-none hidden md:block"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        />
        <motion.div
          className="absolute top-1/2 right-[13%] -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-cyan-400/[0.06] z-[5] pointer-events-none hidden md:block"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />

        {/* Hero Content */}
        <main className="relative z-10 flex flex-col items-center min-h-screen px-6 md:px-20 pt-28 pb-12">
          
          {/* ── Top area: Text left + Bottle right ── */}
          <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between flex-1">
            
            {/* Left Content */}
            <div className="w-full md:w-[45%] flex flex-col items-start space-y-6 md:space-y-8 z-10">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300 bg-blue-500/10 border border-blue-400/20 rounded-full mb-6 backdrop-blur-sm">
                  Premium Packaging Solutions
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                  <span className="text-white/90">InvestComPlast:</span> <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-300 to-cyan-200">
                    Shaping the Future
                  </span> <br />
                  <span className="text-white">of Packaging.</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="text-base md:text-lg text-white/55 max-w-md leading-relaxed"
              >
                Leading manufacturer of innovative, sustainable plastic solutions
                for global industries.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex gap-4 flex-wrap"
              >
                <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                  Explore Products
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 active:scale-95">
                  Learn More
                </button>
              </motion.div>
            </div>

            {/* Right Content - 3D Bottle (larger, more prominent) */}
            <div className="w-full md:w-[55%] relative flex justify-center items-center mt-8 md:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="relative w-full flex justify-center items-center"
              >
                {/* Multi-layer glow */}
                <div className="absolute w-[70%] h-[70%] bg-blue-600/15 blur-[100px] rounded-full" />
                <div className="absolute w-[50%] h-[50%] bg-cyan-400/10 blur-[80px] rounded-full" />

                {/* Bottle with smooth levitation */}
                <motion.img
                  src="/gallery/sticla.png"
                  alt="Premium Plastic Packaging by InvestComPlast"
                  className="relative z-10 w-[55%] md:w-[50%] lg:w-[45%] h-auto drop-shadow-[0_40px_60px_rgba(0,100,255,0.15)]"
                  referrerPolicy="no-referrer"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* ── Bottom: Glassmorphism info cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 md:mt-4 z-10"
          >
            {[
              {
                title: "About Us",
                desc: "Committed to quality, innovation, and advanced manufacturing technology.",
                icon: "🏭",
              },
              {
                title: "Product Range",
                desc: "A diverse portfolio of standard and custom packaging solutions.",
                icon: "📦",
              },
              {
                title: "Sustainability",
                desc: "Dedicated to eco-friendly materials and reducing our environmental footprint.",
                icon: "🌿",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative px-6 py-5 bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl hover:bg-white/[0.1] hover:border-white/[0.18] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{card.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white/90 mb-1 group-hover:text-white transition-colors">{card.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/55 transition-colors">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* HERO → FEATURES: Clean gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-60 z-20 pointer-events-none bg-gradient-to-b from-transparent to-[#040c1b]" />
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FEATURES SECTION                            */}
      {/* ═══════════════════════════════════════════ */}
      <section id="catalog" className="relative z-10 py-24 px-6 bg-[#040c1b]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-400">
              Our Solutions
            </h2>
            <p className="text-blue-200/50 max-w-2xl mx-auto text-lg">
              Innovative packaging solutions engineered for performance, sustainability, and precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "PET Bottles",
                desc: "Premium quality PET bottles with crystal-clear transparency and superior barrier properties.",
                icon: "🧴"
              },
              {
                title: "Custom Packaging",
                desc: "Bespoke packaging solutions tailored to your brand's unique identity and requirements.",
                icon: "📦"
              },
              {
                title: "Sustainable Materials",
                desc: "Eco-friendly packaging options using recycled and biodegradable materials.",
                icon: "♻️"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group p-8 bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] rounded-3xl hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1"
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-100 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                <p className="text-blue-200/40 leading-relaxed group-hover:text-blue-200/60 transition-colors duration-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* WHY US / STATS SECTION                      */}
      {/* ═══════════════════════════════════════════ */}
      <section id="why-us" className="relative z-10 py-24 bg-gradient-to-b from-[#040c1b] via-blue-950/20 to-[#040c1b]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-400">
              Why InvestComPlast?
            </h2>
            <p className="text-blue-200/50 max-w-2xl mx-auto text-lg">
              Years of expertise, cutting-edge technology, and a commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Experience", value: "15+" },
              { label: "Products Made", value: "50M+" },
              { label: "Happy Clients", value: "200+" },
              { label: "Countries", value: "12" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6"
              >
                <div className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-blue-300 to-blue-600 mb-3">{stat.value}</div>
                <div className="text-sm uppercase tracking-[0.2em] text-blue-200/35 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CONTACT / CTA SECTION                       */}
      {/* ═══════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-24 px-6 bg-[#040c1b]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-400">
              Ready to Innovate?
            </h2>
            <p className="text-blue-200/50 text-lg mb-10 max-w-2xl mx-auto">
              Partner with us for cutting-edge packaging solutions that set your brand apart.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg">
                Contact Us
              </button>
              <button className="px-10 py-4 bg-white/10 hover:bg-white/15 text-white font-bold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg">
                View Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER                                      */}
      {/* ═══════════════════════════════════════════ */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/[0.06] bg-[#040c1b]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold tracking-tight text-blue-100">
            Invest<span className="text-white">ComPlast</span>
          </div>
          <div className="flex gap-8 text-blue-200/35 text-sm font-medium">
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Terms</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
          </div>
          <div className="text-blue-200/20 text-xs">
            © 2026 InvestComPlast. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Ambient background glow effects */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
    </div>
  );
}
