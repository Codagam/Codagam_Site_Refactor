export interface ServiceDeliverable {
  title: string;
  sub?: string;
}

export interface ServiceGalleryItem {
  id: string;
  title: string;
  description: string;
  hoverColor?: string;
  offerings?: string[];
}

export interface ServiceDetail {
  id: string;
  number: string;
  category: string;
  title: string;
  /** Full title on service detail page (e.g. "Modern Web Products & SaaS Platforms") */
  fullTitle: string;
  shortDescription: string;
  eyebrow: string;
  headline: string;
  copy: string;
  /** Optional second paragraph on service detail page */
  copy2?: string;
  tags: string[];
  deliverables: ServiceDeliverable[];
}

export const services: ServiceDetail[] = [
  {
    id: "web-saas",
    number: "01",
    category: "Web & SaaS Products",
    title: "Modern Web Products",
    fullTitle: "Modern Web Products & SaaS Platforms",
    shortDescription:
      "Full-stack SaaS, dashboards, portals — Next.js, MERN, TypeScript. Optimised for performance and developer velocity from day one.",
    eyebrow: "Service 01",
    headline: "Build fast. Scale confidently. Own the codebase forever.",
    copy:
      "We build full-stack web applications that scale with your business. Whether you're launching a SaaS MVP, rebuilding a legacy dashboard, or launching a customer portal — we use Next.js and the MERN stack to deliver fast, maintainable, production-ready software.",
    copy2:
      "Our engineering is TypeScript-first, test-aware, and built for teams who will need to own and extend the codebase long after we hand it over.",
    tags: [
      "Next.js 14+",
      "React",
      "TypeScript",
      "MongoDB",
      "Node.js",
      "Prisma",
      "Tailwind CSS",
      "Vercel / AWS",
    ],
    deliverables: [
      {
        title: "Multi-tenant SaaS architecture",
        sub: "Isolated data, custom domains, and per-tenant billing logic.",
      },
      {
        title: "Role-based UI & access control",
        sub: "RBAC/ABAC built in from the start — not bolted on later.",
      },
      {
        title: "API design & documentation",
        sub: "Clean REST or GraphQL APIs with developer-ready docs.",
      },
      {
        title: "Analytics & observability",
        sub: "Structured logging, dashboards, and real-time monitoring.",
      },
      {
        title: "Mobile-responsive & accessible",
        sub: "WCAG-compliant, performant on every device.",
      },
    ],
  },
  {
    id: "enterprise",
    number: "02",
    category: "Enterprise Systems",
    title: "Enterprise .NET + SQL",
    fullTitle: "Enterprise .NET & SQL Server Systems",
    shortDescription:
      "Robust internal tools, ERP integrations, backend services — for organisations that need reliability and compliance longevity.",
    eyebrow: "Service 02",
    headline: "Systems your business will depend on for decades.",
    copy:
      "For organisations that need longevity, compliance, and reliability above all else. We design and build robust internal tools, ERP integrations, reporting systems, and backend services using C#/.NET and SQL Server — technology stacks chosen for enterprise-grade durability.",
    copy2:
      "Our principal engineer has 19 years of experience in enterprise architecture. When you're building systems that your business will depend on for a decade, that judgment matters enormously.",
    tags: [
      "C# / .NET",
      "SQL Server",
      "Azure",
      "REST APIs",
      "Entity Framework",
      "RBAC / ABAC",
      "Azure DevOps",
    ],
    deliverables: [
      {
        title: "Legacy system integration",
        sub: "Bridge old and new — ERP connectors, data migrations, API wrappers.",
      },
      {
        title: "Compliance-aware architecture",
        sub: "Audit logging, data retention policies, and access controls built for regulators.",
      },
      {
        title: "Complex reporting & PDF generation",
        sub: "Automated document creation, payslips, invoices, regulatory reports.",
      },
      {
        title: "Performance-tuned SQL",
        sub: "Query optimization, indexing strategy, and database health for scale.",
      },
      {
        title: "Azure cloud deployment",
        sub: "Managed services, autoscaling, and blue-green deployment strategies.",
      },
    ],
  },
  {
    id: "end-to-end",
    number: "03",
    category: "Full Delivery",
    title: "Architecture & Full Delivery",
    fullTitle: "Architecture & End-to-End Delivery",
    shortDescription:
      "System design to deployment, CI/CD monitoring, handover — we lead the entire engineering lifecycle when you need it.",
    eyebrow: "Service 03",
    headline: "From discovery to deployment — we own the full lifecycle.",
    copy:
      "Some teams need an engineering partner who can own the entire technical lifecycle — from system design and technology selection, through development, to deployment and handover. That's what this service is.",
    copy2:
      "We embed as a delivery-focused technical lead: setting architecture standards, reviewing code, managing CI/CD pipelines, and ensuring the system lands in your hands clean, documented, and maintainable.",
    tags: [
      "System design",
      "AWS / Vercel",
      "Docker",
      "GitHub Actions",
      "Terraform",
      "Observability",
    ],
    deliverables: [
      {
        title: "Technical roadmap & architecture docs",
        sub: "Written decisions, ADRs, and diagrams your team can actually use.",
      },
      {
        title: "CI/CD pipeline setup",
        sub: "Automated testing, preview deployments, production gates.",
      },
      {
        title: "Infrastructure as Code",
        sub: "Reproducible, version-controlled environments — no snowflake servers.",
      },
      {
        title: "Monitoring & alerting",
        sub: "Error tracking, uptime monitoring, performance dashboards from day one.",
      },
      {
        title: "Team onboarding & documentation",
        sub: "Handover packages that actually transfer knowledge.",
      },
    ],
  },
];

export const servicesGalleryItems: ServiceGalleryItem[] = services.map(
  (s) => ({
    id: s.id,
    title: s.title,
    description: s.shortDescription,
    hoverColor: "bg-primary",
    offerings: s.deliverables.map((d) => d.title),
  }),
);
