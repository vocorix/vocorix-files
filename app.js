const CONFIG = {
  email: "swastik@vocorix.com",
  phone: "+17073406743",
  phoneText: "+1 (707) 340-6743"
};
const DRAFT_COUNTER_KEY = "vocorix-email-draft-clicks";
let fallbackDraftClicks = 0;

const generalDrafts = [
  { subject: "Question about an AI voice agent for inbound calls", body: "Hi Swastik,\n\nI'm exploring whether a voice agent could answer common inbound questions, capture caller details, and hand off anything that needs a person. How would you scope a useful first version?\n\nThanks," },
  { subject: "Exploring voice AI for lead qualification", body: "Hi Swastik,\n\nWe're looking at ways to qualify new enquiries before they reach our team. Could a voice agent ask a few tailored questions and pass a useful summary to a human?\n\nBest," },
  { subject: "Could workflow automation reduce our manual follow-up?", body: "Hi Swastik,\n\nSome of our follow-up work still involves copying information between tools and reminding people about next steps. How would you identify which parts are worth automating first?\n\nThanks," },
  { subject: "Question about connecting voice agents to a CRM", body: "Hi Swastik,\n\nI'm interested in a voice agent that can capture a conversation outcome and update our CRM. Which integrations are usually possible, and how do you keep the information accurate?\n\nBest regards," },
  { subject: "Looking into an after-hours call assistant", body: "Hi Swastik,\n\nCould a voice assistant handle calls outside our team's working hours, answer basic questions, and route urgent matters appropriately? What would you recommend for a first iteration?\n\nThank you," },
  { subject: "Enquiry about automating appointment requests", body: "Hi Swastik,\n\nWe're considering a voice agent or automated workflow to handle appointment requests and coordinate with our calendar. How would you approach availability checks, confirmations, and handoffs?\n\nThanks," },
  { subject: "Question about AI voice follow-up for missed enquiries", body: "Hi Swastik,\n\nI'm curious whether voice AI could help us follow up with people who enquire but don't get reached in time. How might you handle retries, call summaries, and human handoff?\n\nRegards," },
  { subject: "Exploring voice automation for customer service", body: "Hi Swastik,\n\nI'd like to explore where a voice agent could help with repetitive customer questions without making the experience frustrating. How do you design escalation paths so callers can reach a person?\n\nThanks," },
  { subject: "Can automation keep our customer information in sync?", body: "Hi Swastik,\n\nWe use a few tools to manage enquiries, schedules, and internal follow-up. I'm interested in connecting them so information moves between systems with fewer manual steps. How would you assess the options?\n\nBest," },
  { subject: "Question about a small proof of concept for voice AI", body: "Hi Swastik,\n\nBefore committing to a larger build, we'd like to understand whether a small voice AI proof of concept makes sense. What would you need to assess feasibility, integrations, and success measures?\n\nThanks," },
  { subject: "Looking for advice on automating lead routing", body: "Hi Swastik,\n\nWe'd like enquiries to reach the right person based on intent, urgency, or location. Would you recommend a voice agent, workflow automation, or a combination?\n\nBest regards," },
  { subject: "Question about safe handoffs from an AI voice agent", body: "Hi Swastik,\n\nI'm researching how voice agents handle ambiguous questions and exceptions. How do you decide when automation should stop and a person should take over?\n\nThank you," }
];

const projectDrafts = [
  { subject: "Discussing a voice agent for our enquiry workflow", body: "Hi Swastik,\n\nI'd like to discuss a potential voice agent for our enquiry workflow. The idea is to capture the caller's needs, qualify the request, and route it to the right person with context. What would you want to learn before suggesting a scope?\n\nThanks," },
  { subject: "Project question: voice AI with human transfer", body: "Hi Swastik,\n\nWe're considering a voice AI project, but callers must be able to reach a human for complex or urgent cases. Could we discuss the conversation design, transfer rules, and fallback behaviour?\n\nBest," },
  { subject: "Project enquiry about workflow automation and CRM updates", body: "Hi Swastik,\n\nI'd like to explore a workflow that takes new enquiries through CRM updates, notifications, and follow-up tasks. Could you advise on discovery and a manageable first phase?\n\nThanks," },
  { subject: "Scoping a voice agent for appointment scheduling", body: "Hi Swastik,\n\nWe're interested in whether a voice agent could handle appointment requests while checking availability and recording the outcome in our tools. What decisions and integrations would need to be settled first?\n\nRegards," },
  { subject: "Could we discuss an AI caller for lead follow-up?", body: "Hi Swastik,\n\nI'd like to discuss an outbound follow-up workflow that contacts new leads, asks relevant questions, and escalates interested prospects to our team. What would make this reliable and useful?\n\nBest regards," },
  { subject: "Project idea: connecting calls, calendars, and internal tools", body: "Hi Swastik,\n\nOur process spans calls, calendar events, and internal notifications. Could you help us assess whether voice AI, workflow automation, or a simpler integration would fit best?\n\nThanks," },
  { subject: "Looking to scope an AI receptionist for our team", body: "Hi Swastik,\n\nWe're evaluating an AI receptionist for common questions and enquiry capture. We'd want it to follow our process rather than act as a generic bot. How would you scope a practical first release?\n\nThank you," },
  { subject: "Discussing a first automation project", body: "Hi Swastik,\n\nThere's a repetitive process involving moving data between systems and chasing the next action. I'd like to discuss how you'd define the automation boundary, handle failed steps, and measure improvement.\n\nBest," },
  { subject: "Project question about voice AI for real-estate enquiries", body: "Hi Swastik,\n\nWe're exploring a voice workflow for property enquiries that gathers buyer requirements, captures urgency, and arranges human follow-up. How would you approach structured questions and warm transfers?\n\nRegards," },
  { subject: "Could we review our call-to-CRM workflow?", body: "Hi Swastik,\n\nI'd like to discuss connecting call outcomes to our CRM and follow-up process. We'd value accurate notes, clear ownership, and fewer missed next steps. What would you need to estimate the work?\n\nThanks," },
  { subject: "Project enquiry: reliable automation with exception handling", body: "Hi Swastik,\n\nWe're considering a multi-step workflow that needs clear behaviour when data is missing or an integration fails. Could we discuss retries, alerts, and when a person should take over?\n\nBest regards," },
  { subject: "Exploring a voice AI pilot for customer enquiries", body: "Hi Swastik,\n\nI'd like to explore a focused pilot for customer enquiries with voice AI. We want a practical scope and clear outcomes before expanding. What should the pilot test and what would you need from us?\n\nThank you," }
];

function mailtoFor(draft) {
  return "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(draft.subject) + "&body=" + encodeURIComponent(draft.body);
}

function nextEmailDraft(intent) {
  const pool = intent === "project" ? projectDrafts : generalDrafts;
  let count = 0;
  try {
    const stored = Number(window.sessionStorage.getItem(DRAFT_COUNTER_KEY) || "0");
    count = Number.isSafeInteger(stored) && stored >= 0 ? stored : 0;
    window.sessionStorage.setItem(DRAFT_COUNTER_KEY, String(count + 1));
  } catch (error) {
    // Keep drafts rotating even when browser storage is disabled.
    count = Date.now() + fallbackDraftClicks++;
  }
  return pool[count % pool.length];
}

function bindEmailDraftLink(anchor, intent) {
  const pool = intent === "project" ? projectDrafts : generalDrafts;
  // A usable mailto remains in the markup even if this module cannot run.
  anchor.href = mailtoFor(pool[0]);
  anchor.addEventListener("click", function(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.href = mailtoFor(nextEmailDraft(intent));
  });
}
const pages = [["index.html","Overview"],["services.html","Capabilities"],["process.html","Approach"],["contact.html","Contact"]];
const here = location.pathname.split("/").filter(Boolean).pop() || "index.html";
function openCore(cls) {
  return '<svg class="' + cls + '" viewBox="0 0 112 112" aria-hidden="true" focusable="false"><path d="M81.46 30.54 A36 36 0 1 0 92 56" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><path d="M88 56H100" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><circle cx="104" cy="56" r="5.2" fill="#F06445"/></svg>';
}
document.getElementById("site-header").innerHTML =
  '<div class="wrap bar"><a class="logo" href="index.html" aria-label="Vocorix home">' +
  openCore("brand-mark") + '<span class="logo-word">VOCORIX</span></a><nav class="nav" aria-label="Main navigation">' +
  pages.map(function(item) {
    return '<a href="' + item[0] + '"' + (item[0] === here ? ' aria-current="page"' : '') + '>' + item[1] + '</a>';
  }).join("") +
  '<a class="btn dark sm" data-book href="' + mailtoFor(projectDrafts[0]) + '">Discuss a project <span class="arrow">↗</span></a></nav></div>';
document.getElementById("site-footer").innerHTML =
  '<div class="wrap"><div class="footer-main"><a class="footer-brand" href="index.html">' +
  openCore("footer-mark") + '<span>VOCORIX</span></a><div class="footer-links"><a href="services.html">Capabilities</a>' +
  '<a href="process.html">Our approach</a><a href="contact.html">Contact</a></div></div><div class="footer-bottom"><span>© ' +
  new Date().getFullYear() + ' Vocorix. Built around your workflow.</span><a data-mail-draft href="' + mailtoFor(generalDrafts[0]) + '">' +
  CONFIG.email + '</a></div></div>';
document.querySelectorAll("[data-phone]").forEach(function(a) {
  a.href = "tel:" + CONFIG.phone;
  if (a.dataset.phone === "text") a.textContent = CONFIG.phoneText;
});
document.querySelectorAll("[data-mail]").forEach(function(a) {
  var text = a.querySelector("span span");
  if (text) text.textContent = CONFIG.email;
});
document.querySelectorAll('[data-book], [data-mail], [data-mail-draft], a[href^="mailto:"]').forEach(function(a) {
  bindEmailDraftLink(a, a.hasAttribute("data-book") ? "project" : "general");
});
// Progressive reveal. Content remains visible when reduced motion is requested or IntersectionObserver is unavailable.
(function() {
  var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!els.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    els.forEach(function(el) { el.classList.add("is-visible"); });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(function(el) { observer.observe(el); });
})();
// Purpose-built 3D version of the Vocorix "open core": the gap routes a signal toward an outcome.
(function() {
  var canvas = document.getElementById("hero3d");
  if (!canvas || !window.THREE) return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  } catch (err) {
    canvas.style.display = "none";
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.outputEncoding = THREE.sRGBEncoding;
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);
  var core = new THREE.Group();
  scene.add(core);
  var startAngle = Math.PI * 0.25;
  var endAngle = Math.PI * 1.75; // Leave a deliberate opening on the right.
  var points = [];
  for (var i = 0; i <= 180; i++) {
    var a = startAngle + (endAngle - startAngle) * i / 180;
    points.push(new THREE.Vector3(1.72 * Math.cos(a), 1.72 * Math.sin(a), 0.10 * Math.sin(a * 2.1)));
  }
  var ringCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
  core.add(new THREE.Mesh(
    new THREE.TubeGeometry(ringCurve, 260, 0.032, 8, false),
    new THREE.MeshStandardMaterial({ color: 0xF6F2EB, metalness: 0.18, roughness: 0.32, transparent: true, opacity: 0.91 })
  ));
  var innerPoints = [];
  for (var j = 0; j <= 140; j++) {
    var ai = startAngle + 0.22 + (endAngle - startAngle - 0.44) * j / 140;
    innerPoints.push(new THREE.Vector3(1.42 * Math.cos(ai), 1.42 * Math.sin(ai), -0.13 + 0.06 * Math.cos(ai * 3)));
  }
  core.add(new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(innerPoints, false, "centripetal"), 200, 0.008, 6, false),
    new THREE.MeshBasicMaterial({ color: 0xF06445, transparent: true, opacity: 0.52 })
  ));
  function addTube(pathPoints, radius, material) {
    var curve = new THREE.CatmullRomCurve3(pathPoints, false, "centripetal");
    core.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 60, radius, 8, false), material));
    return curve;
  }
  addTube([
    new THREE.Vector3(1.20, 1.22, 0.02),
    new THREE.Vector3(1.62, 1.52, 0.04),
    new THREE.Vector3(2.12, 1.52, 0.04)
  ], 0.018, new THREE.MeshBasicMaterial({ color: 0xF06445, transparent: true, opacity: 0.82 }));
  addTube([
    new THREE.Vector3(1.20, -1.22, 0),
    new THREE.Vector3(1.62, -1.50, 0.05),
    new THREE.Vector3(2.10, -1.50, 0.05)
  ], 0.014, new THREE.MeshBasicMaterial({ color: 0xF6F2EB, transparent: true, opacity: 0.45 }));
  var node = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 20), new THREE.MeshStandardMaterial({ color: 0xF06445, metalness: 0.25, roughness: 0.3 }));
  node.position.set(2.12, 1.52, 0.04);
  core.add(node);
  var node2 = new THREE.Mesh(new THREE.SphereGeometry(0.048, 16, 16), new THREE.MeshBasicMaterial({ color: 0xF6F2EB }));
  node2.position.set(2.10, -1.50, 0.05);
  core.add(node2);
  var pulse = new THREE.Mesh(new THREE.SphereGeometry(0.05, 18, 18), new THREE.MeshBasicMaterial({ color: 0xF06445 }));
  core.add(pulse);
  scene.add(new THREE.AmbientLight(0xF6F2EB, 0.78));
  var keyLight = new THREE.PointLight(0xF5A28F, 2.0, 14);
  keyLight.position.set(2.8, 2.2, 3.8);
  scene.add(keyLight);
  var fillLight = new THREE.PointLight(0xF6F2EB, 0.65, 12);
  fillLight.position.set(-3, -1, 2);
  scene.add(fillLight);
  var mx = 0, my = 0, active = !document.hidden, running = false;
  function resize() {
    var w = Math.max(1, canvas.clientWidth), h = Math.max(1, canvas.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", function(e) {
    mx = (e.clientX / window.innerWidth - 0.5) * 0.22;
    my = (e.clientY / window.innerHeight - 0.5) * 0.15;
  }, { passive: true });
  function start() {
    if (!running) {
      running = true;
      window.requestAnimationFrame(draw);
    }
  }
  document.addEventListener("visibilitychange", function() {
    active = !document.hidden;
    if (active) start();
  });
  function draw(ms) {
    if (!active) {
      running = false;
      return;
    }
    var t = reduced ? 0 : ms * 0.00035;
    core.rotation.y = reduced ? -0.10 : Math.sin(t * 0.72) * 0.16;
    core.rotation.x = (reduced ? 0.05 : Math.sin(t * 0.48) * 0.09) + my;
    core.rotation.z = reduced ? -0.08 : Math.sin(t * 0.31) * 0.045 + mx * 0.14;
    var u = reduced ? 0.35 : (ms * 0.00008) % 1;
    pulse.position.copy(ringCurve.getPointAt(u));
    pulse.position.z += 0.02;
    node.scale.setScalar(1 + (reduced ? 0 : 0.12 * (0.5 + 0.5 * Math.sin(ms * 0.004))));
    renderer.render(scene, camera);
    if (reduced) running = false;
    else window.requestAnimationFrame(draw);
  }
  resize();
  start();
})();
