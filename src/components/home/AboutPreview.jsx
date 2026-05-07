import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users } from "lucide-react";
import { heroImages } from "@/lib/serviceData";

export default function AboutPreview() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={heroImages.about}
              alt="About Distinct Mark"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-2xl shadow-xl">
            <p className="font-sora text-3xl font-bold">15+</p>
            <p className="text-sm font-medium">Years of Excellence</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">
            About Us
          </span>
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mt-3">
            Delivering <span className="text-secondary">Distinction</span> in Every Project
          </h2>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Distinct Mark is a diversified group of companies offering integrated solutions across construction, engineering, technology, hospitality, trading, logistics, and equipment rental. With a commitment to quality and innovation, we serve clients across the region with unmatched expertise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Shield, label: "Quality Assured" },
              { icon: Award, label: "Industry Leaders" },
              { icon: Users, label: "Expert Teams" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all text-sm"
          >
            Learn More About Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}