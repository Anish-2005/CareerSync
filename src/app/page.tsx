"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
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
} from "lucide-react"

// Cast motion to any to avoid strict prop typing issues in this file
const m = motion as any

// Main Landing Page
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("applications")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b00]/50">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              NexusTrack
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
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
            >
              Sign In
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
            >
              Get Started
            </m.button>
          </div>
        </div>
      </m.nav>      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Simplified background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1428] via-[#1a2d4d] to-[#0a1428]">
          {/* Subtle animated grid */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Minimal floating elements */}
          <m.div
            className="absolute top-20 right-20 w-2 h-2 bg-[#00d4ff] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <m.div
            className="absolute bottom-32 left-16 w-1 h-1 bg-[#ff6b00] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <m.div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#00ff88] rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
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
          {/* Simple badge */}
          <m.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 backdrop-blur-md mb-12"
          >
            <Zap className="w-5 h-5 text-[#00d4ff]" />
            <span className="text-[#00d4ff] font-medium">Next-Generation Career Intelligence</span>
          </m.div>

          {/* Clean headline */}
          <m.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #ff6b00 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            NexusTrack
          </m.h1>

          {/* Focused subheading */}
          <m.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed"
          >
            Connect with infinite career possibilities through intelligent networking and quantum insights.
          </m.p>

          {/* Clean CTA buttons */}
          <m.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <m.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 107, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 text-white font-bold text-lg rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-2xl transition-all duration-300"
            >
              Start Your Journey
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 text-white font-bold text-lg rounded-full border-2 border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300"
            >
              Learn More
            </m.button>
          </m.div>

          {/* Single floating stat */}
          <m.div
            variants={itemVariants}
            className="mt-20 flex justify-center"
          >
            <m.div
              className="flex items-center gap-4 px-8 py-4 rounded-full bg-[#1a3a52]/50 backdrop-blur-md border border-[#00d4ff]/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">10,000+ Professionals Connected</span>
              </div>
            </m.div>
          </m.div>
        </m.div>

        {/* Minimal scroll indicator */}
        <m.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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

      {/* Features Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#0a1428] to-[#1a2d4d] overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-1 h-1 bg-[#00d4ff] rounded-full opacity-40"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 13) % 100}%`,
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
                  "0 0 40px rgba(255, 107, 0, 0.5)",
                  "0 0 20px rgba(0, 212, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Quantum Features
            </m.h2>
            <p className="text-gray-400 text-xl">Navigate infinite possibilities with intelligent connections</p>
          </m.div>

          <m.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Target,
                title: "Neural Targeting",
                description: "Lock onto opportunities with AI-powered matching and intelligent opportunity detection",
                color: "from-[#ff6b00] to-[#ff8c00]",
                shadowColor: "rgba(255, 107, 0, 0.3)",
              },
              {
                icon: BarChart3,
                title: "Quantum Analytics",
                description: "Analyze career trajectories with advanced metrics and predictive insights",
                color: "from-[#00d4ff] to-[#0088cc]",
                shadowColor: "rgba(0, 212, 255, 0.3)",
              },
              {
                icon: Clock,
                title: "Temporal Sync",
                description: "Synchronize your schedule with intelligent time management and deadline tracking",
                color: "from-[#ff6b00] to-[#00d4ff]",
                shadowColor: "rgba(255, 107, 0, 0.3)",
              },
              {
                icon: Users,
                title: "Network Matrix",
                description: "Connect with a vast network of professionals and access insider opportunities",
                color: "from-[#00d4ff] to-[#ff6b00]",
                shadowColor: "rgba(0, 212, 255, 0.3)",
              },
              {
                icon: Shield,
                title: "Quantum Security",
                description: "Enterprise-grade encryption protects your career data with zero-trust architecture",
                color: "from-[#ff8c00] to-[#00d4ff]",
                shadowColor: "rgba(255, 140, 0, 0.3)",
              },
              {
                icon: Zap,
                title: "AI Nexus",
                description: "Experience intelligent career guidance powered by advanced neural networks",
                color: "from-[#00d4ff] to-[#ff6b00]",
                shadowColor: "rgba(0, 212, 255, 0.3)",
              },
            ].map((feature, index) => (
              <m.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  z: 50,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/80 to-[#0f2540]/80 border border-[#00d4ff]/30 hover:border-[#00d4ff]/60 backdrop-blur-xl transition-all duration-500 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Animated background glow */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(3)].map((_, i) => (
                    <m.div
                      key={i}
                      className="absolute w-1 h-1 bg-[#00d4ff] rounded-full opacity-60"
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i * 2) * 10, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                    />
                  ))}
                </div>

                {/* Icon with 3D effect */}
                <m.div
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center mb-6 group-hover:from-[#ff6b00]/40 group-hover:to-[#00d4ff]/40 transition-all duration-500"
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  <feature.icon className="w-8 h-8 text-[#00d4ff] group-hover:text-white transition-colors duration-300" />
                </m.div>

                {/* Content */}
                <div style={{ transform: "translateZ(10px)" }}>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <m.div
                  className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#00d4ff] opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.2, 1],
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
              className="text-5xl md:text-6xl font-black mb-4 text-white"
              animate={{
                textShadow: [
                  "0 0 10px rgba(0, 212, 255, 0.5)",
                  "0 0 20px rgba(255, 107, 0, 0.5)",
                  "0 0 10px rgba(0, 212, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Your Nexus Control Center
            </m.h2>
            <p className="text-gray-400 text-xl">Command your career destiny with quantum intelligence</p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border-2 border-[#00d4ff]/40 shadow-2xl shadow-[#00d4ff]/20 backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, rgba(10, 20, 40, 0.95), rgba(26, 61, 83, 0.95))",
            }}
          >
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#00d4ff]/60"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#00d4ff]/60"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#00d4ff]/60"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#00d4ff]/60"></div>

            <div className="p-8 space-y-8">
              {/* Status bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse"></div>
                  <span className="text-[#00d4ff] font-bold text-sm">SYSTEM ONLINE</span>
                </div>
                <div className="text-gray-400 text-sm font-mono">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Tab buttons with HUD style */}
              <div className="flex gap-6 border-b border-[#00d4ff]/30 pb-4">
                {["connections", "interactions", "insights"].map((tab) => (
                  <m.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-lg ${
                      activeTab === tab
                        ? "text-[#00d4ff] bg-[#00d4ff]/10 border border-[#00d4ff]/50"
                        : "text-gray-400 hover:text-white hover:bg-[#00d4ff]/5"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <m.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d4ff]"
                        layoutId="activeTab"
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

      {/* Statistics Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Dynamic background */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30"
              animate={{
                y: [0, -200, 0],
                x: [0, Math.sin(i) * 100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 10 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.2,
              }}
              style={{
                left: `${(i * 4) % 100}%`,
                top: `${(i * 7) % 100}%`,
                backgroundColor: i % 2 === 0 ? '#00d4ff' : '#ff6b00',
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
                <Zap className="w-6 h-6 text-[#ff6b00]" />
                <span className="font-bold text-white">NexusTrack</span>
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
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2024 NexusTrack. All rights reserved.</p>
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
        className="fixed w-4 h-4 bg-[#00d4ff] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          left: 'var(--mouse-x, 50%)',
          top: 'var(--mouse-y, 50%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Scroll progress indicator */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] z-40"
        style={{
          scaleX: scrollY / (document.body.scrollHeight - window.innerHeight),
        }}
      />
    </div>
  )
}
