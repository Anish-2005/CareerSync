"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  ArrowRight,
  Chrome,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const m = motion as any

export default function LoginPage() {
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
    } catch (error: any) {
      setError(error.message || "An error occurred")
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
    } catch (error: any) {
      setError(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return null // Will redirect
  }

  return (
    <div
      className="min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428] flex items-center justify-center p-6"
      style={{ fontFamily: '"Geist", sans-serif' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing shapes */}
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
            background: "linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(0, 212, 255, 0.3))",
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
            background: "linear-gradient(225deg, rgba(0, 255, 136, 0.2), rgba(255, 107, 0, 0.2))",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Login Form */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <m.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="relative w-16 h-16 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b00]/50">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              CareerSync
            </span>
          </m.div>
          <h1 className="text-4xl font-black text-white mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-400">
            {isSignUp
              ? "Join CareerSync to track your career journey"
              : "Sign in to access your dashboard"
            }
          </p>
        </div>

        {/* Form */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 backdrop-blur-xl rounded-3xl border border-[#00d4ff]/20 p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00d4ff]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00d4ff]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </m.div>
            )}

            {/* Submit Button */}
            <m.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </m.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#00d4ff]/20" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-[#00d4ff]/20" />
          </div>

          {/* Google Sign In */}
          <m.button
            onClick={handleGoogleSignIn}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-white/10 border border-[#00d4ff]/20 text-white font-bold hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </m.button>

          {/* Toggle Sign Up/Sign In */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors text-sm"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"
              }
            </button>
          </div>

          {/* Back to Landing */}
          <div className="text-center mt-4">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Back to CareerSync
            </a>
          </div>
        </m.div>
      </m.div>
    </div>
  )
}