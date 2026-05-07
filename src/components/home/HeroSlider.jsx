import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { services, heroImages } from "@/lib/serviceData";

const slides = [
  {
    title: "Building Tomorrow's",
    highlight: "Infrastructure",
    subtitle: "Distinct Mark — Your Multi-Disciplinary Partner",
    description: "From construction to catering, IT to transportation — we deliver excellence across 7 specialized divisions.",
    image: heroImages.main,
    cta: "/services",
    ctaLabel: "Explore Services",
  },
  {
    title: "Construction &",
    highlight: "Infrastructure",
    subtitle: "General Contracting • Building • Civil Works",
    description: "End-to-end construction solutions from labour camp development to premium interior fit-out works.",
    image: heroImages.construction,
    cta: "/services",
    ctaLabel: "Our Services",
  },
  {
    title: "Electrical &",
    highlight: "Mechanical",
    subtitle: "MEP • HVAC • Plumbing • Electrical",
    description: "Comprehensive E&M services ensuring optimal performance of your facilities and infrastructure.",
    image: heroImages.electrical,
    cta: "/services",
    ctaLabel: "Learn More",
  },
  {
    title: "IT & Technical",
    highlight: "Solutions",
    subtitle: "Networks • Security • System Integration",
    description: "Cutting-edge technology services from CCTV systems to full enterprise software solutions.",
    image: heroImages.it,
    cta: "/services",
    ctaLabel: "Discover",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-screen overflow-hidden bg-primary">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20" />
        </motion.div>
      </AnimatePresence>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-secondary/40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i * 17) % 70}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-32 right-8 z-20 hidden lg:flex flex-col items-center gap-2">
        <span className="font-playfair text-4xl font-bold text-white/20">
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="text-xs text-white/30">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="text-sm text-white/90">{slide.subtitle}</span>
              </div>

              <div className="h-1 bg-gradient-to-r from-secondary to-amber-400 mb-6 rounded-full w-20" />

              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {slide.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">
                  {slide.highlight}
                </span>
              </h1>

              <p className="text-white/80 text-base md:text-lg mt-6 leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to={slide.cta}
                  className="group px-8 py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/90 transition-all hover:shadow-2xl hover:shadow-secondary/30 text-sm flex items-center gap-2"
                >
                  {slide.ctaLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm backdrop-blur-sm"
                >
                  About Us
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-6 right-6 z-10 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? "w-12 h-2 bg-gradient-to-r from-secondary to-amber-400 shadow-lg shadow-secondary/40"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-secondary hover:text-secondary-foreground transition-all border border-white/10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-secondary hover:text-secondary-foreground transition-all border border-white/10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}