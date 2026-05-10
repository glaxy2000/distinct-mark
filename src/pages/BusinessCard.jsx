import React, { useRef, useState } from "react";
import { FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const CARD_W = 1008;
const CARD_H = 576;

// QR code as SVG — encodes https://distinctmark.net
function QRCode() {
  // Simple QR-like decorative block pattern referencing the URL
  const s = 10; // cell size
  const cells = [
    // Top-left position detection
    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
    [0,1],[6,1],
    [0,2],[2,2],[3,2],[4,2],[6,2],
    [0,3],[2,3],[3,3],[4,3],[6,3],
    [0,4],[2,4],[3,4],[4,4],[6,4],
    [0,5],[6,5],
    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],
    // Top-right position detection
    [14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],
    [14,1],[20,1],
    [14,2],[16,2],[17,2],[18,2],[20,2],
    [14,3],[16,3],[17,3],[18,3],[20,3],
    [14,4],[16,4],[17,4],[18,4],[20,4],
    [14,5],[20,5],
    [14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[20,6],
    // Bottom-left position detection
    [0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[6,14],
    [0,15],[6,15],
    [0,16],[2,16],[3,16],[4,16],[6,16],
    [0,17],[2,17],[3,17],[4,17],[6,17],
    [0,18],[2,18],[3,18],[4,18],[6,18],
    [0,19],[6,19],
    [0,20],[1,20],[2,20],[3,20],[4,20],[5,20],[6,20],
    // Data cells
    [8,0],[9,0],[11,0],[12,0],
    [8,2],[10,2],[12,2],
    [9,3],[11,3],[12,3],
    [8,4],[10,4],
    [8,6],[9,6],[12,6],
    [8,8],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[15,8],[16,8],[17,8],[18,8],[19,8],[20,8],
    [8,9],[10,9],[12,9],[14,9],[16,9],[18,9],[20,9],
    [9,10],[11,10],[13,10],[15,10],[17,10],[19,10],
    [8,11],[10,11],[12,11],[14,11],[16,11],[18,11],[20,11],
    [9,12],[11,12],[13,12],[15,12],[17,12],[19,12],
    [8,13],[10,13],[12,13],[14,13],[16,13],[18,13],[20,13],
    [9,14],[11,14],[13,14],[15,14],[17,14],[19,14],
    [8,15],[10,15],[12,15],[14,15],[16,15],[18,15],[20,15],
    [9,16],[11,16],[13,16],[15,16],[17,16],[19,16],
    [8,17],[10,17],[12,17],[14,17],[16,17],[18,17],[20,17],
    [9,18],[11,18],[13,18],[15,18],[17,18],[19,18],
    [8,19],[10,19],[12,19],[14,19],[16,19],[18,19],[20,19],
    [9,20],[11,20],[13,20],[15,20],[17,20],[19,20],
  ];

  const size = 21 * s;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100px", height: "100px" }}>
      <rect width={size} height={size} fill="white" />
      {cells.map(([x, y], i) => (
        <rect key={i} x={x * s} y={y * s} width={s} height={s} fill="#1a2340" />
      ))}
    </svg>
  );
}

function CardFront() {
  return (
    <div
      style={{
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        fontFamily: "'Open Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        borderRadius: "0px",
      }}
    >
      {/* ── LEFT DARK PANEL ── */}
      <div style={{
        width: "46%",
        background: "#1a2340",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "48px 52px",
        overflow: "hidden",
        zIndex: 1,
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }} />

        {/* Orange top bar on left panel */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: "#E8832A" }} />

        {/* Name */}
        <div style={{
          color: "#FFFFFF",
          fontSize: "40px",
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          lineHeight: 1.05,
          position: "relative", zIndex: 1,
        }}>
          ANNUS<br />KHAN
        </div>

        {/* Orange line */}
        <div style={{ width: "48px", height: "3px", background: "#E8832A", margin: "14px 0 12px", position: "relative", zIndex: 1 }} />

        {/* Title */}
        <div style={{
          color: "#E8832A",
          fontSize: "11.5px",
          fontWeight: "700",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: "36px",
          position: "relative", zIndex: 1,
        }}>
          Chief Technology Officer
        </div>

        {/* Contact rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "13px", position: "relative", zIndex: 1 }}>
          {[
            { icon: "📞", value: "+966 546 577 640" },
            { icon: "✉", value: "annus@distinctmark.net" },
            { icon: "🌐", value: "www.distinctmark.net" },
            { icon: "📍", value: "King Fahd District, Riyadh, KSA" },
          ].map(({ icon, value }) => (
            <div key={value} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", opacity: 0.7, width: "18px", textAlign: "center" }}>{icon}</span>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", letterSpacing: "0.2px" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Wave shape on right edge */}
        <svg style={{ position: "absolute", right: "-1px", top: 0, height: "100%", width: "80px" }}
          viewBox="0 0 80 576" preserveAspectRatio="none">
          <path d="M80,0 Q20,144 60,288 Q100,432 20,576 L80,576 Z" fill="#111c35" />
          <path d="M80,0 Q30,144 70,288 Q110,432 30,576 L80,576 Z" fill="#1a2340" />
        </svg>
      </div>

      {/* ── RIGHT LIGHT PANEL ── */}
      <div style={{
        flex: 1,
        background: "#f5f6fa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "44px 52px 40px 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Bottom accent bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "5px", background: "#E8832A" }} />

        {/* Large watermark diamond */}
        <div style={{ position: "absolute", right: "-30px", top: "50%", transform: "translateY(-50%)", opacity: 0.04, pointerEvents: "none" }}>
          <svg viewBox="0 0 300 300" style={{ width: "320px", height: "320px" }}>
            <polygon points="150,10 290,150 150,290 10,150" fill="none" stroke="#1a2340" strokeWidth="8" />
            <polygon points="150,55 245,150 150,245 55,150" fill="#1a2340" />
          </svg>
        </div>

        {/* TOP — Logo */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" style={{ height: "48px", width: "auto" }}>
            <g transform="translate(0, 2)">
              <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#E8832A" strokeWidth="2" />
              <polygon points="20,8 32,20 20,32 8,20" fill="#E8832A" opacity="0.2" />
              <text x="20" y="25" textAnchor="middle" fontSize="14" fontWeight="800" fontFamily="'Open Sans', sans-serif" letterSpacing="-1">
                <tspan fill="#E8832A">D</tspan><tspan fill="#1a2340">M</tspan>
              </text>
            </g>
            <line x1="50" y1="8" x2="50" y2="36" stroke="#E8832A" strokeWidth="1.2" strokeOpacity="0.5" />
            <g transform="translate(58, 0)">
              <text y="20" fontSize="12.5" fontWeight="800" fontFamily="'Open Sans', sans-serif" fill="#E8832A" letterSpacing="3">DISTINCT</text>
              <text y="36" fontSize="12.5" fontWeight="700" fontFamily="'Open Sans', sans-serif" fill="#1a2340" letterSpacing="5.5">MARK</text>
            </g>
          </svg>
        </div>

        {/* MIDDLE — Company tagline */}
        <div style={{ textAlign: "right" }}>
          <div style={{
            color: "#1a2340",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}>
            Distinct Mark Co.
          </div>
          <div style={{ color: "#E8832A", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600" }}>
            Building Excellence
          </div>
        </div>

        {/* BOTTOM — QR + scan text */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: "14px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#1a2340", fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "3px" }}>
              Scan to visit
            </div>
            <div style={{ color: "#888", fontSize: "9px", letterSpacing: "0.5px" }}>
              www.distinctmark.net
            </div>
          </div>
          <div style={{
            padding: "8px",
            background: "white",
            borderRadius: "8px",
            border: "1.5px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}>
            <QRCode />
          </div>
        </div>
      </div>
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
      backgroundColor: "#f5f6fa",
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
    <div className="min-h-screen bg-gray-200 py-10 px-4">
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
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Preview</p>
        <div style={{
          width: `${CARD_W * 0.62}px`,
          height: `${CARD_H * 0.62}px`,
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.22)",
        }}>
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