"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";

interface HeroData {
  id: string;
  number?: string | null;
  heading?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}

const HERO_SWITCH_INTERVAL = 5000; // 5 seconds

export default function Hero() {
  const [heroList, setHeroList] = useState<HeroData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch("/api/hero", { cache: "no-store" });
        const data = await response.json();

        if (response.ok) {
          const heroes = Array.isArray(data) ? data : [data];
          const validHeroes = heroes.filter(
            (hero: unknown): hero is HeroData =>
              typeof hero === "object" &&
              hero !== null &&
              "id" in hero &&
              typeof (hero as { id: unknown }).id === "string"
          );
          // Sort by position if available
          const sortedHeroes = validHeroes.sort((a, b) => {
            const aPos = (a as any).position ?? 999;
            const bPos = (b as any).position ?? 999;
            return aPos - bPos;
          });

          // Debug log in development
          if (process.env.NODE_ENV === "development") {
            console.log(
              "Hero sections loaded:",
              sortedHeroes.length,
              sortedHeroes
            );
          }

          setHeroList(sortedHeroes);
          // Reset to first hero when new data is loaded
          setCurrentIndex(0);
        } else {
          console.error("API error:", data.error);
          setHeroList([]);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setHeroList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Auto-switch between heroes
  useEffect(() => {
    if (heroList.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroList.length);
        setIsTransitioning(false);
      }, 300); // Half of transition duration
    }, HERO_SWITCH_INTERVAL);

    return () => clearInterval(timer);
  }, [heroList.length]);

  const currentHero = heroList[currentIndex] || heroList[0];

  const scrollToSection = useCallback((id: string) => {
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
  }, []);

  // Default values if data is not loaded yet
  const number = currentHero?.number || "99.9%+";
  const heading = currentHero?.heading || "Technical Depth That Scales";
  const description =
    currentHero?.description ||
    "Full-stack architecture across modern and enterprise stacks (Next.js, .NET, Python, PostgreSQL, Azure, AWS, GCP). Built for reliability from day one. Infrastructure that impresses investors.";
  const imageUrl = currentHero?.imageUrl || null;

  if (loading && heroList.length === 0) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] bg-white">
        <section className="hero-main-section flex flex-col justify-between min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] py-6 sm:py-8 md:py-10 lg:py-10 xl:py-12 2xl:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-between flex-1">
            <div className="flex-1 flex flex-col justify-center w-full">
              <div className="text-center py-8 w-full">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Loading hero section...
                </p>
              </div>
            </div>
          </div>
          <div className="hero-carousel-section w-full pt-6 sm:pt-8 md:pt-8 lg:pt-10 xl:pt-10 2xl:pt-12">
            <ClientLogoCarousel pauseOnHover={true} duration="60s" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] bg-white">
      <section className="hero-main-section flex flex-col justify-between min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] py-6 sm:py-8 md:py-10 lg:py-10 xl:py-12 2xl:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-between flex-1">
          {/* Main Content Grid */}
          <div className="flex-1 flex flex-col justify-center items-center w-full py-2 sm:py-4 md:py-4 lg:py-4 xl:py-6 2xl:py-6 relative">
            {/* Two Column Layout: Text First on Mobile, Side-by-Side on Desktop */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 items-center">
              {/* Text Content - First on Mobile, Left on Desktop */}
              <div className="text-left flex flex-col justify-center w-full order-1">
                <div
                  className={`transition-opacity duration-500 ease-in-out w-full ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}>
                  {/* Large Number */}
                  {number && (
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-orange-500 leading-none mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-4 2xl:mb-5 wrap-break-word">
                      {number}
                    </p>
                  )}
                  {/* Heading */}
                  {heading && (
                    <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-blue-900 leading-tight mb-1.5 sm:mb-2 md:mb-4 lg:mb-5 xl:mb-5 2xl:mb-6 wrap-break-word">
                      {heading}
                    </h1>
                  )}
                  {/* Description */}
                  {description && (
                    <p className="text-sm sm:text-base md:text-sm lg:text-base xl:text-base 2xl:text-lg text-slate-700 leading-relaxed wrap-break-word">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Image - Second on Mobile, Right on Desktop */}
              <div className="relative w-full order-2 flex items-center justify-center">
                <div
                  className={`transition-opacity duration-500 ease-in-out w-full ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}>
                  {imageUrl ? (
                    <div className="relative w-full aspect-4/3 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
                      <Image
                        src={imageUrl}
                        alt={heading || "Hero image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        priority={currentIndex === 0}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-4/3 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                        No image available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Logo Carousel - Full Width on All Screens */}
        <div className="hero-carousel-section w-full pt-6 sm:pt-8 md:pt-8 lg:pt-10 xl:pt-10 2xl:pt-12">
          <ClientLogoCarousel pauseOnHover={true} duration="60s" />
        </div>
      </section>
    </div>
  );
}
