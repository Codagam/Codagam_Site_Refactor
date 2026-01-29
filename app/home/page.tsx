import Navbar from "@/components/home/nav/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
// import Products from "@/components/home/Products"; // Product section commented – using CapabilityCards
import CapabilityCards from "@/components/home/CapabilityCards";
import TechStack from "@/components/home/TechStack";
import CareerSection from "@/components/home/CareerSection";
import TrustedBy from "@/components/home/TrustedBy";
import About from "@/components/home/About";
import Footer from "@/components/home/nav/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main className="pt-12 sm:pt-14 md:pt-16">
        <Hero />
        <About />
        <Services />
        {/* <Products /> – product section replaced by 4 capability cards */}
        <CapabilityCards />
        <TechStack />
        <TrustedBy />
        <CareerSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
