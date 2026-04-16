// ============================================================
// TierList.jsx — Renders the S/A/B/C/D tier rows.
// Dish images are clickable to open the dish detail panel.
// ============================================================
import { TIER_LABELS } from "../data/restaurants.js";

export default function TierList({ tierList, onDishClick }) {
  const tiers = Object.entries(TIER_LABELS);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {tiers.map(([key, config]) => {
        const dishes = tierList[key] || [];
        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "stretch",
              minHeight: 62,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Tier label */}
            <div
              style={{
                width: 44,
                minWidth: 44,
                background: config.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: `2px solid ${config.color}`,
              }}
            >
              <span
                style={{
                  color: config.color,
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                }}
              >
                {key}
              </span>
            </div>

            {/* Dishes row */}
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.025)",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                padding: "8px 10px",
              }}
            >
              {dishes.length === 0 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.15)",
                    fontSize: 12,
                    fontFamily: "'Sora', sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  — empty —
                </span>
              )}
              {dishes.map((dish) => (
                <DishChip
                  key={dish.id}
                  dish={dish}
                  tierColor={config.color}
                  onClick={() => onDishClick(dish)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DishChip({ dish, tierColor, onClick }) {
  return (
    <button
      onClick={onClick}
      title={dish.name}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: `1.5px solid rgba(255,255,255,0.1)`,
        borderRadius: 10,
        padding: "4px 10px 4px 6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.15s ease",
        color: "#fff",
        fontFamily: "'Sora', sans-serif",
        fontSize: 12,
        fontWeight: 500,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
        e.currentTarget.style.borderColor = tierColor;
        e.currentTarget.style.transform = "scale(1.06)";
        e.currentTarget.style.boxShadow = `0 0 12px ${tierColor}44`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Dish image or emoji placeholder */}
      {dish.image_src ? (
        <img
          src={dish.image_src}
          alt={dish.name}
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            objectFit: "cover",
          }}
        />
      ) : (
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {dish.emoji}
        </span>
      )}
      <span style={{ whiteSpace: "nowrap", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }}>
        {dish.name}
      </span>
    </button>
  );
}