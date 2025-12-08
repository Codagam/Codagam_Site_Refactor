"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 shadow-sm w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 min-[375px]:px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-[56px] min-[375px]:h-[60px] sm:h-[70px] w-full">
          <div className="text-lg min-[375px]:text-xl sm:text-2xl font-semibold text-blue-900 tracking-tight">
            Codagam
          </div>
          <nav
            className={cn(
              "hidden lg:flex gap-4 md:gap-6 xl:gap-8 items-center",
              menuOpen &&
                "flex absolute top-[56px] min-[375px]:top-[60px] sm:top-[70px] left-0 right-0 bg-white flex-col p-4 sm:p-5 border-b border-slate-200 shadow-md lg:relative lg:top-0 lg:border-0 lg:shadow-none lg:flex-row w-full lg:w-auto"
            )}>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("services");
              }}
              className="text-xs min-[375px]:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors py-2 lg:py-0">
              Services
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products");
              }}
              className="text-xs min-[375px]:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors py-2 lg:py-0">
              Products
            </a>
            <a
              href="#stack"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("stack");
              }}
              className="text-xs min-[375px]:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors py-2 lg:py-0">
              Tech Stack
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="text-xs min-[375px]:text-sm font-medium text-slate-700 hover:text-blue-900 transition-colors py-2 lg:py-0">
              Contact
            </a>
          </nav>
          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:flex bg-blue-900 hover:bg-blue-800 text-white text-xs min-[375px]:text-sm px-3 md:px-4 xl:px-6">
            Get Started
          </Button>
          <button
            className="lg:hidden text-xl min-[375px]:text-2xl cursor-pointer text-blue-900 bg-transparent border-none p-1.5 min-[375px]:p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
