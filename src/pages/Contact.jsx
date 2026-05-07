import React, { useState } from "react";
import { motion } from "framer-motion";
import { heroImages } from "@/lib/serviceData";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const contactInfo = [
  { icon: MapPin, title: "Visit Us", detail: "Riyadh, Saudi Arabia", sub: "King Fahd District" },
  { icon: Phone, title: "Call Us", detail: "+966 XX XXX XXXX", sub: "Sun - Thu, 8am - 6pm" },
  { icon: Mail, title: "Email Us", detail: "info@distinctmark.net", sub: "We reply within 24 hours" },
  { icon: Clock, title: "Working Hours", detail: "Sun - Thu: 8am - 6pm", sub: "Fri - Sat: Closed" },
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
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImages.about} alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mt-3">
              Contact <span className="text-secondary">Us</span>
            </h1>
            <p className="text-white/70 mt-4 max-w-xl text-lg">
              Ready to discuss your next project? Our team is here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-xl border border-border/50 text-center"
              >
                <div className="p-3 rounded-xl bg-secondary/10 w-fit mx-auto mb-4">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
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
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Send a Message</span>
            <h2 className="font-playfair text-3xl font-bold text-foreground mt-3 mb-8">
              Request a <span className="text-secondary">Quote</span>
            </h2>

            {submitted ? (
              <div className="text-center py-16">
                <div className="p-4 rounded-full bg-secondary/10 w-fit mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-secondary" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-foreground">Thank You!</h3>
                <p className="text-muted-foreground mt-2">We'll get back to you within 24 hours.</p>
                <Button onClick={() => setSubmitted(false)} className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="rounded-xl h-12"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="rounded-xl h-12"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="rounded-xl h-12"
                  />
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
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="rounded-xl min-h-[120px]"
                />
                <Button
                  type="submit"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full h-12 text-sm font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-8">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 flex-1 min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.494785960353!2d46.67529327616856!3d24.68854637789445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sKing%20Fahd%20District%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
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