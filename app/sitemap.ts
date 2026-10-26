import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.VERCEL_ENV !== "production") return [];
  const lastModified = new Date();
  return [
    { url: "https://vocorix.com/", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://vocorix.com/services", lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: "https://vocorix.com/process", lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: "https://vocorix.com/contact", lastModified, changeFrequency: "monthly", priority: 0.8 }
  ];
}
