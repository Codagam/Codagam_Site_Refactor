"use client";

import { Check } from "lucide-react";

const capabilities = [
  {
    id: "polyglot",
    title: "Polyglot Expertise",
    description:
      "Full-stack architecture spanning modern stacks (JavaScript, Python) and enterprise platforms (.NET, MS SQL Server) at global scale",
    bgColor: "bg-blue-900",
    borderColor: "border-blue-900",
    textColor: "text-white",
    hoverBgColor: "hover:bg-blue-800",
  },
  {
    id: "healthcare",
    title: "Healthcare Mastery",
    description:
      "2+ years building EMR systems, clinical workflows, and health tech compliance frameworks",
    bgColor: "bg-blue-900",
    borderColor: "border-blue-900",
    textColor: "text-white",
    hoverBgColor: "hover:bg-blue-800",
  },
  {
    id: "emerging",
    title: "Emerging Markets",
    description:
      "Deep understanding of India's digital transformation, tier-2/3 dynamics, and localized solutions",
    bgColor: "bg-blue-900",
    borderColor: "border-blue-900",
    textColor: "text-white",
    hoverBgColor: "hover:bg-blue-800",
  },
  {
    id: "global",
    title: "Global Delivery",
    description:
      "Proven execution across US, UK, and Indian markets with 24/7 timezone coverage",
    bgColor: "bg-blue-900",
    borderColor: "border-blue-900",
    textColor: "text-white",
    hoverBgColor: "hover:bg-blue-800",
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
    <div className="relative w-full bg-white z-[1]">
      <section
        id="about"
        className="min-h-screen flex flex-col pt-8 md:pt-12 lg:pt-16 pb-6 md:pb-8 lg:pb-10 bg-white scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col">
          {/* Main Heading - About Codagam */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-6 md:mb-8 text-center font-bold text-blue-900 break-words px-4">
            About Codagam
          </h2>

          {/* Top Section - Capabilities */}
          <div className="w-full mb-6 md:mb-8">
            <h3 className="text-base sm:text-lg md:text-lg lg:text-xl mb-4 md:mb-5 text-center font-semibold text-blue-900 break-words px-4 leading-tight">
              We build mission-critical software that bridges the gap between
              enterprise reliability and startup innovation.
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
              {capabilities.map((capability) => (
                <div
                  key={capability.id}
                  className={`${capability.bgColor} ${capability.borderColor} ${capability.textColor} ${capability.hoverBgColor} rounded-lg md:rounded-xl border-2 p-3 md:p-4 flex flex-col transition-all duration-300 hover:scale-105`}>
                  <h3 className="text-sm md:text-base lg:text-lg font-bold mb-1.5 md:mb-2 break-words text-white">
                    {capability.title}
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base leading-relaxed break-words text-white/90">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section - Who We Are & Why We're Different */}
          <div className="w-full">
            <h3 className="text-base sm:text-lg md:text-lg lg:text-xl mb-4 md:mb-5 text-center font-semibold text-blue-900 break-words px-4 leading-tight">
              Built by Engineers. Trusted by Enterprises.
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full">
              {/* Who We Are */}
              <div className="w-full">
                <h3 className="text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 font-bold text-blue-900 break-words">
                  Who We Are
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed break-words">
                    Codagam Software Labs is a boutique software consulting firm
                    headquartered in Gobichettipalayam, Tamil Nadu, specializing
                    in enterprise-grade solutions for healthcare, analytics, and
                    business intelligence platforms.
                  </p>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed break-words">
                    We&apos;re a team of full-stack engineers and architects
                    with 15+ years of combined experience architecting hybrid
                    cloud solutions for Fortune 500 companies, building
                    healthcare technology platforms, and launching multiple SaaS
                    products. Our team is equally comfortable architecting
                    Next.js microservices on GCP as designing enterprise .NET
                    systems on Azure with SQL Server backends.
                  </p>
                </div>
              </div>

              {/* Why We're Different */}
              <div className="w-full">
                <h3 className="text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 font-bold text-blue-900 break-words">
                  Why We&apos;re Different
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {whyDifferent.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-2 md:gap-3">
                      <div className="shrink-0 mt-0.5">
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm md:text-base lg:text-lg font-semibold text-blue-900 mb-0.5 break-words leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm lg:text-base text-slate-700 leading-snug break-words">
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
    </div>
  );
}
