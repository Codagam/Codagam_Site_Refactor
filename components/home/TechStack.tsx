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
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-slate-50 scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col w-full">
          {/* Tech Stack Section */}
          <div className="w-full mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 text-center font-bold text-blue-900 break-words px-2 sm:px-0">
              Our Tech Stack
            </h2>
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-black">Loading tech stack...</p>
              </div>
            ) : techStack.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-black">No tech stack items available.</p>
              </div>
            ) : (
              <div className="relative min-h-[180px] sm:min-h-[200px] md:min-h-[220px] lg:min-h-[240px] flex flex-col justify-center">
                <div
                  className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 w-full transition-opacity duration-500 ease-in-out ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}>
                  {currentItems.map((tech) => (
                    <div
                      key={tech.id}
                      className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl text-center border border-slate-200 transition-all hover:border-blue-900 hover:shadow-lg hover:scale-105 w-full flex flex-col items-center justify-center">
                      <div className="mb-2 sm:mb-2.5 md:mb-3 flex items-center justify-center min-h-[40px] sm:min-h-[48px] md:min-h-[56px] lg:min-h-[64px] xl:min-h-[72px] w-full">
                        {tech.iconUrl &&
                          (isFullUrl(tech.iconUrl) ||
                          tech.iconUrl.startsWith("/") ? (
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16">
                              <Image
                                src={tech.iconUrl}
                                alt={`${tech.name} icon`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 375px) 32px, (max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
                              />
                            </div>
                          ) : (
                            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                              {tech.iconUrl}
                            </div>
                          ))}
                      </div>
                      <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium m-0 text-black break-words w-full leading-tight">
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
                  <div className="flex justify-center gap-2 sm:gap-2.5 md:gap-3 mt-4 sm:mt-5 md:mt-6 lg:mt-8">
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
            className="w-full flex flex-col justify-center pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 border-t border-slate-200">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 w-full">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 font-bold text-blue-900 break-words px-2 sm:px-0">
                Join our team
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-6 md:px-8 break-words mb-6 sm:mb-8 md:mb-10">
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
