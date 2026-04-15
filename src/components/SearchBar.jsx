// ============================================================
// SearchBar.jsx — Google Maps-style top search bar.
// Shows restaurant count and a list of all restaurants on focus.
// ============================================================
import { useState } from "react";

export default function SearchBar({ restaurants, onSelect }) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(420px, calc(100vw - 32px))",
        zIndex: 150,
      }}
    >
      {/* Input */}
      <div
        style={{
          background: focused ? "#fff" : "rgba(255,255,255,0.97)",
          borderRadius: focused ? "16px 16px 0 0" : 16,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          border: "1px solid rgba(0,0,0,0.08)",
          transition: "border-radius 0.15s ease",
        }}
      >
        <span style={{ fontSize: 18 }}>🍽️</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search restaurants..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontFamily: "'Sora', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#111",
            background: "transparent",
          }}
        />
        <span
          style={{
            background: "#E8472A",
            color: "#fff",
            borderRadius: 20,
            padding: "2px 8px",
            fontSize: 11,
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {restaurants.length} spots
        </span>
      </div>

      {/* Dropdown */}
      {focused && (
        <div
          style={{
            background: "#fff",
            borderRadius: "0 0 16px 16px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderTop: "none",
            overflow: "hidden",
            maxHeight: 280,
            overflowY: "auto",
          }}
        >
          {filtered.length === 0 && (
            <div
              style={{
                padding: "14px 16px",
                color: "#888",
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
              }}
            >
              No results found
            </div>
          )}
          {filtered.map((r) => (
            <button
              key={r.id}
              onMouseDown={() => {
                onSelect(r);
                setQuery("");
                setFocused(false);
              }}
              style={{
                width: "100%",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <span style={{ fontSize: 22 }}>{r.coverEmoji}</span>
              <div>
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#111",
                  }}
                >
                  {r.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 11,
                    color: "#888",
                  }}
                >
                  {r.cuisine}
                </div>
              </div>
              <span style={{ marginLeft: "auto", color: "#FFB700", fontSize: 12 }}>
                {"★".repeat(r.rating)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}