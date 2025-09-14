// api/dev-request.js
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = await readJson(req);
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
    const to = process.env.DEVREQ_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "wiemmimouni74@gmail.com";
    const from =
      process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    const html = `
      <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.6">
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

    await resend.emails.send({
      from,
      to,
      reply_to: email ? [email] : undefined,
      subject: "New Developer On Demand Request",
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("dev-request error", err);
    return res.status(500).json({ error: "Failed to send" });
  }
}

async function readJson(req) {
  const chunks = [];
  for await (const ch of req) chunks.push(ch);
  const raw = Buffer.concat(chunks).toString() || "{}";
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
