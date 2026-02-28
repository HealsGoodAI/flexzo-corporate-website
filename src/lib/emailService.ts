import { supabase } from "@/integrations/supabase/client";

export interface ApplicationEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  jobId: string;
  cvFile: File;
  region?: string;
}

export interface BookDemoEmailParams {
  name: string;
  email: string;
  telephone: string;
  organisation: string;
  date: string;
  time: string;
}

export interface ContactEmailParams {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface TestEmailResult {
  leadEmailHtml: string;
  applicantEmailHtml: string;
  leadSubject: string;
  applicantSubject: string;
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

const getRegion = (): string => {
  return window.location.pathname.split("/")[1] || "uk";
};

export const sendApplicationEmails = async (params: ApplicationEmailParams & { recaptchaToken: string; _hp_field?: string; _form_loaded_at?: number }): Promise<void> => {
  const { firstName, lastName, email, jobTitle, jobId, cvFile, region, recaptchaToken, _hp_field, _form_loaded_at } = params;

  const cvBase64 = await fileToBase64(cvFile);
  const jobLink = buildJobLink(jobId);
  const resolvedRegion = region || getRegion();

  const { data, error } = await supabase.functions.invoke("send-application-email", {
    body: {
      firstName,
      lastName,
      email,
      jobTitle,
      jobLink,
      cvBase64,
      cvFileName: cvFile.name,
      region: resolvedRegion,
      recaptchaToken,
      _hp_field,
      _form_loaded_at,
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

export const sendBookDemoEmail = async (params: BookDemoEmailParams & { recaptchaToken: string; _hp_field?: string; _form_loaded_at?: number }): Promise<void> => {
  const { recaptchaToken, _hp_field, _form_loaded_at, ...rest } = params;
  const { data, error } = await supabase.functions.invoke("send-application-email", {
    body: {
      type: "book_demo",
      ...rest,
      recaptchaToken,
      _hp_field,
      _form_loaded_at,
    },
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error("Failed to send demo booking email");
  }

  if (data?.error) {
    console.error("Email send error:", data.error);
    throw new Error(data.error);
  }
};

export const sendContactEmail = async (params: ContactEmailParams & { recaptchaToken: string; _hp_field?: string; _form_loaded_at?: number }): Promise<void> => {
  const { recaptchaToken, _hp_field, _form_loaded_at, ...rest } = params;
  const { data, error } = await supabase.functions.invoke("send-application-email", {
    body: {
      type: "contact",
      ...rest,
      recaptchaToken,
      _hp_field,
      _form_loaded_at,
    },
  });

  if (error) {
    console.error("Edge function error:", error);
    throw new Error("Failed to send contact email");
  }

  if (data?.error) {
    console.error("Email send error:", data.error);
    throw new Error(data.error);
  }
};

/**
 * Preview email templates with test data without actually sending.
 */
export const testEmailTemplates = async (overrides?: Partial<{
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  jobLink: string;
  region: string;
}>): Promise<TestEmailResult> => {
  const { data, error } = await supabase.functions.invoke("send-application-email", {
    body: {
      testMode: true,
      firstName: overrides?.firstName,
      lastName: overrides?.lastName,
      email: overrides?.email,
      jobTitle: overrides?.jobTitle,
      jobLink: overrides?.jobLink,
      region: overrides?.region || getRegion(),
    },
  });

  if (error) {
    console.error("Test email error:", error);
    throw new Error("Failed to generate test emails");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as TestEmailResult;
};
