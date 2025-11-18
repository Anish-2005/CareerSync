import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

interface Profile {
  _id: string
  userId: string
  photoURL?: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    linkedinUrl: string
    githubUrl: string
    portfolioUrl: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: Date
    endDate?: Date
    current: boolean
    description: string
    location: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: Date
    endDate?: Date
    current: boolean
    gpa?: string
    description: string
  }>
  skills: Array<{
    id: string
    name: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    category: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    issueDate: Date
    expiryDate?: Date
    credentialId: string
    credentialUrl: string
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    startDate: Date
    endDate?: Date
    current: boolean
    projectUrl: string
    githubUrl: string
  }>
  documents: Array<{
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    uploadedAt: Date;
    gridFsId: string;
  }>;
}

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  editForm: Profile | null
  setEditForm: (form: Profile | null) => void
  onSave: () => void
  saving: boolean
  addSkill: (skillName: string, category?: string) => void
  removeSkill: (skillId: string) => void
}

export default function EditProfileModal({
  isOpen,
  onClose,
  editForm,
  setEditForm,
  onSave,
  saving,
  addSkill,
  removeSkill
}: EditProfileModalProps) {
  const theme = useThemeClasses()

  if (!editForm) return null

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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl"
            style={{ background: theme.bgModalStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}`, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>Edit Profile</h2>
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
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>First Name *</label>
                  <input
                    type="text"
                    value={editForm?.personalInfo.firstName || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, firstName: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Last Name *</label>
                  <input
                    type="text"
                    value={editForm?.personalInfo.lastName || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, lastName: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Email *</label>
                  <input
                    type="email"
                    value={editForm?.personalInfo.email || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, email: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Phone</label>
                  <input
                    type="tel"
                    value={editForm?.personalInfo.phone || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, phone: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Location</label>
                <input
                  type="text"
                  value={editForm?.personalInfo.location || ''}
                  onChange={(e) => setEditForm(editForm ? {
                    ...editForm,
                    personalInfo: { ...editForm.personalInfo, location: e.target.value }
                  } : null)}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Summary</label>
                <textarea
                  rows={4}
                  value={editForm?.personalInfo.summary || ''}
                  onChange={(e) => setEditForm(editForm ? {
                    ...editForm,
                    personalInfo: { ...editForm.personalInfo, summary: e.target.value }
                  } : null)}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                  style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Skills</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {editForm?.skills.map((skill) => (
                    <span key={skill.id} className="px-3 py-1 rounded-full text-sm flex items-center gap-2" style={{ background: "rgba(0,212,255,0.08)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}>
                      {skill.name}
                      <button onClick={() => removeSkill(skill.id)} className="hover:text-red-400 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement
                        addSkill(input.value)
                        input.value = ''
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement
                      addSkill(input.value)
                      input.value = ''
                    }}
                    className="px-4 py-2 rounded-xl font-bold"
                    style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>LinkedIn</label>
                  <input
                    type="url"
                    value={editForm?.personalInfo.linkedinUrl || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, linkedinUrl: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>GitHub</label>
                  <input
                    type="url"
                    value={editForm?.personalInfo.githubUrl || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, githubUrl: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Portfolio</label>
                  <input
                    type="url"
                    value={editForm?.personalInfo.portfolioUrl || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, portfolioUrl: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                  />
                </div>
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
                  {saving ? 'Saving...' : 'Save Changes'}
                </m.button>
              </div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}