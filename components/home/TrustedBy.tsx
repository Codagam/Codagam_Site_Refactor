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
      className="relative border-t border-[var(--border)] py-28 px-[5vw] scroll-mt-16 overflow-hidden bg-blue-100">
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <p className="mb-4 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-blue-900/60">
          <span
            className="h-px w-6 shrink-0 bg-[var(--acc2)] opacity-60"
            aria-hidden
          />
          Why teams choose us
        </p>
        <h2 className="font-[var(--font-serif)] text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-[var(--bg-deep)] mb-2 [&_em]:italic [&_em]:font-light [&_em]:text-[var(--acc2)]">
          Extraordinary results, <em>repeatedly.</em>
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16">
          {/* Testimonial - no card, direct on section background */}
          <div className="rv relative pr-4">
            <span
              className="font-[var(--font-serif)] text-7xl leading-none text-[var(--acc2)] opacity-30 select-none"
              aria-hidden>
              &ldquo;
            </span>
            <p className="mt-2 text-[1.05rem] leading-[1.7] text-slate-700 italic">
              Codagam brought a level of technical maturity we rarely see from
              offshore partners. They understood our compliance requirements
              from day one, asked the right questions, and delivered a system
              we&apos;re genuinely proud of.
            </p>
            <p className="mt-5 text-[.8rem] text-slate-500">
              — Healthcare Technology Client · Multi-tenant EMR Platform
            </p>
          </div>

          {/* Differentiators */}
          <div className="flex flex-col">
            {DIFFERENTIATORS.map((item, i) => (
              <div
                key={item.title}
                className={`rv flex gap-5 py-5 border-b border-slate-200 last:border-0 ${i === 1 ? "rv-d1" : i === 2 ? "rv-d2" : i === 3 ? "rv-d3" : ""}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[rgba(91,141,238,.3)] bg-[rgba(91,141,238,.12)] text-[var(--acc2)] text-lg">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[.95rem] font-medium text-[var(--bg-deep)] mb-1.5">
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
