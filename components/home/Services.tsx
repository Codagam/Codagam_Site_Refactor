"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code,
  HeartPulse,
  Cloud,
  BarChart3,
  Brain,
  Target,
} from "lucide-react";
import { servicesGalleryItems } from "@/lib/content/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  "custom-software-development": Code,
  "healthcare-technology": HeartPulse,
  "cloud-architecture-devops": Cloud,
  "data-analytics-bi": BarChart3,
  "ai-ml-integration": Brain,
  "secondary-services": Target,
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-12 sm:py-14 md:py-16 lg:pt-12 lg:pb-16 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 lg:scroll-mt-16 overflow-hidden">
      {/* Background Image - path encoded for spaces */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/service%20bg/service%20section%20bg.jpg"
          alt="Services background"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
          unoptimized
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 z-1 bg-section-bg/50" aria-hidden />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-8 md:mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesGalleryItems.map((service) => {
            const IconComponent = iconMap[service.id] || Target;
            const hoverColor = service.hoverColor || "bg-primary";
            const bgMatch = hoverColor.match(/bg-(.+)/);
            let textColorClass = "text-primary";
            if (bgMatch) {
              const colorValue = bgMatch[1];
              if (!colorValue.startsWith("[")) {
                textColorClass = `text-${colorValue}`;
              } else {
                const rgbMatch = colorValue.match(
                  /rgb\((\d+),(\d+),(\d+)\)/,
                );
                if (rgbMatch) {
                  textColorClass = `text-[rgb(${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]})]`;
                }
              }
            }

            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="block h-full">
                <Card
                  className={`service-card-group group relative overflow-hidden border-transparent transition-all duration-300 cursor-pointer h-full flex flex-col w-full max-w-full wrap-break-word rounded-xl ${hoverColor} hover:opacity-95`}>
                  <div className="service-icon-bg absolute top-0 right-0 flex items-center justify-center z-30 p-2">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>

                  <CardContent className="relative z-10 p-3 md:p-4 lg:p-5 flex flex-col grow">
                    <CardHeader className="p-0 mb-2 pr-10 md:pr-12">
                      <CardTitle className="text-base md:text-lg lg:text-xl font-bold mb-0 text-white wrap-break-word leading-tight flex items-center gap-2">
                        {service.title}
                        <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform shrink-0" />
                      </CardTitle>
                    </CardHeader>

                    <p className="text-sm md:text-base text-white/95 leading-relaxed mb-2 md:mb-2.5 line-clamp-4 wrap-break-word font-medium">
                      {service.description}
                    </p>

                    {service.offerings && service.offerings.length > 0 && (
                      <ul className="space-y-1.5 md:space-y-2 flex-1 mb-2 md:mb-2.5">
                        {service.offerings.slice(0, 3).map((offering, index) => (
                          <li
                            key={index}
                            className="text-xs md:text-sm text-white/95 leading-relaxed flex items-start">
                            <span className="text-white mr-2 mt-1 shrink-0 text-xs font-bold">
                              •
                            </span>
                            <span className="flex-1 wrap-break-word line-clamp-2">
                              {offering}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
