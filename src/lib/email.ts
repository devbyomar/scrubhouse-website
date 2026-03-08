import { Resend } from "resend";

/**
 * ============================================
 * SCRUBHOUSE - EMAIL SERVICE
 * ============================================
 *
 * Centralised Resend client and email helpers.
 * Requires RESEND_API_KEY in .env.local.
 *
 * When RESEND_API_KEY is not set, emails are
 * skipped gracefully so the site still works
 * in development without credentials.
 * ============================================
 */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/** The verified sender address configured in Resend */
const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL ?? "ScrubHouse <noreply@scrubhouse.ca>";

/** Where internal notification emails are delivered */
const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? "scrubhousecc@gmail.com";

// ─── Helpers ──────────────────────────────────────────

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}

/**
 * Sends an email via Resend. If RESEND_API_KEY is missing,
 * it logs a warning and returns `null` instead of throwing.
 */
export async function sendEmail(opts: SendEmailOptions) {
  if (!resend) {
    console.warn(
      "[Email] RESEND_API_KEY not set — skipping email:",
      opts.subject
    );
    return null;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
    attachments: opts.attachments,
  });

  if (error) {
    console.error("[Email] Send failed:", error);
    throw new Error(`Email send failed: ${error.message}`);
  }

  return data;
}

// ─── Branded HTML wrapper ────────────────────────────

function emailWrapper(body: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin: 0; padding: 0; background: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #1B2E6E 0%, #0F1D4A 100%); padding: 32px; text-align: center; }
    .header h1 { color: #FFFFFF; margin: 0; font-size: 24px; letter-spacing: -0.02em; }
    .header h1 span { color: #00C2FF; }
    .body { padding: 32px; color: #0F172A; line-height: 1.6; }
    .body h2 { color: #1B2E6E; margin-top: 0; font-size: 20px; }
    .field { margin-bottom: 16px; }
    .field .label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #64748B; margin-bottom: 4px; }
    .field .value { font-size: 15px; color: #0F172A; }
    .divider { border: none; border-top: 1px solid #E2E8F0; margin: 24px 0; }
    .highlight-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .total { font-size: 28px; font-weight: 700; color: #1B2E6E; }
    .cta { display: inline-block; background: #00C2FF; color: #0F1D4A; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin-top: 16px; }
    .footer { background: #F8FAFC; padding: 24px 32px; text-align: center; color: #94A3B8; font-size: 13px; }
    .footer a { color: #1B2E6E; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SCRUB<span>HOUSE</span></h1>
    </div>
    <div class="body">
      ${body}
    </div>
    <div class="footer">
      <p>ScrubHouse Cleaning · Greater Toronto Area</p>
      <p><a href="https://scrubhouse.ca">scrubhouse.ca</a> · (416) 903-9982</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Contact Form Emails ──────────────────────────────

export function contactNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  submissionId: string;
}) {
  return {
    to: NOTIFY_TO,
    subject: `New Contact Form: ${data.firstName} ${data.lastName}`,
    replyTo: data.email,
    html: emailWrapper(`
      <h2>📬 New Contact Form Submission</h2>
      <p style="color: #64748B; font-size: 13px;">Submission #${data.submissionId}</p>

      <div class="field">
        <div class="label">Name</div>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${data.phone || "Not provided"}</div>
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="label">Message</div>
        <div class="value">${data.message.replace(/\n/g, "<br />")}</div>
      </div>

      <a href="mailto:${data.email}" class="cta">Reply to ${data.firstName}</a>
    `),
  };
}

export function contactConfirmationEmail(data: {
  firstName: string;
  email: string;
  submissionId: string;
}) {
  return {
    to: data.email,
    subject: `We received your message — ScrubHouse`,
    html: emailWrapper(`
      <h2>Hi ${data.firstName}, thanks for reaching out! 👋</h2>
      <p>We've received your message and a member of our team will get back to you within 24 hours.</p>

      <p>If your request is urgent, feel free to call us directly at <strong>(416) 903-9982</strong>.</p>

      <a href="https://scrubhouse.ca/quote" class="cta">Get an Instant Quote</a>

      <p style="font-size:13px;color:#94A3B8;margin-top:24px;">Reference: #${data.submissionId}</p>
    `),
  };
}

// ─── Quote Emails ─────────────────────────────────────

export function quoteNotificationEmail(data: {
  name: string;
  email: string;
  phone?: string;
  propertyType: string;
  serviceType: string;
  packageTier: string;
  total: string;
  breakdown: { label: string; amount: number }[];
  estimatedHours: number;
  submissionId: string;
}) {
  const breakdownRows = data.breakdown
    .map(
      (item) =>
        `<tr><td style="padding:6px 0;color:#334155;">${item.label}</td><td style="padding:6px 0;text-align:right;color:#0F172A;font-weight:600;">$${item.amount.toFixed(2)}</td></tr>`
    )
    .join("");

  return {
    to: NOTIFY_TO,
    subject: `New Quote #${data.submissionId} — ${data.total}`,
    replyTo: data.email,
    html: emailWrapper(`
      <h2>💰 New Quote Request</h2>
      <p style="color: #64748B; font-size: 13px;">Quote #${data.submissionId}</p>

      <div class="highlight-box" style="text-align:center;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748B;margin-bottom:8px;">Estimated Total</div>
        <div class="total">${data.total}</div>
        <div style="font-size:13px;color:#64748B;margin-top:4px;">~${data.estimatedHours} hours</div>
      </div>

      <div class="field">
        <div class="label">Customer</div>
        <div class="value">${data.name} · <a href="mailto:${data.email}">${data.email}</a>${data.phone ? ` · ${data.phone}` : ""}</div>
      </div>
      <div class="field">
        <div class="label">Property / Service</div>
        <div class="value">${capitalize(data.propertyType)} · ${capitalize(data.serviceType)} · ${capitalize(data.packageTier)} Package</div>
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="label">Breakdown</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${breakdownRows}
        </table>
      </div>

      <a href="mailto:${data.email}" class="cta">Contact ${data.name.split(" ")[0]}</a>
    `),
  };
}

export function quoteConfirmationEmail(data: {
  name: string;
  email: string;
  total: string;
  breakdown: { label: string; amount: number }[];
  estimatedHours: number;
  submissionId: string;
}) {
  const breakdownRows = data.breakdown
    .map(
      (item) =>
        `<tr><td style="padding:6px 0;color:#334155;">${item.label}</td><td style="padding:6px 0;text-align:right;color:#0F172A;font-weight:600;">$${item.amount.toFixed(2)}</td></tr>`
    )
    .join("");

  return {
    to: data.email,
    subject: `Your ScrubHouse Quote — ${data.total}`,
    html: emailWrapper(`
      <h2>Hi ${data.name.split(" ")[0]}, here's your quote! 🧹</h2>
      <p>Thanks for using our instant quote calculator. Here's your personalised cleaning estimate:</p>

      <div class="highlight-box" style="text-align:center;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748B;margin-bottom:8px;">Your Estimated Total</div>
        <div class="total">${data.total}</div>
        <div style="font-size:13px;color:#64748B;margin-top:4px;">~${data.estimatedHours} hours estimated</div>
      </div>

      <div class="field">
        <div class="label">Breakdown</div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${breakdownRows}
        </table>
      </div>

      <hr class="divider" />

      <p>This is an estimate based on the details you provided. Final pricing may vary slightly based on the actual condition of your space.</p>

      <p><strong>Ready to book?</strong> Reply to this email or call us at <strong>(416) 903-9982</strong> and we'll get you scheduled.</p>

      <a href="https://scrubhouse.ca/contact" class="cta">Book Your Cleaning</a>

      <p style="font-size:13px;color:#94A3B8;margin-top:24px;">Quote reference: #${data.submissionId}</p>
    `),
  };
}

// ─── Careers Emails ──────────────────────────────────

export function careerNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  employmentType: string;
  experience: string;
  availability: string;
  hasTransportation: string;
  whyInterested?: string;
  submissionId: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  return {
    to: NOTIFY_TO,
    subject: `New Application: ${data.firstName} ${data.lastName} — ${data.city}`,
    replyTo: data.email,
    attachments: data.attachments,
    html: emailWrapper(`
      <h2>👤 New Job Application</h2>
      <p style="color: #64748B; font-size: 13px;">Application #${data.submissionId}</p>

      <div class="field">
        <div class="label">Name</div>
        <div class="value">${data.firstName} ${data.lastName}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${data.phone}</div>
      </div>
      <div class="field">
        <div class="label">City</div>
        <div class="value">${data.city}</div>
      </div>

      <hr class="divider" />

      <div class="field">
        <div class="label">Employment Type</div>
        <div class="value">${capitalize(data.employmentType)}</div>
      </div>
      <div class="field">
        <div class="label">Experience</div>
        <div class="value">${capitalize(data.experience)}</div>
      </div>
      <div class="field">
        <div class="label">Availability</div>
        <div class="value">${capitalize(data.availability)}</div>
      </div>
      <div class="field">
        <div class="label">Has Transportation</div>
        <div class="value">${data.hasTransportation === "true" ? "Yes" : "No"}</div>
      </div>

      ${
        data.whyInterested
          ? `<hr class="divider" /><div class="field"><div class="label">Why They're Interested</div><div class="value">${data.whyInterested.replace(/\n/g, "<br />")}</div></div>`
          : ""
      }

      ${data.attachments?.length ? `<p style="color:#64748B;font-size:13px;margin-top:16px;">📎 Resume attached</p>` : ""}

      <a href="mailto:${data.email}" class="cta">Contact ${data.firstName}</a>
    `),
  };
}

export function careerConfirmationEmail(data: {
  firstName: string;
  email: string;
  submissionId: string;
}) {
  return {
    to: data.email,
    subject: "Application Received — ScrubHouse Cleaning",
    html: emailWrapper(`
      <h2>Thanks for applying, ${data.firstName}! 🎉</h2>
      <p>We've received your application and our team will review it shortly.</p>

      <div class="highlight-box">
        <div class="field" style="margin-bottom:0;">
          <div class="label">What happens next?</div>
          <div class="value">
            <ol style="padding-left:20px;margin:8px 0 0;">
              <li style="margin-bottom:8px;">We review all applications within <strong>2–3 business days</strong></li>
              <li style="margin-bottom:8px;">If you're a good fit, we'll reach out for a quick phone interview</li>
              <li style="margin-bottom:8px;">Successful candidates will be invited for an in-person meeting</li>
            </ol>
          </div>
        </div>
      </div>

      <p>In the meantime, feel free to learn more about us:</p>
      <a href="https://scrubhouse.ca/about" class="cta">About ScrubHouse</a>

      <p style="font-size:13px;color:#94A3B8;margin-top:24px;">Application reference: #${data.submissionId}</p>
    `),
  };
}

// ─── Utilities ──────────────────────────────────────

function capitalize(str: string): string {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
