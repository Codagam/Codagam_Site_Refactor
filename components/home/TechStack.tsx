"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isFullUrl } from "@/lib/utils/image-url";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

interface TechStackItem {
  id: string;
  iconUrl: string;
  name: string;
}

const ITEMS_PER_PAGE = 6;
const SWITCH_INTERVAL = 5000; // 5 seconds

export default function TechStack() {
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchTechStack = async () => {
      try {
        const response = await fetch("/api/tech-stack", { cache: "no-store" });
        const data = await response.json();

        if (response.ok) {
          const mappedItems: TechStackItem[] = data
            .filter(
              (
                item: unknown
              ): item is { id: string; name: string; iconUrl: string } =>
                typeof item === "object" &&
                item !== null &&
                "id" in item &&
                "name" in item &&
                "iconUrl" in item &&
                typeof (item as { id: unknown }).id === "string" &&
                typeof (item as { name: unknown }).name === "string" &&
                typeof (item as { iconUrl: unknown }).iconUrl === "string"
            )
            .map((item: { id: string; name: string; iconUrl: string }) => ({
              id: item.id,
              iconUrl: item.iconUrl || "",
              name: item.name,
            }));
          setTechStack(mappedItems);
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

  // Group items into pages of 6
  const totalPages = Math.ceil(techStack.length / ITEMS_PER_PAGE);
  const currentItems = techStack.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  // Auto-switch between pages
  useEffect(() => {
    if (totalPages <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
        setIsTransitioning(false);
      }, 300); // Half of transition duration
    }, SWITCH_INTERVAL);

    return () => clearInterval(timer);
  }, [totalPages]);

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
            ) : techStack.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
                <p className="text-black text-sm sm:text-base md:text-lg">
                  No tech stack items available.
                </p>
              </div>
            ) : (
              <div className="relative min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[260px] xl:min-h-[280px] flex flex-col justify-center">
                <div
                  className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-7 2xl:gap-8 w-full transition-opacity duration-500 ease-in-out ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}>
                  {currentItems.map((tech) => (
                    <div
                      key={tech.id}
                      className="bg-white p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 rounded-lg sm:rounded-xl md:rounded-2xl text-center border border-slate-200 transition-all hover:border-blue-900 hover:shadow-lg hover:scale-105 w-full flex flex-col items-center justify-center">
                      <div className="mb-3 sm:mb-4 md:mb-5 flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-[72px] xl:min-h-[80px] 2xl:min-h-[88px] w-full">
                        {tech.iconUrl &&
                          (isFullUrl(tech.iconUrl) ||
                          tech.iconUrl.startsWith("/") ? (
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 2xl:w-20 2xl:h-20">
                              <Image
                                src={tech.iconUrl}
                                alt={`${tech.name} icon`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 375px) 40px, (max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, (max-width: 1280px) 72px, (max-width: 1536px) 80px"
                              />
                            </div>
                          ) : (
                            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl">
                              {tech.iconUrl}
                            </div>
                          ))}
                      </div>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium m-0 text-black wrap-break-word w-full leading-tight">
                        {tech.name}
                      </p>
                    </div>
                  ))}
                  {/* Fill empty slots to maintain grid layout */}
                  {Array.from({
                    length: ITEMS_PER_PAGE - currentItems.length,
                  }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="hidden"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {/* Page indicators */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 sm:gap-2.5 md:gap-3 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsTransitioning(true);
                          setTimeout(() => {
                            setCurrentPage(index);
                            setIsTransitioning(false);
                          }, 300);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentPage === index
                            ? "w-8 bg-blue-900"
                            : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to page ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
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
