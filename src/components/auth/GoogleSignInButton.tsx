"use client"

import React from "react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

interface GoogleSignInButtonProps {
  onClick: () => void
  loading: boolean
}

export default function GoogleSignInButton({ onClick, loading }: GoogleSignInButtonProps) {
  const theme = useThemeClasses()

  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
        padding: "0.75rem 1rem",
        borderRadius: 12,
        border: `1px solid ${theme.borderMedium}`,
        background: (theme.bgButtonSecondaryStyle as any)?.backgroundColor ?? "transparent",
        color: (theme.bgButtonSecondaryStyle as any)?.color ?? theme.textPrimary,
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: 700,
      }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        style={{ width: 18, height: 18, borderRadius: "50%" }}
      />
      Continue with Google
    </button>
  )
}