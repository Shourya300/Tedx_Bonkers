"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scrollSync } from "@/lib/scrollStore";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const checkIdleRef = useRef<number>();

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };
    
    // Check idle state continuously
    const checkIdle = () => {
      setIsHidden(scrollSync.isLensIdle);
      checkIdleRef.current = requestAnimationFrame(checkIdle);
    };

    window.addEventListener("mousemove", onMouseMove);
    checkIdle();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", checkMobile);
      if (checkIdleRef.current) {
        cancelAnimationFrame(checkIdleRef.current);
      }
    };
  }, []);

  // Hide cursor completely on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_3px_rgba(255,255,255,0.8),0_0_30px_6px_rgba(255,255,255,0.4)] transition-opacity duration-300"
      style={{ opacity: isHidden ? 0 : 1 }}
    />
  );
}
  