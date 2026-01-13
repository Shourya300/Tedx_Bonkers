import { useState } from "react";
import Link from "next/link";
import { Canvas, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, useTexture, Environment } from "@react-three/drei";

// --- GLASS CONFIGURATION ---
const GLASS_PROPS = {
  thickness: 0.5,
  roughness: 0,
  ior: 1.5,
  chromaticAberration: 0.02,
  anisotropy: 0.2,
  distortion: 0.4,
  distortionScale: 0.1,
  temporalDistortion: 0,
  color: "#ffffff",
};

// --- COMPONENT: Background Perfectly Synced at Depth ---
function BackgroundImage() {
  const texture = useTexture("/images/Landing_Page/Logo_Bg.png");
  const { viewport, camera, size } = useThree();

  // 1. CONFIG: Match this to your CSS (Usually 'center' or 'top')
  const BG_POSITION = 'center'; // 'center' | 'top'
  const DEPTH = 5; // Distance behind the glass (z = -5)

  // 2. GET DIMENSIONS AT DEPTH
  // This is the magic fix. We ask Three.js: "How big is the view at z=-5?"
  // This compensates for perspective scaling automatically.
  const depthViewport = viewport.getCurrentViewport(camera, [0, 0, -DEPTH]);

  // 3. GET SCREEN DIMENSIONS
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;

  // 4. CALCULATE "COVER" SCALE (Pixel Units)
  const screenAspect = screenWidth / screenHeight;
  const imageAspect = 16 / 9; // Check if your image is different!

  let coverWidth, coverHeight;
  if (screenAspect > imageAspect) {
    coverWidth = screenWidth;
    coverHeight = screenWidth / imageAspect;
  } else {
    coverHeight = screenHeight;
    coverWidth = screenHeight * imageAspect;
  }

  // 5. CONVERT TO 3D UNITS AT DEPTH
  // We use the ratio of the *depth viewport* to pixels
  const ratio = depthViewport.width / size.width;

  const finalWidth = coverWidth * ratio;
  const finalHeight = coverHeight * ratio;

  // 6. CALCULATE POSITION OFFSET
  let yOffset = 0;

  if (BG_POSITION === 'center') {
    // Distance from center of screen to center of navbar
    const screenCenterY = screenHeight / 2;
    const navbarCenterY = size.height / 2;
    const pixelOffset = screenCenterY - navbarCenterY;

    // Shift image down by that amount (converted to 3D units)
    yOffset = -(pixelOffset * ratio);
  } else if (BG_POSITION === 'top') {
    // If your CSS is 'background-position: top', use this:
    // Align top of image with top of screen
    // Top of screen relative to navbar center is (size.height/2)
    const topPixelOffset = (finalHeight / 2) / ratio;
    // This logic depends heavily on exact CSS, but Center is standard.
  }

  return (
    <mesh position={[0, yOffset, -DEPTH]}>
      <planeGeometry args={[finalWidth, finalHeight]} />
      {/* toneMapped={false} ensures raw colors match CSS */}
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// --- COMPONENT: The Glass Layer ---
function LiquidGlass() {
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[viewport.width * 1.2, viewport.height]} />
      <MeshTransmissionMaterial
        {...GLASS_PROPS}
        buffer={undefined}
        toneMapped={false}
      />
    </mesh>
  );
}

// ... Icons (ChevronRight) ...
const ChevronRight = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <button onClick={onClick} className={className}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const handleNext = () => setNavIndex((prev) => (prev + 1) % links.length);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] px-2 md:px-12 py-3 md:py-5 flex items-center justify-center pointer-events-none">
      <div className="relative pointer-events-auto">

        <div className="relative w-full max-w-4xl h-16 md:h-20 overflow-hidden rounded-full border border-white/20 shadow-[0_0_25px_rgba(50,200,170,0.15)]">

          <div className="absolute inset-0 -z-10 bg-gray-900">
            {/* REMOVED 'linear' prop here to fix color mismatch */}
            <Canvas gl={{ alpha: false }} camera={{ position: [0, 0, 5], fov: 35 }}>
              <color attach="background" args={['#1a1a1a']} />

              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={2} />

              <Environment preset="city" background={false} />

              <BackgroundImage />
              <LiquidGlass />
            </Canvas>
          </div>

          <div className="relative z-10 w-full h-full px-6 md:px-12 flex items-center justify-between gap-4 md:gap-8 text-[#cdeee4]">
            <Link href="/" className="relative block shrink-0">
              <img src="/images/logo-white.png" alt="TEDxNIITUniversity" className="h-6 md:h-10 w-auto object-contain" />
            </Link>

            <nav className="flex items-center gap-2 md:gap-6">
              {links.map((item, index) => {
                const isVisibleMobile = (index - navIndex + links.length) % links.length < 3;
                return (
                  <Link key={item.name} href={item.path} className={`relative font-inter text-[11px] md:text-[15px] font-medium text-current hover:text-white transition-colors duration-300 py-1 group whitespace-nowrap ${isVisibleMobile ? "block" : "hidden"} md:block`}>
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E62B1E] transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
              <ChevronRight className="md:hidden size-4 text-[#cdeee4] hover:text-white cursor-pointer transition-colors" onClick={handleNext} />
              <Link href="/register" className="md:ml-3 bg-[#E62B1E] text-white px-3 md:px-6 py-1.5 md:py-2.5 rounded font-inter font-semibold text-[10px] md:text-sm transition-all duration-300 hover:bg-[#c91f15] hover:shadow-[0_0_15px_rgba(230,43,30,0.4)] hover:-translate-y-[1px] whitespace-nowrap">
                Get Tickets
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}