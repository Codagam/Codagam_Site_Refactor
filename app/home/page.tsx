import Navbar from "@/components/home/nav/Navbar";
import Hero from "@/components/home/Hero";
import HeroCanvasWrapper from "@/components/home/HeroCanvasWrapper";
import { PoweredStrip } from "@/components/shared/PoweredStrip";
import ServiceCards from "@/components/home/ServiceCards";
import { WorkSection } from "@/components/shared/WorkSection";
import TechStack from "@/components/home/TechStack";
import CareerSection from "@/components/home/CareerSection";
import TrustedBy from "@/components/home/TrustedBy";
import About from "@/components/home/About";
import Footer from "@/components/home/nav/Footer";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

export default function Home() {
  return (
    <div className="min-h-dvh w-full max-w-[100vw] overflow-x-hidden bg-(--bg-deep)">
      <HeroCanvasWrapper />
      <Navbar />
      <main className="relative z-10 pt-4 sm:pt-6 md:pt-8 lg:pt-12">
        <Hero />
        <div className="relative z-20 bg-(--bg-deep) [&_section]:overflow-x-hidden">
          <About />
          <ServiceCards />
          <WorkSection />
          <TechStack />
          <TrustedBy />
          <CareerSection />
          {/* Client logo carousel strip - above footer */}
          <div className="w-full bg-blue-100 border-t border-(--border) flex items-center justify-center py-2 sm:py-3 min-h-[52px] sm:min-h-[56px]">
            <ClientLogoCarousel pauseOnHover={true} duration="60s" />
          </div>
          <Footer />
        </div>
      </main>
      <PoweredStrip />
      <ScrollToTopButton />
    </div>
  );
}
