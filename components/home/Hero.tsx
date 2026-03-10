"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroCanvasWrapper from "@/components/home/HeroCanvasWrapper";

const HERO_SECTORS = [
  "Aviation",
  "Healthcare",
  "Hospitality",
  "Finance",
  "Logistics",
  "Government",
  "Education",
  "Retail",
];

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

  // Overlay: same base as canvas (--bg-deep); left dark for text, right transparent so animation visible on all screens
  const overlayStyle =
    "linear-gradient(to bottom, rgba(10,18,69,.45) 0%, transparent 35%), linear-gradient(to right, rgba(10,18,69,.96) 0%, rgba(10,18,69,.82) 22%, rgba(10,18,69,.5) 48%, rgba(10,18,69,.12) 68%, transparent 88%)";

  if (loading && heroList.length === 0) {
    return (
      <section
        id="hero"
        className="hero-main-section relative z-10 min-h-[calc(100dvh-var(--navbar-h,56px))] flex flex-col justify-center items-center py-8 sm:py-10 md:py-12 px-4 sm:px-5 md:px-6 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw] bg-(--bg-deep) font-sans overflow-x-hidden"
      >
        <div className="w-full max-w-7xl mx-auto min-w-0">
          <p className="text-(--text-dim) text-sm sm:text-base text-center">
            Loading hero section...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="hero-main-section relative z-10 w-full min-h-[calc(100dvh-var(--navbar-h,56px))] flex flex-col font-sans overflow-x-hidden pointer-events-none bg-(--bg-deep)
        pt-4 pb-3 sm:pt-5 sm:pb-4 md:pt-6 md:pb-5 lg:pt-8 lg:pb-6
        px-4 sm:px-5 md:px-6 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw]"
    >
      {/* Overlay: left dark for text, right transparent for animation */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{ background: overlayStyle }}
        aria-hidden
      />
      {/* Desktop/sm+: canvas on right, full height */}
      <HeroCanvasWrapper variant="desktop" />
      {/* Content: full height on left (sm+), top on mobile/tablet */}
      <div className="relative z-2 flex flex-col flex-1 min-h-0 w-full">
        <div className="flex flex-col justify-center flex-1 min-h-0">
          {/* Left content: centered on mobile/tablet, left-aligned on sm+; top/down center on small screens */}
          <div className="hero-content w-full flex flex-col justify-center items-center sm:items-start text-center sm:text-left min-w-0 max-w-[min(100%,540px)] sm:max-w-[48%] md:max-w-[50%] lg:max-w-[52%] xl:max-w-[46%]">
            <div
              className={`inline-flex items-center justify-center sm:justify-start gap-2 text-[.68rem] sm:text-[.7rem] font-medium uppercase tracking-[.14em] text-(--acc2) bg-[rgba(5,12,55,.92)] border border-white/12 py-1.5 px-3 sm:px-4 rounded-full mb-2.5 sm:mb-3 md:mb-4 opacity-0 animate-[rise_.8s_.3s_cubic-bezier(.22,1,.36,1)_forwards] shadow-[0_18px_45px_rgba(1,5,32,.95)] backdrop-blur-[6px] transition-opacity duration-500 self-center sm:self-start ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-(--acc2) shadow-[0_0_7px_var(--acc2)] animate-[blink_2.5s_ease-in-out_infinite]" />
              {eyebrow}
            </div>
            <h1
              className={`font-(--font-serif) text-[clamp(1.5rem,4.2vw,3.25rem)] sm:text-[clamp(1.75rem,4.8vw,3.75rem)] md:text-[clamp(1.9rem,4vw,4rem)] lg:text-[clamp(2rem,2.2vw,4rem)] text-white leading-[1.08] tracking-[-.03em] mb-2.5 sm:mb-3 md:mb-4 w-full opacity-0 animate-[rise_.8s_.5s_cubic-bezier(.22,1,.36,1)_forwards] [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2) transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {heading}
            </h1>
            <p
              className={`text-[clamp(0.78rem,1.6vw,0.98rem)] sm:text-[clamp(0.82rem,1.4vw,1.02rem)] text-(--text-dim) leading-[1.55] sm:leading-[1.65] w-full max-w-[min(100%,400px)] sm:max-w-none mx-auto sm:mx-0 mb-3 sm:mb-4 md:mb-5 opacity-0 animate-[rise_.8s_.7s_cubic-bezier(.22,1,.36,1)_forwards] transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center flex-wrap pointer-events-auto opacity-0 animate-[rise_.8s_.9s_cubic-bezier(.22,1,.36,1)_forwards] justify-center sm:justify-start w-full sm:w-auto">
              <Link
                href="#contact"
                className="group inline-flex justify-center sm:justify-start items-center gap-2 w-full sm:w-auto min-h-[42px] sm:min-h-0 rounded-[999px] bg-blue-100 text-gray-900! px-4 py-2.5 sm:px-5 sm:py-2 font-(--font-sans) text-[.8125rem] sm:text-[.875rem] shadow-[0_14px_40px_rgba(0,0,0,.45)] transition-colors duration-150 hover:bg-white hover:text-gray-900! hover:-translate-y-0.5"
              >
                Book a discovery call
                <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            {/* Powering text below button — text only, no bg */}
            <p className="w-full mt-4 sm:mt-5 md:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5 text-[.65rem] sm:text-[.7rem] text-white/50 uppercase tracking-[.12em] opacity-0 animate-[rise_.8s_1.1s_forwards]">
              <span className="whitespace-nowrap">Powering</span>
              {HERO_SECTORS.map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="w-[3px] h-[3px] rounded-full bg-(--acc2) opacity-70" />
                  {s}
                </span>
              ))}
            </p>
          </div>
        </div>
        {/* Mobile/tablet: canvas below content, centered (top and down center) */}
        <HeroCanvasWrapper variant="mobile" />
      </div>
    </section>
  );
}
