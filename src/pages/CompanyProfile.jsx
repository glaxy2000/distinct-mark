import React, { useRef, useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// ── Slide components ──────────────────────────────────────────────────────────

const NAVY = "#1a2340";
const ORANGE = "#E8832A";
const LIGHT_BG = "#f0f2f7";

function LogoSVG({ size = 48, dark = true }) {
  return (
    <svg viewBox="0 0 200 44" width={size * 4.5} height={size} style={{ display: "block" }}>
      <g transform="translate(0,2)">
        <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke={ORANGE} strokeWidth="2" />
        <polygon points="20,8 32,20 20,32 8,20" fill={ORANGE} opacity="0.2" />
        <text x="20" y="25" textAnchor="middle" fontSize="14" fontWeight="800"
          fontFamily="Arial,sans-serif" letterSpacing="-1">
          <tspan fill={ORANGE}>D</tspan><tspan fill={dark ? "white" : NAVY}>M</tspan>
        </text>
      </g>
      <line x1="50" y1="8" x2="50" y2="36" stroke={ORANGE} strokeWidth="1.2" strokeOpacity="0.5" />
      <g transform="translate(58,0)">
        <text y="20" fontSize="12.5" fontWeight="800" fontFamily="Arial,sans-serif"
          fill={ORANGE} letterSpacing="3">DISTINCT</text>
        <text y="36" fontSize="12.5" fontWeight="700" fontFamily="Arial,sans-serif"
          fill={dark ? "white" : NAVY} letterSpacing="5.5">MARK</text>
      </g>
    </svg>
  );
}

function PageWrapper({ children, style = {} }) {
  return (
    <div style={{
      width: "297mm", minHeight: "210mm", position: "relative",
      background: LIGHT_BG, overflow: "hidden", fontFamily: "Arial, sans-serif",
      ...style
    }}>
      {children}
    </div>
  );
}

// Slide 1: Cover
function SlideCover() {
  return (
    <PageWrapper style={{ background: NAVY }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `repeating-linear-gradient(0deg, white 0, white 1px, transparent 1px, transparent 40px),
          repeating-linear-gradient(90deg, white 0, white 1px, transparent 1px, transparent 40px)`
      }} />
      {/* Orange accent top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: ORANGE }} />
      {/* Orange accent bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: ORANGE, display: "flex", alignItems: "center", padding: "0 40px", gap: 20 }}>
        <span style={{ color: "white", fontSize: 11, opacity: 0.9 }}>King Fahd District, Riyadh, Saudi Arabia</span>
        <span style={{ color: "white", opacity: 0.5 }}>|</span>
        <span style={{ color: "white", fontSize: 11, opacity: 0.9 }}>info@distinctmark.net</span>
        <span style={{ color: "white", opacity: 0.5 }}>|</span>
        <span style={{ color: "white", fontSize: 11, opacity: 0.9 }}>© 2026 DISTINCT MARK. All rights reserved</span>
      </div>
      {/* Logo top-left */}
      <div style={{ position: "absolute", top: 30, left: 40 }}>
        <LogoSVG size={32} dark={true} />
      </div>
      {/* Main text */}
      <div style={{ position: "absolute", bottom: 120, left: 40 }}>
        <div style={{ fontSize: 64, fontWeight: 900, color: "white", lineHeight: 1.1, letterSpacing: -2 }}>
          DISTINCT MARK
        </div>
        <div style={{ fontSize: 64, fontWeight: 900, color: ORANGE, lineHeight: 1.1, letterSpacing: -2 }}>
          GROUP
        </div>
        <div style={{ marginTop: 20, fontSize: 16, color: "rgba(255,255,255,0.75)", fontStyle: "italic", letterSpacing: 1 }}>
          Building Tomorrow's Infrastructure
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 5 }}>
          COMPANY PROFILE 2024 / 2025
        </div>
      </div>
    </PageWrapper>
  );
}

// Slide 2: At a Glance
function SlideGlance() {
  const stats = [
    { value: "7+", label: "YEARS OF EXCELLENCE" },
    { value: "50+", label: "PROJECTS COMPLETED" },
    { value: "7", label: "BUSINESS DIVISIONS" },
    { value: "60+", label: "TEAM MEMBERS" },
  ];
  return (
    <PageWrapper style={{ background: LIGHT_BG }}>
      <div style={{ position: "absolute", top: 30, right: 30 }}>
        <LogoSVG size={28} dark={false} />
      </div>
      <div style={{ padding: "36px 40px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>KEY FACTS AT A GLANCE</div>
        <div style={{ width: 36, height: 3, background: ORANGE, marginBottom: 20 }} />
        <div style={{ fontSize: 30, fontWeight: 800, color: NAVY }}>At a <span style={{ color: ORANGE }}>Glance</span></div>
      </div>
      <div style={{ display: "flex", gap: 16, padding: "0 40px", marginTop: 30 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, background: NAVY, borderRadius: 8, padding: "32px 20px",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
          }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: ORANGE }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 3, marginTop: 12, textAlign: "center" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

// Slide 3: About Us
function SlideAbout() {
  return (
    <PageWrapper style={{ display: "flex", background: LIGHT_BG }}>
      {/* Left */}
      <div style={{ flex: "0 0 55%", padding: "40px 40px 40px 40px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>ABOUT US</div>
        <div style={{ width: 36, height: 3, background: ORANGE, marginBottom: 24 }} />
        <div style={{ fontSize: 34, fontWeight: 800, color: NAVY, lineHeight: 1.2 }}>
          Who We<br /><span style={{ color: ORANGE }}>Are</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 12, color: "#4a5568", lineHeight: 1.8 }}>
          Distinct Mark was established in Riyadh, Saudi Arabia with a vision to provide
          integrated, multi-sector services that meet the evolving needs of businesses and
          communities across the Kingdom.
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: "#4a5568", lineHeight: 1.8 }}>
          From employee camp construction and MEP contracting to industrial catering, IT
          systems, and equipment rental — we bring the same level of dedication, safety
          focus, and professional excellence to every project.
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: "#4a5568", lineHeight: 1.8 }}>
          With 7+ years of excellence and a proven track record of 50+ completed projects
          across Saudi Arabia, Distinct Mark has grown into a trusted multi-disciplinary
          services group serving industries kingdom-wide.
        </div>
      </div>
      {/* Right – dark panel */}
      <div style={{
        flex: "0 0 45%", background: NAVY, display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px)` }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: ORANGE }} />
        <div style={{ padding: 32, position: "relative", zIndex: 1 }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 4, marginBottom: 20 }}>WHAT SETS US APART</div>
          {["7+ Years of Industry Experience", "50+ Projects Delivered Kingdom-Wide", "7 Specialized Business Divisions", "60+ Skilled Team Members", "Full Project Lifecycle Coverage", "Zero-Compromise Safety Standards"].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE, flexShrink: 0 }} />
              <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// Slide 4: Mission & Vision
function SlideMissionVision() {
  return (
    <PageWrapper style={{ background: NAVY, display: "flex" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px)` }} />
      <div style={{ position: "absolute", top: 20, right: 30, zIndex: 2 }}>
        <LogoSVG size={28} dark={true} />
      </div>
      {/* Mission */}
      <div style={{ flex: 1, padding: "50px 40px", position: "relative", zIndex: 1, borderRight: `1px solid rgba(255,255,255,0.1)` }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 8 }}>MISSION</div>
        <div style={{ width: 36, height: 3, background: ORANGE, marginBottom: 30 }} />
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.9 }}>
          To provide comprehensive, high-quality services across all our divisions while maintaining the
          highest standards of safety, sustainability, and customer satisfaction. We aim to be the
          preferred partner for integrated project solutions in Saudi Arabia.
        </div>
      </div>
      {/* Vision */}
      <div style={{ flex: 1, padding: "50px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 8 }}>OUR VISION</div>
        <div style={{ width: 36, height: 3, background: ORANGE, marginBottom: 30 }} />
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.9 }}>
          To be the Kingdom's most trusted multi-disciplinary services group, recognized for innovation,
          reliability, and our ability to deliver integrated solutions that transform businesses and
          communities across Saudi Arabia and the GCC.
        </div>
      </div>
    </PageWrapper>
  );
}

// ★ NEW Slide 5: Comprehensive Worker Services (3 Focus Areas)
function SlideWorkerServices() {
  const services = [
    {
      icon: "🏠",
      title: "Housing",
      subtitle: "Labour Camp Construction & Accommodation",
      desc: "Move-in-ready accommodation in every city you operate in. We design, build, and maintain fully equipped worker camps — from modular units to large-scale facilities for up to 15,000+ residents.",
      points: [
        "Full camp design & construction",
        "Furnished & fully equipped rooms",
        "24/7 maintenance & facility management",
        "Camp operations for 15,000+ residents",
        "Compliant with Saudi labour housing standards",
      ],
    },
    {
      icon: "🚌",
      title: "Transportation",
      subtitle: "Staff & Equipment Logistics",
      desc: "Fixed daily routes that get every worker to every site on time. Our dedicated fleet provides reliable, safe, and punctual transportation across the Kingdom.",
      points: [
        "Dedicated daily routes to all sites",
        "Air-conditioned modern fleet",
        "Heavy equipment haulage",
        "24/7 logistics coordination",
        "GPS-tracked vehicles for safety",
      ],
    },
    {
      icon: "🍽️",
      title: "Catering",
      subtitle: "Industrial & Camp Catering Services",
      desc: "Three nutritious meals a day, multiple cuisines, delivered directly to your buildings. Our catering teams serve thousands of workers daily with quality and consistency.",
      points: [
        "Three meals daily — breakfast, lunch, dinner",
        "Multiple cuisine options available",
        "ISO-compliant kitchen operations",
        "Nutritionist-approved meal plans",
        "Direct delivery to camp buildings",
      ],
    },
  ];

  return (
    <PageWrapper style={{ background: LIGHT_BG }}>
      <div style={{ position: "absolute", top: 20, right: 30 }}>
        <LogoSVG size={26} dark={false} />
      </div>
      <div style={{ padding: "32px 40px 20px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>COMPREHENSIVE WORKER SOLUTIONS</div>
        <div style={{ width: 36, height: 3, background: ORANGE, marginBottom: 16 }} />
        <div style={{ fontSize: 26, fontWeight: 800, color: NAVY }}>
          We Provide Comprehensive <span style={{ color: ORANGE }}>Services For Your Workers</span>
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
          End-to-end worker welfare solutions — Housing, Transportation, and Catering — all under one roof.
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, padding: "0 40px" }}>
        {services.map((s, i) => (
          <div key={i} style={{
            flex: 1, background: "white", borderRadius: 10,
            overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
          }}>
            {/* Card header */}
            <div style={{ background: NAVY, padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>{s.title}</div>
                <div style={{ fontSize: 9, color: ORANGE, letterSpacing: 1 }}>{s.subtitle}</div>
              </div>
            </div>
            {/* Card body */}
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontSize: 11, color: "#4a5568", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</div>
              {s.points.map((p, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ fontSize: 10, color: "#374151", lineHeight: 1.5 }}>{p}</div>
                </div>
              ))}
            </div>
            {/* Bottom accent */}
            <div style={{ height: 4, background: ORANGE }} />
          </div>
        ))}
      </div>
      {/* Bottom banner */}
      <div style={{
        margin: "16px 40px 0", background: NAVY, borderRadius: 8, padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
          ✦ All three services available as a <strong style={{ color: ORANGE }}>fully integrated package</strong> — one contract, one point of contact, complete worker welfare management.
        </div>
        <div style={{ background: ORANGE, color: "white", fontSize: 10, fontWeight: 700, padding: "6px 16px", borderRadius: 4, whiteSpace: "nowrap", marginLeft: 20 }}>
          ONE-STOP SOLUTION
        </div>
      </div>
    </PageWrapper>
  );
}

// Slide 6: CEO & Leadership
const CEO_PHOTO = "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/111613b20_generated_image.png";

function SlideLeadership() {
  return (
    <PageWrapper style={{ display: "flex", background: LIGHT_BG }}>
      {/* Left – photo panel */}
      <div style={{
        flex: "0 0 40%", background: NAVY, position: "relative",
        display: "flex", flexDirection: "column", justifyContent: "flex-end", overflow: "hidden"
      }}>
        {/* Portrait photo */}
        <img src={CEO_PHOTO} crossOrigin="anonymous" alt="CEO"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        {/* Navy gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,35,64,0.35) 0%, rgba(26,35,64,0.1) 45%, rgba(26,35,64,0.85) 100%)" }} />
        {/* LEADERSHIP label top */}
        <div style={{ position: "absolute", top: 28, left: 32, zIndex: 2 }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: ORANGE, fontWeight: 700 }}>LEADERSHIP</div>
          <div style={{ width: 30, height: 3, background: ORANGE, marginTop: 6 }} />
        </div>
        {/* Orange name bar bottom */}
        <div style={{ background: ORANGE, padding: "14px 32px", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: "white" }}>Mohammed Ayidh Almutari</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: 2, marginTop: 2 }}>CEO & FOUNDER</div>
        </div>
      </div>
      {/* Right */}
      <div style={{ flex: 1, padding: "38px 40px", position: "relative" }}>
        <div style={{ position: "absolute", top: 20, right: 20 }}>
          <LogoSVG size={24} dark={false} />
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>MESSAGE FROM LEADERSHIP</div>
        <div style={{ width: 36, height: 3, background: ORANGE, marginBottom: 18 }} />
        <div style={{ fontSize: 26, fontWeight: 800, color: NAVY, lineHeight: 1.2 }}>Mohammed Ayidh Almutari</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: ORANGE, letterSpacing: 2, marginTop: 6, marginBottom: 16 }}>
          CEO & FOUNDER — DISTINCT MARK GROUP
        </div>
        <div style={{ fontSize: 11.5, color: "#4a5568", lineHeight: 1.75 }}>
          Mohammed is the founder and driving force behind Distinct Mark — a multi-disciplinary services group
          headquartered in Riyadh. With a bold entrepreneurial spirit and deep understanding of the Kingdom's
          industrial landscape, he built Distinct Mark from the ground up into a diversified enterprise spanning
          seven key divisions.
        </div>
        <div style={{ marginTop: 12, fontSize: 11.5, color: "#4a5568", lineHeight: 1.75 }}>
          Under his leadership, Distinct Mark has delivered over 50+ projects across construction, electrical &
          mechanical, IT, catering, trading, transportation, and equipment rental — establishing the company
          as a trusted partner for major industrial and infrastructure projects across the Kingdom.
        </div>
        {/* Leadership qualities */}
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px" }}>
          {[
            "Visionary Entrepreneurial Leadership",
            "Deep Industry & Market Expertise",
            "Commitment to Safety & Quality",
            "Vision 2030 Aligned Growth Strategy",
          ].map((q, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: ORANGE, flexShrink: 0 }} />
              <div style={{ fontSize: 10.5, color: NAVY, fontWeight: 600 }}>{q}</div>
            </div>
          ))}
        </div>
        {/* Stats */}
        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          {[["50+", "Projects Delivered"], ["7", "Business Divisions"], ["60+", "Team Members"], ["7+", "Years Leadership"]].map(([v, l], i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", background: NAVY, borderRadius: 8, padding: "12px 8px" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: ORANGE }}>{v}</div>
              <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.75)", letterSpacing: 0.5, marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// Slide 7: Growth Timeline
function SlideTimeline() {
  const milestones = [
    { year: "2019", title: "Founded", desc: "Established in Riyadh, Saudi Arabia" },
    { year: "2020", title: "Expansion", desc: "Launched E&M and IT divisions" },
    { year: "2022", title: "Scale-Up", desc: "Grew to 60+ team members" },
    { year: "2023", title: "Camp Projects", desc: "Delivered first 15,000-person camp" },
    { year: "2026", title: "Today", desc: "7 Divisions, 50+ projects, KSA-wide" },
  ];
  return (
    <PageWrapper style={{ background: LIGHT_BG }}>
      <div style={{ position: "absolute", top: 20, right: 30 }}>
        <LogoSVG size={26} dark={false} />
      </div>
      <div style={{ padding: "36px 40px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>COMPANY GROWTH TIMELINE</div>
        <div style={{ width: 36, height: 3, background: ORANGE, marginBottom: 20 }} />
        <div style={{ fontSize: 30, fontWeight: 800, color: NAVY }}>Our Journey <span style={{ color: ORANGE }}>Since 2019</span></div>
      </div>
      {/* Timeline */}
      <div style={{ padding: "0 60px", marginTop: 20 }}>
        <div style={{ position: "relative" }}>
          {/* Line */}
          <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 3, background: ORANGE }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 140 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, marginBottom: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "white" }} />
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: ORANGE }}>{m.year}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: NAVY, marginTop: 4 }}>{m.title}</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4, textAlign: "center" }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// Slide 8: Our 7 Divisions Overview
function SlideDivisions() {
  const divs = [
    { n: "01", t: "Construction & Infrastructure" },
    { n: "02", t: "Electrical & Mechanical" },
    { n: "03", t: "IT & Technical Services" },
    { n: "04", t: "Catering & Hospitality" },
    { n: "05", t: "Trading & Retail" },
    { n: "06", t: "Transportation & Logistics" },
    { n: "07", t: "Equipment Rental" },
  ];
  return (
    <PageWrapper style={{ background: NAVY }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px)` }} />
      <div style={{ position: "absolute", top: 20, right: 30 }}>
        <LogoSVG size={26} dark={true} />
      </div>
      <div style={{ padding: "40px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>OUR 7 DIVISIONS</div>
        <div style={{ fontSize: 44, fontWeight: 900, color: "white" }}>One Vision</div>
        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {divs.slice(0, 6).map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderLeft: `3px solid ${ORANGE}`, background: "rgba(255,255,255,0.04)", borderRadius: "0 6px 6px 0" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: ORANGE, opacity: 0.6 }}>{d.n}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>{d.t}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderLeft: `3px solid ${ORANGE}`, background: "rgba(255,255,255,0.04)", borderRadius: "0 6px 6px 0", width: "calc(50% - 6px)" }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: ORANGE, opacity: 0.6 }}>07</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Equipment Rental</div>
        </div>
      </div>
    </PageWrapper>
  );
}

// Slide 9: Core Values
function SlideCoreValues() {
  const values = [
    { v: "Quality", d: "Excellence in every project" },
    { v: "Teamwork", d: "Collaborative professionals" },
    { v: "Innovation", d: "Modern technologies & methods" },
    { v: "Integrity", d: "Transparent & honest partnerships" },
    { v: "Excellence", d: "Surpassing expectations always" },
    { v: "Safety", d: "Zero-compromise H&S standards" },
  ];
  return (
    <PageWrapper style={{ background: NAVY }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: `repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px)` }} />
      <div style={{ position: "absolute", top: 20, right: 30 }}>
        <LogoSVG size={26} dark={true} />
      </div>
      <div style={{ padding: "36px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>CORE VALUES</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>What Drives Us</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 30 }}>
          {values.map((v, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.06)", borderRadius: 8,
              padding: "24px 20px", borderLeft: `4px solid ${ORANGE}`
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 8 }}>{v.v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// Slide 10: Thank You / Contact
function SlideContact() {
  return (
    <PageWrapper style={{ background: NAVY }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px)` }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: ORANGE }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 40 }}>
        <LogoSVG size={40} dark={true} />
        <div style={{ fontSize: 64, fontWeight: 900, color: "white", marginTop: 30, letterSpacing: -2 }}>THANK YOU</div>
        <div style={{ fontSize: 11, color: ORANGE, letterSpacing: 6, marginTop: 10 }}>GET IN TOUCH</div>
        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, width: "60%" }}>
          {[
            ["📍", "King Fahd District, Riyadh, Saudi Arabia"],
            ["📞", "+966 55 815 7777"],
            ["✉️", "info@distinctmark.net"],
            ["🌐", "www.distinctmark.net"],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.06)", padding: "14px 20px", borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: ORANGE, padding: "18px 40px", textAlign: "center" }}>
          <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>© 2019/2026 Distinct Mark Group</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, marginTop: 4, letterSpacing: 2 }}>Building Tomorrow's Infrastructure — Since 2019</div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const SLIDES = [
  { id: "cover", label: "Cover", component: SlideCover },
  { id: "glance", label: "At a Glance", component: SlideGlance },
  { id: "about", label: "About Us", component: SlideAbout },
  { id: "mission", label: "Mission & Vision", component: SlideMissionVision },
  { id: "workers", label: "Worker Services ★", component: SlideWorkerServices },
  { id: "leadership", label: "Leadership", component: SlideLeadership },
  { id: "timeline", label: "Growth Timeline", component: SlideTimeline },
  { id: "divisions", label: "7 Divisions", component: SlideDivisions },
  { id: "values", label: "Core Values", component: SlideCoreValues },
  { id: "contact", label: "Contact", component: SlideContact },
];

export default function CompanyProfile() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const slidesRef = useRef({});

  const generatePDF = async () => {
    setGenerating(true);
    setProgress(0);
    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const W = 297, H = 210;

      for (let i = 0; i < SLIDES.length; i++) {
        const el = slidesRef.current[SLIDES[i].id];
        if (!el) continue;

        const canvas = await html2canvas(el, {
          scale: 2, useCORS: true, logging: false,
          width: el.offsetWidth, height: el.offsetHeight,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, W, H);
        setProgress(Math.round(((i + 1) / SLIDES.length) * 100));
      }

      pdf.save("Distinct_Mark_Company_Profile_2025.pdf");
    } catch (err) {
      console.error(err);
      alert("PDF generation failed. Please try again.");
    }
    setGenerating(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Company Profile Generator</h1>
            <p className="text-sm text-gray-500 mt-1">Enhanced profile with Housing, Transportation & Catering focus — 10 slides</p>
          </div>
          <Button
            onClick={generatePDF}
            disabled={generating}
            className="bg-[#E8832A] hover:bg-[#d0721f] text-white gap-2 px-6 py-3 text-base h-12"
          >
            {generating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF {progress}%</>
            ) : (
              <><Download className="w-5 h-5" /> Download PDF</>
            )}
          </Button>
        </div>

        {/* Slide nav pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SLIDES.map((s) => (
            <a key={s.id} href={`#slide-${s.id}`}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-[#E8832A] hover:text-white hover:border-[#E8832A] transition-colors">
              {s.label}
            </a>
          ))}
        </div>

        {/* Slide previews */}
        <div className="space-y-6">
          {SLIDES.map((slide, idx) => {
            const SlideComp = slide.component;
            return (
              <div key={slide.id} id={`slide-${slide.id}`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Slide {idx + 1}</span>
                  <span className="text-sm font-semibold text-gray-700">{slide.label}</span>
                  {slide.id === "workers" && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">★ Key Focus</span>
                  )}
                </div>
                <div
                  className="rounded-xl overflow-hidden shadow-xl border border-gray-200"
                  style={{ width: "100%", maxWidth: "100%" }}
                >
                  {/* Scale preview to fit screen */}
                  <div style={{ position: "relative", width: "100%", paddingBottom: "70.7%", overflow: "hidden" }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0,
                      width: "297mm", transformOrigin: "top left",
                      transform: `scale(var(--slide-scale, 0.45))`,
                    }}
                      ref={el => {
                        if (el) {
                          const updateScale = () => {
                            const containerW = el.parentElement?.offsetWidth || 800;
                            const scale = containerW / (297 * 3.7795);
                            el.style.setProperty("--slide-scale", scale);
                            el.parentElement.style.paddingBottom = `${(210 * 3.7795 * scale)}px`;
                          };
                          updateScale();
                          window.addEventListener("resize", updateScale);
                        }
                      }}
                    >
                      <div ref={el => { if (el) slidesRef.current[slide.id] = el; }}>
                        <SlideComp />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button
            onClick={generatePDF}
            disabled={generating}
            className="bg-[#E8832A] hover:bg-[#d0721f] text-white gap-2 px-10 py-4 text-lg h-14"
          >
            {generating ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating... {progress}%</>
            ) : (
              <><FileText className="w-5 h-5" /> Download Complete Company Profile PDF</>
            )}
          </Button>
          <p className="text-xs text-gray-400 mt-2">A4 landscape · 10 slides · High resolution</p>
        </div>
      </div>
    </div>
  );
}