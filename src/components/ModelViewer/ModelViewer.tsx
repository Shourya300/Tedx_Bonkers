"use client";

import { useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrame, useThree } from "@react-three/fiber";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useState } from "react";

import FluidCursor from "@/components/FluidCursor";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;
  useLayoutEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.depthWrite = false;
        child.material.depthTest = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={isMobile ? 0.8 : 1} />;
}

function ClearFrame() {
  const { gl } = useThree();

  useFrame(() => {
    gl.clear(true, true);
  });

  return null;
}

export default function ModelViewer({ url }: { url: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!canvasRef.current || !bg2Ref.current) return;

    const mm = gsap.matchMedia();

    // Desktop: shift left
    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "90%",
          scrub: 1,
        },
      });

      tl.to(canvasRef.current, {
        xPercent: -25,
        ease: "none",
      });
    });

    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "90%",
          scrub: 1,
        },
      });

      tl.to(canvasRef.current, {
        xPercent: 0,
        scale: 0.8,
        ease: "none",
      });
    });

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
    gsap.ticker.add(() => {
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
    });

    return () => {
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
        {/* Blurred Fluid Cursor */}
        <FluidCursor />

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

      <div
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-auto"
        style={{ top: "20px" }}
      >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.autoClear = false;
          }}
        >
          <ClearFrame />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          <Center>
            <Model url={url} />
          </Center>
          <OrbitControls
            makeDefault
            enableZoom={false}
            minAzimuthAngle={-Math.PI / 2}
            maxAzimuthAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </div>
    </div>
  );
}
