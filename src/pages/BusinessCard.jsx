import React, { useRef, useEffect, useState } from "react";
import { FileImage, FileText, Copy, Check } from "lucide-react";
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
  const { name, position, mobile, email, website, address } = fields;
  const ctx = canvas.getContext("2d");
  canvas.width = CARD_W;
  canvas.height = CARD_H;

  await document.fonts.load("800 60px 'Open Sans'");
  await document.fonts.load("700 25px 'Open Sans'");
  await document.fonts.load("400 25px 'Open Sans'");

  // LEFT DARK PANEL
  ctx.fillStyle = "#1a2340";
  ctx.fillRect(0, 0, DARK_W, CARD_H);

  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 1;
  for (let x = 0; x < DARK_W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CARD_H); ctx.stroke(); }
  for (let y = 0; y < CARD_H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(DARK_W, y); ctx.stroke(); }
  ctx.restore();

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

  ctx.fillStyle = "#E8832A";
  ctx.fillRect(0, 0, DARK_W, 6);

  const PAD = 52;

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "800 60px 'Open Sans'";
  ctx.fillText((name || "YOUR NAME").toUpperCase(), PAD, 215);

  ctx.fillStyle = "#E8832A";
  ctx.fillRect(PAD, 222, 52, 3);

  ctx.fillStyle = "#E8832A";
  ctx.font = "700 25px 'Open Sans'";
  ctx.fillText((position || "YOUR POSITION").toUpperCase(), PAD, 305);

  const contacts = [
    mobile || "+966 55 000 0000",
    email || "email@distinctmark.net",
    website || "www.distinctmark.net",
    address || "Riyadh, Saudi Arabia",
  ];

  ctx.font = "400 25px 'Open Sans'";
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  contacts.forEach((c, i) => { ctx.fillText(c, PAD + 6, 360 + i * 46); });
  contacts.forEach((_, i) => {
    ctx.fillStyle = "#E8832A";
    ctx.beginPath();
    ctx.arc(PAD - 8, 355 + i * 46, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // RIGHT LIGHT PANEL
  ctx.fillStyle = "#f5f6fa";
  ctx.fillRect(DARK_W, 0, CARD_W - DARK_W, CARD_H);

  ctx.fillStyle = "#E8832A";
  ctx.fillRect(DARK_W, CARD_H - 6, CARD_W - DARK_W, 6);

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

  const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" width="349" height="77">
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
    img.onload = () => { ctx.drawImage(img, CARD_W - 52 - 349, 22, 349, 77); URL.revokeObjectURL(logoUrl); resolve(); };
    img.src = logoUrl;
  });

  const rPad = CARD_W - PAD;
  ctx.textAlign = "right";
  ctx.fillStyle = "#1a2340";
  ctx.font = "600 26px 'Open Sans'";
  ctx.fillText("DISTINCT MARK CO.", rPad, CARD_H / 2 + 18);
  ctx.fillStyle = "#E8832A";
  ctx.font = "600 23px 'Open Sans'";
  ctx.fillText("BUILDING EXCELLENCE", rPad, CARD_H / 2 + 48);
  ctx.textAlign = "left";

  const qrUrl = website ? (website.startsWith("http") ? website : "https://" + website) : "https://www.distinctmark.net";
  const qrDataUrl = await QRCode.toDataURL(qrUrl, { width: 110, margin: 1, color: { dark: "#1a2340", light: "#ffffff" } });

  await new Promise((resolve) => {
    const qrImg = new Image();
    qrImg.onload = () => {
      const qx = CARD_W - PAD - 110 - 10;
      const qy = CARD_H - 50 - 110 - 10;
      ctx.fillStyle = "white";
      roundRect(ctx, qx - 8, qy - 8, 126, 126, 8); ctx.fill();
      ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 1.5;
      roundRect(ctx, qx - 8, qy - 8, 126, 126, 8); ctx.stroke();
      ctx.drawImage(qrImg, qx, qy, 110, 110);
      resolve();
    };
    qrImg.src = qrDataUrl;
  });

  ctx.textAlign = "right";
  ctx.fillStyle = "#1a2340";
  ctx.font = "700 23px 'Open Sans'";
  ctx.fillText("SCAN TO VISIT", CARD_W - PAD - 110 - 18 - 4, CARD_H - 66);
  ctx.fillStyle = "#888888";
  ctx.font = "400 22px 'Open Sans'";
  ctx.fillText(website || "www.distinctmark.net", CARD_W - PAD - 110 - 18 - 4, CARD_H - 40);
  ctx.textAlign = "left";
}

// ── Convert SVG string to PNG data URL ──
async function svgToPngDataUrl(svgString, width, height) {
  return new Promise((resolve) => {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width * 2;
      canvas.height = height * 2;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width * 2, height * 2);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.src = url;
  });
}

// ── Email Signature HTML ──
async function buildSignatureHTML(fields) {
  const { name, position, mobile, email, website, address } = fields;
  const webDisplay = website || "www.distinctmark.net";
  const webHref = webDisplay.startsWith("http") ? webDisplay : "https://" + webDisplay;

  // Convert logo SVG → PNG data URL (works in email clients)
  const logoSVGStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 44" width="320" height="88">
    <rect width="200" height="44" fill="white"/>
    <g transform="translate(0,2)">
      <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#E8832A" stroke-width="2"/>
      <polygon points="20,8 32,20 20,32 8,20" fill="#E8832A" opacity="0.2"/>
      <text x="20" y="25" text-anchor="middle" font-size="14" font-weight="800" font-family="Arial,sans-serif" letter-spacing="-1" fill="#E8832A">D</text>
      <text x="26" y="25" text-anchor="middle" font-size="14" font-weight="800" font-family="Arial,sans-serif" fill="#1a2340">M</text>
    </g>
    <line x1="50" y1="8" x2="50" y2="36" stroke="#E8832A" stroke-width="1.2" stroke-opacity="0.5"/>
    <g transform="translate(58,0)">
      <text y="20" font-size="12.5" font-weight="800" font-family="Arial,sans-serif" fill="#E8832A" letter-spacing="3">DISTINCT</text>
      <text y="36" font-size="12.5" font-weight="700" font-family="Arial,sans-serif" fill="#1a2340" letter-spacing="5.5">MARK</text>
    </g>
  </svg>`;

  const linkedinSVGStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
    <rect width="24" height="24" rx="4" fill="#0077B5"/>
    <path d="M6.5 10h-2v8h2v-8zm-1-3.1a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM18 14.2c0-2.4-1.1-4.2-3.3-4.2-1 0-1.9.5-2.4 1.3V10H10v8h2.3v-4.2c0-1.1.5-2 1.6-2 1 0 1.8.7 1.8 2.1V18H18v-3.8z" fill="#fff"/>
  </svg>`;

  const twitterSVGStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
    <rect width="24" height="24" rx="4" fill="#000000"/>
    <path d="M17.5 4h2.1l-4.6 5.3L20.5 20h-4.2l-3.3-4.4L9.2 20H7.1l4.9-5.6L6.5 4h4.3l3 3.9L17.5 4zm-.8 14.4h1.2L8.3 5.2H7l9.7 13.2z" fill="#fff"/>
  </svg>`;

  const facebookSVGStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
    <rect width="24" height="24" rx="4" fill="#1877F2"/>
    <path d="M16 8h-2c-.6 0-1 .4-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9c0-2.2 1.8-4 4-4h2v3z" fill="#fff"/>
  </svg>`;

  const [logoPng, liPng, twPng, fbPng] = await Promise.all([
    svgToPngDataUrl(logoSVGStr, 160, 36),
    svgToPngDataUrl(linkedinSVGStr, 24, 24),
    svgToPngDataUrl(twitterSVGStr, 24, 24),
    svgToPngDataUrl(facebookSVGStr, 24, 24),
  ]);

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:13px;color:#1a2340;border-collapse:collapse;max-width:540px;">
  <tr>
    <td style="padding-right:18px;border-right:3px solid #E8832A;vertical-align:top;padding-top:4px;">
      <img src="${logoPng}" width="160" height="36" alt="Distinct Mark" style="display:block;border:0;"/>
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
        <tr>
          <td style="padding-right:6px;"><a href="https://www.linkedin.com/company/distinctmark" target="_blank" style="text-decoration:none;"><img src="${liPng}" width="24" height="24" alt="LinkedIn" style="display:block;border:0;"/></a></td>
          <td style="padding-right:6px;"><a href="https://twitter.com/distinctmark" target="_blank" style="text-decoration:none;"><img src="${twPng}" width="24" height="24" alt="X" style="display:block;border:0;"/></a></td>
          <td><a href="https://www.facebook.com/distinctmark" target="_blank" style="text-decoration:none;"><img src="${fbPng}" width="24" height="24" alt="Facebook" style="display:block;border:0;"/></a></td>
        </tr>
      </table>
    </td>
    <td style="padding-left:18px;vertical-align:top;">
      <div style="font-size:16px;font-weight:800;color:#1a2340;letter-spacing:0.5px;margin-bottom:2px;">${name || "Your Name"}</div>
      <div style="font-size:12px;font-weight:700;color:#E8832A;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">${position || "Your Position"}</div>
      <table cellpadding="0" cellspacing="0" border="0">
        ${mobile ? `<tr><td style="padding:2px 0;"><span style="color:#E8832A;font-size:11px;margin-right:6px;">&#9679;</span><a href="tel:${mobile}" style="color:#1a2340;text-decoration:none;font-size:12px;">${mobile}</a></td></tr>` : ""}
        ${email ? `<tr><td style="padding:2px 0;"><span style="color:#E8832A;font-size:11px;margin-right:6px;">&#9679;</span><a href="mailto:${email}" style="color:#1a2340;text-decoration:none;font-size:12px;">${email}</a></td></tr>` : ""}
        ${webDisplay ? `<tr><td style="padding:2px 0;"><span style="color:#E8832A;font-size:11px;margin-right:6px;">&#9679;</span><a href="${webHref}" style="color:#1a2340;text-decoration:none;font-size:12px;">${webDisplay}</a></td></tr>` : ""}
        ${address ? `<tr><td style="padding:2px 0;"><span style="color:#E8832A;font-size:11px;margin-right:6px;">&#9679;</span><span style="color:#555;font-size:12px;">${address}</span></td></tr>` : ""}
      </table>
      <div style="margin-top:10px;border-top:1px solid #e5e7eb;padding-top:8px;font-size:10px;color:#aaa;letter-spacing:1.5px;">DISTINCT MARK CO. &nbsp;·&nbsp; BUILDING EXCELLENCE</div>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top:14px;">
      <div style="border-top:1px solid #e5e7eb;padding-top:10px;font-size:9.5px;color:#999;line-height:1.6;font-style:italic;max-width:540px;">
        <strong style="color:#bbb;font-style:normal;">Confidentiality Notice:</strong> The content of this message is confidential. If you have received it by mistake, please inform us by an email reply and then delete the message. It is forbidden to copy, forward, or in any way reveal the contents of this message to anyone. The integrity and security of this email cannot be guaranteed over the Internet. Therefore, the sender will not be held liable for any damage caused by the message.
      </div>
    </td>
  </tr>
</table>`;
}

export default function BusinessCard() {
  const previewRef = useRef(null);
  const sigRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [copied, setCopied] = useState(false);
  const [sigHtml, setSigHtml] = useState("");

  const [fields, setFields] = useState({
    name: "Annus Khan",
    position: "Chief Technology Officer",
    mobile: "+966 55 815 7777",
    email: "annus@distinctmark.net",
    website: "www.distinctmark.net",
    address: "King Fahd District, Riyadh, KSA",
  });

  const updateField = (key, value) => setFields((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    setReady(false);
    drawCard(previewRef.current, fields).then(() => setReady(true));
    buildSignatureHTML(fields).then(setSigHtml);
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
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
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

  const copySignature = async () => {
    const html = await buildSignatureHTML(fields);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }) }),
      ]);
    } catch {
      const plain = `${fields.name}\n${fields.position}\n${fields.email}\n${fields.website}\n${fields.address}\nDistinct Mark Co.`;
      await navigator.clipboard.writeText(plain);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const SCALE = 0.46;

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Business Card & Email Signature Generator</h1>
        <p className="text-sm text-gray-500 mb-7">Fill in your details — both previews update live.</p>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Full Name</Label>
            <Input value={fields.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Annus Khan" />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Position / Title</Label>
            <Input value={fields.position} onChange={(e) => updateField("position", e.target.value)} placeholder="e.g. Chief Technology Officer" />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Mobile Number</Label>
            <Input value={fields.mobile} onChange={(e) => updateField("mobile", e.target.value)} placeholder="e.g. +966 55 000 0000" />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Email</Label>
            <Input value={fields.email} onChange={(e) => updateField("email", e.target.value)} placeholder="e.g. name@distinctmark.net" />
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Website</Label>
            <Input value={fields.website} onChange={(e) => updateField("website", e.target.value)} placeholder="e.g. www.distinctmark.net" />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1 block">Address</Label>
            <Input value={fields.address} onChange={(e) => updateField("address", e.target.value)} placeholder="e.g. King Fahd District, Riyadh, KSA" />
          </div>
        </div>

        {/* Two-column previews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── LEFT: Business Card ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Business Card Preview</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={downloadJPG} disabled={!!downloading || !ready} className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs h-8">
                  <FileImage className="w-3 h-3" />
                  {downloading === "jpg" ? "..." : "JPG"}
                </Button>
                <Button size="sm" onClick={downloadPDF} disabled={!!downloading || !ready} className="bg-[#E8832A] hover:bg-[#d0721f] text-white gap-1 text-xs h-8">
                  <FileText className="w-3 h-3" />
                  {downloading === "pdf" ? "..." : "PDF"}
                </Button>
              </div>
            </div>
            <div style={{
              width: `${CARD_W * SCALE}px`,
              height: `${CARD_H * SCALE}px`,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              maxWidth: "100%",
            }}>
              <canvas
                ref={previewRef}
                style={{ width: `${CARD_W * SCALE}px`, height: `${CARD_H * SCALE}px`, display: "block" }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">3.5" × 2" standard business card</p>
          </div>

          {/* ── RIGHT: Email Signature ── */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Email Signature Preview</p>
              <Button
                size="sm"
                onClick={copySignature}
                className={`gap-1 text-xs h-8 ${copied ? "bg-green-600 hover:bg-green-700" : "bg-[#1a2340] hover:bg-[#111c35]"} text-white`}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied!" : "Copy Signature"}
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
              <div
                ref={sigRef}
                dangerouslySetInnerHTML={{ __html: sigHtml }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Paste directly into Gmail, Outlook, or Apple Mail.</p>
          </div>

        </div>
      </div>
    </div>
  );
}