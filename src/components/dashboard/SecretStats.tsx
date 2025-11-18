"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles, Flame, TrendingUp, Award } from "lucide-react"

const m = motion as any

interface SecretStatsProps {
  theme: any
  showSecretStats: boolean
  onClose: () => void
  stats: {
    avgDaysToResponse: number
    successRate: number
    highPriority: number
    withdrawn: number
  }
}

export default function SecretStats({ theme, showSecretStats, onClose, stats }: SecretStatsProps) {
  if (!showSecretStats) return null

  return (
    <m.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-8 p-6 rounded-2xl bg-gradient-to-br border-2 overflow-hidden"
      style={{
        background: theme.theme === 'light'
          ? "linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(59, 130, 246, 0.05))"
          : "linear-gradient(135deg, rgba(255, 107, 0, 0.2), rgba(0, 212, 255, 0.2))",
        borderColor: theme.theme === 'light'
          ? "rgba(34, 197, 94, 0.2)"
          : "#00ff88"
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-[#00ff88]" />
        <Flame className="w-6 h-6 text-[#00ff88]" />
        <h3 className="text-xl font-bold" style={{ color: theme.textPrimary }}>Secret Stats Unlocked!</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-3xl font-black text-[#00ff88] mb-1">{stats.avgDaysToResponse}</div>
          <div className="text-sm" style={{ color: theme.textSecondary }}>Avg Days to Response</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-[#ff6b00] mb-1">{stats.successRate}%</div>
          <div className="text-sm" style={{ color: theme.textSecondary }}>Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-[#00d4ff] mb-1">{stats.highPriority}</div>
          <div className="text-sm" style={{ color: theme.textSecondary }}>High Priority</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-black text-[#00ff88] mb-1">{stats.withdrawn}</div>
          <div className="text-sm" style={{ color: theme.textSecondary }}>Withdrawn</div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-4 text-sm transition-colors"
        style={{ color: theme.textSecondary }}
      >
        Hide Stats
      </button>
    </m.div>
  )
}