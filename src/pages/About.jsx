import React from "react";
import { motion } from "framer-motion";
import { heroImages } from "@/lib/serviceData";
import { Target, Eye, Award, Users, Globe, Shield, CheckCircle } from "lucide-react";

const values = [
  { icon: Shield, title: "Quality", desc: "We deliver excellence in every project, adhering to the highest international standards." },
  { icon: Users, title: "Teamwork", desc: "Our skilled professionals work collaboratively to achieve outstanding results." },
  { icon: Target, title: "Innovation", desc: "We embrace modern technologies and methods to stay ahead of industry trends." },
  { icon: Globe, title: "Integrity", desc: "Transparent operations and honest partnerships form the foundation of our business." },
  { icon: Award, title: "Excellence", desc: "Continuous improvement drives us to surpass expectations on every project." },
  { icon: Eye, title: "Safety", desc: "Zero-compromise approach to health, safety, and environmental standards." },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImages.about} alt="About" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mt-3">
              Who We <span className="text-secondary">Are</span>
            </h1>
            <p className="text-white/70 mt-4 max-w-xl text-lg">
              A multi-disciplinary group committed to delivering distinction across every sector we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mt-3">
              Built on a Legacy of <span className="text-secondary">Excellence</span>
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              Distinct Mark was established with a vision to provide integrated, multi-sector services that meet the evolving needs of businesses and communities. Over the years, we have grown into a diversified group operating across seven key divisions.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Our commitment to quality, safety, and customer satisfaction has earned us a reputation as a trusted partner for projects of all scales. From construction and infrastructure to catering and IT solutions, we bring the same level of dedication and expertise to every engagement.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {["ISO Certified", "Safety First", "On-Time Delivery", "Cost Effective"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroImages.construction} alt="Our Projects" className="w-full h-[400px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-2xl shadow-xl hidden sm:block">
              <p className="font-playfair text-3xl font-bold">500+</p>
              <p className="text-sm font-medium">Projects Delivered</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg"
          >
            <div className="p-3 rounded-xl bg-secondary/10 w-fit mb-6">
              <Target className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-foreground">Our Mission</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              To provide comprehensive, high-quality services across all our divisions while maintaining the highest standards of safety, sustainability, and customer satisfaction. We aim to be the preferred partner for integrated project solutions.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg"
          >
            <div className="p-3 rounded-xl bg-accent/10 w-fit mb-6">
              <Eye className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-foreground">Our Vision</h3>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              To be the region's most trusted multi-disciplinary services group, recognized for innovation, reliability, and our ability to deliver integrated solutions that transform businesses and communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Values</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mt-3">
              What Drives <span className="text-secondary">Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-secondary/30 hover:shadow-lg transition-all"
                >
                  <div className="p-3 rounded-xl bg-secondary/10 w-fit">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mt-4">{v.title}</h3>
                  <p className="text-muted-foreground text-sm mt-2">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}