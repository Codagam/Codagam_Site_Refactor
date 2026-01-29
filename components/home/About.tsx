"use client";

import { Check } from "lucide-react";

const capabilities = [
  {
    id: "polyglot",
    title: "Polyglot Expertise",
    description:
      "Full-stack architecture spanning modern stacks (JavaScript, Python) and enterprise platforms (.NET, MS SQL Server) at global scale",
    bgColor: "bg-primary",
    borderColor: "border-primary",
    textColor: "text-primary-foreground",
    hoverBgColor: "hover:bg-primary-hover",
  },
  {
    id: "healthcare",
    title: "Healthcare Mastery",
    description:
      "2+ years building EMR systems, clinical workflows, and health tech compliance frameworks",
    bgColor: "bg-primary",
    borderColor: "border-primary",
    textColor: "text-primary-foreground",
    hoverBgColor: "hover:bg-primary-hover",
  },
  {
    id: "emerging",
    title: "Emerging Markets",
    description:
      "Deep understanding of India's digital transformation, tier-2/3 dynamics, and localized solutions",
    bgColor: "bg-primary",
    borderColor: "border-primary",
    textColor: "text-primary-foreground",
    hoverBgColor: "hover:bg-primary-hover",
  },
  {
    id: "global",
    title: "Global Delivery",
    description:
      "Proven execution across US, UK, and Indian markets with 24/7 timezone coverage",
    bgColor: "bg-primary",
    borderColor: "border-primary",
    textColor: "text-primary-foreground",
    hoverBgColor: "hover:bg-primary-hover",
  },
];

const whyDifferent = [
  {
    id: "technical",
    title: "Technical Depth",
    description:
      "Our leadership team codes, architects, and makes core technical decisions daily",
  },
  {
    id: "healthcare-ai",
    title: "Healthcare + AI Expertise",
    description:
      "We've built EMR apps, clinic systems, and vaccine platforms—clinical workflows matter",
  },
  {
    id: "global-local",
    title: "Born Global, Rooted Local",
    description:
      "We architect for emerging markets, not impose Western solutions",
  },
  {
    id: "reliability",
    title: "Reliability Obsession",
    description:
      "99.9%+ uptime, scalability, and enterprise security by design",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-card py-12 md:py-16 lg:pt-12 lg:pb-16 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-8 md:mb-12">
          About Codagam
        </h2>

        {/* Capabilities Section */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary text-center mb-6 md:mb-8 max-w-4xl mx-auto">
            We build mission-critical software that bridges the gap between
            enterprise reliability and startup innovation.
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {capabilities.map((capability) => (
              <div
                key={capability.id}
                className={`${capability.bgColor} ${capability.borderColor} ${capability.textColor} ${capability.hoverBgColor} rounded-lg md:rounded-xl border-2 p-4 md:p-5 flex flex-col transition-all duration-300 hover:scale-105`}>
                <h3 className="text-base md:text-lg font-bold mb-2 text-white">
                  {capability.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-white/90">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Are & Why We're Different */}
        <div className="mb-8">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary text-center mb-8 md:mb-12">
            Built by Engineers. Trusted by Enterprises.
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Who We Are */}
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary mb-4 md:mb-6">
                Who We Are
              </h3>
              <div className="space-y-4">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  Codagam Software Labs is a boutique software consulting firm
                  headquartered in Gobichettipalayam, Tamil Nadu, specializing
                  in enterprise-grade solutions for healthcare, analytics, and
                  business intelligence platforms.
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  We&apos;re a team of full-stack engineers and architects with
                  15+ years of combined experience architecting hybrid cloud
                  solutions for Fortune 500 companies, building healthcare
                  technology platforms, and launching multiple SaaS products.
                  Our team is equally comfortable architecting Next.js
                  microservices on GCP as designing enterprise .NET systems on
                  Azure with SQL Server backends.
                </p>
              </div>
            </div>

            {/* Why We're Different */}
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary mb-4 md:mb-6">
                Why We&apos;re Different
              </h3>
              <div className="space-y-4">
                {whyDifferent.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-primary mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm md:text-base text-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
