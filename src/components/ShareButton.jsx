import { useState } from "react";

export default function ShareButton({ url, label = "Share" }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    // Use native share sheet on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch (e) {
        // user cancelled, do nothing
      }
      return;
    }
    // Fallback: copy to clipboard
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      style={{
        background: copied ? "rgba(48,209,88,0.15)" : "rgba(255,255,255,0.08)",
        border: `1px solid ${copied ? "rgba(48,209,88,0.4)" : "rgba(255,255,255,0.12)"}`,
        color: copied ? "#30D158" : "rgba(255,255,255,0.8)",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 13 }}>{copied ? "✓" : "⬆"}</span>
      {copied ? "Copied!" : label}
    </button>
  );
}