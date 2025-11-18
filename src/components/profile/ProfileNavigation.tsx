import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, BarChart3, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useThemeClasses } from "@/hooks/useThemeClasses"
import ThemeToggle from "@/components/ThemeToggle"

const m = motion as any

interface ProfileNavigationProps {
  showMobileMenu: boolean
  onToggleMobileMenu: () => void
}

export default function ProfileNavigation({ showMobileMenu, onToggleMobileMenu }: ProfileNavigationProps) {
  const { logout } = useAuth()
  const theme = useThemeClasses()

  const safeBgNav = theme.bgNavStyle || {}
  const safeBorderLight = theme.borderLight || "#e2e8f0"

  return (
    <m.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(8px)", ...(safeBgNav as any), borderBottom: `1px solid ${safeBorderLight}` }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <m.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 sm:gap-3 cursor-pointer"
            onClick={() => window.location.href = '/'}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="relative w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
              <img src="/csync.png" alt="CareerSync" className="w-full h-full object-contain" />
            </div>
            <span style={{ fontSize: 18, fontWeight: 800, ...(theme.theme === 'light' ? { color: '#0f172a' } : theme.gradientText) }}>
              CareerSync
            </span>
          </m.div>

          {/* Desktop Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />
            <m.a
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-sm font-medium rounded-full"
              style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}`, paddingLeft: 20, paddingRight: 20 }}
            >
              Dashboard
            </m.a>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => logout()}
              className="px-6 py-2 text-sm font-bold rounded-full"
              style={{ color: "#fff", borderRadius: 9999, background: theme.theme === 'light' ? 'linear-gradient(90deg,#f59e0b,#d97706)' : 'linear-gradient(90deg,#ff6b00,#ff8c00)', paddingLeft: 20, paddingRight: 20 }}
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
              onClick={onToggleMobileMenu}
              className="p-1.5 rounded-full"
              style={{ color: theme.textPrimary, border: `1px solid ${theme.borderMedium}`, background: "transparent" }}
            >
              {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </m.button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMobileMenu && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden mt-3 pb-2"
            >
              <div className="flex flex-col gap-2">
                <m.a
                  href="/dashboard"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl flex items-center gap-2"
                  style={{ color: theme.textPrimary, border: `1px solid ${theme.borderMedium}` }}
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </m.a>

                <m.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    logout()
                    onToggleMobileMenu()
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-bold rounded-xl flex items-center gap-2"
                  style={{ color: "#fff", background: theme.theme === 'light' ? 'linear-gradient(90deg,#f59e0b,#d97706)' : 'linear-gradient(90deg,#ff6b00,#ff8c00)' }}
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