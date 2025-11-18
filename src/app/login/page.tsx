// app/(auth)/login/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useThemeClasses } from "@/hooks/useThemeClasses"
import AuthHeader from "@/components/auth/AuthHeader"
import BackgroundEffects from "@/components/auth/BackgroundEffects"
import AuthCard from "@/components/auth/AuthCard"
import LoginForm from "@/components/auth/LoginForm"
import GoogleSignInButton from "@/components/auth/GoogleSignInButton"
import AuthToggle from "@/components/auth/AuthToggle"
import BackToHomeLink from "@/components/auth/BackToHomeLink"

const m = motion as any


export default function LoginPage() {
  const theme = useThemeClasses()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
        ...(theme.bgPrimaryStyle as React.CSSProperties),
      }}
    >
      {/* Background Effects */}
      <BackgroundEffects />

      {/* Card */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 10 }}
      >
        {/* Header */}
        <AuthHeader isSignUp={isSignUp} />

        {/* Modal Card */}
        <AuthCard>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isSignUp={isSignUp}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
          />

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
            <div style={{ height: 1, flex: 1, background: theme.borderMedium }} />
            <div style={{ fontSize: 13, color: theme.textTertiary }}>or</div>
            <div style={{ height: 1, flex: 1, background: theme.borderMedium }} />
          </div>

          {/* Google sign-in and other elements */}
          <div style={{ display: "grid", gap: 12 }}>
            <GoogleSignInButton onClick={handleGoogleSignIn} loading={loading} />
            <AuthToggle isSignUp={isSignUp} onToggle={() => setIsSignUp(!isSignUp)} />
            <BackToHomeLink />
          </div>
        </AuthCard>
      </m.div>
    </div>
  )
}
