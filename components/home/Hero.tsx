"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import { clientLogos } from "@/lib/content/clients";

export default function Hero() {
  return (
    <>
      <section className="hero-main-section pt-6 sm:pt-8 md:pt-10 lg:pt-16 pb-6 sm:pb-10 md:pb-12 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Content Section */}
            <div className="text-center md:text-left order-1">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-black leading-tight max-w-xl lg:max-w-none mx-auto md:mx-0 px-2 sm:px-0 wrap-break-word mb-6 sm:mb-7 md:mb-8 lg:mb-10">
                We build modern, AI-powered software solutions for healthcare,
                hyperlocal markets, and enterprise clients across India and
                globally.
              </p>
              <div className="flex justify-center md:justify-start mb-6 sm:mb-8 md:mb-0">
                <Button
                  className="bg-blue-900 hover:bg-blue-800 text-white px-5 sm:px-6 md:px-7 lg:px-8 py-2.5 sm:py-3 md:py-3 lg:py-3.5 text-sm sm:text-base md:text-base font-medium">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden order-2 w-full h-[250px] sm:h-[200px] md:h-[320px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px]">
              <Image
                src="/images/web-design-studio.jpg"
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
