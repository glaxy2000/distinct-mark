import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, heroImages } from "@/lib/serviceData";
import { CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const imageMap = {
  construction: heroImages.construction,
  electrical: heroImages.electrical,
  it: heroImages.it,
  catering: heroImages.catering,
  trading: heroImages.trading,
  transport: heroImages.transport,
  equipment: heroImages.equipment,
};

export default function Services() {
  const [activeId, setActiveId] = useState(null);

  return (
    <div>
      {/* Animated Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroImages.electrical}
            alt="Services"
            className="w-full h-full object-cover opacity-50"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
        </div>
        {/* Orbs */}
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-96 h-96 rounded-full blur-3xl bg-[#E8832A] right-10 top-10 pointer-events-none" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute w-64 h-64 rounded-full blur-3xl bg-[#0EA5E9] left-20 bottom-20 pointer-events-none" />

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
                Our Services
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                7 Specialized{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">
                  Divisions
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed"
              >
                Comprehensive solutions tailored to meet the diverse needs of construction, industrial, and corporate clients across Saudi Arabia.
              </motion.p>
            </motion.div>

            {/* Division pills */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex flex-wrap gap-3"
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-sm"
                  style={{ background: `${s.color}30`, border: `1px solid ${s.color}50` }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-white text-sm font-medium">{s.shortTitle}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Accordion List */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOpen = activeId === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border overflow-hidden bg-card hover:shadow-xl transition-all duration-500"
                style={{ borderColor: isOpen ? `${service.color}50` : "hsl(var(--border))" }}
              >
                <div className="grid md:grid-cols-2 cursor-pointer" onClick={() => setActiveId(isOpen ? null : service.id)}>
                  <div className="relative h-56 md:h-auto overflow-hidden">
                    <img src={imageMap[service.id]} alt={service.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-60`} />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="p-5 rounded-2xl bg-white/20 backdrop-blur-sm">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>
                    {/* Division number */}
                    <div className="absolute bottom-4 right-4 font-sora text-5xl font-bold text-white/15 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Division {i + 1}</span>
                    </div>
                    <h3 className="font-sora text-2xl md:text-3xl font-bold text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground mt-3 leading-relaxed text-sm">{service.description}</p>
                    <div className="flex items-center gap-2 mt-5">
                      <button className="flex items-center gap-2 font-semibold text-sm" style={{ color: service.color }}>
                        {isOpen ? "Hide Sub-Services" : "View Sub-Services"}
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-3 border-t" style={{ borderColor: `${service.color}20` }}>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                          {service.subServices.map((sub, si) => (
                            <motion.div
                              key={sub}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: si * 0.06 }}
                              className="flex items-center gap-3 p-3 rounded-xl"
                              style={{ background: `${service.color}10`, border: `1px solid ${service.color}20` }}
                            >
                              <CheckCircle className="w-5 h-5 shrink-0" style={{ color: service.color }} />
                              <span className="text-sm font-medium text-foreground">{sub}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Fleet Management Software Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">IT & Technical Services</span>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mt-3">
              Fleet Management <span className="text-secondary">Software</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
              A comprehensive system for managing, organizing, and operating taxi waiting and dispatch processes. Built on our success in major transportation hubs, Distinct Mark has created a proprietary, advanced taxi dispatch platform aligned with international standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Comprehensive Taxi Management",
                desc: "Real-time tracking, automated dispatch based on demand and location, and comprehensive reporting and analytics.",
              },
              {
                title: "Live Operations Dashboard",
                desc: "Web-based portal with live view of available taxis, ongoing trips, driver statuses, financial dashboards, and alerts.",
              },
              {
                title: "Mobile Driver Application",
                desc: "Purpose-built iOS & Android app with trip management, real-time notifications, queue management, and performance dashboards.",
              },
              {
                title: "RFID & Cloud Integration",
                desc: "Automated identification and access control for vehicles and drivers. Enhanced security at entry/exit points.",
              },
              {
                title: "ANPR & QR Code",
                desc: "Automatic Number Plate Recognition and QR code scanning for fast, secure vehicle authentication and monitoring.",
              },
              {
                title: "Integrated POS & Cashless",
                desc: "Seamless cashless fare collection supporting credit cards, Mada, and e-wallets with full payment tracking and financial reporting.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300"
                style={{ borderLeft: `4px solid #0EA5E9` }}
              >
                <h3 className="font-semibold text-foreground text-base mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-96 h-96 rounded-full blur-3xl bg-secondary right-10 top-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white">
              Need a Custom <span className="text-secondary">Solution?</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Our team can tailor any combination of services to meet your specific project requirements in Saudi Arabia.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/90 transition-all text-sm hover:shadow-xl hover:shadow-secondary/20"
            >
              Contact Us Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}