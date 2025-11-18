"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Trophy, User, LogOut, Menu, X } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

const m = motion as any

interface DashboardNavigationProps {
  theme: any
  soundEnabled: boolean
  onToggleSound: () => void
  unlockedAchievementsCount: number
  onShowAchievements: () => void
  showMobileMenu: boolean
  onToggleMobileMenu: () => void
  onLogoClick: () => void
  partyMode: boolean
}

export default function DashboardNavigation({
  theme,
  soundEnabled,
  onToggleSound,
  unlockedAchievementsCount,
  onShowAchievements,
  showMobileMenu,
  onToggleMobileMenu,
  onLogoClick,
  partyMode
}: DashboardNavigationProps) {
  return (
    <m.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(12px)", borderBottom: `1px solid ${theme.borderLight || '#e2e8f0'}`, ...(theme.bgNavStyle || {}) }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <m.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 sm:gap-3 cursor-pointer"
            onClick={onLogoClick}
          >
            <div className={`relative w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center ${partyMode ? 'animate-bounce' : ''}`}>
              <img src="/csync.png" alt="CareerSync" className="w-full h-full object-contain" />
            </div>
            <span className="text-sm sm:text-xl font-bold" style={theme.theme === 'light' ? { color: '#0f172a' } : { backgroundImage: 'linear-gradient(to right, #ff6b00, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              CareerSync
            </span>
          </m.div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSound}
              className="p-2 rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
              style={{ color: theme.textPrimary }}
              title={soundEnabled ? "Sound On" : "Sound Off"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShowAchievements}
              className="px-4 py-2 text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
              style={{ color: theme.textPrimary }}
            >
              <Trophy className="w-4 h-4" />
              <span>{unlockedAchievementsCount}</span>
            </m.button>

            <m.a
              href="/profile"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
              style={{ color: theme.textPrimary }}
            >
              Profile
            </m.a>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {}} // This will be handled by parent
              className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
              style={{
                background: theme.theme === 'light'
                  ? "linear-gradient(to right, #f59e0b, #f97316)"
                  : "linear-gradient(to right, #ff6b00, #ff8c00)",
                boxShadow: theme.theme === 'light'
                  ? "0 4px 14px rgba(245, 158, 11, 0.25)"
                  : "0 10px 30px rgba(255, 107, 0, 0.25)"
              }}
            >
              Sign Out
            </m.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSound}
              className="p-1.5 rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
              style={{ color: theme.textPrimary }}
              title={soundEnabled ? "Sound On" : "Sound Off"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleMobileMenu}
              className="p-1.5 rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
              style={{ color: theme.textPrimary }}
            >
              {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </m.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden mt-3 pb-2"
            >
              <div className="flex flex-col gap-2">
                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onShowAchievements()
                    onToggleMobileMenu()
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center justify-between"
                  style={{ color: theme.textPrimary }}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Achievements
                  </div>
                  <span className="text-xs" style={{ color: theme.textSecondary }}>{unlockedAchievementsCount}</span>
                </m.button>

                <m.a
                  href="/profile"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                  style={{ color: theme.textPrimary }}
                >
                  <User className="w-4 h-4" />
                  Profile
                </m.a>

                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // logout logic here
                    onToggleMobileMenu()
                  }}
                  className="w-full px-4 py-3 text-left text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  style={{
                    background: theme.theme === 'light'
                      ? "linear-gradient(to right, #f59e0b, #f97316)"
                      : "linear-gradient(to right, #ff6b00, #ff8c00)",
                    boxShadow: theme.theme === 'light'
                      ? "0 4px 14px rgba(245, 158, 11, 0.25)"
                      : "0 10px 30px rgba(255, 107, 0, 0.25)"
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </m.button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.nav>
  )
}