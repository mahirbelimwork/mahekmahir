import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Heart, Volume2, VolumeX, Eye, Orbit, Infinity as InfinityIcon, Compass } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';

type FinishType = 'gold' | 'ruby' | 'rosequartz';
type MorphShape = 'heart' | 'saturn' | 'infinity' | 'constellation';

export const ThreeDHeartSanctuary: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeFinish, setActiveFinish] = useState<FinishType>('gold');
  const [activeMorph, setActiveMorph] = useState<MorphShape>('heart');
  const [isAudioMuted, setIsAudioMuted] = useState(romanticAudio.isMuted);
  const [pulseCount, setPulseCount] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);

  // References to communicate with Three.js render loop without remounting
  const finishRef = useRef<FinishType>(activeFinish);
  const morphRef = useRef<MorphShape>(activeMorph);
  const triggerPulseRef = useRef<boolean>(false);
  const heartGroupRef = useRef<THREE.Group | null>(null);
  const mainMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  useEffect(() => {
    finishRef.current = activeFinish;
    if (mainMaterialRef.current) {
      if (activeFinish === 'gold') {
        mainMaterialRef.current.color.set('#EAD59E');
        mainMaterialRef.current.emissive.set('#523912');
        mainMaterialRef.current.metalness = 0.92;
        mainMaterialRef.current.roughness = 0.15;
        mainMaterialRef.current.clearcoat = 1.0;
        mainMaterialRef.current.transmission = 0.0;
      } else if (activeFinish === 'ruby') {
        mainMaterialRef.current.color.set('#C2284E');
        mainMaterialRef.current.emissive.set('#4A0818');
        mainMaterialRef.current.metalness = 0.3;
        mainMaterialRef.current.roughness = 0.1;
        mainMaterialRef.current.clearcoat = 1.0;
        mainMaterialRef.current.transmission = 0.45;
      } else {
        // Rose quartz
        mainMaterialRef.current.color.set('#F4C2D0');
        mainMaterialRef.current.emissive.set('#592837');
        mainMaterialRef.current.metalness = 0.2;
        mainMaterialRef.current.roughness = 0.12;
        mainMaterialRef.current.clearcoat = 1.0;
        mainMaterialRef.current.transmission = 0.65;
      }
    }
  }, [activeFinish]);

  useEffect(() => {
    morphRef.current = activeMorph;
  }, [activeMorph]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Multi-part 3D Heart Sculpture Group
    const heartGroup = new THREE.Group();
    scene.add(heartGroup);
    heartGroupRef.current = heartGroup;

    // A. Main Beveled 3D Heart Geometry
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, 0.45);
    heartShape.bezierCurveTo(0, 0.75, 0.65, 1.05, 0.95, 0.65);
    heartShape.bezierCurveTo(1.25, 0.25, 0.85, -0.35, 0, -1.05);
    heartShape.bezierCurveTo(-0.85, -0.35, -1.25, 0.25, -0.95, 0.65);
    heartShape.bezierCurveTo(-0.65, 1.05, 0, 0.75, 0, 0.45);

    const extrudeSettings = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.16,
      bevelThickness: 0.16,
    };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();

    const mainMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#EAD59E'),
      emissive: new THREE.Color('#523912'),
      emissiveIntensity: 0.4,
      metalness: 0.92,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    mainMaterialRef.current = mainMat;

    const heartMesh = new THREE.Mesh(heartGeo, mainMat);
    heartGroup.add(heartMesh);

    // B. Celestial Orbital Golden Ring (Part 2)
    const ringGeo = new THREE.TorusGeometry(1.6, 0.025, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EAD59E'),
      metalness: 0.95,
      roughness: 0.2,
      emissive: new THREE.Color('#C5A059'),
      emissiveIntensity: 0.3,
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 3;
    orbitalRing.rotation.y = Math.PI / 6;
    heartGroup.add(orbitalRing);

    // C. Second Delicate Counter-Ring (Part 3)
    const ringGeo2 = new THREE.TorusGeometry(1.85, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FAF6F0'),
      metalness: 0.9,
      roughness: 0.3,
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.x = -Math.PI / 4;
    orbitalRing2.rotation.y = Math.PI / 3;
    heartGroup.add(orbitalRing2);

    // D. Swirling Golden Stardust Particles with Morphing Targets
    const particleCount = 520;
    const particleGeo = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(particleCount * 3);

    // Target positions for each morph shape
    const heartTargets = new Float32Array(particleCount * 3);
    const saturnTargets = new Float32Array(particleCount * 3);
    const infinityTargets = new Float32Array(particleCount * 3);
    const constellationTargets = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      // 1. Heart silhouette shell target
      const t = (i / particleCount) * Math.PI * 2;
      const hx = 1.1 * 16 * Math.pow(Math.sin(t), 3) * 0.08;
      const hy = 1.1 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.08;
      const hz = (Math.random() - 0.5) * 0.45;
      heartTargets[idx] = hx + (Math.random() - 0.5) * 0.15;
      heartTargets[idx + 1] = hy + (Math.random() - 0.5) * 0.15;
      heartTargets[idx + 2] = hz;

      // 2. Saturn rings target
      const rRing = 1.35 + Math.random() * 0.9;
      const thetaRing = Math.random() * Math.PI * 2;
      saturnTargets[idx] = rRing * Math.cos(thetaRing);
      saturnTargets[idx + 1] = (Math.random() - 0.5) * 0.08;
      saturnTargets[idx + 2] = rRing * Math.sin(thetaRing);

      // 3. 3D Infinity (Lemniscate) knot target
      const tInf = (i / particleCount) * Math.PI * 2;
      const scaleInf = 1.7;
      const denom = 1 + Math.sin(tInf) * Math.sin(tInf);
      infinityTargets[idx] = (scaleInf * Math.cos(tInf)) / denom;
      infinityTargets[idx + 1] = (scaleInf * Math.sin(tInf) * Math.cos(tInf)) / denom;
      infinityTargets[idx + 2] = Math.sin(tInf * 2) * 0.35 + (Math.random() - 0.5) * 0.1;

      // 4. Celestial spherical constellation
      const rConst = 1.4 + Math.random() * 0.9;
      const thetaConst = Math.random() * Math.PI * 2;
      const phiConst = (Math.random() - 0.5) * Math.PI;
      constellationTargets[idx] = rConst * Math.cos(thetaConst) * Math.cos(phiConst);
      constellationTargets[idx + 1] = rConst * Math.sin(phiConst);
      constellationTargets[idx + 2] = rConst * Math.sin(thetaConst) * Math.cos(phiConst);

      // Initialize current position to heart target
      currentPositions[idx] = heartTargets[idx];
      currentPositions[idx + 1] = heartTargets[idx + 1];
      currentPositions[idx + 2] = heartTargets[idx + 2];
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

    // Create procedural round particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 246, 220, 1)');
      grad.addColorStop(0.4, 'rgba(234, 213, 158, 0.8)');
      grad.addColorStop(1, 'rgba(197, 160, 89, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color('#EAD59E'),
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    heartGroup.add(particles);

    // 3. Studio 3-Point Lighting
    const keyLight = new THREE.DirectionalLight('#FFF3D1', 2.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight('#C2637D', 1.2);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight('#EAD59E', 1.8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight('#2A1121', 0.8);
    scene.add(ambientLight);

    // 4. Mouse and Touch Interaction Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.style.touchAction = 'none';
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 5. Animation Loop with Particle Morphing
    let animId: number;
    let clock = new THREE.Clock();
    let pulseScale = 1;
    let targetPulseScale = 1;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Idle auto-rotation when user isn't dragging
      if (!isDragging) {
        targetRotationY += 0.006;
      }

      // Smooth exponential damping for rotation
      heartGroup.rotation.y = THREE.MathUtils.damp(heartGroup.rotation.y, targetRotationY, 8, delta);
      heartGroup.rotation.x = THREE.MathUtils.damp(heartGroup.rotation.x, targetRotationX, 8, delta);

      // Rings independent rotation
      orbitalRing.rotation.z += 0.004;
      orbitalRing2.rotation.z -= 0.005;

      // Handle interactive pulse wave
      if (triggerPulseRef.current) {
        triggerPulseRef.current = false;
        targetPulseScale = 1.28;
      }

      targetPulseScale = THREE.MathUtils.damp(targetPulseScale, 1.0, 4, delta);
      pulseScale = THREE.MathUtils.damp(pulseScale, targetPulseScale, 12, delta);

      // Heart gentle rhythmic heartbeat idle
      const idleBeat = 1 + Math.sin(time * 2.8) * 0.035;
      heartMesh.scale.set(
        pulseScale * idleBeat,
        pulseScale * idleBeat,
        pulseScale * idleBeat
      );

      // PARTICLE MORPHING LOGIC:
      // Pick target positions based on active morph
      let activeTargetArray = heartTargets;
      if (morphRef.current === 'saturn') activeTargetArray = saturnTargets;
      else if (morphRef.current === 'infinity') activeTargetArray = infinityTargets;
      else if (morphRef.current === 'constellation') activeTargetArray = constellationTargets;

      const positions = particleGeo.attributes.position.array as Float32Array;
      const morphSpeed = 4.5 * delta;

      for (let i = 0; i < particleCount * 3; i += 3) {
        // Smoothly interpolate towards target shape
        positions[i] += (activeTargetArray[i] - positions[i]) * morphSpeed;
        positions[i + 1] += (activeTargetArray[i + 1] - positions[i + 1]) * morphSpeed;
        positions[i + 2] += (activeTargetArray[i + 2] - positions[i + 2]) * morphSpeed;

        // Subtle harmonic wave
        positions[i + 1] += Math.sin(time * 1.5 + positions[i]) * 0.0015;
      }

      particleGeo.attributes.position.needsUpdate = true;
      particles.rotation.y = time * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      heartGeo.dispose();
      mainMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, []);

  const triggerHeartPulse = () => {
    triggerPulseRef.current = true;
    setPulseCount((prev) => prev + 1);
    romanticAudio.playCelestialChord();
  };

  const handleAudioToggle = () => {
    const isMuted = romanticAudio.toggleMute();
    setIsAudioMuted(isMuted);
    if (!isMuted) {
      romanticAudio.playCrystalChime(659.25);
    }
  };

  const handleMorphChange = (shape: MorphShape) => {
    setActiveMorph(shape);
    romanticAudio.playCrystalChime(shape === 'heart' ? 523.25 : shape === 'saturn' ? 659.25 : shape === 'infinity' ? 783.99 : 880);
  };

  return (
    <section
      id="3d-heart-sanctuary"
      className="relative max-w-5xl mx-auto px-3.5 sm:px-6 py-12 sm:py-16 my-4 text-center"
      aria-label="3D Heart Sanctuary"
    >
      {/* Editorial Header */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#EAD59E]" />
          <span>Interactive 3D WebGL Technology</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#FAF6F0] tracking-tight">
          Our Eternal Heart & Particle Morphing
        </h2>

        <p className="text-xs sm:text-sm text-[#FAF6F0]/75 font-light leading-relaxed">
          Drag in 360° to inspect, tap to send a pulse of love, and morph the 3D celestial particles in real time.
        </p>
      </div>

      {/* 3D WebGL Canvas Viewport Container */}
      <div className="relative mx-auto max-w-3xl rounded-3xl luxury-editorial-card-elevated border border-[#C5A059]/40 shadow-2xl overflow-hidden bg-gradient-to-b from-[#180B15]/90 via-[#10060D] to-[#0A0408]">
        {/* Top Floating Badge */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none text-xs">
          <span className="px-3 py-1 rounded-full bg-[#1A0C16]/90 border border-[#C5A059]/30 text-[#EAD59E] font-mono text-[10px] uppercase tracking-wider backdrop-blur-md">
            WebGL 3D Studio · 60 FPS
          </span>

          <span className="text-[#C5A059]/80 font-serif italic text-xs hidden sm:inline">
            Drag to inspect · Tap to pulse
          </span>
        </div>

        {/* WebGL Canvas Mount */}
        <div
          ref={mountRef}
          onClick={triggerHeartPulse}
          className="w-full h-[360px] sm:h-[430px] cursor-grab active:cursor-grabbing select-none"
          title="Drag to rotate, click to pulse"
        />

        {/* Direct Tap overlay on mobile */}
        <button
          onClick={triggerHeartPulse}
          className="sm:hidden absolute top-14 right-4 z-10 p-2.5 rounded-full bg-[#1A0C16]/90 border border-[#C5A059]/40 text-[#EAD59E] shadow-lg active:scale-95"
          aria-label="Send Love Pulse"
        >
          <Heart className="w-4 h-4 text-[#EAD59E] fill-[#EAD59E]" />
        </button>

        {/* Unified Bottom Control Dock */}
        {isControlsVisible && (
          <div className="relative z-10 px-4 py-3.5 bg-[#130710]/95 backdrop-blur-md border-t border-[#C5A059]/30 space-y-3 text-xs">
            {/* Row 1: Particle Morph Matrix Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5A059]/15 pb-2.5">
              <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-mono">
                3D Particle Morph:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => handleMorphChange('heart')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeMorph === 'heart'
                      ? 'bg-[#EAD59E] text-[#0C060A] font-semibold'
                      : 'bg-[#1E0E1B] text-[#FAF6F0]/80 border border-[#C5A059]/30'
                  }`}
                >
                  <Heart className="w-3 h-3" />
                  <span>Heart Shell</span>
                </button>
                <button
                  onClick={() => handleMorphChange('saturn')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeMorph === 'saturn'
                      ? 'bg-[#EAD59E] text-[#0C060A] font-semibold'
                      : 'bg-[#1E0E1B] text-[#FAF6F0]/80 border border-[#C5A059]/30'
                  }`}
                >
                  <Orbit className="w-3 h-3" />
                  <span>Saturn Rings</span>
                </button>
                <button
                  onClick={() => handleMorphChange('infinity')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeMorph === 'infinity'
                      ? 'bg-[#EAD59E] text-[#0C060A] font-semibold'
                      : 'bg-[#1E0E1B] text-[#FAF6F0]/80 border border-[#C5A059]/30'
                  }`}
                >
                  <InfinityIcon className="w-3 h-3" />
                  <span>Infinity Knot</span>
                </button>
                <button
                  onClick={() => handleMorphChange('constellation')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeMorph === 'constellation'
                      ? 'bg-[#EAD59E] text-[#0C060A] font-semibold'
                      : 'bg-[#1E0E1B] text-[#FAF6F0]/80 border border-[#C5A059]/30'
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  <span>Star Nebula</span>
                </button>
              </div>
            </div>

            {/* Row 2: Finishes Selector & Pulse */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059]/75 font-mono mr-1">
                  Finish:
                </span>
                <button
                  onClick={() => setActiveFinish('gold')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeFinish === 'gold'
                      ? 'bg-[#EAD59E] text-[#0C060A] font-semibold shadow-xs'
                      : 'bg-[#1E0E1B] text-[#FAF6F0]/80 hover:text-white border border-[#C5A059]/30'
                  }`}
                >
                  Imperial Gold
                </button>
                <button
                  onClick={() => setActiveFinish('ruby')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeFinish === 'ruby'
                      ? 'bg-[#C2284E] text-white font-semibold shadow-xs'
                      : 'bg-[#1E0E1B] text-[#FAF6F0]/80 hover:text-white border border-[#C5A059]/30'
                  }`}
                >
                  Ruby Velvet
                </button>
                <button
                  onClick={() => setActiveFinish('rosequartz')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeFinish === 'rosequartz'
                      ? 'bg-[#F4C2D0] text-[#0C060A] font-semibold shadow-xs'
                      : 'bg-[#1E0E1B] text-[#FAF6F0]/80 hover:text-white border border-[#C5A059]/30'
                  }`}
                >
                  Rose Quartz
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerHeartPulse}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#EAD59E] to-[#C5A059] text-[#0C060A] font-semibold text-xs shadow-xs hover:brightness-110 active:scale-95 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#0C060A]" />
                  <span>Send Pulse {pulseCount > 0 && `(${pulseCount})`}</span>
                </button>

                <button
                  onClick={handleAudioToggle}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    !isAudioMuted
                      ? 'bg-[#1E0E1B] border-[#EAD59E] text-[#EAD59E]'
                      : 'bg-[#140811] border-[#C5A059]/30 text-[#FAF6F0]/50'
                  }`}
                  title={isAudioMuted ? 'Unmute romantic chimes' : 'Mute romantic chimes'}
                  aria-label="Toggle romantic chimes"
                >
                  {!isAudioMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Collapse / Expand Toggle Tab */}
        <div className="flex justify-center bg-[#130710]/90 border-t border-[#C5A059]/15 py-1">
          <button
            onClick={() => setIsControlsVisible(!isControlsVisible)}
            className="text-[10px] text-[#C5A059]/75 hover:text-[#EAD59E] transition-colors flex items-center gap-1 font-mono uppercase tracking-wider"
          >
            <Eye className="w-3 h-3" />
            <span>{isControlsVisible ? '▾ Cinema Mode' : '▴ Show 3D & Morph Controls'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
