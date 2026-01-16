"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { scrollSync } from "@/lib/scrollStore";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const checkIdleRef = useRef<number>();
  const modeRef = useRef<"default" | "underline" | "text" | "card">("default");
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

    const setCursorMode = (mode: "default" | "underline" | "text" | "card") => {
      if (modeRef.current === mode) return;
      modeRef.current = mode;

      if (mode === "underline") {
        gsap.to(cursor, {
          borderRadius: "0px",
          backgroundColor: "rgba(255,255,255,1)",
          border: "none",
          boxShadow: "none",
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (mode === "card") {
        gsap.to(cursor, {
          borderRadius: "999px",
          backgroundColor: "rgba(255,255,255,0.9)",
          border: "none",
          boxShadow: "none",
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else if (mode === "text") {
        gsap.to(cursor, {
          borderRadius: "999px",
          backgroundColor: "rgba(255,255,255,0.9)",
          border: "none",
          boxShadow: "none",
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        // Default style
        gsap.to(cursor, {
          borderRadius: "9999px",
          backgroundColor: "rgba(255,255,255,1)",
          border: "2px solid rgba(255,255,255,0)",
          boxShadow: "none",
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const target = document.elementFromPoint(e.clientX, e.clientY) as
        | HTMLElement
        | null;

      const interactiveEl = target?.closest("a, [role='link'], button") as HTMLElement | null;
      const textEl = target?.closest(
        "input, textarea, [contenteditable='true'], p, span, li, h1, h2, h3, h4, h5, h6"
      ) as HTMLElement | null;

      if (interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        const isLargeTarget = rect.width > 200 || rect.height > 100;
        
        if (isLargeTarget) {
          setCursorMode("card");
          targetRectRef.current = rect;
        } else {
          // Check if it's a text-only link
          const isAnchor = interactiveEl.tagName.toLowerCase() === 'a' || interactiveEl.getAttribute('role') === 'link';
          const isButton = interactiveEl.tagName.toLowerCase() === 'button';
          const hasImage = interactiveEl.querySelector('img, svg') !== null;
          
          if (isAnchor && !hasImage && !isButton) {
            setCursorMode("underline");
            targetRectRef.current = rect;
          } else {
            // It's a button or image link - treat as default
            setCursorMode("default");
            targetRectRef.current = null;
          }
        }
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
      let duration = 0.1;

      if (modeRef.current === "underline" && targetRectRef.current) {
        const rect = targetRectRef.current;
        targetWidth = rect.width;
        targetHeight = 2;
        targetX = rect.left + rect.width / 2;
        targetY = rect.bottom;
        duration = 0.2;
      } else if (modeRef.current === "card") {
        targetWidth = 40;
        targetHeight = 40;
        targetX = e.clientX;
        targetY = e.clientY;
        duration = 0.15;
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

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{ opacity: isHidden ? 0 : 1 }}
    />
  );
}
