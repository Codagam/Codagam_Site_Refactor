"use client";

import { useRef } from "react";
import { CanvasBackground } from "@/components/shared/CanvasBackground";

type HeroCanvasVariant = "desktop" | "mobile";

/**
 * Hero canvas:
 * - desktop: absolute right side, full height (sm+). Left/right layout from 640px.
 * - mobile: in-flow below hero content, centered (default only); hidden from sm.
 */
export default function HeroCanvasWrapper({
  variant = "desktop",
}: {
  variant?: HeroCanvasVariant;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isDesktop = variant === "desktop";

  return (
    <div
      ref={containerRef}
      className={
        isDesktop
          ? "hidden sm:block absolute right-0 top-0 bottom-0 w-[48%] sm:w-[48%] md:w-[50%] lg:w-[52%] xl:w-[56%] z-0 min-h-0 bg-(--bg-deep)"
          : "sm:hidden relative w-full shrink-0 min-h-[35vh] min-w-0 mx-auto z-0 bg-(--bg-deep)"
      }
      aria-hidden
    >
      <CanvasBackground containerRef={containerRef} />
    </div>
  );
}
