"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isFullUrl } from "@/lib/utils/image-url";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] flex flex-col justify-center py-6 sm:py-7 md:py-8 lg:py-8 xl:py-10 2xl:py-12 bg-slate-50 scroll-mt-[56px] min-[375px]:scroll-mt-[60px] sm:scroll-mt-[64px] md:scroll-mt-[68px] lg:scroll-mt-[72px] xl:scroll-mt-[76px] 2xl:scroll-mt-[80px] w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col w-full">
          {/* Tech Stack Section */}
          <div className="w-full mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-7 2xl:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl mb-3 sm:mb-3.5 md:mb-4 lg:mb-4 xl:mb-4.5 2xl:mb-5 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 2xl:gap-5 w-full">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className="group overflow-hidden w-full flex flex-col  transition-all duration-300 hover:-translate-y-1 border-slate-200 hover:border-blue-900/20 rounded-lg sm:rounded-xl">
                    {/* Category Title with Gradient */}
                    <CardHeader className="relative p-0">
                      <div className="relative px-3 sm:px-3.5 md:px-4 lg:px-4 xl:px-4 2xl:px-5 pt-2 sm:pt-2.5 md:pt-2.5 lg:pt-3 xl:pt-3 2xl:pt-3.5 pb-2 sm:pb-2 md:pb-2 lg:pb-2.5 xl:pb-2.5 2xl:pb-3 bg-linear-to-br from-blue-900 via-blue-800 to-blue-900">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-900/90 to-blue-800/90 group-hover:from-blue-800/95 group-hover:to-blue-700/95 transition-opacity duration-300"></div>
                        <CardTitle className="relative text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-bold text-white wrap-break-word text-center ">
                          {category.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    {/* Capabilities List */}
                    <CardContent className="flex flex-col p-1.5 sm:p-2 md:p-2 lg:p-2.5 xl:p-2.5 2xl:p-2.5 gap-1 sm:gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-1.5 2xl:gap-1.5">
                      {category.capabilities.map((capability, index) => {
                        return (
                          <div
                            key={capability.id}
                            className={`flex flex-row items-center justify-between gap-1.5 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2 transition-colors duration-200 hover:bg-slate-50 rounded-md p-0.5 sm:p-1 md:p-1 lg:p-1 xl:p-1 2xl:p-1 ${
                              index < category.capabilities.length - 1
                                ? "border-b border-slate-100 pb-1 sm:pb-1 md:pb-1 lg:pb-1 xl:pb-1 2xl:pb-1"
                                : ""
                            }`}>
                            {/* Text Section - Always Left */}
                            <div className="flex-1 flex flex-col justify-center min-w-0">
                              <h4 className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base font-semibold text-slate-800 wrap-break-word leading-relaxed group-hover:text-blue-900 transition-colors duration-200">
                                {capability.text}
                              </h4>
                            </div>
                            {/* Image Section - Always Right with Badge Style */}
                            <div className="shrink-0 flex items-center justify-center w-[20px] sm:w-[22px] md:w-[24px] lg:w-[24px] xl:w-[26px] 2xl:w-[28px] h-[20px] sm:h-[22px] md:h-[24px] lg:h-[24px] xl:h-[26px] 2xl:h-[28px] rounded-md bg-slate-50 border border-slate-100 p-1 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200">
                              {capability.image ? (
                                isFullUrl(capability.image) ||
                                capability.image.startsWith("/") ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={capability.image}
                                      alt={capability.alt || capability.text}
                                      fill
                                      className="object-contain transition-transform duration-200 group-hover:scale-110"
                                      sizes="(max-width: 640px) 20px, (max-width: 768px) 22px, (max-width: 1024px) 24px, (max-width: 1280px) 24px, (max-width: 1536px) 26px, 28px"
                                    />
                                  </div>
                                ) : (
                                  <div className="text-[10px] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-sm font-semibold text-blue-900">
                                    {capability.image}
                                  </div>
                                )
                              ) : (
                                <div className="w-full h-full bg-slate-200 rounded flex items-center justify-center">
                                  <span className="text-[8px] text-slate-500 font-medium">
                                    ?
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
