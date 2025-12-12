"use client";

import { useState, useEffect } from "react";
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

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure Sheet is fully rendered before animating links
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 50);
      return () => {
        clearTimeout(timer);
        setShouldAnimate(false);
      };
    } else {
      // Reset animation state when sheet closes
      const timer = setTimeout(() => {
        setShouldAnimate(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight =
        window.innerWidth >= 1280
          ? 68
          : window.innerWidth >= 1024
          ? 64
          : window.innerWidth >= 640
          ? 56
          : 48;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 8; // 8px extra spacing

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full">
        <div className="flex justify-between items-center h-[48px] min-[375px]:h-[52px] sm:h-[56px] md:h-[60px] lg:h-[64px] xl:h-[68px] 2xl:h-[72px] w-full">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm min-[375px]:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-blue-900 tracking-tight hover:opacity-80 transition-opacity cursor-pointer shrink-0">
            Codagam
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-4 xl:gap-5 2xl:gap-6 items-center shrink-0">
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, "services")}
              className="text-sm lg:text-base xl:text-base 2xl:text-lg font-medium text-slate-700 hover:text-blue-900 transition-colors whitespace-nowrap">
              Services
            </a>
            <a
              href="#products"
              onClick={(e) => handleLinkClick(e, "products")}
              className="text-sm lg:text-base xl:text-base 2xl:text-lg font-medium text-slate-700 hover:text-blue-900 transition-colors whitespace-nowrap">
              Products
            </a>
            <a
              href="#stack"
              onClick={(e) => handleLinkClick(e, "stack")}
              className="text-sm lg:text-base xl:text-base 2xl:text-lg font-medium text-slate-700 hover:text-blue-900 transition-colors whitespace-nowrap">
              Tech Stack
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "contact")}
              className="text-sm lg:text-base xl:text-base 2xl:text-lg font-medium text-slate-700 hover:text-blue-900 transition-colors whitespace-nowrap">
              Contact
            </a>
          </nav>

          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:flex bg-blue-900 hover:bg-blue-800 text-white text-sm lg:text-base xl:text-base 2xl:text-lg px-4 lg:px-5 xl:px-6 2xl:px-7 py-2 lg:py-2.5 xl:py-3 shrink-0 whitespace-nowrap">
            Get Started
          </Button>

          {/* Mobile Menu Button with Sheet */}
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
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-lg min-[375px]:text-xl sm:text-2xl md:text-2xl font-bold text-blue-900 tracking-tight hover:opacity-80 transition-opacity cursor-pointer">
                      Codagam
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2 mt-8">
                  <a
                    href="#services"
                    onClick={(e) => handleLinkClick(e, "services")}
                    className={`text-base sm:text-lg md:text-lg font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-3 px-3 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
                      shouldAnimate ? "animate-slide-in-right" : ""
                    }`}
                    style={{
                      animationDelay: shouldAnimate ? "0.1s" : "0s",
                    }}>
                    Services
                  </a>
                  <a
                    href="#products"
                    onClick={(e) => handleLinkClick(e, "products")}
                    className={`text-base sm:text-lg md:text-lg font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-3 px-3 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
                      shouldAnimate ? "animate-slide-in-right" : ""
                    }`}
                    style={{
                      animationDelay: shouldAnimate ? "0.2s" : "0s",
                    }}>
                    Products
                  </a>
                  <a
                    href="#stack"
                    onClick={(e) => handleLinkClick(e, "stack")}
                    className={`text-base sm:text-lg md:text-lg font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-3 px-3 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
                      shouldAnimate ? "animate-slide-in-right" : ""
                    }`}
                    style={{
                      animationDelay: shouldAnimate ? "0.3s" : "0s",
                    }}>
                    Tech Stack
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, "contact")}
                    className={`text-base sm:text-lg md:text-lg font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-3 px-3 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
                      shouldAnimate ? "animate-slide-in-right" : ""
                    }`}
                    style={{
                      animationDelay: shouldAnimate ? "0.4s" : "0s",
                    }}>
                    Contact
                  </a>
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
