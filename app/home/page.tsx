import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Products from "@/components/home/Products";
import TechStack from "@/components/home/TechStack";
import CareerSection from "@/components/home/CareerSection";
import Footer from "@/components/home/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <main className="mt-[48px] min-[375px]:mt-[52px] sm:mt-[56px] lg:mt-[64px] xl:mt-[68px] w-full max-w-full">
        <Hero />
        <Services />
        <Products />
        <TechStack />
        <CareerSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
