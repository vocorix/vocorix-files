import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const chatRequestSchema = z.object({
  conversationId: z.string().uuid().optional(),
  message: z.string().trim().min(1).max(4000),
  page: z.string().max(512).optional()
});

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 12_000) {
    return Response.json({ ok: false, code: "payload_too_large", message: "That message is too long." }, { status: 413 });
  }
  let body: unknown;
  try { body = await request.json(); }
  catch { return Response.json({ ok: false, code: "invalid_json", message: "Please send a valid message." }, { status: 400 }); }

  if (!chatRequestSchema.safeParse(body).success) {
    return Response.json({ ok: false, code: "invalid_message", message: "Please enter a message and try again." }, { status: 422 });
  }
  return Response.json({
    ok: false,
    code: "chat_not_configured",
    message: "The Vocorix assistant has not been connected yet."
  }, { status: 503 });
}
