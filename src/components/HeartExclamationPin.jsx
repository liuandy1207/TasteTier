export default function HeartExclamationPin({ emoji = "📍", selected = false, scale = 1 }) {
  const heartW = 40 * scale;
  const heartH = 36 * scale;
  const gapH   =  4 * scale;
  const dotR   =  5 * scale;
  const totalH = heartH + gapH + dotR * 2;

  const color = "#e01e37";
  const fill  = selected ? "#e01e37" : "#ffffff";
  const glow  = selected ? "#ff000088" : "#cc000055";

  return (
    <svg
      width={heartW}
      height={totalH}
      viewBox="0 0 40 54"
      overflow="visible"
      style={{ pointerEvents: "none", display: "block" }}
    >
      <defs>
        <filter id="hx-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={glow} floodOpacity="1" />
        </filter>
      </defs>

      {/* Heart */}
      <g transform="scale(0.4)">
        <path
          d="M50 76 C50 76 16 51 16 30 C16 17 22 8 32 8 C40 8 47 15 50 23 C53 15 60 8 68 8 C78 8 84 17 84 30 C84 51 50 76 50 76Z"
          fill={fill}
          stroke={color}
          strokeWidth="5"
          strokeLinejoin="round"
          filter="url(#hx-shadow)"
          style={{ pointerEvents: "visibleFill" }}
        />
        <text
          x="50"
          y="42"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="32"
          style={{ userSelect: "none", filter: selected ? "brightness(10)" : "none", pointerEvents: "none" }}
        >
          {emoji}
        </text>
      </g>

      {/* Stem */}
      <rect
        x={19} y={36}
        width={2} height={4}
        fill={color} opacity={0.4}
        style={{ pointerEvents: "none" }}
      />

      {/* Dot */}
      <circle
        cx={20} cy={44}
        r={4}
        fill={color} stroke={color} strokeWidth="1.5"
        filter="url(#hx-shadow)"
        style={{ pointerEvents: "none" }}
      />
    </svg>
  );
}