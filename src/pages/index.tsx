"use client";
import TedxButton from "@/components/TedxButton";
import dynamic from "next/dynamic";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FluidGlass from "@/components/FluidGlass/FluidGlass";
import { scrollSync } from "@/lib/scrollStore";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Dynamically import ModelViewer

const ModelViewer = dynamic(() => import("@/components/client/ModelViewer"), {
  ssr: false,
});

export default function Home() {
  const textWrapRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!textWrapRef.current) return;

    const PHASE_START = 0.45;
    const isMobile = window.innerWidth < 768;
    const totalShift = window.innerHeight * (isMobile ? 6.5 : 5.9); // More shift on mobile

    const ctx = gsap.context(() => {
      const setY = gsap.quickSetter(textWrapRef.current, "y", "px");

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=5000",
        scrub: true,
        onUpdate: (self) => {
          // lens grows first
          const scrollProgress = self.progress;
          const contentProgress = Math.min(
            Math.max((scrollProgress - PHASE_START) / (1 - PHASE_START), 0),
            1
          );

          // expose ALL phases
          scrollSync.rawProgress = scrollProgress;
          scrollSync.progress = contentProgress;

          // text moves ONLY in phase 2
          const unclampedProgress =
            (scrollProgress - PHASE_START) / (1 - PHASE_START);

          setY(-totalShift * Math.max(unclampedProgress, 0));

          // Debug logging
          if (Math.random() < 0.01) { // Log occasionally
            console.log('Scroll:', {
              scrollProgress: scrollProgress.toFixed(3),
              contentProgress: contentProgress.toFixed(3),
              yOffset: (-totalShift * Math.max(unclampedProgress, 0)).toFixed(1)
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black">
      {/* Fixed Scene */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <ModelViewer url="/models/grid/Hoodie.glb" />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 50%, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 0.3) 100%)'
          }}
        />
      </div>

      {/* Text Overlay */}
      <div
        ref={textWrapRef}
        className="fixed inset-0 z-20 pointer-events-none will-change-transform md:mr-40"
      >
        <section className="min-h-screen flex items-center justify-center" />

        <section className="min-h-screen flex items-center justify-center pointer-events-auto px-6 md:px-12">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-glow">
                Speakers
              </h2>
              <div className="w-36 h-[1px] bg-[#D3D3D3] shadow-[0_0_10px_rgba(230,230,230,230)] mt-4" />
              <p className="text-center text-[16px] md:text-[24px] leading-[1.7] max-w-[460px] mx-auto font-medium font-sans tracking-[0.02em] text-[#EAEAEA] mt-8 px-4 md:px-0">
                Ideas shape the future—and our speakers are the voices leading
                that change. Meet innovators, thinkers, creators, and
                storytellers from diverse fields who will take the stage to
                share powerful ideas worth spreading. Each talk is crafted to
                spark curiosity, challenge perspectives, and inspire action.
              </p>
              <div className="mt-6">
                <TedxButton />
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center pointer-events-auto px-6 md:px-12">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-glow">
                Pre-Events
              </h2>
              <div className="w-48 h-[1px] bg-[#D3D3D3] shadow-[0_0_10px_rgba(230,230,230,230)] mt-4" />
              <p className="text-center text-[16px] md:text-[24px] leading-[1.7] max-w-[460px] mx-auto font-medium font-sans tracking-[0.02em] text-[#EAEAEA] mt-8 px-4 md:px-0">
                Before the main TEDx experience, we bring the community together
                through engaging pre-events. From workshops and panel
                discussions to interactive meetups, these sessions are designed
                to ignite conversations, foster collaboration, and build
                momentum leading up to the main event.
              </p>
              <div className="mt-6">
                <TedxButton />
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-screen flex items-center pointer-events-auto px-6 md:px-12">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-glow">
                Rewind
              </h2>
              <div className="w-24 h-[1px] bg-[#D3D3D3] shadow-[0_0_10px_rgba(230,230,230,230)] mt-4" />
              <p className="text-center text-[16px] md:text-[24px] leading-[1.7] max-w-[460px] mx-auto font-medium font-sans tracking-[0.02em] text-[#EAEAEA] mt-8 px-4 md:px-0">
                Rewind is a podcast that explores the intersection of technology
                and society. From discussions on the latest trends to in-depth
                analysis of emerging technologies, Rewind offers a unique
                perspective on the future of our world.
              </p>
              <div className="mt-6">
                <TedxButton />
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-screen flex items-center pointer-events-auto px-6 md:px-12">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-glow">
                About
              </h2>
              <div className="w-24 h-[1px] bg-[#D3D3D3] shadow-[0_0_10px_rgba(230,230,230,230)] mt-4" />
              <p className="text-center text-[16px] md:text-[24px] leading-[1.7] max-w-[480px] mx-auto font-sans font-medium tracking-[0.02em] text-[#EAEAEA] mt-8 px-4 md:px-0">
                TEDx is a global movement dedicated to sharing ideas that
                matter. <br />
                TEDxNIIT University is an independently organized event driven
                by a passionate team committed to creating a platform where
                ideas, innovation, and dialogue thrive within our community.
              </p>
              <div className="mt-6">
                <TedxButton />
              </div>
            </div>
          </div>
        </section>
        <section className="min-h-screen flex items-center pointer-events-auto px-6 md:px-12">
          <div className="max-w-xl mx-auto md:ml-auto md:mr-0 text-center">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-bold text-white text-glow">
                Sponsors
              </h2>
              <div className="w-36 h-[1px] bg-[#D3D3D3] shadow-[0_0_10px_rgba(230,230,230,230)] mt-4" />
              <p className="text-center text-[16px] md:text-[24px] leading-[1.7] max-w-[480px] mx-auto font-medium font-sans tracking-[0.02em] text-[#EAEAEA] mt-8 px-4 md:px-0">
                Our sponsors make ideas possible. We are grateful to the
                organizations and partners who support our vision and help bring
                TEDxNIITUniversity to life. Their collaboration enables us to
                create an experience that inspires, educates, and connects.
              </p>
              <div className="mt-6">
                <TedxButton />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div style={{ height: "600vh" }} />
      <FluidGlass />
    </main>
  );
}
