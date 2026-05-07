import React, { useState } from "react";
import { motion } from "framer-motion";
import { heroImages } from "@/lib/serviceData";

import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const contactInfo = [
  { icon: MapPin, title: "Visit Us", detail: "Riyadh, Saudi Arabia", sub: "King Fahd District", color: "#3B5998" },
  { icon: Phone, title: "Call Us", detail: "+966 50 059 2207", sub: "Sun - Thu, 8am - 6pm", color: "#E8832A" },
  { icon: Mail, title: "Email Us", detail: "info@distinctmark.net", sub: "We reply within 24 hours", color: "#0EA5E9" },
  { icon: Clock, title: "Working Hours", detail: "Sun - Thu: 8am - 6pm", sub: "Fri - Sat: Closed", color: "#16A34A" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Animated Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroImages.contact}
            alt="Contact"
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
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-96 h-96 rounded-full blur-3xl bg-secondary right-10 top-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.span
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-secondary text-sm font-bold uppercase tracking-widest mb-6 border border-secondary/20"
            >
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Get In Touch
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Contact{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-amber-300">
                Us
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 mt-4 max-w-xl text-lg"
            >
              Ready to discuss your next project? Our team in Riyadh is here to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards — overlapping hero */}
      <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, type: "spring" }}
                whileHover={{ y: -4, boxShadow: `0 20px 40px ${item.color}20` }}
                className="bg-card rounded-2xl p-6 shadow-xl border border-border/50 text-center transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="p-3 rounded-xl w-fit mx-auto mb-4"
                  style={{ background: `${item.color}18` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </motion.div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm font-medium text-foreground mt-1">{item.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Send a Message</span>
            <h2 className="font-playfair text-3xl font-bold text-foreground mt-3 mb-8">
              Request a <span className="text-secondary">Quote</span>
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="p-4 rounded-full bg-secondary/10 w-fit mx-auto mb-4"
                >
                  <CheckCircle className="w-12 h-12 text-secondary" />
                </motion.div>
                <h3 className="font-playfair text-2xl font-bold text-foreground">Thank You!</h3>
                <p className="text-muted-foreground mt-2">We'll get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-xl h-12" />
                  <Input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="rounded-xl h-12" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl h-12" />
                  <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="construction">Construction & Infrastructure</SelectItem>
                      <SelectItem value="electrical">Electrical & Mechanical</SelectItem>
                      <SelectItem value="it">IT & Technical Services</SelectItem>
                      <SelectItem value="catering">Catering & Hospitality</SelectItem>
                      <SelectItem value="trading">Trading & Retail</SelectItem>
                      <SelectItem value="transport">Transportation & Logistics</SelectItem>
                      <SelectItem value="equipment">Equipment Rental</SelectItem>
                      <SelectItem value="camp">Employee Camp Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="rounded-xl min-h-[130px]" />
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full h-12 text-sm font-semibold">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 h-full min-h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.494785960353!2d46.67529327616856!3d24.68854637789445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sKing%20Fahd%20District%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 450 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Riyadh, Saudi Arabia Map"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}