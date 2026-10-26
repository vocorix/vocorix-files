"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      canvas.style.display = "none";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    const core = new THREE.Group();
    scene.add(core);

    const start = Math.PI * 0.25;
    const end = Math.PI * 1.75;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 180; i += 1) {
      const angle = start + ((end - start) * i) / 180;
      points.push(new THREE.Vector3(1.72 * Math.cos(angle), 1.72 * Math.sin(angle), 0.1 * Math.sin(angle * 2.1)));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    core.add(new THREE.Mesh(
      new THREE.TubeGeometry(curve, 260, 0.032, 8, false),
      new THREE.MeshStandardMaterial({ color: 0xf6f2eb, metalness: 0.18, roughness: 0.32, transparent: true, opacity: 0.91 })
    ));

    const inner: THREE.Vector3[] = [];
    for (let i = 0; i <= 140; i += 1) {
      const angle = start + 0.22 + ((end - start - 0.44) * i) / 140;
      inner.push(new THREE.Vector3(1.42 * Math.cos(angle), 1.42 * Math.sin(angle), -0.13 + 0.06 * Math.cos(angle * 3)));
    }
    core.add(new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(inner, false, "centripetal"), 200, 0.008, 6, false),
      new THREE.MeshBasicMaterial({ color: 0xf06445, transparent: true, opacity: 0.52 })
    ));

    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xf06445, metalness: 0.25, roughness: 0.3 })
    );
    node.position.set(2.12, 1.52, 0.04);
    core.add(node);
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.05, 18, 18), new THREE.MeshBasicMaterial({ color: 0xf06445 }));
    core.add(pulse);
    scene.add(new THREE.AmbientLight(0xf6f2eb, 0.78));
    const keyLight = new THREE.PointLight(0xf5a28f, 2, 14);
    keyLight.position.set(2.8, 2.2, 3.8);
    scene.add(keyLight);
    const fill = new THREE.PointLight(0xf6f2eb, 0.65, 12);
    fill.position.set(-3, -1, 2);
    scene.add(fill);

    let frame = 0;
    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const draw = (ms: number) => {
      const time = reduced ? 0 : ms * 0.00035;
      core.rotation.y = reduced ? -0.1 : Math.sin(time * 0.72) * 0.16;
      core.rotation.x = reduced ? 0.05 : Math.sin(time * 0.48) * 0.09;
      core.rotation.z = reduced ? -0.08 : Math.sin(time * 0.31) * 0.045;
      pulse.position.copy(curve.getPointAt(reduced ? 0.35 : (ms * 0.00008) % 1));
      pulse.position.z += 0.02;
      node.scale.setScalar(1 + (reduced ? 0 : 0.12 * (0.5 + 0.5 * Math.sin(ms * 0.004))));
      renderer.render(scene, camera);
      if (!reduced) frame = window.requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-visual" aria-hidden="true" />;
}
