import React, { useRef, useEffect, useState } from "react";
import { FileImage, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

const CARD_W = 1050;
const CARD_H = 600;
const DARK_W = CARD_W * 0.54;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function drawCard(canvas, fields) {
  const { name, position, email, website, address } = fields;
  const ctx = canvas.getContext("2d");
  canvas.width = CARD_W;
  canvas.height = CARD_H;

  await document.fonts.load("800 46px 'Open Sans'");
  await document.fonts.load("700 14px 'Open Sans'");
  await document.fonts.load("400 14px 'Open Sans'");

  // ── LEFT DARK PANEL ──
  ctx.fillStyle = "#1a2340";
  ctx.fillRect(0, 0, DARK_W, CARD_H);

  // Subtle grid
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 1;
  for (let x = 0; x < DARK_W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CARD_H); ctx.stroke(); }
  for (let y = 0; y < CARD_H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(DARK_W, y); ctx.stroke(); }
  ctx.restore();

  // Wave divider
  ctx.save();
  ctx.fillStyle = "#111c35";
  ctx.beginPath();
  ctx.moveTo(DARK_W, 0);
  ctx.quadraticCurveTo(DARK_W - 60, CARD_H * 0.25, DARK_W - 20, CARD_H * 0.5);
  ctx.quadraticCurveTo(DARK_W + 20, CARD_H * 0.75, DARK_W - 40, CARD_H);
  ctx.lineTo(DARK_W, CARD_H);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Orange top bar
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(0, 0, DARK_W, 6);

  const PAD = 52;

  // Name
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 46px 'Open Sans'";
  ctx.fillText((name || "YOUR NAME").toUpperCase(), PAD, 200);

  // Orange divider line
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(PAD, 222, 52, 3);

  // Position
  ctx.fillStyle = "#E8832A";
  ctx.font = "700 14px 'Open Sans'";
  ctx.fillText((position || "YOUR POSITION").toUpperCase(), PAD, 258);

  // Contact rows
  const contacts = [
    email || "email@distinctmark.net",
    website || "www.distinctmark.net",
    address || "Riyadh, Saudi Arabia",
  ];

  ctx.font = "400 14px 'Open Sans'";
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  contacts.forEach((c, i) => {
    ctx.fillText(c, PAD + 6, 310 + i * 38);
  });

  // Small orange dots before each contact
  contacts.forEach((_, i) => {
    ctx.fillStyle = "#E8832A";
    ctx.beginPath();
    ctx.arc(PAD - 8, 305 + i * 38, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // ── RIGHT LIGHT PANEL ──
  ctx.fillStyle = "#f5f6fa";
  ctx.fillRect(DARK_W, 0, CARD_W - DARK_W, CARD_H);

  // Orange bottom bar
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(DARK_W, CARD_H - 6, CARD_W - DARK_W, 6);

  // Watermark diamond
  ctx.save();
  ctx.globalAlpha = 0.04;
  const cx = CARD_W - 80, cy = CARD_H / 2, r = 160;
  ctx.strokeStyle = "#1a2340";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy);
  ctx.closePath(); ctx.stroke();
  ctx.fillStyle = "#1a2340";
  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 0.6); ctx.lineTo(cx + r * 0.6, cy); ctx.lineTo(cx, cy + r * 0.6); ctx.lineTo(cx - r * 0.6, cy);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  // Logo SVG
  const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" width="200" height="44">
    <g transform="translate(0,2)">
      <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#E8832A" stroke-width="2"/>
      <polygon points="20,8 32,20 20,32 8,20" fill="#E8832A" opacity="0.2"/>
      <text x="20" y="25" text-anchor="middle" font-size="14" font-weight="800" font-family="Open Sans,sans-serif" letter-spacing="-1">
        <tspan fill="#E8832A">D</tspan><tspan fill="#1a2340">M</tspan>
      </text>
    </g>
    <line x1="50" y1="8" x2="50" y2="36" stroke="#E8832A" stroke-width="1.2" stroke-opacity="0.5"/>
    <g transform="translate(58,0)">
      <text y="20" font-size="12.5" font-weight="800" font-family="Open Sans,sans-serif" fill="#E8832A" letter-spacing="3">DISTINCT</text>
      <text y="36" font-size="12.5" font-weight="700" font-family="Open Sans,sans-serif" fill="#1a2340" letter-spacing="5.5">MARK</text>
    </g>
  </svg>`;
  const logoBlob = new Blob([logoSVG], { type: "image/svg+xml" });
  const logoUrl = URL.createObjectURL(logoBlob);
  await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, CARD_W - 52 - 200, 44, 200, 44);
      URL.revokeObjectURL(logoUrl);
      resolve();
    };
    img.src = logoUrl;
  });

  // Company name + tagline
  const rPad = CARD_W - PAD;
  ctx.textAlign = "right";
  ctx.fillStyle = "#1a2340";
  ctx.font = "600 13px 'Open Sans'";
  ctx.fillText("DISTINCT MARK CO.", rPad, CARD_H / 2 + 8);
  ctx.fillStyle = "#E8832A";
  ctx.font = "600 11px 'Open Sans'";
  ctx.fillText("BUILDING EXCELLENCE", rPad, CARD_H / 2 + 28);
  ctx.textAlign = "left";

  // QR code
  const qrUrl = website ? (website.startsWith("http") ? website : "https://" + website) : "https://www.distinctmark.net";
  const qrDataUrl = await QRCode.toDataURL(qrUrl, {
    width: 110,
    margin: 1,
    color: { dark: "#1a2340", light: "#ffffff" },
  });

  await new Promise((resolve) => {
    const qrImg = new Image();
    qrImg.onload = () => {
      const qx = CARD_W - PAD - 110 - 10;
      const qy = CARD_H - 50 - 110 - 10;
      ctx.fillStyle = "white";
      roundRect(ctx, qx - 8, qy - 8, 126, 126, 8);
      ctx.fill();
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1.5;
      roundRect(ctx, qx - 8, qy - 8, 126, 126, 8);
      ctx.stroke();
      ctx.drawImage(qrImg, qx, qy, 110, 110);
      resolve();
    };
    qrImg.src = qrDataUrl;
  });

  // Scan label
  ctx.textAlign = "right";
  ctx.fillStyle = "#1a2340";
  ctx.font = "700 11px 'Open Sans'";
  ctx.fillText("SCAN TO VISIT", CARD_W - PAD - 110 - 18 - 4, CARD_H - 74);
  ctx.fillStyle = "#888888";
  ctx.font = "400 10px 'Open Sans'";
  ctx.fillText(website || "www.distinctmark.net", CARD_W - PAD - 110 - 18 - 4, CARD_H - 58);
  ctx.textAlign = "left";
}

export default function BusinessCard() {
  const previewRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(null);

  const [fields, setFields] = useState({
    name: "ANNUS KHAN",
    position: "CHIEF TECHNOLOGY OFFICER",
    email: "annus@distinctmark.net",
    website: "www.distinctmark.net",
    address: "King Fahd District, Riyadh, KSA",
  });

  const updateField = (key, value) => setFields((f) => ({ ...f, [key]: value }));

  // Redraw whenever fields change
  useEffect(() => {
    setReady(false);
    drawCard(previewRef.current, fields).then(() => setReady(true));
  }, [fields]);

  const getDownloadCanvas = async () => {
    const canvas = document.createElement("canvas");
    await drawCard(canvas, fields);
    return canvas;
  };

  const downloadJPG = async () => {
    setDownloading("jpg");
    const canvas = await getDownloadCanvas();
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.97);
    link.download = `${fields.name || "BusinessCard"}_Card.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(null);
  };

  const downloadPDF = async () => {
    setDownloading("pdf");
    const canvas = await getDownloadCanvas();
    const imgData = canvas.toDataURL("image/jpeg", 0.97);
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [88.9, 50.8] });
    pdf.addImage(imgData, "JPEG", 0, 0, 88.9, 50.8);
    pdf.save(`${fields.name || "BusinessCard"}_Card.pdf`);
    setDownloading(null);
  };

  const SCALE = 0.62;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-bold text-gray-700 mb-1">Business Card Generator</h1>
        <p className="text-sm text-gray-500 mb-6">Fill in the details below and the card updates live.</p>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Full Name</Label>
            <Input
              value={fields.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="e.g. Annus Khan"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Position / Title</Label>
            <Input
              value={fields.position}
              onChange={(e) => updateField("position", e.target.value)}
              placeholder="e.g. Chief Technology Officer"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Email</Label>
            <Input
              value={fields.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="e.g. name@distinctmark.net"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Website</Label>
            <Input
              value={fields.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="e.g. www.distinctmark.net"
            />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Address</Label>
            <Input
              value={fields.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="e.g. King Fahd District, Riyadh, KSA"
            />
          </div>
        </div>

        {/* Download buttons */}
        <div className="flex gap-3 mb-6">
          <Button onClick={downloadJPG} disabled={!!downloading || !ready} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <FileImage className="w-4 h-4" />
            {downloading === "jpg" ? "Downloading..." : "Download JPG"}
          </Button>
          <Button onClick={downloadPDF} disabled={!!downloading || !ready} className="bg-[#E8832A] hover:bg-[#d0721f] text-white gap-2">
            <FileText className="w-4 h-4" />
            {downloading === "pdf" ? "Downloading..." : "Download PDF"}
          </Button>
        </div>

        {/* Preview */}
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Live Preview</p>
        <div style={{
          width: `${CARD_W * SCALE}px`,
          height: `${CARD_H * SCALE}px`,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 12px 48px rgba(0,0,0,0.22)",
        }}>
          <canvas
            ref={previewRef}
            style={{ width: `${CARD_W * SCALE}px`, height: `${CARD_H * SCALE}px`, display: "block" }}
          />
        </div>
      </div>
    </div>
  );
}