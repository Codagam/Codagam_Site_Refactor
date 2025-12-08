"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="py-6 sm:py-8 md:py-10 lg:py-18 bg-slate-50 scroll-mt-[60px] sm:scroll-mt-[70px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full">
        <div className="text-center mb-4 sm:mb-5 md:mb-6 w-full">
          <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4 font-semibold text-blue-900 wrap-break-word px-2 sm:px-0">
            Join our team
          </h2>
          <p className="text-sm min-[375px]:text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 wrap-break-word">
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
