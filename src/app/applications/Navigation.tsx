import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BarChart3, Briefcase, FileText, User, LogOut, LogIn } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const m = motion as any;

type ApplicationsNavigationProps = {
  user: any;
  theme: any;
  logout: () => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
};

export default function ApplicationsNavigation({
  user,
  theme,
  logout,
  showMobileMenu,
  setShowMobileMenu
}: ApplicationsNavigationProps) {
  return (
    <>
      <m.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: "blur(8px)",
          ...(theme.bgNavStyle as any),
          borderBottom: `1px solid ${theme.borderLight}`
        }}
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
              <span style={{
                fontSize: 18,
                fontWeight: 800,
                ...(theme.theme === 'light' ? { color: '#0f172a' } : theme.gradientText)
              }}>
                CareerSync
              </span>
            </m.div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-6">
              <ThemeToggle />
              {user ? (
                <>
                  <m.a
                    href="/dashboard"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{
                      color: theme.textPrimary,
                      borderRadius: 9999,
                      border: `1px solid ${theme.borderMedium}`
                    }}
                  >
                    Dashboard
                  </m.a>
                  <m.a
                    href="/jobs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{
                      color: theme.textPrimary,
                      borderRadius: 9999,
                      border: `1px solid ${theme.borderMedium}`
                    }}
                  >
                    Jobs
                  </m.a>
                  <m.a
                    href="/resume-builder"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{
                      color: theme.textPrimary,
                      borderRadius: 9999,
                      border: `1px solid ${theme.borderMedium}`
                    }}
                  >
                    Resume Builder
                  </m.a>
                  <m.a
                    href="/profile"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{
                      color: theme.textPrimary,
                      borderRadius: 9999,
                      border: `1px solid ${theme.borderMedium}`
                    }}
                  >
                    Profile
                  </m.a>
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      await logout()
                      window.location.href = '/'
                    }}
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
                </>
              ) : (
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/login'}
                  className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r hover:shadow-lg hover:shadow-[#3b82f6]/50 transition-all duration-300"
                  style={{
                    background: theme.theme === 'light'
                      ? "linear-gradient(to right, #3b82f6, #1d4ed8)"
                      : "linear-gradient(to right, #00d4ff, #ff6b00)",
                    boxShadow: theme.theme === 'light'
                      ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                      : "0 10px 30px rgba(0, 212, 255, 0.25)"
                  }}
                >
                  Sign In
                </m.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center gap-2">
              <ThemeToggle />
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-1.5 rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                style={{ color: theme.textPrimary }}
              >
                {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </m.button>
            </div>
          </div>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden fixed top-[73px] left-0 right-0 z-40 border-b border-[#00d4ff]/50"
            style={{
              background: theme.bgNavStyle?.backgroundColor || '#ffffff',
              backdropFilter: "blur(12px)"
            }}
          >
            <div className="max-w-7xl mx-auto px-3 py-2">
              <div className="flex flex-col gap-2">
                {user ? (
                  <>
                    <m.a
                      href="/dashboard"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowMobileMenu(false)}
                      className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                      style={{ color: theme.textPrimary }}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Dashboard
                    </m.a>

                    <m.a
                      href="/jobs"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowMobileMenu(false)}
                      className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                      style={{ color: theme.textPrimary }}
                    >
                      <Briefcase className="w-4 h-4" />
                      Jobs
                    </m.a>

                    <m.a
                      href="/resume-builder"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowMobileMenu(false)}
                      className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                      style={{ color: theme.textPrimary }}
                    >
                      <FileText className="w-4 h-4" />
                      Resume Builder
                    </m.a>

                    <m.a
                      href="/profile"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowMobileMenu(false)}
                      className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                      style={{ color: theme.textPrimary }}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </m.a>

                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        await logout()
                        setShowMobileMenu(false)
                        window.location.href = '/'
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
                  </>
                ) : (
                  <m.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowMobileMenu(false)
                      window.location.href = '/login'
                    }}
                    className="w-full px-4 py-3 text-left text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    style={{
                      background: theme.theme === 'light'
                        ? "linear-gradient(to right, #3b82f6, #1d4ed8)"
                        : "linear-gradient(to right, #00d4ff, #ff6b00)",
                      boxShadow: theme.theme === 'light'
                        ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                        : "0 10px 30px rgba(0, 212, 255, 0.25)"
                    }}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </m.button>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}