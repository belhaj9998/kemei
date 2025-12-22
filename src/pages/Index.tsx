import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductShowcase from "@/components/ProductShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import OrderForm from "@/components/OrderForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FixedOrderButton from "@/components/FixedOrderButton";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ProductShowcase />
      <TestimonialsSection />
      <OrderForm />
      <CTASection />
      <Footer />
      <FixedOrderButton />
    </main>
  );
};

export default Index;
