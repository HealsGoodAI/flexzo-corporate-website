import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegionLayout from "@/components/RegionLayout";
import GeoRedirect from "@/pages/GeoRedirect";
import Index from "./pages/Index";
import AiSourcing from "./pages/AiSourcing";
import InternalStaffBank from "./pages/InternalStaffBank";
import CollaborativeStaffBank from "./pages/CollaborativeStaffBank";
import ClinicalServicesPlanner from "./pages/ClinicalServicesPlanner";
import Amplify from "./pages/Amplify";
import EmployeeApp from "./pages/EmployeeApp";
import PlatformFeatures from "./pages/PlatformFeatures";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import JobApplicationSuccess from "./pages/JobApplicationSuccess";
import JobSearchResults from "./pages/JobSearchResults";
import JobApplication from "./pages/JobApplication";
import News from "./pages/News";
import Article from "./pages/Article";
import Investors from "./pages/Investors";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import BookDemo from "./pages/BookDemo";
import Contact from "./pages/Contact";
import PrimaryCare from "./pages/PrimaryCare";
import Hospitals from "./pages/Hospitals";
import PrivateHealthcare from "./pages/PrivateHealthcare";
import Pharmacy from "./pages/Pharmacy";
import Rostering from "./pages/Rostering";
import CarbonReductionPlan from "./pages/CarbonReductionPlan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Root: geo-detect and redirect to /uk or /us */}
          <Route path="/" element={<GeoRedirect />} />

          {/* Region-scoped routes */}
          <Route path="/:region" element={<RegionLayout />}>
            <Route index element={<Index />} />
            <Route path="products/ai-sourcing" element={<AiSourcing />} />
            <Route path="products/internal-staff-bank" element={<InternalStaffBank />} />
            <Route path="products/collaborative-staff-bank" element={<CollaborativeStaffBank />} />
            <Route path="products/clinical-services-planner" element={<ClinicalServicesPlanner />} />
            <Route path="products/amplify" element={<Amplify />} />
            <Route path="products/employee-app" element={<EmployeeApp />} />
            <Route path="products/rostering" element={<Rostering />} />
            <Route path="platform-features" element={<PlatformFeatures />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/search" element={<JobSearchResults />} />
            <Route path="jobs/:id" element={<JobDetail />} />
            <Route path="jobs/:id/apply" element={<JobApplication />} />
            <Route path="jobs/:id/apply/success" element={<JobApplicationSuccess />} />
            <Route path="news" element={<News />} />
            <Route path="news/:slug" element={<Article />} />
            <Route path="investors" element={<Investors />} />
            <Route path="about" element={<About />} />
            <Route path="terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="carbon-reduction-plan" element={<CarbonReductionPlan />} />
            <Route path="book-demo" element={<BookDemo />} />
            <Route path="contact" element={<Contact />} />
            <Route path="sectors/primary-care" element={<PrimaryCare />} />
            <Route path="sectors/hospitals" element={<Hospitals />} />
            <Route path="sectors/private-healthcare" element={<PrivateHealthcare />} />
            <Route path="sectors/pharmacy" element={<Pharmacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
