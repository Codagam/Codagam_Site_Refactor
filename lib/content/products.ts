import { ProductItem } from "@/models/interfaces";

// Map products to background images (non-logo images from public/images)
export const productBackgroundImages: Record<string, string> = {
  gobitoday: "/images/Codagam_Img (1).jpg",
  welbuk: "/images/Codagam_Img (2).jpg",
  wrapper: "/images/Codagam_Img (3).jpg",
  bilme: "/images/Codagam_Img (4).jpg",
  "codagam-bespoke": "/images/Codagam_Img (5).jpg",
  digitran: "/images/Codagam_Img (7).jpg",
  "agile-workspace": "/images/Codagam_Img (8).jpg",
  "expertise-hub": "/images/Codagam_Img (9).jpg",
  "idea-launchpad": "/images/office1.jpg",
};

export const productItemsContent: ProductItem[] = [
  {
    id: "gobitoday",
    label: "Hyperlocal Platform",
    headline: "GobiToday",
    description:
      "Hyperlocal classifieds & job search engine for Tier-2 towns. Connect local communities with jobs, services, and opportunities.",
    details:
      "GobiToday is a comprehensive hyperlocal platform designed specifically for Tier-2 Indian towns and cities. It combines classifieds, job listings, and community features to help local businesses and job seekers connect effectively. The platform focuses on creating a vibrant local ecosystem where communities can thrive.",
    features: [
      "Local classifieds marketplace",
      "Job search and listings",
      "Community engagement tools",
      "Mobile-first responsive design",
      "Real-time notifications",
      "Multi-language support",
    ],
    image: "/images/gt_logo.png",
    alt: "GobiToday - Hyperlocal Platform",
    website: "https://gobitoday.com",
  },
  {
    id: "welbuk",
    label: "Healthcare Management",
    headline: "Welbuk",
    description:
      "Patient-facing EMR and healthcare management app. Streamline patient care with modern digital health solutions.",
    details:
      "Welbuk is a patient-centric Electronic Medical Records (EMR) system that empowers patients to manage their health records while providing healthcare providers with efficient tools for patient management. The platform integrates with ABDM (Ayushman Bharat Digital Mission) standards and offers seamless healthcare data management.",
    features: [
      "Patient EMR management",
      "ABDM integration",
      "Appointment scheduling",
      "Prescription management",
      "Health records access",
      "Secure data encryption",
    ],
    image: "/images/logo.png",
    alt: "Welbuk - Healthcare Management",
    website: "https://welbuk.com",
  },
  {
    id: "wrapper",
    label: "Link Management",
    headline: "Wrapper.biz",
    description:
      "Short links & QR code management platform. Create, track, and manage your links and QR codes efficiently.",
    details:
      "Wrapper.biz is a powerful link shortening and QR code management platform that helps businesses and individuals create branded short links, generate QR codes, and track analytics. Perfect for marketing campaigns, social media, and business cards.",
    features: [
      "Custom short links",
      "QR code generation",
      "Link analytics tracking",
      "Branded domains",
      "Bulk link management",
      "API integration",
    ],
    image: "/images/handle-logo.jpg",
    alt: "Wrapper.biz - Link Management",
    website: "https://wrapper.biz",
  },
  {
    id: "bilme",
    label: "Business Software",
    headline: "Bilme.store",
    description:
      "Simple billing software for small businesses. Streamline invoicing, inventory, and business operations.",
    details:
      "Bilme.store is an intuitive billing and inventory management software designed for small businesses. It simplifies invoicing, tracks inventory, manages customers, and generates business reports. The platform is easy to use and requires no technical expertise.",
    features: [
      "Invoice generation",
      "Inventory management",
      "Customer management",
      "Business reports",
      "Tax calculations",
      "Multi-currency support",
    ],
    image: "/images/logo.png",
    alt: "Bilme.store - Billing Software",
    website: "https://bilme.store",
  },
 
  {
    id: "idea-launchpad",
    label: "Innovation Platform",
    headline: "Idea Launchpad",
    description:
      "Innovation management platform for startups. Transform ideas into market-ready products with guided workflows.",
    details:
      "Idea Launchpad is a comprehensive innovation management platform that helps startups and enterprises transform ideas into successful products. It provides tools for idea validation, market research, prototyping, and go-to-market planning.",
    features: [
      "Idea validation tools",
      "Market research insights",
      "Prototype builder",
      "GTM planning",
      "Investor pitch templates",
      "Progress tracking",
    ],
    image: "/images/idea.jpg",
    alt: "Idea Launchpad - Innovation Platform",
    website: "https://codagam.com",
  },
];
