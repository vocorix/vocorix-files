import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import RevealObserver from "@/components/reveal-observer";

export const metadata: Metadata = {
  metadataBase: new URL("https://vocorix.com"),
  title: { default: "Vocorix — Voice AI & workflow automation", template: "%s | Vocorix" },
  description: "Vocorix connects customer conversations to action with voice AI, workflow automation, and thoughtful system integrations.",
  applicationName: "Vocorix",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Vocorix",
    title: "Vocorix — Voice AI & workflow automation",
    description: "Connect customer conversations to action with voice AI and workflow automation.",
    url: "https://vocorix.com/",
    images: [{ url: "/brand/vocorix-logo.svg", width: 730, height: 132, alt: "Vocorix" }]
  },
  twitter: {
    card: "summary",
    title: "Vocorix — Voice AI & workflow automation",
    description: "Connect customer conversations to action with voice AI and workflow automation."
  },
  robots: { index: process.env.VERCEL_ENV === "production", follow: process.env.VERCEL_ENV === "production" }
};

export const viewport: Viewport = { themeColor: "#14171B", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><RevealObserver />{children}<SiteFooter /></body></html>;
}
