"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, XCircle, MapPin, DollarSign, Calendar, Clock, Users, FileText, ExternalLink } from "lucide-react"

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

interface ApplicationDetailModalProps {
  theme: any
  isOpen: boolean
  onClose: () => void
  application: Application | null
  getStatusColor: (status: Application["status"]) => string
  getStatusIcon: (status: Application["status"]) => React.ComponentType<any>
  getPriorityIcon: (priority: Application["priority"]) => React.ReactElement
}

export default function ApplicationDetailModal({
  theme,
  isOpen,
  onClose,
  application,
  getStatusColor,
  getStatusIcon,
  getPriorityIcon
}: ApplicationDetailModalProps) {
  if (!application) return null

  const StatusIcon = getStatusIcon(application.status)
  const statusColor = getStatusColor(application.status)

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            style={{ position: "relative", width: "100%", maxWidth: "48rem", maxHeight: "90vh", overflowY: "auto", padding: "1rem", borderRadius: "1.5rem", ...(theme.bgModalStyle || {}) }}
            className="shadow-2xl sm:p-8"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3" style={{ color: theme.textPrimary }}>
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#00d4ff]" />
                Application Details
              </h2>
              <m.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
              >
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </m.button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Company Header */}
              <div style={{ padding: "1rem 1.5rem", borderRadius: "1rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }} className="sm:p-6">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-bold text-2xl sm:text-3xl flex-shrink-0"
                  style={{
                    background: theme.theme === 'light'
                      ? `linear-gradient(135deg, ${statusColor}25, ${statusColor}15)`
                      : `linear-gradient(135deg, ${statusColor}40, ${statusColor}20)`,
                    color: theme.theme === 'light' ? '#ffffff' : '#ffffff',
                    border: theme.theme === 'light' ? `2px solid ${statusColor}40` : 'none',
                    boxShadow: theme.theme === 'light' ? `0 2px 8px ${statusColor}30` : 'none',
                  }}
                >
                  {application.company.charAt(0)}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style={{ color: theme.textPrimary }}>{application.company}</h3>
                  <p className="text-lg sm:text-xl" style={{ color: theme.textPrimary }}>{application.position}</p>
                </div>
                <div className="p-3 sm:p-4 bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="scale-125 sm:scale-150">{getPriorityIcon(application.priority)}</div>
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                  <div className="text-sm mb-2" style={{ color: theme.textSecondary }}>Status</div>
                  <div
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-base sm:text-lg font-bold"
                    style={{
                      backgroundColor: `${statusColor}20`,
                      color: statusColor,
                      border: `2px solid ${statusColor}50`,
                    }}
                  >
                    <StatusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </div>
                </div>

                <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                  <div className="text-sm mb-2" style={{ color: theme.textSecondary }}>Progress</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgInputStyle?.backgroundColor || '#f3f4f6' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${application.progress}%`,
                          background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`,
                        }}
                      />
                    </div>
                    <span className="text-base sm:text-lg font-bold" style={{ color: statusColor }}>
                      {application.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {application.location && (
                  <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                    <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                      <MapPin className="w-4 h-4 text-[#ff6b00]" />
                      Location
                    </div>
                    <div style={{ color: theme.textPrimary }} className="font-semibold">{application.location}</div>
                  </div>
                )}

                {application.salary && (
                  <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                    <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                      <DollarSign className="w-4 h-4 text-[#00ff88]" />
                      Salary Range
                    </div>
                    <div style={{ color: theme.textPrimary }} className="font-semibold">{application.salary}</div>
                  </div>
                )}

                <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                  <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                    <Calendar className="w-4 h-4 text-[#00d4ff]" />
                    Applied On
                  </div>
                  <div style={{ color: theme.textPrimary }} className="font-semibold">
                    {new Date(application.applicationDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                </div>

                <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                  <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                    <Clock className="w-4 h-4 text-[#00d4ff]" />
                    Last Updated
                  </div>
                  <div style={{ color: theme.textPrimary }} className="font-semibold">
                    {new Date(application.lastUpdated).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              {application.contactInfo && (
                <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                  <div className="flex items-center gap-2 text-sm mb-2" style={{ color: theme.textSecondary }}>
                    <Users className="w-4 h-4 text-[#00d4ff]" />
                    Contact Information
                  </div>
                  <div style={{ color: theme.textPrimary }} className="font-semibold">{application.contactInfo}</div>
                </div>
              )}

              {/* Notes */}
              {application.notes && (
                <div style={{ padding: "1rem", borderRadius: "0.75rem", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }}>
                  <div className="flex items-center gap-2 text-sm mb-2" style={{ color: theme.textSecondary }}>
                    <FileText className="w-4 h-4 text-[#00d4ff]" />
                    Notes
                  </div>
                  <div style={{ color: theme.textPrimary }} className="whitespace-pre-wrap">{application.notes}</div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                {application.jobUrl && (
                  <m.a
                    href={application.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] font-bold hover:bg-[#00d4ff]/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                    View Job Posting
                  </m.a>
                )}
                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="px-6 sm:px-8 py-3 rounded-xl text-white font-bold hover:shadow-lg transition-all text-sm sm:text-base"
                  style={{
                    background: theme.theme === 'light'
                      ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
                      : "linear-gradient(to right, #ff6b00, #00d4ff)",
                    boxShadow: theme.theme === 'light'
                      ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                      : "0 10px 30px rgba(255, 107, 0, 0.25)"
                  }}
                >
                  Close
                </m.button>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}