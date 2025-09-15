// api/dev-request.js
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = await readBody(req);
    const {
      dev_type = "",
      how_many = "",
      framework_needed = "",
      when_needed = "",
      name = "",
      email = "",
      phone = "",
    } = body || {};

    const resend = new Resend(process.env.RESEND_API_KEY);

    const recipients = String(
      process.env.DEVREQ_TO_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "wiemmimouni74@gmail.com"
    ).split(/[;,]/).map(s => s.trim()).filter(Boolean);

    const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
    const subject = "New Developer On Demand Request";

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.6">
        <h2 style="margin:0 0 8px">New Developer On Demand Request</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Phone:</b> ${escapeHtml(phone)}</p>
        <h3 style="margin:16px 0 6px">Request Details</h3>
        <ul>
          <li><b>Developer Type:</b> ${escapeHtml(dev_type)}</li>
          <li><b>How Many:</b> ${escapeHtml(how_many)}</li>
          <li><b>Framework Needed:</b> ${escapeHtml(framework_needed)}</li>
          <li><b>When Needed:</b> ${escapeHtml(when_needed)}</li>
        </ul>
      </div>
    `;

    const text =
`New Developer On Demand Request

Name: ${name}
Email: ${email}
Phone: ${phone}

Developer Type: ${dev_type}
How Many: ${how_many}
Framework Needed: ${framework_needed}
When Needed: ${when_needed}
`;

    const successes = [];
    const failures = [];

    console.log("dev-request → sending to:", recipients);

    for (const rcpt of recipients) {
      try {
        const { data, error } = await resend.emails.send({
          from,
          to: [rcpt],
          reply_to: email ? [email] : undefined,
          subject,
          html,
          text,
        });
        if (error) {
          failures.push({ rcpt, error: String(error) });
          console.error("Resend error to", rcpt, "→", error);
        } else {
          successes.push({ rcpt, id: data?.id });
          console.log("Resend ok to", rcpt, "→ id:", data?.id);
        }
      } catch (e) {
        failures.push({ rcpt, error: String(e) });
        console.error("Resend exception to", rcpt, "→", e);
      }
    }

    if (successes.length > 0) {
      return res.status(200).json({ ok: true, successes, failures });
    }
    return res.status(502).json({ ok: false, failures });
  } catch (err) {
    console.error("dev-request error", err);
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
