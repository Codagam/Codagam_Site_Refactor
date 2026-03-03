"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="bg-section-bg pt-12 sm:pt-14 md:pt-16 lg:pt-12 pb-6 sm:pb-8 md:pb-10 lg:pb-8 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16 lg:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6">
            Ready to stop compromising on your software?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d
            approach it — honestly.
          </p>
        </div>
        <div className="flex justify-center">
          <CareerApplicationForm
            asDialog={true}
            triggerText="Book a discovery call"
            triggerShowArrow={true}
            triggerVariant="black"
            triggerSize="lg"
          />
        </div>
      </div>
    </section>
  );
}
