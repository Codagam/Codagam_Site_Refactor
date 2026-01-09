"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CaseStudy {
  id: string;
  title: string;
  challenge: string;
  results: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "healthcare",
    title: "Healthcare Startup - EMR Platform",
    challenge:
      "Early-stage health tech startup needed patient-facing EMR app and clinic management system for India's competitive market.",
    results: [
      "Launched in 4 months (vs 8 typical)",
      "5,000+ users across 20 clinics",
      "99.7% uptime, sub-second response",
      "Series A raised in 6 months",
    ],
  },
  {
    id: "analytics",
    title: "Analytics Startup - Data Platform",
    challenge:
      "B2B SaaS analytics company needed to scale from 10K to 100M events/day with improved latency.",
    results: [
      "10x throughput increase",
      "60% cost per query reduction",
      "Dashboard load: 8s → <500ms",
      "PostgreSQL sharding implemented",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise - Cloud Migration",
    challenge:
      "Legacy enterprise system on-premise with MS SQL Server, needed zero-downtime cloud migration.",
    results: [
      "Zero downtime migration",
      "40% infrastructure cost reduction",
      "99.9%+ uptime achieved",
      "Global multi-region failover",
    ],
  },
];

export default function TrustedBy() {
  return (
    <section
      id="case-studies"
      className="py-4 sm:py-5 md:py-6 lg:py-6 xl:py-7 2xl:py-8 bg-white scroll-mt-[56px] min-[375px]:scroll-mt-[60px] sm:scroll-mt-[64px] md:scroll-mt-[68px] lg:scroll-mt-[72px] xl:scroll-mt-[76px] 2xl:scroll-mt-[80px] w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full">
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-8 2xl:mb-8 text-center font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
            Trusted by Innovative Companies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-4 2xl:gap-4.5 w-full">
            {caseStudies.map((caseStudy) => (
              <Card
                key={caseStudy.id}
                className="bg-blue-900 border-blue-900 text-white hover:bg-blue-800 rounded-lg sm:rounded-xl border-2 transition-all duration-300  hover:scale-105">
                <CardHeader className="p-1.5 sm:p-2 md:p-2.5 lg:p-2.5 xl:p-3 2xl:p-3.5 pb-0.5 sm:pb-0.5 md:pb-0.5 lg:pb-0.5 xl:pb-0.5 2xl:pb-0.5">
                  <CardTitle className="text-sm sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-lg font-bold text-white wrap-break-word">
                    {caseStudy.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-1.5 sm:p-2 md:p-2.5 lg:p-2.5 xl:p-3 2xl:p-3.5 pt-0 flex flex-col gap-3 sm:gap-3 md:gap-3.5 lg:gap-4 xl:gap-4 2xl:gap-5">
                  <div className="flex flex-col gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-2 xl:gap-2.5 2xl:gap-3">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base font-semibold text-white">
                      Challenge:
                    </p>
                    <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base text-white/90 leading-relaxed wrap-break-word">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-2 xl:gap-2.5 2xl:gap-3">
                    <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base font-semibold text-white">
                      Results:
                    </p>
                    <ul className="flex flex-col gap-1 sm:gap-1 md:gap-1 lg:gap-1.5 xl:gap-1.5 2xl:gap-2">
                      {caseStudy.results.map((result, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-2 xl:gap-2 2xl:gap-2">
                          <Check className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-4.5 2xl:h-4.5 text-green-400 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-base text-white/90 leading-relaxed wrap-break-word">
                            {result}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
