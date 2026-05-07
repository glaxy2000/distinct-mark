import React, { useRef, useState } from "react";
import { Download, FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const LOGO_URL = "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/a97d0cc9c_DMLogo.png";

export default function Letterhead() {
  const letterRef = useRef(null);
  const [downloading, setDownloading] = useState(null);

  const captureCanvas = async () => {
    return await html2canvas(letterRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });
  };

  const downloadJPG = async () => {
    setDownloading("jpg");
    const canvas = await captureCanvas();
    const link = document.createElement("a");
    link.download = "DistinctMark_Letterhead.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.95);
    link.click();
    setDownloading(null);
  };

  const downloadPDF = async () => {
    setDownloading("pdf");
    const canvas = await captureCanvas();
    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("DistinctMark_Letterhead.pdf");
    setDownloading(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Controls */}
      <div className="max-w-[794px] mx-auto mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-700">Company Letterhead</h1>
        <div className="flex gap-3">
          <Button
            onClick={downloadJPG}
            disabled={!!downloading}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <FileImage className="w-4 h-4" />
            {downloading === "jpg" ? "Downloading..." : "Download JPG"}
          </Button>
          <Button
            onClick={downloadPDF}
            disabled={!!downloading}
            className="bg-[#E8832A] hover:bg-[#d0721f] text-white gap-2"
          >
            <FileText className="w-4 h-4" />
            {downloading === "pdf" ? "Downloading..." : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* A4 Letterhead */}
      <div
        ref={letterRef}
        className="mx-auto bg-white"
        style={{
          width: "794px",
          minHeight: "1123px",
          fontFamily: "'Open Sans', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "6px", background: "linear-gradient(90deg, #1a2340 60%, #E8832A 100%)" }} />

        {/* Header */}
        <div
          style={{
            background: "#1a2340",
            padding: "28px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <img
            src={LOGO_URL}
            alt="Distinct Mark"
            crossOrigin="anonymous"
            style={{ height: "70px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
          />

          {/* Contact strip */}
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#E8832A", fontWeight: "700", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>
              DISTINCT MARK
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", lineHeight: "1.9" }}>
              <div>📞 055 815 7777</div>
              <div>✉️ info@distinctmark.net</div>
              <div>🌐 www.distinctmark.net</div>
            </div>
          </div>
        </div>

        {/* Orange divider */}
        <div style={{ height: "4px", background: "#E8832A" }} />

        {/* Address bar */}
        <div
          style={{
            background: "#f7f8fa",
            padding: "10px 48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <span style={{ color: "#E8832A", fontSize: "12px" }}>📍</span>
          <span style={{ color: "#6b7280", fontSize: "11.5px" }}>
            RURD7110, 2475, Ar Rimal, Riyadh 13266, Kingdom of Saudi Arabia
          </span>
        </div>

        {/* Body area */}
        <div style={{ padding: "48px 48px 0" }}>
          {/* Date & Ref line placeholders */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>Reference No.</div>
              <div style={{ marginTop: "4px", width: "160px", borderBottom: "1px solid #d1d5db", height: "22px" }} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px" }}>Date</div>
              <div style={{ marginTop: "4px", width: "160px", borderBottom: "1px solid #d1d5db", height: "22px" }} />
            </div>
          </div>

          {/* Subject line */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Subject</div>
            <div style={{ borderBottom: "1px solid #d1d5db", height: "22px", width: "100%" }} />
          </div>

          {/* Salutation */}
          <div style={{ fontSize: "13px", color: "#374151", marginBottom: "20px" }}>Dear Sir / Madam,</div>

          {/* Body lines */}
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #e5e7eb",
                height: "28px",
                marginBottom: "4px",
                width: i === 15 ? "60%" : "100%",
              }}
            />
          ))}

          {/* Signature block */}
          <div style={{ marginTop: "48px", display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "40px" }}>Authorized Signature</div>
              <div style={{ width: "200px", borderTop: "1px solid #374151" }} />
              <div style={{ fontSize: "11px", color: "#374151", marginTop: "6px" }}>Name & Title</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "40px" }}>Company Stamp</div>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "2px dashed #d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "10px", color: "#d1d5db" }}>STAMP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {/* Orange top accent */}
          <div style={{ height: "3px", background: "#E8832A" }} />
          <div
            style={{
              background: "#1a2340",
              padding: "14px 48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
              © 2025 Distinct Mark. All Rights Reserved.
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Construction", "Electrical & Mechanical", "IT Services", "Catering", "Trading", "Transport", "Equipment"].map((s) => (
                <span key={s} style={{ color: "rgba(255,255,255,0.35)", fontSize: "9px" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}