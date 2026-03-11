import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegionLayout from "@/components/RegionLayout";
import GeoRedirect from "@/pages/GeoRedirect";
import ScrollToTop from "@/components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const AiSourcing = lazy(() => import("./pages/AiSourcing"));
const InternalStaffBank = lazy(() => import("./pages/InternalStaffBank"));
const CollaborativeStaffBank = lazy(() => import("./pages/CollaborativeStaffBank"));
const NationalStaffBank = lazy(() => import("./pages/NationalStaffBank"));
const ClinicalServicesPlanner = lazy(() => import("./pages/ClinicalServicesPlanner"));
const Amplify = lazy(() => import("./pages/Amplify"));
const EmployeeApp = lazy(() => import("./pages/EmployeeApp"));
const PlatformFeatures = lazy(() => import("./pages/PlatformFeatures"));
const Jobs = lazy(() => import("./pages/Jobs"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const JobApplicationSuccess = lazy(() => import("./pages/JobApplicationSuccess"));
const JobSearchResults = lazy(() => import("./pages/JobSearchResults"));
const JobApplication = lazy(() => import("./pages/JobApplication"));
const News = lazy(() => import("./pages/News"));
const Article = lazy(() => import("./pages/Article"));
const Investors = lazy(() => import("./pages/Investors"));
const About = lazy(() => import("./pages/About"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const BookDemo = lazy(() => import("./pages/BookDemo"));
const BookDemoSuccess = lazy(() => import("./pages/BookDemoSuccess"));
const Contact = lazy(() => import("./pages/Contact"));
const ContactSuccess = lazy(() => import("./pages/ContactSuccess"));
const PrimaryCare = lazy(() => import("./pages/PrimaryCare"));
const Hospitals = lazy(() => import("./pages/Hospitals"));
const PrivateHealthcare = lazy(() => import("./pages/PrivateHealthcare"));
const Pharmacy = lazy(() => import("./pages/Pharmacy"));
const SocialCare = lazy(() => import("./pages/SocialCare"));
const Rostering = lazy(() => import("./pages/Rostering"));
const CarbonReductionPlan = lazy(() => import("./pages/CarbonReductionPlan"));
const Team = lazy(() => import("./pages/Team"));
const ClientBankingRegistration = lazy(() => import("./pages/ClientBankingRegistration"));
const ClientBankingRegistrationSuccess = lazy(() => import("./pages/ClientBankingRegistrationSuccess"));
const EmailTemplateTest = lazy(() => import("./pages/EmailTemplateTest"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Root: geo-detect and redirect to /uk or /us */}
          <Route path="/" element={<GeoRedirect />} />

          {/* Region-scoped routes */}
          <Route path="/:region" element={<RegionLayout />}>
            <Route index element={<Index />} />
            <Route path="products/ai-sourcing" element={<AiSourcing />} />
            <Route path="products/internal-staff-bank" element={<InternalStaffBank />} />
            <Route path="products/collaborative-staff-bank" element={<CollaborativeStaffBank />} />
            <Route path="products/national-staff-bank" element={<NationalStaffBank />} />
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
            <Route path="team" element={<Team />} />
            <Route path="book-demo" element={<BookDemo />} />
            <Route path="book-demo/success" element={<BookDemoSuccess />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contact/success" element={<ContactSuccess />} />
            <Route path="sectors/primary-care" element={<PrimaryCare />} />
            <Route path="sectors/hospitals" element={<Hospitals />} />
            <Route path="sectors/private-healthcare" element={<PrivateHealthcare />} />
            <Route path="sectors/pharmacy" element={<Pharmacy />} />
            <Route path="sectors/social-care" element={<SocialCare />} />
            <Route path="client-banking-registration" element={<ClientBankingRegistration />} />
            <Route path="internal/email-test" element={<EmailTemplateTest />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
