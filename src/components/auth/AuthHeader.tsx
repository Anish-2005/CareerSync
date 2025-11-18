"use client"

import React from "react"
import { motion } from "framer-motion"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

interface AuthHeaderProps {
  isSignUp: boolean
}

export default function AuthHeader({ isSignUp }: AuthHeaderProps) {
  const theme = useThemeClasses()

  // Gradient style safe merge (fall back to a solid color if gradient object missing)
  const gradientObj = (theme.gradientText as any) || {}
  const gradientStyle: React.CSSProperties = {
    display: "inline-block",
    // prefer backgroundImage property from your theme object, else fallback to a visible color
    backgroundImage: gradientObj.background ?? gradientObj?.backgroundImage ?? undefined,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    // typography tuning
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    // fallback color so text is visible if gradient isn't applied
    color: theme.textPrimary,
  }

  return (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <m.div
        whileHover={{ scale: 1.05 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          verticalAlign: "middle",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {/* slightly smaller logo to balance the text */}
          <img
            src="/csync.png"
            alt="CareerSync"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>

        {/* Clean gradient text with fallbacks */}
        <span style={gradientStyle}>
          {/* Use a little larger spacing for the wordmark */}
          <span style={{ fontSize: 22, fontWeight: 900 }}>Career</span>
          <span style={{ marginLeft: 4, fontSize: 22, fontWeight: 900 }}>Sync</span>
        </span>
      </m.div>

      <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 8, color: theme.theme === 'light' ? '#1e40af' : theme.textPrimary }}>
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h1>
      <p style={{ fontSize: 14, color: theme.textSecondary }}>
        {isSignUp ? "Join CareerSync to track your career journey" : "Sign in to access your dashboard"}
      </p>
    </div>
  )
}