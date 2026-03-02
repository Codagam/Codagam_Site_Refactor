"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const capabilities = [
  {
    id: "polyglot",
    title: "Polyglot Expertise",
    description:
      "Full-stack architecture spanning modern stacks (JavaScript, Python) and enterprise platforms (.NET, MS SQL Server) at global scale",
    imageUrl: "/images/about/Polyglot Expertise.png",
  },
  {
    id: "healthcare",
    title: "Healthcare Mastery",
    description:
      "2+ years building EMR systems, clinical workflows, and health tech compliance frameworks",
    imageUrl: "/images/about/Healthcare Mastery.png",
  },
  {
    id: "emerging",
    title: "Emerging Markets",
    description:
      "Deep understanding of India's digital transformation, tier-2/3 dynamics, and localized solutions",
    imageUrl: "/images/about/Emerging Markets.png",
  },
  {
    id: "global",
    title: "Global Delivery",
    description:
      "Proven execution across US, UK, and Indian markets with 24/7 timezone coverage",
    imageUrl: "/images/about/Global Delivery.png",
  },
];

export default function CapabilityCards() {
  return (
    <section
      id="products"
      className="bg-muted/40 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 lg:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[2.5rem] font-bold text-primary text-center mb-3 sm:mb-3 md:mb-4 lg:mb-4">
          Our Capabilities
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl text-foreground text-center mb-5 sm:mb-6 md:mb-7 lg:mb-8 max-w-4xl mx-auto">
          We build mission-critical software that bridges the gap between
          enterprise reliability and startup innovation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-5 lg:gap-6 xl:gap-6">
          {capabilities.map((capability) => (
            <Card
              key={capability.id}
              className="group overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              {/* Image: responsive height and padding for all breakpoints */}
              <div className="relative w-full overflow-hidden bg-muted shrink-0 h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 flex items-center justify-center p-3 sm:p-4 md:p-4 lg:p-5">
                <div className="relative w-full h-full min-h-[80px] sm:min-h-[88px] md:min-h-[96px]">
                  <Image
                    src={capability.imageUrl.replace(/ /g, "%20")}
                    alt={capability.title}
                    fill
                    className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 480px) 140px, (max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 240px"
                    unoptimized
                  />
                </div>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden
                />
              </div>
              <CardContent className="p-4 sm:p-4 md:p-5 lg:p-5 xl:p-6 flex flex-col flex-1">
                <h3 className="text-base sm:text-lg md:text-lg lg:text-xl font-bold text-primary mb-1.5 sm:mb-2 md:mb-2 leading-tight">
                  {capability.title}
                </h3>
                <p className="text-sm sm:text-sm md:text-base lg:text-base text-muted-foreground leading-relaxed flex-1">
                  {capability.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
