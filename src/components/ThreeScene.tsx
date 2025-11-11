"use client";
// @ts-nocheck

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Group } from "three";

function RotatingShapes() {
  const ref = useRef<Group | null>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += 0.005 * (delta * 60);
      ref.current.rotation.y += 0.01 * (delta * 60);
    }
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.8, 0.25, 16, 64]} />
        <meshStandardMaterial color="#6ee7b7" metalness={0.6} roughness={0.2} />
      </mesh>

      <mesh position={[1.6, -0.2, 0.5]} rotation={[0.6, 0.2, 0]}> 
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.4} roughness={0.3} />
      </mesh>

      <mesh position={[-1.4, -0.3, -0.6]} rotation={[0.3, -0.5, 0]}> 
        <coneGeometry args={[0.5, 1, 16]} />
        <meshStandardMaterial color="#f472b6" metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function ThreeScene({ className }: { className?: string }) {
  return (
    <div style={{ width: '100%', height: 420, maxWidth: 520 }} className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
        <Suspense fallback={null}>
          <RotatingShapes />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
