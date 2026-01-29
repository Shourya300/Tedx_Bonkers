"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { Text3D, OrbitControls, Center } from '@react-three/drei'

export default function ModelViewer({ url }: { url: string }) {
  return (
    <div className="min-h-lvh w-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Layer (Static) - Pre-sized to maximum viewport */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Landing_Page/Logo_Bg.png')",
            minHeight: '100lvh',
          }}
        />
        {/* 3D SUBLIS Text Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center perspective-[1000px]">
          <div className="flex flex-col items-center gap-0">
            <h1
              style={{ 
                fontFamily: "logoFont",
              }}
              className="my-0 text-[#9DEEFF] font-bold opacity-100 leading-none text-[clamp(3.5rem,14vw,12.5rem)]"
            >
              SUBLIS
            </h1>
            <p
              style={{ 
                fontFamily: "logoFont",
                wordSpacing: "0.9rem",
                marginTop: "-1rem",
                lineHeight: "1",
              }}
              className="text-[#111111] my-0 leading-none text-[clamp(1rem,4vw,2.5rem)]"
            >
              {/* Add subtitle text here if needed */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
