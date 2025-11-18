import { motion } from "framer-motion"
import { Calendar, Edit, Trash2, Plus } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  current: boolean
  description: string
  location: string
}

interface ExperienceTabProps {
  experience: Experience[]
  onEditExperience: (experienceId: string) => void
  onDeleteExperience: (experienceId: string) => void
  onAddExperience: () => void
}

export default function ExperienceTab({ experience, onEditExperience, onDeleteExperience, onAddExperience }: ExperienceTabProps) {
  const theme = useThemeClasses()

  return (
    <div className="space-y-4 sm:space-y-6">
      {experience.map((exp, idx) => (
        <m.div
          key={exp.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="p-4 sm:p-8 rounded-3xl hover:border-2 transition-all duration-300"
          style={{ background: theme.bgCardStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style={{ color: theme.textPrimary }}>{exp.position}</h3>
              <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: theme.textAccent }}>{exp.company}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" style={{ color: theme.textTertiary }}>
                <span className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} - {
                    exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"
                  }
                </span>
                {exp.current && (
                  <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold" style={{ background: "rgba(0,255,136,0.12)", border: `1px solid rgba(0,255,136,0.28)`, color: "#00ff88" }}>
                    CURRENT
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEditExperience(exp.id)}
                className="p-2 rounded-lg"
                style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
              </m.button>
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDeleteExperience(exp.id)}
                className="p-2 rounded-lg"
                style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </m.button>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme.textTertiary }}>{exp.description}</p>
        </m.div>
      ))}

      <m.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: experience.length * 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddExperience}
        className="w-full p-6 sm:p-8 rounded-3xl font-bold text-sm sm:text-base"
        style={{ border: `2px dashed ${theme.borderMedium}`, background: "transparent", color: theme.textAccent }}
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        <span style={{ marginLeft: 8 }}>Add New Experience</span>
      </m.button>
    </div>
  )
}