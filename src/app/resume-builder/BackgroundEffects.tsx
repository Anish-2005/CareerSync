import React from 'react';
import { motion } from 'framer-motion';

const m = motion as any;

interface BackgroundEffectsProps {
  morphBg: string;
}

export default function BackgroundEffects({ morphBg }: BackgroundEffectsProps) {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <m.div
        className="absolute top-1/4 left-1/4"
        animate={{
          borderRadius: ["50% 20% 80% 30%", "30% 80% 20% 70%", "80% 30% 50% 20%", "50% 20% 80% 30%"],
          rotate: [0, 90, 180, 360],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ position: "absolute", top: "25%", left: "25%", width: 384, height: 384, opacity: 0.2, filter: "blur(40px)", background: morphBg }}
      />
      <m.div
        className="absolute bottom-1/4 right-1/4"
        animate={{
          borderRadius: ["20% 80% 30% 70%", "70% 30% 80% 20%", "30% 70% 20% 80%", "20% 80% 30% 70%"],
          rotate: [360, 270, 180, 0],
          scale: [0.8, 1.3, 1, 0.8],
        }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "25%", right: "25%", width: 320, height: 320, opacity: 0.15, filter: "blur(30px)", background: morphBg }}
      />
    </div>
  );
}
