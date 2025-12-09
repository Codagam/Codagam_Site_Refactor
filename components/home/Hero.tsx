"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import { clientLogos } from "@/lib/content/clients";

export default function Hero() {
  return (
    <>
      <section className="hero-main-section pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-6 sm:pb-12 md:pb-16 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Content Section */}
            <div className="text-center md:text-left order-1">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-black leading-relaxed max-w-xl lg:max-w-none mx-auto md:mx-0 px-1 sm:px-0 wrap-break-word mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                We build modern, AI-powered software solutions for healthcare,
                hyperlocal markets, and enterprise clients across India and
                globally.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 text-sm sm:text-base md:text-lg font-medium">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden order-2 w-full aspect-4/3 sm:aspect-3/2 md:aspect-16/10 lg:aspect-square xl:aspect-4/3 h-[150px] min-[375px]:h-[180px] sm:h-[180px] md:h-[200px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px] max-h-[600px]">
              <Image
                src="/images/hero page image.jpg"
                alt="Codagam - Software Development"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Carousel - Full Width */}
      <div className="hero-carousel-section w-full  pt-8 sm:pt-10 md:pt-12">
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
