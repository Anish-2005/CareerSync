"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles, Flame } from "lucide-react"

const m = motion as any

interface DashboardHeaderProps {
  theme: any
  streak: number
  motivationalQuote: string
}

export default function DashboardHeader({ theme, streak, motivationalQuote }: DashboardHeaderProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-none"
          style={{
            backgroundImage: theme.theme === 'light'
              ? "linear-gradient(135deg, #1e293b 0%, #3b82f6 30%, #f59e0b 60%, #10b981 90%)"
              : "linear-gradient(135deg, #1a1a1a 0%, #00d4ff 30%, #ff6b00 60%, #00ff88 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Dashboard
        </h1>

        {streak > 0 && (
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#ff6b00]/20 to-[#00ff88]/20 border border-[#ff6b00]/50 self-start sm:self-center"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6b00]" />
            <span className="text-sm sm:text-base font-bold" style={{ color: theme.textPrimary }}>{streak} day streak!</span>
          </m.div>
        )}
      </div>

      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-base sm:text-lg italic flex items-center gap-2"
        style={{ color: theme.textSecondary }}
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff88]" />
        {motivationalQuote}
      </m.p>
    </m.div>
  )
}