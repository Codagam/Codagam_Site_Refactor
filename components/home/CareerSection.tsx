"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="py-6 sm:py-8 md:py-10 lg:py-18 bg-slate-50 scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full">
        <div className="text-center mb-4 sm:mb-5 md:mb-6 w-full">
          <h2 className="text-lg min-[375px]:text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 md:mb-4 font-bold text-blue-900 wrap-break-word px-2 sm:px-0">
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
