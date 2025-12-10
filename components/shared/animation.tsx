"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: "fade-in" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom-in";
  delayMs?: number;
  durationMs?: number;
  className?: string;
}

export default function SectionReveal({
  children,
  variant = "fade-in",
  delayMs = 0,
  durationMs = 700,
  className,
}: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delayMs);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delayMs, ref]);

  const variantClasses = {
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "slide-up": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8",
    "slide-down": isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-8",
    "slide-left": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8",
    "slide-right": isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-8",
    "zoom-in": isVisible
      ? "opacity-100 scale-100"
      : "opacity-0 scale-95",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        variantClasses[variant],
        className
      )}
      style={{
        transitionDuration: `${durationMs}ms`,
      }}
    >
      {children}
    </div>
  );
}

