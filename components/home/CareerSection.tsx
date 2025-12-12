"use client";

import React from "react";
import { CareerApplicationForm } from "@/components/shared/CareerApplicationForm";

export default function CareerSection() {
  return (
    <section
      id="career-section"
      className="min-h-[calc(100vh-48px)] min-[375px]:min-h-[calc(100vh-52px)] sm:min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-68px)] 2xl:min-h-[calc(100vh-72px)] flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-12 xl:py-14 2xl:py-16 bg-slate-50 scroll-mt-[48px] min-[375px]:scroll-mt-[52px] sm:scroll-mt-[56px] md:scroll-mt-[60px] lg:scroll-mt-[64px] xl:scroll-mt-[68px] 2xl:scroll-mt-[72px] w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 2xl:px-10 w-full h-full flex flex-col justify-center">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-10 xl:mb-12 2xl:mb-12 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-8 2xl:mb-8 font-bold text-blue-900 wrap-break-word px-2 sm:px-4 md:px-6">
            Join our team
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-6 md:px-8 lg:px-8 wrap-break-word mb-6 sm:mb-8 md:mb-10 lg:mb-10 xl:mb-12">
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
