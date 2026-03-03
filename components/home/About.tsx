"use client";

import { Gem, Target, Hexagon } from "lucide-react";

const pillars = [
  {
    id: "bespoke",
    icon: Gem,
    title: "Bespoke, not templated",
    description:
      "Every system is designed around your specific business logic, users, and growth trajectory — never copy-pasted from a boilerplate.",
  },
  {
    id: "cost-effective",
    icon: Target,
    title: "Cost-effective without compromise",
    description:
      "India-based structure means senior engineering talent at rates that don't require enterprise budget. Rigorous hiring — 2+ year floor for every engineer.",
  },
  {
    id: "advanced",
    icon: Hexagon,
    title: "Advanced, by default",
    description:
      "We don't use yesterday's tools. Our stack is continuously evaluated — AI integration, serverless, edge — wherever they genuinely help.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-900 py-12 sm:py-14 md:py-16 lg:py-20 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
      {/* Faint CODAGAM watermark - centered */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(6rem,20vw,19rem)] font-bold leading-none tracking-tight text-white/5 whitespace-nowrap"
        aria-hidden
      >
        CODAGAM
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow with line above */}
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs font-medium uppercase tracking-widest text-white/60">
            Who we are
          </p>
        </div>

        {/* Main heading */}
        <h2 className="mt-3 max-w-[36rem] text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.5rem]">
          Your home-grown team
          <br />
          with a <em className="font-light not-italic text-primary">global outlook.</em>
        </h2>

        {/* Two-column grid - align top */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          {/* Left: intro copy */}
          <div className="space-y-5">
            <p className="text-base leading-relaxed text-white/75 sm:text-[1rem]">
              We started Codagam because we saw too many teams choose between{" "}
              <strong className="font-medium text-white/95">affordable and mediocre</strong> or{" "}
              <strong className="font-medium text-white/95">premium and out-of-reach.</strong>{" "}
              That&apos;s a false choice — and we built a firm to prove it.
            </p>
            <p className="text-base leading-relaxed text-white/75 sm:text-[1rem]">
              Based in Tamil Nadu, India, the name Codagam blends &quot;Code&quot; with{" "}
              <strong className="font-medium text-white/95">Agam</strong> — the Tamil word for mind.
              We build software the way a craftsperson builds: with deep thought, fierce attention to
              detail, and genuine pride in every line shipped.
            </p>
            <p className="text-base leading-relaxed text-white/75 sm:text-[1rem]">
              We love hard problems. The messier the architecture, the trickier the integration, the
              tighter the deadline — the more we lean in.
            </p>
          </div>

          {/* Right: pillar cards */}
          <div className="flex flex-col gap-4">
            {pillars.map(({ id, icon: Icon, title, description }) => (
              <div
                key={id}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-5 py-5 transition-all duration-300 hover:translate-x-1 hover:border-white/15 hover:bg-white/10 sm:px-6 sm:py-6"
              >
                <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-primary/80 to-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-3 text-primary opacity-90">
                  <Icon className="h-5 w-5 sm:h-5 sm:w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1.5 text-base font-medium tracking-wide text-white sm:text-[0.97rem]">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-white/45 sm:text-[0.855rem]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
