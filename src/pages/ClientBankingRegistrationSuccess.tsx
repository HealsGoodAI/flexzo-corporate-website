import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegion } from "@/hooks/useRegion";
import SEO from "@/components/SEO";

const ClientBankingRegistrationSuccess = () => {
  const { regionPath } = useRegion();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Banking Details Submitted | Flexzo AI"
        description="Your banking information has been submitted successfully."
      />
      <Navbar />

      <section className="flex min-h-[70vh] items-center justify-center pt-32 pb-20">
        <div className="mx-auto max-w-xl px-6 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
          >
            <CheckCircle className="h-10 w-10 text-accent" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-lg leading-relaxed text-muted-foreground"
          >
            Your banking information has been submitted successfully. A member of the Flexzo customer success team will be in touch shortly to confirm your details.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10 text-sm text-muted-foreground"
          >
            A PDF copy of your submission has been sent to our team for processing. If you have any questions in the meantime, please don't hesitate to contact us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              to={regionPath("/")}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Back to Home <ArrowRight size={16} />
            </Link>
            <Link
              to={regionPath("/contact")}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientBankingRegistrationSuccess;
