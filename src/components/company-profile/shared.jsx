import React from "react";

export const NAVY = "#1a2340";
export const ORANGE = "#E8832A";
export const LIGHT_BG = "#f0f2f7";

// Shared image assets (generated, CORS-safe on base44 media)
export const IMAGES = {
  ceo: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/2d949043a_generated_image.png",
  skylineNight: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/ee4896d77_generated_image.png",
  construction: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/0d12b58a4_generated_image.png",
  cityAerial: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/c71201d1e_generated_image.png",
  buildingUp: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/34a6c8487_generated_image.png",
  mechanic: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/542e2985d_generated_image.png",
  serverRoom: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/313d72e88_generated_image.png",
  catering: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/539eec9fa_generated_image.png",
  truck: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/6bfd6cde8_generated_image.png",
  officeDesk: "https://media.base44.com/images/public/69fc5488f82bfea7ed1807c9/38c088030_generated_image.png",
};

export const ALL_IMAGE_URLS = Object.values(IMAGES);

export function LogoSVG({ size = 48, dark = true }) {
  return (
    <svg viewBox="0 0 200 44" width={size * 4.5} height={size} style={{ display: "block" }}>
      <g transform="translate(0,2)">
        <polygon points="20,0 40,20 20,40 0,20" fill="none" stroke={ORANGE} strokeWidth="2" />
        <polygon points="20,8 32,20 20,32 8,20" fill={ORANGE} opacity="0.2" />
        <text x="20" y="25" textAnchor="middle" fontSize="14" fontWeight="800"
          fontFamily="Arial,sans-serif" letterSpacing="-1">
          <tspan fill={ORANGE}>D</tspan><tspan fill={dark ? "white" : NAVY}>M</tspan>
        </text>
      </g>
      <line x1="50" y1="8" x2="50" y2="36" stroke={ORANGE} strokeWidth="1.2" strokeOpacity="0.5" />
      <g transform="translate(58,0)">
        <text y="20" fontSize="12.5" fontWeight="800" fontFamily="Arial,sans-serif"
          fill={ORANGE} letterSpacing="3">DISTINCT</text>
        <text y="36" fontSize="12.5" fontWeight="700" fontFamily="Arial,sans-serif"
          fill={dark ? "white" : NAVY} letterSpacing="5.5">MARK</text>
      </g>
    </svg>
  );
}

// Absolutely-positioned cover image with a color overlay (CORS-safe for html2canvas)
export function BgImage({ src, overlay = "rgba(26,35,64,0.72)", objectPosition = "center" }) {
  return (
    <>
      <img src={src} crossOrigin="anonymous" alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition }} />
      <div style={{ position: "absolute", inset: 0, background: overlay }} />
    </>
  );
}

export function PageWrapper({ children, style = {} }) {
  return (
    <div style={{
      width: "297mm", minHeight: "210mm", position: "relative",
      background: LIGHT_BG, overflow: "hidden", fontFamily: "Arial, sans-serif",
      ...style
    }}>
      {children}
    </div>
  );
}