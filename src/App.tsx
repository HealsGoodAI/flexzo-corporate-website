import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import {
  AiSourcing, InternalStaffBank, CollaborativeStaffBank, ClinicalServicesPlanner,
  Amplify, EmployeeApp, PlatformFeatures, Jobs, JobDetail, JobSearchResults,
  JobApplication, News, Article, Investors, About, TermsAndConditions,
  PrivacyPolicy, BookDemo, Contact, PrimaryCare, Hospitals, PrivateHealthcare,
  Pharmacy, Rostering,
} from "./pages/SubPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/ai-sourcing" element={<AiSourcing />} />
          <Route path="/products/internal-staff-bank" element={<InternalStaffBank />} />
          <Route path="/products/collaborative-staff-bank" element={<CollaborativeStaffBank />} />
          <Route path="/products/clinical-services-planner" element={<ClinicalServicesPlanner />} />
          <Route path="/products/amplify" element={<Amplify />} />
          <Route path="/products/employee-app" element={<EmployeeApp />} />
          <Route path="/products/rostering" element={<Rostering />} />
          <Route path="/platform-features" element={<PlatformFeatures />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/search" element={<JobSearchResults />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/:id/apply" element={<JobApplication />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<Article />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sectors/primary-care" element={<PrimaryCare />} />
          <Route path="/sectors/hospitals" element={<Hospitals />} />
          <Route path="/sectors/private-healthcare" element={<PrivateHealthcare />} />
          <Route path="/sectors/pharmacy" element={<Pharmacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
