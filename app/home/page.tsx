import Navbar from "@/components/home/nav/Navbar";
import Hero from "@/components/home/Hero";
import { CanvasBackground } from "@/components/shared/CanvasBackground";
import { PoweredStrip } from "@/components/shared/PoweredStrip";
import ServiceCards from "@/components/home/ServiceCards";
import TechStack from "@/components/home/TechStack";
import CareerSection from "@/components/home/CareerSection";
import TrustedBy from "@/components/home/TrustedBy";
import About from "@/components/home/About";
import Footer from "@/components/home/nav/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-(--bg-deep)">
      <CanvasBackground />
      <Navbar />
      <main className="relative z-10 pt-12 sm:pt-14 md:pt-16 lg:pt-16">
        <Hero />
        <div className="relative z-20 bg-(--bg-deep)">
          <About />
          <ServiceCards />
          <TechStack />
          <TrustedBy />
          <CareerSection />
          <Footer />
        </div>
      </main>
      <PoweredStrip />
      <ScrollToTopButton />
    </div>
  );
}
