import React, { useRef, useState } from "react";
import { FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// 3.5" × 2" at 96dpi × 3 scale = 1008 × 576px
const CARD_W = 1008;
const CARD_H = 576;

function CardFront() {
  return (
    <div
      style={{
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        background: "linear-gradient(135deg, #111827 0%, #1a2340 55%, #0f1a2e 100%)",
        fontFamily: "'Open Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top orange accent bar */}
      <div style={{ height: "7px", background: "#E8832A", flexShrink: 0 }} />

      {/* Subtle grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        pointerEvents: "none",
      }} />

      {/* Large diamond watermark — bottom right */}
      <div style={{ position: "absolute", right: "-60px", bottom: "-60px", opacity: 0.06, pointerEvents: "none" }}>
        <svg viewBox="0 0 300 300" style={{ width: "320px", height: "320px" }}>
          <polygon points="150,10 290,150 150,290 10,150" fill="none" stroke="#E8832A" strokeWidth="6" />
          <polygon points="150,55 245,150 150,245 55,150" fill="#E8832A" opacity="0.5" />
        </svg>
      </div>

      {/* Main two-column layout */}
      <div style={{ flex: 1, display: "flex", alignItems: "stretch", padding: "0 0 0 0" }}>

        {/* LEFT — Name, title, divider, website */}
        <div style={{
          flex: "0 0 46%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 48px 40px 54px",
          borderRight: "1px solid rgba(232,131,42,0.2)",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Name */}
          <div style={{
            color: "#FFFFFF",
            fontSize: "38px",
            fontWeight: "800",
            letterSpacing: "1px",
            lineHeight: 1.05,
            textTransform: "uppercase",
          }}>
            ANNUS<br />KHAN
          </div>

          {/* Orange divider under name */}
          <div style={{ width: "52px", height: "3px", background: "#E8832A", margin: "16px 0" }} />

          {/* Title */}
          <div style={{
            color: "#E8832A",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "3px",
            textTransform: "uppercase",
            lineHeight: 1.5,
          }}>
            Chief Technology<br />Officer
          </div>

          {/* Website at bottom left */}
          <div style={{
            marginTop: "auto",
            paddingTop: "28px",
            color: "rgba(255,255,255,0.35)",
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}>
            distinctmark.net
          </div>
        </div>

        {/* RIGHT — Contact details + logo */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 48px 36px 52px",
          position: "relative",
          zIndex: 1,
        }}>
          {/* Contact rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {[
              { label: "TEL", value: "+966 546 577 640" },
              { label: "EMAIL", value: "annus@distinctmark.net" },
              { label: "WEB", value: "www.distinctmark.net" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ color: "#E8832A", fontSize: "9px", fontWeight: "800", letterSpacing: "2.5px", marginBottom: "4px" }}>
                  {label}
                </div>
                <div style={{ color: "rgba(255,255,255,0.80)", fontSize: "13px", fontWeight: "400", letterSpacing: "0.3px" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Logo bottom-right */}
          <div style={{ position: "absolute", bottom: "28px", right: "44px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" style={{ height: "38px", width: "auto", opacity: 0.75 }}>
              <g transform="translate(0, 2)">
                <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#E8832A" strokeWidth="2" />
                <polygon points="20,8 32,20 20,32 8,20" fill="#E8832A" opacity="0.2" />
                <text x="20" y="25" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="'Open Sans', sans-serif" letterSpacing="-1">
                  <tspan fill="#E8832A">D</tspan><tspan fill="#FFFFFF">M</tspan>
                </text>
              </g>
              <line x1="50" y1="8" x2="50" y2="36" stroke="#E8832A" strokeWidth="1.2" strokeOpacity="0.4" />
              <g transform="translate(58, 0)">
                <text y="20" fontSize="12.5" fontWeight="800" fontFamily="'Open Sans', sans-serif" fill="#E8832A" letterSpacing="3">DISTINCT</text>
                <text y="36" fontSize="12.5" fontWeight="700" fontFamily="'Open Sans', sans-serif" fill="rgba(255,255,255,0.6)" letterSpacing="5.5">MARK</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom orange bar */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #E8832A, rgba(232,131,42,0.3))", flexShrink: 0 }} />
    </div>
  );
}

export default function BusinessCard() {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(null);

  const captureCanvas = async () => {
    return await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#111827",
      logging: false,
      foreignObjectRendering: false,
    });
  };

  const downloadJPG = async () => {
    setDownloading("jpg");
    try {
      const canvas = await captureCanvas();
      const dataUrl = canvas.toDataURL("image/jpeg", 0.97);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "AnnusKhan_BusinessCard.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(null);
    }
  };

  const downloadPDF = async () => {
    setDownloading("pdf");
    try {
      const canvas = await captureCanvas();
      const imgData = canvas.toDataURL("image/jpeg", 0.97);
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [88.9, 50.8] });
      pdf.addImage(imgData, "JPEG", 0, 0, 88.9, 50.8);
      pdf.save("AnnusKhan_BusinessCard.pdf");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-xl font-bold text-gray-700 mb-1">Business Card — Annus Khan</h1>
        <p className="text-sm text-gray-500 mb-5">3.5" × 2" standard business card</p>
        <div className="flex gap-3">
          <Button onClick={downloadJPG} disabled={!!downloading} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <FileImage className="w-4 h-4" />
            {downloading === "jpg" ? "Downloading..." : "Download JPG"}
          </Button>
          <Button onClick={downloadPDF} disabled={!!downloading} className="bg-[#E8832A] hover:bg-[#d0721f] text-white gap-2">
            <FileText className="w-4 h-4" />
            {downloading === "pdf" ? "Downloading..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* Scaled preview */}
      <div className="max-w-5xl mx-auto overflow-hidden">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Preview</p>
        <div style={{ width: `${CARD_W * 0.62}px`, height: `${CARD_H * 0.62}px`, overflow: "hidden", borderRadius: "8px", boxShadow: "0 8px 40px rgba(0,0,0,0.25)" }}>
          <div style={{ transform: "scale(0.62)", transformOrigin: "top left" }}>
            <div ref={cardRef}>
              <CardFront />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}