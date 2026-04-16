// ============================================================
// MapPin.jsx — Individual restaurant pin on the map.
// Handles hover tooltip and click to open restaurant panel.
// ============================================================
import { useState } from "react";

export default function MapPin({ restaurant, isSelected, onClick, mapZoom }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(restaurant)}
    >
      {/* Pin bubble */}
      <div
        style={{
          width: isSelected ? 36 : 32,
          height: isSelected ? 36 : 32,
          borderRadius: "50% 50% 50% 0",
          transform: "rotate(-45deg)",
          background: isSelected
            ? "linear-gradient(135deg, #86BBD8, #86BBD8)"
            : "linear-gradient(135deg, #1a1a2e, #16213e)",
          border: `3px solid ${isSelected ? "#FFD700" : "#ffffff"}`,
          boxShadow: isSelected
            ? "0 4px 20px rgba(232,71,42,0.6), 0 0 0 4px rgba(255,215,0,0.3)"
            : "0 3px 12px rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <span
          style={{
            transform: "rotate(45deg)",
            fontSize: isSelected ? 22 : 18,
            lineHeight: 1,
          }}
        >
          {restaurant.coverEmoji}
        </span>
      </div>

      {/* Hover tooltip */}
      {hovered && !isSelected && (
        <div
          style={{
            position: "absolute",
            bottom: "110%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10,10,20,0.95)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 8,
            whiteSpace: "nowrap",
            fontSize: 13,
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            pointerEvents: "none",
            zIndex: 100,
          }}
        >
          {restaurant.name}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid rgba(10,10,20,0.95)",
            }}
          />
        </div>
      )}
    </div>
  );
}