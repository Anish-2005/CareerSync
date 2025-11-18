"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useThemeClasses } from "@/hooks/useThemeClasses"
import ThemeToggle from "@/components/ThemeToggle"

const m = motion as any

export default function Navigation() {
  const { user, logout } = useAuth()
  const theme = useThemeClasses()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <m.nav
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`mb-20 fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b`}
      style={{ ...theme.bgNavStyle, borderColor: theme.borderLight, boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <m.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <m.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#ff6b00]/20 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <img src="/csync.png" alt="CareerSync" className="w-full h-full object-contain relative z-10" />
          </div>
          <span className="text-xl font-bold" style={theme.theme === 'light' ? { color: '#0f172a' } : theme.gradientText}>
            CareerSync
          </span>
        </m.div>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Contact", href: "#contact" },
          ].map((link, index) => (
            <m.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{
                color: theme.textAccent,
                scale: 1.1,
                textShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
              }}
              className={`transition-all duration-300 text-sm font-medium relative group`}
              style={{ color: theme.textSecondary }}
            >
              {link.label}
              <m.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: theme.textAccent }}
              />
            </m.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile menu toggle */}
          <m.button
            onClick={() => setMobileOpen(!mobileOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-md transition-all duration-300 relative overflow-hidden"
            style={{
              backgroundColor: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
              color: theme.textSecondary,
              border: theme.theme === 'light' ? `1px solid ${theme.borderMedium}` : undefined
            }}
            aria-label="Toggle menu"
          >
            <m.div
              className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-[#ff6b00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <m.div
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </m.div>
          </m.button>
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <m.a
                  href="/dashboard"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-sm font-medium rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                    color: theme.textSecondary,
                    border: theme.theme === 'light' ? `1px solid ${theme.borderMedium}` : `1px solid ${theme.borderMedium}`
                  }}
                >
                  Dashboard
                </m.a>
                <m.button
                  onClick={logout}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(255, 107, 0, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-sm font-bold rounded-full hover:shadow-lg transition-all duration-300"
                  style={{ ...theme.bgButtonStyle, color: '#ffffff' }}
                >
                  Logout
                </m.button>
              </>
            ) : (
              <>
                <m.a
                  href="/login"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-sm font-medium rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                    color: theme.textSecondary,
                    border: theme.theme === 'light' ? `1px solid ${theme.borderMedium}` : `1px solid ${theme.borderMedium}`
                  }}
                >
                  Login
                </m.a>
                <m.a
                  href="/login"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(255, 107, 0, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-sm font-bold rounded-full hover:shadow-lg transition-all duration-300"
                  style={{ ...theme.bgButtonStyle, color: '#ffffff' }}
                >
                  Sign Up
                </m.a>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileOpen && (
            <m.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`md:hidden absolute top-full left-0 right-0 ${theme.bgNavStyle} border-t backdrop-blur-sm z-40 shadow-2xl`}
              style={{ borderColor: theme.borderLight }}
            >
              <div className="px-6 py-6 flex flex-col gap-6">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How It Works", href: "#how-it-works" },
                  { label: "Pricing", href: "#pricing" },
                  { label: "Contact", href: "#contact" },
                ].map((link, index) => (
                  <m.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => setMobileOpen(false)}
                    className={`transition-colors duration-300 text-lg font-medium py-2 border-b`}
                    style={{ color: theme.textSecondary, borderColor: theme.borderLight }}
                  >
                    {link.label}
                  </m.a>
                ))}
                <div className="flex flex-col gap-4 pt-4 border-t" style={{ borderColor: theme.borderLight }}>
                  {user ? (
                    <>
                      <a href="/dashboard" onClick={() => setMobileOpen(false)} className="px-6 py-3 rounded-lg text-center font-medium transition-all duration-300" style={{
                        backgroundColor: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                        color: theme.textSecondary,
                        border: theme.theme === 'light' ? `1px solid ${theme.borderMedium}` : `1px solid ${theme.borderMedium}`
                      }}>Dashboard</a>
                      <button onClick={() => { setMobileOpen(false); logout(); }} className="px-6 py-3 rounded-lg text-center font-bold hover:shadow-lg transition-all duration-300" style={{ ...theme.bgButtonStyle, color: '#ffffff' }}>Logout</button>
                    </>
                  ) : (
                    <>
                      <a href="/login" onClick={() => setMobileOpen(false)} className="px-6 py-3 rounded-lg text-center font-medium transition-all duration-300" style={{
                        backgroundColor: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                        color: theme.textSecondary,
                        border: theme.theme === 'light' ? `1px solid ${theme.borderMedium}` : `1px solid ${theme.borderMedium}`
                      }}>Login</a>
                      <a href="/login" onClick={() => setMobileOpen(false)} className="px-6 py-3 rounded-lg text-center font-bold hover:shadow-lg transition-all duration-300" style={{ ...theme.bgButtonStyle, color: '#ffffff' }}>Sign Up</a>
                    </>
                  )}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.nav>
  )
}