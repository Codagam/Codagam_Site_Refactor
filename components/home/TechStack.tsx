"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isFullUrl } from "@/lib/utils/image-url";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      className="relative py-12 md:py-16 lg:pt-12 lg:pb-16 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/tech stack bg/Technology Stack & Capabilities.jpg"
          alt="Technology Stack background"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-section-bg/60" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-8 md:mb-12">
        Technology Stack & Capabilities
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-12 md:py-20">
            <p className="text-muted-foreground text-base md:text-lg">
              Loading tech stack...
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center py-12 md:py-20">
            <p className="text-muted-foreground text-base md:text-lg">
              No tech stack items available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group overflow-hidden w-full flex flex-col transition-all duration-300 hover:-translate-y-1 border-border hover:border-primary/20 rounded-lg md:rounded-xl">
                {/* Category Title with Gradient */}
                <CardHeader className="relative p-0">
                  <div className="relative px-3 md:px-4 pt-2 md:pt-2.5 pb-2 bg-linear-to-br from-primary via-primary-hover to-primary">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-primary-hover/90 group-hover:from-primary-hover/95 group-hover:to-primary/95 transition-opacity duration-300"></div>
                    <CardTitle className="relative text-sm md:text-base lg:text-lg font-bold text-white wrap-break-word text-center">
                      {category.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                {/* Capabilities List */}
                <CardContent className="flex flex-col p-1.5 md:p-2 gap-1 md:gap-1.5">
                  {category.capabilities.map((capability, index) => {
                    return (
                      <div
                        key={capability.id}
                        className={`flex flex-row items-center justify-between gap-2 md:gap-3 transition-colors duration-200 hover:bg-muted rounded-md p-1 ${
                          index < category.capabilities.length - 1
                            ? "border-b border-border pb-1"
                            : ""
                        }`}>
                        {/* Text Section - Always Left */}
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <h4 className="text-xs md:text-sm lg:text-base font-semibold text-foreground wrap-break-word leading-relaxed group-hover:text-primary transition-colors duration-200">
                            {capability.text}
                          </h4>
                        </div>
                        {/* Image Section - Always Right with Badge Style */}
                        <div className="shrink-0 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-md bg-muted border border-border p-1 group-hover:bg-primary-light group-hover:border-primary transition-all duration-200">
                          {capability.image ? (
                            isFullUrl(capability.image) ||
                            capability.image.startsWith("/") ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={capability.image}
                                  alt={capability.alt || capability.text}
                                  fill
                                  className="object-contain transition-transform duration-200 group-hover:scale-110"
                                  sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, 32px"
                                />
                              </div>
                            ) : (
                              <div className="text-xs md:text-sm font-semibold text-primary">
                                {capability.image}
                              </div>
                            )
                          ) : (
                            <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                              <span className="text-[8px] text-muted-foreground font-medium">
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
    </section>
  );
}
