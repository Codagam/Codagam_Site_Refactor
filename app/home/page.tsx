import Navbar from "@/components/home/nav/Navbar";
import Hero from "@/components/home/Hero";
import ServiceCards from "@/components/home/ServiceCards";
import { WorkSection } from "@/components/shared/WorkSection";
import TechStack from "@/components/home/TechStack";
import CareerSection from "@/components/home/CareerSection";
import TrustedBy from "@/components/home/TrustedBy";
import About from "@/components/home/About";
import Footer from "@/components/home/nav/Footer";
import ClientLogoCarousel from "@/components/shared/ClientLogoCarousel";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import ScrollToHash from "@/components/shared/ScrollToHash";

export default function Home() {
  return (
    <div className="min-h-dvh w-full max-w-[100vw] overflow-x-hidden bg-(--bg-deep)">
      <ScrollToHash />
      <Navbar />
      <main className="relative z-10 w-full min-w-0 pt-(--navbar-h) overflow-x-hidden">
        <Hero />
        <div className="relative z-20 bg-(--bg-deep) w-full min-w-0 [&_section]:w-full [&_section]:min-w-0 [&_section]:overflow-x-hidden">
          <About />
          <ServiceCards />
          <WorkSection />
          <TechStack />
          <TrustedBy />
          <CareerSection />
          {/* Client logo carousel strip - above footer */}
          <div className="w-full min-w-0 bg-blue-100 border-t border-(--border) flex items-center justify-center py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 lg:px-[4vw] min-h-[40px] sm:min-h-[44px] md:min-h-[48px]">
            <ClientLogoCarousel pauseOnHover={true} duration="60s" />
          </div>
          <Footer />
        </div>
      </main>
      <ScrollToTopButton />
    </div>
  );
}
