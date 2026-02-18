import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PlaceholderPage = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <Footer />
  </div>
);

export const AiSourcing = () => <PlaceholderPage title="AI Sourcing" subtitle="Intelligent candidate sourcing powered by agentic AI." />;
export const InternalStaffBank = () => <PlaceholderPage title="Internal Staff Bank" subtitle="Manage your internal workforce with precision." />;
export const CollaborativeStaffBank = () => <PlaceholderPage title="Collaborative Staff Bank" subtitle="Share workforce across trusts seamlessly." />;
export const ClinicalServicesPlanner = () => <PlaceholderPage title="Clinical Services Planner" subtitle="Plan clinical services with AI-driven insights." />;
export const Amplify = () => <PlaceholderPage title="Amplify" subtitle="Amplify your recruitment reach." />;
export const EmployeeApp = () => <PlaceholderPage title="Employee App" subtitle="Empower your workforce with a mobile-first experience." />;
export const PlatformFeatures = () => <PlaceholderPage title="Platform Features" subtitle="Explore the full Flexzo platform." />;
export const Jobs = () => <PlaceholderPage title="Jobs" subtitle="Browse the latest healthcare opportunities." />;
export const JobDetail = () => <PlaceholderPage title="Job Detail" subtitle="View role details and apply." />;
export const JobSearchResults = () => <PlaceholderPage title="Job Search Results" subtitle="Find your perfect role." />;
export const JobApplication = () => <PlaceholderPage title="Apply" subtitle="Submit your application." />;
export const News = () => <PlaceholderPage title="News" subtitle="Latest updates from Flexzo." />;
export const Article = () => <PlaceholderPage title="Article" subtitle="Read the full story." />;
export const Investors = () => <PlaceholderPage title="Investors" subtitle="Partner with Flexzo." />;
export const About = () => <PlaceholderPage title="About Flexzo" subtitle="Our mission to transform healthcare staffing." />;
export const TermsAndConditions = () => <PlaceholderPage title="Terms & Conditions" subtitle="Our terms of service." />;
export const PrivacyPolicy = () => <PlaceholderPage title="Privacy Policy" subtitle="How we handle your data." />;
export const BookDemo = () => <PlaceholderPage title="Book a Demo" subtitle="See Flexzo in action." />;
export const Contact = () => <PlaceholderPage title="Contact Us" subtitle="Get in touch with the Flexzo team." />;
export const PrimaryCare = () => <PlaceholderPage title="Primary Care" subtitle="AI-powered staffing for GP practices." />;
export const Hospitals = () => <PlaceholderPage title="Hospitals" subtitle="Workforce automation for NHS Trusts." />;
export const PrivateHealthcare = () => <PlaceholderPage title="Private Healthcare" subtitle="Premium talent for independent providers." />;
export const Pharmacy = () => <PlaceholderPage title="Community Pharmacy" subtitle="Locum cover built for pharmacy." />;
export const Rostering = () => <PlaceholderPage title="Rostering" subtitle="Intelligent shift planning and rostering." />;
