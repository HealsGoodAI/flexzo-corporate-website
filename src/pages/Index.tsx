import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PressBanner from "@/components/PressBanner";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import SectorsOverview from "@/components/SectorsOverview";

import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PressBanner />
      <BenefitsSection />
      <SectorsOverview />
      <FeaturesSection />
      <FeaturedJobsSection />
      <TestimonialsSection />
      <Footer />
      
    </div>
  );
};

export default Index;
