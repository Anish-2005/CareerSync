'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Eye, Edit, Plus, Trash2, Save, Palette } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import ThemeToggle from '@/components/ThemeToggle'

const m = motion as any

interface ResumeData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    linkedin?: string
    github?: string
    portfolio?: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    current: boolean
    gpa?: string
  }>
  skills: Array<{
    id: string
    name: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    url?: string
  }>
}

export default function ResumeBuilderPage() {
  const { user } = useAuth()
  const theme = useThemeClasses()
  const morphBg = theme.theme === 'light' ? 'linear-gradient(135deg, rgba(59,130,246,0.6), rgba(29,78,216,0.6))' : 'linear-gradient(135deg, rgba(255,107,0,0.6), rgba(0,212,255,0.6))'
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  })
  const [activeSection, setActiveSection] = useState('personal')
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [previewMode, setPreviewMode] = useState(false)

  // Load user data on mount
  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    setResumeData({
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies.'
      },
      experience: [
        {
          id: '1',
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2022-01',
          endDate: '',
          current: true,
          description: 'Lead development of scalable web applications using React, Node.js, and AWS. Mentor junior developers and collaborate with cross-functional teams.'
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          current: false,
          gpa: '3.8'
        }
      ],
      skills: [
        { id: '1', name: 'JavaScript', level: 'expert' },
        { id: '2', name: 'React', level: 'expert' },
        { id: '3', name: 'Node.js', level: 'advanced' },
        { id: '4', name: 'Python', level: 'intermediate' }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with payment integration',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          url: 'github.com/johndoe/ecommerce'
        }
      ]
    })
  }, [])

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }))
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: ''
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }))
  }

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 'beginner' as const
    }
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: ''
    }
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }))
  }

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }))
  }

  const exportResume = () => {
    // In a real app, this would generate and download a PDF
    alert('Resume export functionality would be implemented here')
  }

  const templates = [
    { id: 'modern', name: 'Modern', preview: 'Clean and contemporary design' },
    { id: 'professional', name: 'Professional', preview: 'Traditional corporate style' },
    { id: 'creative', name: 'Creative', preview: 'Unique and eye-catching layout' }
  ]

  return (
    <RouteGuard>
      <div style={{ minHeight: "100vh", overflow: "hidden", fontFamily: '"Geist", sans-serif', ...(theme.bgPrimaryStyle as any) }}>
        {/* Navigation */}
        <m.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(8px)", ...(theme.bgNavStyle as any), borderBottom: `1px solid ${theme.borderLight}` }}
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

              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center gap-6">
                <ThemeToggle />
                <m.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium rounded-full"
                  style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                >
                  Dashboard
                </m.a>
                <m.a
                  href="/jobs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium rounded-full"
                  style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                >
                  Jobs
                </m.a>
                <m.a
                  href="/applications"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium rounded-full"
                  style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                >
                  Applications
                </m.a>
                <m.a
                  href="/profile"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-sm font-medium rounded-full"
                  style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                >
                  Profile
                </m.a>
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/login'}
                  className="px-4 py-2 text-sm font-bold rounded-full"
                  style={{ color: "#fff", borderRadius: 9999, background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)' }}
                >
                  Sign In
                </m.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
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
              background: morphBg,
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
              background: morphBg,
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
                  ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: theme.textPrimary,
              }}
            >
              Resume Builder
            </h1>
            <p style={{ color: theme.textSecondary }} className="text-base sm:text-xl">Create a professional resume that stands out to employers</p>
          </m.div>

          {/* Action Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
              style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
            >
              {previewMode ? <Edit className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {previewMode ? 'Edit Resume' : 'Preview Resume'}
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportResume}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
              style={{ background: "rgba(0,255,136,0.12)", border: `1px solid rgba(0,255,136,0.28)`, color: "#00ff88" }}
            >
              <Download className="w-5 h-5" />
              Export PDF
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
              style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
            >
              <Save className="w-5 h-5" />
              Save Draft
            </m.button>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            {!previewMode && (
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {[
                    { id: 'personal', label: 'Personal Info', icon: '👤' },
                    { id: 'experience', label: 'Experience', icon: '💼' },
                    { id: 'education', label: 'Education', icon: '🎓' },
                    { id: 'skills', label: 'Skills', icon: '⚡' },
                    { id: 'projects', label: 'Projects', icon: '🚀' },
                    { id: 'templates', label: 'Templates', icon: '🎨' }
                  ].map(section => (
                    <m.button
                      key={section.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${activeSection === section.id ? 'ring-2' : ''} ${activeSection === section.id ? (theme.theme === 'light' ? 'ring-blue-500' : 'ring-cyan-400') : ''}`}
                      style={{
                        background: activeSection === section.id ? (theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)') : theme.bgCard,
                        color: activeSection === section.id ? '#fff' : theme.textPrimary,
                        border: `1px solid ${theme.borderMedium}`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{section.icon}</span>
                        <span className="font-semibold">{section.label}</span>
                      </div>
                    </m.button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className={`${previewMode ? 'lg:col-span-4' : 'lg:col-span-3'}`}>
              {previewMode ? (
                // Resume Preview
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white text-black p-8 rounded-2xl shadow-2xl" style={{ minHeight: '11in', fontFamily: 'Georgia, serif' }}>
                    {/* Resume Header */}
                    <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
                      <h1 className="text-3xl font-bold mb-2">{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}</h1>
                      <div className="flex justify-center gap-6 text-sm text-gray-600">
                        <span>{resumeData.personalInfo.email}</span>
                        <span>{resumeData.personalInfo.phone}</span>
                        <span>{resumeData.personalInfo.location}</span>
                      </div>
                      {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
                        <div className="flex justify-center gap-6 text-sm text-blue-600 mt-2">
                          {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
                          {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
                        </div>
                      )}
                    </div>

                    {/* Summary */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-2 text-gray-800">Professional Summary</h2>
                      <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
                    </div>

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-gray-800">Experience</h2>
                        {resumeData.experience.map(exp => (
                          <div key={exp.id} className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-bold text-gray-800">{exp.position}</h3>
                                <p className="text-gray-600">{exp.company}, {exp.location}</p>
                              </div>
                              <span className="text-sm text-gray-500">
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-gray-800">Education</h2>
                        {resumeData.education.map(edu => (
                          <div key={edu.id} className="mb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-gray-800">{edu.degree} in {edu.field}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                              </div>
                              <span className="text-sm text-gray-500">
                                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                {edu.gpa && ` • GPA: ${edu.gpa}`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-bold mb-3 text-gray-800">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {resumeData.skills.map(skill => (
                            <span key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                              {skill.name} • {skill.level}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold mb-3 text-gray-800">Projects</h2>
                        {resumeData.projects.map(project => (
                          <div key={project.id} className="mb-3">
                            <h3 className="font-bold text-gray-800">{project.name}</h3>
                            <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mb-1">
                              {project.technologies.map((tech, idx) => (
                                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            {project.url && <p className="text-blue-600 text-sm">{project.url}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-8">
                  {/* Personal Information */}
                  {activeSection === 'personal' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 rounded-3xl"
                      style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                    >
                      <h2 className="text-2xl font-bold mb-6" style={{ color: theme.textPrimary }}>Personal Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>First Name</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.firstName}
                            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                            style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Last Name</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                            style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Email</label>
                          <input
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                            style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Phone</label>
                          <input
                            type="tel"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                            style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Location</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                            style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Professional Summary</label>
                          <textarea
                            rows={4}
                            value={resumeData.personalInfo.summary}
                            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                            style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                          />
                        </div>
                      </div>
                    </m.div>
                  )}

                  {/* Experience Section */}
                  {activeSection === 'experience' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Work Experience</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addExperience}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Experience
                        </m.button>
                      </div>

                      {resumeData.experience.map((exp, idx) => (
                        <div
                          key={exp.id}
                          className="p-6 rounded-3xl"
                          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Experience {idx + 1}</h3>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none transition-all"
                              style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                            />
                            <input
                              type="text"
                              placeholder="Position"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none transition-all"
                              style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                            />
                            <input
                              type="text"
                              placeholder="Location"
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none transition-all"
                              style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                className="w-4 h-4"
                                style={{ accentColor: theme.textAccent }}
                              />
                              <label style={{ color: theme.textPrimary }}>Currently working here</label>
                            </div>
                            <input
                              type="month"
                              placeholder="Start Date"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none transition-all"
                              style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                            />
                            <input
                              type="month"
                              placeholder="End Date"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                              className="px-4 py-3 rounded-xl focus:outline-none transition-all disabled:opacity-50"
                              style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                            />
                            <div className="md:col-span-2">
                              <textarea
                                rows={3}
                                placeholder="Describe your responsibilities and achievements..."
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all resize-none"
                                style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </m.div>
                  )}

                  {/* Templates Section */}
                  {activeSection === 'templates' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Choose a Template</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {templates.map(template => (
                          <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`p-6 rounded-3xl cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2' : ''} ${selectedTemplate === template.id ? (theme.theme === 'light' ? 'ring-blue-500' : 'ring-cyan-400') : ''}`}
                            style={{
                              background: selectedTemplate === template.id ? (theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)') : theme.bgCard,
                              color: selectedTemplate === template.id ? '#fff' : theme.textPrimary,
                              border: `1px solid ${theme.borderMedium}`
                            }}
                          >
                            <h3 className="text-lg font-bold mb-2">{template.name}</h3>
                            <p className="text-sm opacity-80">{template.preview}</p>
                          </div>
                        ))}
                      </div>
                    </m.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RouteGuard>
  )
}