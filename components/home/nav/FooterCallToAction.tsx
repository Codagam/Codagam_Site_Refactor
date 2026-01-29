"use client";

import { useEffect, useState } from "react";

interface FooterContent {
  id: string;
  title: string;
  description: string;
}

interface FooterCallToActionProps {
  className?: string;
}

export default function FooterCallToAction({ className = "" }: FooterCallToActionProps) {
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const contentRes = await fetch("/api/footer/content");
        if (contentRes.ok) {
          setFooterContent(await contentRes.json());
        }
      } catch (error) {
        console.error("Error fetching footer content:", error);
      }
    };

    fetchFooterData();
  }, []);

  const defaultContent = {
    title: "Let's Build Something Remarkable",
    description:
      "Whether you're launching a healthcare platform, scaling a SaaS product, modernizing legacy enterprise systems, or expanding to global markets—we'd love to explore how we can help.",
  };

  return (
    <div className={`w-full text-primary border-t border-border pt-3 sm:pt-4 md:pt-5 lg:pt-5 xl:pt-6 2xl:pt-7 pb-3 sm:pb-4 md:pb-5 lg:pb-5 xl:pb-6 2xl:pb-7 bg-muted ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4 font-bold wrap-break-word">
          {footerContent?.title || defaultContent.title}
        </h2>
        <p
          className="text-black text-xs md:text-sm lg:text-base max-w-6xl mx-auto font-normal wrap-break-word"
          style={{ fontWeight: 400 }}>
          {footerContent?.description || defaultContent.description}
        </p>
      </div>
    </div>
  );
}
