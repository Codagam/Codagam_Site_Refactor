"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { servicesGalleryItems } from "@/lib/content/services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsDialogOpen(true);
  };

  const selectedServiceData = servicesGalleryItems.find(
    (s) => s.id === selectedService
  );

  const iconMap: Record<string, string> = {
    "custom-software-development": "💻",
    "healthcare-technology": "🏥",
    "cloud-architecture-devops": "☁️",
    "data-analytics-bi": "📊",
    "ai-ml-integration": "🤖",
    "secondary-services": "🎯",
  };

  return (
    <section
      id="services"
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-12 xl:py-14 2xl:py-16 bg-slate-50 scroll-mt-[56px] min-[375px]:scroll-mt-[60px] sm:scroll-mt-[64px] md:scroll-mt-[68px] lg:scroll-mt-[72px] xl:scroll-mt-[76px] 2xl:scroll-mt-[80px] w-full relative isolate">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl mb-6 sm:mb-8 md:mb-10 lg:mb-10 xl:mb-12 2xl:mb-12 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-7 2xl:gap-8 w-full">
          {servicesGalleryItems.map((service) => {
            const hoverColor = service.hoverColor || "30 58 138";
            const icon = iconMap[service.id] || "📋";
            const rgbValues = hoverColor.split(" ").join(", ");

            return (
              <Card
                key={service.id}
                className="service-card-group group relative overflow-hidden border-slate-200 hover:border-transparent transition-all duration-300 hover:shadow-2xl cursor-pointer h-full flex flex-col w-full max-w-full wrap-break-word rounded-xl"
                onClick={() => handleButtonClick(service.id)}
                style={{
                  "--service-hover-color": rgbValues,
                } as React.CSSProperties & { "--service-hover-color": string }}>
                {/* Diagonal color fill from bottom-left on hover */}
                <div
                  className="service-card-hover"
                  style={{
                    backgroundColor: `rgb(${rgbValues})`,
                  }}
                />

                {/* Icon with colored background - positioned at top-right */}
                <div 
                  className="service-icon-bg absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-tr-xl rounded-bl-xl z-30"
                  style={{
                    backgroundColor: `rgb(${rgbValues})`,
                  }}>
                  <span className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl text-white">
                    {icon}
                  </span>
                </div>

                {/* Content */}
                <CardContent className="relative z-10 p-3 sm:p-4 md:p-4 lg:p-5 xl:p-5 2xl:p-6 flex flex-col grow">
                  {/* Title */}
                  <CardHeader className="p-0 mb-2 sm:mb-2.5 pr-10 sm:pr-12 md:pr-14 lg:pr-16">
                    <CardTitle className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl font-bold mb-0 text-blue-900 group-hover:text-white transition-colors duration-300 wrap-break-word">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  {/* Description */}
                  <p className="text-sm sm:text-sm md:text-base lg:text-sm xl:text-base text-slate-600 group-hover:text-white/90 leading-snug mb-2 sm:mb-2.5 md:mb-3 lg:mb-3 line-clamp-4 transition-colors duration-300 wrap-break-word">
                    {service.description}
                  </p>

                  {/* Offerings/Bullet Points */}
                  {service.offerings && service.offerings.length > 0 && (
                    <ul className="space-y-1.5 sm:space-y-1.5 md:space-y-2 flex-1 mb-3 sm:mb-3.5">
                      {service.offerings.map((offering, index) => (
                        <li
                          key={index}
                          className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm text-slate-700 group-hover:text-white/90 leading-snug flex items-start transition-colors duration-300">
                          <span className="text-slate-900 group-hover:text-white mr-1.5 mt-1 shrink-0 text-[8px] sm:text-[10px] transition-colors duration-300">
                            •
                          </span>
                          <span className="flex-1 wrap-break-word">
                            {offering}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm md:text-sm font-semibold text-blue-900 group-hover:text-white transition-all duration-300 mt-auto">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Service Details Dialog */}
      {selectedServiceData && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader className="space-y-1.5 sm:space-y-2 border-b border-slate-200 pb-2 sm:pb-3">
              <div className="flex items-start gap-2 pr-10 sm:pr-12">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <DialogTitle
                    className="text-base sm:text-lg md:text-xl font-bold leading-tight wrap-break-word"
                    style={{
                      color: `rgb(${
                        selectedServiceData.hoverColor?.split(" ").join(", ") ||
                        "59, 130, 246"
                      })`,
                    }}>
                    {selectedServiceData.title}
                  </DialogTitle>
                  <div className="text-xl sm:text-2xl md:text-2xl shrink-0 ml-1 sm:ml-2">
                    {iconMap[selectedServiceData.id] || "📋"}
                  </div>
                </div>
              </div>
              <DialogDescription className="text-xs sm:text-sm wrap-break-word text-slate-600">
                Comprehensive {selectedServiceData.title.toLowerCase()}{" "}
                solutions tailored to your business needs
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4 w-full max-w-full">
              {/* Main Description */}
              <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 sm:mb-2">
                  Overview
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug wrap-break-word">
                  {selectedServiceData.description}
                </p>
              </div>

              {/* Key Offerings */}
              {selectedServiceData.offerings &&
                selectedServiceData.offerings.length > 0 && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 sm:mb-2.5">
                      Key Offerings
                    </h3>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {selectedServiceData.offerings.map((offering, index) => (
                        <li
                          key={index}
                          className="flex items-start text-xs sm:text-sm text-slate-700 leading-snug">
                          <span
                            className="mr-1.5 sm:mr-2 mt-1 shrink-0 text-sm"
                            style={{
                              color: `rgb(${
                                selectedServiceData.hoverColor
                                  ?.split(" ")
                                  .join(", ") || "59, 130, 246"
                              })`,
                            }}>
                            •
                          </span>
                          <span className="flex-1 wrap-break-word">
                            {offering}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Additional Details Section */}
              <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-lg p-2.5 sm:p-3 border border-slate-200">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 sm:mb-2">
                  Why Choose Us?
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-snug wrap-break-word mb-2 sm:mb-2.5">
                  Our team brings years of experience and expertise in
                  delivering high-quality solutions that drive business growth.
                  We combine cutting-edge technology with proven methodologies
                  to ensure your project's success.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-xs sm:text-sm">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700">
                      Proven track record
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-xs sm:text-sm">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700">
                      Scalable solutions
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-xs sm:text-sm">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700">
                      Expert team
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-xs sm:text-sm">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm text-slate-700">
                      24/7 support
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="pt-2 sm:pt-3 border-t border-slate-200">
                <p className="text-xs sm:text-sm text-slate-600 wrap-break-word text-center">
                  Ready to get started? Contact us using the contact form in the
                  footer to discuss your project requirements and receive a
                  customized quote.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
