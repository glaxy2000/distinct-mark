import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, heroImages } from "@/lib/serviceData";
import { CheckCircle, ArrowRight } from "lucide-react";
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
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImages.electrical} alt="Services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mt-3">
              7 Specialized <span className="text-secondary">Divisions</span>
            </h1>
            <p className="text-white/70 mt-4 max-w-xl text-lg">
              Comprehensive solutions tailored to meet the diverse needs of modern businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOpen = activeId === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border/50 overflow-hidden bg-card hover:shadow-xl transition-all"
              >
                <div
                  className="grid md:grid-cols-2 cursor-pointer"
                  onClick={() => setActiveId(isOpen ? null : service.id)}
                >
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={imageMap[service.id]}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-50`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Division {i + 1}
                      </span>
                    </div>
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 leading-relaxed">
                      {service.description}
                    </p>
                    <button
                      className="flex items-center gap-2 mt-6 text-secondary font-semibold text-sm"
                    >
                      {isOpen ? "Show Less" : "View Sub-Services"}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2 border-t border-border/50">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                          {service.subServices.map((sub) => (
                            <div key={sub} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                              <CheckCircle className="w-5 h-5 shrink-0" style={{ color: service.color }} />
                              <span className="text-sm font-medium text-foreground">{sub}</span>
                            </div>
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

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
            Need a Custom <span className="text-secondary">Solution?</span>
          </h2>
          <p className="text-white/60 mt-4">
            Our team can tailor services to meet your specific project requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/90 transition-all text-sm"
          >
            Contact Us Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}