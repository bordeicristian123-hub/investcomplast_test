/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { Routes, Route, Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { Palette, Cog, ShieldCheck, Lightbulb } from "lucide-react";
import { Footer } from "./components/Footer";
import { TrustBar } from "./components/TrustBar";
import { Navbar } from "./components/Navbar";
import ProductShowcase from "./components/ProductShowcase";
import ScrollVideoSection from "./components/ScrollVideoSection";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";

function useCountUp(target: number, duration = 1500, start = false) {
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

const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WhyUsPage = lazy(() => import("./pages/WhyUsPage"));

function HomePage() {
  const location = useLocation();
  const [whyUsVisible, setWhyUsVisible] = useState(false);

  const { scrollY } = useScroll();
  const bottleParallaxY = useTransform(scrollY, (y) => -Math.min(y * 0.25, 200) * 0.3);

  const yearsCount = useCountUp(15, 1500, whyUsVisible);
  const productsCount = useCountUp(50, 1500, whyUsVisible);
  const partnersCount = useCountUp(15, 1500, whyUsVisible);
  const foodGradeCount = useCountUp(100, 1500, whyUsVisible);

  useEffect(() => {
    const el = document.getElementById('why-us');
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWhyUsVisible(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle scroll-to-products when navigating back from product page
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clear state so it doesn't scroll again on refresh
        window.history.replaceState({}, '');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip font-sans text-white selection:bg-blue-500/30 bg-[#040c1b]">

      {/* Global grid background */}
      <div className="grid-bg fixed inset-0 z-0 pointer-events-none" />

      {/* ═══════════════════════════════════════════ */}
      {/* NAVIGATION BAR                              */}
      {/* ═══════════════════════════════════════════ */}
      <Navbar />

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION                                */}
      {/* ═══════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        {/* Background gradient layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 hero-gradient-overlay" />
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="noise absolute inset-0" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-blue-400/20"
              style={{
                width: `${3 + i * 2}px`,
                height: `${3 + i * 2}px`,
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30 - i * 8, 0],
                x: [0, (i % 2 === 0 ? 15 : -15), 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Orbital rings — right side */}
        <div className="hidden md:block absolute top-1/2 right-[12%] -translate-y-1/2 z-[5] pointer-events-none">
          <div
            className="w-[640px] h-[640px] rounded-full border border-cyan-400/[0.06] absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ animation: 'spin-slow 45s linear infinite reverse' }}
          />
          <div
            className="w-[520px] h-[520px] rounded-full border border-blue-400/10 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ animation: 'spin-slow 30s linear infinite' }}
          />
          <div
            className="w-[400px] h-[400px] rounded-full border border-dashed border-blue-400/[0.08] absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            style={{ animation: 'spin-slow 25s linear infinite reverse' }}
          />
        </div>

        {/* Main hero */}
        <main className="relative z-10 flex flex-col items-center min-h-screen px-6 md:px-20 pt-28 md:pt-32 pb-12">

          <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between flex-1 gap-10">

            {/* LEFT — copy */}
            <div className="w-full md:w-[48%] flex flex-col items-center md:items-start space-y-7 z-10">

              {/* Live status pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="liquid-glass-blue flex items-center gap-2.5 pl-2 pr-4 py-1.5 text-[12px]">
                  <span className="live-dot" />
                  <span className="text-blue-200 font-medium">Production active · Chișinău, MD</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
              >
                <h1
                  className="wup-h-hero text-center md:text-left"
                  style={{
                    fontSize: 'clamp(40px, 5vw, 80px)',
                    lineHeight: 1.02,
                    fontFamily: "'Figtree', system-ui, -apple-system, sans-serif",
                  }}
                >
                  <span style={{ fontStyle: 'normal' }}>
                    <span className="text-blue-400">Invest</span>complast:
                  </span>
                  <br />
                  <span className="gradient-text">Powering Your     ‎  </span>
                  <br />
                  <span className="gradient-text">Production Line.</span>
                </h1>
              </motion.div>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.22, ease: "easeOut" }}
                className="text-base md:text-lg text-white/55 max-w-md leading-relaxed text-center md:text-left"
              >
                Precision-engineered PET bottles for producers of water, juice and dairy.
                Built to last. Made to lead.
              </motion.p>

              {/* CTA — original Explore Products button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35 }}
              >
                <button
                  className="liquid-glass-strong-blue rounded-full px-10 py-5 text-[18px] font-medium hover:scale-105 transition-transform flex items-center gap-2.5"
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Products
                </button>
              </motion.div>
            </div>

            {/* Mobile stat panels — visible on small screens between text and bottle */}
            <div className="w-full grid grid-cols-3 gap-2 md:hidden">
              {[
                { num: '600k+', label: 'Bottles Produced Monthly', mono: '01' },
                { num: '15+', label: 'Global Partners', mono: '02' },
                { num: '15+', label: 'Years in Industry', mono: '03' },
              ].map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 + i * 0.08 }}
                  className="liquid-glass-blue rounded-[14px] p-3 tilt wup-shine"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="mono text-[9px] text-blue-300/40">/{w.mono}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                  </div>
                  <div className="font-black text-[20px] leading-none tracking-tight text-white">{w.num}</div>
                  <div className="text-[8px] text-blue-200/60 uppercase tracking-widest font-medium mt-1 leading-tight">{w.label}</div>
                </motion.div>
              ))}
            </div>

            {/* RIGHT — bottle with spec callouts */}
            <motion.div
              className="w-full md:w-[52%] relative flex justify-center items-center min-h-[480px] mt-8 md:mt-0"
              style={{ y: bottleParallaxY }}
            >

              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                className="relative w-full flex justify-center items-center"
              >
                {/* Glow halos */}
                <div className="absolute w-[60%] h-[60%] bg-blue-600/20 blur-[110px] rounded-full" />
                <div className="absolute w-[40%] h-[40%] bg-cyan-400/15 blur-[80px] rounded-full" />

                {/* Bottle */}
                <div className="relative z-10 flex justify-center items-center">
                  <motion.img
                    src="/gallery/sticla.png"
                    alt="Premium PET bottle"
                    fetchPriority="high"
                    decoding="async"
                    className="relative w-[230px] md:w-[280px] lg:w-[330px] h-auto"
                    style={{ filter: 'drop-shadow(0 40px 60px rgba(0,100,255,0.25))', willChange: 'transform' }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    }}
                  />

                  {/* Spec callout: top-left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="hero-spec-card spec-material-pos block"
                  >
                    <div className="eyebrow mb-1" style={{ fontSize: '9px' }}>Material</div>
                    <div className="text-white font-bold text-[15px]">Food-grade PET</div>
                    <div className="text-blue-200/50 text-[11px] mono mt-0.5">100% recyclable</div>
                  </motion.div>

                  {/* Spec callout: right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="hero-spec-card block"
                    style={{ top: '38%', right: '-12%' }}
                  >
                    <div className="eyebrow mb-1" style={{ fontSize: '9px' }}>Weight</div>
                    <div className="text-white font-bold text-[15px]">20 – 50g</div>
                    <div className="text-blue-200/50 text-[11px] mono mt-0.5">15% lighter spec</div>
                  </motion.div>

                  {/* Spec callout: bottom-left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="hero-spec-card block"
                    style={{ bottom: '10%', left: '-6%' }}
                  >
                    <div className="eyebrow mb-1" style={{ fontSize: '9px' }}>Capacity</div>
                    <div className="text-white font-bold text-[15px]">0.5L → 6L</div>
                    <div className="text-blue-200/50 text-[11px] mono mt-0.5">Custom molds</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom stat panels — original data, 3 panels */}
          <div className="w-full max-w-7xl hidden lg:grid grid-cols-3 gap-4 mt-8">
            {[
              { num: '600k+', label: 'Bottles Produced Monthly', mono: '01' },
              { num: '15+', label: 'Global Partners', mono: '02' },
              { num: '15+', label: 'Years in Industry', mono: '03' },
            ].map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + i * 0.08 }}
                className="liquid-glass-blue rounded-[22px] p-5 tilt wup-shine"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="mono text-[10px] text-blue-300/40">/{w.mono}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                </div>
                <div className="font-black text-[30px] leading-none tracking-tight text-white">{w.num}</div>
                <div className="text-[11px] text-blue-200/60 uppercase tracking-widest font-medium mt-2">{w.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-blue-200/30">
            <span className="mono text-[10px] tracking-widest">SCROLL</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-blue-400/60 to-transparent" />
          </div>
        </main>

        <div className="section-fade-bottom" />
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TRUST BAR                                   */}
      {/* ═══════════════════════════════════════════ */}
      <TrustBar />

      {/* ═══════════════════════════════════════════ */}
      {/* FEATURES SECTION                            */}
      {/* ═══════════════════════════════════════════ */}
      <section id="catalog" className="relative z-10 py-28 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#040c1b] to-transparent pointer-events-none z-20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040c1b] to-transparent pointer-events-none z-20" />

        {/* ── Background light orbs (static) ── */}
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.06] blur-[140px] pointer-events-none" />
        <div className="absolute top-[40%] left-[45%] w-[400px] h-[400px] rounded-full bg-blue-400/[0.05] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Badge */}
          <div className="flex justify-center mb-7">
            <span className="liquid-glass-blue text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-300 px-5 py-2 rounded-full">
              Our Solutions
            </span>
          </div>

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="wup-h-section text-white" style={{ marginBottom: '1.25rem' }}>
              Quality is <span className="gradient-text">everything.</span>
            </h2>
            <p className="text-blue-200/45 max-w-xl mx-auto text-lg leading-relaxed">
              Innovative packaging solutions engineered for performance, sustainability, and precision.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Custom Bottle Design",
                desc: "Shape, size, color and neck finish tailored to your product.",
                Icon: Palette,
              },
              {
                title: "Automated Blow Molding",
                desc: "One of the few companies in Moldova equipped with fully automated bottle blowing technology, ensuring precision and consistency.",
                Icon: Cog,
              },
              {
                title: "Quality Assurance",
                desc: "Rigorous quality control at every stage ensuring every product meets the highest standards.",
                Icon: ShieldCheck,
              },
              {
                title: "Innovation Driven",
                desc: "Continuously improving technology and processes for better results.",
                Icon: Lightbulb,
              },
            ].map(({ title, desc, Icon }, i) => (
              <div
                key={i}
                className="liquid-glass-card-blue wup-shine group p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_50px_rgba(59,130,246,0.14)]"
              >
                {/* Icon container */}
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/15 group-hover:border-blue-400/30 transition-all duration-500">
                  <Icon size={20} className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                <h3 className="text-[15px] font-bold mb-3 text-white/90 group-hover:text-white transition-colors duration-300 tracking-tight">
                  {title}
                </h3>
                <p className="text-blue-200/40 leading-relaxed text-sm group-hover:text-blue-200/60 transition-colors duration-300">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SCROLL STACK SECTION                        */}
      {/* ═══════════════════════════════════════════ */}
      <section id="scroll-stack" className="relative z-10 overflow-visible">
        <ScrollStack useWindowScroll className="!h-auto !overflow-visible">
          {[
            '/gallery/scrollGrid/photo1.png',
            '/gallery/scrollGrid/photo2.png',
            '/gallery/scrollGrid/photo3.jpg',
            '/gallery/scrollGrid/photo4.jpg',
            '/gallery/scrollGrid/photo5.jpg',
            '/gallery/scrollGrid/photo6.jpg',
          ].map((src, i) => (
            <ScrollStackItem
              key={i}
              itemClassName="!p-0 !h-[clamp(240px,38vh,360px)] md:!h-[clamp(320px,55vh,560px)] overflow-hidden border border-blue-400/15 max-w-5xl mx-auto bg-[#040c1b]"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain block select-none pointer-events-none"
                draggable={false}
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PRODUCT SHOWCASE SECTION                    */}
      {/* ═══════════════════════════════════════════ */}
      <ProductShowcase />

      {/* ═══════════════════════════════════════════ */}
      {/* SCROLL-DRIVEN VIDEO SECTION                 */}
      {/* ═══════════════════════════════════════════ */}
      <ScrollVideoSection />

      {/* ═══════════════════════════════════════════ */}
      {/* WHY US / STATS SECTION                      */}
      {/* ═══════════════════════════════════════════ */}
      <section id="why-us" className="relative z-10 py-28">
        <div className="max-w-7xl mx-auto px-6">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-7"
          >
            <span className="liquid-glass-blue text-[11px] font-semibold tracking-[0.2em] uppercase text-blue-300 px-5 py-2 rounded-full">
              Why Us
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="wup-h-section text-white" style={{ marginBottom: '1.25rem' }}>
              The difference is <span className="gradient-text">everything.</span>
            </h2>
            <p className="text-blue-200/45 max-w-xl mx-auto text-lg leading-relaxed">
              Years of expertise, cutting-edge technology, and a commitment to excellence.
            </p>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="liquid-glass-card-blue wup-home-stats-card relative overflow-hidden"
            style={{ padding: '60px 50px' }}
          >
            <div className="wup-grid-bg-tight absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }} />
            <div
              className="absolute pointer-events-none"
              style={{
                top: '-30%',
                right: '-10%',
                width: 500,
                height: 500,
                background: 'radial-gradient(circle, rgba(59,130,246,0.3), transparent 60%)',
                filter: 'blur(60px)',
              }}
            />

            <div className="relative grid grid-cols-2 lg:grid-cols-4 wup-home-stats-grid">
              {[
                { v: `${yearsCount}+`, l: 'Years Experience', sub: 'industry experience' },
                { v: `${productsCount}M+`, l: 'Products Made', sub: 'units shipped' },
                { v: `${partnersCount}+`, l: 'Partners', sub: 'global brands' },
                { v: `${foodGradeCount}%`, l: 'Food-Grade Materials', sub: 'certified resin' },
              ].map((s, i) => (
                <div
                  key={i}
                  className="px-6 py-6 lg:px-8 wup-home-stat-cell"
                  style={{ borderLeft: i === 0 ? 'none' : '1px solid rgba(96,165,250,0.18)' }}
                >
                  <div
                    className="wup-h-display gradient-text"
                    style={{ fontSize: 'clamp(44px, 5vw, 72px)', fontStyle: 'italic', lineHeight: 0.95 }}
                  >
                    {s.v}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-white">{s.l}</div>
                  <div
                    className="mono mt-1"
                    style={{
                      fontSize: 11,
                      color: 'rgba(147,197,253,0.55)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            <style>{`
              .wup-home-stat-cell { text-align: center; }
              /* Below lg (1024px) the grid is 2 columns — redo the borders. */
              @media (max-width: 1023px) {
                .wup-home-stats-grid > * { border-left: none !important; }
                .wup-home-stats-grid > *:nth-child(2),
                .wup-home-stats-grid > *:nth-child(4) {
                  border-left: 1px solid rgba(96,165,250,0.18) !important;
                }
                .wup-home-stats-grid > *:nth-child(n+3) {
                  border-top: 1px solid rgba(96,165,250,0.18);
                  padding-top: 28px;
                  margin-top: 4px;
                }
              }
              @media (max-width: 640px) {
                .wup-home-stats-card { padding: 32px 16px !important; }
                .wup-home-stat-cell { padding-left: 10px !important; padding-right: 10px !important; }
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* CONTACT / CTA SECTION                       */}
      {/* ═══════════════════════════════════════════ */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="wup-h-section text-white" style={{ marginBottom: '1.25rem' }}>
              Ready to <span className="gradient-text">Innovate?</span>
            </h2>
            <p className="text-blue-200/50 text-lg mb-10 max-w-2xl mx-auto">
              Partner with us for cutting-edge packaging solutions that set your brand apart.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="liquid-glass-strong-blue px-10 py-4 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                Contact Us
              </Link>
              <Link to="/products" className="liquid-glass px-10 py-4 text-white font-bold rounded-full transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg hover:bg-white/[0.06]">
                View Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ambient background glow effects */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#040c1b]" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
      </Route>
    </Routes>
  );
}
