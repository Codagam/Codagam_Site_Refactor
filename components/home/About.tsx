"use client";

const pillars = [
  {
    id: "bespoke",
    symbol: "✦",
    title: "Bespoke, not templated",
    description:
      "Every system is designed around your specific business logic, users, and growth trajectory – never copy-pasted from a boilerplate.",
  },
  {
    id: "cost-effective",
    symbol: "◎",
    title: "Cost-effective without compromise",
    description:
      "India-based structure means senior engineering talent at rates that don't require enterprise budgets. Rigorous hiring – years of proven experience required for every engineer.",
  },
  {
    id: "advanced",
    symbol: "⬡",
    title: "Advanced, by default",
    description:
      "We don't use yesterday's tools. Our stack is continuously evaluated – AI integration, serverless, edge – wherever they genuinely help.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-(--border) py-28 px-[5vw] scroll-mt-16 bg-blue-100">
      <div className="mx-auto max-w-[1100px] grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
        {/* Left: Who we are copy */}
        <div className="space-y-6">
          {/* Eyebrow: WHO WE ARE with lines on both sides */}
          <p className="flex items-center gap-2.5 mb-4 text-[.7rem] font-medium uppercase tracking-[.14em] text-blue-900/60">
            <span className="w-6 h-px bg-(--acc2) opacity-60 shrink-0" aria-hidden />
            WHO WE ARE
            <span className="w-6 h-px bg-(--acc2) opacity-60 shrink-0" aria-hidden />
          </p>

          <h2 className="font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-(--bg-deep) leading-[1.1] [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
            Your home-grown team
            <br />
            <em>with a global outlook.</em>
          </h2>

          <div className="space-y-5 text-[.98rem] leading-[1.85] [&_strong]:text-(--bg-deep) [&_em]:text-(--acc2) text-slate-700">
            <p>
              We started Codagam because we saw too many teams choose between{" "}
              <strong>affordable and mediocre</strong> or{" "}
              <strong>premium and out-of-reach.</strong> That&apos;s a false choice — and we built a
              firm to prove it.
            </p>
            <p>
              Based in Tamil Nadu, India, the name Codagam blends &quot;Code&quot; with{" "}
              <em>Agam</em> — the Tamil word for mind, home, the innermost self. We build software
              the way a craftsperson builds: with deep thought, fierce attention to detail, and
              genuine pride in every line shipped.
            </p>
            <p>
              We love hard problems. The messier the architecture, the trickier the integration, the
              tighter the deadline – the more we lean in.
            </p>
          </div>
        </div>

        {/* Right: three pillar cards */}
        <div className="flex flex-col gap-4">
          {pillars.map(({ id, symbol, title, description }) => (
            <div
              key={id}
              className="rounded-xl border border-slate-200 bg-white/95 py-5 px-7 shadow transition-colors duration-200 hover:bg-slate-50 hover:border-slate-300">
              <div
                className="mb-3 text-[1.1rem] text-(--acc2)"
                aria-hidden>
                {symbol}
              </div>
              <h3 className="font-(--font-sans) text-base text-(--bg-deep) mb-1.5">
                {title}
              </h3>
              <p className="text-[.86rem] leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
