"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FILTER_TAGS,
  yearContent,
  getAllSpeakers,
  speakerMatchesTag,
  FlatSpeaker,
} from "@/data/rewindData";

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSpeakers = useMemo(() => getAllSpeakers(), []);
  const allYears = useMemo(
    () =>
      Object.keys(yearContent)
        .map(Number)
        .sort((a, b) => b - a),
    [],
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSelectedTags([]);
      setSelectedYears([]);
    }
  }, [isOpen]);

  const toggleTag = (tagLabel: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagLabel)
        ? prev.filter((t) => t !== tagLabel)
        : [...prev, tagLabel],
    );
  };

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  const filteredSpeakers = useMemo(() => {
    let results = allSpeakers;

    if (selectedYears.length > 0) {
      results = results.filter((s) => selectedYears.includes(s.year));
    }

    if (selectedTags.length > 0) {
      results = results.filter((speaker) => {
        const matchingTags = FILTER_TAGS.filter((tag) =>
          selectedTags.includes(tag.label),
        );
        return matchingTags.some((tag) => speakerMatchesTag(speaker, tag));
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.topic.toLowerCase().includes(q) ||
          s.theme.toLowerCase().includes(q) ||
          s.year.toString().includes(q),
      );
    }

    return results;
  }, [allSpeakers, searchQuery, selectedTags, selectedYears]);

  const hasActiveFilters =
    searchQuery.trim() || selectedTags.length > 0 || selectedYears.length > 0;

  const clearAll = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedYears([]);
  };

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FILTER_TAGS.forEach((tag) => {
      let pool = allSpeakers;
      if (selectedYears.length > 0) {
        pool = pool.filter((s) => selectedYears.includes(s.year));
      }
      counts[tag.label] = pool.filter((s) => speakerMatchesTag(s, tag)).length;
    });
    return counts;
  }, [allSpeakers, selectedYears]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 top-[15vh] bottom-[15vh] sm:inset-x-8 sm:top-8 sm:bottom-8 md:inset-x-[18%] md:top-[12%] md:bottom-[12%] lg:inset-x-[22%] bg-neutral-950 border border-white/[0.08] rounded-2xl z-[101] flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex-shrink-0 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 space-y-3">
              <div className="relative flex items-center">
                <svg
                  className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search speakers..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-16 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
                />
                <div className="absolute right-3 flex items-center gap-2">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-600 hover:text-gray-400 transition-colors text-xs p-1"
                    >
                      ✕
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] text-gray-600 bg-white/[0.04] border border-white/[0.08] rounded font-mono uppercase">
                    ESC
                  </kbd>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium shrink-0 mr-0.5">
                    Year
                  </span>
                  <div className="flex overflow-x-auto gap-1.5 no-scrollbar -mr-4 pr-4 sm:mr-0 sm:pr-0 sm:flex-wrap">
                    {allYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => toggleYear(year)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          selectedYears.includes(year)
                            ? "bg-white text-black"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-600 uppercase tracking-widest font-medium shrink-0 mr-0.5">
                    Topic
                  </span>
                  <div className="flex overflow-x-auto gap-1.5 no-scrollbar -mr-4 pr-4 sm:mr-0 sm:pr-0 sm:flex-wrap">
                    {FILTER_TAGS.map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => toggleTag(tag.label)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 ${
                          selectedTags.includes(tag.label)
                            ? "bg-white text-black"
                            : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="text-xs">{tag.icon}</span>
                        {tag.label}
                        <span
                          className={`text-[10px] ${
                            selectedTags.includes(tag.label)
                              ? "text-black/50"
                              : "text-gray-700"
                          }`}
                        >
                          {tagCounts[tag.label]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                  <p className="text-xs text-gray-500">
                    <span className="text-white font-medium">
                      {filteredSpeakers.length}
                    </span>{" "}
                    result{filteredSpeakers.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {!hasActiveFilters ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600 px-6">
                  <p className="text-sm">Type to search or use filters above</p>
                  <p className="text-xs mt-1 text-gray-700">
                    {allSpeakers.length} speakers · {allYears.length} years
                  </p>
                </div>
              ) : filteredSpeakers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600 px-6">
                  <p className="text-sm">No results found</p>
                  <p className="text-xs mt-1 text-gray-700">
                    Try different filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {filteredSpeakers.map((speaker, idx) => {
                    const matchedTags = FILTER_TAGS.filter((tag) =>
                      speakerMatchesTag(speaker, tag),
                    );

                    return (
                      <motion.div
                        key={`${speaker.year}-${speaker.name}-${idx}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(idx * 0.02, 0.2) }}
                        className="group"
                      >
                        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-white/[0.03] mb-2">
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            fill
                            sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 18vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{
                              objectPosition: speaker.imagePosition || "center",
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="absolute top-1.5 right-1.5 text-[9px] sm:text-[10px] font-mono text-white/70 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded">
                            {speaker.year}
                          </span>
                          {speaker.tedTalkUrl && (
                            <a
                              href={speaker.tedTalkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-1.5 right-1.5 text-[10px] sm:text-[11px] text-white/80 bg-black/50 backdrop-blur-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                            >
                              Watch →
                            </a>
                          )}
                        </div>

                        <div className="px-0.5">
                          <h4 className="font-medium text-white text-xs sm:text-sm leading-tight truncate">
                            {speaker.name}
                          </h4>
                          <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 truncate">
                            {speaker.topic}
                          </p>
                          {matchedTags.length > 0 && (
                            <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
                              {matchedTags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag.label}
                                  className="text-[9px] sm:text-[10px] text-gray-600"
                                >
                                  {tag.icon}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center rounded-full sm:rounded-md text-white/70 bg-white/10 sm:bg-transparent sm:text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-colors text-lg sm:text-sm z-[110]"
              aria-label="Close search"
            >
              ✕
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchPanel;
