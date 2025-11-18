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
  Menu,
  LogOut,
  BarChart3,
} from "lucide-react"
import { RouteGuard } from "@/components/RouteGuard"
import { useAuth } from "@/contexts/AuthContext"
import { useThemeClasses } from "@/hooks/useThemeClasses"
import ThemeToggle from "@/components/ThemeToggle"
import ProfileNavigation from "@/components/profile/ProfileNavigation"
import BackgroundEffects from "@/components/profile/BackgroundEffects"
import ProfileHeader from "@/components/profile/ProfileHeader"
import TabNavigation from "@/components/profile/TabNavigation"
import ProfileTab from "@/components/profile/ProfileTab"
import ExperienceTab from "@/components/profile/ExperienceTab"
import EducationTab from "@/components/profile/EducationTab"
import SettingsTab from "@/components/profile/SettingsTab"
import EditProfileModal from "@/components/profile/EditProfileModal"
import AddExperienceModal from "@/components/profile/AddExperienceModal"
import AddEducationModal from "@/components/profile/AddEducationModal"
import EditExperienceModal from "@/components/profile/EditExperienceModal"
import EditEducationModal from "@/components/profile/EditEducationModal"

const m = motion as any

// Types matching MongoDB schema
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

export default function ProfilePage() {
  const { user, logout, getIdToken } = useAuth()
  const theme = useThemeClasses()
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
  const [isAddingEducation, setIsAddingEducation] = useState(false)
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: '',
  })
  const [isEditingExperience, setIsEditingExperience] = useState(false)
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null)
  const [editedExperience, setEditedExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    location: '',
  })
  const [isEditingEducation, setIsEditingEducation] = useState(false)
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null)
  const [editedEducation, setEditedEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: '',
  })
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Migrate profile data to fix inconsistencies
  const migrateProfileData = async () => {
    try {
      console.log('Frontend: Starting migration process...')
      const token = await getIdToken()
      const response = await fetch('/api/profile/migrate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.error('Migration failed:', response.status)
        return
      }

      const data = await response.json()
      console.log('Migration completed:', data)
    } catch (error) {
      console.error('Migration error:', error)
    }
  }

  // Fetch profile data
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
      console.log('Backend: Experience IDs in database:', data.profile?.experience?.map((exp: any) => ({ id: exp.id, type: typeof exp.id })) || [])

      // Check if migration is needed
      const needsMigration = data.profile?.experience?.some((exp: any) => !exp.id) ||
          data.profile?.education?.some((edu: any) => !edu.id) ||
          data.profile?.skills?.some((skill: any) => !skill.id)

      console.log('Frontend: Migration needed?', needsMigration)

      if (needsMigration) {
        console.log('Running data migration...')
        await migrateProfileData()
        // Re-fetch profile after migration
        const migratedResponse = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (migratedResponse.ok) {
          const migratedData = await migratedResponse.json()
          setProfile({
            ...migratedData.profile,
            photoURL: migratedData.photoURL || undefined
          })
        }
      } else {
        setProfile({
          ...data.profile,
          photoURL: data.photoURL || undefined
        })
      }

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
      console.log('User object:', user)
      console.log('User photoURL:', user.photoURL)
      console.log('User provider data:', user.providerData)
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

  const handleAddEducation = () => {
    setIsAddingEducation(true)
  }

  const handleCancelAddEducation = () => {
    setIsAddingEducation(false)
    setNewEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    })
  }

  const saveNewEducation = async () => {
    if (!newEducation.institution.trim() || !newEducation.degree.trim() || !newEducation.field.trim() || !newEducation.startDate) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      const token = await getIdToken()

      const educationData = {
        ...newEducation,
        startDate: new Date(newEducation.startDate),
        endDate: newEducation.current ? undefined : newEducation.endDate ? new Date(newEducation.endDate) : undefined,
      }

      const response = await fetch('/api/profile/education', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Save education failed:', response.status, errorText)
        throw new Error(`Failed to save education: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setProfile(data.profile)
      setIsAddingEducation(false)
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        description: '',
      })
      setError(null)
    } catch (err) {
      console.error('Error saving education:', err)
      setError('Failed to save education')
    } finally {
      setSaving(false)
    }
  }

  const handleEditExperience = (experienceId: string) => {
    const experience = profile?.experience.find(exp => exp.id === experienceId)
    if (experience) {
      setEditedExperience({
        company: experience.company,
        position: experience.position,
        startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
        endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
        current: experience.current || false,
        description: experience.description || '',
        location: experience.location || '',
      })
      setEditingExperienceId(experienceId)
      setIsEditingExperience(true)
    }
  }

  const handleCancelEditExperience = () => {
    setIsEditingExperience(false)
    setEditingExperienceId(null)
    setEditedExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    })
  }

  const saveEditedExperience = async () => {
    if (!editedExperience.company.trim() || !editedExperience.position.trim() || !editedExperience.startDate) {
      setError('Please fill in all required fields')
      setTimeout(() => setError(null), 3000)
      return
    }

    try {
      setSaving(true)
      setError(null)
      const token = await getIdToken()

      console.log('Frontend: editingExperienceId:', editingExperienceId)
      console.log('Frontend: editingExperienceId type:', typeof editingExperienceId)

      const experienceData = {
        ...editedExperience,
        startDate: new Date(editedExperience.startDate),
        endDate: editedExperience.current ? undefined : editedExperience.endDate ? new Date(editedExperience.endDate) : undefined,
      }

      console.log('Frontend: experienceData:', experienceData)
      console.log('Frontend: sending PUT request to:', `/api/profile/experience/${editingExperienceId}`)

      const response = await fetch(`/api/profile/experience/${editingExperienceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienceData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Save edited experience failed:', response.status, errorText)
        throw new Error(`Failed to save experience: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('Experience updated successfully:', data)
      setProfile(data.profile)
      handleCancelEditExperience()
      setError(null)
    } catch (err) {
      console.error('Error saving edited experience:', err)
      const errorMsg = err instanceof Error ? err.message : 'Failed to save experience'
      setError(errorMsg)
      setTimeout(() => setError(null), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleEditEducation = (educationId: string) => {
    const education = profile?.education.find(edu => edu.id === educationId)
    if (education) {
      setEditedEducation({
        institution: education.institution,
        degree: education.degree,
        field: education.field,
        startDate: education.startDate ? new Date(education.startDate).toISOString().split('T')[0] : '',
        endDate: education.endDate ? new Date(education.endDate).toISOString().split('T')[0] : '',
        current: education.current || false,
        gpa: education.gpa || '',
        description: education.description || '',
      })
      setEditingEducationId(educationId)
      setIsEditingEducation(true)
    }
  }

  const handleCancelEditEducation = () => {
    setIsEditingEducation(false)
    setEditingEducationId(null)
    setEditedEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    })
  }

  const saveEditedEducation = async () => {
    if (!editedEducation.institution.trim() || !editedEducation.degree.trim() || !editedEducation.field.trim() || !editedEducation.startDate) {
      setError('Please fill in all required fields')
      setTimeout(() => setError(null), 3000)
      return
    }

    try {
      setSaving(true)
      setError(null)
      const token = await getIdToken()

      const educationData = {
        ...editedEducation,
        startDate: new Date(editedEducation.startDate),
        endDate: editedEducation.current ? undefined : editedEducation.endDate ? new Date(editedEducation.endDate) : undefined,
      }

      console.log('Frontend: editingEducationId:', editingEducationId)
      console.log('Frontend: educationData:', educationData)

      const response = await fetch(`/api/profile/education/${editingEducationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Save edited education failed:', response.status, errorText)
        throw new Error(`Failed to save education: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log('Education updated successfully:', data)
      setProfile(data.profile)
      handleCancelEditEducation()
      setError(null)
    } catch (err) {
      console.error('Error saving edited education:', err)
      const errorMsg = err instanceof Error ? err.message : 'Failed to save education'
      setError(errorMsg)
      setTimeout(() => setError(null), 5000)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteExperience = async (experienceId: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) {
      return
    }

    try {
      setSaving(true)
      const token = await getIdToken()

      const response = await fetch(`/api/profile/experience/${experienceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Delete experience failed:', response.status, errorText)
        throw new Error(`Failed to delete experience: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setProfile(data.profile)
      setError(null)
    } catch (err) {
      console.error('Error deleting experience:', err)
      setError('Failed to delete experience')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteEducation = async (educationId: string) => {
    if (!confirm('Are you sure you want to delete this education?')) {
      return
    }

    try {
      setSaving(true)
      const token = await getIdToken()

      const response = await fetch(`/api/profile/education/${educationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Delete education failed:', response.status, errorText)
        throw new Error(`Failed to delete education: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setProfile(data.profile)
      setError(null)
    } catch (err) {
      console.error('Error deleting education:', err)
      setError('Failed to delete education')
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

      const uploadedDoc = data.document ?? data.uploadedDocument ?? null
      const updatedDocuments = uploadedDoc
        ? [...(profile!.documents || []), uploadedDoc]
        : Array.isArray(data.documents)
        ? data.documents
        : [...(profile!.documents || [])]

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

  // --- RENDER HANDLING USING theme hook's inline style objects ---
  // Fallback helpers
  const safeBgPrimary = theme.bgPrimaryStyle || {}
  const safeBgNav = theme.bgNavStyle || {}
  const safeBorderLight = theme.borderLight || (theme.borderMedium || "#e2e8f0")
  const safeMorph1 = theme.morphShape1 || "linear-gradient(135deg, rgba(255,107,0,0.3), rgba(0,212,255,0.3))"
  const safeMorph2 = theme.morphShape2 || "linear-gradient(225deg, rgba(0,255,136,0.2), rgba(255,107,0,0.2))"

  if (loading) {
    return (
      <RouteGuard>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", ...(safeBgPrimary as any) }}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full" style={{ background: "linear-gradient(to bottom right, rgba(0,212,255,0.12), rgba(255,107,0,0.12))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>Loading Profile...</h3>
            <p style={{ color: theme.textSecondary }}>Fetching your profile data</p>
          </div>
        </div>
      </RouteGuard>
    )
  }

  if (error && !profile) {
    return (
      <RouteGuard>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", ...(safeBgPrimary as any) }}>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full" style={{ background: "linear-gradient(to bottom right, rgba(255,68,68,0.12), rgba(255,107,0,0.12))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X className="w-8 h-8" style={{ color: "#ff4444" }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>Failed to Load Profile</h3>
            <p style={{ color: theme.textSecondary }} className="mb-6">{error}</p>
            <button
              onClick={fetchProfile}
              className="px-6 py-3 font-bold rounded-xl"
              style={{ color: "#fff", background: "linear-gradient(90deg,#ff6b00,#00d4ff)", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
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
      <div style={{ minHeight: "100vh", overflow: "hidden", fontFamily: '"Geist", sans-serif', ...(safeBgPrimary as any) }}>
        {/* Error Notification */}
        <AnimatePresence>
          {error && (
            <m.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", zIndex: 50, maxWidth: 640, width: "calc(100% - 2rem)" }}
            >
              <div style={{ padding: 16, borderRadius: 16, background: "linear-gradient(90deg, rgba(255,68,68,0.95), rgba(255,107,0,0.95))", backdropFilter: "blur(6px)", border: `1px solid rgba(255,68,68,0.2)`, boxShadow: "0 10px 30px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: 12 }}>
                <X style={{ width: 20, height: 20, color: "#fff", flexShrink: 0 }} />
                <p style={{ color: "#fff", fontWeight: 700, flex: 1 }}>{error}</p>
                <button onClick={() => setError(null)} style={{ padding: 6, borderRadius: 8, background: "transparent", border: "none", color: "#fff" }}>
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        <ProfileNavigation
          showMobileMenu={showMobileMenu}
          onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
        />

        <BackgroundEffects />

        {/* Main Content */}
        <div className="relative z-10 pt-20 sm:pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <ProfileHeader />

          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <m.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {activeTab === "profile" && (
                <ProfileTab
                  profile={profile}
                  onEditProfile={handleEditProfile}
                  uploading={uploading}
                  onFileUpload={handleFileUpload}
                  onFileDownload={handleFileDownload}
                />
              )}

              {activeTab === "experience" && (
                <ExperienceTab
                  experience={profile.experience}
                  onEditExperience={handleEditExperience}
                  onDeleteExperience={handleDeleteExperience}
                  onAddExperience={handleAddExperience}
                />
              )}

              {activeTab === "education" && (
                <EducationTab
                  education={profile.education}
                  onEditEducation={handleEditEducation}
                  onDeleteEducation={handleDeleteEducation}
                  onAddEducation={handleAddEducation}
                />
              )}

              {activeTab === "settings" && (
                <SettingsTab />
              )}
            </m.div>
          </AnimatePresence>
        </div>

        <EditProfileModal
          isOpen={isEditing}
          onClose={handleCancelEdit}
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={saveProfile}
          saving={saving}
          addSkill={addSkill}
          removeSkill={removeSkill}
        />

        <AddExperienceModal
          isOpen={isAddingExperience}
          onClose={handleCancelAddExperience}
          formData={newExperience}
          setFormData={setNewExperience}
          onSave={saveNewExperience}
          saving={saving}
        />

        <AddEducationModal
          isOpen={isAddingEducation}
          onClose={handleCancelAddEducation}
          formData={newEducation}
          setFormData={setNewEducation}
          onSave={saveNewEducation}
          saving={saving}
        />

        <EditExperienceModal
          isOpen={isEditingExperience}
          onClose={handleCancelEditExperience}
          experience={profile?.experience.find(exp => exp.id === editingExperienceId) || null}
          formData={editedExperience}
          setFormData={setEditedExperience}
          onSave={saveEditedExperience}
          saving={saving}
        />

        <EditEducationModal
          isOpen={isEditingEducation}
          onClose={handleCancelEditEducation}
          education={profile?.education.find(edu => edu.id === editingEducationId) || null}
          formData={editedEducation}
          setFormData={setEditedEducation}
          onSave={saveEditedEducation}
          saving={saving}
        />
      </div>
    </RouteGuard>
  )
}
