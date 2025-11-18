"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

// Client component for time display to avoid hydration issues
function TimeDisplay() {
  const [time, setTime] = useState("10:58 PM")

  React.useEffect(() => {
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

const m = motion as any

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("applications")
  const theme = useThemeClasses()
  const isLight = theme.theme === 'light'

  return (
    <section id="how-it-works" className="relative py-20 px-6 overflow-hidden scroll-mt-24"
      style={{ background: theme.theme === 'light' ? 'linear-gradient(to bottom, #e1e8ed, #f0f4f8)' : 'linear-gradient(to bottom, #1a2d4d, #0a1428)' }}>
      {/* HUD-style background */}
      <div className="absolute inset-0">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: theme.theme === 'light' ? `
              linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
            ` : `
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
            backgroundImage: theme.theme === 'light'
              ? 'linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.02) 50%, transparent 70%)'
              : 'linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.03) 50%, transparent 70%)',
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
          className="text-center my-12"
        >
          <m.h2
             className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-none"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              textShadow: theme.theme === 'light' ? [
                "0 1px 2px rgba(0,0,0,0.06)",
                "0 2px 6px rgba(0,0,0,0.08)",
                "0 1px 2px rgba(0,0,0,0.06)",
              ] : [
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
                backgroundImage: theme.theme === 'light'
                  ? "linear-gradient(135deg, #1e293b 0%, #4f46e5 30%, #f59e0b 60%, #10b981 90%, #1e293b 100%)"
                  : `linear-gradient(135deg, #ffffff 0%, ${theme.textAccent} 30%, ${theme.statusInterview} 60%, ${theme.statusOffer} 90%, #ffffff 100%)`,
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Next-Generation Career Intelligence
          </m.h2>
          <m.p
            className="text-xl md:text-2xl max-w-2xl mx-auto font-light"
            style={{ color: theme.textSecondary }}
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
                color: [theme.textAccent, theme.statusInterview, theme.statusOffer, theme.textAccent],
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
          className="relative rounded-3xl overflow-hidden border-2 shadow-2xl backdrop-blur-xl group"
          style={{
            background: theme.theme === 'light'
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))"
              : "linear-gradient(135deg, rgba(10, 20, 40, 0.95), rgba(26, 61, 83, 0.95))",
            borderColor: theme.borderMedium,
            boxShadow: theme.theme === 'light'
              ? `0 0 30px rgba(99, 102, 241, 0.2)`
              : `0 0 30px rgba(0, 212, 255, 0.3)`,
          }}
          whileHover={{
            boxShadow: theme.theme === 'light'
              ? "0 0 60px rgba(99, 102, 241, 0.3)"
              : "0 0 60px rgba(0, 212, 255, 0.4)",
          }}
        >
          {/* Advanced HUD corners with animation */}
          <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2" style={{ borderColor: theme.borderStrong }}></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2" style={{ borderColor: theme.borderStrong }}></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2" style={{ borderColor: theme.borderStrong }}></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2" style={{ borderColor: theme.borderStrong }}></div>

          {/* Animated border effect */}
          <m.div
            className="absolute inset-0 rounded-3xl border border-transparent"
            animate={{
              borderImage: theme.theme === 'light' ? [
                "linear-gradient(45deg, rgba(99, 102, 241, 0.4), rgba(245, 158, 11, 0.4), rgba(16, 185, 129, 0.4), rgba(99, 102, 241, 0.4)) 1",
                "linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(16, 185, 129, 0.4), rgba(99, 102, 241, 0.4), rgba(245, 158, 11, 0.4)) 1",
                "linear-gradient(225deg, rgba(16, 185, 129, 0.4), rgba(99, 102, 241, 0.4), rgba(245, 158, 11, 0.4), rgba(16, 185, 129, 0.4)) 1",
                "linear-gradient(315deg, rgba(99, 102, 241, 0.4), rgba(245, 158, 11, 0.4), rgba(16, 185, 129, 0.4), rgba(99, 102, 241, 0.4)) 1",
              ] : [
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
          <div className="absolute inset-0 overflow-hidden rounded-3xl hidden md:block">
            {[...Array(isLight ? 12 : 25)].map((_, i) => (
              <m.div
                key={i}
                className={`absolute ${isLight ? 'w-1 h-1' : 'w-1 h-1'} rounded-full opacity-40`}
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
                  background: i % 4 === 0 ? theme.textAccent : i % 4 === 1 ? theme.statusInterview : i % 4 === 2 ? theme.statusOffer : theme.statusApplied,
                }}
              />
            ))}
          </div>

          <div className="p-8 space-y-8">
            {/* Status bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse"></div>
                <span
                  className="font-bold text-base md:text-sm"
                  style={{ color: theme.theme === 'light' ? '#1e293b' : '#00d4ff' }}
                >
                  SYSTEM ONLINE
                </span>
              </div>
              <div
                className="text-sm font-mono"
                style={{ color: theme.theme === 'light' ? '#64748b' : '#9ca3af' }}
              >
                <TimeDisplay />
              </div>
            </div>

            {/* Enhanced tab buttons with fluid interactions */}
            <div className="flex gap-2 md:gap-8 border-b border-[#00d4ff]/40 pb-6 mb-8">
              {["connections", "interactions", "insights"].map((tab, index) => (
                <m.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-1 px-3 py-2 sm:px-6 sm:py-3 text-sm font-bold transition-all duration-500 rounded-xl overflow-hidden ${activeTab === tab
                      ? "text-[#00d4ff] bg-[#00d4ff]/15 border border-[#00d4ff]/60 shadow-lg shadow-[#00d4ff]/20"
                      : theme.theme === 'light'
                        ? "text-gray-600 hover:text-[#00d4ff] hover:bg-[#00d4ff]/8 border border-transparent hover:border-[#00d4ff]/30"
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
                      {[...Array(isLight ? 3 : 6)].map((_, i) => (
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      {[
                        { label: "Active", value: "47", color: theme.textAccent },
                        { label: "Processing", value: "23", color: theme.statusInterview },
                        { label: "Connected", value: "156", color: theme.statusOffer },
                      ].map((stat, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-center p-4 rounded-xl border"
                          style={{
                            background: theme.theme === 'light'
                              ? "rgba(255, 255, 255, 0.8)"
                              : "rgba(26, 58, 82, 0.5)",
                            borderColor: theme.theme === 'light'
                              ? "rgba(99, 102, 241, 0.2)"
                              : "rgba(0, 212, 255, 0.2)",
                          }}
                        >
                          <div
                            className="text-2xl font-black mb-1"
                            style={{ color: stat.color }}
                          >
                            {stat.value}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: theme.theme === 'light' ? '#64748b' : '#9ca3af' }}
                          >
                            {stat.label}
                          </div>
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
                        className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-2xl hover:border-[#00d4ff]/50 transition-all duration-300 overflow-hidden"
                        style={{
                          background: theme.theme === 'light'
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(26, 58, 82, 0.5)",
                          border: `1px solid ${theme.theme === 'light' ? "rgba(99, 102, 241, 0.2)" : "rgba(0, 212, 255, 0.2)"}`,
                        }}
                      >
                        {/* Priority indicator */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 ${app.priority === 'high' ? 'bg-[#ff6b00]' :
                              app.priority === 'medium' ? 'bg-[#00d4ff]' : 'bg-gray-500'
                            }`}
                        />

                        {/* Animated background on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center">
                              <span
                                className="font-bold text-sm"
                                style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                              >
                                {app.company.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p
                                className="font-bold group-hover:text-[#00d4ff] transition-colors"
                                style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                              >
                                {app.company}
                              </p>
                              <p className="text-xs text-gray-400">{app.status}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 sm:gap-4">
                            <div className="w-20 h-2 bg-[#0f2540] rounded-full overflow-hidden">
                              <m.div
                                initial={{ width: 0 }}
                                animate={{ width: `${app.progress}%` }}
                                transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] rounded-full"
                              />
                            </div>
                            <span
                              className="text-sm font-mono"
                              style={{ color: theme.theme === 'light' ? '#64748b' : '#9ca3af' }}
                            >
                              {app.progress}%
                            </span>
                          </div>
                        </div>
                      </m.div>
                    ))}
                  </div>
                )}

                {activeTab === "interactions" && (
                  <div className="space-y-6">
                    {/* Interview calendar view */}
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                        <div
                          key={idx}
                          className="text-center text-xs sm:text-xs py-2"
                          style={{ color: theme.theme === 'light' ? '#64748b' : '#9ca3af' }}
                        >
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => (
                        <m.div
                          key={i}
                          className={`aspect-square rounded-lg border border-[#00d4ff]/20 flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-300 ${i === 14 ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-[#00d4ff]' :
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
                        className="group relative p-4 sm:p-6 rounded-2xl hover:border-[#00d4ff]/50 transition-all duration-300"
                        style={{
                          background: theme.theme === 'light'
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(26, 58, 82, 0.5)",
                          border: `1px solid ${theme.theme === 'light' ? "rgba(99, 102, 241, 0.2)" : "rgba(0, 212, 255, 0.2)"}`,
                        }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center">
                              <span
                                className="text-white font-bold text-xs"
                                style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                              >
                                {interview.company.charAt(0)}
                              </span>
                            </div>
                            <p
                              className="font-bold"
                              style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                            >
                              {interview.company}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-center ${interview.status === 'confirmed'
                              ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50'
                              : 'bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/50'
                            }`}>
                            {interview.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p
                              className="text-sm"
                              style={{ color: theme.theme === 'light' ? '#64748b' : '#9ca3af' }}
                            >
                              {interview.date}
                            </p>
                            <p className="text-xs text-[#00d4ff] font-medium">{interview.type}</p>
                          </div>
                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 rounded-lg text-[#00d4ff] text-sm font-bold hover:bg-[#00d4ff]/30 transition-all duration-300 self-start sm:self-center"
                          >
                            Join Call
                          </m.button>
                        </div>
                      </m.div>
                    ))}
                  </div>
                )}

                {activeTab === "insights" && (
                  <div className="space-y-6">
                    {/* Animated stats rings */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {[
                        { label: "Success Rate", value: 92, max: 100, color: theme.textAccent, icon: "�" },
                        { label: "Connections Made", value: 203, max: 250, color: theme.statusInterview, icon: "⚡" },
                        { label: "Interactions", value: 47, max: 60, color: theme.statusOffer, icon: "�" },
                      ].map((stat, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.2 }}
                          className="relative flex flex-col items-center p-6 rounded-2xl border"
                          style={{
                            background: theme.theme === 'light'
                              ? "rgba(255, 255, 255, 0.8)"
                              : "rgba(26, 58, 82, 0.5)",
                            borderColor: theme.theme === 'light'
                              ? "rgba(99, 102, 241, 0.2)"
                              : "rgba(0, 212, 255, 0.2)",
                          }}
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
                            <p
                              className="text-sm mb-1"
                              style={{ color: theme.theme === 'light' ? '#64748b' : '#9ca3af' }}
                            >
                              {stat.label}
                            </p>
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
                      className="p-6 rounded-2xl border"
                      style={{
                        background: theme.theme === 'light'
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(26, 58, 82, 0.5)",
                        borderColor: theme.theme === 'light'
                          ? "rgba(99, 102, 241, 0.2)"
                          : "rgba(0, 212, 255, 0.2)",
                      }}
                    >
                      <h3
                        className="text-lg font-bold mb-4"
                        style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                      >
                        Performance Trend
                      </h3>
                      <div className="flex items-end gap-1 sm:gap-2 h-20 sm:h-24">
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
                      <div
                        className="flex justify-between mt-2 text-xs"
                        style={{ color: theme.theme === 'light' ? '#94a3b8' : '#6b7280' }}
                      >
                        <span className="hidden sm:inline">Mon</span>
                        <span className="hidden sm:inline">Tue</span>
                        <span className="hidden sm:inline">Wed</span>
                        <span className="hidden sm:inline">Thu</span>
                        <span className="hidden sm:inline">Fri</span>
                        <span className="hidden sm:inline">Sat</span>
                        <span className="hidden sm:inline">Sun</span>
                        <span className="sm:hidden">M T W T F S S</span>
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
  )
}