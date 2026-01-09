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
      <div className="bg-blue-50 flex flex-col min-h-screen relative z-0">
        <section className="hero-main-section flex flex-col justify-between min-h-screen py-4 md:py-6 lg:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between flex-1">
            <div className="flex-1 flex flex-col justify-center w-full">
              <div className="text-center py-8 w-full">
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                  Loading hero section...
                </p>
              </div>
            </div>
          </div>
          <div className="hero-carousel-section w-full pt-4 md:pt-6 lg:pt-8 pb-2">
            <ClientLogoCarousel pauseOnHover={true} duration="60s" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-blue-300 flex flex-col min-h-screen relative z-0 overflow-visible">
      <section className="hero-main-section flex flex-col justify-between min-h-screen py-4 md:py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-between flex-1">
          {/* Main Content Grid */}
          <div className="flex-1 flex flex-col justify-center items-center w-full py-2 md:py-4 lg:py-6 relative">
            {/* Two Column Layout: Text First on Mobile, Side-by-Side on Desktop */}
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
              {/* Text Content - First on Mobile, Left on Desktop */}
              <div className="text-left flex flex-col justify-center w-full order-1">
                <div
                  className={`transition-opacity duration-500 ease-in-out w-full ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}>
                  {/* Large Number */}
                  {number && (
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-orange-500 leading-none mb-2 md:mb-3 lg:mb-4 break-words">
                      {number}
                    </p>
                  )}
                  {/* Heading */}
                  {heading && (
                    <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 leading-tight mb-2 md:mb-4 lg:mb-5 break-words">
                      {heading}
                    </h1>
                  )}
                  {/* Description */}
                  {description && (
                    <p className="text-sm sm:text-base md:text-base lg:text-lg text-slate-700 leading-relaxed break-words">
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
                    <div className="relative w-full aspect-[4/3] rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden">
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
                    <div className="relative w-full aspect-[4/3] rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-400 text-sm md:text-base">
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
        <div className="hero-carousel-section w-full pt-4 md:pt-6 lg:pt-8 pb-2">
          <ClientLogoCarousel pauseOnHover={true} duration="60s" />
        </div>
      </section>
    </div>
  );
}
