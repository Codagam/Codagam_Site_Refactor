"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] flex flex-col justify-center py-0 bg-slate-50 scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full overflow-x-hidden h-full flex flex-col justify-center">
        <div className="text-center mb-1 sm:mb-2 md:mb-3 lg:mb-4 w-full max-w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 font-bold text-blue-900 wrap-break-word px-2 sm:px-0 break-words">
            Join our team
          </h2>
          <p className="text-sm min-[375px]:text-base sm:text-lg md:text-xl lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 wrap-break-word break-words mb-1 sm:mb-2 md:mb-2.5 lg:mb-3">
            We&apos;re looking for passionate individuals who want to build the
            future of technology. Join us in creating innovative solutions that
            make a real impact.
          </p>
        </div>
        <div className="flex justify-center w-full max-w-full">
          <div className="w-full max-w-full flex justify-center">
            <CareerApplicationForm
              asDialog={true}
              triggerText="Apply Now"
              triggerVariant="black"
              triggerSize="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
