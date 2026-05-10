import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Logo variant="light" />
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              A multi-disciplinary group delivering excellence across construction, engineering, IT, catering, trading, transportation, and equipment rental.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: "About Us", path: "/about" },
                { label: "Our Services", path: "/services" },
                { label: "Projects", path: "/projects" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center gap-2 text-primary-foreground/60 hover:text-secondary transition-colors text-sm"
                >
                  <ArrowRight className="w-3 h-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Our Divisions</h4>
            <div className="space-y-3">
              {[
                "Construction & Infrastructure",
                "Electrical & Mechanical",
                "IT & Technical Services",
                "Catering & Hospitality",
                "Trading & Retail",
                "Transportation & Logistics",
                "Equipment Rental",
              ].map((s) => (
                <p key={s} className="text-primary-foreground/60 text-sm">{s}</p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-secondary shrink-0" />
                <p className="text-primary-foreground/60 text-sm">King Fahd District, Riyadh, Saudi Arabia</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-secondary shrink-0" />
                <p className="text-primary-foreground/60 text-sm">+966 50 059 2207</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-secondary shrink-0" />
                <p className="text-primary-foreground/60 text-sm">info@distinctmark.net</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} Distinct Mark. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-primary-foreground/40 text-sm">Privacy Policy</span>
            <span className="text-primary-foreground/40 text-sm">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}