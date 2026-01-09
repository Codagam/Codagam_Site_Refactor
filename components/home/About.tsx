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
    <div className="relative w-full bg-white z-20 -mt-[2px]">
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center py-4 sm:py-5 md:py-6 lg:py-6 xl:py-7 2xl:py-8 bg-white scroll-mt-[45px] min-[375px]:scroll-mt-[49px] sm:scroll-mt-[53px] md:scroll-mt-[55px] lg:scroll-mt-[57px] xl:scroll-mt-[61px] 2xl:scroll-mt-[65px] w-full relative">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-center">
        {/* Top Section - Capabilities */}
        <div className="w-full mb-3 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 2xl:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 2xl:mb-5 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6 leading-tight">
            We build mission-critical software that bridges the gap between
            enterprise reliability and startup innovation.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-4 2xl:gap-4.5 w-full">
            {capabilities.map((capability) => (
              <div
                key={capability.id}
                className={`${capability.bgColor} ${capability.borderColor} ${capability.textColor} ${capability.hoverBgColor} rounded-lg sm:rounded-xl border-2 p-2.5 sm:p-3 md:p-3.5 lg:p-3.5 xl:p-4 2xl:p-4 flex flex-col transition-all duration-300  hover:scale-105`}>
                <h3 className="text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg font-bold mb-1 sm:mb-1.5 md:mb-1.5 lg:mb-2 xl:mb-2 2xl:mb-2.5 wrap-break-word text-white">
                  {capability.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base leading-relaxed wrap-break-word text-white/90">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Who We Are & Why We're Different */}
        <div className="w-full">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-3 sm:mb-4 md:mb-5 lg:mb-5 xl:mb-6 2xl:mb-6 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6 leading-tight">
            Built by Engineers. Trusted by Enterprises.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 2xl:gap-7 w-full">
            {/* Who We Are */}
            <div className="w-full">
              <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl mb-2 sm:mb-2.5 md:mb-3 lg:mb-3 xl:mb-3.5 2xl:mb-4 font-bold text-blue-900 wrap-break-word">
                Who We Are
              </h3>
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-3 xl:space-y-3.5 2xl:space-y-4">
                <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-slate-700 leading-relaxed wrap-break-word">
                  Codagam Software Labs is a boutique software consulting firm
                  headquartered in Gobichettipalayam, Tamil Nadu, specializing
                  in enterprise-grade solutions for healthcare, analytics, and
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
              <h3 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-2.5 xl:mb-3 2xl:mb-3 font-bold text-blue-900 wrap-break-word">
                Why We&apos;re Different
              </h3>
              <div className="space-y-1 sm:space-y-1 md:space-y-1.5 lg:space-y-1.5 xl:space-y-1.5 2xl:space-y-2">
                {whyDifferent.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2.5">
                    <div className="shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-4.5 2xl:h-4.5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg font-semibold text-blue-900 mb-0 sm:mb-0 md:mb-0.5 lg:mb-0.5 xl:mb-0.5 2xl:mb-0.5 wrap-break-word leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base text-slate-700 leading-snug wrap-break-word">
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
