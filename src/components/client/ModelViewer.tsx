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
            minHeight: '100lvh',
          }}
        />
        {/* 3D SUBLIS Text Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center perspective-[1000px]">
          <div className="flex flex-col items-center gap-0">
            <h1
              style={{ 
                fontFamily: "logoFont",
                textShadow: `
                  0 1px 0 #7ac5d9,
                  0 2px 0 #6cbdce,
                  0 3px 0 #5eb5c4,
                  0 4px 0 #50adb9,
                  0 5px 0 #42a5af,
                  0 6px 0 #349da4,
                  0 7px 0 #26959a,
                  0 8px 0 #188d8f,
                  0 9px 0 #0a8585,
                  0 10px 10px rgba(0,0,0,0.4),
                  0 15px 20px rgba(0,0,0,0.3),
                  0 20px 30px rgba(0,0,0,0.2)
                `,
                transform: 'rotateX(10deg) rotateY(-5deg)',
                transformStyle: 'preserve-3d',
                lineHeight: '1',
              }}
              className="my-0 text-[#9DEEFF] text-[70px] md:text-[200px] font-bold opacity-60 leading-none"
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
              className="text-[#111111] text-[20px] md:text-[40px] my-0 leading-none"
            >
              what moves beneath moves us all
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
