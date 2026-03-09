"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavLinks from "./NavLinks";

// Constants
const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Tech Stack" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

// Helper function to get header height based on viewport width
const getHeaderHeight = (): number => {
  if (typeof window === "undefined") return 44;
  if (window.innerWidth >= 1280) return 60;
  if (window.innerWidth >= 1024) return 56;
  if (window.innerWidth >= 640) return 52;
  return 44;
};

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Initialize mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Codagam theme: scrolled state for nav background (FULL-WEBSITE-REBUILD-PROMPT §5)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle mobile menu animation
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShouldAnimate(true), 50);
      return () => {
        clearTimeout(timer);
        setShouldAnimate(false);
      };
    } else {
      const timer = setTimeout(() => setShouldAnimate(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Intersection Observer for active section detection
  useEffect(() => {
    if (!mounted) return;

    const sectionElements = SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-10% 0px -70% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const headerHeight = getHeaderHeight();
      let bestSection = "";
      let bestScore = -1;

      // First, check which sections are intersecting
      const intersectingSections: Array<{
        id: string;
        ratio: number;
        top: number;
        bottom: number;
      }> = [];

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const top = rect.top;
          const bottom = rect.bottom;
          const viewportHeight = window.innerHeight;

          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, top);
          const visibleBottom = Math.min(viewportHeight, bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const sectionHeight = rect.height;
          const visibleRatio =
            sectionHeight > 0 ? visibleHeight / sectionHeight : 0;

          // Calculate score: prioritize sections that are:
          // 1. Close to the top of the viewport (after header)
          // 2. Have significant visibility
          const distanceFromTop = Math.max(0, top - headerHeight);
          const score = visibleRatio * 100 - distanceFromTop * 0.1;

          intersectingSections.push({
            id: entry.target.id,
            ratio: visibleRatio,
            top: top,
            bottom: bottom,
          });

          if (score > bestScore && visibleRatio > 0.1) {
            bestScore = score;
            bestSection = entry.target.id;
          }
        }
      });

      // If we found a good intersecting section, use it
      if (bestSection) {
        setActiveSection(bestSection);
        return;
      }

      // Fallback: find the section whose top is closest to the header
      let closestSection = "";
      let minDistance = Infinity;

      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const top = rect.top;
        const bottom = rect.bottom;

        // Check if section is in viewport
        if (top < window.innerHeight && bottom > headerHeight) {
          const distance = Math.abs(top - headerHeight - 20);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section.id;
          }
        }
      });

      if (closestSection) {
        setActiveSection(closestSection);
      } else if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    sectionElements.forEach((section) => observer.observe(section));

    // Initial section check
    const checkInitialSection = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      const headerHeight = getHeaderHeight();
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= headerHeight + 100 &&
          rect.bottom >= headerHeight + 100
        ) {
          setActiveSection(section.id);
        }
      });
    };

    const timeoutId = setTimeout(checkInitialSection, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [mounted]);

  // Scroll to top handler
  const handleScrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, []);

  // Handler to close mobile menu when navigating
  const handleMobileNavigate = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handler to scroll to contact section
  const handleContactClick = useCallback(() => {
    const element = document.getElementById("contact");
    if (element) {
      const headerHeight = getHeaderHeight();
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 8;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  }, []);

  // Check if section is active
  const isActive = useCallback(
    (id: string) => activeSection === id,
    [activeSection]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 w-full transition-[background-color,border-color] duration-400 ${
        scrolled
          ? "bg-[rgba(10,18,69,.94)] backdrop-blur-[20px] border-b border-(--border)"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-[5vw] py-3 flex justify-between items-center">
        {/* Logo - Codagam theme: serif + acc2 span */}
        <Link
          href="/"
          onClick={handleScrollToTop}
          className="font-(--font-serif) text-xl text-white tracking-tight hover:opacity-90 transition-opacity cursor-pointer shrink-0 [&_span]:text-(--acc2)"
        >
          Coda<span>gam</span>
        </Link>

        {/* Desktop Navigation - theme link styles */}
        <nav className="hidden lg:flex gap-1 items-center shrink-0">
          <NavLinks variant="desktop" isActive={isActive} />
        </nav>

        {/* Desktop CTA - "Book a call →" theme (FULL-WEBSITE-REBUILD-PROMPT §5) */}
        <Button
          onClick={() => {
            const element = document.getElementById("contact");
            if (element) {
              const headerHeight = getHeaderHeight();
              const elementPosition =
                element.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - headerHeight - 8;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }}
          className="group hidden lg:flex ml-2 bg-blue-100 text-gray-900 border border-blue-200 py-1.5 px-2.5 rounded text-[.8rem] font-medium hover:bg-white transition-colors shrink-0 whitespace-nowrap"
        >
          Book a call
          <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Button>

          {/* Mobile Menu */}
          {mounted ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 text-white hover:bg-white/[.07] rounded"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[350px] md:w-[400px] bg-(--bg-deep) border-(--border)"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-3 text-left">
                    <Link
                      href="/"
                      onClick={handleScrollToTop}
                      className="font-(--font-serif) text-xl text-white [&_span]:text-(--acc2)"
                    >
                      Coda<span>gam</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2 mt-8">
                  <NavLinks
                    variant="mobile"
                    isActive={isActive}
                    onNavigate={handleMobileNavigate}
                    shouldAnimate={shouldAnimate}
                  />
                  <Button
                    onClick={handleContactClick}
                    className={`group mt-4 w-full font-(--font-sans)! text-base! bg-blue-100 text-gray-900 py-2.5 px-6 rounded hover:bg-white mobile-menu-link ${
                      shouldAnimate ? "animate-slide-in-right" : ""
                    }`}
                    style={{
                      animationDelay: shouldAnimate
                        ? `${(NAV_ITEMS.length + 1) * 0.1}s`
                        : "0s",
                    }}
                  >
                    Book a call
                    <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 text-white hover:bg-white/[.07] rounded"
              aria-label="Toggle menu"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
            </Button>
          )}
      </div>
    </header>
  );
}
