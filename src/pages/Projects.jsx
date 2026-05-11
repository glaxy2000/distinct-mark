import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroImages, services } from "@/lib/serviceData";
import { MapPin, Calendar, ArrowRight, Building2, Users, Shield, Wifi, ShoppingCart, Truck, UtensilsCrossed, CheckCircle } from "lucide-react";

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
  { title: "Employee Camp Complex — 1,000 Capacity", division: "construction", location: "Riyadh, Saudi Arabia", year: "2024", description: "Full planning, construction, MEP, and fit-out of a 5,000-person employee accommodation facility with dining, mosque, clinic, and recreation areas." },
  { title: "Industrial HVAC Installation", division: "electrical", location: "Jeddah Industrial City", year: "2024", description: "Complete HVAC system design, supply, and installation for a 50,000 sqm industrial warehouse." },
  { title: "Camp Network & CCTV Upgrade", division: "it", location: "Riyadh, Saudi Arabia", year: "2023", description: "Full IT infrastructure for employee camp: high-speed Wi-Fi, CCTV surveillance, access control, and IT support." },
  { title: "Camp Catering — 3,000 Meals/Day", division: "catering", location: "ARAMCO Project Site, Dhahran", year: "2024", description: "Full-scale industrial catering with central kitchen, 24/7 dining hall operations, and HACCP-certified food preparation." },
  { title: "Camp Supermarket & Retail", division: "trading", location: "Riyadh, Saudi Arabia", year: "2024", description: "Full supermarket operation inside employee camp: groceries, pharmacy, barber, laundry, cafeteria, and ATM services." },
  { title: "Camp Fleet Management — 200 Vehicles", division: "transport", location: "Kingdom-Wide, KSA", year: "2024", description: "Staff transportation, shuttle services, and vehicle management for worker camps across multiple sites." },
  { title: "Heavy Equipment Rental Fleet", division: "equipment", location: "Riyadh, Saudi Arabia", year: "2023", description: "Long-term rental of excavators, cranes, and generators for large-scale infrastructure projects." },
  { title: "Commercial Building Renovation", division: "construction", location: "Jeddah, Saudi Arabia", year: "2023", description: "Complete renovation including structural repair, interior fit-out, and MEP upgrades." },
  { title: "Smart Security — KAFD Tower", division: "it", location: "King Abdullah Financial District", year: "2024", description: "AI-powered CCTV and integrated access control system for a premium commercial tower." },
];

const categories = ["All", ...services.map(s => s.shortTitle)];
const categoryIdMap = { "All": null, ...Object.fromEntries(services.map(s => [s.shortTitle, s.id])) };

// Employee Camp feature sections
const campServices = [
  { icon: Building2, color: "#3B5998", title: "Residential Accommodation", items: ["Furnished employee rooms", "Shared & private options", "A/C & ventilation systems", "Housekeeping & laundry", "Recreation areas"] },
  { icon: Wifi, color: "#0EA5E9", title: "Internet & Communication", items: ["High-speed Wi-Fi coverage", "CCTV surveillance", "Access control systems", "Telephone & intercom", "IT support & maintenance"] },
  { icon: ShoppingCart, color: "#DC2626", title: "Supermarket & Retail", items: ["Groceries & food items", "Fresh produce & beverages", "Personal care products", "Pharmacy & barber shop", "ATM & banking services"] },
  { icon: UtensilsCrossed, color: "#16A34A", title: "Catering & Dining", items: ["Central kitchen & dining halls", "3,000+ meals per day", "Hygienic meal preparation", "Multiple menu options", "24/7 food service"] },
  { icon: Truck, color: "#1E3A5F", title: "Transportation Services", items: ["Employee transport buses", "Shuttle services", "Vehicle management", "GPS-tracked fleet", "24/7 availability"] },
  { icon: Shield, color: "#E8832A", title: "Health & Safety", items: ["Medical clinic on-site", "Emergency response support", "Fire protection systems", "Occupational health compliance", "First aid centers"] },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [campOpen, setCampOpen] = useState(false);

  const filtered = filter === "All"
    ? projects
    : projects.filter(p => p.division === categoryIdMap[filter]);

  return (
    <div>
      {/* Animated Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroImages.construction}
            alt="Projects"
            className="w-full h-full object-cover opacity-35"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
        </div>
        {/* Floating orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.14, 0.07] }} transition={{ duration: 5, repeat: Infinity }}
          className="absolute w-80 h-80 rounded-full blur-3xl bg-secondary right-10 top-10 pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          className="absolute w-60 h-60 rounded-full blur-3xl bg-blue-400 left-20 bottom-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.span
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-secondary text-sm font-bold uppercase tracking-widest mb-6 border border-secondary/20"
              >
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                Our Portfolio
              </motion.span>
              <h1 className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">
                  Projects
                </span>
              </h1>
              <p className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed">
                Showcasing our track record across construction, engineering, IT, catering, and logistics in Saudi Arabia.
              </p>
              <div className="flex gap-8 mt-8">
                {[{ v: "50+", l: "Projects" }, { v: "KSA", l: "Nationwide" }, { v: "15+", l: "Years" }].map(s => (
                  <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <p className="font-sora text-2xl font-bold text-secondary">{s.v}</p>
                    <p className="text-white/50 text-xs mt-0.5">{s.l}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Highlight card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div
                className="rounded-2xl p-6 backdrop-blur-xl border cursor-pointer group"
                style={{ background: "rgba(15,20,40,0.6)", borderColor: "rgba(59,89,152,0.5)" }}
                onClick={() => setCampOpen(true)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-[#3B5998]/30">
                    <Building2 className="w-6 h-6 text-[#3B9EFF]" />
                  </div>
                  <span className="text-white/80 text-sm font-semibold">Featured Project</span>
                </div>
                <h3 className="font-sora text-xl font-bold text-white">Employee Camp — 1,000 Capacity</h3>
                <p className="text-white/55 text-sm mt-2 leading-relaxed">Comprehensive residential camp with dining, clinic, mosque, supermarket, CCTV, and 24/7 support services.</p>
                <div className="flex items-center gap-2 mt-4 text-secondary text-sm font-medium group-hover:gap-3 transition-all">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Employee Camp Detail Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
              Signature Project
            </span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold">
              Employee Camp <span className="text-secondary">Solutions</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Distinct Mark provides end-to-end employee camp construction, operation, and maintenance in Saudi Arabia — supporting oil & gas, construction, logistics, and infrastructure sectors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campServices.map((cs, i) => {
              const Icon = cs.icon;
              return (
                <motion.div
                  key={cs.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="rounded-2xl p-6 border transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${cs.color}22, ${cs.color}10)`,
                    borderColor: `${cs.color}30`,
                  }}
                >
                  <div className="p-3 rounded-xl w-fit mb-4" style={{ background: `${cs.color}25` }}>
                    <Icon className="w-6 h-6" style={{ color: cs.color }} />
                  </div>
                  <h3 className="font-semibold text-white text-base mb-3">{cs.title}</h3>
                  <ul className="space-y-1.5">
                    {cs.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-xs text-white/60">
                        <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: cs.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Camp objectives */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-12 rounded-2xl p-8 border border-secondary/20 text-center"
            style={{ background: "rgba(232,131,42,0.08)" }}
          >
            <h3 className="font-sora text-2xl font-bold text-white mb-6">
              Our <span className="text-secondary">Objectives</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {["Improve Living Standards", "Ensure Safe Accommodation", "Support Workforce Productivity", "Integrated Services", "Saudi Regulatory Compliance", "Operational Efficiency"].map((obj, i) => (
                <motion.div
                  key={obj}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-3 rounded-xl bg-white/5 border border-white/8 text-center"
                >
                  <span className="text-xs text-white/70 leading-tight">{obj}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter & Projects Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">All Projects</span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mt-2">
              Project <span className="text-secondary">Gallery</span>
            </h2>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => {
                const service = services.find(s => s.id === project.division);
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:shadow-2xl hover:border-secondary/20 transition-all duration-500"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={imageMap[project.division]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${service?.gradient || "from-black/60"} opacity-60`} />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: service?.color }}>
                          {service?.shortTitle}
                        </span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/30 flex items-center justify-center"
                      >
                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                          <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-foreground text-base group-hover:text-secondary transition-colors">{project.title}</h3>
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
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}