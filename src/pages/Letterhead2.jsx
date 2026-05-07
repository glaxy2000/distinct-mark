import React, { useRef, useState } from "react";
import { FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function LogoSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 44"
      style={{ height: "52px", width: "auto" }}
      aria-label="Distinct Mark"
    >
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
  );
}

export default function Letterhead2() {
  const letterRef = useRef(null);
  const [downloading, setDownloading] = useState(null);

  const captureCanvas = async () => {
    return await html2canvas(letterRef.current, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      foreignObjectRendering: false,
    });
  };

  const downloadJPG = async () => {
    setDownloading("jpg");
    try {
      const canvas = await captureCanvas();
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "DistinctMark_Letterhead_AR.jpg";
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
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("DistinctMark_Letterhead_AR.pdf");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Controls */}
      <div className="max-w-[794px] mx-auto mb-6">
        <h1 className="text-xl font-bold text-gray-700 mb-4">ورق الشركة (عربي)</h1>
        <div className="flex gap-3">
          <Button
            onClick={downloadJPG}
            disabled={!!downloading}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <FileImage className="w-4 h-4" />
            {downloading === "jpg" ? "جاري التحميل..." : "تحميل JPG"}
          </Button>
          <Button
            onClick={downloadPDF}
            disabled={!!downloading}
            className="bg-[#E8832A] hover:bg-[#d0721f] text-white gap-2"
          >
            <FileText className="w-4 h-4" />
            {downloading === "pdf" ? "جاري التحميل..." : "تحميل PDF"}
          </Button>
        </div>
      </div>

      {/* A4 Letterhead */}
      <div
        ref={letterRef}
        style={{
          width: "794px",
          height: "1123px",
          margin: "0 auto",
          background: "#ffffff",
          fontFamily: "'Open Sans', sans-serif",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          direction: "rtl",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "6px", background: "linear-gradient(90deg, #E8832A 0%, #1a2340 40%)", flexShrink: 0 }} />

        {/* Header — logo always on left, Arabic info on right, same as English */}
        <div style={{ background: "#1a2340", padding: "22px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, direction: "ltr" }}>
          <LogoSVG />
          <div style={{ textAlign: "right" }}>
            <svg viewBox="0 0 200 30" style={{ height: "28px", width: "auto", marginBottom: "5px" }}>
              <text x="195" y="22" textAnchor="end" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif" fill="#E8832A">شركة ديستينكت مارك</text>
            </svg>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "10.5px", lineHeight: "1.85", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
              <div style={{ display: "flex", gap: "8px", direction: "ltr" }}>
                <span> ٧٧٧٧ ٨١٥ ٠٥٥</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>|</span>
                <span>رقم الجوال</span>
              </div>
              <div style={{ display: "flex", gap: "8px", direction: "ltr" }}>
                <span>٧٠٠٤٧٦٥٣٢٢</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>|</span>
                <span>السجل التجاري</span>
              </div>
              <div style={{ display: "flex", gap: "8px", direction: "ltr" }}>
                <span>info@distinctmark.net</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>|</span>
                <span>البريد الإلكتروني</span>
              </div>
              <div style={{ display: "flex", gap: "8px", direction: "ltr" }}>
                <span>www.distinctmark.net</span>
                <span style={{ color: "rgba(255,255,255,0.6)" }}>|</span>
                <span>الموقع</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orange divider */}
        <div style={{ height: "4px", background: "#E8832A", flexShrink: 0 }} />

        {/* Address bar */}
        <div style={{ background: "#f7f8fa", padding: "8px 48px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "8px", borderBottom: "1px solid #e5e7eb", flexShrink: 0 }}>
          <span style={{ color: "#E8832A", fontSize: "11px", fontWeight: "bold" }}>&#9679;</span>
          <span style={{ color: "#6b7280", fontSize: "11px" }}>
            RURD7110، ٢٤٧٥، الرمال، الرياض ١٣٢٦٦، المملكة العربية السعودية
          </span>
        </div>

        {/* Body — clean empty writing area */}
        <div style={{ padding: "32px 48px 0", flex: 1 }} />

        {/* Footer */}
        <div style={{ marginTop: "auto", flexShrink: 0 }}>
          <div style={{ height: "3px", background: "#E8832A" }} />
          <div style={{ background: "#1a2340", padding: "12px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "14px" }}>
              {["إنشاءات", "كهرباء وميكانيكا", "تقنية المعلومات", "تموين", "تجارة", "نقل", "معدات"].map((s) => (
                <span key={s} style={{ color: "rgba(255,255,255,0.35)", fontSize: "8.5px" }}>{s}</span>
              ))}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "9.5px" }}>
              © ٢٠٢٥ ديستينكت مارك. جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}