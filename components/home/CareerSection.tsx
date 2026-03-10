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
      className="rv relative w-full border-t border-(--border) py-4 sm:py-5 md:py-6 lg:py-8 px-4 sm:px-5 md:px-6 lg:px-[4vw] xl:px-[6vw] 2xl:px-[8vw] text-center scroll-mt-12 sm:scroll-mt-16 overflow-x-hidden font-sans"
      style={{
        background:
          "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(91,141,238,.28) 0%, transparent 50%), radial-gradient(ellipse 120% 90% at 50% 100%, rgba(44,210,252,.18) 0%, transparent 50%), var(--bg-deep)",
      }}>
      <div className="relative z-10 mx-auto w-full min-w-0">
        <h2 className="rv font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-white mb-2 sm:mb-3 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Tell us what you&apos;re <em>building next.</em>
        </h2>
        <p className="rv text-[1.05rem] text-(--text-dim) leading-[1.6] max-w-[480px] mx-auto mb-3 sm:mb-5 md:mb-6">
          Whether you have a detailed spec or just a rough problem statement — we&apos;d love to hear it. Free discovery call, honest assessment, clear proposal.
        </p>
        <div className="rv flex flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center items-center">
          <CareerApplicationForm
            asDialog={true}
            triggerText="Join our team →"
            triggerShowArrow={false}
            triggerVariant="black"
            triggerSize="lg"
          />
          <a
            href="mailto:support@codagam.com"
            className="inline-flex items-center gap-2 font-(--font-sans) text-[.9rem] text-(--text-dim) py-2.5 px-5 rounded-lg border border-(--border) hover:text-white hover:border-(--acc2) hover:bg-[rgba(91,141,238,.08)] transition-colors"
          >
            ✉ support@codagam.com
          </a>
        </div>
        <ul className="rv mt-3 sm:mt-5 md:mt-6 flex flex-wrap gap-3 sm:gap-4 md:gap-5 justify-center items-center">
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
