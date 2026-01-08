"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The direction of the marquee animation
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Whether to pause the marquee on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * The speed of the marquee animation in seconds
   * @default 20
   */
  speed?: number;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to duplicate children for seamless scrolling
   * @default true
   */
  duplicate?: boolean;
  /**
   * The children to display in the marquee
   */
  children?: React.ReactNode;
}

export function Marquee({
  className,
  children,
  direction = "left",
  pauseOnHover = false,
  speed = 20,
  reverse = false,
  duplicate = true,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group relative w-full overflow-hidden",
        className
      )}
      style={
        {
          "--speed": `${speed}s`,
          "--gap": "1rem",
        } as React.CSSProperties
      }>
      <div className="flex w-max">
        <div
          className={cn(
            "flex shrink-0 flex-nowrap items-center gap-[var(--gap)]",
            direction === "left" && "animate-marquee-left",
            direction === "right" && "animate-marquee-right",
            reverse && "direction-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}>
          {children}
        </div>
        {duplicate && (
          <div
            className={cn(
              "flex shrink-0 flex-nowrap items-center gap-[var(--gap)]",
              direction === "left" && "animate-marquee-left",
              direction === "right" && "animate-marquee-right",
              reverse && "direction-reverse",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}
            aria-hidden="true">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
