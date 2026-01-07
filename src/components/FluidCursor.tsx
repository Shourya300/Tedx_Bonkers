"use client";

import { useEffect } from "react";

export default function FluidCursor() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const mod = await import("../../public/fluid-simulation.js");
      cleanup = mod.initFluid?.();
    })();

    return () => cleanup?.();
  }, []);

  return (
    <canvas
      id="fluid-canvas"
      className="fixed inset-0 z-[5]"
      style={{
        width: "100vw",
        height: "100vh",
        pointerEvents: "none", // 🔥 VERY IMPORTANT
      }}
    />
  );
}
