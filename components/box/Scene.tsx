"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  useTexture,
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { tilt } from "@/lib/tilt";

// Mailer-box proportions (width, height, depth) taken from the photo.
const W = 3.3;
const H = 0.72;
const D = 2.15;

function Box() {
  const top = useTexture("/brand/box-top.png");
  top.colorSpace = THREE.SRGBColorSpace;
  top.anisotropy = 8;

  const boxRef = useRef<THREE.Group>(null);

  // Rotation = gentle idle spin + scroll position through the section + gyro.
  useFrame((state) => {
    const g = boxRef.current;
    if (!g) return;
    const el = state.gl.domElement;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const center = rect.top + rect.height / 2;
    const progress = THREE.MathUtils.clamp(1 - center / vh, 0, 1); // 0..1 through viewport
    const t = tilt.get();
    const targetY =
      state.clock.elapsedTime * 0.12 +
      (progress - 0.5) * Math.PI * 1.4 +
      t.x * 0.5;
    const targetX = -0.04 + t.y * 0.35;
    // Ease toward targets for smoothness.
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.1);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.1);
  });

  return (
    <group>
      <group ref={boxRef}>
        <RoundedBox args={[W, H, D]} radius={0.05} smoothness={5} castShadow>
        <meshPhysicalMaterial
          color="#0b0b0d"
          metalness={0.6}
          roughness={0.38}
          clearcoat={1}
          clearcoatRoughness={0.16}
          iridescence={1}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[130, 880]}
          envMapIntensity={1.15}
        />
      </RoundedBox>

        {/* Logo + HOBBY HITZ on the top face (plane has predictable UVs). */}
        <mesh position={[0, H / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W * 0.92, D * 0.92]} />
          <meshStandardMaterial
            map={top}
            transparent
            roughness={0.34}
            metalness={0.5}
            toneMapped={false}
            envMapIntensity={1.4}
          />
        </mesh>
      </group>

      <ContactShadows
        position={[0, -H / 2 - 0.02, 0]}
        opacity={0.55}
        blur={2.6}
        scale={9}
        far={4}
        color="#000000"
      />

      {/* Drag adds camera orbit on top of the idle/scroll/gyro rotation. */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.82}
      />
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      camera={{ position: [3.1, 2.3, 3.7], fov: 30 }}
    >
      <ambientLight intensity={0.28} />
      <directionalLight position={[4, 7, 4]} intensity={1.2} />

      {/* Env map built from lightformers (no network HDR) for reflections
          and iridescence. Gold + cool accents make the holo shift pop. */}
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[7, 3, 1]} color="#ffffff" />
        <Lightformer intensity={1.6} position={[-5, 1, 2]} scale={[5, 5, 1]} color="#f2c877" />
        <Lightformer intensity={1.3} position={[5, -1, 1]} scale={[5, 5, 1]} color="#8ad0ff" />
        <Lightformer intensity={1.1} position={[0, -3, -2]} scale={[7, 3, 1]} color="#c9a24b" />
      </Environment>

      <Suspense fallback={null}>
        <Box />
      </Suspense>
    </Canvas>
  );
}
