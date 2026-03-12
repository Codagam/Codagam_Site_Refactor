"use client";

import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";

interface CodagamAnimationProps {
  /** When true, only show the typewriter animation without redirecting to /home */
  skipRedirect?: boolean;
  /** Called when the typewriter animation completes (after loop finishes) */
  onComplete?: () => void;
}

const CodagamAnimation = ({ skipRedirect = false, onComplete }: CodagamAnimationProps) => {
  const [redirectSeconds] = useState(3300);
  const router = useRouter();
  const words: string[] = ["கோடகம்", "Codagam™"];

  const handleLoopDone = () => {
    onComplete?.();
  };

  useEffect(() => {
    if (skipRedirect) return;
    const timer = setTimeout(() => {
      router.push("/home");
    }, redirectSeconds);
    return () => clearTimeout(timer);
  }, [skipRedirect, redirectSeconds, router]);

  return (
    <span className="text-5xl font-bold text-white">
      <Typewriter
        words={words}
        loop={1}
        cursor
        cursorStyle="|"
        typeSpeed={90}
        deleteSpeed={60}
        delaySpeed={600}
        onLoopDone={handleLoopDone}
      />
    </span>
  );
};

export default CodagamAnimation;
