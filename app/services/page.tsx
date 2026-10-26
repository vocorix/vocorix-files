import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "Voice AI, workflow automation, customer routing, and CRM integrations shaped around your process.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Capabilities — Vocorix", url: "https://vocorix.com/services" }
};

export default function ServicesPage() {
  return <main>
    <div className="hero small"><div className="wrap"><p className="eyebrow">Capabilities</p><h1>Build the right connection between a conversation and an outcome.</h1><p className="lede">A voice agent is one component. The real value comes from the questions it asks, the systems it updates, and the next step it sets in motion.</p><div className="actions"><Link className="btn primary" href="/contact">Talk through a workflow <span className="arrow">↗</span></Link><Link className="btn outline" href="/process">How we work <span className="arrow">↗</span></Link></div></div></div>
    <section><div className="wrap"><div className="section-head reveal"><div><p className="section-kicker">What we build</p><h2>Composable capabilities. One joined-up workflow.</h2></div><p>Start with a single bottleneck and expand when the next connection is worth making.</p></div><div className="rows">
      <div className="row reveal"><div><h3>Voice AI &amp; call handling</h3></div><div><ul><li>Inbound call answering and intent capture</li><li>Guided qualification based on your questions</li><li>Outbound follow-up and appointment requests</li><li>Escalation and live transfer to your team</li><li>Conversation summaries and outcome capture</li><li>Clear boundaries for sensitive or unsupported requests</li></ul></div></div>
      <div className="row reveal"><div><h3>Workflow automation</h3></div><div><ul><li>Lead routing and follow-up orchestration</li><li>Task creation and internal notifications</li><li>Calendar and scheduling connections</li><li>Multi-step flows built around your business rules</li><li>Error paths, retries, and operational alerts</li><li>Workflow documentation for handover</li></ul></div></div>
      <div className="row reveal"><div><h3>CRM &amp; system integration</h3></div><div><ul><li>CRM records, fields, and lifecycle updates</li><li>Webhooks and API-based connections</li><li>Voice platform and telephony integrations</li><li>Calendar, email, and internal tools</li><li>Structured notes and disposition data</li><li>Practical testing against real process edge cases</li></ul></div></div>
      <div className="row reveal"><div><h3>Conversation design</h3></div><div><ul><li>Scripts, prompts, and turn-taking rules</li><li>Clear tone and escalation guidance</li><li>Handling interruptions, ambiguity, and no-answer cases</li><li>Test scenarios for common and unusual calls</li><li>Human handoff and fallback design</li><li>Iteration based on reviewed outcomes</li></ul></div></div>
    </div></div></section>
    <section className="paper"><div className="wrap"><div className="section-head reveal"><div><p className="section-kicker">Flexible by design</p><h2>Use the tools that fit your stack.</h2></div><p>We can work with platforms such as Retell, Vapi, Twilio, n8n, Make, and common CRM/calendar tools where they fit the requirement. Tool choice follows the workflow—not the other way around.</p></div><div className="capabilities">
      <article className="capability reveal"><span className="cap-number">VOICE</span><h3>Capture intent</h3><p>Gather the information your team needs while keeping the conversation natural and appropriately scoped.</p></article>
      <article className="capability reveal"><span className="cap-number">ORCHESTRATION</span><h3>Move the work</h3><p>Translate call outcomes into routing, scheduling, updates, alerts, and other concrete next steps.</p></article>
      <article className="capability reveal"><span className="cap-number">CONTROL</span><h3>Know when to stop</h3><p>Define fallback behaviour, human handoffs, and rules for cases the agent should not handle alone.</p></article>
    </div></div></section>
    <div className="cta"><div className="wrap"><p className="section-kicker">Find the useful first step</p><h2>Start with one process, not a giant rebuild.</h2><p>We’ll help assess where automation is likely to pay off and where a human-led process is still the better choice.</p><div className="actions"><Link className="btn primary" href="/contact">Discuss a project <span className="arrow">↗</span></Link></div></div></div>
  </main>;
}
