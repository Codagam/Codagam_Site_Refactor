"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="py-4 sm:py-5 md:py-6 lg:py-6 xl:py-7 2xl:py-8 bg-slate-50 scroll-mt-[56px] min-[375px]:scroll-mt-[60px] sm:scroll-mt-[64px] md:scroll-mt-[68px] lg:scroll-mt-[72px] xl:scroll-mt-[76px] 2xl:scroll-mt-[80px] w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full flex flex-col">
        <div className="text-center w-full flex flex-col mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-8 2xl:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6 mb-3 sm:mb-4 md:mb-4 lg:mb-5 xl:mb-5 2xl:mb-6">
            Join our team
          </h2>
          <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 md:px-8 lg:px-8 wrap-break-word">
            We&apos;re looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>
        <div className="flex justify-center w-full">
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
