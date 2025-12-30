import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Briefcase, ClipboardList, User, LogOut, LogIn } from 'lucide-react';

const m = motion as any;

interface MobileMenuProps {
  user: any;
  theme: any;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  logout: () => Promise<void>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, theme, showMobileMenu, setShowMobileMenu, logout }) => (
  <AnimatePresence>
    {showMobileMenu && (
      <m.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="sm:hidden fixed top-[73px] left-0 right-0 z-40 border-b border-[#00d4ff]/50"
        style={{ background: theme.bgNavStyle?.backgroundColor || '#ffffff', backdropFilter: "blur(12px)" }}
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
                  href="/applications"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMobileMenu(false)}
                  className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                  style={{ color: theme.textPrimary }}
                >
                  <ClipboardList className="w-4 h-4" />
                  Applications
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
                    await logout();
                    setShowMobileMenu(false);
                    window.location.href = '/';
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
                  setShowMobileMenu(false);
                  window.location.href = '/login';
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
);

export default MobileMenu;
