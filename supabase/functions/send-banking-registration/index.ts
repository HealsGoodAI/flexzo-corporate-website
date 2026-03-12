import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GMAIL_USER = "applications@flexzo.ai";
const SALES_EMAIL = "sales@flexzo.ai";
const LOGO_URL = "https://nlallbutnmsyeqyawzbh.supabase.co/storage/v1/object/public/email-assets/flexzo-logo-white.png";

const ALLOWED_ORIGINS = [
  "https://flexzo.ai",
  "https://www.flexzo.ai",
  "https://id-preview--619f4086-4b06-4f96-83a0-3895208dee1c.lovable.app",
];

const ALLOWED_RECAPTCHA_HOSTNAMES = [
  "flexzo.ai",
  "www.flexzo.ai",
  "id-preview--619f4086-4b06-4f96-83a0-3895208dee1c.lovable.app",
];

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

/* ── PDF builder ── */

function buildPdf(data: Record<string, string>): Uint8Array {
  const lines: string[] = [];
  lines.push("FLEXZO AI");
  lines.push("Business Banking Information Form");
  lines.push("");
  lines.push(`Date: ${data.date || new Date().toLocaleDateString("en-US")}`);
  lines.push("");
  lines.push("--- BUSINESS INFORMATION ---");
  lines.push(`Business Legal Name: ${data.businessLegalName || ""}`);
  if (data.dba) lines.push(`DBA: ${data.dba}`);
  lines.push(`Business Address: ${data.businessAddress || ""}`);
  lines.push(`City: ${data.city || ""}`);
  lines.push(`State / Province: ${data.state || ""}`);
  lines.push(`Postal Code: ${data.postalCode || ""}`);
  lines.push(`Country: ${data.country || ""}`);
  lines.push("");
  lines.push("--- CONTACT INFORMATION ---");
  lines.push(`Primary Contact Name: ${data.contactName || ""}`);
  lines.push(`Email Address: ${data.email || ""}`);
  lines.push(`Phone Number: ${data.phone || ""}`);
  lines.push("");
  lines.push("--- BANKING INFORMATION ---");
  lines.push(`Bank Name: ${data.bankName || ""}`);
  lines.push(`Bank Address: ${data.bankAddress || ""}`);
  lines.push(`Account Holder Name: ${data.accountHolderName || ""}`);
  lines.push(`Account Type: ${data.accountType === "savings" ? "Business Savings" : "Business Checking"}`);
  lines.push(`Account Number: ${data.accountNumber || ""}`);
  lines.push(`Routing Number: ${data.routingNumber || ""}`);
  if (data.swiftCode) lines.push(`SWIFT / BIC Code: ${data.swiftCode}`);
  if (data.iban) lines.push(`IBAN: ${data.iban}`);
  lines.push("");
  lines.push("--- PAYMENT PREFERENCES ---");
  const methods: Record<string, string> = { ach: "ACH Transfer", wire: "Wire Transfer", international: "International Transfer" };
  lines.push(`Preferred Payment Method: ${methods[data.paymentMethod] || data.paymentMethod || ""}`);
  lines.push("");
  lines.push("--- VERIFICATION ---");
  lines.push("The submitter confirmed that all banking information is accurate");
  lines.push("and belongs to the business listed above.");
  lines.push("");
  lines.push("--- SIGNATURE ---");
  lines.push(`Authorized Signatory: ${data.signatoryName || ""}`);
  lines.push(`Title / Position: ${data.titlePosition || ""}`);
  lines.push(`Date: ${data.date || ""}`);
  lines.push("[Signature provided electronically]");

  const textContent = lines.join("\n");
  const encoder = new TextEncoder();

  // Build content stream
  const streamLines: string[] = ["BT", "/F1 10 Tf"];
  let yPos = 770;
  for (const line of textContent.split("\n")) {
    if (yPos < 40) yPos = 770;
    const escaped = line.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    streamLines.push(`1 0 0 1 40 ${yPos} Tm`);
    streamLines.push(`(${escaped}) Tj`);
    yPos -= 14;
  }
  streamLines.push("ET");
  const stream = streamLines.join("\n");
  const streamLen = encoder.encode(stream).length;

  // Build PDF with correct sequential object numbering and tracked offsets
  const parts: string[] = [];
  let currentPos = 0;
  const objOffsets: number[] = []; // index 0 = obj 1, index 1 = obj 2, etc.

  const write = (s: string) => {
    parts.push(s);
    currentPos += encoder.encode(s).length;
  };

  write("%PDF-1.4\n");

  // Obj 1: Catalog
  objOffsets.push(currentPos);
  write("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");

  // Obj 2: Pages
  objOffsets.push(currentPos);
  write("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");

  // Obj 3: Page
  objOffsets.push(currentPos);
  write("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n");

  // Obj 4: Content stream
  objOffsets.push(currentPos);
  write(`4 0 obj\n<< /Length ${streamLen} >>\nstream\n${stream}\nendstream\nendobj\n`);

  // Obj 5: Font
  objOffsets.push(currentPos);
  write("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>\nendobj\n");

  // Xref
  const xrefPos = currentPos;
  const numObjs = objOffsets.length + 1; // +1 for object 0
  write("xref\n");
  write(`0 ${numObjs}\n`);
  write("0000000000 65535 f \n");
  for (const offset of objOffsets) {
    write(`${String(offset).padStart(10, "0")} 00000 n \n`);
  }

  write("trailer\n");
  write(`<< /Size ${numObjs} /Root 1 0 R >>\n`);
  write("startxref\n");
  write(`${xrefPos}\n`);
  write("%%EOF\n");

  return encoder.encode(parts.join(""));
}

/* ── HTML email template (using real tables for email client compatibility) ── */

function buildEmailHtml(data: Record<string, string>): string {
  const methods: Record<string, string> = { ach: "ACH Transfer", wire: "Wire Transfer", international: "International Transfer" };
  const accountTypes: Record<string, string> = { checking: "Business Checking", savings: "Business Savings" };

  const row = (label: string, value: string) =>
    value ? `<tr><td style="padding:7px 16px 7px 0;font-size:13px;color:#6B7280;white-space:nowrap;vertical-align:top;width:160px">${label}</td><td style="padding:7px 0;font-size:13px;color:#063165;font-weight:600;vertical-align:top">${value}</td></tr>` : "";

  const divider = `<tr><td colspan="2" style="padding:0"><div style="height:1px;background:#E5E7EB;margin:20px 0"></div></td></tr>`;
  const sectionLabel = (text: string) =>
    `<tr><td colspan="2" style="padding:0 0 10px 0;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF">${text}</td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Banking Registration - ${data.businessLegalName}</title>
</head>
<body style="margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,sans-serif;color:#0a2540">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F4F5F7;padding:32px 0 40px">
<tr><td align="center">
  <table width="680" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;width:92%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)">
    <!-- Header -->
    <tr><td style="background:#063165;padding:22px 32px">
      <img src="${LOGO_URL}" alt="Flexzo" style="height:28px;width:auto;display:block"/>
    </td></tr>
    <!-- Alert bar -->
    <tr><td style="background:#0075FF;padding:10px 32px;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">
      New Client Banking Registration
    </td></tr>
    <!-- Content -->
    <tr><td style="padding:28px 32px 24px">
      <p style="font-size:20px;font-weight:700;color:#063165;margin:0 0 6px">Banking details submitted by ${data.businessLegalName}</p>
      <p style="font-size:13px;color:#6B7280;margin:0 0 24px">A new client has submitted their banking information. A PDF copy is attached.</p>

      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        ${divider}
        ${sectionLabel("Business Information")}
        ${row("Business Legal Name", data.businessLegalName)}
        ${row("DBA", data.dba)}
        ${row("Address", `${data.businessAddress}, ${data.city}, ${data.state} ${data.postalCode}, ${data.country}`)}

        ${divider}
        ${sectionLabel("Contact Information")}
        ${row("Contact Name", data.contactName)}
        ${row("Email", data.email)}
        ${row("Phone", data.phone)}

        ${divider}
        ${sectionLabel("Banking Information")}
        ${row("Bank Name", data.bankName)}
        ${row("Bank Address", data.bankAddress)}
        ${row("Account Holder", data.accountHolderName)}
        ${row("Account Type", accountTypes[data.accountType] || data.accountType)}
        ${row("Account Number", data.accountNumber)}
        ${row("Routing Number", data.routingNumber)}
        ${row("SWIFT / BIC", data.swiftCode)}
        ${row("IBAN", data.iban)}

        ${divider}
        ${sectionLabel("Payment Preferences")}
        ${row("Payment Method", methods[data.paymentMethod] || data.paymentMethod)}

        ${divider}
        ${sectionLabel("Signature")}
        ${row("Signatory", data.signatoryName)}
        ${row("Title", data.titlePosition)}
        ${row("Date", data.date)}
      </table>
    </td></tr>
    <!-- Footer -->
    <tr><td style="background:#063165;padding:20px 32px;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6">
      <strong>Flexzo AI</strong> &middot; Confidential Banking Information<br/>
      This email contains sensitive financial data. Handle in accordance with data protection policies.
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.some((o) => origin.startsWith(o))) {
    return new Response(JSON.stringify({ error: "Forbidden origin" }), {
      status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const {
      businessLegalName, dba, businessAddress, city, state, postalCode, country,
      contactName, email, phone,
      bankName, bankAddress, accountHolderName, accountType, accountNumber, routingNumber, swiftCode, iban,
      paymentMethod, signatoryName, titlePosition, signatureDataUrl, date, recaptchaToken,
    } = body;

    // ── reCAPTCHA verification ──
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
    if (verifyData.hostname && !ALLOWED_RECAPTCHA_HOSTNAMES.includes(verifyData.hostname)) {
      console.error("reCAPTCHA hostname mismatch:", verifyData.hostname);
      return new Response(JSON.stringify({ error: "reCAPTCHA hostname mismatch" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!businessLegalName || !email || !bankName || !accountNumber || !routingNumber) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const appPassword = Deno.env.get("GMAIL_APP_PASSWORD");
    if (!appPassword) {
      throw new Error("GMAIL_APP_PASSWORD not configured");
    }

    const data: Record<string, string> = {
      businessLegalName, dba: dba || "", businessAddress, city, state, postalCode, country,
      contactName, email, phone,
      bankName, bankAddress, accountHolderName, accountType, accountNumber, routingNumber,
      swiftCode: swiftCode || "", iban: iban || "",
      paymentMethod, signatoryName, titlePosition, date: date || new Date().toLocaleDateString("en-US"),
    };

    const pdfBytes = buildPdf(data);
    const client = createSmtpClient(appPassword);

    await client.send({
      from: GMAIL_USER,
      to: SALES_EMAIL,
      subject: `New Banking Registration – ${businessLegalName}`,
      html: buildEmailHtml(data),
      attachments: [
        {
          filename: `Flexzo_Banking_Registration_${businessLegalName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
          content: pdfBytes,
          contentType: "application/pdf",
          encoding: "binary" as const,
        },
      ],
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Banking registration email error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process submission", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
