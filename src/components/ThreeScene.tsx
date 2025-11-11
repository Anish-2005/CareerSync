"use client";

import React, { Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RotatingShapes() {
  const ref = useRef<THREE.Group>(null!);

  const materials = useMemo(
    () => ({
      torus: new THREE.MeshStandardMaterial({ color: "#6ee7b7", metalness: 0.6, roughness: 0.2 }),
      box: new THREE.MeshStandardMaterial({ color: "#60a5fa", metalness: 0.4, roughness: 0.3 }),
      cone: new THREE.MeshStandardMaterial({ color: "#f472b6", metalness: 0.2, roughness: 0.4 }),
    }),
    []
  );

  const geometries = useMemo(
    () => ({
      torus: new THREE.TorusGeometry(0.8, 0.25, 16, 64),
      box: new THREE.BoxGeometry(0.6, 0.6, 0.6),
      cone: new THREE.ConeGeometry(0.5, 1, 16),
    }),
    []
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.3;
    }
  });

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [geometries, materials]);

  return (
    <group ref={ref}>
      <mesh position={[0, 0.5, 0]} geometry={geometries.torus} material={materials.torus} />
      <mesh position={[1.6, -0.2, 0.5]} rotation={[0.6, 0.2, 0]} geometry={geometries.box} material={materials.box} />
      <mesh position={[-1.4, -0.3, -0.6]} rotation={[0.3, -0.5, 0]} geometry={geometries.cone} material={materials.cone} />
    </group>
  );
}

export default function ThreeScene({ className }: { className?: string }) {
  return (
    <div style={{ width: "100%", height: 420, maxWidth: 520 }} className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows dpr={[1, 2]} style={{ width: "100%", height: "100%" }}>
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
