import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const production = process.env.VERCEL_ENV === "production";
  return {
    rules: { userAgent: "*", allow: production ? "/" : undefined, disallow: production ? undefined : "/" },
    sitemap: production ? "https://vocorix.com/sitemap.xml" : undefined,
    host: production ? "https://vocorix.com" : undefined
  };
}
