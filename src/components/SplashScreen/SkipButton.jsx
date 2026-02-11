import { useState } from "react";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Minimal, elegant skip button with SVG progress ring.
 * Appears muted gold, brightens on hover.
 */
export default function SkipButton({ progress, onSkip, visible }) {
  const [clicked, setClicked] = useState(false);

  if (!visible) return null;

  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    onSkip();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-[10000] flex items-center gap-2 group cursor-pointer bg-transparent border-none outline-none"
      aria-label="Skip introduction"
    >
      <span className="text-[#C8A961]/50 group-hover:text-[#C8A961] transition-colors duration-300 text-sm tracking-widest select-none">
        {clicked ? "جاری ہے..." : "Skip"}
      </span>
      <svg width="44" height="44" className="-rotate-90">
        <circle
          cx="22" cy="22" r={RADIUS}
          fill="none"
          stroke="rgba(200,169,97,0.12)"
          strokeWidth="2"
        />
        <circle
          cx="22" cy="22" r={RADIUS}
          fill="none"
          stroke="#C8A961"
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
    </button>
  );
}
