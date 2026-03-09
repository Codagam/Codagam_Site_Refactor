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
      className="relative border-t border-(--border) py-28 px-[5vw] scroll-mt-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13,22,90,.9) 0%, var(--bg-deep) 100%)",
      }}>
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <p className="mb-4 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30">
          <span
            className="h-px w-6 shrink-0 bg-(--acc2) opacity-40"
            aria-hidden
          />
          Tech stack
        </p>
        <h2 className="font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white mb-2 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Technology stack <em>&amp; capabilities.</em>
        </h2>
        <p className="text-base text-(--text-dim) leading-8 max-w-[540px] mt-3">
          Languages, frameworks, and tools we use to ship production software.
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-16 md:py-20">
            <p className="text-(--text-mid) text-base md:text-lg">
              Loading tech stack...
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center items-center py-16 md:py-20">
            <p className="text-(--text-mid) text-base md:text-lg">
              No tech stack items available.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-(--border) bg-(--border) sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group flex flex-col bg-[rgba(10,18,69,.95)] transition-colors hover:bg-blue-100 border-0 rounded-none overflow-hidden">
                {/* Category header - same pill/accent style as service cards */}
                <div className="px-8 pt-8 pb-4">
                  <span className="inline-block rounded px-2.5 py-1 text-[.68rem] font-medium uppercase tracking-wide text-(--acc2) bg-[rgba(91,141,238,.12)] group-hover:bg-blue-200/80 group-hover:text-(--bg-deep) transition-colors">
                    {category.title}
                  </span>
                </div>
                {/* Capabilities list */}
                <ul className="flex flex-col px-8 pb-8">
                  {category.capabilities.map((capability) => (
                    <li
                      key={capability.id}
                      className="flex flex-row items-center justify-between gap-3 border-b border-white/10 group-hover:border-slate-200 py-3.5 last:border-0 transition-colors">
                      <span className="text-[.88rem] font-medium text-(--text-hi) group-hover:text-(--bg-deep) min-w-0 flex-1 transition-colors">
                        {capability.text}
                      </span>
                      <div className="shrink-0 flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-md">
                        {capability.image ? (
                          isFullUrl(capability.image) ||
                          capability.image.startsWith("/") ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={capability.image}
                                alt={capability.alt || capability.text}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 24px, (max-width: 768px) 28px, 32px"
                              />
                            </div>
                          ) : (
                            <span className="text-[.7rem] font-semibold text-(--acc2) group-hover:text-(--bg-deep) transition-colors">
                              {capability.image}
                            </span>
                          )
                        ) : (
                          <span className="text-[.65rem] text-white/40 group-hover:text-slate-500 font-medium transition-colors">
                            ?
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
