import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const features = [
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
];

export default function FleetManagementSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">IT & Technical Services</span>
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-foreground mt-3">
            Fleet Management <span className="text-secondary">Software</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            A comprehensive system for managing, organizing, and operating taxi waiting and dispatch processes. Built on our success in major transportation hubs, Distinct Mark has created a proprietary, advanced taxi dispatch platform aligned with international standards.
          </p>
        </motion.div>

        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-semibold mt-2 mb-6"
          style={{ color: "#0EA5E9" }}
        >
          {expanded ? "Hide Features" : "View Key Features"}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300"
                    style={{ borderLeft: "4px solid #0EA5E9" }}
                  >
                    <h3 className="font-semibold text-foreground text-base mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}