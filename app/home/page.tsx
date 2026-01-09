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
      <main className="mt-[45px] min-[375px]:mt-[49px] sm:mt-[53px] md:mt-[55px] lg:mt-[57px] xl:mt-[61px] 2xl:mt-[65px] w-full">
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
