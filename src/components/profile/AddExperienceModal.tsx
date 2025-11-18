import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

interface AddExperienceModalProps {
  isOpen: boolean
  onClose: () => void
  formData: {
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    location: string
  }
  setFormData: (data: any) => void
  onSave: () => void
  saving: boolean
}

export default function AddExperienceModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
  saving
}: AddExperienceModalProps) {
  const theme = useThemeClasses()

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          <m.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl"
            style={{ background: theme.bgModalStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}`, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>Add Experience</h2>
              <m.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full"
                style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
              >
                <X className="w-6 h-6" />
              </m.button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Position *</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all disabled:opacity-50"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="current"
                  checked={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: theme.textAccent }}
                />
                <label htmlFor="current" className="text-sm font-bold" style={{ color: theme.textPrimary }}>
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                  style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <m.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl font-bold"
                  style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                >
                  Cancel
                </m.button>
                <m.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSave}
                  disabled={saving}
                  className="flex-1 px-6 py-3 rounded-xl font-bold"
                  style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                >
                  {saving ? 'Adding...' : 'Add Experience'}
                </m.button>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}