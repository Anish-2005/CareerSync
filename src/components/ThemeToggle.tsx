"use client"

import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const m = motion as any

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full border transition-all duration-300
        light:bg-white/90 light:border-indigo-200 light:hover:border-indigo-400
        dark:bg-[#00d4ff]/10 dark:border-[#00d4ff]/50 dark:hover:border-[#00d4ff]"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5">
        <m.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : 180,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-[#00d4ff]" />
        </m.div>
        <m.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : -180,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </m.div>
      </div>
    </m.button>
  )
}
