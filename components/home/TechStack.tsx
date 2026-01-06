"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isFullUrl } from "@/lib/utils/image-url";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

interface Capability {
  id: string;
  text: string;
  image: string;
  icon: string;
  alt: string;
}

interface TechStackCategory {
  id: string;
  title: string;
  position: number;
  capabilities: Capability[];
}

export default function TechStack() {
  const [categories, setCategories] = useState<TechStackCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const response = await fetch("/api/tech-stack", { cache: "no-store" });
        const data = await response.json();

        if (response.ok) {
          const mappedCategories: TechStackCategory[] = data
            .filter(
              (
                item: unknown
              ): item is {
                id: string;
                title: string;
                position: number;
                capabilities: Capability[];
              } =>
                typeof item === "object" &&
                item !== null &&
                "id" in item &&
                "title" in item &&
                "capabilities" in item &&
                typeof (item as { id: unknown }).id === "string" &&
                typeof (item as { title: unknown }).title === "string" &&
                Array.isArray((item as { capabilities: unknown }).capabilities)
            )
            .map(
              (item: {
                id: string;
                title: string;
                position: number;
                capabilities: Capability[];
              }) => ({
                id: item.id,
                title: item.title,
                position: item.position || 0,
                capabilities: item.capabilities || [],
              })
            );
          setCategories(mappedCategories);
        } else {
          console.error("API error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching tech stack:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStack();
  }, []);

  return (
    <section
      id="stack"
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-12 xl:py-14 2xl:py-16 bg-slate-50 scroll-mt-[56px] min-[375px]:scroll-mt-[60px] sm:scroll-mt-[64px] md:scroll-mt-[68px] lg:scroll-mt-[72px] xl:scroll-mt-[76px] 2xl:scroll-mt-[80px] w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col w-full">
          {/* Tech Stack Section */}
          <div className="w-full mb-6 sm:mb-7 md:mb-8 lg:mb-8 xl:mb-9 2xl:mb-10">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl mb-4 sm:mb-5 md:mb-5 lg:mb-6 xl:mb-6 2xl:mb-7 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
              Our Tech Stack
            </h2>
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
                <p className="text-black text-sm sm:text-base md:text-lg">
                  Loading tech stack...
                </p>
              </div>
            ) : categories.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
                <p className="text-black text-sm sm:text-base md:text-lg">
                  No tech stack items available.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-3.5 md:gap-4 lg:gap-4 xl:gap-4.5 2xl:gap-5 w-full">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-lg sm:rounded-xl border border-slate-200 transition-all hover:border-blue-900 hover:shadow-md overflow-hidden w-full flex flex-col">
                    {/* Category Title */}
                    <div className="px-2.5 sm:px-3 md:px-3 lg:px-3.5 xl:px-4 2xl:px-4 pt-2 sm:pt-2.5 md:pt-3 lg:pt-3 xl:pt-3.5 2xl:pt-4 pb-1.5 sm:pb-2 md:pb-2 lg:pb-2 xl:pb-2.5 2xl:pb-2.5 border-b border-slate-200">
                      <h3 className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-semibold text-blue-900 wrap-break-word text-center">
                        {category.title}
                      </h3>
                    </div>
                    {/* Capabilities List */}
                    <div className="flex flex-col p-2 sm:p-2.5 md:p-2.5 lg:p-3 xl:p-3 2xl:p-3.5 gap-1 sm:gap-1.5 md:gap-1.5 lg:gap-2 xl:gap-2 2xl:gap-2">
                      {category.capabilities.map((capability, index) => {
                        return (
                          <div
                            key={capability.id}
                            className={`flex flex-row items-center justify-between gap-1.5 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2.5 2xl:gap-2.5 ${
                              index < category.capabilities.length - 1
                                ? "pb-1 sm:pb-1.5 md:pb-1.5 lg:pb-2 xl:pb-2 2xl:pb-2 border-b border-slate-100"
                                : ""
                            }`}>
                            {/* Text Section - Always Left */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                              <h4 className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-medium text-black wrap-break-word leading-snug">
                                {capability.text}
                              </h4>
                            </div>
                            {/* Image Section - Always Right */}
                            <div className="shrink-0 flex items-center justify-center w-[16px] sm:w-[18px] md:w-[20px] lg:w-[20px] xl:w-[22px] 2xl:w-[24px] h-[16px] sm:h-[18px] md:h-[20px] lg:h-[20px] xl:h-[22px] 2xl:h-[24px]">
                              {capability.image ? (
                                isFullUrl(capability.image) ||
                                capability.image.startsWith("/") ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={capability.image}
                                      alt={capability.alt || capability.text}
                                      fill
                                      className="object-contain"
                                      sizes="(max-width: 640px) 16px, (max-width: 768px) 18px, (max-width: 1024px) 20px, (max-width: 1280px) 20px, (max-width: 1536px) 22px, 24px"
                                    />
                                  </div>
                                ) : (
                                  <div className="text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-sm">
                                    {capability.image}
                                  </div>
                                )
                              ) : (
                                <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center">
                                  <span className="text-[7px] text-slate-400">
                                    No image
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Career Section - Shows below Tech Stack on all devices */}
          <div
            id="career-section"
            className="w-full flex flex-col justify-center pt-6 sm:pt-7 md:pt-8 lg:pt-8 xl:pt-9 2xl:pt-10 border-t border-slate-200">
            <div className="text-center mb-5 sm:mb-6 md:mb-7 lg:mb-7 xl:mb-8 2xl:mb-9 w-full">
              <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-3 sm:mb-3.5 md:mb-4 lg:mb-4 xl:mb-4.5 2xl:mb-5 font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
                Join our team
              </h2>
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 md:px-8 lg:px-8 wrap-break-word mb-5 sm:mb-6 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9">
                We&apos;re looking for passionate individuals who want to build
                the future of technology. Join us in creating innovative
                solutions that make a real impact.
              </p>
            </div>
            <div className="flex justify-center w-full">
              <CareerApplicationForm
                asDialog={true}
                triggerText="Apply Now"
                triggerVariant="black"
                triggerSize="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
