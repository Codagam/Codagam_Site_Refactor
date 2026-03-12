"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/content/services";

export default function ServiceCards() {
  return (
    <section
      id="services"
      className="relative border-t border-(--border) w-full py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-5 md:px-6 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw] scroll-mt-12 sm:scroll-mt-16 font-sans overflow-x-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13,22,90,.9) 0%, var(--bg-deep) 100%)",
      }}>
      <div className="mx-auto w-full min-w-0">
        <p className="mb-2 sm:mb-3 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30">
          <span
            className="h-px w-6 shrink-0 bg-(--acc2) opacity-40"
            aria-hidden
          />
          What we build
        </p>
        <h2 className="font-sans text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white mb-1.5 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Engineering that <em>ships</em> and <em>scales.</em>
        </h2>
        <p className="text-base text-(--text-dim) leading-8 max-w-[540px] mt-2">
          Outcome-focused engineering across three core practice areas. Every
          engagement starts with understanding your actual problem — not fitting
          you into a template.
        </p>

        <div className="mt-3 sm:mt-5 md:mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-(--border) bg-(--border) sm:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="service-card-group group relative flex flex-col items-start bg-[rgba(10,18,69,.95)] p-4 sm:p-5 md:p-6 lg:p-8 pr-5 sm:pr-6 md:pr-8 text-left transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-(--acc2) focus:ring-offset-2 focus:ring-offset-(--bg-deep) min-w-0 overflow-hidden">
              {service.cardImage && (
                <span
                  className="service-icon-bg pointer-events-none absolute right-0 top-0 h-28 w-32 sm:h-32 sm:w-40 md:h-36 md:w-44"
                  aria-hidden>
                  <span className="relative block h-full w-full">
                    <Image
                      src={encodeURI(service.cardImage)}
                      alt=""
                      fill
                      className="object-contain object-top-right"
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 176px"
                    />
                  </span>
                </span>
              )}
              <span
                className="absolute right-6 top-6 z-10 text-white/10 group-hover:text-(--acc2) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                aria-hidden>
                ↗
              </span>
              <span className="font-sans text-4xl italic text-white/6 group-hover:text-blue-200 transition-colors">
                {service.number}
              </span>
              <span className="mt-2 inline-block rounded px-2.5 py-1 text-[.68rem] font-medium uppercase tracking-wide text-(--acc2) bg-[rgba(91,141,238,.12)] group-hover:bg-blue-200/80 group-hover:text-(--bg-deep) transition-colors">
                {service.category}
              </span>
              <h3 className="mt-4 font-sans text-xl text-(--text-hi) group-hover:text-(--bg-deep) transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 text-[.86rem] leading-relaxed text-(--text-dim) group-hover:text-slate-600 transition-colors">
                {service.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
