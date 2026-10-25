const CONFIG={email:"swastik@vokerohq.com",phone:"+17073406743",phoneText:"+1 (707) 340-6743",
book:"https://cal.com/REPLACE-WITH-YOUR-LINK",
social:[["LinkedIn","https://www.linkedin.com/in/REPLACE"],["X","https://x.com/REPLACE"],["Instagram","https://instagram.com/REPLACE"],["GitHub","https://github.com/swastik-21"]]};
const pages=[["index.html","Home"],["services.html","Services"],["process.html","Process"],["contact.html","Contact"]];
const here=location.pathname.split("/").pop()||"index.html";
document.getElementById("site-header").innerHTML=`<div class="wrap bar"><a class="logo" href="index.html">Voke<span>ro</span></a><nav>${pages.map(([h,t])=>`<a href="${h}"${h===here?' aria-current="page"':""}>${t}</a>`).join("")}<a class="btn primary sm" href="${CONFIG.book}">Book a call</a></nav></div>`;
document.getElementById("site-footer").innerHTML=`<div class="wrap"><span>&copy; 2026 Vokero</span><span>${CONFIG.social.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join("")}</span><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></div>`;
document.querySelectorAll("[data-book]").forEach(a=>a.href=CONFIG.book);
document.querySelectorAll("[data-phone]").forEach(a=>{a.href="tel:"+CONFIG.phone;if(a.dataset.phone==="text")a.textContent=CONFIG.phoneText});
document.querySelectorAll("[data-mail]").forEach(a=>{a.href="mailto:"+CONFIG.email;a.textContent=CONFIG.email});
(function(){
const el=document.getElementById("hero3d");if(!el||!window.THREE)return;
let r;try{r=new THREE.WebGLRenderer({canvas:el,alpha:true,antialias:true})}catch(e){return}
const still=matchMedia("(prefers-reduced-motion: reduce)").matches;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100);cam.position.z=7;
const N=2600,base=[],pos=new Float32Array(N*3);
for(let i=0;i<N;i++){const y=1-2*(i+.5)/N,rad=Math.sqrt(1-y*y),t=i*2.399963;base.push([Math.cos(t)*rad,y,Math.sin(t)*rad])}
const geo=new THREE.BufferGeometry();geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:0x8EA2FF,size:.035,transparent:true,opacity:.9}));
scene.add(pts);
const ring=new THREE.Mesh(new THREE.TorusGeometry(2.6,.008,8,200),new THREE.MeshBasicMaterial({color:0x2A44E8}));ring.rotation.x=1.2;scene.add(ring);
let mx=0,my=0;addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function size(){const w=el.clientWidth,h=el.clientHeight;r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
addEventListener("resize",size);size();
function frame(ms){const t=ms/1000;
for(let i=0;i<N;i++){const b=base[i],k=1.8+.28*Math.sin(b[1]*7+t*2.2)+.14*Math.sin(b[0]*5-t*1.6);pos[i*3]=b[0]*k;pos[i*3+1]=b[1]*k;pos[i*3+2]=b[2]*k}
geo.attributes.position.needsUpdate=true;
pts.rotation.y=t*.12+mx*.6;pts.rotation.x=my*.4;ring.rotation.z=t*.2;r.render(scene,cam);
if(!still)requestAnimationFrame(frame)}
requestAnimationFrame(frame);
})();
