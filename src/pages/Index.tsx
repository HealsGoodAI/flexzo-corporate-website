import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PressBanner from "@/components/PressBanner";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import SectorsOverview from "@/components/SectorsOverview";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import Footer from "@/components/Footer";
import SEO, { organizationSchema, websiteSchema } from "@/components/SEO";
import { useRegion } from "@/hooks/useRegion";

const Index = () => {
  const { region } = useRegion();
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI-Powered Healthcare Staffing Platform"
        description="Flexzo – AI-powered healthcare staffing platform. Smarter workforce management for hospitals, primary care, pharmacy and social care. Book a demo today."
        path={`/${region}`}
        jsonLd={[organizationSchema, websiteSchema]}
      />
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
