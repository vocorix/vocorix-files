import { createHmac } from "node:crypto";
import { contactSubmissionSchema } from "@/lib/lead-schema";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 16_000;

function reply(message: string, status: number) {
  return Response.json({ ok: status < 400, message }, { status });
}

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const provided = new URL(origin);
    const requestOrigin = new URL(request.url);
    const explicit = process.env.PUBLIC_SITE_URL ? new URL(process.env.PUBLIC_SITE_URL).origin : null;
    const allowed = new Set([requestOrigin.origin, explicit, "https://vocorix.com", "https://www.vocorix.com", "http://localhost:3000"].filter(Boolean));
    return allowed.has(provided.origin);
  } catch {
    return false;
  }
}

async function notifyLead(input: { name: string; email: string; company?: string; interest: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return;

  const text = [
    "A new enquiry was submitted on vocorix.com.",
    "",
    "Name: " + input.name,
    "Email: " + input.email,
    "Company: " + (input.company || "Not provided"),
    "Interest: " + input.interest,
    "",
    "Message:",
    input.message
  ].join("\n");

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [process.env.LEAD_NOTIFICATION_EMAIL || "swastik@vocorix.com"], reply_to: input.email, subject: "New Vocorix website enquiry", text }),
      cache: "no-store",
      signal: AbortSignal.timeout(7000)
    });
    if (!result.ok) console.error("Lead notification provider returned status", result.status);
  } catch {
    console.error("Lead notification could not be delivered; enquiry remains stored.");
  }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) return reply("This request origin is not allowed.", 403);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return reply("The submitted message is too large.", 413);

  let rawBody: string;
  try { rawBody = await request.text(); }
  catch { return reply("The request could not be read.", 400); }
  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) return reply("The submitted message is too large.", 413);

  let body: unknown;
  try { body = JSON.parse(rawBody); }
  catch { return reply("Please submit a valid enquiry form.", 400); }

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({
      ok: false,
      message: "Please check the fields and try again.",
      fields: parsed.error.issues.map((issue) => ({ field: String(issue.path[0] || "form"), message: issue.message }))
    }, { status: 422 });
  }

  if (parsed.data.website?.trim()) return reply("Thanks — your enquiry has been received.", 200);

  const supabase = getSupabaseAdmin();
  if (!supabase) return reply("The enquiry form is being connected. Please email swastik@vocorix.com for now.", 503);

  const ip = request.headers.get("x-real-ip")
    || request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  const rateSecret = process.env.RATE_LIMIT_SALT
    || process.env.SUPABASE_SECRET_KEY
    || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rateSecret) return reply("The enquiry service is being configured. Please email swastik@vocorix.com.", 503);
  const rateKey = createHmac("sha256", rateSecret).update(ip).digest("hex");
  const limited = await supabase.rpc("consume_api_rate_limit", { p_key_hash: rateKey, p_window_seconds: 60, p_max_requests: 5 });
  if (limited.error) {
    console.error("Contact rate-limit check failed:", limited.error.code || "unknown");
    return reply("The enquiry service is temporarily unavailable. Please email swastik@vocorix.com.", 503);
  }
  if (limited.data === false) {
    return Response.json({ ok: false, message: "Please wait a minute before sending another enquiry." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  const { name, email, company, interest, message } = parsed.data;
  const { error } = await supabase.from("contact_leads").insert({
    name, email, company: company || null, interest, message,
    source_url: (request.headers.get("referer") || "").slice(0, 2048) || null,
    user_agent: (request.headers.get("user-agent") || "").slice(0, 512) || null,
    status: "new"
  });
  if (error) {
    console.error("Contact lead insert failed:", error.code || "unknown");
    return reply("We couldn't save your enquiry just now. Please email swastik@vocorix.com.", 503);
  }

  await notifyLead({ name, email, company, interest, message });
  return reply("Thanks — your enquiry has been received. We'll be in touch.", 200);
}
