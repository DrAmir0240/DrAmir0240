"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useAppTheme } from "@/components/theme/ThemeRegistry";

// Helper to create a mechanical 3D Cog/Gear mesh
function createGearGeometry(
  innerRadius = 1.0,
  outerRadius = 1.45,
  teeth = 12,
  toothHeight = 0.28,
  depth = 0.3
) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const angle = i * step;
    const a1 = angle;
    const a2 = angle + step * 0.25;
    const a3 = angle + step * 0.5;
    const a4 = angle + step * 0.75;

    const rBase = outerRadius;
    const rTip = outerRadius + toothHeight;

    if (i === 0) {
      shape.moveTo(Math.cos(a1) * rBase, Math.sin(a1) * rBase);
    } else {
      shape.lineTo(Math.cos(a1) * rBase, Math.sin(a1) * rBase);
    }
    shape.lineTo(Math.cos(a2) * rTip, Math.sin(a2) * rTip);
    shape.lineTo(Math.cos(a3) * rTip, Math.sin(a3) * rTip);
    shape.lineTo(Math.cos(a4) * rBase, Math.sin(a4) * rBase);
  }

  // Inner hole for axle
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, innerRadius * 0.55, 0, Math.PI * 2, true);
  shape.holes.push(holePath);

  const extrudeSettings = {
    steps: 1,
    depth: depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 3,
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode } = useAppTheme();
  const isDark = mode === "dark";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. Interlocking Mechanical Gears (چرخ‌دنده‌های مکانیکی مهندسی)
    const gearMatPrimary = new THREE.MeshStandardMaterial({
      color: isDark ? 0x22050b : 0xef4444,
      metalness: 0.92,
      roughness: 0.22,
      emissive: isDark ? 0x990022 : 0x7f1d1d,
      emissiveIntensity: isDark ? 0.6 : 0.2,
    });

    const gearMatSecondary = new THREE.MeshStandardMaterial({
      color: isDark ? 0x140306 : 0xdc2626,
      metalness: 0.95,
      roughness: 0.18,
      emissive: isDark ? 0xff0055 : 0x991b1b,
      emissiveIntensity: isDark ? 0.8 : 0.3,
    });

    // Main central gear
    const mainGearGeo = createGearGeometry(0.8, 1.35, 14, 0.24, 0.28);
    const mainGear = new THREE.Mesh(mainGearGeo, gearMatPrimary);
    mainGear.position.set(-0.2, 0.2, 0);
    mainGroup.add(mainGear);

    // Secondary interlocking gear (Upper Right)
    const subGearGeo = createGearGeometry(0.5, 0.85, 10, 0.2, 0.22);
    const subGear = new THREE.Mesh(subGearGeo, gearMatSecondary);
    subGear.position.set(1.95, 1.25, -0.2);
    mainGroup.add(subGear);

    // Third interlocking gear (Lower Left)
    const thirdGearGeo = createGearGeometry(0.4, 0.7, 8, 0.18, 0.2);
    const thirdGear = new THREE.Mesh(thirdGearGeo, gearMatSecondary);
    thirdGear.position.set(-1.85, -1.2, 0.2);
    mainGroup.add(thirdGear);

    // 3. Dynamic Code Rings & Matrix Stream Lines (حلقه‌های کدنویسی و تله‌متری سیستم)
    // Code lines / orbital brackets
    const ringGeo = new THREE.TorusGeometry(2.5, 0.02, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xff0055 : 0xdc2626,
      transparent: true,
      opacity: 0.75,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    mainGroup.add(orbitalRing);

    const secondRingGeo = new THREE.TorusGeometry(3.0, 0.015, 16, 120);
    const secondRingMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xff3377 : 0xb91c1c,
      transparent: true,
      opacity: 0.45,
    });
    const secondRing = new THREE.Mesh(secondRingGeo, secondRingMat);
    mainGroup.add(secondRing);

    // 4. Matrix Code Nodes (مکعب‌های سه‌بعدی متحرک نماینده ماژول‌ها و دستورات ترمینال)
    const codeNodeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const codeNodeMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xff0055 : 0xef4444,
      emissive: isDark ? 0xff0055 : 0xdc2626,
      emissiveIntensity: 1.2,
    });

    const codeNodes: THREE.Mesh[] = [];
    const codeNodeCount = 28;
    for (let i = 0; i < codeNodeCount; i++) {
      const node = new THREE.Mesh(codeNodeGeo, codeNodeMat);
      const angle = (i / codeNodeCount) * Math.PI * 2;
      const radius = 2.5 + (i % 2 === 0 ? 0.25 : -0.25);
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.8
      );
      mainGroup.add(node);
      codeNodes.push(node);
    }

    // 5. Binary / Sparkle Particles (0s and 1s simulation particles)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 8;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      color: isDark ? 0xff0055 : 0xdc2626,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffe4e6, isDark ? 2.5 : 2.0);
    dirLight.position.set(10, 10, 8);
    scene.add(dirLight);

    const redGlowLight = new THREE.PointLight(0xff0055, 4.5, 20);
    redGlowLight.position.set(0, 0, 2);
    scene.add(redGlowLight);

    const rimLight = new THREE.PointLight(0xff1a66, 3.0, 15);
    rimLight.position.set(-4, -4, -1);
    scene.add(rimLight);

    // 7. Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 9. Interactive Physics Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Mechanical gear rotation (Gears mesh into each other with inverse speeds)
      mainGear.rotation.z = t * 0.45;
      subGear.rotation.z = -t * 0.63; // Counter-rotation matching tooth ratio
      thirdGear.rotation.z = -t * 0.78;

      // Subtle dynamic 3D tilt tracking user pointer
      mainGroup.rotation.x = THREE.MathUtils.lerp(
        mainGroup.rotation.x,
        mouseY * 0.35 + Math.sin(t * 0.5) * 0.08,
        0.05
      );
      mainGroup.rotation.y = THREE.MathUtils.lerp(
        mainGroup.rotation.y,
        mouseX * 0.45,
        0.05
      );

      // Rings gyroscopic rotation
      orbitalRing.rotation.x = t * 0.2;
      orbitalRing.rotation.y = t * 0.15;
      secondRing.rotation.x = -t * 0.15;
      secondRing.rotation.z = t * 0.25;

      // Pulse code nodes
      codeNodes.forEach((node, i) => {
        const scale = 1 + Math.sin(t * 3 + i) * 0.3;
        node.scale.set(scale, scale, scale);
      });

      // Orbit particles
      particles.rotation.y = t * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mainGearGeo.dispose();
      subGearGeo.dispose();
      thirdGearGeo.dispose();
      ringGeo.dispose();
      secondRingGeo.dispose();
      codeNodeGeo.dispose();
      particleGeo.dispose();
      if (container) container.innerHTML = "";
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[480px] lg:h-[620px] relative pointer-events-auto select-none overflow-hidden flex items-center justify-center"
    />
  );
}
