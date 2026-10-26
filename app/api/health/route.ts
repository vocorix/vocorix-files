export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ status: "ok", service: "vocorix-web", timestamp: new Date().toISOString() }, {
    headers: { "Cache-Control": "no-store" }
  });
}
