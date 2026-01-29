"use client";

import Image from "next/image";

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
      className="bg-card py-8 md:py-10 lg:py-12 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-3 md:mb-4">
          Our Capabilities
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-foreground text-center mb-4 md:mb-6 max-w-4xl mx-auto">
          We build mission-critical software that bridges the gap between
          enterprise reliability and startup innovation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {capabilities.map((capability) => (
            <div
              key={capability.id}
              className="relative overflow-hidden rounded-lg md:rounded-xl border-2 border-[#0E78BE] bg-[#0E78BE] hover:bg-[#0b5f9a] hover:border-[#0b5f9a] min-h-[180px] sm:min-h-[200px] md:min-h-[240px] transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 z-0">
                <Image
                  src={capability.imageUrl.replace(/ /g, "%20")}
                  alt={capability.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 z-1 bg-[#0E78BE]/65" aria-hidden />
              </div>
              <div className="relative z-10 p-4 md:p-5 flex flex-col h-full min-h-[180px] sm:min-h-[200px] md:min-h-[240px]">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white text-center border-b-2 border-white/80 pb-2">
                  {capability.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed flex-1 text-white/95">
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
