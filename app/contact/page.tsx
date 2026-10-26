import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import EmailPromptLink from "@/components/email-prompt-link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk with Vocorix about voice AI, workflow automation, and the customer journeys you want to improve.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact — Vocorix", url: "https://vocorix.com/contact" }
};

export default function ContactPage() {
  return <main>
    <div className="hero small"><div className="wrap"><p className="eyebrow">Contact</p><h1>Start with the problem, not the pitch.</h1><p className="lede">Tell us where conversations get missed, tasks get repeated, or information gets lost between systems. We’ll look at the workflow with you.</p></div></div>
    <section><div className="wrap"><div className="contact">
      <ContactForm />
      <aside className="contact-aside"><p className="eyebrow">A useful first call</p><h3>What to bring</h3><p>A rough description of the process, the tools involved, and where it currently slows down is enough to start. You do not need a complete technical spec.</p><p>We’ll discuss fit, risks, handoffs, and a sensible first scope. If automation is not the right answer for a particular step, we’ll say so.</p><div className="contact-direct"><span>Prefer email?</span><EmailPromptLink>swastik@vocorix.com</EmailPromptLink></div></aside>
    </div></div></section>
  </main>;
}
