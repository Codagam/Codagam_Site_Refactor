"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isFullUrl } from "@/lib/utils/image-url";

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
                item: unknown,
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
                Array.isArray((item as { capabilities: unknown }).capabilities),
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
              }),
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
      className="relative w-full border-t border-(--border) py-4 sm:py-5 md:py-7 lg:py-9 px-4 sm:px-5 md:px-6 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw] scroll-mt-12 sm:scroll-mt-16 overflow-x-hidden font-sans"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13,22,90,.9) 0%, var(--bg-deep) 100%)",
      }}>
      <div className="relative z-10 mx-auto w-full min-w-0">
        <p className="mb-3 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30">
          <span
            className="h-px w-6 shrink-0 bg-(--acc2) opacity-40"
            aria-hidden
          />
          Tech stack
        </p>
        <h2 className="font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white mb-1.5 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Technology stack <em>&amp; capabilities.</em>
        </h2>
        <p className="text-base text-(--text-dim) leading-8 max-w-[540px] mt-2">
          Languages, frameworks, and tools we use to ship production software.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-5 sm:py-6 md:py-8">
            <p className="text-(--text-mid) text-base md:text-lg">
              Loading tech stack...
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center py-5 sm:py-6 md:py-8">
            <p className="text-(--text-mid) text-base md:text-lg">
              No tech stack items available.
            </p>
          </div>
        ) : (
          <div className="mt-3 sm:mt-5 md:mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-(--border) bg-(--border) sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const isReverse = index % 2 === 1; // 2nd, 4th, 6th... card: blue-100 default, hover dark
              return (
              <div
                key={category.id}
                className={`group flex flex-col border-0 rounded-none overflow-hidden min-w-0 transition-colors ${
                  isReverse
                    ? "bg-blue-100 hover:bg-[rgba(10,18,69,.95)]"
                    : "bg-[rgba(10,18,69,.95)] hover:bg-blue-100"
                }`}>
                {/* Category header */}
                <div className="px-3 sm:px-4 md:px-4 lg:px-5 pt-3 sm:pt-3.5 md:pt-4 pb-1.5 sm:pb-2 md:pb-2.5">
                  <span className={`inline-block rounded px-2 py-0.5 text-[.62rem] font-medium uppercase tracking-wide transition-colors ${
                    isReverse
                      ? "text-(--bg-deep) bg-blue-200/80 group-hover:bg-[rgba(91,141,238,.12)] group-hover:text-(--acc2)"
                      : "text-(--acc2) bg-[rgba(91,141,238,.12)] group-hover:bg-blue-200/80 group-hover:text-(--bg-deep)"
                  }`}>
                    {category.title}
                  </span>
                </div>
                {/* Capabilities list */}
                <ul className="flex flex-col px-3 sm:px-4 md:px-4 lg:px-5 pb-3 sm:pb-4 md:pb-5 lg:pb-6">
                  {category.capabilities.map((capability) => (
                    <li
                      key={capability.id}
                      className={`flex flex-row items-center justify-between gap-2 py-1.5 sm:py-2 last:border-0 transition-colors min-w-0 border-b ${
                        isReverse
                          ? "border-slate-200/80 group-hover:border-white/10"
                          : "border-white/10 group-hover:border-slate-200/80"
                      }`}>
                      <span className={`text-[.8rem] font-medium min-w-0 flex-1 wrap-break-word transition-colors ${
                        isReverse
                          ? "text-(--bg-deep) group-hover:text-(--text-hi)"
                          : "text-(--text-hi) group-hover:text-(--bg-deep)"
                      }`}>
                        {capability.text}
                      </span>
                      <div className="shrink-0 flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-lg bg-gray-200/90 dark:bg-gray-700/80 overflow-hidden">
                        {capability.image ? (
                          isFullUrl(capability.image) ||
                          capability.image.startsWith("/") ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={capability.image}
                                alt={capability.alt || capability.text}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 20px, (max-width: 768px) 24px, 24px"
                              />
                            </div>
                          ) : (
                            <span className={`text-[.65rem] font-semibold transition-colors ${
                              isReverse
                                ? "text-(--bg-deep) group-hover:text-(--acc2)"
                                : "text-(--acc2) group-hover:text-(--bg-deep)"
                            }`}>
                              {capability.image}
                            </span>
                          )
                        ) : (
                          <span className={`text-[.6rem] font-medium transition-colors ${
                            isReverse
                              ? "text-slate-500 group-hover:text-white/40"
                              : "text-white/40 group-hover:text-slate-500"
                          }`}>
                            ?
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
