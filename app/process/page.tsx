import type { Metadata } from "next";
import Link from "next/link";
import EmailPromptLink from "@/components/email-prompt-link";

export const metadata: Metadata = {
  title: "Our approach",
  description: "A measured process for scoping, building, testing, and improving voice AI and workflow automation.",
  alternates: { canonical: "/process" },
  openGraph: { title: "Our approach — Vocorix", url: "https://vocorix.com/process" }
};

export default function ProcessPage() {
  return <main>
    <div className="hero small"><div className="wrap"><p className="eyebrow">Our approach</p><h1>Understand the workflow before automating it.</h1><p className="lede">The best result is not the most complicated agent. It is a reliable workflow that fits how your people work and knows when to hand over.</p><div className="actions"><Link className="btn primary" href="/contact">Talk through a workflow <span className="arrow">↗</span></Link></div></div></div>
    <section><div className="wrap"><div className="section-head reveal"><div><p className="section-kicker">The delivery process</p><h2>Four deliberate steps from brief to rollout.</h2></div><p>Small, testable increments help keep the scope clear and the outcome measurable.</p></div><div className="steps">
      <article className="step reveal"><span className="step-no">01</span><h4>Map the process</h4><p>Understand entry points, decisions, systems, exceptions, and what a good outcome looks like.</p></article>
      <article className="step reveal"><span className="step-no">02</span><h4>Design the handoffs</h4><p>Define prompts, routing, tool connections, data fields, escalation rules, and fallback paths.</p></article>
      <article className="step reveal"><span className="step-no">03</span><h4>Build and test</h4><p>Test expected flows as well as interruptions, missing data, failed integrations, and edge cases.</p></article>
      <article className="step reveal"><span className="step-no">04</span><h4>Launch and refine</h4><p>Review outcomes, make targeted improvements, and document how the workflow should be maintained.</p></article>
    </div></div></section>
    <section className="paper"><div className="wrap proof-grid"><div className="reveal"><p className="section-kicker">The principles</p><h2>Useful automation has boundaries.</h2><p>We make the operating rules visible so the workflow can be tested, reviewed, and maintained after handover.</p></div><div className="principles">
      <div className="principle reveal"><b>01</b><div><h3>Human escalation is intentional</h3><p>Calls and tasks can be routed to a person when judgement, empathy, or special handling is needed.</p></div></div>
      <div className="principle reveal"><b>02</b><div><h3>Data has a destination</h3><p>We define where summaries, status, and next steps belong so outcomes don’t disappear into a transcript.</p></div></div>
      <div className="principle reveal"><b>03</b><div><h3>Failures are part of the design</h3><p>Timeouts, unanswered calls, missing fields, and API errors need understandable fallback behaviour.</p></div></div>
      <div className="principle reveal"><b>04</b><div><h3>The process stays legible</h3><p>Clear rules and documentation make it easier for your team to review what the automation did and why.</p></div></div>
    </div></div></section>
    <div className="cta"><div className="wrap"><p className="section-kicker">A practical next step</p><h2>Bring us the messy part.</h2><p>We’ll start with the process you want to improve—not a preselected tool, platform, or oversized scope.</p><div className="actions"><EmailPromptLink className="btn primary" intent="project">Discuss a project <span className="arrow">↗</span></EmailPromptLink></div></div></div>
  </main>;
}
