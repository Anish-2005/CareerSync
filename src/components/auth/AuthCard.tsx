"use client"

import React from "react"
import { motion } from "framer-motion"
import { useThemeClasses } from "@/hooks/useThemeClasses"
import ThemeToggle from "@/components/ThemeToggle"

const m = motion as any

interface AuthCardProps {
  children: React.ReactNode
}

export default function AuthCard({ children }: AuthCardProps) {
  const theme = useThemeClasses()

  const modalBorderStyle = {
    border: `1px solid ${theme.borderMedium}`,
    borderRadius: 24,
  }

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      style={{
        padding: 24,
        ...(theme.bgModalStyle as React.CSSProperties),
        ...modalBorderStyle,
        boxShadow: (theme.bgCardStyle as any)?.boxShadow ?? "0 20px 40px rgba(2,6,23,0.6)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <ThemeToggle />
      </div>
      {children}
    </m.div>
  )
}