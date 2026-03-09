"use client";

import Link from "next/link";
import { services } from "@/lib/content/services";

export default function ServiceCards() {
  return (
    <section
      id="services"
      className="relative border-t border-[var(--border)] py-28 px-[5vw] scroll-mt-16"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13,22,90,.9) 0%, var(--bg-deep) 100%)",
      }}>
      <div className="mx-auto max-w-[1100px]">
        <p className="mb-4 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30">
          <span
            className="h-px w-6 shrink-0 bg-[var(--acc2)] opacity-40"
            aria-hidden
          />
          What we build
        </p>
        <h2 className="font-[var(--font-serif)] text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-white mb-2 [&_em]:italic [&_em]:font-light [&_em]:text-[var(--acc2)]">
          Engineering that <em>ships</em> and <em>scales.</em>
        </h2>
        <p className="text-base text-[var(--text-dim)] leading-8 max-w-[540px] mt-3">
          Outcome-focused engineering across three core practice areas. Every
          engagement starts with understanding your actual problem — not
          fitting you into a template.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="group relative flex flex-col items-start bg-[rgba(10,18,69,.95)] p-8 pr-10 text-left transition-colors hover:bg-[rgba(90,107,187,1)] focus:outline-none focus:ring-2 focus:ring-[var(--acc2)] focus:ring-offset-2 focus:ring-offset-[var(--bg-deep)]">
              <span
                className="absolute right-6 top-6 text-white/10 group-hover:text-[var(--acc2)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                aria-hidden>
                ↗
              </span>
              <span className="font-[var(--font-serif)] text-4xl italic text-white/[.06]">
                {service.number}
              </span>
              <span className="mt-2 inline-block rounded px-2.5 py-1 text-[.68rem] font-medium uppercase tracking-wide text-[var(--acc2)] bg-[rgba(91,141,238,.12)]">
                {service.category}
              </span>
              <h3 className="mt-4 font-[var(--font-sans)] text-xl font-semibold text-[var(--text-hi)]">
                {service.title}
              </h3>
              <p className="mt-2 text-[.86rem] leading-relaxed text-[var(--text-dim)]">
                {service.shortDescription}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[rgba(91,141,238,.18)] bg-[rgba(91,141,238,.06)] p-8">
          <p className="font-[var(--font-serif)] text-[1.1rem] text-[var(--text-mid)] [&_em]:text-[var(--acc2)]">
            Need something unusual? Complex integrations, niche stacks, AI
            features, voice transcription, multi-language systems — tell us the
            challenge.
          </p>
          <Link
            href="#contact"
            className="shrink-0 rounded-lg bg-white px-5 py-2.5 font-[var(--font-sans)] text-sm font-semibold text-[var(--bg-deep)] shadow transition-colors hover:bg-[var(--acc2)] hover:text-[var(--bg-deep)]">
            Tell us about it →
          </Link>
        </div>
      </div>
    </section>
  );
}
