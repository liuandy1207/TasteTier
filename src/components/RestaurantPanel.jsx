// ============================================================
// RestaurantPanel.jsx — Slide-up/side panel showing restaurant
// details and the tier list. Adapts to mobile vs desktop.
// ============================================================
import TierList from "./TierList.jsx";

// Renders up to 5 stars with half-star support (value: 0–5, step 0.5)
function StarRating({ value, label }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(Math.max(value - (i - 1), 0), 1); // 0, 0.5, or 1
    const id = `star-${label}-${i}-${Math.random().toString(36).slice(2, 6)}`;
    stars.push(
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <defs>
          <linearGradient id={id}>
            <stop offset={`${fill * 100}%`} stopColor="#FFD700" />
            <stop offset={`${fill * 100}%`} stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
        </defs>
        <polygon
          points="8,1 10,6 15,6 11,9.5 12.5,15 8,12 3.5,15 5,9.5 1,6 6,6"
          fill={`url(#${id})`}
        />
      </svg>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          fontSize: 10,
          fontFamily: "'Sora', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          minWidth: 34,
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: 2 }}>{stars}</div>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'Sora', sans-serif" }}>
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function RestaurantPanel({ restaurant, onClose, onDishClick, isMobile }) {
  if (!restaurant) return null;

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`;

  const handleShare = async () => {
    const shareData = {
      title: restaurant.name,
      text: `Check out ${restaurant.name} on TasteTier!`,
      url: mapsUrl,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (_) {}
    } else {
      await navigator.clipboard.writeText(`${restaurant.name} — ${restaurant.address}\n${mapsUrl}`);
      alert("Copied to clipboard!");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 300,
        background: "linear-gradient(160deg, #191716 0%, #121517 100%)",
        boxShadow: "0 -4px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
        overflowY: "auto",
        ...(isMobile
          ? { bottom: 0, left: 0, right: 0, maxHeight: "82vh", borderRadius: "20px 20px 0 0" }
          : { top: 0, right: 0, bottom: 0, width: 420, borderLeft: "1px solid rgba(255,255,255,0.08)" }),
      }}
    >
      {/* Drag handle (mobile) */}
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)" }} />
        </div>
      )}

      <div style={{ padding: isMobile ? "12px 20px 32px" : "24px 24px 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
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
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "'Sora', sans-serif", marginBottom: 8 }}>
              {restaurant.cuisine} · Visited {restaurant.visited}
            </div>

            {/* Dual star ratings */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 6 }}>
              <StarRating value={restaurant.valueRating ?? restaurant.rating ?? 0} label="Value" />
              <StarRating value={restaurant.vibeRating ?? restaurant.rating ?? 0} label="Vibe" />
            </div>

            {/* Optional rating note */}
            {restaurant.note_value && (
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "'Sora', sans-serif", fontStyle: "italic", marginTop: 4 }}>
                {restaurant.note_value}
              </div>
            )}
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

        {/* Address — navigation button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 10,
            color: "rgba(255,255,255,0.7)",
            fontSize: 12,
            fontFamily: "'Sora', sans-serif",
            textDecoration: "none",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          <span style={{ fontSize: 15 }}>📍</span>
          <span style={{ flex: 1 }}>{restaurant.address}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap" }}>Navigate →</span>
        </a>

        {/* Tier List */}
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

        {/* Share button */}
        <button
          onClick={handleShare}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            marginTop: 24,
            padding: "12px 0",
            background: "white",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 10,
            color: "#191716",
            fontSize: 13,
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.04em",
            cursor: "pointer",
            //transition: "border-color 0.15s, background 0.15s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.8)";
            e.currentTarget.style.background = "rgba(255,255,255,0.8)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,1)";
            e.currentTarget.style.background = "white";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Share this place
        </button>
      </div>
    </div>
  );
}