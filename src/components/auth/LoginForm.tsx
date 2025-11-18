"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
} from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

interface LoginFormProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  isSignUp: boolean
  loading: boolean
  error: string
  onSubmit: (e: React.FormEvent) => void
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  isSignUp,
  loading,
  error,
  onSubmit
}: LoginFormProps) {
  const theme = useThemeClasses()
  const [showPassword, setShowPassword] = useState(false)

  // helper style builders
  const inputBaseStyle: React.CSSProperties = {
    width: "100%",
    paddingLeft: "2.5rem",
    paddingRight: "0.75rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
    borderRadius: 16,
    color: theme.textPrimary,
    fontSize: 14,
    outline: "none",
    ...((theme.bgInputStyle as unknown) as React.CSSProperties),
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: (theme.bgInput as any)?.borderColor ?? theme.borderMedium,
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
      {/* Email */}
      <div>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: theme.textSecondary }}>
          Email Address
        </label>
        <div style={{ position: "relative" }}>
          <Mail
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 18,
              height: 18,
              color: theme.textAccent,
            }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              ...inputBaseStyle,
              paddingLeft: 40,
              background: (theme.bgInputStyle as any)?.backgroundColor ?? (theme.bgInputStyle as any)?.background,
            }}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label style={{ display: "block", marginBottom: 8, fontWeight: 700, color: theme.textSecondary }}>
          Password
        </label>
        <div style={{ position: "relative" }}>
          <Lock
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 18,
              height: 18,
              color: theme.textAccent,
            }}
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              ...inputBaseStyle,
              paddingLeft: 40,
              paddingRight: 40,
              background: (theme.bgInputStyle as any)?.backgroundColor ?? (theme.bgInputStyle as any)?.background,
            }}
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: theme.textSecondary,
            }}
          >
            {showPassword ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <m.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: 12,
            borderRadius: 12,
            background: theme.theme === 'light' ? "rgba(239, 68, 68, 0.08)" : "rgba(255, 68, 68, 0.15)",
            border: `1px solid ${theme.statusRejected}20`,
            color: theme.statusRejected,
          }}
        >
          <AlertCircle style={{ width: 18, height: 18 }} />
          <div style={{ fontSize: 13 }}>{error}</div>
        </m.div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          padding: "0.85rem 1rem",
          borderRadius: 12,
          fontWeight: 800,
          fontSize: 15,
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.65 : 1,
          ...(theme.bgButtonStyle as React.CSSProperties),
          border: "none",
        }}
      >
        {loading ? (
          <>
            <div style={{ width: 18, height: 18, border: "2px solid white", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <span>{isSignUp ? "Creating Account..." : "Signing In..."}</span>
          </>
        ) : (
          <>
            <span>{isSignUp ? "Create Account" : "Sign In"}</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </>
        )}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  )
}