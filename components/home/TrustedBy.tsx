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
      className="py-6 md:py-8 lg:py-10 bg-white scroll-mt-14 sm:scroll-mt-16 md:scroll-mt-18 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl mb-6 md:mb-8 text-center font-bold text-blue-900 break-words px-4">
            Trusted by Innovative Companies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
            {caseStudies.map((caseStudy) => (
              <Card
                key={caseStudy.id}
                className="bg-blue-900 border-blue-900 text-white hover:bg-blue-800 rounded-lg md:rounded-xl border-2 transition-all duration-300 hover:scale-105">
                <CardHeader className="p-2 md:p-3 pb-1">
                  <CardTitle className="text-sm md:text-base lg:text-lg font-bold text-white break-words">
                    {caseStudy.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-2 md:p-3 pt-0 flex flex-col gap-3 md:gap-4">
                  <div className="flex flex-col gap-2 md:gap-3">
                    <p className="text-xs md:text-sm lg:text-base font-semibold text-white">
                      Challenge:
                    </p>
                    <p className="text-xs md:text-sm lg:text-base text-white/90 leading-relaxed break-words">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 md:gap-3">
                    <p className="text-xs md:text-sm lg:text-base font-semibold text-white">
                      Results:
                    </p>
                    <ul className="flex flex-col gap-1.5 md:gap-2">
                      {caseStudy.results.map((result, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 md:gap-3">
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0 mt-0.5" />
                          <span className="text-xs md:text-sm lg:text-base text-white/90 leading-relaxed break-words">
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
