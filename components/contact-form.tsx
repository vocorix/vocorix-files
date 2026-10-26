"use client";

import { useState, type FormEvent } from "react";
import EmailPromptLink from "@/components/email-prompt-link";

const emptyForm = { name: "", email: "", company: "", interest: "voice-ai", message: "", website: "" };
type FormValues = typeof emptyForm;

export default function ContactForm() {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Your message could not be sent just now.");
      setForm(emptyForm);
      setStatus({ kind: "success", message: result.message || "Thanks — your enquiry has been received." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Please email swastik@vocorix.com and we’ll follow up directly." });
    } finally {
      setPending(false);
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="form-heading"><p className="section-kicker">Tell us a little about it</p><h2>What would you like to improve?</h2></div>
    <div className="form-grid">
      <div className="form-field"><label htmlFor="lead-name">Your name</label><input id="lead-name" name="name" autoComplete="name" required minLength={2} maxLength={100} value={form.name} onChange={(event) => update("name", event.target.value)} /></div>
      <div className="form-field"><label htmlFor="lead-email">Work email</label><input id="lead-email" name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={(event) => update("email", event.target.value)} /></div>
      <div className="form-field form-field-wide"><label htmlFor="lead-company">Company <span>(optional)</span></label><input id="lead-company" name="company" autoComplete="organization" maxLength={160} value={form.company} onChange={(event) => update("company", event.target.value)} /></div>
      <div className="form-field form-field-wide"><label htmlFor="lead-interest">What are you exploring?</label><select id="lead-interest" name="interest" value={form.interest} onChange={(event) => update("interest", event.target.value)}><option value="voice-ai">Voice AI &amp; call handling</option><option value="workflow-automation">Workflow automation</option><option value="system-integration">CRM &amp; system integration</option><option value="other">Not sure yet / something else</option></select></div>
      <div className="form-field form-field-wide"><label htmlFor="lead-message">Tell us about the process</label><textarea id="lead-message" name="message" rows={5} required minLength={20} maxLength={3000} value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="What happens today, where does it slow down, and what would a better outcome look like?" /><span className="field-hint">A few sentences is plenty to start.</span></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="lead-website">Leave this field empty</label><input id="lead-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} /></div>
    </div>
    <button className="btn primary submit-button" type="submit" disabled={pending}>{pending ? "Sending enquiry…" : "Send enquiry"} <span className="arrow">↗</span></button>
    <p className="form-privacy">Your details are used to respond to this enquiry. They are not published.</p>
    <div className={"form-status" + (status ? " " + status.kind : "")} role="status" aria-live="polite">
      {status ? <>{status.message}{status.kind === "error" ? <> You can also email <EmailPromptLink>swastik@vocorix.com</EmailPromptLink>.</> : null}</> : null}
    </div>
  </form>;
}
