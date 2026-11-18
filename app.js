const CONFIG = {
  email: "swastik@vocorix.com",
  phone: "+17073406743",
  phoneText: "+1 (707) 340-6743"
};

const projectMail = "mailto:" + CONFIG.email +
  "?subject=" + encodeURIComponent("Let's talk about a workflow") +
  "&body=" + encodeURIComponent("Hi Vocorix,\n\nI'd like to talk about a workflow we could improve.\n\nWhat we do:\n\nWhat is taking too much time:\n\nTools we use:\n\nThanks,");
const generalMail = "mailto:" + CONFIG.email +
  "?subject=" + encodeURIComponent("Hello Vocorix") +
  "&body=" + encodeURIComponent("Hi Vocorix,\n\nI'd like to learn more about your services.\n\nThanks,");

const pages = [["index.html","Home"],["services.html","Capabilities"],["process.html","Approach"],["contact.html","Contact"]];
const here = location.pathname.split("/").filter(Boolean).pop() || "index.html";
document.getElementById("site-header").innerHTML =
  '<div class="wrap bar"><a class="logo" href="index.html" aria-label="Vocorix home">' +
  '<img class="brand-logo" src="/brand/vocorix-logo.svg" alt="Vocorix"></a><nav class="nav" id="primary-nav" aria-label="Main navigation">' +
  pages.map(function(item) {
    return '<a href="' + item[0] + '"' + (item[0] === here ? ' aria-current="page"' : '') + '>' + item[1] + '</a>';
  }).join("") +
  '<a class="btn dark sm" href="index.html#get-started">Get started <span class="arrow" aria-hidden="true">→</span></a></nav><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation"><span></span><span></span></button></div>';
document.getElementById("site-footer").innerHTML =
  '<div class="wrap"><div class="footer-main"><a class="footer-brand" href="index.html">' +
  '<img class="footer-logo" src="/brand/vocorix-logo-light.svg" alt="Vocorix"></a><div class="footer-links"><a href="services.html">Capabilities</a>' +
  '<a href="process.html">Our approach</a><a href="contact.html">Contact</a></div></div><div class="footer-social" aria-label="Vocorix social profiles">' +
  '<a href="https://www.instagram.com/vocorix/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>' +
  '<a href="https://www.linkedin.com/company/144046215/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>' +
  '<a href="https://www.facebook.com/profile.php?id=1371446352725758" target="_blank" rel="noopener noreferrer">Facebook ↗</a></div><div class="footer-bottom"><span>© ' +
  new Date().getFullYear() + ' Vocorix. Built around your workflow.</span><a data-mail-draft href="' + generalMail + '">' +
  CONFIG.email + '</a></div></div>';
document.querySelectorAll("[data-phone]").forEach(function(a) {
  a.href = "tel:" + CONFIG.phone;
  if (a.dataset.phone === "text") a.textContent = CONFIG.phoneText;
});
document.querySelectorAll("[data-mail]").forEach(function(a) {
  a.href = generalMail;
});
document.querySelectorAll("[data-book]").forEach(function(a) {
  a.href = "contact.html#contact-form";
});
document.querySelectorAll("[data-mail-draft]").forEach(function(a) {
  a.href = generalMail;
});

// Mobile navigation opens and closes with a button.
(function() {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function() {
    var isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !isOpen);
  });
  nav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
    });
  });
})();
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

// Lead forms: saved to Supabase (insert-only table) and emailed via FormSubmit.
const SUPABASE_URL = "https://gnciulkwhajhqgpshmtb.supabase.co";
const SUPABASE_KEY = "sb_publishable_e28SjwMBk7z_n17q_DLiIQ_ox6dxF3W";
document.querySelectorAll("[data-lead-form]").forEach(function(form) {
  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var data = new FormData(form);
    if (data.get("_honey")) return;
    var lead = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim() || null,
      phone: String(data.get("phone") || "").trim() || null,
      message: String(data.get("message") || "").trim(),
      page: location.pathname
    };
    button.disabled = true;
    status.textContent = "Sending...";
    var save = fetch(SUPABASE_URL + "/rest/v1/vocorix_website_enquiries", {
      method: "POST",
      headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json", "Prefer": "return=minimal" },
      body: JSON.stringify(lead)
    }).then(function(r) { if (!r.ok) throw new Error("save"); });
    var mail = new FormData();
    Object.keys(lead).forEach(function(k) { if (lead[k]) mail.append(k, lead[k]); });
    mail.append("_subject", "New Vocorix enquiry from " + lead.name);
    mail.append("_template", "table");
    mail.append("_captcha", "false");
    var notify = fetch("https://formsubmit.co/ajax/" + CONFIG.email, { method: "POST", headers: { "Accept": "application/json" }, body: mail })
      .then(function(r) { if (!r.ok) throw new Error("mail"); });
    Promise.allSettled([save, notify]).then(function(results) {
      if (results.some(function(r) { return r.status === "fulfilled"; })) {
        form.reset();
        status.textContent = "Thanks, your message has been sent. We'll reply by email soon.";
      } else {
        status.textContent = "Sorry, that didn't send. Please email " + CONFIG.email + " directly.";
      }
      button.disabled = false;
    });
  });
});
