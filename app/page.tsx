import type { Metadata } from "next";
import Link from "next/link";
import HeroVisual from "@/components/hero-visual";

export const metadata: Metadata = {
  title: "Voice AI & workflow automation",
  description: "Voice agents and workflow automation for lead qualification, live transfer, follow-up, and connected CRM workflows.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return <main>
    <div className="hero"><div className="wrap hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Voice AI · Workflow automation</p>
        <h1>Connect every conversation to <em>action.</em></h1>
        <p className="lede">Vocorix builds practical voice AI and workflow automation around how your team works—answering customers, understanding intent, routing the next step, and keeping your systems in sync.</p>
        <div className="actions"><Link className="btn primary" href="/services">Explore capabilities <span className="arrow">↗</span></Link><Link className="btn outline" href="/contact">Talk through a workflow <span className="arrow">↗</span></Link></div>
        <p className="note">Built around your process. Designed for a human handoff when it matters.</p>
        <div className="stack"><span>Voice experiences</span><span>Workflow design</span><span>System integration</span></div>
      </div>
      <HeroVisual />
    </div></div>
    <section><div className="wrap">
      <div className="section-head reveal"><div><p className="section-kicker">From signal to next step</p><h2>Technology should move work forward.</h2></div><p>Good automation is not just a demo. It fits your operating process, handles repetitive work, and gives people the context to act.</p></div>
      <div className="capabilities">
        <article className="capability reveal"><span className="cap-number">01 / RESPOND</span><h3>Voice experiences</h3><p>Handle inbound questions and follow-up calls with voice agents shaped around your script, tone, and escalation rules.</p><Link className="inline-link" href="/services">Explore voice AI <span className="arrow">↗</span></Link></article>
        <article className="capability reveal"><span className="cap-number">02 / ROUTE</span><h3>Workflow orchestration</h3><p>Connect the steps between a customer conversation and a completed task—qualification, scheduling, notifications, and follow-through.</p><Link className="inline-link" href="/services">Explore workflows <span className="arrow">↗</span></Link></article>
        <article className="capability reveal"><span className="cap-number">03 / CONNECT</span><h3>Systems that stay in sync</h3><p>Link voice tools, your CRM, calendar, and internal apps so relevant details land where your team already works.</p><Link className="inline-link" href="/services">Explore integrations <span className="arrow">↗</span></Link></article>
      </div>
    </div></section>
    <section className="paper"><div className="wrap">
      <div className="section-head reveal"><div><p className="section-kicker">A few starting points</p><h2>Built around high-value conversations.</h2></div><p>Use cases stay specific where they need to, without locking the whole business into one industry or one tool.</p></div>
      <div className="use-cases">
        <article className="use-case reveal"><span className="case-index">USE CASE / 01</span><h3>Sales, lending &amp; brokerage teams</h3><p>Qualify inbound interest, capture key details, identify urgency, and route the right conversations to a person who can take the next step.</p><div className="case-tags"><span>Lead qualification</span><span>Live transfer</span><span>CRM updates</span></div></article>
        <article className="use-case reveal"><span className="case-index">USE CASE / 02</span><h3>Real estate &amp; service operations</h3><p>Respond to buyer, seller, or customer enquiries, coordinate appointments, and keep follow-up tasks from being lost between tools.</p><div className="case-tags"><span>Appointment booking</span><span>Follow-up</span><span>Human handoff</span></div></article>
      </div>
    </div></section>
    <section><div className="wrap proof-grid">
      <div className="reveal"><p className="section-kicker">A more considered approach</p><h2>Automation with guardrails, not guesswork.</h2><p>Each workflow is scoped around the decisions your team actually makes, with clear rules for when automation should stop and a person should take over.</p><Link className="inline-link" href="/process">See our approach <span className="arrow">↗</span></Link></div>
      <div className="principles"><div className="principle reveal"><b>01</b><div><h3>Your rules come first</h3><p>We map the questions, boundaries, and outcomes before selecting tools or building flows.</p></div></div><div className="principle reveal"><b>02</b><div><h3>People stay in control</h3><p>Escalations, exception paths, and live handoffs are part of the design—not an afterthought.</p></div></div><div className="principle reveal"><b>03</b><div><h3>The systems connect</h3><p>Useful automation logs outcomes and passes context into the CRM and tools your team uses.</p></div></div></div>
    </div></section>
    <div className="cta"><div className="wrap"><p className="section-kicker">Start with the workflow</p><h2>Let’s find the part worth automating.</h2><p>Bring one process that feels manual, slow, or easy to drop. We’ll map the handoffs and identify where voice AI or automation could help.</p><div className="actions"><Link className="btn primary" href="/contact">Discuss a project <span className="arrow">↗</span></Link><Link className="btn outline" href="/contact">Get in touch <span className="arrow">↗</span></Link></div></div></div>
  </main>;
}
