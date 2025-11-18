import { motion } from "framer-motion"
import { User, Briefcase, GraduationCap, Settings } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

interface TabNavigationProps {
  activeTab: "profile" | "experience" | "education" | "settings"
  onTabChange: (tab: "profile" | "experience" | "education" | "settings") => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const theme = useThemeClasses()

  const tabs = [
    { label: "Profile", value: "profile", icon: User },
    { label: "Experience", value: "experience", icon: Briefcase },
    { label: "Education", value: "education", icon: GraduationCap },
    { label: "Settings", value: "settings", icon: Settings },
  ] as const

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.value
          return (
            <m.button
              key={tab.value}
              onClick={() => onTabChange(tab.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-1 sm:gap-2"
              style={{
                ...(isActive
                  ? { background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }
                  : {
                      background: theme.theme === 'light' ? 'rgba(248, 250, 252, 0.8)' : "rgba(26,58,82,0.38)",
                      border: `1px solid ${theme.borderMedium}`,
                      color: theme.textTertiary
                    }),
              }}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              {tab.label}
            </m.button>
          )
        })}
      </div>
    </m.div>
  )
}