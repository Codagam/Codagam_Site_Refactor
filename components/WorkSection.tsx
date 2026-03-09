import { cn } from "@/lib/utils";

const CASES = [
  {
    featured: true,
    fullWidth: true,
    num: "01",
    stack: "Next.js · Node.js · MongoDB",
    title:
      "Multi-Tenant Healthcare EMR\nwith Tamil-English Voice Transcription",
    situation:
      "A healthcare provider needed a comprehensive Electronic Medical Records platform supporting multiple clinics, with clinical note documentation via voice input — in both Tamil and English — and enterprise-grade access control to meet Indian healthcare compliance requirements.",
    challenge:
      "Building a hybrid RBAC/ABAC permission model with break-glass emergency access, patient consent workflows, and real-time voice transcription across two languages — all within a strict HIPAA-equivalent data framework. Multiple distinct user roles each requiring role-aware UI rendering and separate data access scopes.",
    outcome:
      "Fully compliant multi-tenant platform. Near-instant Tamil-English voice transcription. Comprehensive audit logging on every data access event. Role-aware UI across all user types. Zero security incidents post-launch."
  },
  {
    featured: false,
    fullWidth: false,
    num: "02",
    stack: ".NET · C# · SQL Server · PDF Generation",
    title: "Enterprise Payroll & Payslip Generator",
    situation:
      "An organisation running entirely manual payroll — spreadsheets, manual calculations, emailed PDFs — needed a fully automated system integrated with their existing HR database.",
    outcome:
      "Dramatic reduction in manual payroll effort. Batch PDF generation processing hundreds of payslips in seconds. Full audit trail. Zero payroll errors since deployment."
  },
  {
    featured: false,
    fullWidth: false,
    num: "03",
    stack: "Next.js · TypeScript · MongoDB · REST API · SaaS",
    title: "Dynamic Link Platform —\nFirebase Alternative",
    situation:
      "Google's deprecation of Firebase Dynamic Links left thousands of product teams scrambling. Mobile apps relying on smart redirects and deferred deep linking had nowhere to go.",
    outcome:
      "Production SaaS with full Firebase parity, developer API & docs, analytics dashboard, and paying early customers — shipped in record time."
  },
  {
    featured: false,
    fullWidth: false,
    num: "04",
    stack: "Next.js · MongoDB · Voice Input · RAG",
    title: "Hyperlocal Classifieds\nwith Voice & AI Navigation",
    situation:
      "A Tamil Nadu community needed a localised classified platform with Tamil language accessibility for non-English speakers — voice input, RAG-powered navigation, and a scalable architecture for planned nationwide expansion.",
    outcome:
      "Fully accessible Tamil-English platform. Voice input dramatically reducing friction for non-English users. Architecture ready for multi-city rollout."
  },
  {
    featured: false,
    fullWidth: false,
    num: "05",
    stack: "Next.js · TypeScript · Tailwind CSS · API Routes",
    title: "Codagam — Custom SaaS &\nSoftware Development Website",
    situation:
      "Codagam needed a modern, performant marketing site to showcase services, case studies, and tech stack — with CMS-style content for hero, footer, and tech stack, plus an admin area for non-developers to manage copy and links.",
    outcome:
      "Fast, accessible one-page site with API-driven hero and footer content, admin dashboard for content updates, dark theme with Open Sans typography, and a clear path from services to work samples to contact."
  }
];

export function WorkSection() {
  return (
    <section
      id="work"
      className="relative border-t border-(--border) py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6 lg:px-8 scroll-mt-12 sm:scroll-mt-16 bg-blue-100 font-sans">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="rv font-(--font-serif) text-[clamp(2rem,4vw,3.25rem)] tracking-tight text-(--bg-deep) mb-1.5 [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          Real projects, <em>real impact.</em>
        </h2>
        <p className="text-blue-950 text-sm mb-2">
          We don&apos;t talk in generalities. Here&apos;s what we&apos;ve actually built — the situations, the challenges, and the outcomes.
        </p>
        <div className="rv rv-d2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10">
          {CASES.map((c) => (
            <div
              key={c.num}
              className={cn(
                "relative flex flex-col bg-white/95 border border-slate-200 rounded-xl p-5 sm:p-6 md:p-8 shadow-[0_18px_45px_rgba(15,23,42,.08)] transition-colors hover:bg-slate-50 hover:border-slate-300",
                c.fullWidth && "md:col-span-2",
                c.featured && "md:col-span-2"
              )}
            >
              <div className="absolute top-4 right-5 font-(--font-serif) text-5xl italic text-slate-200 pointer-events-none">
                {c.num}
              </div>
              <div className="text-[.68rem] font-medium uppercase tracking-widest text-(--acc2) mb-2">
                {c.stack}
              </div>
              <h3 className="font-(--font-serif) text-[clamp(1.3rem,2.2vw,1.75rem)] tracking-tight mb-3 leading-tight text-(--bg-deep) whitespace-pre-line">
                {c.title}
              </h3>
              {c.situation && (
                <div className="py-3 border-t border-slate-200 first:border-t-0 first:pt-0">
                  <div className="text-[.65rem] uppercase tracking-widest text-slate-400 font-medium mb-1.5">
                    Situation
                  </div>
                  <p className="text-[.86rem] text-slate-700 leading-7">
                    {c.situation}
                  </p>
                </div>
              )}
              {c.challenge && (
                <div className="py-3 border-t border-slate-200">
                  <div className="text-[.65rem] uppercase tracking-widest text-slate-400 font-medium mb-1.5">
                    The challenge
                  </div>
                  <p className="text-[.86rem] text-slate-700 leading-7">
                    {c.challenge}
                  </p>
                </div>
              )}
              <div className="mt-4 py-3 px-4 bg-[rgba(91,141,238,.06)] border border-[rgba(91,141,238,.18)] rounded-lg">
                <div className="text-[.65rem] uppercase tracking-widest text-(--acc2) font-medium mb-1.5">
                  ↗ Outcome
                </div>
                <p className="text-[.88rem] text-(--bg-deep) font-semibold leading-[1.55]">
                  {c.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rv mt-8 sm:mt-10 text-center">
          <p className="text-(--bg-deep) text-[.9rem] mb-3">
            Have a project that looks like these? Or completely unlike them?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-100 text-gray-900 border border-blue-200 py-2.5 px-6 font-(--font-sans) text-[.9rem] hover:bg-white transition-colors">
            Let&apos;s talk about yours →
          </a>
        </div>
      </div>
    </section>
  );
}
