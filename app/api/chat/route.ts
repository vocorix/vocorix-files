import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 12_000;

const chatRequestSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z.string().trim().min(1).max(4000),
  page: z.string().max(512).optional()
});

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const provided = new URL(origin);
    const requestOrigin = new URL(request.url);
    const explicit = process.env.PUBLIC_SITE_URL ? new URL(process.env.PUBLIC_SITE_URL).origin : null;
    const allowed = new Set([
      requestOrigin.origin,
      explicit,
      "https://vocorix.com",
      "https://www.vocorix.com",
      "http://localhost:3000"
    ].filter(Boolean));
    return allowed.has(provided.origin);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return Response.json({ ok: false, code: "origin_not_allowed", message: "This request origin is not allowed." }, { status: 403 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return Response.json({ ok: false, code: "invalid_body", message: "Please send a valid message." }, { status: 400 });
  }

  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return Response.json({ ok: false, code: "payload_too_large", message: "That message is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ ok: false, code: "invalid_json", message: "Please send a valid message." }, { status: 400 });
  }

  if (!chatRequestSchema.safeParse(body).success) {
    return Response.json({ ok: false, code: "invalid_message", message: "Please enter a message and try again." }, { status: 422 });
  }

  // Stable request contract for the planned chatbot. No provider is called until it is configured.
  return Response.json({
    ok: false,
    code: "chat_not_configured",
    message: "The Vocorix assistant has not been connected yet."
  }, { status: 503 });
}
