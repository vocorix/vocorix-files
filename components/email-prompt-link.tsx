"use client";

import type { MouseEvent, ReactNode } from "react";

const EMAIL = "swastik@vocorix.com";
const STORAGE_KEY = "vocorix-email-draft-clicks";
let fallbackClicks = 0;

type EmailPromptLinkProps = {
  children: ReactNode;
  className?: string;
  intent?: "general" | "project";
  ariaLabel?: string;
};

type EmailDraft = {
  subject: string;
  body: string;
};

const generalDrafts: EmailDraft[] = [
  {
    subject: "Question about an AI voice agent for inbound calls",
    body: "Hi Swastik,\n\nI'm exploring whether a voice agent could answer common inbound questions, capture caller details, and hand off anything that needs a person. How would you normally scope a first version, and what systems would it need to connect to?\n\nThanks,"
  },
  {
    subject: "Exploring voice AI for lead qualification",
    body: "Hi Swastik,\n\nWe're looking at ways to qualify new enquiries before they reach our team. Could a voice agent ask a few tailored questions, identify high-priority leads, and pass a useful summary to a human? I'd appreciate your thoughts on an appropriate starting point.\n\nBest,"
  },
  {
    subject: "Could workflow automation reduce our manual follow-up?",
    body: "Hi Swastik,\n\nSome of our follow-up work still involves copying information between tools and reminding people about next steps. I'd like to understand how you approach workflow automation and how you'd decide which tasks are worth automating first.\n\nThanks,"
  },
  {
    subject: "Question about connecting voice agents to a CRM",
    body: "Hi Swastik,\n\nI'm interested in a voice agent that can capture a conversation outcome and update our CRM rather than leaving the team to enter everything manually. What integrations are usually possible, and how do you keep the information accurate?\n\nBest regards,"
  },
  {
    subject: "Looking into an after-hours call assistant",
    body: "Hi Swastik,\n\nCould you advise on setting up a voice assistant for calls that come in outside our team's working hours? We'd want it to answer basic questions, collect context, and route urgent matters appropriately. What would you recommend for a first iteration?\n\nThank you,"
  },
  {
    subject: "Enquiry about automating appointment requests",
    body: "Hi Swastik,\n\nWe're considering a voice agent or automated workflow to handle appointment requests and coordinate with our calendar. I'd like to know how availability checks, confirmations, and handoffs are typically handled so that bookings remain reliable.\n\nThanks,"
  },
  {
    subject: "Question about AI voice follow-up for missed enquiries",
    body: "Hi Swastik,\n\nI'm curious whether voice AI could help us follow up with people who enquire but don't get reached in time. We'd need clear rules around retries, useful call summaries, and an easy way to transfer a conversation to our team. How might you approach this?\n\nRegards,"
  },
  {
    subject: "Exploring voice automation for customer service",
    body: "Hi Swastik,\n\nI'd like to explore where a voice agent could help with repetitive customer questions without making the experience frustrating. How do you design the boundaries and escalation paths so that callers can reach a person when needed?\n\nThanks,"
  },
  {
    subject: "Can automation keep our customer information in sync?",
    body: "Hi Swastik,\n\nWe use a few different tools to manage enquiries, schedules, and internal follow-up. I'm interested in connecting them so information can move between systems with fewer manual steps. Could you share how you'd assess the workflow and integration options?\n\nBest,"
  },
  {
    subject: "Question about a small proof of concept for voice AI",
    body: "Hi Swastik,\n\nBefore committing to a larger build, we'd like to understand whether a small voice AI proof of concept makes sense for our process. What information would you need to assess feasibility, likely integrations, and the right success measures?\n\nThanks,"
  },
  {
    subject: "Looking for advice on automating lead routing",
    body: "Hi Swastik,\n\nWe'd like enquiries to reach the right person based on details such as intent, urgency, or location. Could you help us understand whether this is better handled with a voice agent, a workflow automation, or a combination of the two?\n\nBest regards,"
  },
  {
    subject: "Question about safe handoffs from an AI voice agent",
    body: "Hi Swastik,\n\nI'm researching how voice agents handle ambiguous questions, exceptions, and situations where a human should take over. How do you map those rules and test them before a workflow is put into use?\n\nThank you,"
  }
];

const projectDrafts: EmailDraft[] = [
  {
    subject: "Discussing a voice agent for our enquiry workflow",
    body: "Hi Swastik,\n\nI'd like to discuss a potential voice agent for our enquiry workflow. The idea is to capture the caller's needs, qualify the request, and route it to the right person with context. What would you want to learn from us before suggesting a scope?\n\nThanks,"
  },
  {
    subject: "Project question: voice AI with human transfer",
    body: "Hi Swastik,\n\nWe're considering a voice AI project, but it's important that callers can reach a human for complex or urgent cases. Could we talk through how you'd design the conversation, transfer rules, and fallback behaviour?\n\nBest,"
  },
  {
    subject: "Project enquiry about workflow automation and CRM updates",
    body: "Hi Swastik,\n\nI'd like to explore a workflow that takes information from new enquiries and carries it through to CRM updates, notifications, and follow-up tasks. Could you advise on the discovery process and what a manageable first phase might include?\n\nThanks,"
  },
  {
    subject: "Scoping a voice agent for appointment scheduling",
    body: "Hi Swastik,\n\nWe're interested in whether a voice agent could handle appointment requests while checking availability and recording the outcome in our existing tools. Could you share the key decisions and integrations we'd need to settle before building it?\n\nRegards,"
  },
  {
    subject: "Could we discuss an AI caller for lead follow-up?",
    body: "Hi Swastik,\n\nI'd like to discuss an outbound follow-up workflow that can contact new leads, ask a few relevant questions, and escalate interested prospects to our team. What are the main considerations for making that useful and reliable?\n\nBest regards,"
  },
  {
    subject: "Project idea: connecting calls, calendars, and internal tools",
    body: "Hi Swastik,\n\nWe have a process that spans calls, calendar events, and internal notifications, and we'd like to reduce the manual coordination between them. Could you help us assess whether voice AI, workflow automation, or an integration-only approach would fit best?\n\nThanks,"
  },
  {
    subject: "Looking to scope an AI receptionist for our team",
    body: "Hi Swastik,\n\nWe're evaluating an AI receptionist for common questions and initial enquiry capture. We'd want it to follow our process rather than act as a generic bot. Could you walk me through how you'd turn the requirements into a sensible first release?\n\nThank you,"
  },
  {
    subject: "Discussing a first automation project",
    body: "Hi Swastik,\n\nThere's a repetitive process in our team that involves moving data between systems and chasing the next action. I'd like to discuss how you identify the right automation boundary, account for failed steps, and measure the improvement.\n\nBest,"
  },
  {
    subject: "Project question about voice AI for real-estate enquiries",
    body: "Hi Swastik,\n\nWe're exploring a voice workflow for property enquiries that can gather buyer requirements, capture urgency, and arrange a human follow-up. Could you share how you'd handle structured questions, property data, and warm transfers?\n\nRegards,"
  },
  {
    subject: "Could we review our call-to-CRM workflow?",
    body: "Hi Swastik,\n\nI'd like to discuss a project that connects call outcomes to our CRM and follow-up process. A useful result would be accurate notes, clear ownership, and fewer missed next steps. What would you need to review to estimate the work?\n\nThanks,"
  },
  {
    subject: "Project enquiry: reliable automation with exception handling",
    body: "Hi Swastik,\n\nWe're considering automating a multi-step workflow, but it needs clear behaviour when data is missing or an integration fails. Could we discuss the process, retries, alerts, and points where a person should take over?\n\nBest regards,"
  },
  {
    subject: "Exploring a voice AI pilot for customer enquiries",
    body: "Hi Swastik,\n\nI'd like to explore a focused pilot for handling customer enquiries with voice AI. We want to keep the scope practical and evaluate outcomes before expanding. Could you suggest what a good pilot would test and what you'd need from our side?\n\nThank you,"
  }
];

function getNextDraft(intent: EmailPromptLinkProps["intent"]): EmailDraft {
  const drafts = intent === "project" ? projectDrafts : generalDrafts;
  let count = 0;

  try {
    const stored = Number(window.sessionStorage.getItem(STORAGE_KEY) ?? "0");
    count = Number.isSafeInteger(stored) && stored >= 0 ? stored : 0;
    window.sessionStorage.setItem(STORAGE_KEY, String(count + 1));
  } catch {
    // Keep rotating drafts even when browser storage is unavailable.
    count = Date.now() + fallbackClicks++;
  }

  return drafts[count % drafts.length];
}

export default function EmailPromptLink({
  children,
  className,
  intent = "general",
  ariaLabel
}: EmailPromptLinkProps) {
  function openEmail(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const draft = getNextDraft(intent);
    const composeUrl = new URL(`mailto:${EMAIL}`);
    composeUrl.searchParams.set("subject", draft.subject);
    composeUrl.searchParams.set("body", draft.body);
    window.location.href = composeUrl.toString();
  }

  const fallbackSubject = intent === "project"
    ? "Discussing a voice AI or automation project"
    : "Question about voice agents and workflow automation";
  const fallbackBody = "Hi Swastik,\n\nI'd like to ask about voice agents or workflow automation for a process we're looking to improve. Could you share what a sensible next step might be?\n\nThanks,";

  return (
    <a
      href={`mailto:${EMAIL}?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(fallbackBody)}`}
      className={className}
      aria-label={ariaLabel}
      onClick={openEmail}
    >
      {children}
    </a>
  );
}
