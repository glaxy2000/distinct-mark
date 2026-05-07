import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Play } from "lucide-react";
import { heroImages } from "@/lib/serviceData";

const slides = [
  {
    title: "Building Tomorrow's",
    highlight: "Infrastructure",
    badge: "Distinct Mark — Riyadh, Saudi Arabia",
    description: "From construction to catering, IT to transportation — delivering excellence across 7 specialized divisions throughout the Kingdom.",
    image: heroImages.main,
    accent: "#E8832A",
    stats: [
      { value: "500+", label: "Projects" },
      { value: "7", label: "Divisions" },
      { value: "15+", label: "Years" },
    ],
    cta: "/services",
    ctaLabel: "Explore Services",
  },
  {
    title: "Employee Camp",
    highlight: "Solutions",
    badge: "Construction & Infrastructure",
    description: "Comprehensive employee camp construction, operation, and maintenance — comfortable, secure, fully serviced accommodation for 5,000+ workers.",
    image: heroImages.construction,
    accent: "#3B5998",
    stats: [
      { value: "5,000+", label: "Camp Capacity" },
      { value: "24/7", label: "Operations" },
      { value: "100%", label: "Compliant" },
    ],
    cta: "/projects",
    ctaLabel: "View Projects",
  },
  {
    title: "Electrical &",
    highlight: "Mechanical",
    badge: "MEP • HVAC • Plumbing • Electrical",
    description: "Comprehensive E&M services ensuring optimal performance of your facilities and infrastructure across Saudi Arabia.",
    image: heroImages.electrical,
    accent: "#E8832A",
    stats: [
      { value: "200+", label: "MEP Projects" },
      { value: "50K+", label: "sqm Installed" },
      { value: "ISO", label: "Certified" },
    ],
    cta: "/services",
    ctaLabel: "Our Services",
  },
  {
    title: "IT & Technical",
    highlight: "Solutions",
    badge: "Networks • Security • CCTV • Integration",
    description: "Cutting-edge technology services from enterprise networks to AI-powered CCTV systems for camps, offices, and industrial facilities.",
    image: heroImages.it,
    accent: "#0EA5E9",
    stats: [
      { value: "100+", label: "Networks" },
      { value: "500+", label: "CCTV Sites" },
      { value: "99.9%", label: "Uptime" },
    ],
    cta: "/services",
    ctaLabel: "Discover",
  },
  {
    title: "Industrial Catering &",
    highlight: "Hospitality",
    badge: "Camp Catering • Industrial Dining",
    description: "Premium industrial catering for construction camps and ARAMCO sites — 3,000+ meals per day prepared with hygiene and quality.",
    image: heroImages.catering,
    accent: "#16A34A",
    stats: [
      { value: "3K+", label: "Meals/Day" },
      { value: "24/7", label: "Service" },
      { value: "HACCP", label: "Certified" },
    ],
    cta: "/services",
    ctaLabel: "Learn More",
  },
  {
    title: "Transportation &",
    highlight: "Logistics",
    badge: "Staff Transport • Fleet Management",
    description: "Reliable transportation solutions for worker camps and industrial sites — managing 200+ vehicles kingdom-wide.",
    image: heroImages.transport,
    accent: "#1E3A5F",
    stats: [
      { value: "200+", label: "Vehicles" },
      { value: "KSA", label: "Wide" },
      { value: "GPS", label: "Tracked" },
    ],
    cta: "/services",
    ctaLabel: "View Details",
  },
];

// Animated text that types out
function TypewriterText({ text, isVisible }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!isVisible) { setDisplayed(""); return; }
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 28);
    return () => clearInterval(timer);
  }, [text, isVisible]);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const go = useCallback((idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen overflow-hidden bg-primary">
      {/* BG Image with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          {/* Animated color accent overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}60 0%, transparent 70%)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: slide.accent, right: "5%", top: "10%" }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "#ffffff", left: "5%", bottom: "20%" }}
        />
        {/* Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
              height: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
              left: `${8 + i * 8}%`,
              top: `${10 + (i * 13) % 75}%`,
              backgroundColor: slide.accent,
              opacity: 0.4,
            }}
            animate={{ y: [-15, 15, -15], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute top-32 right-8 z-20 hidden xl:flex flex-col items-center gap-2">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sora text-5xl font-bold text-white/15"
        >
          {String(current + 1).padStart(2, "0")}
        </motion.span>
        <div className="w-px h-16 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 right-0 h-8"
            style={{ background: slide.accent }}
            animate={{ y: [0, 64, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="text-xs text-white/25 font-mono">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/10"
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: slide.accent }} />
                <span className="text-sm text-white/90 font-medium">{slide.badge}</span>
              </motion.div>

              {/* Accent bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="h-1 rounded-full mb-6"
                style={{ background: `linear-gradient(90deg, ${slide.accent}, #F5A623)` }}
              />

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-sora text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight"
              >
                {slide.title}
                <br />
                <span className="text-transparent bg-clip-text" style={{
                  backgroundImage: `linear-gradient(135deg, ${slide.accent}, #F5A623)`
                }}>
                  {slide.highlight}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/75 text-base md:text-lg mt-6 leading-relaxed max-w-xl"
              >
                {slide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <Link
                  to={slide.cta}
                  className="group px-8 py-3.5 font-semibold rounded-full transition-all text-sm flex items-center gap-2 text-white shadow-xl"
                  style={{ background: slide.accent }}
                >
                  {slide.ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3.5 border border-white/25 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm backdrop-blur-sm"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Right: Stats Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="hidden lg:flex flex-col gap-4"
            >
              {slide.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="rounded-2xl px-6 py-5 flex items-center justify-between backdrop-blur-xl"
                  style={{
                    background: "rgba(15,20,40,0.55)",
                    border: `1px solid ${slide.accent}40`,
                    boxShadow: `0 4px 24px ${slide.accent}25, inset 0 1px 0 rgba(255,255,255,0.06)`,
                  }}
                >
                  <span className="text-sm font-semibold text-white/80">{stat.label}</span>
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.12, type: "spring" }}
                    className="font-sora text-2xl font-bold drop-shadow"
                    style={{ color: slide.accent }}
                  >
                    {stat.value}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 7, ease: "linear" }}
          className="h-full"
          style={{ background: slide.accent }}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex gap-2 items-center">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="transition-all duration-500 rounded-full overflow-hidden"
              style={{
                width: i === current ? 40 : 8,
                height: 8,
                background: i === current ? slide.accent : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border border-white/10">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} className="p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border border-white/10">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}