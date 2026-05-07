import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { heroImages } from "@/lib/serviceData";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImages.main} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-sora text-3xl md:text-5xl font-bold text-white">
            Ready to Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">
              Next Project?
            </span>
          </h2>
          <p className="text-white/70 mt-6 text-lg max-w-2xl mx-auto">
            From concept to completion, our team of experts is ready to bring your vision to life. Contact us today for a free consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/contact"
              className="group px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/90 transition-all hover:shadow-2xl hover:shadow-secondary/30 text-sm flex items-center gap-2"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+971000000000"
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm flex items-center gap-2 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}