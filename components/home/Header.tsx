"use client";

import { useState, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure Sheet is fully rendered before animating links
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
      <div className="max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-[48px] min-[375px]:h-[52px] sm:h-[56px] lg:h-[64px] xl:h-[68px] w-full">
          <div className="text-base min-[375px]:text-lg sm:text-xl lg:text-2xl xl:text-2xl font-bold text-blue-900 tracking-tight">
            Codagam
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-3 md:gap-4 xl:gap-5 items-center">
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, "services")}
              className="text-xs min-[375px]:text-xs lg:text-sm xl:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors">
              Services
            </a>
            <a
              href="#products"
              onClick={(e) => handleLinkClick(e, "products")}
              className="text-xs min-[375px]:text-xs lg:text-sm xl:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors">
              Products
            </a>
            <a
              href="#stack"
              onClick={(e) => handleLinkClick(e, "stack")}
              className="text-xs min-[375px]:text-xs lg:text-sm xl:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors">
              Tech Stack
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "contact")}
              className="text-xs min-[375px]:text-xs lg:text-sm xl:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors">
              Contact
            </a>
          </nav>

          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:flex bg-blue-900 hover:bg-blue-800 text-white text-xs min-[375px]:text-xs lg:text-sm xl:text-sm px-2 md:px-3 lg:px-4 xl:px-5 py-1.5">
            Get Started
          </Button>

          {/* Mobile Menu Button with Sheet */}
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
              className="w-[280px] sm:w-[350px] md:w-[400px] bg-white">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-3 text-left">
                  <span className="text-lg min-[375px]:text-xl sm:text-2xl font-bold text-blue-900 tracking-tight">
                    Codagam
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 mt-8">
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, "services")}
                  className={`text-sm sm:text-base font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-2 px-2 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
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
                  className={`text-sm sm:text-base font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-2 px-2 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
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
                  className={`text-sm sm:text-base font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-2 px-2 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
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
                  className={`text-sm sm:text-base font-medium text-slate-700 hover:text-blue-900 transition-all duration-300 py-2 px-2 rounded-md hover:bg-slate-50 flex items-center mobile-menu-link ${
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
        </div>
      </div>
    </header>
  );
}
