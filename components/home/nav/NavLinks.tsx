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
              className={`block font-[var(--font-serif)] text-3xl font-light text-white py-3 px-4 transition-opacity mobile-menu-link ${
                shouldAnimate ? "animate-slide-in-right" : ""
              } ${active ? "opacity-100" : "opacity-90 hover:opacity-100"}`}
              style={{ animationDelay }}
            >
              {item.label}
            </a>
          );
        })}
      </>
    );
  }

  // Desktop variant - Codagam theme: text-white/45 hover:text-white hover:bg-white/[.07]
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = isActive ? isActive(item.id) : false;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleLinkClick(e, item.id)}
            className={`text-[.82rem] py-1.5 px-3 rounded transition-colors whitespace-nowrap ${
              active
                ? "text-white bg-white/[.07]"
                : "text-white/45 hover:text-white hover:bg-white/[.07]"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
};

export default NavLinks;
