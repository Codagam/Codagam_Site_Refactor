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
          <div className="w-full mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-14 2xl:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl mb-6 sm:mb-8 md:mb-8 lg:mb-8 xl:mb-10 2xl:mb-10 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-7 2xl:gap-8 w-full">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-white rounded-xl border border-slate-200 transition-all hover:border-blue-900 hover:shadow-lg overflow-hidden w-full flex flex-col">
                    {/* Category Title */}
                    <div className="px-3 sm:px-4 md:px-4 lg:px-5 xl:px-5 2xl:px-6 pt-3 sm:pt-4 md:pt-4 lg:pt-5 xl:pt-5 2xl:pt-6 pb-2 sm:pb-3 md:pb-3 lg:pb-3 xl:pb-3 2xl:pb-4 border-b border-slate-200">
                      <h3 className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-semibold text-blue-900 wrap-break-word text-center">
                        {category.title}
                      </h3>
                    </div>
                    {/* Capabilities List */}
                    <div className="flex flex-col p-3 sm:p-4 md:p-4 lg:p-5 xl:p-5 2xl:p-6 gap-2 sm:gap-2.5 md:gap-2.5 lg:gap-3 xl:gap-3 2xl:gap-3">
                      {category.capabilities.map((capability, index) => {
                        return (
                          <div
                            key={capability.id}
                            className={`flex flex-row items-center justify-between gap-2 sm:gap-2.5 md:gap-2.5 lg:gap-3 xl:gap-3 2xl:gap-3 ${
                              index < category.capabilities.length - 1
                                ? "pb-1.5 sm:pb-2 md:pb-2 lg:pb-2.5 xl:pb-2.5 2xl:pb-2.5 border-b border-slate-100"
                                : ""
                            }`}>
                            {/* Text Section - Always Left */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                              <h4 className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-medium text-black wrap-break-word leading-snug">
                                {capability.text}
                              </h4>
                            </div>
                            {/* Image Section - Always Right */}
                            <div className="shrink-0 flex items-center justify-center w-[20px] sm:w-[22px] md:w-[24px] lg:w-[24px] xl:w-[26px] 2xl:w-[28px] h-[20px] sm:h-[22px] md:h-[24px] lg:h-[24px] xl:h-[26px] 2xl:h-[28px]">
                              {capability.image ? (
                                isFullUrl(capability.image) ||
                                capability.image.startsWith("/") ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={capability.image}
                                      alt={capability.alt || capability.text}
                                      fill
                                      className="object-contain"
                                      sizes="(max-width: 640px) 20px, (max-width: 768px) 22px, (max-width: 1024px) 24px, (max-width: 1280px) 24px, (max-width: 1536px) 26px, 28px"
                                    />
                                  </div>
                                ) : (
                                  <div className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base">
                                    {capability.image}
                                  </div>
                                )
                              ) : (
                                <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center">
                                  <span className="text-[8px] text-slate-400">
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
            className="w-full flex flex-col justify-center pt-8 sm:pt-10 md:pt-12 lg:pt-12 xl:pt-14 2xl:pt-14 border-t border-slate-200">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-10 xl:mb-12 2xl:mb-12 w-full">
              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl mb-4 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 2xl:mb-6 font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
                Join our team
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 md:px-8 lg:px-8 wrap-break-word mb-6 sm:mb-8 md:mb-8 lg:mb-8 xl:mb-10 2xl:mb-10">
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
