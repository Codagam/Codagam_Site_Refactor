"use client";

import { useEffect } from "react";

const getHeaderHeight = (): number => {
  if (typeof window === "undefined") return 44;
  if (window.innerWidth >= 1280) return 60;
  if (window.innerWidth >= 1024) return 56;
  if (window.innerWidth >= 640) return 52;
  return 44;
};

export default function ScrollToHash() {
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;

    const scroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        const headerHeight = getHeaderHeight();
        const gapBelowNav = 4;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - gapBelowNav;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    };

    const t = requestAnimationFrame(() => {
      scroll();
    });
    const t2 = setTimeout(scroll, 150);
    return () => {
      cancelAnimationFrame(t);
      clearTimeout(t2);
    };
  }, []);

  return null;
}
