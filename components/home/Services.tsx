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
      className="bg-section-bg py-12 md:py-16 lg:pt-12 lg:pb-16 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-8 md:mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesGalleryItems.map((service) => {
            const IconComponent = iconMap[service.id] || Target;
            const hoverColor = service.hoverColor || "bg-primary";
            // Extract color from Tailwind class for button text color
            // Handle both standard classes (bg-blue-600) and arbitrary values (bg-[rgb(...)])
            const bgMatch = hoverColor.match(/bg-(.+)/);
            let textColorClass = "text-primary"; // default
            if (bgMatch) {
              const colorValue = bgMatch[1];
              // If it's a standard Tailwind class (e.g., blue-600), convert to text class
              if (!colorValue.startsWith('[')) {
                textColorClass = `text-${colorValue}`;
              } else {
                // If it's an arbitrary value, extract RGB
                const rgbMatch = colorValue.match(/rgb\((\d+),(\d+),(\d+)\)/);
                if (rgbMatch) {
                  textColorClass = `text-[rgb(${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]})]`;
                }
              }
            }

            return (
              <Card
                key={service.id}
                className={`service-card-group group relative overflow-hidden border-transparent transition-all duration-300 cursor-pointer h-full flex flex-col w-full max-w-full wrap-break-word rounded-xl ${hoverColor}`}
                onClick={() => handleButtonClick(service.id)}>
                {/* Icon without background - positioned at top-right */}
                <div 
                  className="service-icon-bg absolute top-0 right-0 flex items-center justify-center z-30 p-2">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                </div>

                {/* Content */}
                <CardContent className="relative z-10 p-3 md:p-4 lg:p-5 flex flex-col grow">
                  {/* Title */}
                  <CardHeader className="p-0 mb-2 pr-10 md:pr-12">
                    <CardTitle className="text-base md:text-lg lg:text-xl font-bold mb-0 text-white wrap-break-word leading-tight">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/95 leading-relaxed mb-2 md:mb-2.5 line-clamp-4 wrap-break-word font-medium">
                    {service.description}
                  </p>

                  {/* Offerings/Bullet Points */}
                  {service.offerings && service.offerings.length > 0 && (
                    <ul className="space-y-1.5 md:space-y-2 flex-1 mb-2 md:mb-2.5">
                      {service.offerings.map((offering, index) => (
                        <li
                          key={index}
                          className="text-xs md:text-sm text-white/95 leading-relaxed flex items-start">
                          <span className="text-white mr-2 mt-1 shrink-0 text-xs font-bold">
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
                  <Button
                    className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 h-auto rounded-lg transition-all duration-300 mt-auto w-fit hover:scale-105 hover:opacity-90 bg-background hover:bg-background/90 ${textColorClass}`}
                    variant="ghost"
                    size="sm">
                    <span className="font-semibold">Learn more</span>
                    <ArrowRight 
                      className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-2 ${textColorClass}`}
                    />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Service Details Dialog */}
      {selectedServiceData && (() => {
        const dialogHoverColor = selectedServiceData.hoverColor || "bg-primary";
        // Extract color from Tailwind class for dialog text color
        const dialogBgMatch = dialogHoverColor.match(/bg-(.+)/);
        let dialogTextColorClass = "text-blue-600"; // default
        if (dialogBgMatch) {
          const colorValue = dialogBgMatch[1];
          // If it's a standard Tailwind class (e.g., blue-600), convert to text class
          if (!colorValue.startsWith('[')) {
            dialogTextColorClass = `text-${colorValue}`;
          } else {
            // If it's an arbitrary value, extract RGB
            const rgbMatch = colorValue.match(/rgb\((\d+),(\d+),(\d+)\)/);
            if (rgbMatch) {
              dialogTextColorClass = `text-[rgb(${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]})]`;
            }
          }
        }
        
        return (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 md:p-5 rounded-xl md:rounded-2xl max-h-[90vh] overflow-y-auto w-full">
              <DialogHeader className="space-y-2 border-b border-border pb-3">
                <div className="flex items-start gap-2 pr-12">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <DialogTitle
                      className={`text-lg md:text-xl font-bold leading-tight wrap-break-word ${dialogTextColorClass}`}>
                      {selectedServiceData.title}
                    </DialogTitle>
                    {(() => {
                      const DialogIcon = iconMap[selectedServiceData.id] || Target;
                      return (
                        <DialogIcon
                          className={`w-6 h-6 md:w-7 md:h-7 shrink-0 ml-2 ${dialogTextColorClass}`}
                        />
                      );
                    })()}
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription className="text-sm wrap-break-word text-foreground leading-relaxed">
                Comprehensive {selectedServiceData.title.toLowerCase()}{" "}
                solutions tailored to your business needs
              </DialogDescription>
            <div className="space-y-4 mt-4 w-full max-w-full">
              {/* Main Description */}
              <div className="bg-muted rounded-lg p-3">
                <h3 className="text-sm font-bold text-foreground mb-2">
                  Overview
                </h3>
                <p className="text-sm text-foreground leading-relaxed wrap-break-word font-medium">
                  {selectedServiceData.description}
                </p>
              </div>

              {/* Key Offerings */}
              {selectedServiceData.offerings &&
                selectedServiceData.offerings.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-2.5">
                      Key Offerings
                    </h3>
                    <ul className="space-y-2">
                      {selectedServiceData.offerings.map((offering, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-foreground leading-relaxed">
                          <span
                            className={`mr-2 mt-1 shrink-0 text-sm font-bold ${dialogTextColorClass}`}>
                            •
                          </span>
                          <span className="flex-1 wrap-break-word font-medium">
                            {offering}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Additional Details Section */}
              <div className="bg-linear-to-br from-muted to-muted rounded-lg p-3 border border-border">
                <h3 className="text-sm font-bold text-foreground mb-2">
                  Why Choose Us?
                </h3>
                <p className="text-sm text-foreground leading-relaxed wrap-break-word mb-2.5 font-medium">
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
                    <span className="text-sm text-foreground font-medium">
                      Proven track record
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-foreground font-medium">
                      Scalable solutions
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-foreground font-medium">
                      Expert team
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-600 mr-1 mt-0.5 text-sm">
                      ✓
                    </span>
                    <span className="text-sm text-foreground font-medium">
                      24/7 support
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-foreground wrap-break-word text-center leading-relaxed font-medium">
                  Ready to get started? Contact us using the contact form in the
                  footer to discuss your project requirements and receive a
                  customized quote.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        );
      })()}
    </section>
  );
}
