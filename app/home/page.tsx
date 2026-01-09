import Navbar from "@/components/home/nav/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
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
      <main className="mt-12 sm:mt-14 md:mt-16 w-full">
        <Hero />
        <About />
        <Services />
        <Products />
        <TechStack />
        <TrustedBy />
        <CareerSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
