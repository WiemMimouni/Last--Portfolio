// api/contact.js
import { Resend } from "resend";

const SUBJECT_BY_TYPE = {
  investment: "Request Voyagr Pitch Deck",
  partnership: "Partnership Opportunity",
  development: "Development Services",
  general: "General Inquiry",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = await readBody(req);
    let {
      name = "",
      email = "",
      subject = "",
      message = "",
      inquiry_type = "general",
    } = body || {};

    // Normalize subject — use dropdown label iff user's subject is empty or generic
    const normalizedType = String(inquiry_type || "general").toLowerCase();
    const userSubject = String(subject || "").trim();

    const isGeneric =
      userSubject.length === 0 ||
      /^information\s*inquiry$/i.test(userSubject) ||
      /^new\s+(portfolio\s+)?inquiry$/i.test(userSubject);

    const subjectLine =
      isGeneric
        ? SUBJECT_BY_TYPE[normalizedType] || "General Inquiry"
        : userSubject;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // allow multiple recipients via comma/semicolon
    const to = String(process.env.CONTACT_TO_EMAIL || "wiemmimouni74@gmail.com")
      .split(/[;,]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const from =
      process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const label = SUBJECT_BY_TYPE[normalizedType] || "General Inquiry";

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.6">
        <h2 style="margin:0 0 8px">New Portfolio Inquiry (${escapeHtml(label)})</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Subject:</b> ${escapeHtml(subjectLine)}</p>
        <h3 style="margin:16px 0 6px">Message</h3>
        <div style="background:#f6f7f9;padding:12px;border-radius:8px;white-space:pre-wrap">
          ${escapeHtml(message)}
        </div>
      </div>
    `;

    const text =
`New Portfolio Inquiry (${label})

Name: ${name}
Email: ${email}
Subject: ${subjectLine}

Message:
${message}
`;

    await resend.emails.send({
      from,
      to,
      reply_to: email ? [email] : undefined,
      subject: `Portfolio — ${subjectLine}`,
      html,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact error", err);
    return res.status(500).json({ error: "Failed to send" });
  }
}

// ---- helpers ----
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.json === "function") {
    try { return await req.json(); } catch {}
  }
  if (req.readable || typeof req.on === "function") {
    const chunks = [];
    for await (const ch of req) chunks.push(ch);
    const raw = Buffer.concat(chunks).toString() || "{}";
    try { return JSON.parse(raw); } catch { return {}; }
  }
  return {};
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
