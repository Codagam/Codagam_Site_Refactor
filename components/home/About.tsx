"use client";

import { Check } from "lucide-react";

const capabilities = [
  {
    id: "polyglot",
    title: "Polyglot Expertise",
    description:
      "Full-stack architecture spanning modern stacks (JavaScript, Python) and enterprise platforms (.NET, MS SQL Server) at global scale",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-900",
  },
  {
    id: "healthcare",
    title: "Healthcare Mastery",
    description:
      "2+ years building EMR systems, clinical workflows, and health tech compliance frameworks",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-900",
  },
  {
    id: "emerging",
    title: "Emerging Markets",
    description:
      "Deep understanding of India's digital transformation, tier-2/3 dynamics, and localized solutions",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-900",
  },
  {
    id: "global",
    title: "Global Delivery",
    description:
      "Proven execution across US, UK, and Indian markets with 24/7 timezone coverage",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-900",
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
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] flex flex-col justify-center py-6 sm:py-7 md:py-8 lg:py-8 xl:py-9 2xl:py-10 bg-white scroll-mt-[56px] min-[375px]:scroll-mt-[60px] sm:scroll-mt-[64px] md:scroll-mt-[68px] lg:scroll-mt-[72px] xl:scroll-mt-[76px] 2xl:scroll-mt-[80px] w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-center">
        {/* Top Section - Capabilities */}
        <div className="w-full mb-8 sm:mb-9 md:mb-10 lg:mb-10 xl:mb-11 2xl:mb-12">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-7 2xl:mb-8 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6 leading-tight">
            We build mission-critical software that bridges the gap between
            enterprise reliability and startup innovation.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 md:gap-4 lg:gap-4 xl:gap-4.5 2xl:gap-5 w-full">
            {capabilities.map((capability) => (
              <div
                key={capability.id}
                className={`${capability.bgColor} ${capability.borderColor} ${capability.textColor} rounded-lg sm:rounded-xl border-2 p-3 sm:p-3.5 md:p-4 lg:p-4 xl:p-4.5 2xl:p-5 flex flex-col transition-all hover:shadow-md`}>
                <h3 className="text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg font-bold mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 xl:mb-3 2xl:mb-3 wrap-break-word">
                  {capability.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base leading-relaxed wrap-break-word">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Who We Are & Why We're Different */}
        <div className="w-full">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-6 sm:mb-7 md:mb-8 lg:mb-8 xl:mb-9 2xl:mb-10 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6 leading-tight">
            Built by Engineers. Trusted by Enterprises.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10 w-full">
            {/* Who We Are */}
            <div className="w-full">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl mb-3 sm:mb-3.5 md:mb-4 lg:mb-4 xl:mb-4.5 2xl:mb-5 font-bold text-blue-900 wrap-break-word">
                Who We Are
              </h3>
              <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-4 xl:space-y-4.5 2xl:space-y-5">
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-slate-700 leading-relaxed wrap-break-word">
                  Codagam Software Labs is a boutique software consulting firm
                  headquartered in Gobichettipalayam, Tamil Nadu, specializing in
                  enterprise-grade solutions for healthcare, analytics, and
                  business intelligence platforms.
                </p>
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-slate-700 leading-relaxed wrap-break-word">
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
            <div className="w-full">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl mb-3 sm:mb-3.5 md:mb-4 lg:mb-4 xl:mb-4.5 2xl:mb-5 font-bold text-blue-900 wrap-break-word">
                Why We&apos;re Different
              </h3>
              <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-4 xl:space-y-4.5 2xl:space-y-5">
                {whyDifferent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 xl:gap-3.5 2xl:gap-4">
                    <div className="shrink-0 mt-0.5 sm:mt-1">
                      <Check className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-6 2xl:h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg font-semibold text-blue-900 mb-1 sm:mb-1 md:mb-1.5 lg:mb-1.5 xl:mb-1.5 2xl:mb-2 wrap-break-word">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base text-slate-700 leading-relaxed wrap-break-word">
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

