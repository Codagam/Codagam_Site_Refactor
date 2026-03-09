"use client";

import { useEffect, useState } from "react";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import Link from "next/link";

interface HeroData {
  id: string;
  number?: string | null;
  heading?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}

// Static "active" hero content (matches reference / other/Hero.tsx)
const DEFAULT_EYEBROW = "Code + Agam · Tamil Nadu, India";
const DEFAULT_HEADING = (
  <>
    The mind that
    <br />
    powers your
    <br />
    <em>world.</em>
  </>
);
const DEFAULT_DESCRIPTION =
  "Agam — mind, home, inside — meets precision engineering. Bespoke software powering aviation, healthcare, hospitality and more.";

const HERO_SWITCH_INTERVAL = 5000;

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
              typeof (hero as { id: unknown }).id === "string",
          );
          const sortedHeroes = validHeroes.sort((a, b) => {
            const aPos = (a as { position?: number }).position ?? 999;
            const bPos = (b as { position?: number }).position ?? 999;
            return aPos - bPos;
          });

          if (process.env.NODE_ENV === "development") {
            console.log(
              "Hero sections loaded:",
              sortedHeroes.length,
              sortedHeroes,
            );
          }

          setHeroList(sortedHeroes);
          setCurrentIndex(0);
        } else {
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

  useEffect(() => {
    if (heroList.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % heroList.length);
        setIsTransitioning(false);
      }, 300);
    }, HERO_SWITCH_INTERVAL);

    return () => clearInterval(timer);
  }, [heroList.length]);

  const currentHero = heroList[currentIndex] || heroList[0];
  const useApiContent = heroList.length > 0 && currentHero?.heading;

  const eyebrow = currentHero?.number ?? DEFAULT_EYEBROW;
  const heading = useApiContent ? currentHero!.heading! : DEFAULT_HEADING;
  const description = useApiContent
    ? (currentHero!.description ?? DEFAULT_DESCRIPTION)
    : DEFAULT_DESCRIPTION;

  // Combined overlay: left→right fade (so right-side canvas stays visible/active) + top fade
  const overlayStyle = {
    background:
      "linear-gradient(to bottom, rgba(10,18,69,.6) 0%, transparent 35%), linear-gradient(to right, rgba(10,18,69,.95) 0%, rgba(10,18,69,.8) 28%, rgba(10,18,69,.25) 52%, transparent 70%)",
  };

  if (loading && heroList.length === 0) {
    return (
      <section
        id="hero"
        className="hero-main-section relative z-10 min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-12 sm:py-14 md:py-16 bg-(--bg-deep)">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-(--text-dim) text-sm sm:text-base md:text-lg text-center">
            Loading hero section...
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section
        id="hero"
        className="hero-main-section relative z-10 min-h-screen w-full flex flex-col justify-center lg:justify-start items-center lg:items-start pt-20 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-20 lg:pt-36 lg:pb-20 px-4 sm:px-6 lg:px-[5vw] pointer-events-none">
        {/* Overlay: leaves right side (50–70%+) visible so canvas diagram stays active */}
        <div
          className="fixed inset-0 z-1 pointer-events-none"
          style={overlayStyle}
          aria-hidden
        />
        {/* Left content: responsive on sm/md; lg+ unchanged (~44% so right is canvas) */}
        <div className="hero-content relative z-2 w-full max-w-[min(520px,92vw)] sm:max-w-[min(520px,88vw)] md:max-w-[min(520px,75vw)] lg:max-w-[44%] mx-auto lg:mx-0 lg:shrink-0 text-center lg:text-left">
          <div
            className={`inline-flex items-center justify-center lg:justify-start gap-2 text-[.7rem] sm:text-[.68rem] font-medium uppercase tracking-[.14em] text-(--acc2) bg-[rgba(5,12,55,.92)] border border-white/12 py-1.5 px-4 rounded-full mb-5 sm:mb-7 opacity-0 animate-[rise_.8s_.3s_cubic-bezier(.22,1,.36,1)_forwards] shadow-[0_18px_45px_rgba(1,5,32,.95)] backdrop-blur-[6px] transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-(--acc2) shadow-[0_0_7px_var(--acc2)] animate-[blink_2.5s_ease-in-out_infinite]" />
            {eyebrow}
          </div>
          <h1
            className={`font-(--font-serif) text-[clamp(1.875rem,5vw+1rem,4.75rem)] lg:text-[clamp(2.2rem,4.5vw,4.75rem)] text-white leading-[1.07] tracking-[-.03em] mb-4 sm:mb-5 opacity-0 animate-[rise_.8s_.5s_cubic-bezier(.22,1,.36,1)_forwards] [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2) transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}>
            {heading}
          </h1>
          <p
            className={`text-[clamp(.8125rem,1.2vw,1.05rem)] lg:text-[clamp(.875rem,1.3vw,1.05rem)] text-(--text-dim) leading-7 lg:leading-8 max-w-[400px] mx-auto lg:mx-0 mb-7 sm:mb-9 opacity-0 animate-[rise_.8s_.7s_cubic-bezier(.22,1,.36,1)_forwards] transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}>
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center flex-wrap pointer-events-auto opacity-0 animate-[rise_.8s_.9s_cubic-bezier(.22,1,.36,1)_forwards] justify-center lg:justify-start">
            <Link
              href="#contact"
              className="group inline-flex justify-center sm:justify-start items-center gap-2 w-full sm:w-auto rounded-[999px] bg-blue-100 text-gray-900! px-7 py-3 font-(--font-sans) text-[.9rem] shadow-[0_14px_40px_rgba(0,0,0,.45)] transition-colors duration-150 hover:bg-white hover:text-gray-900! hover:-translate-y-0.5">
              Book a discovery call
              <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logo Carousel - white strip, full width */}
      <div className="hero-carousel-section relative z-10 w-full max-w-[100vw] pt-4 sm:pt-6 md:pt-6 lg:pt-8 min-w-0">
        <div className="w-full bg-white min-h-[90px] sm:min-h-[110px] md:min-h-[130px] lg:min-h-[150px] xl:min-h-[170px] 2xl:min-h-[190px] flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-10">
          <ClientLogoCarousel pauseOnHover={true} duration="60s" />
        </div>
      </div>
    </>
  );
}
