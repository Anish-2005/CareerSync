"use client"

import React from "react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

interface AuthToggleProps {
  isSignUp: boolean
  onToggle: () => void
}

export default function AuthToggle({ isSignUp, onToggle }: AuthToggleProps) {
  const theme = useThemeClasses()

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={onToggle}
        style={{
          background: "transparent",
          border: "none",
          color: theme.textAccent,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
      </button>
    </div>
  )
}