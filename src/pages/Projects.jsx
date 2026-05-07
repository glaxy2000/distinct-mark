import React, { useState } from "react";
import { motion } from "framer-motion";
import { heroImages, services } from "@/lib/serviceData";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

const imageMap = {
  construction: heroImages.construction,
  electrical: heroImages.electrical,
  it: heroImages.it,
  catering: heroImages.catering,
  trading: heroImages.trading,
  transport: heroImages.transport,
  equipment: heroImages.equipment,
};

const projects = [
  { title: "Labour Camp Complex — 5,000 Capacity", division: "construction", location: "Abu Dhabi, UAE", year: "2024", description: "Full construction, MEP, and interior fit-out of a 5,000-person labour accommodation facility." },
  { title: "Industrial HVAC Installation", division: "electrical", location: "Dubai Industrial City", year: "2024", description: "Complete HVAC system design, supply, and installation for a 50,000 sqm industrial warehouse." },
  { title: "Enterprise Network & Security Upgrade", division: "it", location: "Dubai, UAE", year: "2023", description: "Full IT infrastructure upgrade including network, CCTV, and access control for a corporate HQ." },
  { title: "Camp Catering — 3,000 Meals/Day", division: "catering", location: "ADNOC Project Site", year: "2024", description: "Full-scale industrial catering operations serving 3,000 meals per day across 3 shifts." },
  { title: "Building Materials Supply Chain", division: "trading", location: "UAE & GCC", year: "2023", description: "Bulk supply of construction materials including steel, cement, and finishing materials." },
  { title: "Fleet Management — 200 Vehicles", division: "transport", location: "UAE Wide", year: "2024", description: "Staff transportation fleet management for a major construction company with 200+ vehicles." },
  { title: "Heavy Equipment Rental Fleet", division: "equipment", location: "Abu Dhabi", year: "2023", description: "Long-term rental of excavators, cranes, and generators for a large-scale infrastructure project." },
  { title: "Commercial Building Renovation", division: "construction", location: "Sharjah, UAE", year: "2023", description: "Complete renovation including structural repair, interior fit-out, and MEP upgrades." },
  { title: "Smart Security System Deployment", division: "it", location: "Dubai Marina", year: "2024", description: "AI-powered CCTV and integrated access control system for a premium residential tower." },
];

const categories = ["All", ...services.map(s => s.shortTitle)];
const categoryIdMap = { "All": null, ...Object.fromEntries(services.map(s => [s.shortTitle, s.id])) };

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? projects
    : projects.filter(p => p.division === categoryIdMap[filter]);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImages.construction} alt="Projects" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Portfolio</span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mt-3">
              Featured <span className="text-secondary">Projects</span>
            </h1>
            <p className="text-white/70 mt-4 max-w-xl text-lg">
              Showcasing our track record of successful project delivery across all divisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const service = services.find(s => s.id === project.division);
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-xl transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={imageMap[project.division]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service?.gradient || "from-black/60"} opacity-50`} />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: service?.color }}
                      >
                        {service?.shortTitle}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-foreground text-lg">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}