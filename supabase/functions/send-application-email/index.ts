import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GMAIL_USER = "applications@flexzo.ai";
const SALES_EMAIL = "job.leads@flexzo.ai";
const DEFAULT_JOBS_URL = "https://flexzo.ai/uk/jobs";
const LOGO_URL = "https://nlallbutnmsyeqyawzbh.supabase.co/storage/v1/object/public/email-assets/flexzo-logo-white.png";

/* ── Rate limiting (in-memory, per IP) ── */

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// Periodic cleanup to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 60_000);

/* ── UTM tracking ── */

function addUtmParams(url: string, source: string): string {
  if (!url) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}utm_source=email&utm_medium=application&utm_campaign=${source}_notification&utm_content=job_link`;
}

/* ── Template rendering ── */

function renderTemplate(template: string, vars: Record<string, string>): string {
  let html = template;
  for (const [k, v] of Object.entries(vars)) {
    html = html.replaceAll(`{{${k}}}`, v);
  }
  return html;
}

/* ── SMTP client factory ── */

function createSmtpClient(appPassword: string) {
  return new SMTPClient({
    connection: {
      hostname: "smtp.gmail.com",
      port: 465,
      tls: true,
      auth: { username: GMAIL_USER, password: appPassword },
    },
  });
}

function getCurrentDate(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

/* ── Allowed origins ── */
const ALLOWED_ORIGINS = [
  "https://flexzo.ai",
  "https://www.flexzo.ai",
  "https://id-preview--619f4086-4b06-4f96-83a0-3895208dee1c.lovable.app",
];

/* ── Allowed reCAPTCHA hostnames ── */
const ALLOWED_RECAPTCHA_HOSTNAMES = [
  "flexzo.ai",
  "www.flexzo.ai",
  "id-preview--619f4086-4b06-4f96-83a0-3895208dee1c.lovable.app",
];

/* ── Content validation helpers ── */

const MIN_SUBMISSION_TIME_MS = 2500; // 2.5 seconds minimum

function isGibberish(text: string): boolean {
  if (!text || text.length < 3) return false;
  // No spaces in a message longer than 20 chars
  if (text.length > 20 && !text.includes(" ")) return true;
  // High ratio of non-alpha characters
  const alphaCount = (text.match(/[a-zA-Z\s]/g) || []).length;
  if (text.length > 10 && alphaCount / text.length < 0.5) return true;
  // Entropy check: same char repeated excessively
  const charFreq = new Map<string, number>();
  for (const c of text) charFreq.set(c, (charFreq.get(c) || 0) + 1);
  const maxFreq = Math.max(...charFreq.values());
  if (text.length > 10 && maxFreq / text.length > 0.5) return true;
  return false;
}

function validateContent(body: Record<string, unknown>): string | null {
  const { type } = body;

  // Honeypot check — if the hidden field has any value, it's a bot
  if (body._hp_field && String(body._hp_field).trim() !== "") {
    return "Submission rejected";
  }

  // Minimum submission time check
  if (body._form_loaded_at) {
    const loadedAt = Number(body._form_loaded_at);
    if (!isNaN(loadedAt) && Date.now() - loadedAt < MIN_SUBMISSION_TIME_MS) {
      return "Submission too fast. Please try again.";
    }
  }

  // Content-specific checks
  if (type === "contact") {
    const message = String(body.message || "");
    if (message.trim().length < 10) return "Message is too short";
    if (isGibberish(message)) return "Message content appears invalid";
    const name = String(body.name || "");
    if (name.trim().length < 2) return "Name is too short";
    if (isGibberish(name)) return "Name appears invalid";
  }

  if (type === "book_demo") {
    const name = String(body.name || "");
    if (name.trim().length < 2) return "Name is too short";
    if (isGibberish(name)) return "Name appears invalid";
  }

  // For applications: check name fields
  if (!type || type === "application") {
    const firstName = String(body.firstName || "");
    const lastName = String(body.lastName || "");
    if (firstName.trim().length < 2) return "First name is too short";
    if (lastName.trim().length < 2) return "Last name is too short";
    if (isGibberish(firstName) || isGibberish(lastName)) return "Name appears invalid";
  }

  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // ── Origin validation ──
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
    return new Response(JSON.stringify({ error: "Forbidden origin" }), {
      status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
    });
  }

  try {
    const body = await req.json();
    const { type, recaptchaToken } = body;

    const appPassword = Deno.env.get("GMAIL_APP_PASSWORD");
    if (!appPassword && !body.testMode) {
      throw new Error("GMAIL_APP_PASSWORD not configured");
    }

    // ── reCAPTCHA verification (skip for testMode and generic internal emails) ──
    if (!body.testMode && type !== "generic") {
      if (!recaptchaToken) {
        return new Response(JSON.stringify({ error: "reCAPTCHA verification required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const recaptchaSecret = Deno.env.get("RECAPTCHA_SECRET_KEY");
      if (!recaptchaSecret) {
        throw new Error("RECAPTCHA_SECRET_KEY not configured");
      }
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        console.error("reCAPTCHA failed:", verifyData);
        return new Response(JSON.stringify({ error: "reCAPTCHA verification failed" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // ── Hostname validation ──
      if (verifyData.hostname && !ALLOWED_RECAPTCHA_HOSTNAMES.includes(verifyData.hostname)) {
        console.error("reCAPTCHA hostname mismatch:", verifyData.hostname);
        return new Response(JSON.stringify({ error: "reCAPTCHA hostname mismatch" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // ── Honeypot, timing, and content validation (skip for testMode and generic) ──
    if (!body.testMode && type !== "generic") {
      const contentError = validateContent(body);
      if (contentError) {
        return new Response(JSON.stringify({ error: contentError }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const currentDate = getCurrentDate();

    // ── Route by type ──
    if (type === "book_demo") {
      return await handleBookDemo(body, appPassword!, currentDate);
    }
    if (type === "contact") {
      return await handleContact(body, appPassword!, currentDate);
    }
    if (type === "generic") {
      return await handleGeneric(body, appPassword!, currentDate);
    }

    // Default: job application (backward compatible)
    return await handleApplication(body, appPassword!, currentDate);
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

/* ── Job Application Handler ── */

async function handleApplication(body: Record<string, string>, appPassword: string, currentDate: string) {
  const { firstName, lastName, email, jobTitle, jobLink, cvBase64, cvFileName, testMode, region } = body;

  const safeJobLink = jobLink || DEFAULT_JOBS_URL;

  if (testMode) {
    const testVars = {
      firstName: firstName || "Jane",
      lastName: lastName || "Doe",
      email: email || "jane.doe@example.com",
      jobTitle: jobTitle || "Registered Nurse – Test Position",
      jobLink: addUtmParams(safeJobLink, "applicant"),
      jobLinkLead: addUtmParams(safeJobLink, "lead"),
      current_date: currentDate,
    };
    const applicantTemplate = (region === "us") ? APPLICANT_US_TEMPLATE : APPLICANT_UK_TEMPLATE;
    return new Response(
      JSON.stringify({
        success: true,
        testMode: true,
        leadEmailHtml: renderTemplate(LEAD_TEMPLATE, { ...testVars, jobLink: testVars.jobLinkLead }),
        applicantEmailHtml: renderTemplate(applicantTemplate, testVars),
        leadSubject: `New Job Application – ${testVars.jobTitle}`,
        applicantSubject: `Application Received – ${testVars.jobTitle}`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  if (!firstName || !lastName || !email || !jobTitle) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const templateVars = {
    firstName, lastName, email, jobTitle,
    jobLink: addUtmParams(safeJobLink, "applicant"),
    current_date: currentDate,
  };
  const leadTemplateVars = { ...templateVars, jobLink: addUtmParams(safeJobLink, "lead") };

  const attachments: Array<{ filename: string; content: Uint8Array; contentType: string; encoding: string }> = [];
  if (cvBase64 && cvFileName) {
    const binaryStr = atob(cvBase64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
    attachments.push({ filename: cvFileName, content: bytes, contentType: "application/octet-stream", encoding: "binary" });
  }

  const applicantTemplate = (region === "us") ? APPLICANT_US_TEMPLATE : APPLICANT_UK_TEMPLATE;
  const client = createSmtpClient(appPassword);

  await client.send({
    from: GMAIL_USER, to: SALES_EMAIL,
    subject: `New Job Application – ${jobTitle}`,
    html: renderTemplate(LEAD_TEMPLATE, leadTemplateVars),
    attachments,
  });

  await client.send({
    from: GMAIL_USER, to: email,
    subject: `Application Received – ${jobTitle}`,
    html: renderTemplate(applicantTemplate, templateVars),
  });

  await client.close();
  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/* ── Book Demo Handler ── */

async function handleBookDemo(body: Record<string, string>, appPassword: string, currentDate: string) {
  const { name, email, telephone, organisation, date, time } = body;

  if (!name || !email) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const vars = { name, email, telephone: telephone || "Not provided", organisation: organisation || "Not provided", date: date || "Not specified", time: time || "Not specified", current_date: currentDate };

  const client = createSmtpClient(appPassword);
  await client.send({
    from: GMAIL_USER, to: SALES_EMAIL,
    subject: `New Demo Booking Request – ${name}`,
    html: renderTemplate(BOOK_DEMO_TEMPLATE, vars),
  });
  await client.close();

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/* ── Contact Handler ── */

async function handleContact(body: Record<string, string>, appPassword: string, currentDate: string) {
  const { name, email, phone, company, message } = body;

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const vars = { name, email, phone: phone || "Not provided", company: company || "Not provided", message, current_date: currentDate };

  const client = createSmtpClient(appPassword);
  await client.send({
    from: GMAIL_USER, to: SALES_EMAIL,
    subject: `New Contact Form Submission – ${name}`,
    html: renderTemplate(CONTACT_TEMPLATE, vars),
  });
  await client.close();

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/* ── Generic Handler ── */

async function handleGeneric(body: Record<string, string>, appPassword: string, _currentDate: string) {
  const { to, subject, greeting, bodyContent, ctaLink, ctaText, note } = body;

  if (!to || !subject || !bodyContent) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const vars = { subject, greeting: greeting || "", body: bodyContent, ctaLink: ctaLink || "https://flexzo.ai", ctaText: ctaText || "Visit Flexzo", note: note || "" };

  const client = createSmtpClient(appPassword);
  await client.send({
    from: GMAIL_USER, to,
    subject,
    html: renderTemplate(GENERIC_TEMPLATE, vars),
  });
  await client.close();

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/* ── Inline templates ── */

const LEAD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Job Application – {{jobTitle}}</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#0a2540;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:28px;width:auto;display:block}
    .alert-bar{background:#0075FF;padding:10px 32px;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
    .content{padding:28px 32px 24px}
    .heading{font-size:20px;font-weight:700;color:#063165;margin:0 0 6px;line-height:1.3}
    .sub{font-size:13px;color:#6B7280;margin:0 0 24px}
    .divider{height:1px;background:#E5E7EB;margin:20px 0}
    .section-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 10px}
    .detail-grid{display:table;width:100%;border-collapse:collapse}
    .detail-row{display:table-row}
    .detail-key{display:table-cell;padding:7px 16px 7px 0;font-size:13px;color:#6B7280;white-space:nowrap;vertical-align:top;width:120px}
    .detail-val{display:table-cell;padding:7px 0;font-size:13px;color:#063165;font-weight:600;vertical-align:top}
    .job-chip{display:inline-block;background:#EFF6FF;color:#0075FF;border:1px solid #BFDBFE;border-radius:6px;padding:6px 12px;font-size:13px;font-weight:600;margin-bottom:20px}
    .cv-box{display:flex;align-items:center;gap:12px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;padding:12px 16px;margin-top:4px}
    .cv-icon{width:32px;height:32px;border-radius:6px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .cv-name{font-size:13px;font-weight:600;color:#063165}
    .cv-sub{font-size:11px;color:#9CA3AF;margin-top:1px}
    .cta-row{margin-top:24px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:7px}
    .footer{background:#063165;padding:20px 32px;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6}
    .footer strong{color:rgba(255,255,255,0.7)}
    .footer a{color:rgba(255,255,255,0.5);text-decoration:none}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="${LOGO_URL}" alt="Flexzo"/>
    </div>
    <div class="alert-bar">New Job Application Received</div>
    <div class="content">
      <p class="heading">A candidate has applied for a position</p>
      <p class="sub">Received on {{current_date}} — please review the applicant details below and follow up accordingly.</p>
      <div class="job-chip">{{jobTitle}}</div>
      <p class="section-label">Applicant Details</p>
      <div class="detail-grid">
        <div class="detail-row"><span class="detail-key">First Name</span><span class="detail-val">{{firstName}}</span></div>
        <div class="detail-row"><span class="detail-key">Last Name</span><span class="detail-val">{{lastName}}</span></div>
        <div class="detail-row"><span class="detail-key">Email</span><span class="detail-val"><a href="mailto:{{email}}" style="color:#0075FF;text-decoration:none;">{{email}}</a></span></div>
        <div class="detail-row"><span class="detail-key">Job Link</span><span class="detail-val"><a href="{{jobLink}}" style="color:#0075FF;text-decoration:none;">View Listing</a></span></div>
      </div>
      <div class="divider"></div>
      <p class="section-label">CV / Resume</p>
      <div class="cv-box">
        <div class="cv-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#0075FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="#0075FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div>
          <div class="cv-name">{{firstName}} {{lastName}} – CV</div>
          <div class="cv-sub">Attached to this email</div>
        </div>
      </div>
      <div class="cta-row"><a href="mailto:{{email}}" class="cta-btn">Reply to Applicant</a></div>
    </div>
    <div class="footer">
      <strong>Flexzo Jobs</strong> &nbsp;&middot;&nbsp; {{jobTitle}} &nbsp;&middot;&nbsp; {{current_date}}<br/>
      This is an automated notification from the Flexzo job application system.<br/>
      <a href="https://flexzo.ai/uk/privacy-policy">Privacy Policy</a> &middot; <a href="https://flexzo.ai/uk/terms-and-conditions">Terms and Conditions</a>
    </div>
  </div>
</div>
</body>
</html>`;

const APPLICANT_UK_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Application Received – {{jobTitle}}</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#0a2540;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:26px;width:auto;display:block}
    .hero{background:linear-gradient(135deg,#0075FF 0%,#063165 100%);padding:36px 32px 32px;text-align:center}
    .check-circle{width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px}
    .hero-title{font-size:22px;font-weight:700;color:#fff;margin:0 0 6px;line-height:1.3}
    .hero-sub{font-size:14px;color:rgba(255,255,255,0.75);margin:0;line-height:1.5}
    .content{padding:28px 32px}
    .greeting{font-size:16px;font-weight:600;color:#063165;margin:0 0 12px}
    .body-text{font-size:14px;line-height:1.65;color:#374151;margin:0 0 16px}
    .job-card{background:#F9FAFB;border:1px solid #E5E7EB;border-left:4px solid #0075FF;border-radius:8px;padding:14px 18px;margin:20px 0}
    .job-card-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 4px}
    .job-card-title{font-size:15px;font-weight:700;color:#063165;margin:0}
    .steps{margin:24px 0}
    .step{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .step-num{width:28px;height:28px;border-radius:50%;background:#EFF6FF;color:#0075FF;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
    .step-body{flex:1}
    .step-title{font-size:13px;font-weight:700;color:#063165;margin:0 0 2px}
    .step-desc{font-size:12px;color:#6B7280;line-height:1.5;margin:0}
    .compliance-note{background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:14px 18px;margin:20px 0;font-size:12px;color:#92400E;line-height:1.6}
    .compliance-note strong{color:#78350F}
    .divider{height:1px;background:#E5E7EB;margin:22px 0}
    .cta-section{text-align:center;margin-top:8px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px}
    .cta-note{font-size:12px;color:#9CA3AF;margin-top:10px}
    .footer{background:#063165;padding:20px 32px;text-align:center}
    .footer-logo img{height:20px;opacity:0.5;margin-bottom:10px}
    .footer-text{font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0}
    .footer-text a{color:rgba(255,255,255,0.5);text-decoration:none}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="${LOGO_URL}" alt="Flexzo"/>
    </div>
    <div class="hero">
      <div class="check-circle">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
          <path d="M8 12.5l3 3 5-5.5" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="hero-title">Application Received</p>
      <p class="hero-sub">Thank you for applying through Flexzo. We shall be in touch shortly.</p>
    </div>
    <div class="content">
      <p class="greeting">Dear {{firstName}},</p>
      <p class="body-text">We are pleased to confirm that we have received your application. Our clinical resourcing team will carefully review your CV and experience against the requirements for the role below. Should your profile be a strong match, we will be in contact to discuss next steps.</p>
      <div class="job-card">
        <p class="job-card-label">You applied for</p>
        <p class="job-card-title">{{jobTitle}}</p>
      </div>
      <p class="body-text">In the meantime, here is what happens next:</p>
      <div class="steps">
        <div class="step"><div class="step-num">1</div><div class="step-body"><p class="step-title">Application Review</p><p class="step-desc">Our clinical resourcing team will review your CV and match your experience to the role requirements, typically within 2 working days.</p></div></div>
        <div class="step"><div class="step-num">2</div><div class="step-body"><p class="step-title">Initial Contact</p><p class="step-desc">If shortlisted, a Flexzo consultant will reach out by telephone or email to discuss the opportunity in detail and answer any questions you may have.</p></div></div>
        <div class="step"><div class="step-num">3</div><div class="step-body"><p class="step-title">Compliance and Credentialling</p><p class="step-desc">We will guide you through our streamlined compliance process, including enhanced DBS checks, right-to-work verification, professional registration checks, reference verification, and any role-specific requirements.</p></div></div>
      </div>
      <div class="compliance-note">
        <strong>Right to Work:</strong> In accordance with UK immigration law, all candidates must provide evidence of their right to work in the United Kingdom. EU, EEA, and Swiss nationals who arrived after 31 December 2020 are required to hold valid immigration status under the UK points-based system or EU Settlement Scheme. Flexzo will guide you through this process.
      </div>
      <div class="divider"></div>
      <div class="cta-section">
        <a href="{{jobLink}}" class="cta-btn">View Job Listing</a>
        <p class="cta-note">Questions? Email us at <a href="mailto:applications@flexzo.ai" style="color:#0075FF;">applications@flexzo.ai</a></p>
      </div>
    </div>
    <div class="footer">
      <div class="footer-logo"><img src="${LOGO_URL}" alt="Flexzo"/></div>
      <p class="footer-text">
        &copy; 2026 Flexzo. All rights reserved.<br/>
        Flexzo Ltd &middot; <a href="https://flexzo.ai/uk/privacy-policy">Privacy Policy</a> &middot; <a href="https://flexzo.ai/uk/terms-and-conditions">Terms and Conditions</a><br/>
        This is an automated email sent from <a href="mailto:applications@flexzo.ai">applications@flexzo.ai</a>. Please do not reply.
      </p>
    </div>
  </div>
</div>
</body>
</html>`;

const APPLICANT_US_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Application Received – {{jobTitle}}</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#0a2540;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:26px;width:auto;display:block}
    .hero{background:linear-gradient(135deg,#0075FF 0%,#063165 100%);padding:36px 32px 32px;text-align:center}
    .check-circle{width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px}
    .hero-title{font-size:22px;font-weight:700;color:#fff;margin:0 0 6px;line-height:1.3}
    .hero-sub{font-size:14px;color:rgba(255,255,255,0.75);margin:0;line-height:1.5}
    .content{padding:28px 32px}
    .greeting{font-size:16px;font-weight:600;color:#063165;margin:0 0 12px}
    .body-text{font-size:14px;line-height:1.65;color:#374151;margin:0 0 16px}
    .job-card{background:#F9FAFB;border:1px solid #E5E7EB;border-left:4px solid #0075FF;border-radius:8px;padding:14px 18px;margin:20px 0}
    .job-card-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 4px}
    .job-card-title{font-size:15px;font-weight:700;color:#063165;margin:0}
    .steps{margin:24px 0}
    .step{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .step-num{width:28px;height:28px;border-radius:50%;background:#EFF6FF;color:#0075FF;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
    .step-body{flex:1}
    .step-title{font-size:13px;font-weight:700;color:#063165;margin:0 0 2px}
    .step-desc{font-size:12px;color:#6B7280;line-height:1.5;margin:0}
    .compliance-note{background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:14px 18px;margin:20px 0;font-size:12px;color:#92400E;line-height:1.6}
    .compliance-note strong{color:#78350F}
    .divider{height:1px;background:#E5E7EB;margin:22px 0}
    .cta-section{text-align:center;margin-top:8px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px}
    .cta-note{font-size:12px;color:#9CA3AF;margin-top:10px}
    .footer{background:#063165;padding:20px 32px;text-align:center}
    .footer-logo img{height:20px;opacity:0.5;margin-bottom:10px}
    .footer-text{font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0}
    .footer-text a{color:rgba(255,255,255,0.5);text-decoration:none}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="${LOGO_URL}" alt="Flexzo"/>
    </div>
    <div class="hero">
      <div class="check-circle">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
          <path d="M8 12.5l3 3 5-5.5" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="hero-title">Application Received</p>
      <p class="hero-sub">Thank you for applying through Flexzo. We'll be in touch soon.</p>
    </div>
    <div class="content">
      <p class="greeting">Hi {{firstName}},</p>
      <p class="body-text">We're excited to confirm that we've received your application. Our clinical staffing team will carefully review your resume and qualifications against the requirements for the role below. If your profile is a strong match, we'll reach out to discuss next steps.</p>
      <div class="job-card">
        <p class="job-card-label">You applied for</p>
        <p class="job-card-title">{{jobTitle}}</p>
      </div>
      <p class="body-text">Here's what happens next:</p>
      <div class="steps">
        <div class="step"><div class="step-num">1</div><div class="step-body"><p class="step-title">Application Review</p><p class="step-desc">Our clinical staffing team will review your resume and match your qualifications to the role requirements, typically within 2 business days.</p></div></div>
        <div class="step"><div class="step-num">2</div><div class="step-body"><p class="step-title">Initial Contact</p><p class="step-desc">If shortlisted, a Flexzo recruiter will reach out by phone or email to discuss the opportunity and answer any questions.</p></div></div>
        <div class="step"><div class="step-num">3</div><div class="step-body"><p class="step-title">Compliance and Credentialing</p><p class="step-desc">We'll guide you through our streamlined compliance process, including background checks, license verification, drug screening, and any role-specific credentialing requirements.</p></div></div>
      </div>
      <div class="compliance-note">
        <strong>Employment Eligibility:</strong> All candidates must be authorized to work in the United States. Flexzo participates in E-Verify and complies with Form I-9 requirements. Flexzo is an Equal Opportunity Employer and does not discriminate on the basis of race, color, religion, sex, national origin, age, disability, or any other protected status.
      </div>
      <div class="divider"></div>
      <div class="cta-section">
        <a href="{{jobLink}}" class="cta-btn">View Job Listing</a>
        <p class="cta-note">Questions? Email us at <a href="mailto:applications@flexzo.ai" style="color:#0075FF;">applications@flexzo.ai</a></p>
      </div>
    </div>
    <div class="footer">
      <div class="footer-logo"><img src="${LOGO_URL}" alt="Flexzo"/></div>
      <p class="footer-text">
        &copy; 2026 Flexzo. All rights reserved.<br/>
        Flexzo Inc &middot; <a href="https://flexzo.ai/us/privacy-policy">Privacy Policy</a> &middot; <a href="https://flexzo.ai/us/terms-and-conditions">Terms and Conditions</a><br/>
        This is an automated email sent from <a href="mailto:applications@flexzo.ai">applications@flexzo.ai</a>. Please do not reply.
      </p>
    </div>
  </div>
</div>
</body>
</html>`;

const BOOK_DEMO_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Demo Booking Request</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#0a2540;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:28px;width:auto;display:block}
    .alert-bar{background:#0075FF;padding:10px 32px;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
    .content{padding:28px 32px 24px}
    .heading{font-size:20px;font-weight:700;color:#063165;margin:0 0 6px;line-height:1.3}
    .sub{font-size:13px;color:#6B7280;margin:0 0 24px}
    .divider{height:1px;background:#E5E7EB;margin:20px 0}
    .section-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 10px}
    .detail-grid{display:table;width:100%;border-collapse:collapse}
    .detail-row{display:table-row}
    .detail-key{display:table-cell;padding:7px 16px 7px 0;font-size:13px;color:#6B7280;white-space:nowrap;vertical-align:top;width:140px}
    .detail-val{display:table-cell;padding:7px 0;font-size:13px;color:#063165;font-weight:600;vertical-align:top}
    .cta-row{margin-top:24px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:7px}
    .footer{background:#063165;padding:20px 32px;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6}
    .footer strong{color:rgba(255,255,255,0.7)}
    .footer a{color:rgba(255,255,255,0.5);text-decoration:none}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="${LOGO_URL}" alt="Flexzo"/>
    </div>
    <div class="alert-bar">New Demo Booking Request</div>
    <div class="content">
      <p class="heading">A new demo has been requested</p>
      <p class="sub">Received on {{current_date}} — please review the details below and schedule the demo accordingly.</p>
      <p class="section-label">Contact Details</p>
      <div class="detail-grid">
        <div class="detail-row"><span class="detail-key">Name</span><span class="detail-val">{{name}}</span></div>
        <div class="detail-row"><span class="detail-key">Email</span><span class="detail-val"><a href="mailto:{{email}}" style="color:#0075FF;text-decoration:none;">{{email}}</a></span></div>
        <div class="detail-row"><span class="detail-key">Telephone</span><span class="detail-val">{{telephone}}</span></div>
        <div class="detail-row"><span class="detail-key">Organisation</span><span class="detail-val">{{organisation}}</span></div>
      </div>
      <div class="divider"></div>
      <p class="section-label">Preferred Schedule</p>
      <div class="detail-grid">
        <div class="detail-row"><span class="detail-key">Preferred Date</span><span class="detail-val">{{date}}</span></div>
        <div class="detail-row"><span class="detail-key">Preferred Time</span><span class="detail-val">{{time}}</span></div>
      </div>
      <div class="cta-row"><a href="mailto:{{email}}" class="cta-btn">Reply to Requester</a></div>
    </div>
    <div class="footer">
      <strong>Flexzo Demo Requests</strong> &nbsp;&middot;&nbsp; {{current_date}}<br/>
      This is an automated notification from the Flexzo demo booking system.<br/>
      <a href="https://flexzo.ai/uk/privacy-policy">Privacy Policy</a> &middot; <a href="https://flexzo.ai/uk/terms-and-conditions">Terms and Conditions</a>
    </div>
  </div>
</div>
</body>
</html>`;

const CONTACT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Contact Form Submission</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#0a2540;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:28px;width:auto;display:block}
    .alert-bar{background:#0075FF;padding:10px 32px;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
    .content{padding:28px 32px 24px}
    .heading{font-size:20px;font-weight:700;color:#063165;margin:0 0 6px;line-height:1.3}
    .sub{font-size:13px;color:#6B7280;margin:0 0 24px}
    .divider{height:1px;background:#E5E7EB;margin:20px 0}
    .section-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 10px}
    .detail-grid{display:table;width:100%;border-collapse:collapse}
    .detail-row{display:table-row}
    .detail-key{display:table-cell;padding:7px 16px 7px 0;font-size:13px;color:#6B7280;white-space:nowrap;vertical-align:top;width:140px}
    .detail-val{display:table-cell;padding:7px 0;font-size:13px;color:#063165;font-weight:600;vertical-align:top}
    .message-box{background:#F9FAFB;border:1px solid #E5E7EB;border-left:4px solid #0075FF;border-radius:8px;padding:14px 18px;margin:16px 0;font-size:13px;color:#374151;line-height:1.65}
    .cta-row{margin-top:24px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:7px}
    .footer{background:#063165;padding:20px 32px;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6}
    .footer strong{color:rgba(255,255,255,0.7)}
    .footer a{color:rgba(255,255,255,0.5);text-decoration:none}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="${LOGO_URL}" alt="Flexzo"/>
    </div>
    <div class="alert-bar">New Contact Form Submission</div>
    <div class="content">
      <p class="heading">Someone has reached out via the contact form</p>
      <p class="sub">Received on {{current_date}} — please review the details below and respond accordingly.</p>
      <p class="section-label">Contact Details</p>
      <div class="detail-grid">
        <div class="detail-row"><span class="detail-key">Name</span><span class="detail-val">{{name}}</span></div>
        <div class="detail-row"><span class="detail-key">Email</span><span class="detail-val"><a href="mailto:{{email}}" style="color:#0075FF;text-decoration:none;">{{email}}</a></span></div>
        <div class="detail-row"><span class="detail-key">Phone</span><span class="detail-val">{{phone}}</span></div>
        <div class="detail-row"><span class="detail-key">Company</span><span class="detail-val">{{company}}</span></div>
      </div>
      <div class="divider"></div>
      <p class="section-label">Message</p>
      <div class="message-box">{{message}}</div>
      <div class="cta-row"><a href="mailto:{{email}}" class="cta-btn">Reply to Sender</a></div>
    </div>
    <div class="footer">
      <strong>Flexzo Contact</strong> &nbsp;&middot;&nbsp; {{current_date}}<br/>
      This is an automated notification from the Flexzo contact form.<br/>
      <a href="https://flexzo.ai/uk/privacy-policy">Privacy Policy</a> &middot; <a href="https://flexzo.ai/uk/terms-and-conditions">Terms and Conditions</a>
    </div>
  </div>
</div>
</body>
</html>`;

const GENERIC_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>{{subject}}</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;color:#0a2540;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:26px;width:auto;display:block}
    .content{padding:28px 32px}
    .greeting{font-size:16px;font-weight:600;color:#063165;margin:0 0 12px}
    .body-text{font-size:14px;line-height:1.65;color:#374151;margin:0 0 16px}
    .divider{height:1px;background:#E5E7EB;margin:22px 0}
    .cta-section{text-align:center;margin-top:8px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px}
    .cta-note{font-size:12px;color:#9CA3AF;margin-top:10px}
    .footer{background:#063165;padding:20px 32px;text-align:center}
    .footer-logo img{height:20px;opacity:0.5;margin-bottom:10px}
    .footer-text{font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0}
    .footer-text a{color:rgba(255,255,255,0.5);text-decoration:none}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="${LOGO_URL}" alt="Flexzo"/>
    </div>
    <div class="content">
      <p class="greeting">{{greeting}}</p>
      <div class="body-text">{{body}}</div>
      <div class="divider"></div>
      <div class="cta-section">
        <a href="{{ctaLink}}" class="cta-btn">{{ctaText}}</a>
        <p class="cta-note">{{note}}</p>
      </div>
    </div>
    <div class="footer">
      <div class="footer-logo"><img src="${LOGO_URL}" alt="Flexzo"/></div>
      <p class="footer-text">
        &copy; 2026 Flexzo. All rights reserved.<br/>
        Flexzo Ltd &middot; <a href="https://flexzo.ai/uk/privacy-policy">Privacy Policy</a> &middot; <a href="https://flexzo.ai/uk/terms-and-conditions">Terms and Conditions</a><br/>
        This is an automated email from <a href="mailto:applications@flexzo.ai">applications@flexzo.ai</a>. Please do not reply.
      </p>
    </div>
  </div>
</div>
</body>
</html>`;
