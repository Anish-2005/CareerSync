"use client"

import React from "react"
import { motion } from "framer-motion"
import { Briefcase, Send, Users, Trophy, TrendingUp } from "lucide-react"

const m = motion as any

interface StatsCardsProps {
  theme: any
  stats: {
    total: number
    applied: number
    interviewing: number
    offers: number
    responseRate: number
  }
}

export default function StatsCards({ theme, stats }: StatsCardsProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8"
    >
      {[
        { label: "Total Apps", value: stats.total, icon: Briefcase, color: "#00d4ff", subtitle: "All time" },
        { label: "Active", value: stats.applied, icon: Send, color: "#00d4ff", subtitle: "Awaiting response" },
        { label: "Interviews", value: stats.interviewing, icon: Users, color: "#ff6b00", subtitle: "In progress" },
        { label: "Offers", value: stats.offers, icon: Trophy, color: "#00ff88", subtitle: "Success!" },
        { label: "Response Rate", value: `${stats.responseRate}%`, icon: TrendingUp, color: "#00ff88", subtitle: "Companies replied" },
      ].map((stat, idx) => (
        <m.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          style={{ position: "relative", padding: "1rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.1)", transition: "all 0.3s", overflow: "hidden", cursor: "pointer", ...(theme.bgCardStyle || {}) }}
          className="group sm:p-6"
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
            style={{ background: `linear-gradient(135deg, ${stat.color}40, transparent)` }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
            </div>
            <div className="text-2xl sm:text-4xl font-black mb-1 sm:mb-2" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>{stat.label}</div>
            <div className="text-xs hidden sm:block" style={{ color: theme.textSecondary }}>{stat.subtitle}</div>
          </div>
        </m.div>
      ))}
    </m.div>
  )
}