import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}
