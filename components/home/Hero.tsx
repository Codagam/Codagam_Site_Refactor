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
      <section className="hero-main-section w-full overflow-x-hidden bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 2xl:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-center w-full py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 2xl:py-12">
            {/* Content Section */}
            <div className="text-center md:text-left order-2 md:order-1 w-full flex flex-col justify-center space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4 xl:space-y-5">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-blue-900 leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight wrap-break-word">
                Transform Your Ideas Into Scalable SaaS Products
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-slate-600 leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0 wrap-break-word mt-2 sm:mt-2.5 md:mt-3 lg:mt-4">
                We build modern, AI-powered software solutions for healthcare,
                hyperlocal markets, and enterprise clients across India and
                globally.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 justify-center md:justify-start items-stretch sm:items-center w-full pt-2 sm:pt-2.5 md:pt-3 lg:pt-4">
                <Button
                  onClick={scrollToContact}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-sm sm:text-base md:text-lg font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto shrink-0">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-900 text-blue-900 bg-transparent hover:bg-blue-900 hover:text-white px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 text-sm sm:text-base md:text-lg font-medium w-full sm:w-auto shrink-0">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden order-1 md:order-2 w-full flex justify-center items-center">
              <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[380px] xl:max-w-[450px] 2xl:max-w-[520px] shadow-xl ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-300">
                <Image
                  src="/images/hero page image.jpg"
                  alt="Codagam - Software Development"
                  fill
                  className="object-cover rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl transition-transform duration-500 hover:scale-105"
                  priority
                  quality={95}
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 300px, (max-width: 1280px) 380px, (max-width: 1536px) 450px, 520px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Carousel - Full Width */}
      <div className="hero-carousel-section w-full pt-3 sm:pt-4 md:pt-5 lg:pt-4 xl:pt-5 2xl:pt-6 pb-3 sm:pb-4 md:pb-5 lg:pb-5 xl:pb-6 2xl:pb-7 overflow-x-hidden bg-white">
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
