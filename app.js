const CONFIG = { email: "swastik@vocorix.com" };
const SUPABASE_URL = "https://gnciulkwhajhqgpshmtb.supabase.co";
const SUPABASE_KEY = "sb_publishable_e28SjwMBk7z_n17q_DLiIQ_ox6dxF3W";

const pages = [["/services", "What it does"], ["/process", "How it works"], ["/contact", "Contact"]];
const here = (location.pathname.replace(/\.html$/, "").replace(/\/index$/, "").replace(/\/$/, "")) || "/";

document.getElementById("site-header").innerHTML =
  '<div class="wrap bar"><a href="/" aria-label="Vocorix home"><img class="brand-logo" src="/brand/vocorix-logo.svg" alt="Vocorix" width="150" height="41"></a>' +
  '<nav class="nav" id="primary-nav" aria-label="Main navigation">' +
  pages.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === here ? ' aria-current="page"' : '') + '>' + p[1] + '</a>'; }).join("") +
  '<a class="nav-cta" href="/contact#form">Get started</a></nav>' +
  '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation"><span></span><span></span><span></span></button></div>';

document.getElementById("site-footer").innerHTML =
  '<div class="wrap"><div class="foot"><a href="/" aria-label="Vocorix home"><img class="footer-logo" src="/brand/vocorix-logo-light.svg" alt="Vocorix" width="130" height="37"></a>' +
  '<nav aria-label="Footer"><a href="/services">What it does</a><a href="/process">How it works</a><a href="/contact">Contact</a>' +
  '<a href="https://www.instagram.com/vocorix/" target="_blank" rel="noopener noreferrer">Instagram</a>' +
  '<a href="https://www.linkedin.com/company/144046215/" target="_blank" rel="noopener noreferrer">LinkedIn</a></nav></div>' +
  '<div class="foot-bottom"><span>© ' + new Date().getFullYear() + ' Vocorix. AI receptionists and call automation.</span>' +
  '<a href="mailto:' + CONFIG.email + '">' + CONFIG.email + '</a></div></div>';

(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
  });
})();

// Enquiry forms: saved to Supabase (insert-only table) and emailed via FormSubmit.
document.querySelectorAll("[data-lead-form]").forEach(function (form) {
  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");
  form.addEventListener("submit", function (event) {
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
    }).then(function (r) { if (!r.ok) throw new Error("save"); });
    var mail = new FormData();
    Object.keys(lead).forEach(function (k) { if (lead[k]) mail.append(k, lead[k]); });
    mail.append("_subject", "New Vocorix enquiry from " + lead.name);
    mail.append("_template", "table");
    mail.append("_captcha", "false");
    var notify = fetch("https://formsubmit.co/ajax/" + CONFIG.email, { method: "POST", headers: { "Accept": "application/json" }, body: mail })
      .then(function (r) { if (!r.ok) throw new Error("mail"); });
    Promise.allSettled([save, notify]).then(function (results) {
      if (results.some(function (r) { return r.status === "fulfilled"; })) {
        form.reset();
        status.textContent = "Thanks, your message has been sent. We'll reply by email soon.";
      } else {
        status.textContent = "Sorry, that didn't send. Please email " + CONFIG.email + " directly.";
      }
      button.disabled = false;
    });
  });
});
