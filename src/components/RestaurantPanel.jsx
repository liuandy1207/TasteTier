// ============================================================
// RestaurantPanel.jsx — Slide-up/side panel showing restaurant
// details and the tier list. Adapts to mobile vs desktop.
// ============================================================
import TierList from "./TierList.jsx";
import "./RestaurantPanel.css";

// Renders up to 5 stars with half-star support (value: 0–5, step 0.5)
function StarRating({ value, label }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(Math.max(value - (i - 1), 0), 1);
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
    <div className="star-row">
      <span className="star-label">{label}</span>
      <div className="star-icons">{stars}</div>
      <span className="star-value">{value.toFixed(1)}</span>
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
    <div className={`panel ${isMobile ? "mobile" : "desktop"}`}>
      {/* Drag handle (mobile only) */}
      {isMobile && (
        <div className="panel-drag-handle">
          <div className="panel-drag-handle-bar" />
        </div>
      )}

      <div className={`panel-body ${isMobile ? "mobile" : ""}`}>
        {/* Header */}
        <div className="panel-header">
          <div className="panel-header-left">
            <div className="panel-title-row">
              <span className="panel-cover-emoji">{restaurant.coverEmoji}</span>
              <h2 className={`panel-name ${isMobile ? "mobile" : ""}`}>
                {restaurant.name}
              </h2>
            </div>
            <div className="panel-meta">
              {restaurant.cuisine} · Visited {restaurant.visited}
            </div>

            <div className="panel-ratings">
              <StarRating value={restaurant.valueRating ?? restaurant.rating ?? 0} label="Value" />
              <StarRating value={restaurant.vibeRating ?? restaurant.rating ?? 0} label="Vibe" />
            </div>

            {restaurant.note_value && (
              <div className="panel-note">{restaurant.note_value}</div>
            )}
          </div>

          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        {/* Notes */}
        {restaurant.notes && (
          <div className="panel-notes">"{restaurant.notes}"</div>
        )}

        {/* Address */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="panel-address"
        >
          <span className="panel-address-icon">📍</span>
          <span className="panel-address-text">{restaurant.address}</span>
          <span className="panel-address-cta">Navigate →</span>
        </a>

        {/* Tier list */}
        <div className="panel-tier-label">Dish Tier List — tap any dish</div>
        <TierList tierList={restaurant.tierList} onDishClick={onDishClick} />

        {/* Share button */}
        <button className="panel-share" onClick={handleShare}>
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