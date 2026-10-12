// A simple top-view sports car drawn in SVG (no external image needed).
// The nose points right so it drives left to right.

function Wheel({ x, y, width, height }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="12" fill="#0b0b0c" />
      <rect x={x + 10} y={y + 7} width={width - 20} height={height - 14} rx="6" fill="url(#car-rim)" />
    </g>
  );
}

export default function CarSvg() {
  return (
    <svg viewBox="0 0 640 260" role="img" aria-label="Orange sports car, top view">
      <defs>
        <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a4d" />
          <stop offset="0.45" stopColor="#e0550f" />
          <stop offset="1" stopColor="#6e2105" />
        </linearGradient>
        <linearGradient id="car-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a3f4b" />
          <stop offset="0.5" stopColor="#0c0d11" />
          <stop offset="1" stopColor="#1d212b" />
        </linearGradient>
        <linearGradient id="car-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d94a3" />
          <stop offset="0.5" stopColor="#f0f2f5" />
          <stop offset="1" stopColor="#8d94a3" />
        </linearGradient>
      </defs>

      {/* wheels sit under the body so only their outer edges show */}
      <Wheel x={112} y={2} width={92} height={44} />
      <Wheel x={112} y={214} width={92} height={44} />
      <Wheel x={462} y={6} width={80} height={46} />
      <Wheel x={462} y={208} width={80} height={46} />

      {/* rear wing */}
      <rect x="8" y="82" width="18" height="96" rx="6" fill="#140704" />

      {/* body */}
      <path
        d="M26 130 C18 96 34 48 92 36 C170 22 214 22 268 28 C340 36 372 40 440 40 C530 40 596 74 630 116 Q640 128 640 130 Q640 132 630 144 C596 186 530 220 440 220 C372 220 340 224 268 232 C214 238 170 238 92 224 C34 212 18 164 26 130 Z"
        fill="url(#car-body)"
      />

      {/* racing stripe and shoulder highlight */}
      <path d="M74 130 H586" stroke="#6e2105" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
      <path d="M120 60 C200 48 300 48 420 60" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.18" />
      <path d="M120 200 C200 212 300 212 420 200" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.08" />

      {/* side intakes and mirrors */}
      <rect x="290" y="44" width="72" height="14" rx="7" fill="#3b1205" />
      <rect x="290" y="202" width="72" height="14" rx="7" fill="#3b1205" />
      <rect x="330" y="22" width="28" height="12" rx="5" fill="#120603" />
      <rect x="330" y="226" width="28" height="12" rx="5" fill="#120603" />

      {/* cabin glass */}
      <path
        d="M232 130 C246 98 296 86 346 86 C392 86 414 100 426 130 C414 160 392 174 346 174 C296 174 246 162 232 130 Z"
        fill="url(#car-glass)"
      />
      <path d="M262 112 C290 98 326 96 352 98" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.25" />

      {/* front splitter and headlights */}
      <path d="M604 100 Q630 104 644 124 Q630 136 604 140 Z" fill="#150804" />
      <path d="M606 108 Q620 104 630 120 Q620 124 606 124 Z" fill="#fff4d8" />
      <path d="M606 152 Q620 156 630 140 Q620 136 606 136 Z" fill="#fff4d8" />

      {/* taillights */}
      <rect x="30" y="104" width="10" height="52" rx="4" fill="#ff2d1f" />
    </svg>
  );
}
