"use client";

import Image from "next/image";
import { Check } from "lucide-react";

const capabilities = [
  {
    id: "polyglot",
    title: "Polyglot Expertise",
    description:
      "Full-stack architecture spanning modern stacks (JavaScript, Python) and enterprise platforms (.NET, MS SQL Server) at global scale",
    imageUrl: "/images/about/Polyglot Expertise.png",
    borderColor: "border-primary",
    hoverBgColor: "hover:bg-primary-hover",
    descriptionColor: "text-yellow-200",
  },
  {
    id: "healthcare",
    title: "Healthcare Mastery",
    description:
      "2+ years building EMR systems, clinical workflows, and health tech compliance frameworks",
    imageUrl: "/images/about/Healthcare Mastery.png",
    borderColor: "border-primary",
    hoverBgColor: "hover:bg-primary-hover",
    descriptionColor: "text-green-200",
  },
  {
    id: "emerging",
    title: "Emerging Markets",
    description:
      "Deep understanding of India's digital transformation, tier-2/3 dynamics, and localized solutions",
    imageUrl: "/images/about/Emerging Markets.png",
    borderColor: "border-primary",
    hoverBgColor: "hover:bg-primary-hover",
    descriptionColor: "text-blue-200",
  },
  {
    id: "global",
    title: "Global Delivery",
    description:
      "Proven execution across US, UK, and Indian markets with 24/7 timezone coverage",
    imageUrl: "/images/about/Global Delivery.png",
    borderColor: "border-primary",
    hoverBgColor: "hover:bg-primary-hover",
    descriptionColor: "text-purple-200",
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
      className="bg-card py-8 md:py-10 lg:py-12 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center mb-4 md:mb-6">
          About Codagam
        </h2>

        {/* Capabilities Section */}
        <div className="mb-6 md:mb-8">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black text-center mb-3 md:mb-4 max-w-4xl mx-auto">
            We build mission-critical software that bridges the gap between
            enterprise reliability and startup innovation.
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {capabilities.map((capability) => (
              <div
                key={capability.id}
                className={`relative overflow-hidden rounded-lg md:rounded-xl border-2 ${capability.borderColor} ${capability.hoverBgColor} min-h-[140px] md:min-h-[160px] transition-all duration-300 hover:scale-105`}>
                {/* Background image - shows lightly like hero */}
                <div className="absolute inset-0">
                  <Image
                    src={capability.imageUrl}
                    alt={capability.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay so image shows lightly and text stays readable */}
                  <div className="absolute inset-0 bg-primary/80" />
                </div>
                {/* Content on top */}
                <div className="relative z-10 p-3 md:p-4 flex flex-col h-full text-primary-foreground">
                  <h3 className="text-base md:text-lg font-bold mb-1.5 text-white text-center border-b-2 border-white pb-1.5">
                    {capability.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-white/80">
                    {capability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Are & Why We're Different */}
        <div className="mb-0">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-black text-center mb-4 md:mb-6">
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
