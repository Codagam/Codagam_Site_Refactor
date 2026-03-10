"use client";

import { useRef } from "react";
import { CanvasBackground } from "@/components/shared/CanvasBackground";

/**
 * Hero canvas visible on all screens (sm, md, lg).
 * - Fills full hero area on mobile/tablet (absolute inset-0).
 * - md+: right half only so left content stays readable; same visual style as hero bg.
 */
export default function HeroCanvasWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 top-0 left-0 right-0 bottom-0 w-full h-full min-h-full min-w-0 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-[50%] lg:w-[52%] xl:w-[56%] z-0"
      aria-hidden
    >
      <CanvasBackground containerRef={containerRef} />
    </div>
  );
}
