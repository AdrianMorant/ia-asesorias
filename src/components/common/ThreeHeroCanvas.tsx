import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHeroCanvasProps {
  className?: string;
}

const ThreeHeroCanvas: React.FC<ThreeHeroCanvasProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Main Group for Interactive Floating
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ── Central Token: Futuristic Crypto/Fintech Coin with Dual Rings ──
    // Core cylinder (Coin)
    const coinGeometry = new THREE.CylinderGeometry(1.6, 1.6, 0.22, 48);
    const coinMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f1b2f,
      metalness: 0.92,
      roughness: 0.18,
    });
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.rotation.x = Math.PI / 3;
    coin.rotation.y = Math.PI / 6;
    mainGroup.add(coin);

    // Outer Glow Ring for Coin
    const coinBorderGeo = new THREE.TorusGeometry(1.62, 0.05, 16, 64);
    const coinBorderMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });
    const coinBorder = new THREE.Mesh(coinBorderGeo, coinBorderMat);
    coinBorder.rotation.x = Math.PI / 2;
    coin.add(coinBorder);

    // Inner Emblem (Hexagon/Prism)
    const innerEmblemGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.26, 6);
    const innerEmblemMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.8,
      roughness: 0.25,
      emissive: 0x3b1d7d,
      emissiveIntensity: 0.4,
    });
    const innerEmblem = new THREE.Mesh(innerEmblemGeo, innerEmblemMat);
    coin.add(innerEmblem);

    // ── Floating Torus (Orbital Gyroscope Ring) ──
    const torusGeo = new THREE.TorusGeometry(2.35, 0.06, 16, 80);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x006688,
      emissiveIntensity: 0.6,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 4;
    mainGroup.add(torus);

    // Second inclined orbital ring
    const torus2Geo = new THREE.TorusGeometry(2.7, 0.035, 16, 80);
    const torus2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.5,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.rotation.x = -Math.PI / 3;
    torus2.rotation.y = Math.PI / 4;
    mainGroup.add(torus2);

    // ── Floating Satellite Nodes (Zero-gravity faceted crystals) ──
    const satellites: THREE.Mesh[] = [];
    const satCount = 5;
    const satGeometries = [
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.TetrahedronGeometry(0.32, 0),
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.IcosahedronGeometry(0.25, 0),
    ];

    const satMaterials = [
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x004455,
        emissiveIntensity: 0.5,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x331166,
        emissiveIntensity: 0.5,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.8,
        roughness: 0.3,
        emissive: 0x064e3b,
        emissiveIntensity: 0.6,
      }),
      new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.9,
        roughness: 0.2,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.9,
        roughness: 0.2,
      }),
    ];

    for (let i = 0; i < satCount; i++) {
      const mesh = new THREE.Mesh(satGeometries[i], satMaterials[i]);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 3.2 + Math.sin(i * 1.5) * 0.4;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 1.2) - 0.2,
        Math.sin(angle) * (radius * 0.7)
      );
      mesh.userData = {
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        speed: 0.7 + i * 0.2,
        angleOffset: i * 1.3,
      };
      satellites.push(mesh);
      mainGroup.add(mesh);
    }

    // ── Particle Field (Starry Dust / Cybernetic Sparkles) ──
    const particlesCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      const mixedColor = cyanColor.clone().lerp(purpleColor, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // ── Lighting Setup (Alex Bender Fintech Atmosphere) ──
    const ambientLight = new THREE.AmbientLight(0x081024, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 4.2, 20);
    cyanLight.position.set(-4, 3, 4);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 5.0, 20);
    violetLight.position.set(4, -3, 3);
    scene.add(violetLight);

    const emeraldAccentLight = new THREE.PointLight(0x10b981, 2.0, 15);
    emeraldAccentLight.position.set(0, 4, -2);
    scene.add(emeraldAccentLight);

    // ── Mouse Interactivity with Smooth Damping ──
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.45;
      targetMouseY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Resize Observer ──
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // ── Animation Loop ──
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Group rotation & levitation
      mainGroup.rotation.y = currentMouseX + elapsedTime * 0.12;
      mainGroup.rotation.x = currentMouseY + Math.sin(elapsedTime * 0.6) * 0.08;
      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.18;

      // Inner coin spin & wobble
      coin.rotation.z = elapsedTime * 0.25;
      innerEmblem.rotation.y = -elapsedTime * 0.4;

      // Torus rings counter-rotation
      torus.rotation.z = elapsedTime * 0.35;
      torus2.rotation.z = -elapsedTime * 0.25;

      // Satellites orbital motion
      satellites.forEach((sat) => {
        const { baseX, baseY, baseZ, speed, angleOffset } = sat.userData;
        const t = elapsedTime * speed + angleOffset;
        sat.position.x = baseX * Math.cos(t * 0.5) - baseZ * Math.sin(t * 0.5);
        sat.position.z = baseX * Math.sin(t * 0.5) + baseZ * Math.cos(t * 0.5);
        sat.position.y = baseY + Math.sin(t * 1.5) * 0.35;
        sat.rotation.x += 0.015;
        sat.rotation.y += 0.02;
      });

      // Subtle particle drift
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.04) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coinGeometry.dispose();
      coinMaterial.dispose();
      coinBorderGeo.dispose();
      coinBorderMat.dispose();
      innerEmblemGeo.dispose();
      innerEmblemMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      torus2Geo.dispose();
      torus2Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      satGeometries.forEach((g) => g.dispose());
      satMaterials.forEach((m) => m.dispose());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};

export default ThreeHeroCanvas;
