import Link from "next/link";
import BrandMark from "@/components/brand-mark";

export default function SiteFooter() {
  return (
    <footer id="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <Link className="footer-brand" href="/"><BrandMark className="footer-mark" /><span>VOCORIX</span></Link>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/services">Capabilities</Link><Link href="/process">Our approach</Link><Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Vocorix. Built around your workflow.</span>
          <a href="mailto:swastik@vocorix.com">swastik@vocorix.com</a>
        </div>
      </div>
    </footer>
  );
}
