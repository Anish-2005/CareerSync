"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  BarChart3,
  Clock,
  Trophy,
  Play,
  Star,
  Menu,
  X,
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

// Cast motion to any to avoid strict prop typing issues in this file
const m = motion as any

// Predefined particle positions for consistent SSR/client rendering
const particlePositions = [
  { left: 12.75, top: 48.69 },
  { left: 67.23, top: 23.45 },
  { left: 34.89, top: 78.12 },
  { left: 89.34, top: 56.78 },
  { left: 45.67, top: 12.34 },
  { left: 78.90, top: 89.01 },
  { left: 23.45, top: 67.89 },
  { left: 56.78, top: 34.56 },
  { left: 91.23, top: 45.67 },
  { left: 12.34, top: 78.90 },
  { left: 67.89, top: 23.12 },
  { left: 34.56, top: 89.34 },
  { left: 89.01, top: 56.23 },
  { left: 45.12, top: 12.78 },
  { left: 78.45, top: 67.34 },
  { left: 23.78, top: 34.89 },
  { left: 56.34, top: 91.23 },
  { left: 91.78, top: 45.12 },
  { left: 12.89, top: 78.45 },
  { left: 67.34, top: 23.78 },
  { left: 34.12, top: 89.78 },
  { left: 89.56, top: 56.89 },
  { left: 45.78, top: 12.23 },
  { left: 78.12, top: 67.78 },
  { left: 23.34, top: 34.23 },
  { left: 56.89, top: 91.78 },
  { left: 91.34, top: 45.89 },
  { left: 12.56, top: 78.12 },
  { left: 67.78, top: 23.34 },
  { left: 34.89, top: 89.23 }
]

const particlePositions2 = [
  { left: 15.23, top: 25.67 },
  { left: 72.89, top: 48.12 },
  { left: 38.45, top: 82.34 },
  { left: 85.67, top: 61.78 },
  { left: 42.12, top: 18.90 },
  { left: 79.34, top: 85.23 },
  { left: 26.78, top: 63.45 },
  { left: 53.90, top: 31.67 },
  { left: 94.56, top: 42.89 },
  { left: 18.34, top: 75.12 },
  { left: 64.78, top: 29.34 },
  { left: 31.23, top: 86.78 },
  { left: 87.45, top: 53.90 },
  { left: 47.67, top: 15.23 },
  { left: 76.89, top: 64.56 },
  { left: 21.12, top: 37.89 },
  { left: 58.34, top: 94.12 },
  { left: 93.78, top: 47.45 },
  { left: 14.56, top: 79.67 },
  { left: 69.23, top: 26.89 },
  { left: 36.78, top: 87.34 },
  { left: 91.12, top: 58.67 },
  { left: 43.45, top: 14.78 },
  { left: 74.67, top: 69.23 },
  { left: 27.89, top: 32.45 },
  { left: 55.12, top: 93.67 },
  { left: 89.34, top: 44.12 },
  { left: 16.78, top: 76.89 },
  { left: 63.45, top: 21.34 },
  { left: 32.67, top: 88.56 },
  { left: 84.23, top: 57.89 },
  { left: 41.56, top: 13.12 },
  { left: 77.34, top: 66.78 },
  { left: 24.67, top: 35.23 },
  { left: 59.89, top: 92.45 },
  { left: 96.12, top: 46.78 },
  { left: 11.34, top: 73.56 },
  { left: 68.67, top: 28.12 },
  { left: 33.89, top: 84.34 },
  { left: 86.56, top: 52.67 }
]

// Client component for time display to avoid hydration issues
function TimeDisplay() {
  const [time, setTime] = useState("10:58 PM")

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-gray-400 text-sm font-mono">
      {time}
    </div>
  )
}

// Main Landing Page
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("applications")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { user, logout } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY)
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const scaleVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div
      className="overflow-hidden bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428]"
      style={{ fontFamily: '"Geist", sans-serif' }}
    >
      {/* Navigation */}
      <m.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1428]/80 border-b border-[#00d4ff]/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <m.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <img src="/csync.png" alt="CareerSync" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              CareerSync
            </span>
          </m.div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing", "Contact"].map((item) => (
              <m.a
                key={item}
                href="#"
                whileHover={{ color: "#00d4ff" }}
                className="text-gray-300 hover:text-[#00d4ff] transition-colors duration-300 text-sm font-medium"
              >
                {item}
              </m.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden p-2 rounded-md text-gray-300 hover:bg-[#00d4ff]/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {user ? (
              <>
                <m.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                >
                  Dashboard
                </m.a>
                <m.button
                  onClick={logout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
                >
                  Logout
                </m.button>
              </>
            ) : (
              <>
                <m.a
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                >
                  Login
                </m.a>
                <m.a
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
                >
                  Sign Up
                </m.a>
              </>
            )}
          </div>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-[#081226]/95 border-t border-[#00d4ff]/10 backdrop-blur-sm z-40">
              <div className="px-6 py-4 flex flex-col gap-4">
                {["Features", "How It Works", "Pricing", "Contact"].map((item) => (
                  <a key={item} href="#" className="text-gray-300 py-2 rounded hover:bg-[#00d4ff]/5 px-2">
                    {item}
                  </a>
                ))}
                <div className="flex flex-col gap-2 pt-2">
                  {user ? (
                    <>
                      <a href="/dashboard" className="px-4 py-2 text-white bg-[#00d4ff]/10 rounded">Dashboard</a>
                      <button onClick={logout} className="px-4 py-2 text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] rounded">Logout</button>
                    </>
                  ) : (
                    <>
                      <a href="/login" className="px-4 py-2 text-white border border-[#00d4ff]/20 rounded">Login</a>
                      <a href="/login" className="px-4 py-2 text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] rounded">Sign Up</a>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </m.nav>      {/* Hero Section */}
      <section className="mt-20 relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden py-12 md:py-0">
        {/* Innovative morphing background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Morphing geometric shapes */}
          <m.div
            className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
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
            className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15"
            animate={{
              borderRadius: ["20% 80% 30% 70%", "70% 30% 80% 20%", "30% 70% 20% 80%", "20% 80% 30% 70%"],
              rotate: [360, 270, 180, 0],
              scale: [0.8, 1.3, 1, 0.8],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 5,
            }}
            style={{
              background: "linear-gradient(225deg, rgba(0, 255, 136, 0.2), rgba(255, 107, 0, 0.2))",
              filter: "blur(30px)",
            }}
          />

          {/* Advanced particle system */}
          <div className="hidden md:block">
          {[...Array(30)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              animate={{
                x: [0, 50, -25, 0],
                y: [0, -30, 15, 0],
                scale: [0, 1, 0.5, 1, 0],
                opacity: [0, 0.8, 0.4, 0.8, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
              style={{
                background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#ff6b00" : "#00ff88",
                left: `${particlePositions[i]?.left || 50}%`,
                top: `${particlePositions[i]?.top || 50}%`,
                filter: "blur(1px)",
              }}
            />
          ))}
          </div>

          {/* Liquid-like flowing elements */}
          <m.div
            className="absolute top-0 left-0 w-full h-32 opacity-30"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent)",
              filter: "blur(20px)",
            }}
          />
          <m.div
            className="absolute bottom-0 right-0 w-full h-32 opacity-20"
            animate={{
              backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 3,
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255, 107, 0, 0.3), transparent)",
              filter: "blur(25px)",
            }}
          />
        </div>

        {/* Content */}
        <m.div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Innovative badge with morphing effect */}
          <m.div
            variants={itemVariants}
            className="relative inline-flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-4 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 backdrop-blur-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            {/* Morphing background */}
            <m.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 0.8, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
              }}
            />
            <m.div
              className="w-3 h-3 rounded-full bg-[#00d4ff]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="text-[#00d4ff] font-semibold relative z-10">Next-Generation Career Intelligence</span>
            <m.div
              className="w-2 h-2 rounded-full bg-[#ff6b00]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </m.div>

          {/* Fluid morphing headline */}
          <m.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-6 sm:mb-8 leading-none tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 25%, #ff6b00 50%, #00ff88 75%, #ffffff 100%)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(0, 212, 255, 0.3))",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              textShadow: [
                "0 0 20px rgba(0, 212, 255, 0.5)",
                "0 0 40px rgba(255, 107, 0, 0.5)",
                "0 0 20px rgba(0, 255, 136, 0.5)",
                "0 0 20px rgba(0, 212, 255, 0.5)",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            CareerSync
          </m.h1>

          {/* Dynamic subheading with typing effect */}
          <m.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-2xl text-gray-300 max-w-xl md:max-w-4xl mx-auto mb-8 md:mb-16 leading-relaxed font-light"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <span className="inline-block">
              Sync your career trajectory with
              <m.span
                className="text-[#00d4ff] font-semibold mx-2"
                animate={{
                  color: ["#00d4ff", "#ff6b00", "#00ff88", "#00d4ff"],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                intelligent networking
              </m.span>
              and quantum-powered insights.
            </span>
          </m.p>

          {/* Innovative CTA buttons with morphing effects */}
          <m.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <m.button
              onClick={() => user ? window.location.href = '/dashboard' : window.location.href = '/login'}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 107, 0, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-3 sm:px-12 sm:py-6 text-white font-bold text-lg sm:text-xl rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%)",
                boxShadow: "0 0 20px rgba(255, 107, 0, 0.4)",
              }}
            >
              <m.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  opacity: [0, 0.3, 0.1, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(45deg, rgba(0, 212, 255, 0.3), rgba(255, 107, 0, 0.3))",
                }}
              />
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(5)].map((_, i) => (
                  <m.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.sin(i) * 15, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${60}%`,
                    }}
                  />
                ))}
              </div>
              <span className="relative z-10">Start Your Journey</span>
            </m.button>
            <m.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(0, 212, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-3 sm:px-12 sm:py-6 text-white font-bold text-lg sm:text-xl rounded-2xl border-2 border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300 overflow-hidden"
            >
              {/* Liquid border effect */}
              <m.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                animate={{
                  borderImage: [
                    "linear-gradient(45deg, #00d4ff, #ff6b00) 1",
                    "linear-gradient(135deg, #ff6b00, #00ff88) 1",
                    "linear-gradient(225deg, #00ff88, #00d4ff) 1",
                    "linear-gradient(45deg, #00d4ff, #ff6b00) 1",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  borderImageSlice: 1,
                }}
              />
              <span className="relative z-10">Explore Features</span>
            </m.button>
          </m.div>

          {/* Interactive floating stat with morphing effects */}
          <m.div
            variants={itemVariants}
            className="mt-12 md:mt-24 flex justify-center"
          >
            <m.div
              className="group relative flex items-center gap-6 px-4 py-4 sm:px-10 sm:py-6 rounded-3xl bg-gradient-to-r from-[#1a3a52]/80 to-[#0f2540]/80 backdrop-blur-xl border border-[#00d4ff]/30 overflow-hidden cursor-pointer"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 20,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Morphing background */}
              <m.div
                className="absolute inset-0 rounded-3xl opacity-30"
                animate={{
                  scale: [1, 1.05, 0.95, 1],
                  opacity: [0.3, 0.4, 0.2, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(45deg, rgba(0, 212, 255, 0.2), rgba(255, 107, 0, 0.2))",
                }}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
                  <m.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full opacity-70"
                    animate={{
                      y: [0, -25, 0],
                      x: [0, Math.cos(i) * 20, 0],
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${15 + i * 10}%`,
                      top: `${40}%`,
                      backgroundColor: i % 2 === 0 ? "#00d4ff" : "#ff6b00",
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <m.div
                  className="w-4 h-4 rounded-full bg-[#00d4ff] shadow-lg shadow-[#00d4ff]/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 10px rgba(0, 212, 255, 0.5)",
                      "0 0 20px rgba(0, 212, 255, 0.8)",
                      "0 0 10px rgba(0, 212, 255, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-white font-bold text-lg">15,000+ Professionals Connected</span>
                <m.div
                  className="w-3 h-3 rounded-full bg-[#ff6b00] shadow-lg shadow-[#ff6b00]/50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </m.div>
          </m.div>
        </m.div>

        {/* Minimal scroll indicator */}
        <m.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-[#00d4ff]/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#00d4ff] rounded-full mt-2 animate-pulse"></div>
          </div>
        </m.div>
      </section>

      {/* Features Section with Fluid Layout */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#0a1428] to-[#1a2d4d] overflow-hidden">
        {/* Dynamic fluid background */}
        <div className="absolute inset-0">
          {/* Organic flowing shapes */}
          {[...Array(20)].map((_, i) => (
            <m.div
              key={i}
              className="absolute opacity-10"
              animate={{
                x: [0, Math.sin(i) * 100, 0],
                y: [0, Math.cos(i) * 80, 0],
                scale: [1, 1.5, 0.8, 1],
                borderRadius: ["50% 30% 70% 20%", "30% 70% 20% 50%", "70% 20% 50% 30%", "50% 30% 70% 20%"],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                width: `${40 + i * 10}px`,
                height: `${40 + i * 10}px`,
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
                background: i % 3 === 0
                  ? "linear-gradient(45deg, rgba(0, 212, 255, 0.3), rgba(255, 107, 0, 0.3))"
                  : i % 3 === 1
                  ? "linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(0, 255, 136, 0.3))"
                  : "linear-gradient(225deg, rgba(0, 255, 136, 0.3), rgba(0, 212, 255, 0.3))",
                filter: "blur(20px)",
              }}
            />
          ))}

          {/* Fluid wave patterns */}
          <m.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 107, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
              `,
              backgroundSize: "200% 200%",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            {/* Fluid section title */}
            <m.h2
              className="text-6xl md:text-8xl font-black mb-6 leading-none"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                textShadow: [
                  "0 0 30px rgba(0, 212, 255, 0.5)",
                  "0 0 50px rgba(255, 107, 0, 0.5)",
                  "0 0 30px rgba(0, 255, 136, 0.5)",
                  "0 0 30px rgba(0, 212, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%, #00ff88 90%, #ffffff 100%)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sync Features
            </m.h2>
            <m.p
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Experience the future of career management with
              <m.span
                className="text-[#00d4ff] font-semibold mx-2"
                animate={{
                  color: ["#00d4ff", "#ff6b00", "#00ff88", "#00d4ff"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                intelligent synchronization
              </m.span>
              and quantum insights.
            </m.p>
          </m.div>

          {/* Fluid dynamic grid */}
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Target,
                title: "Smart Targeting",
                description: "AI-powered opportunity matching with predictive career trajectory analysis and intelligent connection recommendations.",
                color: "from-[#00d4ff] to-[#0088cc]",
                shadowColor: "rgba(0, 212, 255, 0.4)",
                gradient: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
                size: "large",
              },
              {
                icon: BarChart3,
                title: "Sync Analytics",
                description: "Real-time career performance metrics with advanced data visualization and trend analysis for optimal decision making.",
                color: "from-[#ff6b00] to-[#ff8c00]",
                shadowColor: "rgba(255, 107, 0, 0.4)",
                gradient: "linear-gradient(225deg, rgba(255, 107, 0, 0.1), rgba(0, 255, 136, 0.1))",
                size: "medium",
              },
              {
                icon: Clock,
                title: "Time Sync",
                description: "Intelligent scheduling with automated deadline tracking, priority management, and productivity optimization.",
                color: "from-[#00d4ff] to-[#ff6b00]",
                shadowColor: "rgba(0, 212, 255, 0.4)",
                gradient: "linear-gradient(315deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
                size: "large",
              },
              {
                icon: Users,
                title: "Network Sync",
                description: "Seamless professional networking with automated introductions, relationship management, and opportunity alerts.",
                color: "from-[#00ff88] to-[#00d4ff]",
                shadowColor: "rgba(0, 255, 136, 0.4)",
                gradient: "linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1))",
                size: "medium",
              },
              {
                icon: Shield,
                title: "Secure Sync",
                description: "Enterprise-grade data protection with end-to-end encryption, privacy controls, and secure career data management.",
                color: "from-[#ff8c00] to-[#00ff88]",
                shadowColor: "rgba(255, 140, 0, 0.4)",
                gradient: "linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(0, 255, 136, 0.1))",
                size: "large",
              },
              {
                icon: Zap,
                title: "AI Sync",
                description: "Next-generation AI assistance with personalized career coaching, opportunity prediction, and intelligent recommendations.",
                color: "from-[#00d4ff] to-[#00ff88]",
                shadowColor: "rgba(0, 212, 255, 0.4)",
                gradient: "linear-gradient(225deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1))",
                size: "medium",
              },
            ].map((feature, index) => (
              <m.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: feature.size === 'large' ? 1.08 : 1.05,
                  rotateY: feature.size === 'large' ? 8 : 5,
                  rotateX: -5,
                  z: 60,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl transition-all duration-700 cursor-pointer ${
                  feature.size === 'large'
                    ? 'md:col-span-2 lg:col-span-1 p-10'
                    : 'p-8'
                }`}
                style={{
                  background: "linear-gradient(135deg, rgba(26, 58, 82, 0.8), rgba(15, 37, 64, 0.8))",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  gridRow: feature.size === 'large' && index % 3 === 1 ? 'span 2' : 'span 1',
                }}
              >
                {/* Morphing background gradient */}
                <m.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    scale: [1, 1.02, 0.98, 1],
                    opacity: [0, 0.1, 0.05, 0.1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: feature.gradient,
                  }}
                />

                {/* Fluid particle system */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(feature.size === 'large' ? 12 : 8)].map((_, i) => (
                    <m.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-70"
                      animate={{
                        y: [0, -40, 0],
                        x: [0, Math.sin(i * 1.2) * (feature.size === 'large' ? 30 : 20), 0],
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 4 + i * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                      style={{
                        left: `${15 + i * (feature.size === 'large' ? 7 : 10)}%`,
                        top: `${25 + i * 8}%`,
                        background: `linear-gradient(45deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
                      }}
                    />
                  ))}
                </div>

                {/* Fluid icon container */}
                <m.div
                  className={`relative rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ${
                    feature.size === 'large' ? 'w-20 h-20' : 'w-16 h-16'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${feature.color})`,
                    boxShadow: `0 0 30px ${feature.shadowColor}`,
                    transform: "translateZ(25px)",
                  }}
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    scale: feature.size === 'large' ? 1.15 : 1.12,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  {/* Icon glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-50 blur-md"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color})`,
                    }}
                  />
                  <feature.icon
                    className={`relative z-10 text-white ${
                      feature.size === 'large' ? 'w-10 h-10' : 'w-8 h-8'
                    }`}
                  />
                </m.div>

                {/* Fluid content */}
                <div style={{ transform: "translateZ(15px)" }}>
                  <m.h3
                    className={`font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500 ${
                      feature.size === 'large' ? 'text-2xl' : 'text-xl'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, #${feature.color.split('from-[')[1].split(']')[0]}, #${feature.color.split('to-[')[1].split(']')[0]})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {feature.title}
                  </m.h3>
                  <p className={`text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 ${
                    feature.size === 'large' ? 'text-base' : 'text-sm'
                  }`}>
                    {feature.description}
                  </p>
                </div>

                {/* Interactive hover indicator */}
                <m.div
                  className="absolute bottom-6 right-6 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color})`,
                    boxShadow: `0 0 15px ${feature.shadowColor}`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#1a2d4d] to-[#0a1428] overflow-hidden">
        {/* HUD-style background */}
        <div className="absolute inset-0">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Animated scan lines */}
          <m.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.03) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <m.h2
              className="text-6xl md:text-7xl font-black mb-6 text-white leading-none"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 212, 255, 0.6)",
                  "0 0 40px rgba(255, 107, 0, 0.6)",
                  "0 0 20px rgba(0, 255, 136, 0.6)",
                  "0 0 20px rgba(0, 212, 255, 0.6)",
                ],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 40%, #ff6b00 70%, #00ff88 100%)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CareerSync Hub
            </m.h2>
            <m.p
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Master your career trajectory with
              <m.span
                className="text-[#00d4ff] font-semibold mx-2"
                animate={{
                  color: ["#00d4ff", "#ff6b00", "#00ff88", "#00d4ff"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                intelligent synchronization
              </m.span>
              and real-time insights.
            </m.p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border-2 border-[#00d4ff]/50 shadow-2xl shadow-[#00d4ff]/30 backdrop-blur-xl group"
            style={{
              background: "linear-gradient(135deg, rgba(10, 20, 40, 0.95), rgba(26, 61, 83, 0.95))",
            }}
            whileHover={{
              boxShadow: "0 0 60px rgba(0, 212, 255, 0.4)",
            }}
          >
            {/* Advanced HUD corners with animation */}
            <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-[#00d4ff]/70"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-[#00d4ff]/70"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-[#00d4ff]/70"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-[#00d4ff]/70"></div>

            {/* Animated border effect */}
            <m.div
              className="absolute inset-0 rounded-3xl border border-transparent"
              animate={{
                borderImage: [
                  "linear-gradient(45deg, rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5)) 1",
                  "linear-gradient(135deg, rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5)) 1",
                  "linear-gradient(225deg, rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5)) 1",
                  "linear-gradient(315deg, rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5)) 1",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                borderImageSlice: 1,
              }}
            />

            {/* Interactive background particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(25)].map((_, i) => (
                <m.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full opacity-40"
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i * 0.8) * 25, 0],
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 5 + i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${10 + i * 3.6}%`,
                    top: `${20 + i * 3}%`,
                    background: i % 4 === 0 ? "#00d4ff" : i % 4 === 1 ? "#ff6b00" : i % 4 === 2 ? "#00ff88" : "#ff8c00",
                  }}
                />
              ))}
            </div>

            <div className="p-8 space-y-8">
              {/* Status bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse"></div>
                  <span className="text-[#00d4ff] font-bold text-sm">SYSTEM ONLINE</span>
                </div>
                <div className="text-gray-400 text-sm font-mono">
                  <TimeDisplay />
                </div>
              </div>

              {/* Enhanced tab buttons with fluid interactions */}
              <div className="flex gap-8 border-b border-[#00d4ff]/40 pb-6 mb-8">
                {["connections", "interactions", "insights"].map((tab, index) => (
                  <m.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-3 text-sm font-bold transition-all duration-500 rounded-xl overflow-hidden ${
                      activeTab === tab
                        ? "text-[#00d4ff] bg-[#00d4ff]/15 border border-[#00d4ff]/60 shadow-lg shadow-[#00d4ff]/20"
                        : "text-gray-400 hover:text-white hover:bg-[#00d4ff]/8 border border-transparent hover:border-[#00d4ff]/30"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    {/* Tab background effect */}
                    <m.div
                      className="absolute inset-0 opacity-0"
                      animate={{
                        opacity: activeTab === tab ? 1 : 0,
                        scale: activeTab === tab ? [1, 1.05, 1] : 1,
                      }}
                      style={{
                        background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
                      }}
                    />

                    {/* Floating particles for active tab */}
                    {activeTab === tab && (
                      <div className="absolute inset-0 overflow-hidden rounded-xl">
                        {[...Array(6)].map((_, i) => (
                          <m.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#00d4ff] rounded-full opacity-60"
                            animate={{
                              y: [0, -15, 0],
                              x: [0, Math.sin(i) * 10, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                            style={{
                              left: `${20 + i * 12}%`,
                              top: `${70}%`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <span className="relative z-10 capitalize tracking-wide">
                      {tab}
                    </span>

                    {/* Active tab indicator */}
                    {activeTab === tab && (
                      <m.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] via-[#ff6b00] to-[#00ff88]"
                        layoutId="activeTabIndicator"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </m.button>
                ))}
              </div>

              {/* Tab content with enhanced animations */}
              <AnimatePresence mode="wait">
                <m.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {activeTab === "connections" && (
                    <div className="space-y-6">
                      {/* Progress overview */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { label: "Active", value: "47", color: "#00d4ff" },
                          { label: "Processing", value: "23", color: "#ff6b00" },
                          { label: "Connected", value: "156", color: "#00ff88" },
                        ].map((stat, idx) => (
                          <m.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-4 rounded-xl bg-[#1a3a52]/50 border border-[#00d4ff]/20"
                          >
                            <div
                              className="text-2xl font-black mb-1"
                              style={{ color: stat.color }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-400">{stat.label}</div>
                          </m.div>
                        ))}
                      </div>

                      {[
                        { company: "Google", status: "Interview", progress: 75, priority: "high" },
                        { company: "Microsoft", status: "Applied", progress: 33, priority: "medium" },
                        { company: "Apple", status: "Offer", progress: 100, priority: "high" },
                      ].map((app, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          className="group relative flex items-center justify-between p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 overflow-hidden"
                        >
                          {/* Priority indicator */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 ${
                              app.priority === 'high' ? 'bg-[#ff6b00]' :
                              app.priority === 'medium' ? 'bg-[#00d4ff]' : 'bg-gray-500'
                            }`}
                          />

                          {/* Animated background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {app.company.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                                {app.company}
                              </p>
                              <p className="text-xs text-gray-400">{app.status}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-20 h-2 bg-[#0f2540] rounded-full overflow-hidden">
                              <m.div
                                initial={{ width: 0 }}
                                animate={{ width: `${app.progress}%` }}
                                transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] rounded-full"
                              />
                            </div>
                            <span className="text-sm text-gray-400 font-mono">
                              {app.progress}%
                            </span>
                          </div>
                        </m.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "interviews" && (
                    <div className="space-y-6">
                      {/* Interview calendar view */}
                      <div className="grid grid-cols-7 gap-2 mb-6">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                          <div key={idx} className="text-center text-xs text-gray-400 py-2">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: 31 }, (_, i) => (
                          <m.div
                            key={i}
                            className={`aspect-square rounded-lg border border-[#00d4ff]/20 flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-300 ${
                              i === 14 ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-[#00d4ff]' :
                              i === 17 ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-[#ff6b00]' :
                              'text-gray-400 hover:bg-[#00d4ff]/10'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {i + 1}
                          </m.div>
                        )).slice(0, 28)}
                      </div>

                      {[
                        { company: "Google", date: "Dec 15, 2:00 PM", type: "Technical", status: "confirmed" },
                        { company: "Microsoft", date: "Dec 18, 4:30 PM", type: "HR Round", status: "pending" },
                      ].map((interview, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          className="group relative p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {interview.company.charAt(0)}
                                </span>
                              </div>
                              <p className="font-bold text-white">{interview.company}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              interview.status === 'confirmed'
                                ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50'
                                : 'bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/50'
                            }`}>
                              {interview.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-400">{interview.date}</p>
                              <p className="text-xs text-[#00d4ff] font-medium">{interview.type}</p>
                            </div>
                            <m.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 rounded-lg text-[#00d4ff] text-sm font-bold hover:bg-[#00d4ff]/30 transition-all duration-300"
                            >
                              Join Call
                            </m.button>
                          </div>
                        </m.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "stats" && (
                    <div className="space-y-6">
                      {/* Animated stats rings */}
                      <div className="grid grid-cols-3 gap-6">
                        {[
                          { label: "Success Rate", value: 92, max: 100, color: "#00d4ff", icon: "�" },
                          { label: "Connections Made", value: 203, max: 250, color: "#ff6b00", icon: "⚡" },
                          { label: "Interactions", value: 47, max: 60, color: "#00ff88", icon: "�" },
                        ].map((stat, idx) => (
                          <m.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative flex flex-col items-center p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20"
                          >
                            {/* Circular progress */}
                            <div className="relative w-20 h-20 mb-4">
                              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="rgba(0, 212, 255, 0.2)"
                                  strokeWidth="2"
                                />
                                <m.path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={stat.color}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: stat.value / stat.max }}
                                  transition={{ duration: 2, delay: idx * 0.3, ease: "easeOut" }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">{stat.icon}</span>
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                              <p
                                className="text-2xl font-black"
                                style={{ color: stat.color }}
                              >
                                {stat.value}{stat.max === 100 ? '%' : ''}
                              </p>
                            </div>
                          </m.div>
                        ))}
                      </div>

                      {/* Performance graph */}
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20"
                      >
                        <h3 className="text-lg font-bold text-white mb-4">Performance Trend</h3>
                        <div className="flex items-end gap-2 h-24">
                          {[65, 72, 68, 85, 78, 92, 88].map((value, idx) => (
                            <m.div
                              key={idx}
                              initial={{ height: 0 }}
                              animate={{ height: `${value}%` }}
                              transition={{
                                duration: 1,
                                delay: idx * 0.1,
                                ease: "easeOut"
                              }}
                              className="flex-1 bg-gradient-to-t from-[#ff6b00] to-[#00d4ff] rounded-t-sm relative group"
                            >
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {value}%
                              </div>
                            </m.div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </m.div>
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      </section>

      {/* Statistics Section with Dynamic Animations */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Morphing background with fluid dynamics */}
        <div className="absolute inset-0">
          {/* Primary morphing shapes */}
          {[...Array(15)].map((_, i) => (
            <m.div
              key={i}
              className="absolute opacity-20"
              animate={{
                x: [0, Math.sin(i * 0.7) * 200, 0],
                y: [0, Math.cos(i * 0.9) * 150, 0],
                scale: [1, 1.8, 0.6, 1],
                borderRadius: ["50% 30% 70% 20%", "30% 70% 20% 50%", "70% 20% 50% 30%", "50% 30% 70% 20%"],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
              style={{
                width: `${60 + i * 15}px`,
                height: `${60 + i * 15}px`,
                left: `${(i * 6.5) % 90}%`,
                top: `${(i * 8.3) % 80}%`,
                background: i % 4 === 0
                  ? "linear-gradient(45deg, rgba(0, 212, 255, 0.4), rgba(255, 107, 0, 0.4))"
                  : i % 4 === 1
                  ? "linear-gradient(135deg, rgba(255, 107, 0, 0.4), rgba(0, 255, 136, 0.4))"
                  : i % 4 === 2
                  ? "linear-gradient(225deg, rgba(0, 255, 136, 0.4), rgba(0, 212, 255, 0.4))"
                  : "linear-gradient(315deg, rgba(255, 140, 0, 0.4), rgba(0, 212, 255, 0.4))",
                filter: "blur(25px)",
              }}
            />
          ))}

          {/* Flowing wave patterns */}
          <m.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.3) 0%, transparent 40%),
                radial-gradient(circle at 75% 75%, rgba(255, 107, 0, 0.3) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.3) 0%, transparent 40%)
              `,
              backgroundSize: "300% 300%",
            }}
          />

          {/* Dynamic particle field */}
          {[...Array(40)].map((_, i) => (
            <m.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              animate={{
                x: [0, 30, -15, 0],
                y: [0, -25, 10, 0],
                scale: [0, 1.5, 0.5, 1, 0],
                opacity: [0, 0.7, 0.3, 0.7, 0],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              style={{
                background: i % 5 === 0 ? "#00d4ff" : i % 5 === 1 ? "#ff6b00" : i % 5 === 2 ? "#00ff88" : i % 5 === 3 ? "#ff8c00" : "#8b5cf6",
                left: `${particlePositions2[i]?.left || 50}%`,
                top: `${particlePositions2[i]?.top || 50}%`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <m.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "25K+", label: "Active Users", icon: "👥", color: "#00d4ff" },
              { number: "1.2M", label: "Connections Made", icon: "⚡", color: "#ff6b00" },
              { number: "94%", label: "Success Rate", icon: "�", color: "#00ff88" },
              { number: "24/7", label: "Neural Support", icon: "🧠", color: "#ff6b00" },
            ].map((stat, idx) => (
              <m.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 20,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 text-center transition-all duration-500 backdrop-blur-xl overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(5)].map((_, i) => (
                    <m.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-60"
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.sin(i * 2) * 20, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${40 + i * 10}%`,
                        backgroundColor: stat.color,
                      }}
                    />
                  ))}
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, transparent)`,
                  }}
                />

                {/* Icon with animation */}
                <m.div
                  className="text-4xl mb-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: idx,
                  }}
                >
                  {stat.icon}
                </m.div>

                {/* Animated counter */}
                <m.div
                  className="text-5xl md:text-6xl font-black mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: `0 0 20px ${stat.color}40`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    textShadow: `0 0 30px ${stat.color}60`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </m.div>

                <p className="text-gray-400 font-semibold text-lg group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Progress bar for percentage stats */}
                {stat.number.includes('%') && (
                  <m.div
                    className="mt-4 w-full h-1 bg-[#0f2540] rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.3 }}
                    viewport={{ once: true }}
                  >
                    <m.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${parseInt(stat.number)}%` }}
                      transition={{
                        duration: 2,
                        delay: idx * 0.4,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    />
                  </m.div>
                )}
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Dynamic background effects */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          {[...Array(12)].map((_, i) => (
            <m.div
              key={i}
              className={`absolute rounded-lg opacity-10 ${
                i % 3 === 0 ? 'w-16 h-16 bg-[#00d4ff]' :
                i % 3 === 1 ? 'w-12 h-12 bg-[#ff6b00] rounded-full' :
                'w-20 h-8 bg-[#00ff88]'
              }`}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.cos(i) * 30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.5,
              }}
              style={{
                left: `${(i * 8) % 90}%`,
                top: `${(i * 12) % 80}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <m.h2
              className="text-5xl md:text-6xl font-black mb-4 text-white"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 212, 255, 0.5)",
                  "0 0 30px rgba(255, 107, 0, 0.5)",
                  "0 0 20px rgba(0, 212, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Dimensional Pricing
            </m.h2>
            <p className="text-gray-400 text-xl">Choose your dimension in the career multiverse</p>
          </m.div>

          <m.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Nexus Core",
                price: "Free",
                description: "Essential connections for career navigation",
                features: ["Track up to 50 opportunities", "Basic neural insights", "Mobile synchronization"],
                highlighted: false,
                color: "#00d4ff",
                icon: "🔗",
              },
              {
                name: "Quantum Pro",
                price: "$29",
                period: "/month",
                description: "Advanced intelligence for career mastery",
                features: ["Unlimited opportunity tracking", "Quantum analytics", "Neural networking", "AI-powered insights"],
                highlighted: true,
                color: "#ff6b00",
                icon: "⚡",
              },
              {
                name: "Omni Enterprise",
                price: "$79",
                period: "/month",
                description: "Complete career multiverse access",
                features: ["Everything in Quantum Pro", "Priority neural processing", "Custom integrations", "Team collaboration matrix"],
                highlighted: false,
                color: "#00ff88",
                icon: "🌌",
              },
            ].map((plan, idx) => (
              <m.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  scale: plan.highlighted ? 1.08 : 1.05,
                  rotateY: plan.highlighted ? 10 : 5,
                  rotateX: -5,
                  z: 50,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`group relative p-8 rounded-3xl transition-all duration-500 backdrop-blur-xl overflow-hidden cursor-pointer ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 border-2 border-[#ff6b00] shadow-2xl shadow-[#ff6b00]/30"
                    : "bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Animated background glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${plan.color}40, transparent)`,
                  }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(8)].map((_, i) => (
                    <m.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-70"
                      animate={{
                        y: [0, -40, 0],
                        x: [0, Math.sin(i * 1.5) * 25, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                      style={{
                        left: `${15 + i * 10}%`,
                        top: `${20 + i * 8}%`,
                        backgroundColor: plan.color,
                      }}
                    />
                  ))}
                </div>

                {/* Popular badge */}
                {plan.highlighted && (
                  <m.div
                    className="absolute -top-4 left-1/2 transform translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] shadow-lg"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-white text-sm font-black tracking-wider">MOST POPULAR</span>
                  </m.div>
                )}

                {/* Icon with 3D effect */}
                <m.div
                  className="text-5xl mb-4 text-center"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: idx * 0.5,
                  }}
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  {plan.icon}
                </m.div>

                {/* Plan name */}
                <m.h3
                  className="text-3xl font-black text-white mb-2 text-center"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  {plan.name}
                </m.h3>

                {/* Description */}
                <p
                  className="text-gray-400 text-center mb-6"
                  style={{
                    transform: "translateZ(10px)",
                  }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div
                  className="text-center mb-8"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  <m.p
                    className="text-6xl font-black mb-1"
                    style={{
                      color: plan.color,
                      textShadow: `0 0 20px ${plan.color}60`,
                    }}
                    animate={{
                      textShadow: [
                        `0 0 20px ${plan.color}60`,
                        `0 0 30px ${plan.color}80`,
                        `0 0 20px ${plan.color}60`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {plan.price}
                    <span className="text-2xl text-gray-400 font-normal">{plan.period}</span>
                  </m.p>
                </div>

                {/* Features */}
                <ul
                  className="space-y-4 mb-8"
                  style={{
                    transform: "translateZ(10px)",
                  }}
                >
                  {plan.features.map((feature, fIdx) => (
                    <m.li
                      key={fIdx}
                      className="flex items-center gap-3 text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fIdx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <m.div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${plan.color}30` }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <CheckCircle2
                          className="w-3 h-3"
                          style={{ color: plan.color }}
                        />
                      </m.div>
                      {feature}
                    </m.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <m.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 30px ${plan.color}60`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 relative overflow-hidden ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] text-white shadow-lg shadow-[#ff6b00]/50"
                      : "bg-[#1a3a52]/50 border border-[#00d4ff]/30 text-white hover:border-[#00d4ff]/50"
                  }`}
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  <span className="relative z-10">Get Started</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${plan.color}40, transparent)`,
                    }}
                  />
                </m.button>

                {/* Hover indicator */}
                <m.div
                  className="absolute bottom-4 right-4 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: plan.color }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Footer */}
      <m.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-16 px-6 border-t border-[#00d4ff]/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/csync.png" alt="CareerSync" className="w-8 h-8 object-contain" />
                <span className="font-bold text-white">CareerSync</span>
              </div>
              <p className="text-gray-400 text-sm">Connect deeply with infinite career possibilities</p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Compliance"],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#00d4ff]/20 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2024 CareerSync. All rights reserved.</p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <m.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#00d4ff" }}
                  className="text-gray-400 hover:text-[#00d4ff] transition-all duration-300 text-sm font-medium"
                >
                  {social}
                </m.a>
              ))}
            </div>
          </div>
        </div>
      </m.footer>

      {/* Enhanced floating decorative elements */}
      <m.div
        className="fixed bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#ff6b00]/30 to-transparent blur-3xl pointer-events-none"
        animate={{
          y: [0, 60, 0],
          x: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <m.div
        className="fixed top-1/4 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#00d4ff]/25 to-transparent blur-3xl pointer-events-none"
        animate={{
          y: [0, -80, 0],
          x: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
      />

      <m.div
        className="fixed top-3/4 right-16 w-24 h-24 rounded-full bg-gradient-to-br from-[#00ff88]/20 to-transparent blur-2xl pointer-events-none"
        animate={{
          y: [0, 40, 0],
          x: [0, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      />

      {/* Interactive cursor follower */}
      <m.div
        className="fixed w-4 h-4 bg-[#00d4ff] rounded-full pointer-events-none z-50 mix-blend-difference opacity-0"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          left: 'var(--mouse-x, -100px)',
          top: 'var(--mouse-y, -100px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Scroll progress indicator */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] z-40"
        style={{
          scaleX: typeof window !== 'undefined' ? scrollY / (document.body.scrollHeight - window.innerHeight) : 0,
        }}
      />
    </div>
  )
}
