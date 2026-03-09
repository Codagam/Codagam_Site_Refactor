"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const capabilities = [
  {
    id: "web-saas",
    category: "WEB & SAAS",
    title: "Modern Web Products",
    description:
      "Full-stack SaaS, dashboards, portals — Next.js, MERN, TypeScript. Optimised for performance and developer velocity from day one.",
    imageUrl: "/images/about/Modern Web Products.png",
  },
  {
    id: "enterprise",
    category: "ENTERPRISE",
    title: "Enterprise .NET + SQL",
    description:
      "Robust internal tools, ERP integrations, backend services — for organisations that need reliability and compliance longevity.",
    imageUrl: "/images/about/Enterprise .NET + SQL.png",
  },
  {
    id: "end-to-end",
    category: "END-TO-END",
    title: "Architecture & Full Delivery",
    description:
      "System design to deployment, CI/CD, monitoring, handover - we lead the entire engineering lifecycle when you need it.",
    imageUrl: "/images/about/Global Delivery.png",
  },
];

export default function CapabilityCards() {
  return (
    <section
      id="products"
      className="border-t border-(--border) py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 lg:scroll-mt-16"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13,22,90,.9) 0%, var(--bg-deep) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8">
        <p className="text-[.7rem] font-(--font-sans) uppercase tracking-widest text-(--text-dim) mb-2">
          What we build
        </p>
        <h2 className="font-(--font-serif) text-[clamp(1.5rem,3vw,2.25rem)] text-(--bg-deep) mb-8 md:mb-10 max-w-2xl">
          Engineering that <em>ships</em> and scales.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-5 lg:gap-6 xl:gap-6">
          {capabilities.map((capability) => (
            <Card
              key={capability.id}
              className="overflow-hidden border border-(--border) bg-(--bg-card) shadow-sm h-full flex flex-col transition-shadow duration-200 hover:shadow-md hover:border-(--acc2)"
            >
              <div className="relative w-full overflow-hidden bg-(--border) shrink-0 h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 flex items-center justify-center p-3 sm:p-4 md:p-4 lg:p-5">
                <div className="relative w-full h-full min-h-[80px] sm:min-h-[88px] md:min-h-[96px]">
                  <Image
                    src={capability.imageUrl.replace(/ /g, "%20")}
                    alt={capability.title}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 480px) 140px, (max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 240px"
                    unoptimized
                  />
                </div>
              </div>
              <CardContent className="p-4 sm:p-4 md:p-5 lg:p-5 xl:p-6 flex flex-col flex-1">
                <span className="inline-flex w-fit items-center self-center rounded-full bg-(--acc2) px-3 py-1 text-[.68rem] font-(--font-sans) uppercase tracking-widest text-(--bg-deep) mb-3 sm:mb-3 md:mb-4">
                  {capability.category}
                </span>
                <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-(--font-serif) text-(--acc2) mb-2 sm:mb-2 md:mb-3 leading-tight">
                  {capability.title}
                </h3>
                <p className="text-sm sm:text-sm md:text-base lg:text-base text-(--text-dim) leading-relaxed flex-1">
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
