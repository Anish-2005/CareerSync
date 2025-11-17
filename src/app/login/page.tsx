// app/(auth)/login/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Chrome,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useThemeClasses } from "@/hooks/useThemeClasses"
import ThemeToggle from "@/components/ThemeToggle"

const m = motion as any

export default function LoginPage() {
  const theme = useThemeClasses()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { signIn, signUp, signInWithGoogle, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isSignUp) {
        await signUp(email, password)
      } else {
        await signIn(email, password)
      }
      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError("")
    try {
      await signInWithGoogle()
      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (user) return null

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
    ...((theme.bgInput as unknown) as React.CSSProperties),
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: (theme.bgInput as any)?.borderColor ?? theme.borderMedium,
  }

  const modalBorderStyle = {
    border: `1px solid ${theme.borderMedium}`,
    borderRadius: 24,
  }

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: '"Geist", sans-serif',
        color: theme.textPrimary,
        ...(theme.bgPrimary as React.CSSProperties),
      }}
    >
      {/* Background Effects (morphing shapes) */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <m.div
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            width: 384,
            height: 384,
            opacity: 0.2,
            filter: "blur(40px)",
            background: theme.morphShape1,
            borderRadius: "50%",
          }}
          animate={{
            borderRadius: [
              "50% 20% 80% 30%",
              "30% 80% 20% 70%",
              "80% 30% 50% 20%",
              "50% 20% 80% 30%",
            ],
            rotate: [0, 90, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <m.div
          style={{
            position: "absolute",
            bottom: "25%",
            right: "25%",
            width: 320,
            height: 320,
            opacity: 0.15,
            filter: "blur(30px)",
            background: theme.morphShape2,
            borderRadius: "40%",
          }}
          animate={{
            borderRadius: [
              "20% 80% 30% 70%",
              "70% 30% 80% 20%",
              "30% 70% 20% 80%",
              "20% 80% 30% 70%",
            ],
            rotate: [360, 270, 180, 0],
            scale: [0.8, 1.3, 1, 0.8],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Card */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 10 }}
      >
        {/* Header */}
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

          <h1 style={{ fontSize: 34, fontWeight: 900, marginBottom: 8, color: theme.textPrimary }}>
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p style={{ fontSize: 14, color: theme.textSecondary }}>
            {isSignUp ? "Join CareerSync to track your career journey" : "Sign in to access your dashboard"}
          </p>
        </div>

        {/* Modal Card */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            padding: 24,
            ...(theme.bgModal as React.CSSProperties),
            ...modalBorderStyle,
            boxShadow: (theme.bgCard as any)?.boxShadow ?? "0 20px 40px rgba(2,6,23,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <ThemeToggle />
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
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
                    background: (theme.bgInput as any)?.backgroundColor ?? (theme.bgInput as any)?.background,
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
                    background: (theme.bgInput as any)?.backgroundColor ?? (theme.bgInput as any)?.background,
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
                ...(theme.bgButton as React.CSSProperties),
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
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
            <div style={{ height: 1, flex: 1, background: theme.borderMedium }} />
            <div style={{ fontSize: 13, color: theme.textTertiary }}>or</div>
            <div style={{ height: 1, flex: 1, background: theme.borderMedium }} />
          </div>

          {/* Google sign-in */}
          <div style={{ display: "grid", gap: 12 }}>
            <button
              onClick={handleGoogleSignIn}
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
                background: (theme.bgButtonSecondary as any)?.backgroundColor ?? "transparent",
                color: (theme.bgButtonSecondary as any)?.color ?? theme.textPrimary,
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 700,
              }}
            >
              <Chrome style={{ width: 18, height: 18 }} />
              Continue with Google
            </button>

            {/* Toggle / Links */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
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

            <div style={{ textAlign: "center" }}>
              <a href="/" style={{ color: theme.textTertiary, fontSize: 13, textDecoration: "none" }}>
                ← Back to CareerSync
              </a>
            </div>
          </div>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
          `}</style>
        </m.div>
      </m.div>
    </div>
  )
}
