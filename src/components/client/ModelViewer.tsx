"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ModelViewer({ url }: { url: string }) {
  return (
    <div className="min-h-lvh w-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Layer (Static) - Pre-sized to maximum viewport */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Landing_Page/Logo_Bg.png')",
            minHeight: '100lvh', // Pre-size to large viewport (no address bar)
          }}
        />
        {/* SUBLIS Text Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1
            style={{ fontFamily: "logoFont" }}
            className="py-5 text-[#9DEEFF] text-[70px] md:text-[200px] opacity-70 m-auto"
          >
            SUBLIS
          </h1>
        </div>
      </div>
    </div>
  );
}
