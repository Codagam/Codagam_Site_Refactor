"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

const BULLETS = [
  "Reply within a day",
  "No sales pressure, ever",
  "Honest assessment — even if it's not a fit",
];

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="rv relative border-t border-(--border) py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-5 md:px-6 lg:px-8 text-center scroll-mt-12 sm:scroll-mt-16 overflow-x-hidden font-sans"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(91,141,238,.28) 0%, transparent 50%), radial-gradient(ellipse 120% 90% at 50% 100%, rgba(44,210,252,.18) 0%, transparent 50%), var(--bg-deep)",
      }}>
      <div className="relative z-10 mx-auto max-w-[1100px] w-full min-w-0">
        <h2 className="rv font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white mb-2 sm:mb-3 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Tell us what you&apos;re <em>building next.</em>
        </h2>
        <p className="rv text-[1.05rem] text-(--text-dim) leading-[1.6] max-w-[480px] mx-auto mb-4 sm:mb-6 md:mb-8">
          Whether you have a detailed spec or just a rough problem statement — we&apos;d love to hear it. Free discovery call, honest assessment, clear proposal.
        </p>
        <div className="rv flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center items-center">
          <CareerApplicationForm
            asDialog={true}
            triggerText="Book a discovery call →"
            triggerShowArrow={false}
            triggerVariant="black"
            triggerSize="lg"
          />
          <a
            href="mailto:hello@codagam.com"
            className="inline-flex items-center gap-2 font-(--font-sans) text-[.9rem] text-(--text-dim) py-2.5 px-5 rounded-lg border border-(--border) hover:text-white hover:border-(--acc2) hover:bg-[rgba(91,141,238,.08)] transition-colors"
          >
            ✉ hello@codagam.com
          </a>
        </div>
        <ul className="rv mt-4 sm:mt-6 md:mt-8 flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center items-center">
          {BULLETS.map((text) => (
            <li key={text} className="text-[.78rem] text-white/25 flex items-center gap-2">
              <span className="text-(--acc2)" aria-hidden>✓</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
