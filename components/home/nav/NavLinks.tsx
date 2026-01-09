"use client";

import React, { useCallback } from "react";

interface NavLinksProps {
  onNavigate?: () => void;
  isActive?: (id: string) => boolean;
  variant?: "desktop" | "mobile";
  shouldAnimate?: boolean;
}

// Helper function to get header height based on viewport width
const getHeaderHeight = (): number => {
  if (typeof window === "undefined") return 44;
  if (window.innerWidth >= 1280) return 60;
  if (window.innerWidth >= 1024) return 56;
  if (window.innerWidth >= 640) return 52;
  return 44;
};

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  { id: "stack", label: "Tech Stack" },
  { id: "case-studies", label: "Case Studies" },
] as const;

// Scroll to section handler
const scrollToSection = (id: string, onNavigate?: () => void) => {
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
  onNavigate?.();
};

const NavLinks: React.FC<NavLinksProps> = ({
  onNavigate,
  isActive,
  variant = "desktop",
  shouldAnimate = false,
}) => {
  // Link click handler
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      scrollToSection(id, onNavigate);
    },
    [onNavigate]
  );

  if (variant === "mobile") {
    return (
      <>
        {NAV_ITEMS.map((item, index) => {
          const active = isActive ? isActive(item.id) : false;
          const animationDelay = shouldAnimate ? `${(index + 1) * 0.1}s` : "0s";
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={`relative text-base sm:text-lg md:text-lg font-medium transition-all duration-300 py-3 px-4 rounded-lg flex items-center mobile-menu-link ${
                shouldAnimate ? "animate-slide-in-right" : ""
              } ${
                active
                  ? "text-blue-900 font-semibold bg-blue-50 scale-[1.02]"
                  : "text-slate-700 hover:text-blue-900 hover:bg-slate-50"
              }`}
              style={{ animationDelay }}
            >
              {active && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-900 rounded-r-full" />
              )}
              {item.label}
            </a>
          );
        })}
      </>
    );
  }

  // Desktop variant
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = isActive ? isActive(item.id) : false;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleLinkClick(e, item.id)}
            className={`relative text-sm lg:text-sm xl:text-base 2xl:text-base font-medium transition-all duration-300 whitespace-nowrap group ${
              active
                ? "text-blue-900 font-semibold"
                : "text-slate-700 hover:text-blue-900"
            }`}
          >
            {item.label}
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 transition-all duration-300 ${
                active
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100"
              }`}
            />
          </a>
        );
      })}
    </>
  );
};

export default NavLinks;
