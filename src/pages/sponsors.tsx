"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const CircularGallery = dynamic(
  () => import("@/components/CircularGallery/CircularGallery"),
  { ssr: false },
);

const sponsors = [
  {
    image: "/sponsors/bch.png",
    name: "BCH",
    partnerType: "Hospitality Partner",
    href: "https://www.bluechiphs.com/",
  },
  {
    image: "/sponsors/GDX.png",
    name: "GDX",
    partnerType: "Security Partner",
    href: "https://www.gdxgroup.in/",
  },
  {
    image: "/sponsors/nescafe.jpg",
    name: "Nescafe",
    partnerType: "Collaborators",
    href: "#",
  },
  {
    image: "/sponsors/StudCops.png",
    name: "StudCops",
    partnerType: "Collaborators",
  },
  {
    image: "/sponsors/startupnews.png",
    name: "Startup News.fyi",
    partnerType: "Media Partner",
    href: "https://startupnews.fyi/",
  },
  {
    image: "/sponsors/BR.png",
    name: "Baskin Robbins",
    partnerType: "Dessert Partner",
    href: "https://baskinrobbinsindia.com/",
  },
  {
    image: "/sponsors/Rb.png",
    name: "Red Bull",
    partnerType: "Energy Partner",
    href: "https://www.redbull.com/in-en",
  },
  {
    image: "/sponsors/BurgerSingh.png",
    name: "Burger Singh",
    partnerType: "Food & Beverage Partner",
    href: "https://www.burgersinghonline.com/",
  },
  {
    image: "/sponsors/LCI.png",
    name: "LCI",
    partnerType: "Educational Partner",
    href: "https://www.lcig.io/",
  },
  {
    image: "/sponsors/VC.png",
    name: "VZ Perfection",
    partnerType: "Preevent Partner",
    href: "https://www.vzperfection.co.uk/",
  },
  {
    image: "/nsponsor/Atai.jpeg",
    name: "All Things AI",
    partnerType: "AI Solutions",
    href: "#",
    hasPopup: true,
    popup: {
      description:
        "Your Gateway to the Future of Intelligence AI is everywhere, and honestly, it can get a little overwhelming trying to figure out where to begin.That's exactly why All Things AI exists.Think of it as your go-to space for everything AI, but without the jargon, the confusion, or the steep learning curve. Whether you want to find the right tools for your work, automate the repetitive stuff, build your own app or website without touching a single line of code, or simply stay ahead of the curve, this is where you start.We work with everyone. The solopreneur figuring things out on their own, the corporate team looking to do more with less, the creative who wants AI to bring their ideas to life faster. No matter where you are in your AI journey, beginner, explorer, or someone ready to go all in, there's something here for you. 60+ AI tools. Real use cases. Zero overwhelm.",
      socials: [
        {
          label: "Instagram",
          url: "https://instagram.com/yashj?igshid=stxe9jf9jb7s",
        },
        {
          label: "LinkedIn",
          url: "http://linkedin.com/in/yash-jhaveri-b46399203",
        },
      ],
      highlights: [
        {
          label: "Highlight 1",
          url: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTA0MjEwOTMzMDk4ODk1?igsh=dXNwdHIxYm93cW96",
        },
        {
          label: "Highlight 2",
          url: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE4Mzc2MjI0NTExMTU4NTY5?igsh=MWh3cTh6aGNlZWR4",
        },
      ],
    },
  },
  {
    image: "/sponsors/Smoothie.jpg",
    name: "Smoothie Zone",
    partnerType: "Collaborators",
  },
];

const previousSponsors = [
  { image: "/prevsponsor/LIC.png", name: "LIC" },
  { image: "/prevsponsor/souled.webp", name: "Souled Store" },
  { image: "/prevsponsor/tagz.jpg", name: "Tagz" },
  { image: "/prevsponsor/smaash.png", name: "Smaash" },
  { image: "/prevsponsor/servo.jpg", name: "Servo Lubricants" },
  { image: "/prevsponsor/brew.jpg", name: "Brew House" },
  { image: "/prevsponsor/narayana.jpg", name: "Narayana Education" },
  { image: "/prevsponsor/shutterstock.png", name: "Shutterstock" },
  { image: "/prevsponsor/Aria.jpg", name: "Aria Telecom" },
  { image: "/prevsponsor/boombird.png", name: "Boom Bird" },
  { image: "/prevsponsor/Aashirbad.png", name: "Aashirbad" },
  { image: "/prevsponsor/clayart.png", name: "Clayart" },
  { image: "/prevsponsor/host.png", name: "Host Cube India" },
  { image: "/prevsponsor/ono.png", name: "Ono Hosting" },
  {
    image: "/prevsponsor/powergrid.jpg",
    name: "Power Grid Corporation of India",
  },
  { image: "/prevsponsor/rallison.jpg", name: "Rallison" },
  { image: "/prevsponsor/Aria.jpg", name: "Aria Telecom" },
  { image: "/prevsponsor/rof.png", name: "ROF Group" },
  { image: "/prevsponsor/sunhotel.jpg", name: "Sun Hotel" },
  { image: "/prevsponsor/system.png", name: "T-System" },
  { image: "/prevsponsor/tonbo.jpg", name: "Tonbo" },
  { image: "/prevsponsor/tastebitz.png", name: "Tastebitz" },
  { image: "/prevsponsor/ahe.png", name: "AHE" },
  { image: "/prevsponsor/vishwa.png", name: "Vishwa Buildtech Company" },
  { image: "/prevsponsor/prakrati.png", name: "Prakrati" },
  { image: "/prevsponsor/ecs.png", name: "ECS" },
  { image: "/prevsponsor/welwo.png", name: "Welwopac" },
  { image: "/prevsponsor/ravi.png", name: "Ravi Aggarwal Global Rockstar" },
  { image: "/prevsponsor/bustro.png", name: "Bustro" },






  
];

type PopupData = {
  name: string;
  image: string;
  partnerType: string;
  description: string;
  socials: { label: string; url: string }[];
  highlights: { label: string; url: string }[];
};

export default function SponsorsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const sponsorsGridRef = useRef<HTMLElement>(null);
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllPrevious, setShowAllPrevious] = useState(false);

  useEffect(() => {
  const isMobile = window.innerWidth < 768;
  if (!isMobile) return;

  const handleScroll = () => {
    const cards = document.querySelectorAll(".sponsor-card");
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const screenCenter = window.innerHeight / 2;
      const distance = Math.abs(screenCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    if (popup || showAllPrevious) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [popup, showAllPrevious]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const preventPageScroll = (e: WheelEvent | TouchEvent) => {
      // Allow interaction with buttons inside hero (like the scroll button)
      const target = e.target as HTMLElement;
      if (target.closest("button")) return;

      e.preventDefault();
    };

    hero.addEventListener("wheel", preventPageScroll, { passive: false });
    hero.addEventListener("touchmove", preventPageScroll, { passive: false });

    return () => {
      hero.removeEventListener("wheel", preventPageScroll);
      hero.removeEventListener("touchmove", preventPageScroll);
    };
  }, []);

  const scrollToSponsors = () => {
    sponsorsGridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen w-full text-white font-sans selection:bg-[#B52D2D] selection:text-white overflow-x-hidden">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: block !important;
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(181, 45, 45, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(181, 45, 45, 0.8);
        }
      `}</style>
      {/* Hero Section - Full viewport CircularGallery */}
      <section
        ref={heroRef}
        className="relative w-full h-screen bg-gradient-to-b from-black to-[#240605]"
      >
        <CircularGallery
          items={sponsors.map((s) => ({
            image: s.image,
            text: s.name,
            type: s.partnerType,
          }))}
          bend={
            typeof window !== "undefined" && window.innerWidth < 768 ? 0.5 : 3
          }
          textColor="#ffffff"
          borderRadius={0.05}
        />

        {/* Floating scroll-down arrow */}
        <motion.button
          onClick={scrollToSponsors}
          className="absolute bottom-8 ml-[25%] mb-[15%] md:mb-[0%] md:ml-[45%] -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group w-full max-w-[200px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          aria-label="Scroll to sponsors"
        >
          <span className="text-xs tracking-widest uppercase font-medium">
            Our Partners
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors backdrop-blur-sm bg-black/20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3L8 13M8 13L3 8M8 13L13 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.button>
      </section>

      {/* SPONSOR GRID SECTION */}
      <section
        ref={sponsorsGridRef}
        className="relative px-8 py-32 md:px-16 z-10 bg-gradient-to-b from-black to-[#240605]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-white/10 pb-12"
          >
            <div className="space-y-2">
              <span className="text-[#B52D2D] text-xs font-black uppercase tracking-[0.4em]">
                Current Partners
              </span>
              <h3 className="text-4xl md:text-6xl font-light tracking-tight text-white italic">
                Our Esteemed Partners
              </h3>
            </div>
            <p className="max-w-md text-white/40 text-base leading-relaxed font-medium">
              Collaborating with industry leaders to bring ideas worth spreading
              to our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
            {sponsors.map((sponsor, i) =>
              (sponsor as any).hasPopup ? (
                <motion.button
                  key={i}
                  onClick={() => {
                    setPopup({
                      name: sponsor.name,
                      image: sponsor.image,
                      partnerType: sponsor.partnerType,
                      ...(sponsor as any).popup,
                    });
                    setIsExpanded(false);
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="group flex flex-col items-center gap-3 cursor-pointer text-left w-full"
                >
                  <div className="w-full aspect-[4/3] rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all overflow-hidden flex items-center justify-center p-8 relative">
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="w-full h-full object-contain filter grayscale brightness-125 group-hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Localized dark area for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="h-[1px] w-12 bg-[#B52D2D] mb-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                        Discover
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-4">
                    <span className="text-sm font-bold tracking-widest text-white uppercase flex items-center justify-center gap-2">
                      {sponsor.name}
                      <div className="w-1 h-1 rounded-full bg-[#B52D2D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium text-center">
                      {sponsor.partnerType}
                    </span>
                  </div>
                </motion.button>
              ) : (
                <motion.a
                  key={i}
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="group sponsor-card flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all overflow-hidden flex items-center justify-center p-8 relative">
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className={`
  w-full h-full object-contain transition-all duration-700
  ${
    typeof window !== "undefined" && window.innerWidth < 768
      ? activeIndex === i
        ? "grayscale-0 brightness-110"
        : "grayscale brightness-125"
      : "filter grayscale brightness-125 group-hover:grayscale-0"
  }
`}
                    />
                    {/* Localized dark area for text legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="h-[1px] w-12 bg-[#B52D2D] mb-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
                        Discover
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-4">
                    <span className="text-sm font-bold tracking-widest text-white uppercase flex items-center justify-center gap-2">
                      {sponsor.name}
                      <div className="w-1 h-1 rounded-full bg-[#B52D2D] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium text-center">
                      {sponsor.partnerType}
                    </span>
                  </div>
                </motion.a>
              ),
            )}
          </div>

          {/* All Things AI Popup Modal */}
          {popup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
              onClick={() => setPopup(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-5xl rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#1a0a0a] via-[#0d0505] to-black shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Close button */}
                <button
                  onClick={() => setPopup(null)}
                  className="absolute top-8 right-8 text-white/40 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-3 rounded-full z-20 group"
                  aria-label="Close"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:rotate-90 transition-transform duration-300"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
                  {/* LEFT — Visual Showcase */}
                  <div className="flex flex-col items-center justify-center gap-8 p-10 md:p-12 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.01] md:w-[500px] shrink-0">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="relative w-full max-w-[320px] md:max-w-none aspect-[3/4] rounded-[2rem] overflow-hidden group/img border border-white/10 shadow-2xl bg-black/20"
                    >
                      <img
                        src={popup.image}
                        alt={popup.name}
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </motion.div>

                    <div className="text-center space-y-4 w-full">
                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-black text-white tracking-tight uppercase italic drop-shadow-lg"
                      >
                        {popup.name}
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <span className="inline-block px-6 py-2 bg-[#B52D2D]/20 text-[#ff4d4d] text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-[#B52D2D]/40 backdrop-blur-md">
                          {popup.partnerType}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* RIGHT — Information Hub */}
                  <div className="flex flex-col p-10 md:p-16 flex-1">
                    {/* About Section */}
                    <div className="space-y-12">
                      <section>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-1 h-10 bg-[#B52D2D] rounded-full" />
                          <h3 className="text-xl font-black uppercase tracking-[0.1em] text-white/90">
                            About
                          </h3>
                        </div>
                        <div className="relative">
                          <p className="text-white/60 text-lg leading-relaxed font-medium">
                            {isExpanded || popup.description.length <= 250
                              ? popup.description
                              : `${popup.description.substring(0, 250)}...`}
                          </p>
                          {popup.description.length > 250 && (
                            <button
                              onClick={() => setIsExpanded(!isExpanded)}
                              className="mt-4 text-[#ff4d4d] font-bold text-sm hover:text-white transition-colors flex items-center gap-2 group/btn"
                            >
                              {isExpanded ? "Show Less" : "Read More"}
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"}`}
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </button>
                          )}
                        </div>
                      </section>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Social Links */}
                        <section>
                          <h4 className="text-xs text-white/30 uppercase tracking-[0.3em] font-black mb-6">
                            Connect With Us
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {popup.socials.map((s, idx) => (
                              <a
                                key={idx}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white/70 text-sm font-bold hover:bg-[#B52D2D] hover:text-white hover:border-[#B52D2D] hover:-translate-y-1 transition-all duration-300"
                              >
                                {s.label}
                              </a>
                            ))}
                          </div>
                        </section>

                        {/* Experience Highlights */}
                        <section>
                          <h4 className="text-xs text-white/30 uppercase tracking-[0.3em] font-black mb-6">
                            AI Consultation Highlight
                          </h4>
                          <div className="space-y-3">
                            {popup.highlights.map((h, idx) => (
                              <a
                                key={idx}
                                href={h.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                              >
                                <div className="w-10 h-10 rounded-xl bg-[#B52D2D]/20 flex items-center justify-center shrink-0 group-hover:bg-[#B52D2D] transition-colors duration-300">
                                  <svg
                                    width="14"
                                    height="16"
                                    viewBox="0 0 12 14"
                                    fill="currentColor"
                                    className="text-[#ff4d4d] group-hover:text-white ml-0.5"
                                  >
                                    <path d="M0 0L12 7L0 14V0Z" />
                                  </svg>
                                </div>
                                <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                                  {h.label}
                                </span>
                              </a>
                            ))}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Previous Sponsors Section */}
          <div className="mt-48 pt-32 border-t border-white/10">
            <div className="">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                <div className="space-y-4">
                  <span className="text-[#B52D2D] text-xs md:text-xs font-black uppercase tracking-[0.4em]">
                    Historical Network
                  </span>
                  <h4 className="text-4xl md:text-6xl font-light tracking-tight text-white italic mt-2">
                    Previous Sponsors
                  </h4>
                </div>
                <p className="max-w-md text-white/40 text-base leading-relaxed font-medium">
                  Honoring the partnerships that have fueled our vision over the
                  years.
                </p>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                  {previousSponsors.slice(0, 9).map((prev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className={`group ${i >= 6 ? "hidden md:block" : ""}`}
                    >
                      <div className="aspect-[4/3] bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-[#B52D2D]/40 transition-all duration-500">
                        <img
                          src={prev.image}
                          alt={prev.name}
                          className="w-32 h-16 md:w-64 md:h-40 object-contain"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Modern Compact See All Button */}
                <div className="flex items-center justify-center mt-12 md:mt-8">
                  <button
                    onClick={() => setShowAllPrevious(true)}
                    className="group relative flex items-center gap-2.5 px-6 py-2.5 bg-[#1a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-500 hover:border-[#B52D2D]/60 hover:shadow-[0_0_20px_rgba(181,45,45,0.2)] active:scale-95"
                  >
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-all">
                      Explore All
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#B52D2D] group-hover:border-[#B52D2D] transition-all duration-500">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        className="group-hover:translate-x-0.5 transition-transform text-white"
                      >
                        <path
                          d="M5 12h14m-7-7 7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Full Previous Sponsors Popup */}
          {showAllPrevious && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
              onClick={() => setShowAllPrevious(false)}
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-[#0d0505] border border-white/10 rounded-[3rem] p-8 md:p-16 overflow-y-auto custom-scrollbar"
              >
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
                    Legacy Partners
                  </h2>
                  <button
                    onClick={() => setShowAllPrevious(false)}
                    className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all group"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="group-hover:rotate-90 transition-transform"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
                  {previousSponsors.map((prev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center gap-6 hover:bg-white/10 transition-colors w-full"
                    >
                      <div className="w-full aspect-square max-w-[280px] flex items-center justify-center p-8 bg-white rounded-[2rem] overflow-hidden shadow-2xl">
                        <img
                          src={prev.image}
                          alt={prev.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-white/90 text-lg font-black uppercase tracking-[0.2em] text-center group-hover:text-white transition-colors">
                        {prev.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
