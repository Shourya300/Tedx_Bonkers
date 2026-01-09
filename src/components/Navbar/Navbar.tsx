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

const ChevronRight = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => (
  <button onClick={onClick} className={className}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

export default function Navbar() {
  const [navIndex, setNavIndex] = useState(0);

  const links = [
    { name: "Speakers", path: "/speakers" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Timeline", path: "/timeline" },
    { name: "Rewind", path: "/rewind" },
    { name: "Pre Events", path: "/pre-events" },
    { name: "About", path: "/about" },
  ];

  const handleNext = () => {
    setNavIndex((prev) => (prev + 1) % links.length);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] px-2 md:px-12 py-3 md:py-5 flex items-center justify-center`}
    >
      <div className="relative z-[2] flex items-center gap-1 md:gap-8 w-full md:w-auto">
        <div
          className="relative bg-[#0f2a24]/90 backdrop-blur-md pl-10 pr-14 md:px-20 py-2 md:py-3.5 flex items-center justify-between md:justify-center gap-1 md:gap-8 shadow-[0_0_25px_rgba(50,200,170,0.15)] border text-[#cdeee4] w-full"
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
          <Cross className="pointer-events-none absolute left-5 md:left-11 top-1/2 -translate-y-1/2 z-[2] size-3 md:size-4" />

          {/* RIGHT CROSS */}
          <Cross className="pointer-events-none absolute right-5 md:right-11 top-1/2 -translate-y-1/2 z-[2] size-3 md:size-4" />

          {/* Logo */}
          <Link href="/" className="relative z-[10]">
            <img
              src="/images/logo-white.png"
              alt="TEDxNIITUniversity"
              className="h-8 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-2 md:gap-6">
            {links.map((item, index) => {
              // Calculate visibility for mobile (circular window of 3)
              // We want to show items at navIndex, navIndex+1, navIndex+2 (mod length)
              const isVisibleMobile =
                (index - navIndex + links.length) % links.length < 3;

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative font-inter text-[11px] md:text-[15px] font-medium text-current hover:text-white transition-colors duration-300 py-1 group whitespace-nowrap ${
                    isVisibleMobile ? "block" : "hidden"
                  } md:block`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E62B1E] transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}

            {/* Mobile Shift Arrow */}
            <ChevronRight
              className="md:hidden size-4 text-[#cdeee4] hover:text-white cursor-pointer transition-colors"
              onClick={handleNext}
            />

            <Link
              href="/register"
              className="md:ml-3 bg-[#E62B1E] text-white px-3 md:px-6 py-1.5 md:py-2.5 rounded font-inter font-semibold text-[10px] md:text-sm transition-all duration-300 hover:bg-[#c91f15] hover:shadow-[0_0_15px_rgba(230,43,30,0.4)] hover:-translate-y-[1px] whitespace-nowrap"
            >
              Get Tickets
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
