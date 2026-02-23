import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GMAIL_USER = "applications@flexzo.ai";
const SALES_EMAIL = "sales@flexzo.ai";

/* ── HTML templates ── */

function leadEmailHtml(vars: Record<string, string>) {
  let html = LEAD_TEMPLATE;
  for (const [k, v] of Object.entries(vars)) {
    html = html.replaceAll(`{{${k}}}`, v);
  }
  return html;
}

function applicantEmailHtml(vars: Record<string, string>) {
  let html = APPLICANT_TEMPLATE;
  for (const [k, v] of Object.entries(vars)) {
    html = html.replaceAll(`{{${k}}}`, v);
  }
  return html;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { firstName, lastName, email, jobTitle, jobLink, cvBase64, cvFileName } = body;

    if (!firstName || !lastName || !email || !jobTitle) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const currentDate = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const appPassword = Deno.env.get("GMAIL_APP_PASSWORD");
    if (!appPassword) {
      throw new Error("GMAIL_APP_PASSWORD not configured");
    }

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: appPassword,
        },
      },
    });

    const templateVars = { firstName, lastName, email, jobTitle, jobLink: jobLink || "", current_date: currentDate };

    // Build attachments for lead email (CV)
    const attachments: Array<{ filename: string; content: Uint8Array; contentType: string }> = [];
    if (cvBase64 && cvFileName) {
      const binaryStr = atob(cvBase64);
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      attachments.push({
        filename: cvFileName,
        content: bytes,
        contentType: "application/octet-stream",
      });
    }

    // 1. Send lead notification to sales team
    await client.send({
      from: GMAIL_USER,
      to: SALES_EMAIL,
      subject: `New Job Application – ${jobTitle}`,
      html: leadEmailHtml(templateVars),
      attachments,
    });

    // 2. Send confirmation to applicant
    await client.send({
      from: GMAIL_USER,
      to: email,
      subject: `Application Received – ${jobTitle}`,
      html: applicantEmailHtml(templateVars),
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

/* ── Inline templates ── */

const LEAD_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Job Application – {{jobTitle}}</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:Arial,Helvetica,sans-serif;color:#111827;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px;display:flex;align-items:center;gap:12px}
    .header img{height:28px;width:auto;display:block}
    .header-label{color:rgba(255,255,255,0.55);font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-left:auto}
    .alert-bar{background:#0075FF;padding:10px 32px;color:#fff;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase}
    .content{padding:28px 32px 24px}
    .heading{font-size:20px;font-weight:700;color:#111827;margin:0 0 6px;line-height:1.3}
    .sub{font-size:13px;color:#6B7280;margin:0 0 24px}
    .divider{height:1px;background:#E5E7EB;margin:20px 0}
    .section-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 10px}
    .detail-grid{display:table;width:100%;border-collapse:collapse}
    .detail-row{display:table-row}
    .detail-key{display:table-cell;padding:7px 16px 7px 0;font-size:13px;color:#6B7280;white-space:nowrap;vertical-align:top;width:120px}
    .detail-val{display:table-cell;padding:7px 0;font-size:13px;color:#111827;font-weight:600;vertical-align:top}
    .job-chip{display:inline-block;background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;border-radius:6px;padding:6px 12px;font-size:13px;font-weight:600;margin-bottom:20px}
    .cv-box{display:flex;align-items:center;gap:12px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;padding:12px 16px;margin-top:4px}
    .cv-icon{width:32px;height:32px;border-radius:6px;background:#EFF6FF;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .cv-name{font-size:13px;font-weight:600;color:#111827}
    .cv-sub{font-size:11px;color:#9CA3AF;margin-top:1px}
    .cta-row{margin-top:24px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:7px}
    .footer{background:#F9FAFB;border-top:1px solid #E5E7EB;padding:16px 32px;font-size:11px;color:#9CA3AF;line-height:1.6}
    .footer strong{color:#6B7280}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="https://flexzo.ai/flexzo-logo-white.png" alt="Flexzo"/>
      <span class="header-label">Internal Alert</span>
    </div>
    <div class="alert-bar">&#9679;&nbsp; New Job Application Received</div>
    <div class="content">
      <p class="heading">A candidate has applied for a position</p>
      <p class="sub">Received on {{current_date}} — please review the applicant details below and follow up accordingly.</p>
      <div class="job-chip">&#128188;&nbsp; {{jobTitle}}</div>
      <p class="section-label">Applicant Details</p>
      <div class="detail-grid">
        <div class="detail-row"><span class="detail-key">First Name</span><span class="detail-val">{{firstName}}</span></div>
        <div class="detail-row"><span class="detail-key">Last Name</span><span class="detail-val">{{lastName}}</span></div>
        <div class="detail-row"><span class="detail-key">Email</span><span class="detail-val"><a href="mailto:{{email}}" style="color:#0075FF;text-decoration:none;">{{email}}</a></span></div>
        <div class="detail-row"><span class="detail-key">Job Link</span><span class="detail-val"><a href="{{jobLink}}" style="color:#0075FF;text-decoration:none;">View Listing &#8599;</a></span></div>
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
      <strong>Flexzo Jobs</strong> &nbsp;·&nbsp; {{jobTitle}} &nbsp;·&nbsp; {{current_date}}<br/>
      This is an automated notification from the Flexzo job application system. Do not reply directly to this email.
    </div>
  </div>
</div>
</body>
</html>`;

const APPLICANT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Application Received – {{jobTitle}}</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:Arial,Helvetica,sans-serif;color:#111827;-webkit-font-smoothing:antialiased}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:26px;width:auto;display:block}
    .hero{background:linear-gradient(135deg,#0075FF 0%,#063165 100%);padding:36px 32px 32px;text-align:center}
    .check-circle{width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px}
    .hero-title{font-size:22px;font-weight:700;color:#fff;margin:0 0 6px;line-height:1.3}
    .hero-sub{font-size:14px;color:rgba(255,255,255,0.75);margin:0;line-height:1.5}
    .content{padding:28px 32px}
    .greeting{font-size:16px;font-weight:600;color:#111827;margin:0 0 12px}
    .body-text{font-size:14px;line-height:1.65;color:#374151;margin:0 0 16px}
    .job-card{background:#F9FAFB;border:1px solid #E5E7EB;border-left:4px solid #0075FF;border-radius:8px;padding:14px 18px;margin:20px 0}
    .job-card-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 4px}
    .job-card-title{font-size:15px;font-weight:700;color:#111827;margin:0}
    .steps{margin:24px 0}
    .step{display:flex;gap:14px;margin-bottom:16px;align-items:flex-start}
    .step-num{width:28px;height:28px;border-radius:50%;background:#EFF6FF;color:#0075FF;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}
    .step-body{flex:1}
    .step-title{font-size:13px;font-weight:700;color:#111827;margin:0 0 2px}
    .step-desc{font-size:12px;color:#6B7280;line-height:1.5;margin:0}
    .divider{height:1px;background:#E5E7EB;margin:22px 0}
    .cta-section{text-align:center;margin-top:8px}
    .cta-btn{display:inline-block;background:#0075FF;color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:13px 28px;border-radius:8px}
    .cta-note{font-size:12px;color:#9CA3AF;margin-top:10px}
    .footer{background:#F9FAFB;border-top:1px solid #E5E7EB;padding:16px 32px;text-align:center}
    .footer-logo img{height:20px;opacity:0.5;margin-bottom:8px}
    .footer-text{font-size:11px;color:#9CA3AF;line-height:1.6;margin:0}
    .footer-text a{color:#9CA3AF}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header">
      <img src="https://storage.googleapis.com/healsgood-images/flexzo-white.png" alt="Flexzo"/>
    </div>
    <div class="hero">
      <div class="check-circle">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
          <path d="M8 12.5l3 3 5-5.5" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <p class="hero-title">Application Received!</p>
      <p class="hero-sub">Thank you for applying through Flexzo. We'll be in touch soon.</p>
    </div>
    <div class="content">
      <p class="greeting">Hi {{firstName}},</p>
      <p class="body-text">We're thrilled to have received your application. Our team will carefully review your CV and experience against the requirements for the role below. If your profile is a strong match, we'll be in contact to discuss next steps.</p>
      <div class="job-card">
        <p class="job-card-label">You applied for</p>
        <p class="job-card-title">{{jobTitle}}</p>
      </div>
      <p class="body-text">In the meantime, here's what happens next:</p>
      <div class="steps">
        <div class="step"><div class="step-num">1</div><div class="step-body"><p class="step-title">Application Review</p><p class="step-desc">Our clinical resourcing team will review your CV and match your experience to the role requirements, typically within 2 business days.</p></div></div>
        <div class="step"><div class="step-num">2</div><div class="step-body"><p class="step-title">Initial Contact</p><p class="step-desc">If shortlisted, a Flexzo consultant will reach out by phone or email to discuss the opportunity in detail and answer any questions you have.</p></div></div>
        <div class="step"><div class="step-num">3</div><div class="step-body"><p class="step-title">Compliance &amp; Credentialing</p><p class="step-desc">We'll guide you through our streamlined compliance process, including DBS checks, reference verification, and any role-specific requirements.</p></div></div>
      </div>
      <div class="divider"></div>
      <div class="cta-section">
        <a href="{{jobLink}}" class="cta-btn">View Job Listing</a>
        <p class="cta-note">Questions? Email us at <a href="mailto:applications@flexzo.ai" style="color:#0075FF;">applications@flexzo.ai</a></p>
      </div>
    </div>
    <div class="footer">
      <div class="footer-logo"><img src="https://flexzo.ai/Flexzo-Logo.svg" alt="Flexzo"/></div>
      <p class="footer-text">
        © 2026 Flexzo. All rights reserved.<br/>
        Flexzo Ltd · <a href="https://flexzo.ai/uk/privacy-policy">Privacy Policy</a> · <a href="https://flexzo.ai/uk/terms-and-conditions">Terms &amp; Conditions</a><br/>
        This is an automated email sent from <a href="mailto:applications@flexzo.ai">applications@flexzo.ai</a>. Please do not reply.
      </p>
    </div>
  </div>
</div>
</body>
</html>`;
