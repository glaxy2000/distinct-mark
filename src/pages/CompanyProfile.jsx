import React, { useRef, useState, useEffect } from "react";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  NAVY, ORANGE, LIGHT_BG, IMAGES, ALL_IMAGE_URLS, LogoSVG, BgImage, PageWrapper,
} from "@/components/company-profile/shared";
import DivisionSlide from "@/components/company-profile/DivisionSlide";

// ── Slides ────────────────────────────────────────────────────────────────────

function SlideCover() {
  return (
    <PageWrapper style={{ background: NAVY }}>
      <BgImage src={IMAGES.skylineNight} overlay="rgba(26,35,64,0.68)" />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: ORANGE, zIndex: 2 }} />
      <div style={{ position: "absolute", top: 30, left: 40, zIndex: 2 }}>
        <LogoSVG size={32} dark={true} />
      </div>
      <div style={{ position: "absolute", bottom: 110, left: 40, zIndex: 2 }}>
        <div style={{ fontSize: 62, fontWeight: 900, color: "white", lineHeight: 1.05, letterSpacing: -2 }}>DISTINCT MARK</div>
        <div style={{ fontSize: 62, fontWeight: 900, color: ORANGE, lineHeight: 1.1, letterSpacing: -2 }}>GROUP</div>
        <div style={{ marginTop: 20, fontSize: 16, color: "rgba(255,255,255,0.8)", fontStyle: "italic", letterSpacing: 1 }}>Building Tomorrow's Infrastructure</div>
        <div style={{ marginTop: 8, fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 5 }}>COMPANY PROFILE 2024 / 2025</div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 66, background: ORANGE, display: "flex", alignItems: "center", padding: "0 40px", gap: 16, zIndex: 2 }}>
        <span style={{ color: "white", fontSize: 11 }}>King Fahd District, Riyadh, Saudi Arabia</span>
        <span style={{ color: "white", opacity: 0.6 }}>|</span>
        <span style={{ color: "white", fontSize: 11 }}>info@distinctmark.net</span>
        <span style={{ color: "white", opacity: 0.6 }}>|</span>
        <span style={{ color: "white", fontSize: 11 }}>© 2026 DISTINCT MARK. All rights reserved</span>
      </div>
    </PageWrapper>
  );
}

function SlideGlance() {
  const stats = [
    { value: "7+", label: "YEARS OF EXCELLENCE" },
    { value: "50+", label: "PROJECTS COMPLETED" },
    { value: "7", label: "BUSINESS DIVISIONS" },
    { value: "60+", label: "TEAM MEMBERS" },
  ];
  return (
    <PageWrapper style={{ background: LIGHT_BG }}>
      <div style={{ position: "absolute", top: 30, right: 30 }}><LogoSVG size={28} dark={false} /></div>
      <div style={{ padding: "36px 40px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>KEY FACTS AT A GLANCE</div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 20 }} />
        <div style={{ fontSize: 30, fontWeight: 800, color: NAVY }}>At a <span style={{ color: ORANGE }}>Glance</span></div>
      </div>
      <div style={{ display: "flex", gap: 16, padding: "0 40px", marginTop: 40 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, background: NAVY, borderRadius: 8, padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 54, fontWeight: 900, color: ORANGE }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 3, marginTop: 14, textAlign: "center" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

function SlideAbout() {
  return (
    <PageWrapper style={{ display: "flex", background: LIGHT_BG }}>
      <div style={{ flex: "0 0 55%", padding: "40px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>ABOUT US</div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 30 }} />
        <div style={{ fontSize: 36, fontWeight: 800, color: NAVY, lineHeight: 1.2 }}>Who We<br /><span style={{ color: ORANGE }}>Are</span></div>
        <div style={{ marginTop: 28, fontSize: 13, color: "#4a5568", lineHeight: 1.9 }}>
          Distinct Mark was established in Riyadh, Saudi Arabia with a vision to provide integrated, multi-sector services that meet the evolving needs of businesses and communities across the Kingdom.
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: "#4a5568", lineHeight: 1.9 }}>
          From employee camp construction and MEP contracting to industrial catering, IT systems, and equipment rental — we bring the same level of dedication, safety focus, and professional excellence to every project.
        </div>
      </div>
      <div style={{ flex: "0 0 45%", position: "relative", overflow: "hidden", borderLeft: `5px solid ${ORANGE}` }}>
        <img src={IMAGES.construction} crossOrigin="anonymous" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,35,64,0.35)" }} />
      </div>
    </PageWrapper>
  );
}

function SlideMissionVision() {
  return (
    <PageWrapper style={{ background: NAVY, display: "flex" }}>
      <BgImage src={IMAGES.cityAerial} overlay="rgba(26,35,64,0.82)" />
      <div style={{ position: "absolute", top: 24, right: 34, zIndex: 2 }}><LogoSVG size={28} dark={true} /></div>
      <div style={{ flex: 1, padding: "60px 40px", position: "relative", zIndex: 1, borderRight: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: ORANGE, letterSpacing: 6, marginBottom: 8 }}>MISSION</div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 30 }} />
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.95 }}>
          To provide comprehensive, high-quality services across all our divisions while maintaining the highest standards of safety, sustainability, and customer satisfaction. We aim to be the preferred partner for integrated project solutions in Saudi Arabia.
        </div>
      </div>
      <div style={{ flex: 1, padding: "60px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: ORANGE, letterSpacing: 6, marginBottom: 8 }}>OUR VISION</div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 30 }} />
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.95 }}>
          To be the Kingdom's most trusted multi-disciplinary services group, recognized for innovation, reliability, and our ability to deliver integrated solutions that transform businesses and communities across Saudi Arabia and the GCC.
        </div>
      </div>
    </PageWrapper>
  );
}

function SlideWorkerServices() {
  const services = [
    { icon: "🏠", title: "Housing", subtitle: "Labour Camp Construction & Accommodation", desc: "Move-in-ready accommodation in every city you operate in. We design, build, and maintain fully equipped worker camps — from modular units to large-scale facilities for up to 15,000+ residents.", points: ["Full camp design & construction", "Furnished & fully equipped rooms", "24/7 maintenance & facility management", "Camp operations for 15,000+ residents", "Compliant with Saudi labour housing standards"] },
    { icon: "🚌", title: "Transportation", subtitle: "Staff & Equipment Logistics", desc: "Fixed daily routes that get every worker to every site on time. Our dedicated fleet provides reliable, safe, and punctual transportation across the Kingdom.", points: ["Dedicated daily routes to all sites", "Air-conditioned modern fleet", "Heavy equipment haulage", "24/7 logistics coordination", "GPS-tracked vehicles for safety"] },
    { icon: "🍽️", title: "Catering", subtitle: "Industrial & Camp Catering Services", desc: "Three nutritious meals a day, multiple cuisines, delivered directly to your buildings. Our catering teams serve thousands of workers daily with quality and consistency.", points: ["Three meals daily — breakfast, lunch, dinner", "Multiple cuisine options available", "ISO-compliant kitchen operations", "Nutritionist-approved meal plans", "Direct delivery to camp buildings"] },
  ];
  return (
    <PageWrapper style={{ background: LIGHT_BG }}>
      <div style={{ position: "absolute", top: 20, right: 30 }}><LogoSVG size={26} dark={false} /></div>
      <div style={{ padding: "32px 40px 20px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>COMPREHENSIVE WORKER SOLUTIONS</div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 16 }} />
        <div style={{ fontSize: 26, fontWeight: 800, color: NAVY }}>We Provide Comprehensive <span style={{ color: ORANGE }}>Services For Your Workers</span></div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>End-to-end worker welfare solutions — Housing, Transportation, and Catering — all under one roof.</div>
      </div>
      <div style={{ display: "flex", gap: 16, padding: "0 40px" }}>
        {services.map((s, i) => (
          <div key={i} style={{ flex: 1, background: "white", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ background: NAVY, padding: "18px 20px", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>{s.title}</div>
                <div style={{ fontSize: 9, color: ORANGE, letterSpacing: 1 }}>{s.subtitle}</div>
              </div>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontSize: 11, color: "#4a5568", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</div>
              {s.points.map((p, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: ORANGE, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ fontSize: 10, color: "#374151", lineHeight: 1.5 }}>{p}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 4, background: ORANGE }} />
          </div>
        ))}
      </div>
      <div style={{ margin: "16px 40px 0", background: NAVY, borderRadius: 8, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>✦ All three services available as a <strong style={{ color: ORANGE }}>fully integrated package</strong> — one contract, one point of contact, complete worker welfare management.</div>
        <div style={{ background: ORANGE, color: "white", fontSize: 10, fontWeight: 700, padding: "6px 16px", borderRadius: 4, whiteSpace: "nowrap", marginLeft: 20 }}>ONE-STOP SOLUTION</div>
      </div>
    </PageWrapper>
  );
}

// Leadership — matches PDF page 5 (photo left, bio right)
function SlideLeadership() {
  return (
    <PageWrapper style={{ display: "flex", background: LIGHT_BG }}>
      {/* Left photo panel */}
      <div style={{ flex: "0 0 38%", position: "relative", display: "flex", flexDirection: "column" }}>
        <img src={IMAGES.ceo} crossOrigin="anonymous" alt="CEO" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(26,35,64,0.55) 0%, rgba(26,35,64,0.15) 30%, rgba(26,35,64,0.15) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "34px 32px" }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: ORANGE, fontWeight: 700 }}>LEADERSHIP</div>
        </div>
        <div style={{ marginTop: "auto", background: ORANGE, padding: "16px 32px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "white", letterSpacing: 3 }}>CEO &amp; FOUNDER</div>
        </div>
      </div>
      {/* Right bio */}
      <div style={{ flex: 1, padding: "44px 44px", position: "relative" }}>
        <div style={{ position: "absolute", top: 24, right: 30 }}><LogoSVG size={26} dark={false} /></div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 30 }} />
        <div style={{ fontSize: 32, fontWeight: 800, color: NAVY, lineHeight: 1.2 }}>Mohammed Ayidh<br />Almutari</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 3, marginTop: 12, marginBottom: 24 }}>CEO &amp; FOUNDER — DISTINCT MARK GROUP</div>
        <div style={{ fontSize: 13, color: "#4a5568", lineHeight: 1.85 }}>
          Mohammad is the founder and driving force behind Distinct Mark — a multi-disciplinary services group headquartered in Riyadh. With a bold entrepreneurial spirit and deep understanding of the Kingdom's industrial landscape, he built Distinct Mark from the ground up into a diversified enterprise spanning seven key divisions.
        </div>
        <div style={{ marginTop: 16, fontSize: 13, color: "#4a5568", lineHeight: 1.85 }}>
          Under his leadership, Distinct Mark has delivered over 50+ projects across construction, electrical &amp; mechanical, IT, catering, trading, transportation, and equipment rental — establishing the company as a trusted partner for major industrial and infrastructure projects across the Kingdom.
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
          {[["50+", "Projects Delivered"], ["7", "Business Divisions"], ["7+", "Years of Leadership"]].map(([v, l], i) => (
            <div key={i} style={{ textAlign: "center", background: LIGHT_BG, borderRadius: 8, padding: "14px 20px", border: `1px solid ${ORANGE}22` }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: ORANGE }}>{v}</div>
              <div style={{ fontSize: 9, color: NAVY, letterSpacing: 1, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

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
      <div style={{ position: "absolute", top: 20, right: 30 }}><LogoSVG size={26} dark={false} /></div>
      <div style={{ padding: "36px 40px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>COMPANY GROWTH TIMELINE</div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 20 }} />
        <div style={{ fontSize: 30, fontWeight: 800, color: NAVY }}>Our Journey <span style={{ color: ORANGE }}>Since 2019</span></div>
      </div>
      <div style={{ padding: "0 60px", marginTop: 40 }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: 16, left: 0, right: 0, height: 3, background: ORANGE }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 150 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, marginBottom: 18 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "white" }} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: ORANGE }}>{m.year}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginTop: 4 }}>{m.title}</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 6, textAlign: "center" }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

function SlideDivisionsOverview() {
  const divs = [
    "Construction & Infrastructure", "Electrical & Mechanical", "IT & Technical Services",
    "Catering & Hospitality", "Trading & Retail", "Transportation & Logistics", "Equipment Rental",
  ];
  return (
    <PageWrapper style={{ background: NAVY }}>
      <BgImage src={IMAGES.buildingUp} overlay="rgba(26,35,64,0.78)" />
      <div style={{ position: "absolute", top: 24, right: 34, zIndex: 2 }}><LogoSVG size={26} dark={true} /></div>
      <div style={{ padding: "40px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, color: ORANGE, letterSpacing: 5, marginBottom: 8 }}>OUR 7 DIVISIONS</div>
        <div style={{ fontSize: 46, fontWeight: 900, color: "white" }}>One Vision</div>
        <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {divs.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 20px", borderLeft: `3px solid ${ORANGE}`, background: "rgba(255,255,255,0.05)", borderRadius: "0 6px 6px 0" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: ORANGE, opacity: 0.7 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.88)", fontWeight: 600 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

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
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg,white 0,white 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,white 0,white 1px,transparent 1px,transparent 40px)" }} />
      <div style={{ position: "absolute", top: 20, right: 30 }}><LogoSVG size={26} dark={true} /></div>
      <div style={{ padding: "36px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>CORE VALUES</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>What Drives Us</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 34 }}>
          {values.map((v, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "26px 22px", borderLeft: `4px solid ${ORANGE}` }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 8 }}>{v.v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

function SlideContact() {
  return (
    <PageWrapper style={{ background: NAVY }}>
      <BgImage src={IMAGES.cityAerial} overlay="rgba(26,35,64,0.82)" />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: ORANGE, zIndex: 2 }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: 40 }}>
        <LogoSVG size={40} dark={true} />
        <div style={{ fontSize: 62, fontWeight: 900, color: "white", marginTop: 30, letterSpacing: -2 }}>THANK YOU</div>
        <div style={{ fontSize: 11, color: ORANGE, letterSpacing: 6, marginTop: 10 }}>GET IN TOUCH</div>
        <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, width: "62%" }}>
          {[["📍", "King Fahd District, Riyadh, Saudi Arabia"], ["📞", "+966 55 815 7777"], ["✉️", "info@distinctmark.net"], ["🌐", "www.distinctmark.net"]].map(([icon, text], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.08)", padding: "14px 20px", borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 12 }}>{text}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: ORANGE, padding: "18px 40px", textAlign: "center" }}>
          <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>© 2019/2026 Distinct Mark Group</div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 10, marginTop: 4, letterSpacing: 2 }}>Building Tomorrow's Infrastructure — Since 2019</div>
        </div>
      </div>
    </PageWrapper>
  );
}

// Division detail slide definitions
const DIVISIONS = [
  { number: "01", title: "Construction & Infrastructure", image: IMAGES.construction, description: "End-to-end construction and infrastructure solutions including general contracting, labour camp construction, building renovation, and civil works.", items: ["General Contracting", "Labour Camp Construction & Maintenance", "Building Construction & Renovation", "Civil Works", "Project Management"] },
  { number: "02", title: "Electrical & Mechanical", image: IMAGES.mechanic, description: "Comprehensive electrical and mechanical engineering services covering installation, maintenance, HVAC, plumbing, and full MEP contracting.", items: ["Electrical Installation & Maintenance", "Mechanical Works", "HVAC Installation & Maintenance", "Plumbing Works", "Full MEP Contracting"] },
  { number: "03", title: "IT & Technical Services", image: IMAGES.serverRoom, description: "Cutting-edge IT solutions including network installation, security systems, software & hardware supply, and system integration.", items: ["IT Support & Network Installation", "CCTV & Security Systems", "Software & Hardware Supply", "System Integration", "Technical Consultation"] },
  { number: "04", title: "Catering & Hospitality", image: IMAGES.catering, description: "Premium catering and hospitality management for industrial sites, camps, restaurants, and food supply operations.", items: ["Industrial Catering Services", "Camp Catering Services", "Restaurant Operation & Management", "Food Supply & Procurement"] },
  { number: "05", title: "Trading & Retail", image: IMAGES.officeDesk, description: "Diverse trading and retail operations spanning supermarkets, general trading, building materials, and electrical equipment.", items: ["Supermarket Operations", "General Trading", "Building Materials Trading", "Electrical Equipment Supply"] },
  { number: "06", title: "Transportation & Logistics", image: IMAGES.truck, description: "Reliable transportation and logistics support including staff transport, equipment hauling, and comprehensive logistics management.", items: ["Transportation Services", "Staff Transportation", "Equipment Transportation", "Logistics Management"] },
  { number: "07", title: "Equipment Rental", image: IMAGES.construction, description: "Wide range of equipment rental services including heavy machinery, construction equipment, generators, and specialized machinery.", items: ["Heavy Equipment Rental", "Construction Equipment Rental", "Generator Rental", "Specialized Machinery Rental"] },
];

// ── Slide registry ────────────────────────────────────────────────────────────

const SLIDES = [
  { id: "cover", label: "Cover", render: () => <SlideCover /> },
  { id: "glance", label: "At a Glance", render: () => <SlideGlance /> },
  { id: "about", label: "About Us", render: () => <SlideAbout /> },
  { id: "mission", label: "Mission & Vision", render: () => <SlideMissionVision /> },
  { id: "leadership", label: "Leadership", render: () => <SlideLeadership /> },
  { id: "timeline", label: "Growth Timeline", render: () => <SlideTimeline /> },
  { id: "divisions", label: "7 Divisions", render: () => <SlideDivisionsOverview /> },
  ...DIVISIONS.map((d) => ({ id: `div-${d.number}`, label: `Division ${d.number}`, render: () => <DivisionSlide {...d} /> })),
  { id: "workers", label: "Worker Services ★", render: () => <SlideWorkerServices /> },
  { id: "values", label: "Core Values", render: () => <SlideCoreValues /> },
  { id: "contact", label: "Contact", render: () => <SlideContact /> },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function CompanyProfile() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const slidesRef = useRef({});

  // Preload all images (crossOrigin) so html2canvas can capture them
  useEffect(() => {
    let cancelled = false;
    Promise.all(ALL_IMAGE_URLS.map((url) => new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = resolve;
      img.onerror = resolve;
      img.src = url;
    }))).then(() => { if (!cancelled) setImagesReady(true); });
    return () => { cancelled = true; };
  }, []);

  const generatePDF = async () => {
    setGenerating(true);
    setProgress(0);
    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const W = 297, H = 210;
      for (let i = 0; i < SLIDES.length; i++) {
        const el = slidesRef.current[SLIDES[i].id];
        if (!el) continue;
        const canvas = await html2canvas(el, { scale: 2, useCORS: true, logging: false, width: el.offsetWidth, height: el.offsetHeight });
        const imgData = canvas.toDataURL("image/jpeg", 0.94);
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

  const DownloadBtn = ({ large }) => (
    <Button onClick={generatePDF} disabled={generating || !imagesReady}
      className={`bg-[#E8832A] hover:bg-[#d0721f] text-white gap-2 ${large ? "px-10 py-4 text-lg h-14" : "px-6 py-3 text-base h-12"}`}>
      {generating ? (<><Loader2 className="w-5 h-5 animate-spin" /> Generating {progress}%</>)
        : !imagesReady ? (<><Loader2 className="w-5 h-5 animate-spin" /> Loading assets...</>)
        : (<>{large ? <FileText className="w-5 h-5" /> : <Download className="w-5 h-5" />} Download PDF</>)}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Company Profile Generator</h1>
            <p className="text-sm text-gray-500 mt-1">{SLIDES.length}-slide profile matching the Distinct Mark brand — with leadership photo &amp; worker services focus</p>
          </div>
          <DownloadBtn />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {SLIDES.map((s) => (
            <a key={s.id} href={`#slide-${s.id}`}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-[#E8832A] hover:text-white hover:border-[#E8832A] transition-colors">
              {s.label}
            </a>
          ))}
        </div>

        <div className="space-y-6">
          {SLIDES.map((slide, idx) => (
            <div key={slide.id} id={`slide-${slide.id}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Slide {idx + 1}</span>
                <span className="text-sm font-semibold text-gray-700">{slide.label}</span>
                {slide.id === "leadership" && <span className="text-xs bg-[#1a2340] text-white px-2 py-0.5 rounded-full font-semibold">Photo</span>}
                {slide.id === "workers" && <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">★ Key Focus</span>}
              </div>
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <div style={{ position: "relative", width: "100%", overflow: "hidden" }}
                  ref={(el) => {
                    if (el) {
                      const inner = el.firstChild;
                      const updateScale = () => {
                        const scale = el.offsetWidth / (297 * 3.7795);
                        inner.style.transform = `scale(${scale})`;
                        el.style.height = `${210 * 3.7795 * scale}px`;
                      };
                      updateScale();
                      window.addEventListener("resize", updateScale);
                    }
                  }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "297mm", transformOrigin: "top left" }}>
                    <div ref={(el) => { if (el) slidesRef.current[slide.id] = el; }}>
                      {slide.render()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <DownloadBtn large />
          <p className="text-xs text-gray-400 mt-2">A4 landscape · {SLIDES.length} slides · High resolution</p>
        </div>
      </div>
    </div>
  );
}