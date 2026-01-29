"use client";
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 sm:bottom-12 right-3 sm:right-4 md:right-6 p-2 sm:p-3 border-2 border-primary rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary-hover hover:border-primary-hover hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
          aria-label="Scroll to top"
          title="Scroll to top">
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
