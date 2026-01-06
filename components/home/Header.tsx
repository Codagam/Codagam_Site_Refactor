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

// Constants
const NAV_ITEMS = [
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  { id: "stack", label: "Tech Stack" },
  { id: "contact", label: "Contact" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

// Helper function to get header height based on viewport width
const getHeaderHeight = (): number => {
  if (typeof window === "undefined") return 48;
  if (window.innerWidth >= 1280) return 68;
  if (window.innerWidth >= 1024) return 64;
  if (window.innerWidth >= 640) return 56;
  return 48;
};

// Desktop Nav Link Component
const DesktopNavLink = ({
  id,
  label,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a
    href={`#${id}`}
    onClick={onClick}
    className={`relative text-sm lg:text-base xl:text-base 2xl:text-lg font-medium transition-all duration-300 whitespace-nowrap group ${
      isActive
        ? "text-blue-900 font-semibold"
        : "text-slate-700 hover:text-blue-900"
    }`}>
    {label}
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 transition-all duration-300 ${
        isActive
          ? "opacity-100 scale-x-100"
          : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100"
      }`}
    />
  </a>
);

// Mobile Nav Link Component
const MobileNavLink = ({
  id,
  label,
  isActive,
  onClick,
  animationDelay,
  shouldAnimate,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  animationDelay: string;
  shouldAnimate: boolean;
}) => (
  <a
    href={`#${id}`}
    onClick={onClick}
    className={`relative text-base sm:text-lg md:text-lg font-medium transition-all duration-300 py-3 px-4 rounded-lg flex items-center mobile-menu-link ${
      shouldAnimate ? "animate-slide-in-right" : ""
    } ${
      isActive
        ? "text-blue-900 font-semibold bg-blue-50 shadow-sm scale-[1.02]"
        : "text-slate-700 hover:text-blue-900 hover:bg-slate-50"
    }`}
    style={{ animationDelay: shouldAnimate ? animationDelay : "0s" }}>
    {isActive && (
      <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-900 rounded-r-full" />
    )}
    {label}
  </a>
);

export default function Header() {
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

    const sectionElements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sectionElements.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let maxRatio = 0;
      let activeId = "";

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });

      if (maxRatio > 0.1) {
        setActiveSection(activeId);
        return;
      }

      // Fallback: find closest section to viewport top
      const headerHeight = getHeaderHeight();
      let closestSection = "";
      let minDistance = Infinity;

      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - headerHeight - 50);

        if (rect.top <= headerHeight + 100 && distance < minDistance) {
          minDistance = distance;
          closestSection = section.id;
        }
      });

      if (closestSection) {
        setActiveSection(closestSection);
      } else if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
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

  // Scroll to section handler
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerHeight = getHeaderHeight();
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight - 8;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setIsOpen(false);
  }, []);

  // Link click handler
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      scrollToSection(id);
    },
    [scrollToSection]
  );

  // Scroll to top handler
  const handleScrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, []);

  // Memoized navigation items
  const desktopNavItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => (
        <DesktopNavLink
          key={item.id}
          id={item.id}
          label={item.label}
          isActive={activeSection === item.id}
          onClick={(e) => handleLinkClick(e, item.id)}
        />
      )),
    [activeSection, handleLinkClick]
  );

  const mobileNavItems = useMemo(
    () =>
      NAV_ITEMS.map((item, index) => (
        <MobileNavLink
          key={item.id}
          id={item.id}
          label={item.label}
          isActive={activeSection === item.id}
          onClick={(e) => handleLinkClick(e, item.id)}
          animationDelay={`${(index + 1) * 0.1}s`}
          shouldAnimate={shouldAnimate}
        />
      )),
    [activeSection, handleLinkClick, shouldAnimate]
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full">
        <div className="flex justify-between items-center h-[48px] min-[375px]:h-[52px] sm:h-[56px] md:h-[60px] lg:h-[64px] xl:h-[68px] 2xl:h-[72px] w-full">
          {/* Logo */}
          <Link
            href="/"
            onClick={handleScrollToTop}
            className="text-sm min-[375px]:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-blue-900 tracking-tight hover:opacity-80 transition-opacity cursor-pointer shrink-0">
            Codagam
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-4 xl:gap-5 2xl:gap-6 items-center shrink-0">
            {desktopNavItems}
          </nav>

          {/* Get Started Button */}
          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:flex bg-blue-900 hover:bg-blue-800 text-white text-xs lg:text-sm xl:text-sm 2xl:text-sm px-3 lg:px-4 xl:px-4 2xl:px-5 py-1.5 lg:py-2 xl:py-2 shrink-0 whitespace-nowrap">
            Get Started
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
                <nav className="flex flex-col space-y-2 mt-8">{mobileNavItems}</nav>
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
