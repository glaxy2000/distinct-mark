import React from "react";
import { NAVY, ORANGE, LIGHT_BG, PageWrapper } from "./shared";

// Matches PDF division pages 8–14
export default function DivisionSlide({ number, title, description, items, image }) {
  return (
    <PageWrapper style={{ display: "flex", background: LIGHT_BG }}>
      {/* Left light panel */}
      <div style={{ flex: "0 0 55%", padding: "40px 40px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, letterSpacing: 5, marginBottom: 6 }}>
          DIVISION {number}
        </div>
        <div style={{ width: 46, height: 3, background: ORANGE, marginBottom: 40 }} />
        <div style={{ fontSize: 30, fontWeight: 800, color: NAVY, marginBottom: 28 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#4a5568", lineHeight: 1.8, marginBottom: 28, maxWidth: 460 }}>
          {description}
        </div>
        <div>
          {items.map((it, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
              <div style={{ width: 4, height: 22, background: ORANGE, flexShrink: 0 }} />
              <div style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>{it}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Right image panel */}
      <div style={{ flex: "0 0 45%", position: "relative", overflow: "hidden", borderLeft: `5px solid ${ORANGE}` }}>
        <img src={image} crossOrigin="anonymous" alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,35,64,0.45)" }} />
        <div style={{
          position: "absolute", top: 30, left: 40, fontSize: 130, fontWeight: 900,
          color: ORANGE, opacity: 0.65, lineHeight: 1, fontFamily: "Arial, sans-serif"
        }}>
          {number}
        </div>
      </div>
    </PageWrapper>
  );
}