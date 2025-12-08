export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const heroContents: HeroContent[] = [
  {
    title: "Custom Software Development",
    subtitle: "Tailored Solutions",
    description:
      "We build scalable, high-performance software applications tailored to your business needs. From web applications to enterprise solutions, we deliver code that drives results.",
    image: "/images/Custom%20Software%20Development.png",
    imageAlt: "Custom software development solutions",
  },
  {
    title: "Web Development & Design",
    subtitle: "Modern Websites",
    description:
      "Create stunning, responsive websites that engage users and convert visitors into customers. Our modern web solutions are built with the latest technologies and best practices.",
    image: "/images/Web%20Development%20%26%20Design.png",
    imageAlt: "Web development and design services",
  },
  {
    title: "Cloud & DevOps Solutions",
    subtitle: "Scalable Infrastructure",
    description:
      "Leverage the power of cloud computing with our DevOps expertise. We help you deploy, scale, and maintain applications with automated CI/CD pipelines and cloud infrastructure.",
    image: "/images/Cloud%20%26%20DevOps%20Solutions.png",
    imageAlt: "Cloud and DevOps solutions",
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Intelligent Automation",
    description:
      "Transform your business with AI-powered solutions. From predictive analytics to intelligent automation, we help you harness the power of machine learning and artificial intelligence.",
    image: "/images/AI%20%26%20Machine%20Learning.png",
    imageAlt: "AI and machine learning solutions",
  },
];
