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
    "healthcare-tech": "🏥",
    "hyperlocal-solutions": "🌍",
    "ai-automation": "🤖",
    "fullstack-dev": "🛠️",
    "api-integration": "🔌",
    consulting: "📊",
  };

  return (
    <section
      id="services"
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-slate-50 scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden relative isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full h-full flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 text-center font-bold text-blue-900 break-words px-2 sm:px-0">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 w-full max-w-full">
          {servicesGalleryItems.map((service) => {
            const hoverColor = service.hoverColor || "30 58 138";
            const icon = iconMap[service.id] || "📋";
            const rgbValues = hoverColor.split(" ").join(", ");

            return (
              <div
                key={service.id}
                className="service-card-group group relative bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-transparent transition-all duration-300 hover:shadow-2xl cursor-pointer h-full flex flex-col w-full max-w-full break-words"
                onClick={() => handleButtonClick(service.id)}>
                {/* Diagonal color fill from bottom-left */}
                <div
                  className="service-card-hover"
                  style={{
                    backgroundColor: `rgb(${rgbValues})`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-5 md:p-6 lg:p-7 flex flex-col grow">
                  {/* Icon */}
                  <div className="mb-3 sm:mb-4 md:mb-5">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl md:text-3xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `rgba(${rgbValues}, 0.1)`,
                      }}>
                      {icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 md:mb-5 text-blue-900 group-hover:text-white transition-colors duration-300 break-words">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm md:text-base text-slate-600 group-hover:text-white/90 leading-relaxed mb-4 sm:mb-5 md:mb-6 line-clamp-4 transition-colors duration-300 grow break-words">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-900 group-hover:text-white transition-all duration-300 mt-auto">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Details Dialog */}
      {selectedServiceData && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto w-full">
            <DialogHeader className="space-y-2 sm:space-y-3">
              <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight wrap-break-word text-black">
                {selectedServiceData.title}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm md:text-base wrap-break-word text-slate-600">
                Learn more about our {selectedServiceData.title.toLowerCase()}{" "}
                services
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 mt-4 sm:mt-6 w-full max-w-full">
              <p className="text-black leading-relaxed text-sm sm:text-base md:text-lg wrap-break-word">
                {selectedServiceData.description}
              </p>
              <div className="pt-2 sm:pt-4">
                <p className="text-xs sm:text-sm md:text-base text-slate-600 wrap-break-word">
                  For more information about this service, please contact us
                  using the contact form in the footer.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
