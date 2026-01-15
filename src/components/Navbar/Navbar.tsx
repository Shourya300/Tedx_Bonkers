import Link from "next/link";

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
            <Link key={item.name} href={item.path} className="text-[#313131] text-sm md:text-base font-medium hover:opacity-80 transition-opacity">
              {item.name}
            </Link>
          ))}
          <Link href="/register" className="bg-white text-red-600 px-4 md:px-6 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
            Get Tickets
          </Link>
        </nav>
      </div>
    </header>
  );
}