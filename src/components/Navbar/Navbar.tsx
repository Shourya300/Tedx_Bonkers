import Link from "next/link";
import { MetalButton } from "../metal-button";

export default function Navbar() {
  const links = [
    { name: "Speakers", path: "/speakers" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Timeline", path: "/timeline" },
    { name: "Rewind", path: "/rewind" },
    { name: "Pre Events", path: "/pre-events" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[1000]">
      <div className="mt-5 max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between border border-white/20 border-t-white/40 border-l-white/30 backdrop-blur-lg rounded-full shadow-md">
        <Link href="/" className="flex shrink-0">
          <img src="/images/logo-white.png" alt="TEDxNIITUniversity" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          {links.map((item) => (
            <Link key={item.name} href={item.path} className="text-white text-sm md:text-base font-medium hover:opacity-80 transition-opacity">
              {item.name}
            </Link>
          ))}
          <MetalButton variant="primary" className="text-md">
            <Link href="/register" >
              Get Tickets
            </Link>
          </MetalButton>
        </nav>
      </div>
    </header>
  );
}
