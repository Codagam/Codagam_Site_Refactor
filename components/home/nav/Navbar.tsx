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
  { id: "products", label: "Products" },
  { id: "stack", label: "Tech Stack" },
  { id: "case-studies", label: "Case Studies" },
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

  // Initialize mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

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
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full bg-white">
        <div className="flex justify-between items-center h-[44px] min-[375px]:h-[48px] sm:h-[52px] md:h-[54px] lg:h-[56px] xl:h-[60px] 2xl:h-[64px] w-full">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleScrollToTop}
            className="text-sm min-[375px]:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-bold text-blue-900 tracking-tight hover:opacity-80 transition-opacity cursor-pointer shrink-0">
            Codagam
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-3 xl:gap-4 2xl:gap-5 items-center shrink-0">
            <NavLinks variant="desktop" isActive={isActive} />
          </nav>

          {/* Get Started Button */}
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
            className="hidden lg:flex bg-blue-900 hover:bg-blue-800 text-white text-xs lg:text-sm xl:text-sm 2xl:text-sm px-3 lg:px-4 xl:px-4 2xl:px-5 py-1.5 lg:py-2 xl:py-2 shrink-0 whitespace-nowrap">
            Contact
          </Button>

          {/* Mobile Menu */}
          {mounted ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden transition-colors duration-300 h-9 w-9 sm:h-10 sm:w-10 text-blue-900 hover:bg-slate-100"
                  aria-label="Toggle menu">
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] min-[375px]:w-[320px] sm:w-[350px] md:w-[400px] bg-white">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-3 text-left">
                    <Link
                      href="/"
                      onClick={handleScrollToTop}
                      className="text-lg min-[375px]:text-xl sm:text-2xl md:text-2xl font-bold text-blue-900 tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
                      Codagam
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
                    className={`mt-4 w-full bg-blue-900 hover:bg-blue-800 text-white text-base font-medium py-3 px-4 rounded-lg mobile-menu-link ${
                      shouldAnimate ? "animate-slide-in-right" : ""
                    }`}
                    style={{
                      animationDelay: shouldAnimate
                        ? `${(NAV_ITEMS.length + 1) * 0.1}s`
                        : "0s",
                    }}>
                    Contact
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden transition-colors duration-300 h-9 w-9 sm:h-10 sm:w-10 text-blue-900 hover:bg-slate-100"
              aria-label="Toggle menu"
              onClick={() => setIsOpen(true)}>
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.5]" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
