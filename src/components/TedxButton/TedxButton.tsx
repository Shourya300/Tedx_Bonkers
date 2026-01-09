import React from "react";

interface TedxButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

const Cross = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 100 100"
    fill="none"
    stroke="#E62B1E"
    strokeWidth="2"
    scale="2"
  >
    <path
      d="
        M47 8
        L53 8
        L55 40
        L92 47
        L92 53
        L55 60
        L53 92
        L47 92
        L45 60
        L8 53
        L8 47
        L45 40
        Z
      "
      fill="rgba(205,238,228,0.45)"
    />
  </svg>
);

const BUTTON_CLIP = `polygon(
    5% 50%,
    15% 0%,
    85% 0%,
    95% 50%,
    85% 100%,
    15% 100%
  )`;

const TedxButton: React.FC<TedxButtonProps> = ({
  text = "Read more",
  onClick,
  className = "font-bold",
}) => {
  return (
    <button
      className={`relative px-10 md:px-14 py-2.5 md:py-3.5 bg-[#2a2a2a] cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-[#1f1f1f] font-medium text-sm md:text-base tracking-[0.02em] ${className}`}
      onClick={onClick}
      style={{ clipPath: BUTTON_CLIP }}
    >
      {/* LEFT CROSS */}
      <Cross className="pointer-events-none absolute left-5 md:left-7 top-1/2 -translate-y-1/2 z-[3] size-2.5 md:size-3" />

      {/* RIGHT CROSS */}
      <Cross className="pointer-events-none absolute right-5 md:right-7 top-1/2 -translate-y-1/2 z-[3] size-2.5 md:size-3" />

      {/* BORDER SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[4]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon
          points="7,50 16,8 84,8 93,50 84,92 16,92"
          fill="none"
          stroke="rgba(244,194,160,0.7)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span className="relative z-[2] text-white inline-block">{text}</span>
    </button>
  );
};

export default TedxButton;
