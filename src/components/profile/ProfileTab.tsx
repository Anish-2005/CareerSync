import { motion } from "framer-motion"
import { User, Mail, MapPin, Phone, Briefcase, Star, FileText, Upload, Globe, Linkedin, Github, Edit } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
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

interface ProfileTabProps {
  profile: Profile
  onEditProfile: () => void
  uploading: boolean
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFileDownload: (documentId: string, filename: string) => void
}

export default function ProfileTab({ profile, onEditProfile, uploading, onFileUpload, onFileDownload }: ProfileTabProps) {
  const { user } = useAuth()
  const theme = useThemeClasses()

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-4 sm:p-8 rounded-3xl overflow-hidden"
        style={{
          background: theme.bgCardStyle?.backgroundColor,
          border: `1px solid ${theme.borderMedium}`,
          boxShadow: undefined,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
          style={{ background: "linear-gradient(135deg, rgba(0, 212, 255, 0.14), transparent)" }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 sm:gap-8">
          {/* Avatar */}
          <div className="relative">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                crossOrigin="anonymous"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
                onError={(e) => {
                  // Hide the broken image and show fallback
                  (e.target as HTMLImageElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : null}
            {/* Fallback initials - always rendered but hidden when photo loads */}
            <div
              className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl font-bold ${(user?.photoURL) ? 'hidden' : ''}`}
              style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
            >
              {(profile.personalInfo.firstName + ' ' + profile.personalInfo.lastName).split(" ").map((n: string) => n[0]).join("")}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-3 sm:space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2" style={{ color: theme.textPrimary }}>{profile.personalInfo.firstName} {profile.personalInfo.lastName}</h2>
              <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: theme.textAccent }}>Software Engineer</p>
              <p className="text-sm sm:text-base" style={{ color: theme.textSecondary }}>{profile.personalInfo.location}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3" style={{ color: theme.textSecondary }}>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.textAccent }} />
                <span className="text-sm sm:text-base truncate">{profile.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3" style={{ color: theme.textSecondary }}>
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.textAccent }} />
                <span className="text-sm sm:text-base truncate">{profile.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3" style={{ color: theme.textSecondary }}>
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.textAccent }} />
                <span className="text-sm sm:text-base truncate">{profile.personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3" style={{ color: theme.textSecondary }}>
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: theme.textAccent }} />
                <span className="text-sm sm:text-base">{profile.experience.length} positions</span>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme.textTertiary }}>{profile.personalInfo.summary}</p>
          </div>

          {/* Edit Button */}
          <div className="flex gap-3">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEditProfile}
              className="px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold"
              style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
            >
              <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2">
                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                <span style={{ marginLeft: 8 }}>Edit Profile</span>
              </div>
            </m.button>
          </div>
        </div>
      </m.div>

      {/* Skills Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 sm:p-8 rounded-3xl"
        style={{
          background: theme.bgCardStyle?.backgroundColor,
          border: `1px solid ${theme.borderMedium}`,
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: theme.textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
          <Star className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#00ff88" }} />
          <span>Skills & Expertise</span>
        </h3>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {profile.skills.map((skill, idx) => (
            <m.span
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm"
              style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(29,78,216,0.08))' : 'linear-gradient(90deg, rgba(0,212,255,0.08), rgba(255,107,0,0.06))', border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
            >
              {skill.name}
            </m.span>
          ))}
        </div>
      </m.div>

      {/* Resume Section */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 sm:p-8 rounded-3xl"
        style={{
          background: theme.bgCardStyle?.backgroundColor,
          border: `1px solid ${theme.borderMedium}`,
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: theme.textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
          <FileText className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#00ff88" }} />
          <span>Documents & Files</span>
        </h3>

        {/* Upload Section */}
        <div className="mb-4 sm:mb-6">
          <label className="block">
            <div className="flex items-center justify-center w-full p-4 sm:p-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer" style={{ borderColor: `rgba(0,212,255,0.35)`, background: theme.bgInputStyle?.backgroundColor ? `${theme.bgInputStyle.backgroundColor}80` : undefined }}>
              <div className="text-center">
                <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" style={{ color: theme.textAccent }} />
                <p className="font-semibold mb-1 text-sm sm:text-base" style={{ color: theme.textPrimary }}>
                  {uploading ? 'Uploading...' : 'Upload Document'}
                </p>
                <p style={{ color: theme.textTertiary }} className="text-xs sm:text-sm">
                  PDF, DOC, DOCX, TXT up to 10MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={onFileUpload}
                disabled={uploading}
              />
            </div>
          </label>
        </div>

        {/* Documents List */}
        <div className="space-y-3 sm:space-y-4">
          {(profile.documents || []).map((doc, idx) => (
            <m.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-3 sm:p-4 rounded-xl"
              style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}` }}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <FileText className="w-4 h-4 sm:w-8 sm:h-8 flex-shrink-0" style={{ color: theme.textAccent }} />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-base" style={{ color: theme.textPrimary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.originalName}</p>
                  <p style={{ color: theme.textTertiary }} className="text-xs sm:text-sm">
                    {(doc.size / 1024 / 1024).toFixed(2)} MB • {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onFileDownload(doc.id, doc.originalName)}
                  className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-bold text-xs sm:text-sm"
                  style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
                >
                  Download
                </m.button>
              </div>
            </m.div>
          ))}

          {(!profile.documents || profile.documents.length === 0) && (
            <div className="text-center py-6 sm:py-8">
              <FileText className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4" style={{ color: theme.textTertiary }} />
              <p style={{ color: theme.textTertiary }} className="text-sm sm:text-base">No documents uploaded yet</p>
              <p style={{ color: theme.textSecondary }} className="text-xs sm:text-sm">Upload your resume, certificates, or other documents</p>
            </div>
          )}
        </div>
      </m.div>

      {/* Social Links */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-4 sm:p-8 rounded-3xl"
        style={{
          background: theme.bgCardStyle?.backgroundColor,
          border: `1px solid ${theme.borderMedium}`,
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: theme.textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
          <Globe className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#00ff88" }} />
          <span>Professional Links</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "LinkedIn", url: profile.personalInfo.linkedinUrl, icon: Linkedin },
            { label: "GitHub", url: profile.personalInfo.githubUrl, icon: Github },
            { label: "Portfolio", url: profile.personalInfo.portfolioUrl, icon: Globe },
          ].map((link, idx) => {
            const Icon = link.icon
            return (
              <m.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-3 sm:p-4 rounded-xl hover:border-2 transition-all duration-300"
                style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}` }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" style={{ color: theme.textAccent }} />
                  <span className="font-semibold text-sm sm:text-base" style={{ color: theme.textPrimary }}>{link.label}</span>
                </div>
                {link.url ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm sm:text-sm font-semibold"
                    style={{ color: theme.textAccent }}
                  >
                    Go to Profile
                  </a>
                ) : (
                  <span style={{ color: theme.textTertiary }} className="text-xs sm:text-sm italic">Not provided</span>
                )}
              </m.div>
            )
          })}
        </div>
      </m.div>
    </div>
  )
}