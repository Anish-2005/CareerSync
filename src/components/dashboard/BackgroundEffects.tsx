"use client"

import React from "react"
import { motion } from "framer-motion"

const m = motion as any

interface BackgroundEffectsProps {
  theme: any
}

export default function BackgroundEffects({ theme }: BackgroundEffectsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <m.div
        className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
        animate={{
          borderRadius: ["50% 20% 80% 30%", "30% 80% 20% 70%", "80% 30% 50% 20%", "50% 20% 80% 30%"],
          rotate: [0, 90, 180, 360],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          background: theme.theme === 'light'
            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))"
            : "linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(0, 212, 255, 0.3))",
          filter: "blur(40px)",
        }}
      />
      <m.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15"
        animate={{
          borderRadius: ["20% 80% 30% 70%", "70% 30% 80% 20%", "30% 70% 20% 80%", "20% 80% 30% 70%"],
          rotate: [360, 270, 180, 0],
          scale: [0.8, 1.3, 1, 0.8],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          background: theme.theme === 'light'
            ? "linear-gradient(225deg, rgba(34, 197, 94, 0.03), rgba(245, 158, 11, 0.03))"
            : "linear-gradient(225deg, rgba(0, 255, 136, 0.2), rgba(255, 107, 0, 0.2))",
          filter: "blur(30px)",
        }}
      />
    </div>
  )
}