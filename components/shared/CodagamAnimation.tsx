"use client";

import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";

const CodagamAnimation = () => {
  const [redirectSeconds] = useState(3300);
  const router = useRouter();
  const words: string[] = ["கோடகம்", "Codagam"];

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, redirectSeconds);
    return () => clearTimeout(timer);
  }, [redirectSeconds, router]);

  return (
    <span className="text-5xl font-bold text-primary dark:text-primary">
      <Typewriter
        words={words}
        loop={1}
        cursor
        cursorStyle="|"
        typeSpeed={90}
        deleteSpeed={60}
        delaySpeed={600}
      />
    </span>
  );
};

export default CodagamAnimation;
