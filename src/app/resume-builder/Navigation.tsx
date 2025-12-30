import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';

const m = motion as any;

type NavigationProps = {
  user?: any;
  theme: {
    bgNavStyle?: React.CSSProperties;
    borderLight?: string;
    theme?: string;
    gradientText?: React.CSSProperties;
    textPrimary?: string;
  };
  logout?: () => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
};

export default function Navigation({ user, theme, logout, showMobileMenu, setShowMobileMenu }: NavigationProps) {
  return (
    <m.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(8px)", ...(theme.bgNavStyle as any), borderBottom: `1px solid ${theme.borderLight}` }}
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

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            <m.a
              href="/home"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
              style={{ color: theme.textPrimary }}
            >
              Home
            </m.a>
            <m.a
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
              style={{ color: theme.textPrimary }}
            >
              Dashboard
            </m.a>
            <ThemeToggle />
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
              {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
            </m.button>
          </div>
        </div>
      </div>
    </m.nav>
  );
}
