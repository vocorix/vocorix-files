"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandMark from "@/components/brand-mark";

const links = [
  { href: "/", label: "Overview" },
  { href: "/services", label: "Capabilities" },
  { href: "/process", label: "Approach" },
  { href: "/contact", label: "Contact" }
];

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  return (
    <header id="site-header">
      <div className="wrap bar">
        <Link className="logo" href="/" aria-label="Vocorix home">
          <BrandMark className="brand-mark" /><span className="logo-word">VOCORIX</span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}
          <Link className="btn dark sm" href="/contact">Discuss a project <span className="arrow">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
