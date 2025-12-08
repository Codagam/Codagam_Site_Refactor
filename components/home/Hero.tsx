"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import { clientLogos } from "@/lib/content/clients";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section className="hero-main-section pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-10 bg-white w-full overflow-x-hidden min-h-0">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 items-center w-full min-h-0">
            {/* Content Section */}
            <div className="text-center md:text-left order-2 md:order-1 w-full flex flex-col justify-center min-h-0 overflow-hidden">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 leading-tight sm:leading-snug md:leading-normal text-blue-900 wrap-break-word hyphens-auto px-1 sm:px-0">
                Transform Your Ideas Into Scalable SaaS Products
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-slate-600 mb-3 sm:mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0 px-2 sm:px-0 wrap-break-word hyphens-auto">
                We build modern, AI-powered software solutions for healthcare,
                hyperlocal markets, and enterprise clients across India and
                globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 justify-center md:justify-start items-stretch sm:items-center flex-wrap w-full px-2 sm:px-0">
                <Button
                  onClick={scrollToContact}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 text-xs sm:text-sm md:text-base font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto shrink-0">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-900 text-blue-900 bg-transparent hover:bg-blue-900 hover:text-white px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 py-1.5 sm:py-2 md:py-2.5 lg:py-3 text-xs sm:text-sm md:text-base font-medium w-full sm:w-auto shrink-0">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden order-1 md:order-2 w-full max-w-full mx-auto md:mx-0 flex justify-center items-center min-h-0 shrink-0">
              <div className="relative w-full max-w-[140px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[300px] xl:max-w-[360px] 2xl:max-w-[420px] aspect-square h-auto">
                <Image
                  src="/images/hero page image.jpg"
                  alt="Codagam - Software Development"
                  fill
                  className="object-cover rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl"
                  priority
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 240px, (max-width: 1280px) 300px, (max-width: 1536px) 360px, 420px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Carousel - Full Width */}
      <div className="hero-carousel-section w-full pt-2 sm:pt-2.5 md:pt-3 lg:pt-3.5 xl:pt-4 overflow-x-hidden">
        <ClientLogoCarousel
          logos={clientLogos}
          pauseOnHover={true}
          duration="60s"
          repeat={2}
        />
      </div>
    </>
  );
}
