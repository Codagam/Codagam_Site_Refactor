import { SectionEyebrow, SectionTitle, SectionSub } from "../SectionHeader";
import { buttonVariants } from "@/components/ui/button";

const SERVICES = [
  {
    num: "01",
    tag: "Web & SaaS",
    title: "Modern Web Products",
    desc: "Full-stack SaaS, dashboards, portals — Next.js, MERN, TypeScript. Optimised for performance and developer velocity from day one.",
  },
  {
    num: "02",
    tag: "Enterprise",
    title: "Enterprise .NET + SQL",
    desc: "Robust internal tools, ERP integrations, backend services — for organisations that need reliability and compliance longevity.",
  },
  {
    num: "03",
    tag: "End-to-End",
    title: "Architecture & Full Delivery",
    desc: "System design to deployment, CI/CD, monitoring, handover — we lead the entire engineering lifecycle when you need it.",
  },
];

const WEB_DELIVERABLES = [
  { title: "Multi-tenant SaaS architecture", sub: "Isolated data, custom domains, per-tenant billing logic." },
  { title: "Role-based UI & access control", sub: "RBAC/ABAC built in from the start — not bolted on later." },
  { title: "API design & documentation", sub: "Clean REST or GraphQL APIs with developer-ready docs." },
  { title: "Analytics & observability", sub: "Structured logging, dashboards, and real-time monitoring." },
  { title: "Mobile-responsive & accessible", sub: "WCAG-compliant, performant on every device." },
];

const ENTERPRISE_DELIVERABLES = [
  { title: "Legacy system integration", sub: "Bridge old and new — ERP connectors, data migrations, API wrappers." },
  { title: "Compliance-aware architecture", sub: "Audit logging, data retention policies, access controls built for regulators." },
  { title: "Complex reporting & PDF generation", sub: "Automated payslips, invoices, regulatory reports at scale." },
  { title: "Performance-tuned SQL", sub: "Query optimisation, indexing strategy, database health for scale." },
  { title: "Cloud deployment on Azure", sub: "Managed services, autoscaling, blue-green deployment strategies." },
];

function DeliverablesCard({ items }: { items: { title: string; sub: string }[] }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8">
      <h4 className="font-[var(--font-sans)] text-[.75rem] uppercase tracking-[.1em] text-white/30 font-medium mb-5">
        What you get
      </h4>
      {items.map((d) => (
        <div
          key={d.title}
          className="flex items-start gap-3.5 py-3.5 border-b border-[var(--border)] last:border-0"
        >
          <div className="w-[18px] h-[18px] rounded bg-[rgba(91,141,238,.15)] text-[var(--acc2)] flex items-center justify-center text-[.6rem] shrink-0 mt-0.5">
            ✓
          </div>
          <div>
            <h5 className="font-[var(--font-sans)] text-[.88rem] font-medium text-[var(--text-hi)] mb-1">
              {d.title}
            </h5>
            <p className="text-[.8rem] text-[var(--text-dim)] leading-[1.55]">
              {d.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServicesSection() {
  return (
    <section
      id="services"
      className="py-28 px-[5vw] bg-gradient-to-b from-[rgba(13,22,90,.9)] to-[var(--bg-deep)] border-t border-[var(--border)]"
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionEyebrow eyebrow="What we build" />
        <SectionTitle>
          Engineering that <em>ships</em> and scales.
        </SectionTitle>
        <SectionSub>
          Outcome-focused engineering across three core practice areas. Every
          engagement starts with understanding your actual problem — not fitting
          you into a template.
        </SectionSub>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border-[1.5px] border-[var(--border)] rounded-xl overflow-hidden mt-12">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="rv rv-d2 bg-[rgba(10,18,69,.95)] p-10 pr-8 relative transition-colors hover:bg-[rgba(90,107,187,1)] group"
            >
              <div className="absolute top-7 right-7 text-white/10 group-hover:text-[var(--acc2)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                ↗
              </div>
              <div className="font-[var(--font-serif)] text-4xl font-light italic text-white/[.06] mb-5">
                {s.num}
              </div>
              <div className="text-[.68rem] uppercase tracking-[.1em] text-[var(--acc2)] bg-[rgba(91,141,238,.12)] py-1 px-2.5 rounded inline-block mb-3.5 font-medium">
                {s.tag}
              </div>
              <h3 className="text-xl font-semibold mb-2.5 text-white">
                {s.title}
              </h3>
              <p className="text-[.86rem] text-[var(--text-dim)] leading-7">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="rv grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start py-16 border-t border-[var(--border)]">
          <div>
            <div className="text-[.68rem] uppercase tracking-[.1em] text-[var(--acc2)] bg-[rgba(91,141,238,.12)] py-1 px-2.5 rounded inline-block mb-3 font-medium">
              Service 01 · Web & SaaS Products
            </div>
            <h3 className="text-[clamp(1.5rem,2.5vw,2.2rem)] tracking-[-.02em] mb-4 text-white">
              Build fast. Scale confidently.
              <br />
              Own the codebase forever.
            </h3>
            <p className="text-[.95rem] text-[var(--text-mid)] leading-[1.85] mb-4">
              We build full-stack web applications that scale with your
              business. Whether you're launching a SaaS MVP, rebuilding a legacy
              dashboard, or creating a customer portal — we deliver fast,
              maintainable, production-ready software you can extend long after
              handover.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["Next.js", "React", "TypeScript", "MongoDB", "Node.js", "Prisma", "Tailwind CSS", "Vercel / AWS"].map(
                (t) => (
                  <span
                    key={t}
                    className="text-[.72rem] py-1 px-2.5 rounded-full bg-[rgba(91,141,238,.08)] border border-[rgba(91,141,238,.2)] text-[var(--acc3)]"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
          <DeliverablesCard items={WEB_DELIVERABLES} />
        </div>

        <div className="rv grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start py-16 border-t border-[var(--border)]">
          <div>
            <div className="text-[.68rem] uppercase tracking-[.1em] text-[var(--acc2)] bg-[rgba(91,141,238,.12)] py-1 px-2.5 rounded inline-block mb-3 font-medium">
              Service 02 · Enterprise Systems
            </div>
            <h3 className="text-[clamp(1.5rem,2.5vw,2.2rem)] tracking-[-.02em] mb-4 text-white">
              Systems your business will
              <br />
              depend on for decades.
            </h3>
            <p className="text-[.95rem] text-[var(--text-mid)] leading-[1.85] mb-4">
              For organisations that need longevity, compliance, and reliability
              above all else. We design robust internal tools, ERP integrations,
              reporting systems, and backend services using C#/.NET and SQL
              Server — technology stacks chosen for enterprise-grade durability.
            </p>
            <p className="text-[.95rem] text-[var(--text-mid)] leading-[1.85] mb-4">
              Our principal engineer has a deep, career-spanning background in
              enterprise architecture. When you're building systems your
              business depends on long-term, that judgment matters enormously.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["C# / .NET", "SQL Server", "Azure", "REST APIs", "Entity Framework", "RBAC / ABAC"].map(
                (t) => (
                  <span
                    key={t}
                    className="text-[.72rem] py-1 px-2.5 rounded-full bg-[rgba(91,141,238,.08)] border border-[rgba(91,141,238,.2)] text-[var(--acc3)]"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
          <DeliverablesCard items={ENTERPRISE_DELIVERABLES} />
        </div>

        <div className="rv bg-[rgba(91,141,238,.06)] border border-[rgba(91,141,238,.18)] rounded-xl p-10 mt-14 flex flex-col sm:flex-row justify-between items-center gap-8 flex-wrap">
          <p className="font-[var(--font-serif)] text-[1.1rem] max-w-[440px] leading-[1.55] text-[var(--text-mid)] [&_em]:text-[var(--acc2)] [&_em]:italic">
            Need something <em>unusual?</em> Complex integrations, niche stacks,
            AI features, voice transcription, multi-language systems — tell us
            the challenge.
          </p>
          <a href="#contact" className={buttonVariants()}>
            Tell us about it →
          </a>
        </div>
      </div>
    </section>
  );
}
