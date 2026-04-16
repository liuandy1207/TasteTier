// ============================================================
// RestaurantPanel.jsx — Slide-up/side panel showing restaurant
// details and the tier list. Adapts to mobile vs desktop.
// ============================================================
import TierList from "./TierList.jsx";
import ShareButton from "./ShareButton.jsx";


export default function RestaurantPanel({ restaurant, onClose, onDishClick, isMobile }) {
  if (!restaurant) return null;

  const stars = "★".repeat(restaurant.rating) + "☆".repeat(5 - restaurant.rating);

  return (
    <>

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          zIndex: 300,
          background: "linear-gradient(160deg, #0d0d1a 0%, #111122 100%)",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          overflowY: "auto",
          ...(isMobile
            ? {
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: "82vh",
                borderRadius: "20px 20px 0 0",
              }
            : {
                top: 0,
                right: 0,
                bottom: 0,
                width: 420,
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }),
        }}
      >
        {/* Drag handle (mobile) */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.2)",
              }}
            />
          </div>
        )}

        <div style={{ padding: isMobile ? "12px 20px 32px" : "24px 24px 40px" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 28 }}>{restaurant.coverEmoji}</span>
                <h2
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: isMobile ? 20 : 22,
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {restaurant.name}
                </h2>
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  fontFamily: "'Sora', sans-serif",
                  marginBottom: 4,
                }}
              >
                {restaurant.cuisine}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{ color: "#FFD700", fontSize: 14, letterSpacing: 1 }}>{stars}</span>
                <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, fontFamily: "'Sora', sans-serif" }}>
                  Visited {restaurant.visited}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                width: 34,
                height: 34,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Address */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 14,
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              fontFamily: "'Sora', sans-serif",
            }}
          >
            <span>📍</span>
            <span>{restaurant.address}</span>
          </div>

          {/* Notes */}
          {restaurant.notes && (
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 20,
                color: "rgba(255,255,255,0.65)",
                fontSize: 13,
                fontFamily: "'Sora', sans-serif",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              "{restaurant.notes}"
            </div>
          )}

          {/* Tier List section */}
          <div
            style={{
              fontSize: 11,
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Dish Tier List — tap any dish
          </div>
          <TierList tierList={restaurant.tierList} onDishClick={onDishClick} />
        </div>
      </div>
    </>
  );
}