"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Edit,
  Save,
  X,
  Upload,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Settings,
  Shield,
  Bell,
  Globe,
  Camera,
  Plus,
  Trash2,
  Check,
  Star,
  Zap,
  Linkedin,
  Github,
} from "lucide-react"
import { RouteGuard } from "@/components/RouteGuard"
import { useAuth } from "@/contexts/AuthContext"

const m = motion as any

// Types matching MongoDB schema
interface Profile {
  _id: string
  userId: string
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

export default function ProfilePage() {
  const { user, logout, getIdToken } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"profile" | "experience" | "education" | "settings">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Profile | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isAddingExperience, setIsAddingExperience] = useState(false)
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: '',
  })

  // Fetch profile data from API
  const fetchProfile = async () => {
    try {
      setLoading(true)
      const token = await getIdToken()
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Profile fetch failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Profile fetch response:', data)
      setProfile(data.profile)
      setError(null)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  // Save profile to API
  const saveProfile = async () => {
    if (!editForm) return

    try {
      setSaving(true)
      const token = await getIdToken()
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Save failed:', response.status, errorText)
        throw new Error(`Failed to save profile: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setProfile(data.profile)
      setIsEditing(false)
      setError(null)
      // Switch to profile tab to show the updated links
      setActiveTab('profile')
    } catch (err) {
      console.error('Error saving profile:', err)
      setError('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  const handleEditProfile = () => {
    if (profile) {
      setEditForm({ ...profile })
      setIsEditing(true)
    }
  }

  const handleCancelEdit = () => {
    setEditForm(null)
    setIsEditing(false)
  }

  const handleAddExperience = () => {
    setIsAddingExperience(true)
  }

  const handleCancelAddExperience = () => {
    setIsAddingExperience(false)
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    })
  }

  const saveNewExperience = async () => {
    if (!newExperience.company.trim() || !newExperience.position.trim() || !newExperience.startDate) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      const token = await getIdToken()

      const experienceData = {
        ...newExperience,
        startDate: new Date(newExperience.startDate),
        endDate: newExperience.current ? undefined : newExperience.endDate ? new Date(newExperience.endDate) : undefined,
      }

      const response = await fetch('/api/profile/experience', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Save experience failed:', response.status, errorText)
        throw new Error(`Failed to save experience: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setProfile(data.profile)
      setIsAddingExperience(false)
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        location: '',
      })
      setError(null)
    } catch (err) {
      console.error('Error saving experience:', err)
      setError('Failed to save experience')
    } finally {
      setSaving(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const token = await getIdToken()

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        let errorMessage = 'Upload failed'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || 'Upload failed'
        } catch (parseError) {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text()
            errorMessage = errorText || 'Upload failed'
          } catch (textError) {
            errorMessage = 'Upload failed - unable to parse error response'
          }
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('Upload response data:', data)
      console.log('Document from response:', data.document)

      // Update profile state directly
      // Determine uploaded document(s) returned by the API and merge with existing documents
      const uploadedDoc = data.document ?? data.uploadedDocument ?? null
      const updatedDocuments = uploadedDoc
        ? [...(profile!.documents || []), uploadedDoc]
        : Array.isArray(data.documents)
        ? data.documents
        : [...(profile!.documents || [])]

      // Create a completely new profile object to ensure re-render
      const updatedProfile = {
        _id: profile!._id,
        userId: profile!.userId,
        personalInfo: { ...profile!.personalInfo },
        experience: [...profile!.experience],
        education: [...profile!.education],
        skills: [...profile!.skills],
        certifications: [...profile!.certifications],
        projects: [...profile!.projects],
        documents: updatedDocuments
      }

      setProfile(updatedProfile)
      console.log('Profile state updated, new documents:', updatedDocuments)

      // Reset file input
      event.target.value = ''

    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload file')
    } finally {
      setUploading(false)
    }
  }

  // Handle file download
  const handleFileDownload = async (documentId: string, filename: string) => {
    try {
      const token = await getIdToken()

      const response = await fetch(`/api/documents/download?id=${documentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Download failed')
      }

      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

    } catch (error) {
      console.error('Download error:', error)
      setError('Failed to download file')
    }
  }

  const addSkill = (skillName: string, category: string = 'Other') => {
    if (!editForm || !skillName.trim()) return

    const newSkill = {
      id: Date.now().toString(),
      name: skillName.trim(),
      level: 'beginner' as const,
      category,
    }

    setEditForm({
      ...editForm,
      skills: [...editForm.skills, newSkill],
    })
  }

  const removeSkill = (skillId: string) => {
    if (!editForm) return

    setEditForm({
      ...editForm,
      skills: editForm.skills.filter(skill => skill.id !== skillId),
    })
  }

  const addExperience = () => {
    if (!editForm) return

    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: new Date(),
      current: false,
      description: '',
      location: '',
    }

    setEditForm({
      ...editForm,
      experience: [...editForm.experience, newExperience],
    })
  }

  const updateExperience = (id: string, updates: Partial<Profile['experience'][0]>) => {
    if (!editForm) return

    setEditForm({
      ...editForm,
      experience: editForm.experience.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    })
  }

  const removeExperience = (id: string) => {
    if (!editForm) return

    setEditForm({
      ...editForm,
      experience: editForm.experience.filter(exp => exp.id !== id),
    })
  }

  const addEducation = () => {
    if (!editForm) return

    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: new Date(),
      current: false,
      description: '',
    }

    setEditForm({
      ...editForm,
      education: [...editForm.education, newEducation],
    })
  }

  const updateEducation = (id: string, updates: Partial<Profile['education'][0]>) => {
    if (!editForm) return

    setEditForm({
      ...editForm,
      education: editForm.education.map(edu =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    })
  }

  const removeEducation = (id: string) => {
    if (!editForm) return

    setEditForm({
      ...editForm,
      education: editForm.education.filter(edu => edu.id !== id),
    })
  }

  if (loading) {
    return (
      <RouteGuard>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#ff6b00]/20 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Loading Profile...</h3>
            <p className="text-gray-400">Fetching your profile data</p>
          </div>
        </div>
      </RouteGuard>
    )
  }

  if (error && !profile) {
    return (
      <RouteGuard>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428]">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ff4444]/20 to-[#ff6b00]/20 flex items-center justify-center">
              <X className="w-8 h-8 text-[#ff4444]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Failed to Load Profile</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchProfile}
              className="px-6 py-3 text-white font-bold rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </RouteGuard>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <RouteGuard>
      <div
        className="min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428]"
        style={{ fontFamily: '"Geist", sans-serif' }}
      >
      {/* Navigation */}
      <m.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1428]/80 border-b border-[#00d4ff]/20"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <m.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b00]/50">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              CareerSync
            </span>
          </m.div>

          <div className="flex items-center gap-3">
            <m.a
              href="/dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
            >
              Dashboard
            </m.a>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => logout()}
              className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
            >
              Sign Out
            </m.button>
          </div>
        </div>
      </m.nav>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing shapes */}
        <m.div
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
          animate={{
            borderRadius: ["50% 20% 80% 30%", "30% 80% 20% 70%", "80% 30% 50% 20%", "50% 20% 80% 30%"],
            rotate: [0, 90, 180, 360],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background: "linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(0, 212, 255, 0.3))",
            filter: "blur(40px)",
          }}
        />
        <m.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15"
          animate={{
            borderRadius: ["20% 80% 30% 70%", "70% 30% 80% 20%", "30% 70% 20% 80%", "20% 80% 30% 70%"],
            rotate: [360, 270, 180, 0],
            scale: [0.8, 1.3, 1, 0.8],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background: "linear-gradient(225deg, rgba(0, 255, 136, 0.2), rgba(255, 107, 0, 0.2))",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1
            className="text-6xl md:text-7xl font-black mb-4 leading-none"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%, #00ff88 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Profile
          </h1>
          <p className="text-xl text-gray-400">Manage your professional profile and career information</p>
        </m.div>

        {/* Tab Navigation */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { label: "Profile", value: "profile", icon: User },
              { label: "Experience", value: "experience", icon: Briefcase },
              { label: "Education", value: "education", icon: GraduationCap },
              { label: "Settings", value: "settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <m.button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as typeof activeTab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.value
                      ? "bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white shadow-lg"
                      : "bg-[#1a3a52]/60 border border-[#00d4ff]/20 text-gray-400 hover:text-white hover:border-[#00d4ff]/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </m.button>
              )
            })}
          </div>
        </m.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <m.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                {/* Profile Header */}
                <m.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 overflow-hidden"
                >
                  {/* Background glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
                    style={{ background: "linear-gradient(135deg, rgba(0, 212, 255, 0.4), transparent)" }}
                  />

                  <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {(profile.personalInfo.firstName + ' ' + profile.personalInfo.lastName).split(" ").map((n: string) => n[0]).join("")}
                      </div>
                      <m.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#00d4ff] border-4 border-[#0a1428] flex items-center justify-center text-white shadow-lg"
                      >
                        <Camera className="w-5 h-5" />
                      </m.button>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{profile.personalInfo.firstName} {profile.personalInfo.lastName}</h2>
                        <p className="text-xl text-[#00d4ff] font-semibold">Software Engineer</p>
                        <p className="text-gray-400">{profile.personalInfo.location}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-gray-400">
                          <Mail className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Phone className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <MapPin className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Briefcase className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.experience.length} positions</span>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed">{profile.personalInfo.summary}</p>
                    </div>

                    {/* Edit Button */}
                    <div className="flex gap-3">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEditProfile}
                        className="px-6 py-3 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-xl font-bold hover:bg-[#00d4ff]/30 transition-all duration-300 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </m.button>
                    </div>
                  </div>
                </m.div>

                {/* Skills Section */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Star className="w-6 h-6 text-[#00ff88]" />
                    Skills & Expertise
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {profile.skills.map((skill, idx) => (
                      <m.span
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-[#00d4ff]/20 to-[#ff6b00]/20 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] font-semibold text-sm"
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
                  className="p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#00ff88]" />
                    Documents & Files
                  </h3>

                  {/* Upload Section */}
                  <div className="mb-6">
                    <label className="block">
                      <div className="flex items-center justify-center w-full p-6 border-2 border-dashed border-[#00d4ff]/50 rounded-xl hover:border-[#00d4ff] transition-colors cursor-pointer bg-[#0f2540]/50">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-[#00d4ff] mx-auto mb-2" />
                          <p className="text-white font-semibold mb-1">
                            {uploading ? 'Uploading...' : 'Upload Document'}
                          </p>
                          <p className="text-gray-400 text-sm">
                            PDF, DOC, DOCX, TXT up to 10MB
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                      </div>
                    </label>
                  </div>

                  {/* Documents List */}
                  <div className="space-y-4">
                    {(profile.documents || []).map((doc, idx) => (
                      <m.div
                        key={doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20"
                      >
                        <div className="flex items-center gap-4">
                          <FileText className="w-8 h-8 text-[#00d4ff]" />
                          <div>
                            <p className="text-white font-semibold">{doc.originalName}</p>
                            <p className="text-gray-400 text-sm">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFileDownload(doc.id, doc.originalName)}
                            className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg font-bold hover:bg-[#00d4ff]/30 transition-all"
                          >
                            Download
                          </m.button>
                        </div>
                      </m.div>
                    ))}

                    {(!profile.documents || profile.documents.length === 0) && (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">No documents uploaded yet</p>
                        <p className="text-gray-500 text-sm">Upload your resume, certificates, or other documents</p>
                      </div>
                    )}
                  </div>
                </m.div>

                {/* Social Links */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-[#00ff88]" />
                    Professional Links
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          className="p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-6 h-6 text-[#00d4ff]" />
                            <span className="text-white font-semibold">{link.label}</span>
                          </div>
                          {link.url ? (
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors text-sm font-semibold"
                            >
                              Go to Profile
                            </a>
                          ) : (
                            <span className="text-gray-500 text-sm italic">Not provided</span>
                          )}
                        </m.div>
                      )
                    })}
                  </div>
                </m.div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                {profile.experience.map((exp, idx) => (
                  <m.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                        <p className="text-xl text-[#00d4ff] font-semibold mb-2">{exp.company}</p>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} - {
                              exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"
                            }
                          </span>
                          {exp.current && (
                            <span className="px-3 py-1 bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88] rounded-full text-xs font-bold">
                              CURRENT
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </m.button>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444] hover:bg-[#ff4444]/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </m.button>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </m.div>
                ))}

                <m.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: profile.experience.length * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddExperience}
                  className="w-full p-8 rounded-3xl border-2 border-dashed border-[#00d4ff]/50 text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 flex items-center justify-center gap-3 font-bold"
                >
                  <Plus className="w-6 h-6" />
                  Add New Experience
                </m.button>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <div className="space-y-6">
                {profile.education.map((edu, idx) => (
                  <m.div
                    key={edu.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{edu.degree} in {edu.field}</h3>
                        <p className="text-xl text-[#00d4ff] font-semibold mb-2">{edu.institution}</p>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(edu.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} - {
                              edu.current ? "Present" : edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"
                            }
                          </span>
                          {edu.current && (
                            <span className="px-3 py-1 bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88] rounded-full text-xs font-bold">
                              CURRENT
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </m.button>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444] hover:bg-[#ff4444]/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </m.button>
                      </div>
                    </div>
                  </m.div>
                ))}

                <m.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: profile.education.length * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addEducation}
                  className="w-full p-8 rounded-3xl border-2 border-dashed border-[#00d4ff]/50 text-[#00d4ff] hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 flex items-center justify-center gap-3 font-bold"
                >
                  <Plus className="w-6 h-6" />
                  Add New Education
                </m.button>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-8">
                {/* Account Settings */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-[#00ff88]" />
                    Account Settings
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20">
                      <div>
                        <p className="text-white font-semibold">Email Notifications</p>
                        <p className="text-gray-400 text-sm">Receive updates about your applications</p>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88] rounded-lg font-bold hover:bg-[#00ff88]/30 transition-all"
                      >
                        <Check className="w-4 h-4" />
                      </m.button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20">
                      <div>
                        <p className="text-white font-semibold">Profile Visibility</p>
                        <p className="text-gray-400 text-sm">Make your profile visible to recruiters</p>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88] rounded-lg font-bold hover:bg-[#00ff88]/30 transition-all"
                      >
                        <Check className="w-4 h-4" />
                      </m.button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20">
                      <div>
                        <p className="text-white font-semibold">Data Export</p>
                        <p className="text-gray-400 text-sm">Download all your application data</p>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg font-bold hover:bg-[#00d4ff]/30 transition-all"
                      >
                        Export
                      </m.button>
                    </div>
                  </div>
                </m.div>

                {/* Privacy Settings */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-[#00ff88]" />
                    Privacy & Security
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20">
                      <div>
                        <p className="text-white font-semibold">Two-Factor Authentication</p>
                        <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#ff6b00]/20 border border-[#ff6b00]/50 text-[#ff6b00] rounded-lg font-bold hover:bg-[#ff6b00]/30 transition-all"
                      >
                        Enable
                      </m.button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20">
                      <div>
                        <p className="text-white font-semibold">Change Password</p>
                        <p className="text-gray-400 text-sm">Update your account password</p>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg font-bold hover:bg-[#00d4ff]/30 transition-all"
                      >
                        Change
                      </m.button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20">
                      <div>
                        <p className="text-red-400 font-semibold">Delete Account</p>
                        <p className="text-gray-400 text-sm">Permanently delete your account and data</p>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444] rounded-lg font-bold hover:bg-[#ff4444]/30 transition-all"
                      >
                        Delete
                      </m.button>
                    </div>
                  </div>
                </m.div>
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={handleCancelEdit}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52] to-[#0f2540] border border-[#00d4ff]/30 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
                <m.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancelEdit}
                  className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
                >
                  <X className="w-6 h-6" />
                </m.button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={editForm?.personalInfo.firstName || ''}
                      onChange={(e) => setEditForm(editForm ? {
                        ...editForm,
                        personalInfo: { ...editForm.personalInfo, firstName: e.target.value }
                      } : null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={editForm?.personalInfo.lastName || ''}
                      onChange={(e) => setEditForm(editForm ? {
                        ...editForm,
                        personalInfo: { ...editForm.personalInfo, lastName: e.target.value }
                      } : null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      value={editForm?.personalInfo.email || ''}
                      onChange={(e) => setEditForm(editForm ? {
                        ...editForm,
                        personalInfo: { ...editForm.personalInfo, email: e.target.value }
                      } : null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editForm?.personalInfo.phone || ''}
                      onChange={(e) => setEditForm(editForm ? {
                        ...editForm,
                        personalInfo: { ...editForm.personalInfo, phone: e.target.value }
                      } : null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Location</label>
                  <input
                    type="text"
                    value={editForm?.personalInfo.location || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, location: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Summary</label>
                  <textarea
                    rows={4}
                    value={editForm?.personalInfo.summary || ''}
                    onChange={(e) => setEditForm(editForm ? {
                      ...editForm,
                      personalInfo: { ...editForm.personalInfo, summary: e.target.value }
                    } : null)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editForm?.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-full text-sm flex items-center gap-2"
                      >
                        {skill.name}
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="hover:text-red-400 transition-colors"
                        >
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
                      className="flex-1 px-4 py-2 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                    <button
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).previousElementSibling as HTMLInputElement
                        addSkill(input.value)
                        input.value = ''
                      }}
                      className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-xl font-bold hover:bg-[#00d4ff]/30 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Social Links */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={editForm?.personalInfo.linkedinUrl || ''}
                      onChange={(e) => setEditForm(editForm ? {
                        ...editForm,
                        personalInfo: { ...editForm.personalInfo, linkedinUrl: e.target.value }
                      } : null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">GitHub</label>
                    <input
                      type="url"
                      value={editForm?.personalInfo.githubUrl || ''}
                      onChange={(e) => setEditForm(editForm ? {
                        ...editForm,
                        personalInfo: { ...editForm.personalInfo, githubUrl: e.target.value }
                      } : null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Portfolio</label>
                    <input
                      type="url"
                      value={editForm?.personalInfo.portfolioUrl || ''}
                      onChange={(e) => setEditForm(editForm ? {
                        ...editForm,
                        personalInfo: { ...editForm.personalInfo, portfolioUrl: e.target.value }
                      } : null)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelEdit}
                    className="flex-1 px-6 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white font-bold hover:border-[#00d4ff]/50 transition-all"
                  >
                    Cancel
                  </m.button>
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveProfile}
                    disabled={saving}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </m.button>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Add Experience Modal */}
      <AnimatePresence>
        {isAddingExperience && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={handleCancelAddExperience}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52] to-[#0f2540] border border-[#00d4ff]/30 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Add New Experience</h2>
                <m.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancelAddExperience}
                  className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
                >
                  <X className="w-6 h-6" />
                </m.button>
              </div>

              <div className="space-y-6">
                {/* Company and Position */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Company *</label>
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      placeholder="e.g. Google, Microsoft"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Position *</label>
                    <input
                      type="text"
                      value={newExperience.position}
                      onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                      placeholder="e.g. Software Engineer"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Location</label>
                  <input
                    type="text"
                    value={newExperience.location}
                    onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                  />
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Start Date *</label>
                    <input
                      type="date"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">End Date</label>
                    <input
                      type="date"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                      disabled={newExperience.current}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Current Position Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="current"
                    checked={newExperience.current}
                    onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked, endDate: e.target.checked ? '' : newExperience.endDate })}
                    className="w-4 h-4 text-[#00d4ff] bg-[#0f2540] border-[#00d4ff]/20 rounded focus:ring-[#00d4ff] focus:ring-2"
                  />
                  <label htmlFor="current" className="text-white font-semibold">I currently work here</label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    placeholder="Describe your responsibilities, achievements, and key contributions..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelAddExperience}
                    className="flex-1 px-6 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white font-bold hover:border-[#00d4ff]/50 transition-all"
                  >
                    Cancel
                  </m.button>
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveNewExperience}
                    disabled={saving}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? 'Saving...' : 'Add Experience'}
                  </m.button>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  </RouteGuard>
  )
}
