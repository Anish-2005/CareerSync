"use client"

import React from "react"
import { motion } from "framer-motion"
import { Search, Briefcase, Send, Users, Trophy, XCircle } from "lucide-react"

const m = motion as any

interface ApplicationFiltersProps {
  theme: any
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTab: "all" | "applied" | "interview" | "offer" | "rejected" | "withdrawn"
  onTabChange: (tab: "all" | "applied" | "interview" | "offer" | "rejected" | "withdrawn") => void
  stats: {
    total: number
    applied: number
    interviewing: number
    offers: number
    rejected: number
  }
}

export default function ApplicationFilters({
  theme,
  searchQuery,
  onSearchChange,
  selectedTab,
  onTabChange,
  stats
}: ApplicationFiltersProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mb-6 space-y-4"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme.textSecondary }} />
        <input
          type="text"
          placeholder="Search companies, positions, or locations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: "100%", paddingLeft: "3rem", paddingRight: "1rem", paddingTop: "1rem", paddingBottom: "1rem", borderRadius: "1rem", border: "1px solid transparent", outline: "none", transition: "all 0.3s", ...(theme.bgInputStyle || {}), color: theme.textPrimary }}
          className="placeholder-gray-500 focus:border-[#00d4ff]/50"
        />
      </div>

      {/* Tab Filters */}
      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
        {[
          { label: "All", value: "all", count: stats.total, icon: Briefcase },
          { label: "Applied", value: "applied", count: stats.applied, icon: Send },
          { label: "Interviewing", value: "interview", count: stats.interviewing, icon: Users },
          { label: "Offers", value: "offer", count: stats.offers, icon: Trophy },
          { label: "Rejected", value: "rejected", count: stats.rejected, icon: XCircle },
        ].map((tab) => (
          <m.button
            key={tab.value}
            onClick={() => onTabChange(tab.value as typeof selectedTab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.75rem",
              fontWeight: 700,
              fontSize: "0.75rem",
              whiteSpace: "nowrap",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              ...(selectedTab === tab.value
                ? {
                    background: theme.theme === 'light'
                      ? "linear-gradient(90deg, #3b82f6, #8b5cf6)"
                      : "linear-gradient(90deg, #ff6b00, #00d4ff)",
                    color: "#fff",
                    boxShadow: theme.theme === 'light'
                      ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                      : "0 10px 30px rgba(0,0,0,0.25)"
                  }
                : theme.theme === 'light'
                ? {
                    background: "rgba(255, 255, 255, 0.8)",
                    border: `1px solid rgba(99, 102, 241, 0.2)`,
                    color: "#475569",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                  }
                : {
                    background: "rgba(26,58,82,0.38)",
                    border: `1px solid rgba(0,212,255,0.2)`,
                    color: theme.textTertiary
                  }),
            }}
            className="sm:px-6 sm:py-3 sm:text-sm sm:gap-2"
          >
            <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
            {tab.label}
            <span
              style={{
                padding: "0.125rem 0.25rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 700,
                ...(selectedTab === tab.value
                  ? { backgroundColor: "rgba(255,255,255,0.2)" }
                  : theme.theme === 'light'
                  ? { backgroundColor: "rgba(99, 102, 241, 0.15)", color: "#4f46e5" }
                  : { backgroundColor: "rgba(0,212,255,0.2)" }),
              }}
              className="sm:px-2"
            >
              {tab.count}
            </span>
          </m.button>
        ))}
      </div>
    </m.div>
  )
}