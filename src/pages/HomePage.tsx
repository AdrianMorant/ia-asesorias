import React, { useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { Bento } from "@/components/landing/Bento";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { Pricing, Faq, Footer } from "@/components/landing/Closing";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "KontaPro — El copiloto contable IA que cuadra al céntimo";
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <RoiCalculator />
      <Bento />
      <ProductPreview />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
};

export default HomePage;
