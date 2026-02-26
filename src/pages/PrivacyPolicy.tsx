import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const sections = [
  {
    title: "1. Introduction",
    content: [
      'Flexzo.ai ("we", "our", "us") is operated under Healsgood Ltd. This Privacy Policy explains how we collect, use, share and protect your personal data when you use our website, platform and services ("Services").',
      "We are committed to safeguarding your privacy and complying with all applicable data protection laws, including UK GDPR, UAE Federal Decree-Law No. 45/2021, United States privacy laws (including HIPAA and CCPA/CPRA), and South Africa's POPIA.",
      "By using Flexzo.ai, you agree to the terms of this Privacy Policy.",
    ],
  },
  {
    title: "2. Data Roles and Responsibilities",
    content: [
      "Flexzo.ai is a dual-facing workforce matching platform for healthcare.",
      "For Candidates (clinicians, workers): Flexzo.ai acts as a data controller, as we determine how Candidate Data is used to match you with suitable opportunities.",
      "For Clients (NHS trusts, healthcare providers, agencies): Flexzo.ai acts as a data processor, processing Candidate Data and Client data on your instructions.",
      "Healsgood Ltd (parent company) may act as a data controller for group-level purposes, including account management, billing, analytics, security and compliance.",
      "We only process Candidate Data with the Candidate's explicit consent.",
    ],
  },
  {
    title: "3. What Data We Collect",
    content: [
      "We may collect the following types of personal data:",
      "For Candidates: Identity details (name, date of birth, gender, photo ID). Contact details (email, phone, address). Employment history, qualifications, training records and compliance documents. Availability, preferences and skills. Right to Work information (including share codes). Health-related data required for compliance (such as vaccination records).",
      "For Clients: Organisation details. Contact details of authorised users. Job vacancy information. Payment and billing information.",
    ],
  },
  {
    title: "4. How We Use Your Data",
    content: [
      "We use your personal data to: Provide and manage the Flexzo.ai Services. Match Candidates with vacancies. Verify compliance and eligibility requirements. Communicate with you about Services, updates and opportunities. Meet legal, regulatory and safeguarding obligations. Improve our Services through analysis and feedback.",
    ],
  },
  {
    title: "5. Legal Basis for Processing",
    content: [
      "We process personal data under the following lawful bases:",
      "Consent: when Candidates choose to share their data with Clients.",
      "Contract: to deliver Services to Clients.",
      "Legal obligation: to comply with employment, healthcare and data protection laws.",
      "Legitimate interests: to improve Services, security and user experience.",
    ],
  },
  {
    title: "6. Sharing Your Data",
    content: [
      "We only share Candidate Data with Clients where the Candidate has given explicit consent.",
      "We may share data with: Clients (employers, recruiters, NHS trusts, healthcare providers). Service providers (cloud hosting, IT, compliance checks). Regulators, law enforcement or authorities where legally required.",
      "We do not sell personal data.",
    ],
  },
  {
    title: "7. International Transfers",
    content: [
      "Where data is transferred outside the UK, EU or other jurisdictions, we ensure adequate protections are in place, including standard contractual clauses or equivalent safeguards.",
    ],
  },
  {
    title: "8. Data Retention",
    content: [
      "Candidate Data: retained only for as long as necessary to provide Services or until consent is withdrawn.",
      "Client Data: retained for the duration of the contract and any legally required period.",
      "Compliance records: retained as required by law.",
    ],
  },
  {
    title: "9. Your Rights",
    content: [
      "Depending on your jurisdiction, you may have the right to: Access your data. Correct inaccurate data. Request deletion of your data. Restrict or object to processing. Data portability. Withdraw consent at any time.",
      "To exercise your rights, please contact us at hello@flexzo.ai",
    ],
  },
  {
    title: "10. Data Security",
    content: [
      "We implement technical and organisational measures to protect personal data against unauthorised access, alteration or loss. This includes encryption, access controls and secure hosting.",
    ],
  },
  {
    title: "11. Governing Law",
    content: [
      "United Kingdom: UK GDPR and the laws of England and Wales.",
      "United Arab Emirates: UAE Federal Data Protection Law.",
      "United States: HIPAA, CCPA/CPRA and applicable federal and state laws.",
      "South Africa: POPIA.",
    ],
  },
  {
    title: "12. Changes to This Policy",
    content: [
      'We may update this Privacy Policy from time to time. The updated version will be posted on our website with a revised "Last Updated" date.',
    ],
  },
  {
    title: "13. Contact Us",
    content: [
      "If you have any questions, contact us at: hello@flexzo.ai",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-[#0a2540] pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0CE3FF]">
            Legal
          </p>
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl">
            Privacy Policy
          </h1>
          <p className="max-w-xl text-lg text-primary-foreground/70">
            Last Updated: 17th of September 2025
          </p>
        </div>
      </section>

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

export default PrivacyPolicy;
