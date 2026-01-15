"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scrollSync } from "@/lib/scrollStore";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const checkIdleRef = useRef<number>();
  const modeRef = useRef<"default" | "link" | "text">("default");
  const targetRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const cursor = cursorRef.current;
    if (!cursor) return;

    const setCursorMode = (mode: "default" | "link" | "text") => {
      if (modeRef.current === mode) return;
      modeRef.current = mode;

      if (mode === "link") {
        gsap.to(cursor, {
          borderRadius: 14,
          backgroundColor: "transparent",
          border: "2px solid rgba(255,255,255,0.9)",
          boxShadow: "0 0 12px rgba(255,255,255,0.35)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (mode === "text") {
        gsap.to(cursor, {
          borderRadius: 9999,
          backgroundColor: "rgba(255,255,255,0.9)",
          border: "none",
          boxShadow:
            "0 0 10px rgba(255,255,255,0.6), 0 0 18px rgba(255,255,255,0.3)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(cursor, {
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,1)",
          border: "none",
          boxShadow:
            "0 0 15px 3px rgba(255,255,255,0.8), 0 0 30px 6px rgba(255,255,255,0.4)",
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as
        | HTMLElement
        | null;

      const linkEl = target?.closest("a, [role='link'], button") as HTMLElement | null;
      const textEl = target?.closest(
        "input, textarea, [contenteditable='true'], p, span, li, h1, h2, h3, h4, h5, h6"
      ) as HTMLElement | null;

      if (linkEl) {
        setCursorMode("link");
        targetRectRef.current = linkEl.getBoundingClientRect();
      } else if (textEl) {
        setCursorMode("text");
        targetRectRef.current = null;
      } else {
        setCursorMode("default");
        targetRectRef.current = null;
      }

      let targetX = e.clientX;
      let targetY = e.clientY;
      let targetWidth = 16;
      let targetHeight = 16;
      let duration = 0.15;

      if (modeRef.current === "link" && targetRectRef.current) {
        const rect = targetRectRef.current;
        const paddingX = 12;
        const paddingY = 8;
        targetWidth = Math.max(rect.width + paddingX, 24);
        targetHeight = Math.max(rect.height + paddingY, 20);
        
        // Allow mouse offset from link center for smooth following
        const linkCenterX = rect.left + rect.width / 2;
        const linkCenterY = rect.top + rect.height / 2;
        const offsetX = Math.max(-8, Math.min(8, e.clientX - linkCenterX)) * 0.3;
        const offsetY = Math.max(-8, Math.min(8, e.clientY - linkCenterY)) * 0.3;
        
        targetX = linkCenterX + offsetX;
        targetY = linkCenterY + offsetY;
        duration = 0.18;
      } else if (modeRef.current === "text") {
        targetWidth = 6;
        targetHeight = 28;
        duration = 0.12;
      }

      gsap.to(cursor, {
        x: targetX,
        y: targetY,
        width: targetWidth,
        height: targetHeight,
        duration: duration,
        ease: "power2.out",
        overwrite: "auto",
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
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_3px_rgba(255,255,255,0.8),0_0_30px_6px_rgba(255,255,255,0.4)] transition-opacity duration-300"
      style={{ opacity: isHidden ? 0 : 1 }}
    />
  );
}
  