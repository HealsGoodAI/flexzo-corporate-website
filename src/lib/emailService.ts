import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const LEAD_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_LEAD_TEMPLATE_ID as string;
const APPLICANT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_APPLICANT_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export interface ApplicationEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  jobId: string;
  cvFile: File;
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const buildJobLink = (jobId: string): string => {
  const region = window.location.pathname.split("/")[1] || "uk";
  return `${window.location.origin}/${region}/jobs/${jobId}`;
};

const formatDate = (): string =>
  new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const sendApplicationEmails = async (params: ApplicationEmailParams): Promise<void> => {
  const { firstName, lastName, email, jobTitle, jobId, cvFile } = params;

  const cvBase64 = await fileToBase64(cvFile);
  const jobLink = buildJobLink(jobId);
  const currentDate = formatDate();

  await emailjs.send(
    SERVICE_ID,
    LEAD_TEMPLATE_ID,
    {
      to_email: "sales@flexzo.ai",
      firstName,
      lastName,
      email,
      jobTitle,
      jobLink,
      current_date: currentDate,
      attachment_name: cvFile.name,
      attachment_data: cvBase64,
    },
    PUBLIC_KEY,
  );

  await emailjs.send(
    SERVICE_ID,
    APPLICANT_TEMPLATE_ID,
    {
      to_email: email,
      firstName,
      lastName,
      jobTitle,
      jobLink,
      current_date: currentDate,
    },
    PUBLIC_KEY,
  );
};
