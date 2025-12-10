"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isFullUrl } from "@/lib/utils/image-url";

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
            .filter((item: unknown): item is { id: string; name: string; iconUrl: string } =>
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
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-slate-50 scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full">
        <h2 className="text-lg min-[375px]:text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 md:mb-8 text-center font-bold text-blue-900  wrap-break-word px-2 sm:px-0">
          Our Tech Stack
        </h2>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-black">Loading tech stack...</p>
          </div>
        ) : techStack.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-black">No tech stack items available.</p>
          </div>
        ) : (
          <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 min-[375px]:gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full transition-opacity duration-500 ease-in-out ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}>
              {currentItems.map((tech) => (
                <div
                  key={tech.id}
                  className="bg-white p-4 sm:p-6 md:p-8 rounded-xl text-center border border-slate-200 transition-all hover:border-blue-900 hover:-translate-y-1 hover:shadow-md w-full max-w-full flex flex-col items-center justify-center">
                  <div className="mb-2 sm:mb-3 flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-[80px]">
                    {tech.iconUrl &&
                      (isFullUrl(tech.iconUrl) ||
                      tech.iconUrl.startsWith("/") ? (
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20">
                          <Image
                            src={tech.iconUrl}
                            alt={`${tech.name} icon`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, (max-width: 1024px) 64px, 80px"
                          />
                        </div>
                      ) : (
                        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                          {tech.iconUrl}
                        </div>
                      ))}
                  </div>
                  <p className="text-xs sm:text-sm md:text-[15px] font-medium m-0 text-black">
                    {tech.name}
                  </p>
                </div>
              ))}
              {/* Fill empty slots to maintain grid layout */}
              {Array.from({ length: ITEMS_PER_PAGE - currentItems.length }).map(
                (_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="hidden"
                    aria-hidden="true"
                  />
                )
              )}
            </div>
            {/* Page indicators */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
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
    </section>
  );
}
