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
      <section className="hero-main-section pt-6 sm:pt-8 md:pt-12 lg:pt-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Content Section */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-xl min-[375px]:text-2xl sm:text-2xl md:text-3xl lg:text-6xl xl:text-7xl font-semibold mb-3 sm:mb-4 md:mb-5 leading-tight text-blue-900 wrap-break-word">
                Transform Your Ideas Into Scalable SaaS Products
              </h1>
              <p className="text-xs min-[375px]:text-sm sm:text-sm md:text-base lg:text-xl text-slate-600 mb-4 sm:mb-5 md:mb-6 lg:mb-8 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0 px-2 sm:px-0 wrap-break-word">
                We build modern, AI-powered software solutions for healthcare,
                hyperlocal markets, and enterprise clients across India and
                globally.
              </p>
              <div className="flex flex-col min-[375px]:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start items-stretch min-[375px]:items-center flex-wrap">
                <Button
                  onClick={scrollToContact}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 min-[375px]:px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 text-xs min-[375px]:text-xs sm:text-sm md:text-base font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg w-full min-[375px]:w-auto shrink-0">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-900 text-blue-900 bg-transparent hover:bg-blue-900 hover:text-white px-4 min-[375px]:px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-xs min-[375px]:text-xs sm:text-sm md:text-base font-medium w-full min-[375px]:w-auto shrink-0">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden order-1 lg:order-2 w-full aspect-4/3 sm:aspect-3/2 md:aspect-16/10 lg:aspect-square xl:aspect-4/3 h-[200px] min-[375px]:h-[240px] sm:h-[280px] md:h-[320px] lg:h-[450px] xl:h-[500px] 2xl:h-[550px] max-h-[600px]">
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
