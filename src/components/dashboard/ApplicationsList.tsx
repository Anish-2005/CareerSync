"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, XCircle } from "lucide-react"
import ApplicationCard from "./ApplicationCard"

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

interface ApplicationsListProps {
  theme: any
  loading: boolean
  error: string | null
  applications: Application[]
  viewMode: "grid" | "list"
  onViewDetails: (app: Application) => void
  onDelete: (id: string) => void
  onRetry: () => void
  getStatusColor: (status: Application["status"]) => string
  getStatusIcon: (status: Application["status"]) => React.ComponentType<any>
  getPriorityIcon: (priority: Application["priority"]) => React.ReactElement
}

export default function ApplicationsList({
  theme,
  loading,
  error,
  applications,
  viewMode,
  onViewDetails,
  onDelete,
  onRetry,
  getStatusColor,
  getStatusIcon,
  getPriorityIcon
}: ApplicationsListProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}
    >
      {/* Loading State */}
      {loading && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background: theme.theme === 'light'
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
                : "linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(255, 107, 0, 0.2))"
            }}
          >
            <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>Loading applications...</h3>
          <p style={{ color: theme.textSecondary }}>Fetching your job applications</p>
        </m.div>
      )}

      {/* Error State */}
      {error && !loading && (
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-full text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ff4444]/20 to-[#ff6b00]/20 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-[#ff4444]" />
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>Failed to load applications</h3>
          <p style={{ color: theme.textSecondary }} className="mb-6">{error}</p>
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className="px-8 py-3 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            style={{
              background: theme.theme === 'light'
                ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
                : "linear-gradient(to right, #ff6b00, #00d4ff)",
              boxShadow: theme.theme === 'light'
                ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                : "0 10px 30px rgba(255, 107, 0, 0.25)"
            }}
          >
            Try Again
          </m.button>
        </m.div>
      )}

      {/* Applications */}
      {!loading && !error && (
        <AnimatePresence mode="popLayout">
          {applications.map((app, idx) => (
            <ApplicationCard
              key={app._id}
              theme={theme}
              app={app}
              index={idx}
              onViewDetails={onViewDetails}
              onDelete={onDelete}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              getPriorityIcon={getPriorityIcon}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Empty State */}
      {!loading && !error && applications.length === 0 && (
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-full text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br flex items-center justify-center"
            style={{
              background: theme.theme === 'light'
                ? "linear-gradient(135deg, rgba(156, 163, 175, 0.1), rgba(209, 213, 219, 0.1))"
                : "linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(255, 107, 0, 0.2))"
            }}
          >
            <Briefcase className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>No applications found</h3>
          <p style={{ color: theme.textSecondary }} className="mb-6">
            Start tracking your job applications
          </p>
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {}} // This will be handled by parent
            className="px-8 py-3 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
            style={{
              background: theme.theme === 'light'
                ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
                : "linear-gradient(to right, #ff6b00, #00d4ff)",
              boxShadow: theme.theme === 'light'
                ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                : "0 10px 30px rgba(255, 107, 0, 0.25)"
            }}
          >
            <Briefcase className="w-5 h-5" />
            Add Your First Application
          </m.button>
        </m.div>
      )}
    </m.div>
  )
}