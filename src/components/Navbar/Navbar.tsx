import Link from "next/link";
import { MetalButton } from "../metal-button";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: "Speakers", path: "/speakers" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Timeline", path: "/timeline" },
    { name: "Rewind", path: "/rewind" },
    { name: "Pre Events", path: "/pre-events" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    if (dropdownRef.current && menuItemsRef.current) {
      if (isMenuOpen) {
        // Opening animation
        gsap.fromTo(
          dropdownRef.current,
          {
            height: 0,
            opacity: 0,
            y: -20,
          },
          {
            height: "auto",
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
            delay: 0,
          }
        );

        // Stagger animation for menu items
        const items = menuItemsRef.current.children;
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
      } else {
        // Closing animation
        gsap.to(dropdownRef.current, {
          height: 0,
          opacity: 0,
          y: -20,
          duration: 0.25,
          ease: "power2.in",
        });
      }
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[1000]">
      <div className="mt-5 max-h-[75px] max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between border border-white/20 border-t-white/40 border-l-white/30 backdrop-blur-lg rounded-full shadow-md">
        <Link href="/" className="flex shrink-0">
          <img src="/images/logo-white.png" alt="TEDxNIITUniversity" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {links.map((item) => (

            <Link key={item.name} href={item.path} className="text-white text-sm xl:text-base font-medium hover:opacity-80 transition-opacity">
              {item.name}
            </Link>
          ))}
          <MetalButton variant="primary" className="text-md">
            <Link href="/register">
              Get Tickets
            </Link>
          </MetalButton>
        </nav>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        ref={dropdownRef}
        className="lg:hidden max-w-6xl mx-auto px-4 md:px-8 overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <nav className="border border-white/20 border-t-white/40 border-l-white/30 backdrop-blur-lg rounded-3xl shadow-md p-6 mt-2">
          <div ref={menuItemsRef} className="flex flex-col gap-4">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={closeMenu}
                className="text-white text-base font-medium hover:opacity-80 transition-opacity py-2"
              >
                {item.name}
              </Link>
            ))}
            <div>
              <MetalButton variant="primary" className="text-md mt-2">
                <Link href="/register" onClick={closeMenu}>
                  Get Tickets
                </Link>
              </MetalButton>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[-1]"
        ></div>
      )}
    </header>
  );
}
