import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services, heroImages } from "@/lib/serviceData";

const imageMap = {
  construction: heroImages.construction,
  electrical: heroImages.electrical,
  it: heroImages.it,
  catering: heroImages.catering,
  trading: heroImages.trading,
  transport: heroImages.transport,
  equipment: heroImages.equipment,
};

export default function ServiceGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
              What We Do
            </span>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mt-3">
              Our <span className="text-secondary">Divisions</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Seven specialized divisions working in harmony to deliver comprehensive solutions across industries.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/services"
                  className="group relative block overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-secondary/30 hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageMap[service.id]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`}
                    />
                    <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-secondary text-sm font-medium">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}