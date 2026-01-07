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

const BUTTON_CLIP =
  `polygon(
    2% 50%,
    4% 0%,
    96% 0%,
    98% 50%,
    96% 100%,
    4% 100%
  )`;

const TedxButton: React.FC<TedxButtonProps> = ({
  text = "Read more",
  onClick,
  className = "font-bold",
}) => {
  return (
    <button
      className={`relative px-11 py-3.5 bg-[#2a2a2a] cursor-pointer overflow-hidden transition-colors duration-300 hover:bg-[#1f1f1f] font-medium text-base tracking-[0.02em] ${className}`}
      onClick={onClick}
      style={{ clipPath: BUTTON_CLIP }}
    >
      {/* LEFT CROSS */}
      <Cross className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 z-[3] size-3" />

      {/* RIGHT CROSS */}
      <Cross className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-[3] size-3" />

      {/* BORDER SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[4]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon
          points="4,0 96,0 100,50 96,100 4,100 0,50"
          fill="none"
          stroke="#E62B1E"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="#E62B1E"
          strokeWidth="2"
          opacity="0.35"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke="#E62B1E"
          strokeWidth="2"
          opacity="0.35"
        />
      </svg>
      <span className="relative z-[2] text-white inline-block">{text}</span>
    </button>
  );
};

export default TedxButton;
