"use client"

import React from "react"
import { motion } from "framer-motion"
import { Plus, BarChart3 } from "lucide-react"

const m = motion as any

interface QuickActionsProps {
  theme: any
  onAddApplication: () => void
  viewMode: "grid" | "list"
  onToggleViewMode: () => void
  sortBy: "date" | "company" | "priority"
  onSortChange: (sort: "date" | "company" | "priority") => void
}

export default function QuickActions({
  theme,
  onAddApplication,
  viewMode,
  onToggleViewMode,
  sortBy,
  onSortChange
}: QuickActionsProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="mb-6 flex flex-col sm:flex-row gap-3"
    >
      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddApplication}
        className="px-4 py-3 sm:px-6 sm:py-3 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all text-sm sm:text-base"
        style={{
          background: theme.theme === 'light'
            ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
            : "linear-gradient(to right, #ff6b00, #00d4ff)",
          boxShadow: theme.theme === 'light'
            ? "0 4px 14px rgba(59, 130, 246, 0.25)"
            : "0 10px 30px rgba(255, 107, 0, 0.25)"
        }}
      >
        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        Add Application
      </m.button>

      <m.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleViewMode}
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid rgba(0,212,255,0.2)",
          color: theme.textPrimary,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          transition: "all 0.3s",
          backgroundColor: theme.theme === 'light' ? "rgba(255, 255, 255, 0.8)" : "rgba(26,58,82,0.6)",
          boxShadow: theme.theme === 'light' ? "0 2px 8px rgba(0,0,0,0.08)" : undefined
        }}
        className="sm:px-6 sm:py-3 hover:border-[#00d4ff]/50 text-sm sm:text-base"
      >
        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
        {viewMode === 'grid' ? 'List View' : 'Grid View'}
      </m.button>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as any)}
        style={{ padding: "0.75rem 1.5rem", borderRadius: "0.75rem", border: "1px solid transparent", outline: "none", transition: "all 0.3s", fontWeight: 700, fontSize: "0.875rem", ...(theme.bgInputStyle || {}), color: theme.textPrimary }}
        className="sm:px-6 sm:py-3 sm:text-base focus:border-[#00d4ff]/50"
      >
        <option value="date">Sort by Date</option>
        <option value="company">Sort by Company</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </m.div>
  )
}