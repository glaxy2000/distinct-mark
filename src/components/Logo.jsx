import React from "react";

export default function Logo({ variant = "light", className = "" }) {
  const isLight = variant === "light";
  const wordColor = isLight ? "#FFFFFF" : "#1a2340";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 44"
      className={className}
      style={{ height: "40px", width: "auto" }}
      aria-label="Distinct Mark"
    >
      {/* Diamond icon */}
      <g transform="translate(0, 2)">
        {/* Outer diamond */}
        <polygon
          points="20,0 40,20 20,40 0,20"
          fill="none"
          stroke="#E8832A"
          strokeWidth="2"
        />
        {/* Inner accent diamond */}
        <polygon
          points="20,8 32,20 20,32 8,20"
          fill="#E8832A"
          opacity="0.15"
        />
        {/* Bold DM letters centered */}
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fontFamily="'Open Sans', sans-serif"
          letterSpacing="-1"
        >
          <tspan fill="#E8832A">D</tspan><tspan fill={wordColor}>M</tspan>
        </text>
      </g>

      {/* Vertical separator */}
      <line x1="50" y1="8" x2="50" y2="36" stroke="#E8832A" strokeWidth="1.2" strokeOpacity="0.4" />

      {/* Text block */}
      <g transform="translate(58, 0)">
        {/* DISTINCT */}
        <text
          y="20"
          fontSize="12.5"
          fontWeight="800"
          fontFamily="'Open Sans', sans-serif"
          fill="#E8832A"
          letterSpacing="3"
        >DISTINCT</text>

        {/* MARK */}
        <text
          y="36"
          fontSize="12.5"
          fontWeight="700"
          fontFamily="'Open Sans', sans-serif"
          fill={wordColor}
          letterSpacing="5.5"
        >MARK</text>
      </g>
    </svg>
  );
}