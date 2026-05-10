import React, { useRef, useEffect, useState } from "react";
import { FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";

// LinkedIn cover: 1584 × 396 px (standard recommended size)
const W = 1584;
const H = 396;

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

async function drawCover(canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = W;
  canvas.height = H;

  await document.fonts.load("800 72px 'Open Sans'");
  await document.fonts.load("700 22px 'Open Sans'");
  await document.fonts.load("400 18px 'Open Sans'");
  await document.fonts.load("600 16px 'Open Sans'");

  // ── Background: full dark ──
  ctx.fillStyle = "#1a2340";
  ctx.fillRect(0, 0, W, H);

  // Subtle dot-grid overlay
  ctx.save();
  ctx.globalAlpha = 0.035;
  for (let x = 0; x < W; x += 48) {
    for (let y = 0; y < H; y += 48) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  // Large background diamond watermark (right side)
  ctx.save();
  ctx.globalAlpha = 0.06;
  const dmx = W - 220, dmy = H / 2, dmr = 340;
  ctx.strokeStyle = "#E8832A";
  ctx.lineWidth = 18;
  ctx.beginPath();
  ctx.moveTo(dmx, dmy - dmr); ctx.lineTo(dmx + dmr, dmy);
  ctx.lineTo(dmx, dmy + dmr); ctx.lineTo(dmx - dmr, dmy);
  ctx.closePath(); ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.04;
  const dmx2 = W - 180, dmy2 = H / 2, dmr2 = 220;
  ctx.fillStyle = "#E8832A";
  ctx.beginPath();
  ctx.moveTo(dmx2, dmy2 - dmr2); ctx.lineTo(dmx2 + dmr2, dmy2);
  ctx.lineTo(dmx2, dmy2 + dmr2); ctx.lineTo(dmx2 - dmr2, dmy2);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  // Left orange accent bar
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(0, 0, 10, H);

  // Top-right thin orange bar
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(0, 0, W, 5);

  // Bottom orange bar
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(0, H - 5, W, 5);

  const PAD = 80;

  // ── Logo ──
  const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" width="240" height="53">
    <g transform="translate(0,2)">
      <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#E8832A" stroke-width="2"/>
      <polygon points="20,8 32,20 20,32 8,20" fill="#E8832A" opacity="0.2"/>
      <text x="20" y="25" text-anchor="middle" font-size="14" font-weight="800" font-family="Open Sans,sans-serif" letter-spacing="-1">
        <tspan fill="#E8832A">D</tspan><tspan fill="#FFFFFF">M</tspan>
      </text>
    </g>
    <line x1="50" y1="8" x2="50" y2="36" stroke="#E8832A" stroke-width="1.2" stroke-opacity="0.5"/>
    <g transform="translate(58,0)">
      <text y="20" font-size="12.5" font-weight="800" font-family="Open Sans,sans-serif" fill="#E8832A" letter-spacing="3">DISTINCT</text>
      <text y="36" font-size="12.5" font-weight="700" font-family="Open Sans,sans-serif" fill="#FFFFFF" letter-spacing="5.5">MARK</text>
    </g>
  </svg>`;
  const logoBlob = new Blob([logoSVG], { type: "image/svg+xml" });
  const logoUrl = URL.createObjectURL(logoBlob);
  await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, PAD + 10, 36, 240, 53);
      URL.revokeObjectURL(logoUrl);
      resolve();
    };
    img.src = logoUrl;
  });

  // ── Name ──
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 72px 'Open Sans'";
  ctx.fillText("ANNUS KHAN", PAD + 10, 200);

  // Orange underline
  ctx.fillStyle = "#E8832A";
  ctx.fillRect(PAD + 10, 218, 80, 4);

  // ── Title ──
  ctx.fillStyle = "#E8832A";
  ctx.font = "700 26px 'Open Sans'";
  ctx.fillText("Chief Technology Officer", PAD + 10, 270);

  // ── Company tagline ──
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "400 19px 'Open Sans'";
  ctx.fillText("Distinct Mark Co. · Riyadh, Saudi Arabia", PAD + 10, 318);

  // ── Right side: Service pills ──
  const services = ["Construction", "E&M", "IT Services", "Catering", "Trading", "Transport"];
  const pillX = W - 440;
  const pillStartY = 100;
  const pillH = 36;
  const pillGap = 14;

  ctx.font = "600 15px 'Open Sans'";
  services.forEach((svc, i) => {
    const metrics = ctx.measureText(svc);
    const pillW = metrics.width + 36;
    const py = pillStartY + i * (pillH + pillGap);

    // Alternate styling
    if (i % 2 === 0) {
      ctx.fillStyle = "#E8832A";
      roundRect(ctx, pillX, py, pillW, pillH, pillH / 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
    } else {
      ctx.strokeStyle = "rgba(232,131,42,0.4)";
      ctx.lineWidth = 1.5;
      roundRect(ctx, pillX, py, pillW, pillH, pillH / 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.65)";
    }
    ctx.fillText(svc, pillX + 18, py + pillH / 2 + 5);
  });

  // ── Website bottom-right ──
  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = "400 16px 'Open Sans'";
  ctx.fillText("www.distinctmark.net", W - PAD, H - 24);
  ctx.textAlign = "left";
}

export default function LinkedInCover() {
  const previewRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    drawCover(previewRef.current).then(() => setReady(true));
  }, []);

  const downloadJPG = async () => {
    setDownloading(true);
    const canvas = document.createElement("canvas");
    await drawCover(canvas);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.97);
    link.download = "AnnusKhan_LinkedIn_Cover.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  const SCALE = Math.min(900 / W, 1);

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-xl font-bold text-gray-700 mb-1">LinkedIn Cover — Annus Khan</h1>
        <p className="text-sm text-gray-500 mb-5">1584 × 396 px · LinkedIn recommended size</p>
        <Button
          onClick={downloadJPG}
          disabled={downloading || !ready}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <FileImage className="w-4 h-4" />
          {downloading ? "Downloading..." : "Download JPG"}
        </Button>
      </div>

      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest">Preview</p>
        <div style={{
          width: `${W * SCALE}px`,
          height: `${H * SCALE}px`,
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 12px 48px rgba(0,0,0,0.25)",
        }}>
          <canvas
            ref={previewRef}
            style={{ width: `${W * SCALE}px`, height: `${H * SCALE}px`, display: "block" }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Note: LinkedIn crops ~56px from top and bottom on profile view. Key content is centered accordingly.
        </p>
      </div>
    </div>
  );
}