"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, DollarSign, Eye, ExternalLink, Trash2 } from "lucide-react"

const m = motion as any

interface Application {
  _id: string
  company: string
  position: string
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  applicationDate: string | Date
  lastUpdated: string | Date
  notes?: string
  salary?: string
  location?: string
  jobUrl?: string
  contactInfo?: string
  priority: 'low' | 'medium' | 'high'
  progress: number
}

interface ApplicationCardProps {
  theme: any
  app: Application
  index: number
  onViewDetails: (app: Application) => void
  onDelete: (id: string) => void
  getStatusColor: (status: Application["status"]) => string
  getStatusIcon: (status: Application["status"]) => React.ComponentType<any>
  getPriorityIcon: (priority: Application["priority"]) => React.ReactElement
}

export default function ApplicationCard({
  theme,
  app,
  index,
  onViewDetails,
  onDelete,
  getStatusColor,
  getStatusIcon,
  getPriorityIcon
}: ApplicationCardProps) {
  const StatusIcon = getStatusIcon(app.status)
  const statusColor = getStatusColor(app.status)

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.02, y: -2 }}
      style={{ position: "relative", padding: "1rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.1)", transition: "all 0.3s", overflow: "hidden", cursor: "pointer", ...(theme.bgCardStyle || {}) }}
      className="group sm:p-6 hover:border-[#00d4ff]/50"
      onClick={() => onViewDetails(app)}
    >
      {/* Priority indicator */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          app.priority === "high"
            ? "bg-[#ff6b00]"
            : app.priority === "medium"
              ? "bg-[#00d4ff]"
              : "bg-gray-500"
        }`}
      />

      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
        style={{ background: `linear-gradient(135deg, ${statusColor}40, transparent)` }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{
                background: theme.theme === 'light'
                  ? `linear-gradient(135deg, ${statusColor}30, ${statusColor}15)`
                  : `linear-gradient(135deg, ${statusColor}40, ${statusColor}20)`,
              }}
            >
              {app.company.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg sm:text-xl font-bold group-hover:text-[#00d4ff] transition-colors truncate" style={{ color: theme.textPrimary }}>
                {app.company}
              </h3>
              <p className="text-sm truncate" style={{ color: theme.textSecondary }}>{app.position}</p>
            </div>
          </div>

          <span className="flex-shrink-0">{getPriorityIcon(app.priority)}</span>
        </div>

        {/* Status Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 self-start"
          style={{
            backgroundColor: `${statusColor}20`,
            color: statusColor,
            border: `1px solid ${statusColor}50`,
          }}
        >
          <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
        </div>

        {/* Details */}
        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#00d4ff]" />
            <span className="truncate">{new Date(app.applicationDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          {app.location && (
            <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff6b00]" />
              <span className="truncate">{app.location}</span>
            </div>
          )}
          {app.salary && (
            <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ff88]" />
              <span className="truncate">{app.salary}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-xs" style={{ color: theme.textSecondary }}>Progress</span>
            <span className="text-xs font-bold" style={{ color: statusColor }}>
              {app.progress}%
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgInputStyle?.backgroundColor || '#e5e7eb' }}>
            <m.div
              initial={{ width: 0 }}
              animate={{ width: `${app.progress}%` }}
              transition={{ duration: 1, delay: index * 0.05 }}
              className="h-full rounded-full"
              style={{
                background: theme.theme === 'light'
                  ? `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`
                  : `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <m.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              onViewDetails(app)
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
            title="View Details"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
          </m.button>
          {app.jobUrl && (
            <m.a
              href={app.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="p-1.5 sm:p-2 rounded-lg bg-[#ff6b00]/20 border border-[#ff6b00]/50 text-[#ff6b00] hover:bg-[#ff6b00]/30 transition-all"
              title="View Job Posting"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </m.a>
          )}
          <m.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              onDelete(app._id)
            }}
            className="p-1.5 sm:p-2 rounded-lg bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444] hover:bg-[#ff4444]/30 transition-all"
            title="Delete"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </m.button>
        </div>
      </div>
    </m.div>
  )
}