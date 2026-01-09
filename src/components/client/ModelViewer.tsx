"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ModelViewer({ url }: { url: string }) {
  const bg2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!bg2Ref.current) return;

    // Background Image Transition (Mask & Glow)
    let currentProgress = 0;
    let targetProgress = 0;

    const clamp = gsap.utils.clamp(0, 1);

    ScrollTrigger.create({
      trigger: "body",
      start: "top top+=1",
      end: "+=1300",
      scrub: false,
      onUpdate: (self) => {
        targetProgress = clamp(self.progress);
      },
    });

    // Smoothly ease visual progress toward target
    const onTick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08; // damping factor
      bg2Ref.current?.style.setProperty(
        "--progress",
        currentProgress.toString()
      );
      // Calc glow opacity in JS for reliability
      const glowOpacity = Math.sin(currentProgress * Math.PI);
      bg2Ref.current?.style.setProperty(
        "--glow-opacity",
        currentProgress > 0.01 && currentProgress < 0.99
          ? glowOpacity.toString()
          : "0"
      );
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="h-screen w-screen relative">
      {/* Background Layer 1: Initial Image */}
      {/* Container for the transition that holds the state */}
      <div
        ref={bg2Ref}
        className="absolute inset-0 z-0 pointer-events-none"
        style={
          {
            "--progress": 0,
            filter: "blur(calc(var(--progress) * 5px))",
          } as React.CSSProperties
        }
      >
        {/* Background Layer 1: Initial Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Landing_Page/Logo_Day.png')",
          }}
        />

        {/* Background Layer 2: Final Image (Reveals from edges inward) */}
        <div
          className="absolute inset-0 z-1 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/Landing_Page/Logo_Nigh.png')",
            maskImage: `radial-gradient(circle at center, transparent calc(100% * (1.5 - var(--progress) * 1.5)), black calc(100% * (1.5 - var(--progress) * 1.5) + 15%))`,
            WebkitMaskImage: `radial-gradient(circle at center, transparent calc(100% * (1.5 - var(--progress) * 1.5)), black calc(100% * (1.5 - var(--progress) * 1.5) + 15%))`,
          }}
        />

        {/* Glow Layer: Ring of light at the boundary */}
        <div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-screen"
          style={{
            background: `radial-gradient(circle at center, transparent calc(100% * (1.5 - var(--progress) * 1.5) - 10%), rgba(255, 255, 255, 0.4) calc(100% * (1.5 - var(--progress) * 1.5)), transparent calc(100% * (1.5 - var(--progress) * 1.5) + 10%))`,
            opacity: `var(--glow-opacity)`,
          }}
        />
      </div>
    </div>
  );
}
