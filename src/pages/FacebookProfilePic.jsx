import React, { useRef, useEffect, useState } from "react";
import { FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

// Facebook profile pic: 800×800 px (displays at 170×170, shown in circle)
const SIZE = 800;

async function drawProfilePic(canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = SIZE;
  canvas.height = SIZE;

  await document.fonts.load("800 72px 'Open Sans'");
  await document.fonts.load("700 36px 'Open Sans'");

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  // ── Background: dark navy ──
  ctx.fillStyle = "#1a2340";
  ctx.fillRect(0, 0, SIZE, SIZE);

  // ── Subtle dot grid ──
  ctx.save();
  ctx.globalAlpha = 0.04;
  for (let x = 0; x < SIZE; x += 44) {
    for (let y = 0; y < SIZE; y += 44) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // ── Large background diamond watermark ──
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.strokeStyle = "#E8832A";
  ctx.lineWidth = 22;
  const dr = 460;
  ctx.beginPath();
  ctx.moveTo(cx, cy - dr); ctx.lineTo(cx + dr, cy);
  ctx.lineTo(cx, cy + dr); ctx.lineTo(cx - dr, cy);
  ctx.closePath(); ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#E8832A";
  const dr2 = 300;
  ctx.beginPath();
  ctx.moveTo(cx, cy - dr2); ctx.lineTo(cx + dr2, cy);
  ctx.lineTo(cx, cy + dr2); ctx.lineTo(cx - dr2, cy);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  // ── Orange border ring ──
  ctx.save();
  ctx.strokeStyle = "#E8832A";
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.arc(cx, cy, SIZE / 2 - 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // ── Inner accent ring ──
  ctx.save();
  ctx.strokeStyle = "rgba(232,131,42,0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, SIZE / 2 - 32, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // ── Logo diamond icon (centered upper area) ──
  const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="320" height="320">
    <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="#E8832A" stroke-width="4"/>
    <polygon points="40,18 62,40 40,62 18,40" fill="#E8832A" opacity="0.18"/>
    <text x="40" y="50" text-anchor="middle" font-size="28" font-weight="800" font-family="Arial,sans-serif" letter-spacing="-1">
      <tspan fill="#E8832A">D</tspan><tspan fill="#FFFFFF">M</tspan>
    </text>
  </svg>`;

  const logoBlob = new Blob([logoSVG], { type: "image/svg+xml" });
  const logoUrl = URL.createObjectURL(logoBlob);
  await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, cx - 160, 100, 320, 320);
      URL.revokeObjectURL(logoUrl);
      resolve();
    };
    img.src = logoUrl;
  });

  // ── DISTINCT text ──
  ctx.fillStyle = "#E8832A";
  ctx.font = "800 64px 'Open Sans'";
  ctx.textAlign = "center";
  ctx.letterSpacing = "8px";
  ctx.fillText("DISTINCT", cx, 520);

  // ── MARK text ──
  ctx.fillStyle = "#ffffff";
  ctx.font = "700 56px 'Open Sans'";
  ctx.fillText("MARK", cx, 590);

  // ── Tagline ──
  ctx.fillStyle = "rgba(232,131,42,0.7)";
  ctx.font = "400 22px 'Open Sans'";
  ctx.fillText("BUILDING EXCELLENCE", cx, 640);

  // ── Thin orange bottom accent bar ──
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(cx - 80, 668, 160, 3);

  ctx.textAlign = "left";
}

export default function FacebookProfilePic() {
  const previewRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    drawProfilePic(previewRef.current).then(() => setReady(true));
  }, []);

  const downloadJPG = async () => {
    setDownloading(true);
    const canvas = document.createElement("canvas");
    await drawProfilePic(canvas);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.97);
    link.download = "DistinctMark_Facebook_ProfilePic.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  const SCALE = 400 / SIZE;

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-gray-700 mb-1">Facebook Company Profile Picture</h1>
        <p className="text-sm text-gray-500 mb-5">800 × 800 px · Displays as circle on Facebook</p>
        <Button
          onClick={downloadJPG}
          disabled={downloading || !ready}
          className="bg-[#1877F2] hover:bg-[#1462d0] text-white gap-2 mb-8"
        >
          <FileImage className="w-4 h-4" />
          {downloading ? "Downloading..." : "Download JPG"}
        </Button>

        <div>
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Preview (circle crop)</p>
          <div style={{
            width: `${SIZE * SCALE}px`,
            height: `${SIZE * SCALE}px`,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
            display: "inline-block",
          }}>
            <canvas
              ref={previewRef}
              style={{ width: `${SIZE * SCALE}px`, height: `${SIZE * SCALE}px`, display: "block" }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Square version also shown below (as uploaded)
          </p>
          <div style={{
            width: `${SIZE * SCALE}px`,
            height: `${SIZE * SCALE}px`,
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            marginTop: "16px",
            display: "inline-block",
          }}>
            <canvas
              style={{ width: `${SIZE * SCALE}px`, height: `${SIZE * SCALE}px`, display: "block" }}
              ref={(el) => { if (el && ready) { drawProfilePic(el); } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}