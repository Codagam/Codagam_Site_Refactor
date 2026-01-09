"use client";

import { useState } from "react";
import { 
  ArrowRight, 
  Code, 
  HeartPulse, 
  Cloud, 
  BarChart3, 
  Brain,
  Target
} from "lucide-react";
import { servicesGalleryItems } from "@/lib/content/services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

  const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
    "custom-software-development": Code,
    "healthcare-technology": HeartPulse,
    "cloud-architecture-devops": Cloud,
    "data-analytics-bi": BarChart3,
    "ai-ml-integration": Brain,
    "secondary-services": Target,
  };

  return (
    <section
      id="services"
      className="min-h-screen flex flex-col pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8 lg:pb-12 bg-slate-50 scroll-mt-14 sm:scroll-mt-16 md:scroll-mt-18 w-full relative isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-6 md:mb-8 text-center font-bold text-blue-900 break-words px-4">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {servicesGalleryItems.map((service) => {
            const hoverColor = service.hoverColor || "30 58 138";
            const IconComponent = iconMap[service.id] || Target;
            const rgbValues = hoverColor.split(" ").join(", ");

            return (
              <Card
                key={service.id}
                className="service-card-group group relative overflow-hidden border-slate-200 hover:border-transparent transition-all duration-300 cursor-pointer h-full flex flex-col w-full max-w-full break-words rounded-xl"
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
                  className="service-icon-bg absolute top-0 right-0 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-tr-xl rounded-bl-xl z-30"
                  style={{
                    backgroundColor: `rgb(${rgbValues})`,
                  }}>
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                </div>

                {/* Content */}
                <CardContent className="relative z-10 p-3 md:p-4 lg:p-5 flex flex-col grow">
                  {/* Title */}
                  <CardHeader className="p-0 mb-2 pr-12 md:pr-16">
                    <CardTitle className="text-base md:text-lg lg:text-xl font-bold mb-0 text-blue-900 group-hover:text-white transition-colors duration-300 break-words leading-tight">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  {/* Description */}
                  <p className="text-sm md:text-base text-slate-700 group-hover:text-white/95 leading-relaxed mb-2 md:mb-2.5 line-clamp-4 transition-colors duration-300 break-words font-medium">
                    {service.description}
                  </p>

                  {/* Offerings/Bullet Points */}
                  {service.offerings && service.offerings.length > 0 && (
                    <ul className="space-y-1.5 md:space-y-2 flex-1 mb-2 md:mb-2.5">
                      {service.offerings.map((offering, index) => (
                        <li
                          key={index}
                          className="text-xs md:text-sm text-slate-700 group-hover:text-white/95 leading-relaxed flex items-start transition-colors duration-300">
                          <span className="text-slate-900 group-hover:text-white mr-2 mt-1 shrink-0 text-xs font-bold transition-colors duration-300">
                            •
                          </span>
                          <span className="flex-1 break-words">
                            {offering}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Button
                    className="flex items-center gap-2 text-sm md:text-base font-semibold text-white px-4 py-2 h-auto rounded-lg transition-all duration-300 mt-auto w-fit hover:scale-105 hover:opacity-90"
                    style={{
                      backgroundColor: `rgb(${rgbValues})`,
                      '--btn-color': `rgb(${rgbValues})`,
                    } as React.CSSProperties & { '--btn-color': string }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `rgb(${rgbValues})`;
                    }}
                    variant="ghost"
                    size="sm">
                    <span className="font-semibold">Learn more</span>
                    <ArrowRight 
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 text-white" 
                    />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Service Details Dialog */}
      {selectedServiceData && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 md:p-5 rounded-xl md:rounded-2xl max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader className="space-y-2 border-b border-slate-200 pb-3">
              <div className="flex items-start gap-2 pr-12">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <DialogTitle
                    className="text-lg md:text-xl font-bold leading-tight break-words"
                    style={{
                      color: `rgb(${
                        selectedServiceData.hoverColor?.split(" ").join(", ") ||
                        "59, 130, 246"
                      })`,
                    }}>
                    {selectedServiceData.title}
                  </DialogTitle>
                  {(() => {
                    const DialogIcon = iconMap[selectedServiceData.id] || Target;
                    return (
                      <DialogIcon
                        className="w-6 h-6 md:w-7 md:h-7 shrink-0 ml-2"
                        style={{
                          color: `rgb(${
                            selectedServiceData.hoverColor?.split(" ").join(", ") ||
                            "59, 130, 246"
                          })`,
                        }}
                      />
                    );
                  })()}
                </div>
              </div>
              <DialogDescription className="text-sm break-words text-slate-700 leading-relaxed">
                Comprehensive {selectedServiceData.title.toLowerCase()}{" "}
                solutions tailored to your business needs
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4 w-full max-w-full">
              {/* Main Description */}
              <div className="bg-slate-50 rounded-lg p-3">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Overview
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed break-words font-medium">
                  {selectedServiceData.description}
                </p>
              </div>

              {/* Key Offerings */}
              {selectedServiceData.offerings &&
                selectedServiceData.offerings.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2.5">
                      Key Offerings
                    </h3>
                    <ul className="space-y-2">
                      {selectedServiceData.offerings.map((offering, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-slate-700 leading-relaxed">
                          <span
                            className="mr-2 mt-1 shrink-0 text-sm font-bold"
                            style={{
                              color: `rgb(${
                                selectedServiceData.hoverColor
                                  ?.split(" ")
                                  .join(", ") || "59, 130, 246"
                              })`,
                            }}>
                            •
                          </span>
                          <span className="flex-1 break-words font-medium">
                            {offering}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Additional Details Section */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Why Choose Us?
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed break-words mb-2.5 font-medium">
                  Our team brings years of experience and expertise in
                  delivering high-quality solutions that drive business growth.
                  We combine cutting-edge technology with proven methodologies
                  to ensure your project's success.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-slate-700 font-medium">
                      Proven track record
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-slate-700 font-medium">
                      Scalable solutions
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-slate-700 font-medium">
                      Expert team
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-slate-700 font-medium">
                      24/7 support
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-sm text-slate-700 break-words text-center leading-relaxed font-medium">
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
