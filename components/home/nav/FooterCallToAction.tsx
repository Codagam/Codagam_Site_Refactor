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
      "Custom-built, cost-effective software — crafted for growth and served with care, just like a home-cooked meal.",
  };

  return (
    <div className={`w-full bg-white pt-2.5 pb-2.5 sm:pt-3.5 sm:pb-3.5 md:pt-4 md:pb-4 lg:pt-5 lg:pb-5 xl:pt-6 xl:pb-6 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-center">
        <h2 className="text-(--bg-deep) text-base sm:text-lg md:text-xl lg:text-2xl mb-2 md:mb-3 lg:mb-4 font-bold wrap-break-word">
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
