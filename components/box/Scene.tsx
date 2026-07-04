"use client";

import { Canvas } from "@react-three/fiber";
import {
  RoundedBox,
  useTexture,
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

// Mailer-box proportions (width, height, depth) taken from the photo.
const W = 3.3;
const H = 0.72;
const D = 2.15;

function Box({ spin }: { spin: boolean }) {
  const top = useTexture("/brand/box-top.png");
  top.colorSpace = THREE.SRGBColorSpace;
  top.anisotropy = 8;

  return (
    <group>
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

      {/* Logo + FIRST CLASS on the top face (plane has predictable UVs). */}
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

      <ContactShadows
        position={[0, -H / 2 - 0.02, 0]}
        opacity={0.55}
        blur={2.6}
        scale={9}
        far={4}
        color="#000000"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={spin}
        autoRotateSpeed={0.9}
        dampingFactor={0.08}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.82}
      />
    </group>
  );
}

export default function Scene({ spin = true }: { spin?: boolean }) {
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
        <Box spin={spin} />
      </Suspense>
    </Canvas>
  );
}
