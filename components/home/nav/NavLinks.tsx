"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { id: "work", label: "Work" },
  { id: "stack", label: "Tech Stack" },
] as const;

// Scroll to section handler — offset so section top sits just below fixed navbar (minimal gap)
const scrollToSection = (id: string, onNavigate?: () => void) => {
  const element = document.getElementById(id);
  if (!element) return;

  const headerHeight = getHeaderHeight();
  const gapBelowNav = 4; // minimal gap so section appears right under nav
  const elementPosition =
    element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerHeight - gapBelowNav;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
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
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname?.startsWith("/#");

  // Link click handler (only when on home page)
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (isHomePage) {
        e.preventDefault();
        scrollToSection(id, onNavigate);
      }
    },
    [onNavigate, isHomePage]
  );

  const linkClassName =
    variant === "mobile"
      ? (active: boolean) =>
          `block font-sans text-3xl text-white py-2.5 px-3 transition-opacity mobile-menu-link ${
            active ? "opacity-100" : "opacity-90 hover:opacity-100"
          }`
      : (active: boolean) =>
          `text-[.82rem] py-1.5 px-3 rounded transition-colors whitespace-nowrap ${
            active
              ? "text-white bg-white/[.07]"
              : "text-white/45 hover:text-white hover:bg-white/[.07]"
          }`;

  if (variant === "mobile") {
    return (
      <>
        {NAV_ITEMS.map((item, index) => {
          const active = isActive ? isActive(item.id) : false;
          const animationDelay = shouldAnimate ? `${(index + 1) * 0.1}s` : "0s";
          const className = `${linkClassName(active)} ${
            shouldAnimate ? "animate-slide-in-right" : ""
          }`;
          if (isHomePage) {
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={className}
                style={{ animationDelay }}
              >
                {item.label}
              </a>
            );
          }
          return (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={className}
              style={{ animationDelay }}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
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
        if (isHomePage) {
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={linkClassName(active)}
            >
              {item.label}
            </a>
          );
        }
        return (
          <Link
            key={item.id}
            href={`/#${item.id}`}
            className={linkClassName(active)}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
