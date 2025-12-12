"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";

interface HeroData {
  id: string;
  title: string;
  imageUrl: string;
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
            (
              hero: unknown
            ): hero is { id: string; title: string; imageUrl: string } =>
              typeof hero === "object" &&
              hero !== null &&
              "id" in hero &&
              "title" in hero &&
              "imageUrl" in hero &&
              typeof (hero as { id: unknown }).id === "string" &&
              typeof (hero as { title: unknown }).title === "string" &&
              typeof (hero as { imageUrl: unknown }).imageUrl === "string" &&
              String((hero as { title: string }).title).trim() !== "" &&
              String((hero as { imageUrl: string }).imageUrl).trim() !== ""
          );
          setHeroList(validHeroes);
        } else {
          console.error("API error:", data.error);
          setHeroList([]);
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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Default values if data is not loaded yet
  const title =
    currentHero?.title ||
    "We build modern, AI-powered software solutions for healthcare, hyperlocal markets, and enterprise clients across India and globally.";
  const imageUrl = currentHero?.imageUrl || "/images/web-design-studio.jpg";

  if (loading && heroList.length === 0) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] bg-white">
        <section className="hero-main-section flex flex-col justify-between min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full h-full flex flex-col justify-between flex-1">
            <div className="flex-1 flex flex-col justify-center w-full">
              <div className="text-center py-8 w-full">
                <p className="text-gray-600">Loading hero section...</p>
              </div>
            </div>
          </div>
          <div className="hero-carousel-section w-full pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-10 overflow-x-hidden">
            <ClientLogoCarousel pauseOnHover={true} duration="60s" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] bg-white">
      <section className="hero-main-section flex flex-col justify-between min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full h-full flex flex-col justify-between flex-1">
          {/* Main Content Grid */}
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 items-center w-full max-w-full">
              {/* Content Section */}
              <div className="text-center md:text-left order-1 flex flex-col justify-center items-center md:items-start w-full md:w-auto md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl min-w-0">
                <div
                  className={`transition-opacity duration-500 ease-in-out w-full ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}>
                  <p className="text-xs min-[375px]:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-black leading-tight w-full mx-auto md:mx-0 px-2 sm:px-3 md:px-0 break-words mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7">
                    {title}
                  </p>
                  <div className="flex justify-center md:justify-start items-center w-full">
                    <Button
                      onClick={() => scrollToSection("services")}
                      className="bg-blue-900 hover:bg-blue-800 text-white px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium shrink-0 whitespace-nowrap">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden order-2 w-full aspect-[4/3] min-h-[200px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[380px] 2xl:min-h-[420px] bg-slate-50 mx-auto md:mx-0">
                {imageUrl && imageUrl.trim() !== "" ? (
                  <Image
                    key={`${currentHero?.id || currentIndex}-${imageUrl}`}
                    src={imageUrl}
                    alt={currentHero?.title || "Codagam - Software Development"}
                    fill
                    className={`object-contain object-center transition-opacity duration-500 ease-in-out ${
                      isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
                    priority={currentIndex === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    onError={() => {
                      console.error("Image load error:", imageUrl);
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                    <p className="text-gray-400 text-sm">No image available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Client Logo Carousel - Full Width on All Screens */}
        <div className="hero-carousel-section w-full pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-10 overflow-x-hidden">
          <ClientLogoCarousel pauseOnHover={true} duration="60s" />
        </div>
      </section>
    </div>
  );
}
