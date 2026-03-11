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

/* ── Simple PDF builder (minimal valid PDF with text content) ── */

function buildPdf(data: Record<string, string>, signatureDataUrl: string): Uint8Array {
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
  lines.push("The submitter confirmed that all banking information is accurate and belongs to the business listed above.");
  lines.push("");
  lines.push("--- SIGNATURE ---");
  lines.push(`Authorized Signatory: ${data.signatoryName || ""}`);
  lines.push(`Title / Position: ${data.titlePosition || ""}`);
  lines.push(`Date: ${data.date || ""}`);
  lines.push("[Signature provided electronically]");

  // Build a minimal valid PDF
  const content = lines.join("\n");
  const textEncoder = new TextEncoder();

  // We'll build a simple PDF with text stream
  const pdfLines: string[] = [];
  const offsets: number[] = [];
  let pos = 0;

  const addLine = (line: string) => {
    pdfLines.push(line);
    pos += textEncoder.encode(line + "\n").length;
  };

  const markObj = () => { offsets.push(pos); };

  addLine("%PDF-1.4");

  // Object 1: Catalog
  markObj();
  addLine("1 0 obj");
  addLine("<< /Type /Catalog /Pages 2 0 R >>");
  addLine("endobj");

  // Object 2: Pages
  markObj();
  addLine("2 0 obj");
  addLine("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  addLine("endobj");

  // Object 4: Font
  markObj();
  addLine("4 0 obj");
  addLine("<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>");
  addLine("endobj");

  // Build content stream - split into pages if needed but keep it simple
  const streamLines = content.split("\n");
  const streamContent: string[] = [];
  streamContent.push("BT");
  streamContent.push("/F1 10 Tf");
  let yPos = 770;
  for (const sl of streamLines) {
    if (yPos < 40) {
      // Simple: just continue on same page (won't overflow for typical form data)
      yPos = 770;
    }
    // Escape parentheses in PDF string
    const escaped = sl.replace(/\\\\/g, "\\\\\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    streamContent.push(`1 0 0 1 40 ${yPos} Tm`);
    streamContent.push(`(${escaped}) Tj`);
    yPos -= 14;
  }
  streamContent.push("ET");
  const streamStr = streamContent.join("\n");
  const streamBytes = textEncoder.encode(streamStr);

  // Object 5: Content stream
  markObj();
  addLine("5 0 obj");
  addLine(`<< /Length ${streamBytes.length} >>`);
  addLine("stream");
  addLine(streamStr);
  addLine("endstream");
  addLine("endobj");

  // Object 3: Page
  markObj();
  addLine("3 0 obj");
  addLine("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 4 0 R >> >> >>");
  addLine("endobj");

  // Cross-reference table
  const xrefPos = pos;
  addLine("xref");
  addLine(`0 ${offsets.length + 1}`);
  addLine("0000000000 65535 f ");
  for (const o of offsets) {
    addLine(`${String(o).padStart(10, "0")} 00000 n `);
  }

  addLine("trailer");
  addLine(`<< /Size ${offsets.length + 1} /Root 1 0 R >>`);
  addLine("startxref");
  addLine(String(xrefPos));
  addLine("%%EOF");

  return textEncoder.encode(pdfLines.join("\n"));
}

/* ── HTML email template ── */

function buildEmailHtml(data: Record<string, string>): string {
  const methods: Record<string, string> = { ach: "ACH Transfer", wire: "Wire Transfer", international: "International Transfer" };
  const accountTypes: Record<string, string> = { checking: "Business Checking", savings: "Business Savings" };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Banking Registration – ${data.businessLegalName}</title>
  <style>
    body{margin:0;padding:0;background:#F4F5F7;font-family:'Helvetica Neue',Arial,sans-serif;color:#0a2540}
    .wrap{width:100%;padding:32px 0 40px}
    .card{width:92%;max-width:680px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    .header{background:#063165;padding:22px 32px}
    .header img{height:28px;width:auto;display:block}
    .alert-bar{background:#0075FF;padding:10px 32px;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
    .content{padding:28px 32px 24px}
    .heading{font-size:20px;font-weight:700;color:#063165;margin:0 0 6px}
    .sub{font-size:13px;color:#6B7280;margin:0 0 24px}
    .divider{height:1px;background:#E5E7EB;margin:20px 0}
    .section-label{font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9CA3AF;margin:0 0 10px}
    .detail-grid{display:table;width:100%;border-collapse:collapse}
    .detail-row{display:table-row}
    .detail-key{display:table-cell;padding:7px 16px 7px 0;font-size:13px;color:#6B7280;white-space:nowrap;vertical-align:top;width:160px}
    .detail-val{display:table-cell;padding:7px 0;font-size:13px;color:#063165;font-weight:600;vertical-align:top}
    .footer{background:#063165;padding:20px 32px;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.6}
  </style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <div class="header"><img src="${LOGO_URL}" alt="Flexzo"/></div>
    <div class="alert-bar">New Client Banking Registration</div>
    <div class="content">
      <p class="heading">Banking details submitted by ${data.businessLegalName}</p>
      <p class="sub">A new client has submitted their banking information. A PDF copy is attached.</p>

      <div class="divider"></div>
      <p class="section-label">Business Information</p>
      <div class="detail-grid">
        <div class="detail-row"><div class="detail-key">Business Legal Name</div><div class="detail-val">${data.businessLegalName}</div></div>
        ${data.dba ? `<div class="detail-row"><div class="detail-key">DBA</div><div class="detail-val">${data.dba}</div></div>` : ""}
        <div class="detail-row"><div class="detail-key">Address</div><div class="detail-val">${data.businessAddress}, ${data.city}, ${data.state} ${data.postalCode}, ${data.country}</div></div>
      </div>

      <div class="divider"></div>
      <p class="section-label">Contact Information</p>
      <div class="detail-grid">
        <div class="detail-row"><div class="detail-key">Contact Name</div><div class="detail-val">${data.contactName}</div></div>
        <div class="detail-row"><div class="detail-key">Email</div><div class="detail-val">${data.email}</div></div>
        <div class="detail-row"><div class="detail-key">Phone</div><div class="detail-val">${data.phone}</div></div>
      </div>

      <div class="divider"></div>
      <p class="section-label">Banking Information</p>
      <div class="detail-grid">
        <div class="detail-row"><div class="detail-key">Bank Name</div><div class="detail-val">${data.bankName}</div></div>
        <div class="detail-row"><div class="detail-key">Bank Address</div><div class="detail-val">${data.bankAddress}</div></div>
        <div class="detail-row"><div class="detail-key">Account Holder</div><div class="detail-val">${data.accountHolderName}</div></div>
        <div class="detail-row"><div class="detail-key">Account Type</div><div class="detail-val">${accountTypes[data.accountType] || data.accountType}</div></div>
        <div class="detail-row"><div class="detail-key">Account Number</div><div class="detail-val">${data.accountNumber}</div></div>
        <div class="detail-row"><div class="detail-key">Routing Number</div><div class="detail-val">${data.routingNumber}</div></div>
        ${data.swiftCode ? `<div class="detail-row"><div class="detail-key">SWIFT / BIC</div><div class="detail-val">${data.swiftCode}</div></div>` : ""}
        ${data.iban ? `<div class="detail-row"><div class="detail-key">IBAN</div><div class="detail-val">${data.iban}</div></div>` : ""}
      </div>

      <div class="divider"></div>
      <p class="section-label">Payment Preferences</p>
      <div class="detail-grid">
        <div class="detail-row"><div class="detail-key">Payment Method</div><div class="detail-val">${methods[data.paymentMethod] || data.paymentMethod}</div></div>
      </div>

      <div class="divider"></div>
      <p class="section-label">Signature</p>
      <div class="detail-grid">
        <div class="detail-row"><div class="detail-key">Signatory</div><div class="detail-val">${data.signatoryName}</div></div>
        <div class="detail-row"><div class="detail-key">Title</div><div class="detail-val">${data.titlePosition}</div></div>
        <div class="detail-row"><div class="detail-key">Date</div><div class="detail-val">${data.date}</div></div>
      </div>
    </div>
    <div class="footer">
      <strong>Flexzo AI</strong> &middot; Confidential Banking Information<br/>
      This email contains sensitive financial data. Handle in accordance with data protection policies.
    </div>
  </div>
</div>
</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Origin validation
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
      paymentMethod, signatoryName, titlePosition, signatureDataUrl, date,
    } = body;

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

    // Generate PDF
    const pdfBytes = buildPdf(data, signatureDataUrl || "");

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
