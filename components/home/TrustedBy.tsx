"use client";

const differentiators = [
  {
    value: "19",
    unit: "yr",
    title: "Founder coding experience",
    description:
      "Writing production systems since 2006 — enterprise, SaaS, mobile, and everything between.",
  },
  {
    value: "2",
    unit: "yr+",
    title: "Minimum engineer experience",
    description:
      "We don't use your project as a training ground. Everyone who touches your code has shipped before.",
  },
  {
    value: "3",
    unit: "",
    title: "Time-zone overlaps supported",
    description:
      "India, US (EST/PST), and UK — meaningful daily overlap, not just async back-and-forth.",
  },
];

export default function TrustedBy() {
  return (
    <section
      id="case-studies"
      className="bg-muted/40 py-12 sm:py-14 md:py-16 lg:pt-12 lg:pb-16 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 lg:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
          Why teams choose us
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-10 max-w-2xl">
          Trusted by teams who can&apos;t afford to get it wrong.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {/* Testimonial */}
          <div className="relative">
            <span className="text-5xl sm:text-6xl font-serif text-primary/30 leading-none select-none">
              &ldquo;
            </span>
            <p className="text-base sm:text-lg text-primary leading-relaxed pt-2">
              Codagam brought a level of technical maturity we rarely see from
              offshore partners. They understood our compliance requirements
              from day one, asked the right questions, and delivered a system
              we&apos;re genuinely proud of.
            </p>
            <p className="mt-4 text-sm text-primary/80">
              — Healthcare Technology Client · Multi-tenant EMR Platform
            </p>
          </div>

          {/* Differentiators */}
          <div className="flex flex-col divide-y divide-border">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="py-5 sm:py-6 first:pt-0 last:pb-0">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-lg text-muted-foreground">
                      {item.unit}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
