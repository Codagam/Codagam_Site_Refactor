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
      <section className="hero-main-section pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-6 sm:pb-12 md:pb-16 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Content Section */}
            <div className="text-center md:text-left order-1">
              <h1 className="text-base min-[375px]:text-lg sm:text-lg md:text-xl lg:text-6xl xl:text-7xl font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight text-blue-900 wrap-break-word">
                Transform Your Ideas Into Scalable SaaS Products
              </h1>
              <p className="text-[10px] min-[375px]:text-[11px] sm:text-[11px] md:text-xs lg:text-xl text-slate-600 mb-3 sm:mb-4 md:mb-5 lg:mb-8 leading-relaxed max-w-xl lg:max-w-none mx-auto md:mx-0 px-1 sm:px-0 wrap-break-word">
                We build modern, AI-powered software solutions for healthcare,
                hyperlocal markets, and enterprise clients across India and
                globally.
              </p>
              <div className="flex flex-col min-[375px]:flex-row gap-2 sm:gap-2 md:gap-3 lg:gap-4 justify-center md:justify-start items-stretch min-[375px]:items-center flex-wrap">
                <Button
                  onClick={scrollToContact}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-3 min-[375px]:px-4 sm:px-4 md:px-5 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3.5 text-[10px] min-[375px]:text-[11px] sm:text-[11px] md:text-xs lg:text-base font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg w-full min-[375px]:w-auto shrink-0">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-900 text-blue-900 bg-transparent hover:bg-blue-900 hover:text-white px-3 min-[375px]:px-4 sm:px-4 md:px-5 lg:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 text-[10px] min-[375px]:text-[11px] sm:text-[11px] md:text-xs lg:text-base font-medium w-full min-[375px]:w-auto shrink-0">
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
