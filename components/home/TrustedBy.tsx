"use client";

const DIFFERENTIATORS = [
  {
    icon: "⧫",
    title: "A decade of engineering depth",
    description:
      "Our principal engineer has been writing production systems since the early days of modern web. Enterprise, SaaS, mobile, and everything between — the kind of depth that only comes from years of real-world delivery.",
  },
  {
    icon: "◈",
    title: "Years of real-world experience, minimum",
    description:
      "We don't use your project as a training ground. Everyone who touches your code has shipped production software before — no exceptions.",
  },
  {
    icon: "◎",
    title: "International delivery, proven",
    description:
      "Meaningful daily overlap across multiple time zones. English-first communication. No async black holes — you can reach us during your workday.",
  },
  {
    icon: "⬡",
    title: "Handover as a deliverable",
    description:
      "We write code as if the next person who touches it might not be us. Architecture docs, onboarding guides, and clean repositories — every time.",
  },
];

export default function TrustedBy() {
  return (
    <section
      id="team"
      className="relative border-t border-(--border) py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-5 md:px-6 lg:px-8 scroll-mt-12 sm:scroll-mt-16 overflow-x-hidden bg-blue-100 font-sans">
      <div className="relative z-10 mx-auto max-w-[1100px] w-full min-w-0">
        <p className="mb-2 sm:mb-3 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-blue-900/60">
          <span
            className="h-px w-6 shrink-0 bg-(--acc2) opacity-60"
            aria-hidden
          />
          Why teams choose us
        </p>
        <h2 className="font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-(--bg-deep) mb-1.5 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Extraordinary results, <em>repeatedly.</em>
        </h2>

        <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Testimonial - boxed, not full height */}
          <div className="rv min-w-0">
            <div className="relative rounded-xl border border-slate-200 bg-white/95 p-4 sm:p-5 md:p-6 shadow-sm max-w-xl min-w-0">
              <span
                className="font-(--font-serif) text-5xl leading-none text-(--acc2) opacity-30 select-none block"
                aria-hidden>
                &ldquo;
              </span>
              <p className="mt-2 text-[1.05rem] leading-[1.7] text-slate-700 italic">
                Codagam brought a level of technical maturity we rarely see from
                offshore partners. They understood our compliance requirements
                from day one, asked the right questions, and delivered a system
                we&apos;re genuinely proud of.
              </p>
              <p className="mt-4 text-[.8rem] text-slate-500">
                — Healthcare Technology Client · Multi-tenant EMR Platform
              </p>
            </div>
          </div>

          {/* Differentiators */}
          <div className="flex flex-col min-w-0">
            {DIFFERENTIATORS.map((item, i) => (
              <div
                key={item.title}
                className={`rv flex gap-3 sm:gap-4 py-3 sm:py-4 md:py-5 border-b border-slate-200 last:border-0 min-w-0 ${i === 1 ? "rv-d1" : i === 2 ? "rv-d2" : i === 3 ? "rv-d3" : ""}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[rgba(91,141,238,.3)] bg-[rgba(91,141,238,.12)] text-(--acc2) text-lg">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[.95rem] font-medium text-(--bg-deep) mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[.82rem] leading-[1.6] text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
