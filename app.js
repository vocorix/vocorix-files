const CONFIG = {
  email: "swastik@vokerohq.com",
  phone: "+17073406743",
  phoneText: "+1 (707) 340-6743",
  // Until the dedicated booking URL is added, this CTA opens an email instead of a dead placeholder.
  book: "mailto:swastik@vokerohq.com?subject=Vocorix%20workflow%20consultation"
};
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
  '<a class="btn dark sm" data-book href="' + CONFIG.book + '">Discuss a project <span class="arrow">↗</span></a></nav></div>';
document.getElementById("site-footer").innerHTML =
  '<div class="wrap"><div class="footer-main"><a class="footer-brand" href="index.html">' +
  openCore("footer-mark") + '<span>VOCORIX</span></a><div class="footer-links"><a href="services.html">Capabilities</a>' +
  '<a href="process.html">Our approach</a><a href="contact.html">Contact</a></div></div><div class="footer-bottom"><span>© ' +
  new Date().getFullYear() + ' Vocorix. Built around your workflow.</span><a href="mailto:' + CONFIG.email + '">' +
  CONFIG.email + '</a></div></div>';
document.querySelectorAll("[data-book]").forEach(function(a) { a.href = CONFIG.book; });
document.querySelectorAll("[data-phone]").forEach(function(a) {
  a.href = "tel:" + CONFIG.phone;
  if (a.dataset.phone === "text") a.textContent = CONFIG.phoneText;
});
document.querySelectorAll("[data-mail]").forEach(function(a) {
  a.href = "mailto:" + CONFIG.email;
  var text = a.querySelector("span span");
  if (text) text.textContent = CONFIG.email;
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
