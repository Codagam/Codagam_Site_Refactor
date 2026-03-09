"use client";

import Link from "next/link";
import { services } from "@/lib/content/services";

export default function ServiceCards() {
  return (
    <section
      id="services"
      className="relative border-t border-(--border) py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6 lg:px-8 scroll-mt-12 sm:scroll-mt-16"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13,22,90,.9) 0%, var(--bg-deep) 100%)",
      }}>
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-3 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30">
          <span
            className="h-px w-6 shrink-0 bg-(--acc2) opacity-40"
            aria-hidden
          />
          What we build
        </p>
        <h2 className="font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white mb-1.5 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Engineering that <em>ships</em> and <em>scales.</em>
        </h2>
        <p className="text-base text-(--text-dim) leading-8 max-w-[540px] mt-2">
          Outcome-focused engineering across three core practice areas. Every
          engagement starts with understanding your actual problem — not fitting
          you into a template.
        </p>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-(--border) bg-(--border) sm:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group relative flex flex-col items-start bg-[rgba(10,18,69,.95)] p-5 sm:p-6 md:p-8 pr-6 sm:pr-8 md:pr-10 text-left transition-colors hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-(--acc2) focus:ring-offset-2 focus:ring-offset-(--bg-deep)">
              <span
                className="absolute right-6 top-6 text-white/10 group-hover:text-(--acc2) group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                aria-hidden>
                ↗
              </span>
              <span className="font-(--font-serif) text-4xl italic text-white/6 group-hover:text-blue-200 transition-colors">
                {service.number}
              </span>
              <span className="mt-2 inline-block rounded px-2.5 py-1 text-[.68rem] font-medium uppercase tracking-wide text-(--acc2) bg-[rgba(91,141,238,.12)] group-hover:bg-blue-200/80 group-hover:text-(--bg-deep) transition-colors">
                {service.category}
              </span>
              <h3 className="mt-4 font-(--font-sans) text-xl text-(--text-hi) group-hover:text-(--bg-deep) transition-colors">
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
