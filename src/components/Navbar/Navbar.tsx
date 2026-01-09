import { useState } from "react";
import Link from "next/link";

const NAV_CLIP = `
  polygon(
    2% 50%,
    4% 0%,
    96% 0%,
    98% 50%,
    96% 100%,
    4% 100%
  )
`;

const NAV_CLIP_INNER = `
  polygon(
    3% 50%,
    5% 3%,
    95% 3%,
    97% 50%,
    95% 97%,
    5% 97%
  )
`;

const Cross = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 100 100"
    fill="none"
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

export default function Navbar() {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] px-2 md:px-12 py-3 md:py-5 flex items-center justify-center`}
    >
      <div className="relative z-[2] flex items-center gap-1 md:gap-8 w-full md:w-auto">
        <div
          className="relative bg-[#0f2a24]/90 backdrop-blur-md px-3 md:px-20 py-2 md:py-3.5 flex items-center justify-between md:justify-center gap-1 md:gap-8 shadow-[0_0_25px_rgba(50,200,170,0.15)] border text-[#cdeee4] w-full"
          style={{ clipPath: NAV_CLIP }}
        >
          {/* INNER BORDER SVG */}
          <svg
            className="pointer-events-none absolute inset-0 z-[1] w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="3,50 5,8 95,8 97,50 95,92 5,92"
              fill="none"
              stroke="rgba(244,194,160,0.7)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* LEFT CROSS */}
          <Cross className="pointer-events-none absolute left-1.5 md:left-11 top-1/2 -translate-y-1/2 z-[2] size-3 md:size-4" />

          {/* RIGHT CROSS */}
          <Cross className="pointer-events-none absolute right-1.5 md:right-11 top-1/2 -translate-y-1/2 z-[2] size-3 md:size-4" />

          {/* Centered container with dark grey background and leaf-shaped pointy edges */}
          {/* Brand / Logo */}
          <Link
            href="/"
            className="font-inter font-extrabold text-sm md:text-2xl text-white tracking-tighter decoration-0 whitespace-nowrap"
          >
            <span className="text-[#E62B1E]">TEDx</span>
            <span className="font-light opacity-90 ml-0.5 md:ml-1 text-xs md:text-xl">
              NIITUniversity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-1 md:gap-6">
            {[
              { name: "Speakers", path: "/speakers" },
              { name: "Sponsors", path: "/sponsors" },
              { name: "Timeline", path: "/timeline" },
              { name: "Pre Events", path: "/pre-events" },
              { name: "About", path: "/about" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="relative font-inter text-[9px] md:text-[15px] font-medium text-current hover:text-white transition-colors duration-300 py-1 group whitespace-nowrap"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[rgba(244,194,160,0.7)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <Link
              href="/register"
              className="ml-0.5 md:ml-3 bg-[#E62B1E] text-white px-2 md:px-6 py-1 md:py-2.5 rounded font-inter font-semibold text-[9px] md:text-sm transition-all duration-300 hover:bg-[#c91f15] hover:shadow-[0_0_15px_rgba(230,43,30,0.4)] hover:-translate-y-[1px] whitespace-nowrap"
            >
              Get Tickets
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
