import React from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/serviceData";

export default function ColorBoxes() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
              Our Work Scope
            </span>
            <h2 className="font-sora text-3xl md:text-5xl font-bold text-foreground">
              7 Divisions. <span className="text-secondary">One Vision.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              From ground-breaking construction to smart technology — each division brings specialized expertise to deliver integrated solutions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden p-6 text-white group cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${service.color}ee 0%, ${service.color}99 100%)`,
                  boxShadow: `0 8px 32px ${service.color}40`,
                }}
              >
                {/* Number */}
                <div className="absolute top-4 right-4 font-sora text-5xl font-bold text-white/10 leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Glow circle */}
                <div
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl"
                  style={{ backgroundColor: "white" }}
                />

                {/* Icon */}
                <div className="p-3 rounded-xl bg-white/20 w-fit mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg leading-snug mb-3">{service.title}</h3>

                {/* Sub-services */}
                <ul className="space-y-1.5">
                  {service.subServices.slice(0, 3).map((sub) => (
                    <li key={sub} className="flex items-center gap-2 text-xs text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                      {sub}
                    </li>
                  ))}
                  {service.subServices.length > 3 && (
                    <li className="text-xs text-white/60 pl-3.5">
                      +{service.subServices.length - 3} more services
                    </li>
                  )}
                </ul>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 group-hover:bg-white/60 transition-all duration-300" />
              </motion.div>
            );
          })}

          {/* Final CTA box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: services.length * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden p-6 text-white group cursor-pointer flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              boxShadow: "0 8px 32px rgba(15,52,96,0.4)",
            }}
          >
            <div>
              <div className="font-sora text-5xl font-bold text-white/10 mb-5 leading-none select-none">✦</div>
              <h3 className="font-sora text-2xl font-bold mb-3">
                One-Stop <span className="text-secondary">Solution</span>
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                All 7 divisions working seamlessly together for your complete project needs.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold hover:bg-secondary/90 transition-all w-fit"
            >
              Get a Quote
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}