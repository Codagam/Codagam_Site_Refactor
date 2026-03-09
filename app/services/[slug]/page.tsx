import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/content/services";
import Navbar from "@/components/home/nav/Navbar";
import Footer from "@/components/home/nav/Footer";
import BackToServicesLink from "@/components/shared/BackToServicesLink";

const SECURITY_ITEMS = [
  {
    icon: "🔒",
    title: "Security-first architecture",
    text: "Auth, RBAC/ABAC, encryption at rest and in transit, and audit logging designed in from day one — not retrofitted after a breach scare.",
  },
  {
    icon: "☁",
    title: "Cloud-native scaling",
    text: "Horizontal scaling, multi-region readiness, and zero-downtime deployment — whether you're on AWS, Azure, or Vercel.",
  },
  {
    icon: "📊",
    title: "Observability baked in",
    text: "Structured logging, distributed tracing, health endpoints, and alerting. Your team always knows what the system is doing — and why.",
  },
  {
    icon: "📋",
    title: "Compliance-aware",
    text: "HIPAA-equivalent, GDPR, and regulatory audit trail requirements — understood from the start, not discovered in a panic during review.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery call",
    text: "30 minutes. We listen to your problem, ask honest questions, and tell you frankly what we think the right approach is.",
  },
  {
    number: "02",
    title: "Scoping & proposal",
    text: "We write a clear scope, timeline, and fixed-fee or retainer proposal. No surprises, no hidden hourly charges.",
  },
  {
    number: "03",
    title: "Architecture & kickoff",
    text: "Before a line of code is written, we agree on tech choices, architecture decisions, and communication cadence.",
  },
  {
    number: "04",
    title: "Build & iterate",
    text: "Two-week sprints, live preview environments, and weekly video check-ins. You're never waiting on a black box.",
  },
];

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen w-full bg-[var(--bg-deep)]">
      <Navbar />
      <main className="relative z-10 pt-12 sm:pt-14 md:pt-16 lg:pt-16">
        {/* Page hero */}
        <section className="border-b border-[var(--border)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-[5vw]">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-4 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30">
              <span
                className="h-px w-6 shrink-0 bg-[var(--acc2)] opacity-40"
                aria-hidden
              />
              Services
            </p>
            <h1 className="font-[var(--font-serif)] text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-tight text-white [&_em]:italic [&_em]:font-light [&_em]:text-[var(--acc2)]">
              What we build, and <em>how we build it.</em>
            </h1>
            <p className="mt-4 max-w-[640px] text-base text-[var(--text-dim)] leading-8">
              Outcome-focused engineering across three core practice areas.
              Every engagement starts with understanding your actual problem —
              not fitting you into a template.
            </p>
            <BackToServicesLink />
          </div>
        </section>

        {/* Service detail – two-column layout */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-[5vw]">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-8 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/40">
              {service.eyebrow}
            </p>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">
              {/* Left: number, tag, fullTitle, copy, stack pills */}
              <div>
                <div className="font-[var(--font-serif)] text-4xl font-light italic text-white/[.15] leading-none mb-4">
                  {service.number}
                </div>
                <p className="mb-3 flex items-center gap-2 text-[.69rem] font-medium uppercase tracking-[.11em] text-[var(--acc2)]">
                  <span className="h-px w-3 bg-[var(--acc2)]" />
                  {service.category}
                </p>
                <h2 className="font-[var(--font-serif)] text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white leading-[1.07] mb-4">
                  {service.fullTitle}
                </h2>
                <p className="text-[.95rem] text-[var(--text-mid)] leading-[1.82] mb-4">
                  {service.copy}
                </p>
                {service.copy2 && (
                  <p className="text-[.95rem] text-[var(--text-mid)] leading-[1.82] mb-4">
                    {service.copy2}
                  </p>
                )}
                {service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border)] bg-[rgba(255,255,255,.04)] px-3 py-1.5 text-[.74rem] text-[var(--text-mid)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: "What you get" card – blue-100 block only */}
              <div className="rounded-xl border border-slate-200 bg-blue-100 p-6 sm:p-8 shadow-sm">
                <h4 className="text-[.7rem] font-medium uppercase tracking-[.12em] text-blue-900/60 mb-6">
                  What you get
                </h4>
                <ul className="space-y-0">
                  {service.deliverables.map((d, i) => (
                    <li
                      key={i}
                      className="flex gap-3 border-b border-slate-200 py-4 last:border-0">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-200 text-[var(--acc2)] text-sm">
                        ✓
                      </span>
                      <div>
                        <span className="text-[.9rem] font-medium text-[var(--bg-deep)]">
                          {d.title}
                        </span>
                        {d.sub && (
                          <p className="mt-0.5 text-[.81rem] text-slate-600 leading-[1.55]">
                            {d.sub}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Unusual CTA – blue-100 block only */}
            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-xl border border-[rgba(91,141,238,.18)] bg-blue-100 p-8 sm:p-10">
              <p className="font-[var(--font-serif)] text-[1.05rem] text-slate-700 leading-[1.55] max-w-[420px] [&_em]:text-[var(--acc2)] [&_em]:italic">
                Need something <em>unusual?</em> Complex integrations, niche
                stacks, AI features, voice transcription, multi-language systems
                — tell us the challenge.
              </p>
              <Link
                href="/home#contact"
                className="shrink-0 rounded-lg bg-white px-6 py-3 font-[var(--font-sans)] text-sm font-semibold text-[var(--bg-deep)] shadow border border-slate-200 transition-colors hover:bg-[var(--acc2)] hover:text-white hover:border-[var(--acc2)]">
                Tell us about it →
              </Link>
            </div>
          </div>
        </section>

        {/* Non-negotiables */}
        <section className="border-t border-[var(--border)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-[5vw]">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-4 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/40">
              Non-negotiables
            </p>
            <h2 className="font-[var(--font-serif)] text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white leading-[1.1] mb-12">
              Secure by design.
              <br />
              Built to scale.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SECURITY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-lg border border-white/10 bg-[rgba(255,255,255,.05)] p-7 transition-colors hover:bg-blue-100 hover:border-slate-200">
                  <div className="text-2xl mb-3" aria-hidden>
                    {item.icon}
                  </div>
                  <h3 className="text-[.95rem] font-medium text-white group-hover:text-[var(--bg-deep)] mb-1.5 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[.84rem] text-[var(--text-dim)] group-hover:text-slate-600 leading-[1.7] transition-colors">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our engagement process */}
        <section className="border-t border-[var(--border)] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-[5vw]">
          <div className="mx-auto max-w-[1100px]">
            <p className="mb-4 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/40">
              How every project starts
            </p>
            <h2 className="font-[var(--font-serif)] text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white leading-[1.1] mb-12">
              Our engagement process.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)]">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="group bg-[rgba(10,18,69,.95)] p-7 transition-colors hover:bg-blue-100">
                  <div className="font-[var(--font-serif)] text-[1.85rem] font-light italic text-white/[.08] group-hover:text-blue-200 leading-none mb-4 transition-colors">
                    {step.number}
                  </div>
                  <h3 className="text-[.94rem] font-semibold text-white group-hover:text-[var(--bg-deep)] mb-2 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[.83rem] text-[var(--text-dim)] group-hover:text-slate-600 leading-[1.7] transition-colors">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/home#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-[var(--font-sans)] text-sm font-semibold text-[var(--bg-deep)] shadow transition-colors hover:bg-[var(--acc2)] hover:text-[var(--bg-deep)]">
                Start with a discovery call
                <span className="ml-1.5 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        <div className="relative z-20 border-t border-[var(--border)] bg-[var(--bg-deep)]">
          <Footer />
        </div>
      </main>
    </div>
  );
}
