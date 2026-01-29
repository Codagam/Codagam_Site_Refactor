"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="bg-muted py-12 md:py-16 lg:pt-12 lg:pb-16 scroll-mt-12 sm:scroll-mt-14 md:scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6">
            Join our team
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We&apos;re looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>
        <div className="flex justify-center">
          <CareerApplicationForm
            asDialog={true}
            triggerText="Apply Now"
            triggerVariant="black"
            triggerSize="lg"
          />
        </div>
      </div>
    </section>
  );
}
