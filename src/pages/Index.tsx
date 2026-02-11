import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ChiSiamoSection from "@/components/ChiSiamoSection";
import ProductSection from "@/components/ProductSection";
import SeismicMapSection from "@/components/SeismicMapSection";
import ShopSection from "@/components/ShopSection";
import LoginSection from "@/components/LoginSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ChiSiamoSection />
        <ProductSection />
        <SeismicMapSection />
        <ShopSection />
        <LoginSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
