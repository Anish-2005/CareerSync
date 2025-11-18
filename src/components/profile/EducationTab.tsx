import { motion } from "framer-motion"
import { Calendar, Edit, Trash2, Plus } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  current: boolean
  gpa?: string
  description: string
}

interface EducationTabProps {
  education: Education[]
  onEditEducation: (educationId: string) => void
  onDeleteEducation: (educationId: string) => void
  onAddEducation: () => void
}

export default function EducationTab({ education, onEditEducation, onDeleteEducation, onAddEducation }: EducationTabProps) {
  const theme = useThemeClasses()

  return (
    <div className="space-y-4 sm:space-y-6">
      {education.map((edu, idx) => (
        <m.div
          key={edu.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="p-4 sm:p-8 rounded-3xl hover:border-2 transition-all duration-300"
          style={{ background: theme.bgCardStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style={{ color: theme.textPrimary }}>{edu.degree} in {edu.field}</h3>
              <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: theme.textAccent }}>{edu.institution}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4" style={{ color: theme.textTertiary }}>
                <span className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} - {
                    edu.current ? "Present" : edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"
                  }
                </span>
                {edu.current && (
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
                onClick={() => onEditEducation(edu.id)}
                className="p-2 rounded-lg"
                style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
              </m.button>
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDeleteEducation(edu.id)}
                className="p-2 rounded-lg"
                style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
              >
                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
              </m.button>
            </div>
          </div>
        </m.div>
      ))}

      <m.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: education.length * 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddEducation}
        className="w-full p-6 sm:p-8 rounded-3xl font-bold text-sm sm:text-base"
        style={{ border: `2px dashed ${theme.borderMedium}`, background: "transparent", color: theme.textAccent }}
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        <span style={{ marginLeft: 8 }}>Add New Education</span>
      </m.button>
    </div>
  )
}