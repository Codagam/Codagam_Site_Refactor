"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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

  // Default values if data is not loaded yet
  const number = currentHero?.number || "99.9%+";
  const heading = currentHero?.heading || "Technical Depth That Scales";
  const description =
    currentHero?.description ||
    "Full-stack architecture across modern and enterprise stacks (Next.js, .NET, Python, PostgreSQL, Azure, AWS, GCP). Built for reliability from day one. Infrastructure that impresses investors.";
  const imageUrl = currentHero?.imageUrl || null;

  if (loading && heroList.length === 0) {
    return (
      <section className="bg-blue-50 min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center">
            Loading hero section...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-300 min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex flex-col justify-between py-8 md:py-12 lg:pt-8 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center mb-8 md:mb-12">
          {/* Text Content */}
          <div className="text-left flex flex-col justify-center space-y-4 md:space-y-6">
            <div
              className={`transition-opacity duration-500 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}>
              {number && (
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 leading-none mb-3 md:mb-4">
                  {number}
                </p>
              )}
              {heading && (
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-4 md:mb-6">
                  {heading}
                </h1>
              )}
              {description && (
                <p className="text-base sm:text-lg md:text-lg lg:text-xl text-slate-700 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            <div
              className={`transition-opacity duration-500 ease-in-out w-full h-full ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}>
              {imageUrl ? (
                <div className="relative w-full h-full rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={imageUrl}
                    alt={heading || "Hero image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentIndex === 0}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-400 text-sm md:text-base">
                    No image available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Client Logo Carousel */}
      <div className="w-full pt-4 md:pt-6">
        <ClientLogoCarousel pauseOnHover={true} duration="60s" />
      </div>
    </section>
  );
}
