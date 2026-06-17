export default function HeartExclamationPin({ emoji = "📍", selected = false, scale = 1 }) {
  const heartW = 40 * scale;
  const heartH = 36 * scale;
  const gapH   =  4 * scale;
  const dotR   =  5 * scale;

  const color = "#e01e37";
  const fill  = selected ? "#e01e37" : "#ffffff";
  const glow  = selected ? "#ff000088" : "#cc000055";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: heartW }}>
      <svg width={heartW} height={heartH} viewBox="0 0 100 82" overflow="visible">
        <defs>
          <filter id="hx-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={glow} floodOpacity="1" />
          </filter>
        </defs>
        <path
          d="M50 76 C50 76 16 51 16 30 C16 17 22 8 32 8 C40 8 47 15 50 23 C53 15 60 8 68 8 C78 8 84 17 84 30 C84 51 50 76 50 76Z"
          fill={fill}
          stroke={color}
          strokeWidth="5"
          strokeLinejoin="round"
          filter="url(#hx-shadow)"
        />
        <text
          x="50" y="42"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="32"
          style={{ userSelect: "none", filter: selected ? "brightness(10)" : "none" }}
        >
          {emoji}
        </text>
      </svg>
      <div style={{ height: gapH, width: 2, background: color, opacity: 0.4 }} />
      <svg width={dotR * 2} height={dotR * 2} viewBox={`0 0 ${dotR * 2} ${dotR * 2}`} overflow="visible">
        <circle cx={dotR} cy={dotR} r={dotR - 1} fill={color} stroke={color} strokeWidth="1.5" filter="url(#hx-shadow)" />
      </svg>
    </div>
  );
}