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

  // Handle photo upload
  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const token = await getIdToken()

      const formData = new FormData()
      formData.append('photo', file)

      const response = await fetch('/api/profile/photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload photo')
      }

      const data = await response.json()
      console.log('Photo uploaded successfully:', data.photoURL)

      // Update the user context with the new photo URL
      // Note: This assumes the AuthContext has a method to update user data
      // You may need to implement this in your AuthContext

      // For now, we'll refresh the profile to get the updated photoURL
      await fetchProfile()

      setError(null)
    } catch (error) {
      console.error('Photo upload error:', error)
      setError('Failed to upload photo')
    } finally {
      setUploading(false)
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

        {/* Navigation */}
        <m.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(8px)", ...(safeBgNav as any), borderBottom: `1px solid ${safeBorderLight}` }}
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

              {/* Desktop Buttons */}
              <div className="hidden sm:flex items-center gap-3">
                <ThemeToggle />
                <m.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-sm font-medium rounded-full"
                  style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}`, paddingLeft: 20, paddingRight: 20 }}
                >
                  Dashboard
                </m.a>
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => logout()}
                  className="px-6 py-2 text-sm font-bold rounded-full"
                  style={{ color: "#fff", borderRadius: 9999, background: "linear-gradient(90deg,#ff6b00,#ff8c00)", paddingLeft: 20, paddingRight: 20 }}
                >
                  Sign Out
                </m.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center gap-2">
                <ThemeToggle />
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-1.5 rounded-full"
                  style={{ color: theme.textPrimary, border: `1px solid ${theme.borderMedium}`, background: "transparent" }}
                >
                  {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </m.button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {showMobileMenu && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="sm:hidden mt-3 pb-2"
                >
                  <div className="flex flex-col gap-2">
                    <m.a
                      href="/dashboard"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl flex items-center gap-2"
                      style={{ color: theme.textPrimary, border: `1px solid ${theme.borderMedium}` }}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Dashboard
                    </m.a>

                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        logout()
                        setShowMobileMenu(false)
                      }}
                      className="w-full px-4 py-3 text-left text-sm font-bold rounded-xl flex items-center gap-2"
                      style={{ color: "#fff", background: "linear-gradient(90deg,#ff6b00,#ff8c00)" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </m.button>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </m.nav>

        {/* Background Effects */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <m.div
            className="absolute top-1/4 left-1/4"
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
              position: "absolute",
              top: "25%",
              left: "25%",
              width: 384,
              height: 384,
              opacity: 0.2,
              filter: "blur(40px)",
              background: safeMorph1,
            }}
          />
          <m.div
            className="absolute bottom-1/4 right-1/4"
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
              position: "absolute",
              bottom: "25%",
              right: "25%",
              width: 320,
              height: 320,
              opacity: 0.15,
              filter: "blur(30px)",
              background: safeMorph2,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-20 sm:pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 leading-none"
              style={{
                backgroundImage: theme.theme === 'light'
                  ? 'linear-gradient(135deg, #0c245dff 0%, #0e47a29d 50%, #4f7fc3ff 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: theme.textPrimary,
              }}
            >
               My Profile
            </h1>
            <p style={{ color: theme.textSecondary }} className="text-base sm:text-xl">Manage your professional profile and career information</p>
          </m.div>

          {/* Tab Navigation */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {[
                { label: "Profile", value: "profile", icon: User },
                { label: "Experience", value: "experience", icon: Briefcase },
                { label: "Education", value: "education", icon: GraduationCap },
                { label: "Settings", value: "settings", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon
                const active = activeTab === tab.value
                return (
                  <m.button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value as typeof activeTab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-1 sm:gap-2"
                    style={{
                      ...(active
                        ? { background: "linear-gradient(90deg,#ff6b00,#00d4ff)", color: "#fff", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }
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
                        {(profile.photoURL || user?.photoURL) ? (
                          <img
                            src={profile.photoURL || user?.photoURL || ''}
                            alt="Profile"
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
                          className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center text-white text-3xl sm:text-4xl font-bold ${(profile.photoURL || user?.photoURL) ? 'hidden' : ''}`}
                          style={{ background: "linear-gradient(90deg,#ff6b00,#00d4ff)", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}
                        >
                          {(profile.personalInfo.firstName + ' ' + profile.personalInfo.lastName).split(" ").map((n: string) => n[0]).join("")}
                        </div>
                        <m.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white"
                          style={{ background: "#00d4ff", border: "4px solid rgba(10,20,40,1)" }}
                          onClick={() => document.getElementById('photo-upload')?.click()}
                          disabled={uploading}
                        >
                          {uploading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </m.button>
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
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
                          onClick={handleEditProfile}
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
                          style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.08), rgba(255,107,0,0.06))", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
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
                            onChange={handleFileUpload}
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
                              onClick={() => handleFileDownload(doc.id, doc.originalName)}
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
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <div className="space-y-4 sm:space-y-6">
                  {profile.experience.map((exp, idx) => (
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
                            onClick={() => handleEditExperience(exp.id)}
                            className="p-2 rounded-lg"
                            style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </m.button>
                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteExperience(exp.id)}
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
                    transition={{ delay: profile.experience.length * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddExperience}
                    className="w-full p-6 sm:p-8 rounded-3xl font-bold text-sm sm:text-base"
                    style={{ border: `2px dashed ${theme.borderMedium}`, background: "transparent", color: theme.textAccent }}
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span style={{ marginLeft: 8 }}>Add New Experience</span>
                  </m.button>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <div className="space-y-4 sm:space-y-6">
                  {profile.education.map((edu, idx) => (
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
                            onClick={() => handleEditEducation(edu.id)}
                            className="p-2 rounded-lg"
                            style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
                          >
                            <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                          </m.button>
                          <m.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteEducation(edu.id)}
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
                    transition={{ delay: profile.education.length * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddEducation}
                    className="w-full p-6 sm:p-8 rounded-3xl font-bold text-sm sm:text-base"
                    style={{ border: `2px dashed ${theme.borderMedium}`, background: "transparent", color: theme.textAccent }}
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span style={{ marginLeft: 8 }}>Add New Education</span>
                  </m.button>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Account Settings */}
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 sm:p-8 rounded-3xl"
                    style={{ background: theme.bgCardStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: theme.textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#00ff88" }} />
                      <span>Account Settings</span>
                    </h3>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
                        <div>
                          <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Email Notifications</p>
                          <p style={{ color: theme.textTertiary }}>Receive updates about your applications</p>
                        </div>
                        <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,255,136,0.12)", border: `1px solid rgba(0,255,136,0.28)`, color: "#00ff88" }}><Check /></m.button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
                        <div>
                          <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Profile Visibility</p>
                          <p style={{ color: theme.textTertiary }}>Make your profile visible to recruiters</p>
                        </div>
                        <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,255,136,0.12)", border: `1px solid rgba(0,255,136,0.28)`, color: "#00ff88" }}><Check /></m.button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
                        <div>
                          <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Data Export</p>
                          <p style={{ color: theme.textTertiary }}>Download all your application data</p>
                        </div>
                        <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}>Export</m.button>
                      </div>
                    </div>
                  </m.div>

                  {/* Privacy Settings */}
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 sm:p-8 rounded-3xl"
                    style={{ background: theme.bgCardStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: theme.textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
                      <Bell className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#00ff88" }} />
                      <span>Privacy & Security</span>
                    </h3>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
                        <div>
                          <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Two-Factor Authentication</p>
                          <p style={{ color: theme.textTertiary }}>Add an extra layer of security</p>
                        </div>
                        <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(255,107,0,0.12)", border: `1px solid rgba(255,107,0,0.28)`, color: "#ff6b00" }}>Enable</m.button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
                        <div>
                          <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Change Password</p>
                          <p style={{ color: theme.textTertiary }}>Update your account password</p>
                        </div>
                        <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}>Change</m.button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
                        <div>
                          <p style={{ color: "#ff8a8a", fontWeight: 700 }}>Delete Account</p>
                          <p style={{ color: theme.textTertiary }}>Permanently delete your account and data</p>
                        </div>
                        <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}>Delete</m.button>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
              onClick={handleCancelEdit}
            >
              <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl"
                style={{ background: theme.bgModalStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}`, boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}
              >
                {/* --- modal content unchanged --- */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>Edit Profile</h2>
                  <m.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancelEdit}
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
                      onClick={handleCancelEdit}
                      className="flex-1 px-6 py-3 rounded-xl font-bold"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    >
                      Cancel
                    </m.button>
                    <m.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveProfile}
                      disabled={saving}
                      className="flex-1 px-6 py-3 rounded-xl font-bold"
                      style={{ background: "linear-gradient(90deg,#ff6b00,#00d4ff)", color: "#fff" }}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
              onClick={handleCancelAddExperience}
            >
              <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl"
                style={{ background: theme.bgModalStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>Add New Experience</h2>
                  <m.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancelAddExperience}
                    className="p-2 rounded-full"
                    style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                  >
                    <X className="w-6 h-6" />
                  </m.button>
                </div>

                <div className="space-y-6">
                  {/* Company and Position */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Company *</label>
                      <input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                        placeholder="e.g. Google, Microsoft"
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Position *</label>
                      <input
                        type="text"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                        placeholder="e.g. Software Engineer"
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Location</label>
                    <input
                      type="text"
                      value={newExperience.location}
                      onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Start Date *</label>
                      <input
                        type="date"
                        value={newExperience.startDate}
                        onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>End Date</label>
                      <input
                        type="date"
                        value={newExperience.endDate}
                        onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                        disabled={newExperience.current}
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary, opacity: newExperience.current ? 0.6 : 1 }}
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
                      className="w-4 h-4 rounded"
                      style={{ accentColor: theme.textAccent }}
                    />
                    <label htmlFor="current" style={{ color: theme.textPrimary, fontWeight: 700 }}>I currently work here</label>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Description</label>
                    <textarea
                      rows={4}
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      placeholder="Describe your responsibilities, achievements, and key contributions..."
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <m.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancelAddExperience}
                      className="flex-1 px-6 py-3 rounded-xl font-bold"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    >
                      Cancel
                    </m.button>
                    <m.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveNewExperience}
                      disabled={saving}
                      className="flex-1 px-6 py-3 rounded-xl font-bold"
                      style={{ background: "linear-gradient(90deg,#ff6b00,#00d4ff)", color: "#fff" }}
                    >
                      {saving ? 'Saving...' : 'Add Experience'}
                    </m.button>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Add Education Modal (similarly updated styles) */}
        <AnimatePresence>
          {isAddingEducation && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
              onClick={handleCancelAddEducation}
            >
              <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl"
                style={{ background: theme.bgModalStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold" style={{ color: theme.textPrimary }}>Add New Education</h2>
                  <m.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancelAddEducation}
                    className="p-2 rounded-full"
                    style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                  >
                    <X className="w-6 h-6" />
                  </m.button>
                </div>

                <div className="space-y-6">
                  {/* Institution and Degree */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Institution *</label>
                      <input
                        type="text"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        placeholder="e.g. Harvard University"
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Degree *</label>
                      <input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                        placeholder="e.g. Bachelor of Science"
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                      />
                    </div>
                  </div>

                  {/* Field of Study */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Field of Study *</label>
                    <input
                      type="text"
                      value={newEducation.field}
                      onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                      placeholder="e.g. Computer Science"
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    />
                  </div>

                  {/* GPA */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>GPA (Optional)</label>
                    <input
                      type="text"
                      value={newEducation.gpa}
                      onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                      placeholder="e.g. 3.8"
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Start Date *</label>
                      <input
                        type="date"
                        value={newEducation.startDate}
                        onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>End Date</label>
                      <input
                        type="date"
                        value={newEducation.endDate}
                        onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                        disabled={newEducation.current}
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary, opacity: newEducation.current ? 0.6 : 1 }}
                      />
                    </div>
                  </div>

                  {/* Currently Studying Checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="currentEducation"
                      checked={newEducation.current}
                      onChange={(e) => setNewEducation({ ...newEducation, current: e.target.checked, endDate: e.target.checked ? '' : newEducation.endDate })}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: theme.textAccent }}
                    />
                    <label htmlFor="currentEducation" style={{ color: theme.textPrimary, fontWeight: 700 }}>I am currently studying here</label>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Description (Optional)</label>
                    <textarea
                      rows={4}
                      value={newEducation.description}
                      onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                      placeholder="Describe your academic achievements, relevant coursework, or extracurricular activities..."
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <m.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancelAddEducation}
                      className="flex-1 px-6 py-3 rounded-xl font-bold"
                      style={{ background: theme.bgInputStyle?.backgroundColor || '#0f2540', border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    >
                      Cancel
                    </m.button>
                    <m.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveNewEducation}
                      disabled={saving}
                      className="flex-1 px-6 py-3 rounded-xl font-bold"
                      style={{ background: "linear-gradient(90deg,#ff6b00,#00d4ff)", color: "#fff" }}
                    >
                      {saving ? 'Saving...' : 'Add Education'}
                    </m.button>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
{/* Edit Experience Modal */}
      <AnimatePresence>
        {isEditingExperience && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={handleCancelEditExperience}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52] to-[#0f2540] border border-[#00d4ff]/30 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Edit Experience</h2>
                <m.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancelEditExperience}
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
                      value={editedExperience.company}
                      onChange={(e) => setEditedExperience({ ...editedExperience, company: e.target.value })}
                      placeholder="e.g. Google, Microsoft"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Position *</label>
                    <input
                      type="text"
                      value={editedExperience.position}
                      onChange={(e) => setEditedExperience({ ...editedExperience, position: e.target.value })}
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
                    value={editedExperience.location}
                    onChange={(e) => setEditedExperience({ ...editedExperience, location: e.target.value })}
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
                      value={editedExperience.startDate}
                      onChange={(e) => setEditedExperience({ ...editedExperience, startDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">End Date</label>
                    <input
                      type="date"
                      value={editedExperience.endDate}
                      onChange={(e) => setEditedExperience({ ...editedExperience, endDate: e.target.value })}
                      disabled={editedExperience.current}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Current Position Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="editCurrent"
                    checked={editedExperience.current}
                    onChange={(e) => setEditedExperience({ ...editedExperience, current: e.target.checked, endDate: e.target.checked ? '' : editedExperience.endDate })}
                    className="w-4 h-4 text-[#00d4ff] bg-[#0f2540] border-[#00d4ff]/20 rounded focus:ring-[#00d4ff] focus:ring-2"
                  />
                  <label htmlFor="editCurrent" className="text-white font-semibold">I currently work here</label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={editedExperience.description}
                    onChange={(e) => setEditedExperience({ ...editedExperience, description: e.target.value })}
                    placeholder="Describe your responsibilities, achievements, and key contributions..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelEditExperience}
                    className="flex-1 px-6 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white font-bold hover:border-[#00d4ff]/50 transition-all"
                  >
                    Cancel
                  </m.button>
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveEditedExperience}
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

      {/* Edit Education Modal */}
      <AnimatePresence>
        {isEditingEducation && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={handleCancelEditEducation}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52] to-[#0f2540] border border-[#00d4ff]/30 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Edit Education</h2>
                <m.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancelEditEducation}
                  className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
                >
                  <X className="w-6 h-6" />
                </m.button>
              </div>

              <div className="space-y-6">
                {/* Institution and Degree */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Institution *</label>
                    <input
                      type="text"
                      value={editedEducation.institution}
                      onChange={(e) => setEditedEducation({ ...editedEducation, institution: e.target.value })}
                      placeholder="e.g. Harvard University"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Degree *</label>
                    <input
                      type="text"
                      value={editedEducation.degree}
                      onChange={(e) => setEditedEducation({ ...editedEducation, degree: e.target.value })}
                      placeholder="e.g. Bachelor of Science"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Field of Study *</label>
                  <input
                    type="text"
                    value={editedEducation.field}
                    onChange={(e) => setEditedEducation({ ...editedEducation, field: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                  />
                </div>

                {/* GPA */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">GPA (Optional)</label>
                  <input
                    type="text"
                    value={editedEducation.gpa}
                    onChange={(e) => setEditedEducation({ ...editedEducation, gpa: e.target.value })}
                    placeholder="e.g. 3.8"
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                  />
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Start Date *</label>
                    <input
                      type="date"
                      value={editedEducation.startDate}
                      onChange={(e) => setEditedEducation({ ...editedEducation, startDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">End Date</label>
                    <input
                      type="date"
                      value={editedEducation.endDate}
                      onChange={(e) => setEditedEducation({ ...editedEducation, endDate: e.target.value })}
                      disabled={editedEducation.current}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Currently Studying Checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="editCurrentEducation"
                    checked={editedEducation.current}
                    onChange={(e) => setEditedEducation({ ...editedEducation, current: e.target.checked, endDate: e.target.checked ? '' : editedEducation.endDate })}
                    className="w-4 h-4 text-[#00d4ff] bg-[#0f2540] border-[#00d4ff]/20 rounded focus:ring-[#00d4ff] focus:ring-2"
                  />
                  <label htmlFor="editCurrentEducation" className="text-white font-semibold">I am currently studying here</label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Description (Optional)</label>
                  <textarea
                    rows={4}
                    value={editedEducation.description}
                    onChange={(e) => setEditedEducation({ ...editedEducation, description: e.target.value })}
                    placeholder="Describe your academic achievements, relevant coursework, or extracurricular activities..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancelEditEducation}
                    className="flex-1 px-6 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white font-bold hover:border-[#00d4ff]/50 transition-all"
                  >
                    Cancel
                  </m.button>
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={saveEditedEducation}
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
      </div>
    </RouteGuard>
  )
}
