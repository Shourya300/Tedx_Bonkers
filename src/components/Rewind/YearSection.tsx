"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { yearContent } from "@/data/rewindData";

interface YearSectionProps {
  year: number;
  data: (typeof yearContent)[number];
  onInView: (year: number) => void;
  imageRef?: React.RefObject<HTMLDivElement>;
}

const YearSection = ({ year, data, onInView, imageRef }: YearSectionProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      onInView(year);
    }
  }, [isInView, year, onInView]);

  return (
    <section
      id={`year-section-${year}`}
      ref={ref}
      className="min-h-[100svh] py-24 relative border-b border-white/5 z-10"
    >
      <div className="w-full px-4 relative md:container md:mx-auto relative md:ml-20 flex flex-col items-center md:block md:items-start">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-end mb-16 w-full">
          <div
            ref={imageRef}
            className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden border-2 border-cyan-500/20 shadow-2xl group"
          >
            <Image
              src={data.themeImage}
              alt={data.theme}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={data.themeImage.startsWith("http")}
              className="object-cover transition-transform duration-700 group-hover:scale-105 scale-[var(--theme-scale)]"
              style={
                {
                  "--theme-scale": data.themeImageScale || 1,
                } as React.CSSProperties
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-2">
                {year}
              </h2>
              <h3 className="text-2xl md:text-3xl text-cyan-400 font-light">
                {data.theme}
              </h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 pb-6">
            <p className="text-xl md:text-2xl text-cyan-100/80 italic border-l-4 border-cyan-500 pl-6">
              &ldquo;{data.description}&rdquo;
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 place-items-center md:place-items-start">
          {data.speakers.map((speaker, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group w-[280px] flex flex-col items-center md:items-start !mx-auto md:mx-0"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 768px) 280px, 33vw"
                  unoptimized={speaker.image.startsWith("http")}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    objectPosition: speaker.imagePosition || "center",
                  }}
                />
              </div>

              <div className="text-center md:text-left">
                <h4 className="font-bold text-white text-xl mb-1">
                  {speaker.name}
                </h4>
                <p className="text-cyan-400 text-sm mb-2">{speaker.topic}</p>
                {speaker.tedTalkUrl && (
                  <a
                    href={speaker.tedTalkUrl}
                    target="_blank"
                    className="text-sm text-gray-400 hover:text-white underline underline-offset-4 decoration-cyan-500/50 hover:decoration-cyan-400 transition-colors"
                  >
                    Watch Talk &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YearSection;
