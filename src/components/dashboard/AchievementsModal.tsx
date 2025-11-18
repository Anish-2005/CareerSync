"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, XCircle, Sparkles, Flame, Award } from "lucide-react"

const m = motion as any

interface Achievement {
  id: number
  name: string
  description: string
  unlocked: boolean
  icon: React.ComponentType<any>
}

interface AchievementsModalProps {
  theme: any
  isOpen: boolean
  onClose: () => void
  achievements: Achievement[]
  unlockedAchievements: Achievement[]
  userStats: {
    totalApplications: number
    currentStreak: number
    longestStreak: number
  }
  streak: number
}

export default function AchievementsModal({
  theme,
  isOpen,
  onClose,
  achievements,
  unlockedAchievements,
  userStats,
  streak
}: AchievementsModalProps) {
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
            style={{ position: "relative", width: "100%", maxWidth: "56rem", maxHeight: "90vh", overflowY: "auto", padding: "1rem", borderRadius: "1.5rem", ...(theme.bgModalStyle || {}) }}
            className="shadow-2xl sm:p-8"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3" style={{ color: theme.textPrimary }}>
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#00ff88]" />
                Achievements
                <span className="text-base sm:text-lg" style={{ color: theme.textSecondary }}>({unlockedAchievements.length}/{achievements.length})</span>
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

            {/* Progress Bar */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm" style={{ color: theme.textSecondary }}>Overall Progress</span>
                <span className="text-sm font-bold text-[#00ff88]">
                  {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden" style={{ backgroundColor: theme.bgInputStyle?.backgroundColor || '#f3f4f6' }}>
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full"
                  style={{
                    background: theme.theme === 'light'
                      ? "linear-gradient(to right, #10b981, #3b82f6)"
                      : "linear-gradient(to right, #00ff88, #00d4ff)"
                  }}
                />
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }} className="sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-[#00d4ff] mb-1">{userStats.totalApplications}</div>
                <div className="text-xs" style={{ color: theme.textSecondary }}>Total Applications</div>
              </div>
              <div style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }} className="sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-[#ff6b00] mb-1 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                  {streak}
                </div>
                <div className="text-xs" style={{ color: theme.textSecondary }}>Current Streak</div>
              </div>
              <div style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", textAlign: "center", border: "1px solid rgba(0,0,0,0.1)", ...(theme.bgCardStyle || {}) }} className="sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-[#00ff88] mb-1 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  {userStats.longestStreak}
                </div>
                <div className="text-xs" style={{ color: theme.textSecondary }}>Longest Streak</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <m.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: achievement.id * 0.05 }}
                  style={{
                    padding: "1rem 1.5rem",
                    borderRadius: "1rem",
                    border: achievement.unlocked ? "2px solid rgba(0,255,136,0.3)" : "1px solid rgba(0,0,0,0.1)",
                    transition: "all 0.3s",
                    ...(theme.bgCardStyle || {}),
                    ...(achievement.unlocked ? { boxShadow: "0 4px 12px rgba(0,255,136,0.15)" } : {})
                  }}
                  className="sm:p-6"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-xl ${achievement.unlocked ? 'bg-gradient-to-br from-[#00ff88]/40 to-[#00d4ff]/40' : 'bg-gray-200'}`}>
                      <achievement.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${achievement.unlocked ? 'text-[#00ff88]' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base sm:text-lg font-bold mb-1 flex items-center gap-2`} style={{ color: achievement.unlocked ? theme.textPrimary : theme.textSecondary }}>
                        {achievement.name}
                        {achievement.unlocked && <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ff88]" />}
                      </h3>
                      <p className={`text-sm sm:text-base`} style={{ color: theme.textSecondary }}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}