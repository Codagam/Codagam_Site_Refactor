"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import { clientLogos } from "@/lib/content/clients";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] bg-white">
      <section className="hero-main-section pt-4 sm:pt-5 md:pt-6 lg:pt-16 xl:pt-20 2xl:pt-24 pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-12 2xl:pb-20 bg-white grow">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-12 items-center">
            {/* Content Section */}
            <div className="text-center md:text-left order-1">
              <p className="text-sm min-[375px]:text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-black leading-tight max-w-xl lg:max-w-none mx-auto md:mx-0 px-2 sm:px-3 md:px-0 wrap-break-word mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 2xl:mb-10">
                We build modern, AI-powered software solutions for healthcare,
                hyperlocal markets, and enterprise clients across India and
                globally.
              </p>
              <div className="flex justify-center md:justify-start mb-3 sm:mb-4 md:mb-0 lg:mb-6">
                <Button
                  onClick={() => scrollToSection("services")}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 md:px-5 lg:px-7 xl:px-8 2xl:px-10 py-2 sm:py-2.5 md:py-2.5 lg:py-4 xl:py-4 2xl:py-5 text-xs sm:text-sm md:text-sm lg:text-lg xl:text-xl font-medium">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden order-2 w-full aspect-4/3 min-h-[180px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[400px] xl:min-h-[480px] 2xl:min-h-[560px] bg-slate-50">
              <Image
                src="/images/web-design-studio.jpg"
                alt="Codagam - Software Development"
                fill
                className="object-contain object-center"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Carousel - Full Width */}
      <div className="hero-carousel-section w-full pt-8 sm:pt-10 md:pt-12 lg:pt-0 lg:mt-auto">
        <ClientLogoCarousel
          logos={clientLogos}
          pauseOnHover={true}
          duration="60s"
          repeat={2}
        />
      </div>
    </div>
  );
}
