import React, { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/serviceData";

function AnimatedCounter({ value, isVisible }) {
  const [display, setDisplay] = useState("0");
  const numericVal = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = numericVal;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplay(Math.floor(start) + suffix);
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, numericVal, suffix]);

  return <span>{display}</span>;
}

export default function StatsBar() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative -mt-16 z-20 max-w-6xl mx-auto px-6">
      <div className="bg-card rounded-2xl shadow-2xl border border-border/50 p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <p className="font-playfair text-3xl md:text-4xl font-bold text-secondary">
              <AnimatedCounter value={stat.value} isVisible={visible} />
            </p>
            <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}