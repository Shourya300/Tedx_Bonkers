"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ModelViewer({ url }: { url: string }) {
  return (
    <div className="h-screen w-screen relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Layer (Static) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Landing_Page/Logo_Bg.png')",
          }}
        />
      </div>
    </div>
  );
}
