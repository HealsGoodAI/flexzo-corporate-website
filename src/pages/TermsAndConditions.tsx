import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const sections = [
  {
    title: "1. Introduction and Acceptance",
    content: [
      'Welcome to Flexzo.ai ("we", "our", "us"), a workforce matching platform operated under Healsgood Ltd. These Terms and Conditions ("Terms") govern your use of the Flexzo.ai website and services ("Services"), whether you are a Candidate (individual user) or a Client (employer, recruiter or partner organisation).',
      "By accessing the Flexzo.ai website or using our Services, you agree to these Terms. If you do not agree, you must not use the Services.",
      "Flexzo.ai operates as an intermediary workforce matching platform. We connect Candidates and Clients but we do not act as an employer, recruiter or guarantor of outcomes.",
    ],
  },
  {
    title: "2. Definitions",
    content: [
      '"Flexzo.ai" means the workforce matching platform operated under Healsgood Ltd.',
      '"Candidate" means an individual uploading compliance, skills, availability and other relevant information.',
      '"Client" means an organisation uploading vacancies and accessing Candidate profiles.',
      '"Services" means the Flexzo.ai platform, website, tools and related features.',
    ],
  },
  {
    title: "3. Scope of Services",
    content: [
      "Flexzo.ai provides a platform for Candidates and Clients to connect.",
      "Candidates may: Upload qualifications, compliance documents, skills and availability. Control the visibility of their profiles and consent to share data with Clients.",
      "Clients may: Upload vacancies and define requirements. Access Candidate profiles where consent has been given.",
      "Flexzo.ai does not act as an employer, recruiter or agency. We do not guarantee placement, employment or outcomes. Clients are responsible for verifying Candidate qualifications, compliance and suitability.",
    ],
  },
  {
    title: "4. Website Use",
    content: [
      "Access to the Flexzo.ai website is provided for lawful purposes only.",
      "You must not use the website in any way that causes, or may cause, damage to the website or impair its availability or accessibility.",
      "You must not use the website to store, host, transmit or distribute any material which is malicious, technologically harmful, unlawful, defamatory, obscene or infringing.",
      "All content on the website, including text, graphics, logos, icons, images and software, is owned by Healsgood or its licensors. You may not reproduce, modify, distribute or republish any part of the website without prior written consent.",
      "You are responsible for ensuring that any information or material you upload is accurate, lawful and free from harmful code.",
      "We do not guarantee that the website will always be available, secure or error-free. We are not liable for any loss or damage arising from use of the website or reliance on information provided.",
      "Links to third-party websites may be provided for convenience. Healsgood does not endorse, control or accept responsibility for third-party websites or their content.",
    ],
  },
  {
    title: "5. Data Roles and Responsibilities",
    content: [
      "For Candidates: Flexzo.ai acts as a data controller, as we decide how Candidate Data is processed to match you with opportunities.",
      "For Clients: Flexzo.ai acts as a data processor, processing Candidate and Vacancy Data on your instructions.",
      "Healsgood Ltd (parent company) may act as a data controller for group-level purposes, including account management, billing, analytics, security and compliance.",
      "Candidate Data is only shared with Clients where explicit consent has been provided by the Candidate.",
    ],
  },
  {
    title: "6. Eligibility and User Obligations",
    content: [
      "Users must be at least 18 years old.",
      "Candidates must provide accurate and truthful information.",
      "Clients must use Candidate Data solely for lawful recruitment purposes.",
      "Users must not misuse the platform, including fraudulent submissions, unauthorised access or malicious activity.",
    ],
  },
  {
    title: "7. Intellectual Property",
    content: [
      "All platform content, branding, design and software remain the property of Healsgood.",
      "Users may not copy, modify, distribute or reverse engineer any part of the Services without our written consent.",
    ],
  },
  {
    title: "8. Prohibited Uses",
    content: [
      "Users must not: Provide false or misleading information. Attempt to gain unauthorised access to the platform. Misuse Candidate or Client Data obtained via Flexzo.ai.",
    ],
  },
  {
    title: "9. Disclaimers and Limitation of Liability",
    content: [
      'Services are provided "as is" and "as available".',
      "Flexzo.ai does not guarantee employment, placement or successful matches.",
      "Flexzo.ai is not responsible for: The accuracy of Candidate or Vacancy Data. The verification of compliance documents. Client hiring decisions or employment outcomes.",
      "To the maximum extent permitted by law, Flexzo.ai's liability is limited to the fees paid for the Services in the preceding twelve months.",
    ],
  },
  {
    title: "10. Termination and Suspension",
    content: [
      "We may suspend or terminate access if these Terms are breached or Services are misused.",
    ],
  },
  {
    title: "11. Governing Law and Jurisdiction",
    content: [
      "United Kingdom users: governed by the laws of England and Wales.",
      "United Arab Emirates users: governed by the laws of the United Arab Emirates.",
      "United States users: governed by applicable federal law (including HIPAA, CCPA/CPRA and state-level privacy laws) and the laws of the state in which Flexzo.ai is incorporated.",
      "South Africa users: governed by the laws of the Republic of South Africa.",
    ],
  },
  {
    title: "12. Changes to Terms",
    content: [
      "We may update these Terms from time to time. Continued use of the Services constitutes acceptance of the updated Terms.",
    ],
  },
  {
    title: "13. Contact Information",
    content: [
      "For questions about these Terms, contact us at: hello@flexzo.ai",
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-[#0a2540] pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0CE3FF]">
            Legal
          </p>
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Terms & Conditions
          </h1>
          <p className="max-w-xl text-lg text-primary-foreground/70">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 text-xl font-bold text-foreground">{section.title}</h2>
              <div className="space-y-3">
                {section.content.map((paragraph, i) => (
                  <p key={i} className="leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
