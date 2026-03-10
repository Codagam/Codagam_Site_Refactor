"use client";

import { useState, useEffect } from "react";

const SECTORS = [
  "Aviation",
  "Healthcare",
  "Hospitality",
  "Finance",
  "Logistics",
  "Government",
  "Education",
  "Retail",
];

export function PoweredStrip() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setHidden(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="poweredStrip"
      className={`fixed bottom-0 left-0 right-0 z-10 py-3 sm:py-4 px-4 sm:px-[5vw] bg-linear-to-t from-[rgba(10,18,69,.9)] to-transparent flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap pointer-events-none transition-opacity duration-500 opacity-0 animate-[rise_.8s_1.2s_forwards] min-w-0 overflow-x-hidden ${
        hidden ? "opacity-0!" : ""
      }`}
    >
      <span className="text-[.63rem] uppercase tracking-[.12em] text-white/[.28] whitespace-nowrap flex items-center gap-2.5 after:content-[''] after:block after:w-px after:h-3 after:bg-white/10">
        Powering
      </span>
      <div className="flex gap-2 flex-wrap">
        {SECTORS.map((s) => (
          <span
            key={s}
            className="text-[.68rem] text-white/40 flex items-center gap-1 before:content-[''] before:w-[3px] before:h-[3px] before:rounded-full before:bg-(--acc2) before:opacity-55"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
