"use client";

import { useRef } from "react";
import { CanvasBackground } from "@/components/shared/CanvasBackground";

/**
 * Renders the hero canvas only on lg+ screens (laptop, desktop).
 * On mobile and tablet the canvas is hidden; only the left hero content is shown.
 */
export default function HeroCanvasWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block fixed top-0 right-0 w-[56%] min-h-[100dvh] h-dvh z-0"
      aria-hidden
    >
      <CanvasBackground containerRef={containerRef} />
    </div>
  );
}
