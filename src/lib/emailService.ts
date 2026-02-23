import { supabase } from "@/integrations/supabase/client";

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

export const sendApplicationEmails = async (params: ApplicationEmailParams): Promise<void> => {
  const { firstName, lastName, email, jobTitle, jobId, cvFile } = params;

  const cvBase64 = await fileToBase64(cvFile);
  const jobLink = buildJobLink(jobId);

  const { data, error } = await supabase.functions.invoke("send-application-email", {
    body: {
      firstName,
      lastName,
      email,
      jobTitle,
      jobLink,
      cvBase64,
      cvFileName: cvFile.name,
    },
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error("Failed to send application emails");
  }

  if (data?.error) {
    console.error("Email send error:", data.error);
    throw new Error(data.error);
  }
};
