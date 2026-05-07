import React from "react";
import { motion } from "framer-motion";
import { heroImages } from "@/lib/serviceData";
import { Target, Eye, Award, Users, Globe, Shield, CheckCircle, TrendingUp, Handshake } from "lucide-react";

const values = [
  { icon: Shield, title: "Quality", desc: "We deliver excellence in every project, adhering to the highest international standards.", color: "#3B5998" },
  { icon: Users, title: "Teamwork", desc: "Our skilled professionals work collaboratively to achieve outstanding results.", color: "#0EA5E9" },
  { icon: Target, title: "Innovation", desc: "We embrace modern technologies and methods to stay ahead of industry trends.", color: "#E8832A" },
  { icon: Globe, title: "Integrity", desc: "Transparent operations and honest partnerships form the foundation of our business.", color: "#16A34A" },
  { icon: Award, title: "Excellence", desc: "Continuous improvement drives us to surpass expectations on every project.", color: "#DC2626" },
  { icon: Eye, title: "Safety", desc: "Zero-compromise approach to health, safety, and environmental standards.", color: "#1E3A5F" },
];

const milestones = [
  { year: "2009", title: "Founded", desc: "Established in Riyadh, Saudi Arabia" },
  { year: "2013", title: "Expansion", desc: "Launched E&M and IT divisions" },
  { year: "2017", title: "Scale-Up", desc: "Grew to 1,000+ team members" },
  { year: "2020", title: "Camp Projects", desc: "Delivered first 5,000-person employee camp" },
  { year: "2024", title: "Today", desc: "7 Divisions, 500+ projects, KSA-wide operations" },
];

export default function About() {
  return (
    <div>
      {/* Animated Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroImages.about}
            alt="About"
            className="w-full h-full object-cover opacity-15"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/88 via-primary/72 to-primary/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/65 via-primary/20 to-transparent" />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }}
          />
        </div>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-96 h-96 rounded-full blur-3xl bg-secondary right-10 top-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.span
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-secondary text-sm font-bold uppercase tracking-widest mb-6 border border-secondary/20"
            >
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Who We <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">Are</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 mt-5 max-w-xl text-lg leading-relaxed"
            >
              A multi-disciplinary group based in Riyadh, committed to delivering distinction across every sector we serve throughout Saudi Arabia.
            </motion.p>
          </motion.div>

          {/* Stats on hero */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              { value: "15+", label: "Years of Excellence", color: "#E8832A" },
              { value: "500+", label: "Projects Completed", color: "#3B5998" },
              { value: "7", label: "Business Divisions", color: "#0EA5E9" },
              { value: "2,000+", label: "Team Members", color: "#16A34A" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                className="rounded-2xl p-5 backdrop-blur-xl text-center"
                style={{ background: "rgba(15,20,40,0.6)", border: `1px solid ${s.color}35` }}
              >
                <p className="font-playfair text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-white/60 text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mt-3">
              Built on a Legacy of <span className="text-secondary">Excellence</span>
            </h2>
            <p className="text-muted-foreground mt-6 leading-relaxed">
              Distinct Mark was established in Riyadh, Saudi Arabia with a vision to provide integrated, multi-sector services that meet the evolving needs of businesses and communities across the Kingdom. We have grown into a diversified group operating across seven key divisions.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              From employee camp construction and MEP contracting to industrial catering, IT systems, and equipment rental — we bring the same level of dedication, safety focus, and professional excellence to every project.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              {["ISO Certified", "Safety First", "On-Time Delivery", "Cost Effective", "Saudi Compliant", "24/7 Support"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src={heroImages.construction}
                alt="Our Projects"
                className="w-full h-[420px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-6 rounded-2xl shadow-2xl hidden sm:block"
            >
              <p className="font-playfair text-3xl font-bold">500+</p>
              <p className="text-sm font-medium">Projects Delivered</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Journey</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mt-3">
              Growth <span className="text-secondary">Timeline</span>
            </h2>
          </motion.div>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
            <div className="space-y-8 md:space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className={`relative md:grid md:grid-cols-2 gap-8 items-center ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}
                >
                  <div className={`p-6 rounded-2xl bg-card border border-border/50 shadow-md hover:shadow-lg transition-all ${i % 2 !== 0 ? "md:[direction:ltr]" : ""}`}>
                    <span className="text-secondary font-playfair text-2xl font-bold">{m.year}</span>
                    <h3 className="font-semibold text-foreground text-lg mt-1">{m.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
                  </div>
                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background shadow-lg" />
                  <div />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {[
            { icon: Target, color: "secondary", title: "Our Mission", text: "To provide comprehensive, high-quality services across all our divisions while maintaining the highest standards of safety, sustainability, and customer satisfaction. We aim to be the preferred partner for integrated project solutions in Saudi Arabia." },
            { icon: Eye, color: "accent", title: "Our Vision", text: "To be the Kingdom's most trusted multi-disciplinary services group, recognized for innovation, reliability, and our ability to deliver integrated solutions that transform businesses and communities across Saudi Arabia and the GCC." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`p-3 rounded-xl w-fit mb-6 ${item.color === "secondary" ? "bg-secondary/10" : "bg-accent/10"}`}>
                  <Icon className={`w-8 h-8 ${item.color === "secondary" ? "text-secondary" : "text-accent"}`} />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground mt-4 leading-relaxed">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Our Values</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mt-3">
              What Drives <span className="text-secondary">Us</span>
            </h2>
          </motion.div>
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
                  whileHover={{ y: -6, boxShadow: `0 20px 40px ${v.color}20` }}
                  className="p-6 rounded-2xl bg-card border border-border/50 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="p-3 rounded-xl w-fit transition-all"
                    style={{ background: `${v.color}18` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: v.color }} />
                  </motion.div>
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