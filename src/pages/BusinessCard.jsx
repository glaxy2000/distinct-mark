import React, { useRef, useState } from "react";
import { FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Business card dimensions: 3.5" × 2" at 96dpi = 336 × 192px
// We render at 3x scale for quality: 1008 × 576px display
const CARD_W = 1008;
const CARD_H = 576;

function CardFront() {
  return (
    <div
      style={{
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        background: "#1a2340",
        fontFamily: "'Open Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top accent bar */}
      <div style={{ height: "9px", background: "linear-gradient(90deg, #1a2340 50%, #E8832A 100%)", flexShrink: 0 }} />

      {/* Decorative diamond watermark */}
      <div style={{ position: "absolute", right: "-40px", top: "50%", transform: "translateY(-50%)", opacity: 0.05 }}>
        <svg viewBox="0 0 200 200" style={{ width: "360px", height: "360px" }}>
          <polygon points="100,0 200,100 100,200 0,100" fill="none" stroke="#E8832A" strokeWidth="4" />
          <polygon points="100,30 170,100 100,170 30,100" fill="#E8832A" />
        </svg>
      </div>

      {/* Orange side accent */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "6px", background: "#E8832A" }} />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "36px 54px 28px 60px" }}>
        <div style={{ flex: 1 }}>
          {/* Logo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" style={{ height: "46px", width: "auto", marginBottom: "28px" }}>
            <g transform="translate(0, 2)">
              <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#E8832A" strokeWidth="2" />
              <polygon points="20,8 32,20 20,32 8,20" fill="#E8832A" opacity="0.15" />
              <text x="20" y="25" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="'Open Sans', sans-serif" letterSpacing="-1">
                <tspan fill="#E8832A">D</tspan><tspan fill="#FFFFFF">M</tspan>
              </text>
            </g>
            <line x1="50" y1="8" x2="50" y2="36" stroke="#E8832A" strokeWidth="1.2" strokeOpacity="0.4" />
            <g transform="translate(58, 0)">
              <text y="20" fontSize="12.5" fontWeight="800" fontFamily="'Open Sans', sans-serif" fill="#E8832A" letterSpacing="3">DISTINCT</text>
              <text y="36" fontSize="12.5" fontWeight="700" fontFamily="'Open Sans', sans-serif" fill="#FFFFFF" letterSpacing="5.5">MARK</text>
            </g>
          </svg>

          {/* Name */}
          <div style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "800", letterSpacing: "0.5px", lineHeight: 1.1 }}>
            ANNUS KHAN
          </div>
          {/* Title */}
          <div style={{ color: "#E8832A", fontSize: "13px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase", marginTop: "6px", marginBottom: "28px" }}>
            Chief Technology Officer
          </div>

          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {[
              { label: "TEL", value: "+966 546 577 640" },
              { label: "EMAIL", value: "annus@distinctmark.net" },
              { label: "WEB", value: "www.distinctmark.net" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#E8832A", fontSize: "9px", fontWeight: "800", letterSpacing: "1.5px", width: "38px", flexShrink: 0 }}>{label}</span>
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "10px", width: "1px", flexShrink: 0 }}>|</span>
                <span style={{ color: "rgba(255,255,255,0.80)", fontSize: "11px", fontWeight: "400" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ height: "6px", background: "#E8832A", flexShrink: 0 }} />
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
      backgroundColor: "#1a2340",
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
      // 3.5" × 2" in mm
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
        <p className="text-sm text-gray-500 mb-5">3.5" × 2" standard business card size</p>
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

      {/* Preview — scaled down to fit screen */}
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Preview (Front)</p>
        <div style={{ transform: "scale(0.65)", transformOrigin: "top left", width: `${CARD_W}px` }}>
          <div ref={cardRef}>
            <CardFront />
          </div>
        </div>
      </div>
    </div>
  );
}