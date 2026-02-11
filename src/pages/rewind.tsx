"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer/Footer";
import DomeGallery from "@/components/DomeGallery/DomeGallery.jsx";
import SearchPanel from "@/components/Rewind/SearchPanel";
import YearSection from "@/components/Rewind/YearSection";
import { yearContent } from "@/data/rewindData";

export default function RewindPage() {
  const [activeYear, setActiveYear] = useState(2025);
  const [searchOpen, setSearchOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom =
          heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsSticky(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [searchOpen]);

  const sortedYears = Object.keys(yearContent)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div>
      <main className="relative bg-black text-white min-h-screen">
        {/* SEARCH PANEL */}
        <SearchPanel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* FLOATING SEARCH BUTTON */}
        <motion.button
          onClick={() => setSearchOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-[60] w-12 h-12 sm:w-14 sm:h-14 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-400/60 rounded-full flex items-center justify-center text-cyan-300 hover:text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Search speakers(ctrl + k)"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </motion.button>

        {/* HERO SECTION */}
        <div
          ref={heroRef}
          className="relative h-[80vh] w-full overflow-hidden bg-black flex items-center justify-center"
        >
          <div className="absolute inset-0">
            <DomeGallery
              fit={0.7}
              minRadius={800}
              grayscale={false}
              overlayBlurColor="rgba(0,0,0,0.5)"
            />
          </div>

          <div className="relative z-10 text-center px-6 pointer-events-none">
            <motion.h1
              className="text-6xl md:text-8xl font-bold leading-tight mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              TEDx <span className="text-[#FF3A3A]">Rewind</span>
            </motion.h1>
          </div>
        </div>

        {/* MAIN CONTENT WRAPPER */}
        <div className="relative z-10 w-full flex flex-col items-center md:flex-row md:items-start gap-12 px-6 md:px-12">
          {/* MOBILE YEAR SELECTOR */}
          <div className="md:hidden w-full mb-2 sticky top-[66px] z-40">
            <div className="flex items-center gap-2 py-3 no-scrollbar bg-black/80 backdrop-blur-xl border-b border-white/10 -mx-6 px-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 active:scale-95 transition-all"
                aria-label="Search speakers"
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <div className="w-px h-6 bg-white/10 shrink-0" />

              <div className="flex overflow-x-auto gap-2 no-scrollbar">
                {sortedYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap shrink-0
                      ${
                        activeYear === year
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                          : "text-gray-400 hover:text-white border border-transparent"
                      }
                    `}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LEFT COLUMN: Main Content (Tab View) */}
          <div className="flex-1 min-h-[60vh] max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <YearSection
                  year={activeYear}
                  data={yearContent[activeYear]}
                  onInView={() => {}}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Desktop Year Selector */}
          <div className="hidden md:flex flex-col w-32 lg:w-48 relative shrink-0 ml-12 md:ml-24 mr-8 md:mr-32 min-h-[200px]">
            <AnimatePresence>
              {isSticky && !footerVisible && (
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: 50,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="fixed top-32 lg:top-40 right-8 md:right-32 z-50 w-32 lg:w-48"
                >
                  <div className="relative flex flex-col gap-1.5 px-6 py-14 bg-black/60 backdrop-blur-2xl border-2 border-white/60 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/80 rotate-45 shadow-[0_0_10px_white]" />
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-white/60 rotate-45" />

                    {sortedYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        className={`relative flex items-center justify-center p-1.5 text-xl lg:text-[1.75rem] font-bold tracking-wide transition-all duration-300 w-full group font-serif
                          ${
                            activeYear === year
                              ? `text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`
                              : `text-gray-500 hover:text-gray-300 hover:scale-105`
                          }
                        `}
                      >
                        {activeYear === year && (
                          <motion.div
                            layoutId="activeGlow"
                            className="absolute inset-0 bg-white/5 blur-xl rounded-full -z-10"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        {year}
                      </button>
                    ))}

                    <div className="border-t border-white/20 mt-2 pt-3">
                      <button
                        onClick={() => setSearchOpen(true)}
                        className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-white/5 hover:bg-cyan-500/15 text-gray-400 hover:text-cyan-300 transition-all text-sm"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        Search
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}
