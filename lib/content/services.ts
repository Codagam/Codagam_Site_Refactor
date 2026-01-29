import { GalleryItem } from "@/models/interfaces";

export const servicesGalleryItems: GalleryItem[] = [
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    description:
      "Enterprise-grade applications built for scale, reliability, and performance.",
    offerings: [
      "Full-stack web applications (React/Next.js + Node.js/.NET)",
      "Real-time data systems and analytics",
      "Healthcare and compliance-heavy systems",
      "Microservices and distributed systems",
    ],
    image: "/images/Codagam_Img (1).jpg",
    alt: "Custom Software Development",
    hoverColor: "bg-primary", // Modern Blue
  },
  {
    id: "healthcare-technology",
    title: "Healthcare Technology",
    description:
      "Specialized expertise in clinical and patient-facing platforms.",
    offerings: [
      "EMR systems design and implementation",
      "Telemedicine platforms",
      "FHIR-compliant integrations",
      "Healthcare data analytics",
    ],
    image: "/images/gobi_today_splash.png",
    alt: "Healthcare Technology Services",
    hoverColor: "bg-emerald-500", // Modern Teal/Green
  },
  {
    id: "cloud-architecture-devops",
    title: "Cloud Architecture & DevOps",
    description: "Robust infrastructure for global-scale applications.",
    offerings: [
      "Multi-cloud strategy (Azure, AWS, GCP)",
      "Kubernetes & containerization",
      "CI/CD pipeline design",
      "Global infrastructure for US, UK, emerging markets",
    ],
    image: "/images/Cloud & DevOps Solutions.png",
    alt: "Cloud Architecture & DevOps Services",
    hoverColor: "bg-indigo-500", // Modern Indigo
  },
  {
    id: "data-analytics-bi",
    title: "Data Analytics & BI",
    description: "Turning raw data into actionable insights.",
    offerings: [
      "Custom analytics platforms and dashboards",
      "Data pipeline architecture (ETL/ELT)",
      "Real-time data visualization",
      "Predictive analytics and ML integration",
    ],
    image: "/images/AI & Machine Learning.png",
    alt: "Data Analytics & BI Services",
    hoverColor: "bg-purple-500", // Modern Purple
  },
  {
    id: "ai-ml-integration",
    title: "AI/ML Integration",
    description: "Embedding intelligence into your products.",
    offerings: [
      "LLM integration and prompt engineering",
      "Medical NLP and clinical transcription",
      "Python-based predictive models",
      "GenAI tools and automation",
    ],
    image: "/images/AI & Machine Learning.png",
    alt: "AI/ML Integration Services",
    hoverColor: "bg-red-600", // Modern Red
  },
  {
    id: "secondary-services",
    title: "Secondary Services",
    description: "Strategic and technical expertise beyond core development.",
    offerings: [
      "Product strategy consulting",
      "Technical due diligence",
      "Mentorship & technical leadership",
      "Architecture reviews",
    ],
    image: "/images/Custom Software Development.png",
    alt: "Secondary Services",
    hoverColor: "bg-orange-500", // Modern Orange
  },
];
