"use client"

import React from "react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

export default function BackToHomeLink() {
  const theme = useThemeClasses()

  return (
    <div style={{ textAlign: "center" }}>
      <a href="/" style={{ color: theme.textTertiary, fontSize: 13, textDecoration: "none" }}>
        ← Back to CareerSync
      </a>
    </div>
  )
}