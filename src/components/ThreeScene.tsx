"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshReflectorMaterial } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function RotatingShapes() {
  const ref: any = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.5, 0]}>
        <torusBufferGeometry args={[0.8, 0.25, 32, 64]} />
        <meshStandardMaterial color="#6ee7b7" metalness={0.6} roughness={0.2} />
      </mesh>

      <mesh position={[1.6, -0.2, 0.5]} rotation={[0.6, 0.2, 0]}> 
        <boxBufferGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.4} roughness={0.3} />
      </mesh>

      <mesh position={[-1.4, -0.3, -0.6]} rotation={[0.3, -0.5, 0]}> 
        <coneBufferGeometry args={[0.5, 1, 16]} />
        <meshStandardMaterial color="#f472b6" metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function ThreeScene({ className }: { className?: string }) {
  return (
    <div style={{ width: 520, height: 380 }} className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <RotatingShapes />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
