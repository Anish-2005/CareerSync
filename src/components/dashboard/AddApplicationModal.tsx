"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, XCircle, Plus } from "lucide-react"

const m = motion as any

interface AddApplicationModalProps {
  theme: any
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: any) => void
}

export default function AddApplicationModal({ theme, isOpen, onClose, onSubmit }: AddApplicationModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'applied' as const,
    priority: 'medium' as const,
    notes: '',
    jobUrl: '',
    contactInfo: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    // Don't reset formData here - let parent handle it
  }

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
            style={{ position: "relative", width: "100%", maxWidth: "42rem", maxHeight: "90vh", overflowY: "auto", padding: "1rem", borderRadius: "1.5rem", ...(theme.bgModalStyle || {}) }}
            className="shadow-2xl sm:p-8"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3" style={{ color: theme.textPrimary }}>
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-[#00d4ff]" />
                New Application
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Google, Microsoft..."
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      color: theme.textPrimary,
                      backgroundColor: theme.bgInputStyle?.backgroundColor || '#ffffff',
                      border: `1px solid ${theme.borderMedium}`,
                      outline: "none",
                      transition: "all 0.3s",
                      fontSize: "0.875rem"
                    }}
                    className={`placeholder-gray-500 focus:ring-2 sm:text-base ${theme.theme === 'dark' ? 'placeholder-gray-400' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Software Engineer..."
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      color: theme.textPrimary,
                      backgroundColor: theme.bgInputStyle?.backgroundColor || '#ffffff',
                      border: `1px solid ${theme.borderMedium}`,
                      outline: "none",
                      transition: "all 0.3s",
                      fontSize: "0.875rem"
                    }}
                    className={`placeholder-gray-500 focus:ring-2 sm:text-base ${theme.theme === 'dark' ? 'placeholder-gray-400' : ''}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="San Francisco, CA / Remote"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      color: theme.textPrimary,
                      backgroundColor: theme.bgInputStyle?.backgroundColor || '#ffffff',
                      border: `1px solid ${theme.borderMedium}`,
                      outline: "none",
                      transition: "all 0.3s",
                      fontSize: "0.875rem"
                    }}
                    className={`placeholder-gray-500 focus:ring-2 sm:text-base ${theme.theme === 'dark' ? 'placeholder-gray-400' : ''}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="$100k - $150k"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      color: theme.textPrimary,
                      backgroundColor: theme.bgInputStyle?.backgroundColor || '#ffffff',
                      border: `1px solid ${theme.borderMedium}`,
                      outline: "none",
                      transition: "all 0.3s",
                      fontSize: "0.875rem"
                    }}
                    className={`placeholder-gray-500 focus:ring-2 sm:text-base ${theme.theme === 'dark' ? 'placeholder-gray-400' : ''}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Job URL</label>
                <input
                  type="url"
                  value={formData.jobUrl}
                  onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                  placeholder="https://example.com/job"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", color: theme.textPrimary, backgroundColor: "transparent", border: "1px solid transparent", outline: "none", transition: "all 0.3s", fontSize: "0.875rem", ...(theme.bgInputStyle || {}) }}
                  className={`placeholder-gray-500 focus:border-[#00d4ff]/50 sm:text-base ${theme.theme === 'dark' ? 'placeholder-gray-400' : ''}`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", color: theme.textPrimary, backgroundColor: "transparent", border: "1px solid transparent", outline: "none", transition: "all 0.3s", fontSize: "0.875rem", ...(theme.bgInputStyle || {}) }}
                    className="focus:border-[#00d4ff]/50 sm:text-base"
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interviewing</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                    <option value="withdrawn">Withdrawn</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", color: theme.textPrimary, backgroundColor: "transparent", border: "1px solid transparent", outline: "none", transition: "all 0.3s", fontSize: "0.875rem", ...(theme.bgInputStyle || {}) }}
                    className="focus:border-[#00d4ff]/50 sm:text-base"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Contact Info</label>
                <input
                  type="text"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder="recruiter@company.com or John Doe"
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", color: theme.textPrimary, backgroundColor: "transparent", border: "1px solid transparent", outline: "none", transition: "all 0.3s", fontSize: "0.875rem", ...(theme.bgInputStyle || {}) }}
                  className={`placeholder-gray-500 focus:border-[#00d4ff]/50 sm:text-base ${theme.theme === 'dark' ? 'placeholder-gray-400' : ''}`}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Notes</label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any additional notes about the application..."
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", color: theme.textPrimary, backgroundColor: "transparent", border: "1px solid transparent", outline: "none", transition: "all 0.3s", resize: "none", fontSize: "0.875rem", ...(theme.bgInputStyle || {}) }}
                  className={`placeholder-gray-500 focus:border-[#00d4ff]/50 sm:text-base ${theme.theme === 'dark' ? 'placeholder-gray-400' : ''}`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <m.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  style={{ flex: 1, padding: "0.75rem 1.5rem", borderRadius: "0.75rem", fontWeight: 700, transition: "all 0.3s", fontSize: "0.875rem", ...(theme.bgButtonSecondaryStyle || {}), border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  className="sm:px-6 sm:py-3 sm:text-base"
                >
                  Cancel
                </m.button>
                <m.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-4 sm:px-6 py-3 rounded-xl text-white font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
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
              </div>
            </form>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}