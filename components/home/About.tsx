"use client";

import { Check } from "lucide-react";

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
      className="bg-card py-8 md:py-10 lg:py-12 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-4 md:mb-6">
          About Codagam
        </h2>

        {/* Who We Are & Why We're Different */}
        <div className="mb-0">
          <h3 className="text-base sm:text-lg md:text-xl font-normal text-black text-center mb-4 md:mb-6">
            Built by Engineers. Trusted by Enterprises.
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Who We Are */}
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary mb-2 md:mb-4">
                Who We Are
              </h3>
              <div className="space-y-3">
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
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary mb-2 md:mb-4">
                Why We&apos;re Different
              </h3>
              <div className="space-y-3">
                {whyDifferent.map((item) => (
                  <div key={item.id} className="flex items-start gap-2">
                    <Check className="w-5 h-5 md:w-5 md:h-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-primary mb-0.5">
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
