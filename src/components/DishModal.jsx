// ============================================================
// DishModal.jsx — Full-screen modal showing dish image + 
// your written description. Opens on top of the restaurant panel.
// ============================================================
import { TIER_LABELS } from "../data/restaurants.js";

// Find which tier a dish belongs to
function getDishTier(restaurant, dishId) {
  for (const [tier, dishes] of Object.entries(restaurant.tierList)) {
    if (dishes.find((d) => d.id === dishId)) return tier;
  }
  return null;
}

export default function DishModal({ dish, restaurant, onClose }) {
  if (!dish || !restaurant) return null;

  const tier = getDishTier(restaurant, dish.id);
  const tierConfig = tier ? TIER_LABELS[tier] : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, #0e0e1e 0%, #131328 100%)",
          borderRadius: 20,
          padding: 28,
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "all",
        }}
      >
        {/* Dish image / emoji hero */}
        <div
          style={{
            width: "100%",
            height: 160,
            borderRadius: 14,
            marginBottom: 20,
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dish.imageSrc ? (
            <img
              src={dish.imageSrc}
              alt={dish.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{ fontSize: 72 }}>{dish.emoji}</span>
          )}
          {/* Tier badge */}
          {tierConfig && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: tierConfig.bg,
                border: `2px solid ${tierConfig.color}`,
                borderRadius: 8,
                padding: "2px 10px",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                color: tierConfig.color,
                letterSpacing: "0.05em",
              }}
            >
              {tier} Tier
            </div>
          )}
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              width: 30,
              height: 30,
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            ✕
          </button>
        </div>

        {/* Dish name */}
        <h3
          style={{
            margin: "0 0 4px",
            color: "#fff",
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "-0.02em",
          }}
        >
          {dish.name}
        </h3>
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            fontFamily: "'Sora', sans-serif",
            marginBottom: 16,
          }}
        >
          {restaurant.name} · {restaurant.cuisine}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.07)",
            marginBottom: 16,
          }}
        />

        {/* Description */}
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "'Sora', sans-serif",
            fontSize: 14,
            lineHeight: 1.75,
          }}
        >
          {dish.description}
        </p>
      </div>
    </div>
  );
}