'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Eye, Edit, Plus, Trash2, Save, Palette, Menu, X, User, Briefcase, GraduationCap, Zap, Rocket, Palette as PaletteIcon, Mail, Phone, MapPin, Code, Link, Sparkles, Lightbulb, BarChart3, ClipboardList, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import ThemeToggle from '@/components/ThemeToggle'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ResumePreview } from '@/components/resume/ResumePreview'
import { ModernTemplate } from '@/components/resume/templates/ModernTemplate'
import { ProfessionalTemplate } from '@/components/resume/templates/ProfessionalTemplate'
import { CreativeTemplate } from '@/components/resume/templates/CreativeTemplate'
import { MinimalistTemplate } from '@/components/resume/templates/MinimalistTemplate'
import { ExecutiveTemplate } from '@/components/resume/templates/ExecutiveTemplate'

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
  const { user, logout } = useAuth()
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
  
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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

    // Load saved draft if user is authenticated
    if (user) {
      loadSavedResume()
    }
  }, [user])

  // Load saved resume from API
  const loadSavedResume = async () => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/resume', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.resume) {
          setResumeData({
            personalInfo: data.resume.personalInfo,
            experience: data.resume.experience,
            education: data.resume.education,
            skills: data.resume.skills,
            projects: data.resume.projects
          })
          setSelectedTemplate(data.resume.selectedTemplate || 'modern')
        }
      }
    } catch (error) {
      console.error('Error loading saved resume:', error)
    }
  }

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

  // Template HTML Generation Functions

const previewRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

const exportResume = async () => {
  if (!previewRef.current) {
    alert('Please open Preview mode before exporting.')
    return
  }

  try {
    // Clone the preview DOM
    const clone = previewRef.current.cloneNode(true) as HTMLElement

    // Prepare clone for PDF
    clone.style.width = '210mm'
    clone.style.minHeight = '297mm'
    clone.style.boxSizing = 'border-box'
    clone.style.background = '#ffffff'
    clone.style.boxShadow = 'none'
    clone.style.borderRadius = '0'
    clone.style.overflow = 'visible'
    clone.style.position = 'relative'

    // Force color rendering (gradients, bg colors)
    clone.querySelectorAll('*').forEach(el => {
  const node = el as HTMLElement
    // node.style.printColorAdjust = 'exact' // Removed: not a valid property
    // Fix: assign as a string property
    (node.style as any)['webkitPrintColorAdjust'] = 'exact'
})


    // Mount off-screen
    const wrapper = document.createElement('div')
    wrapper.style.position = 'fixed'
    wrapper.style.left = '-9999px'
    wrapper.style.top = '0'
    wrapper.appendChild(clone)
    document.body.appendChild(wrapper)

    // Wait for fonts
    if (document.fonts?.ready) {
      await document.fonts.ready
    }
    await new Promise(r => setTimeout(r, 300))

// Capture canvas
const canvas = await html2canvas(clone, {
  useCORS: true,
  background: '#ffffff',
  logging: false,
})


    // Cleanup DOM
    document.body.removeChild(wrapper)

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    const imgData = canvas.toDataURL('image/jpeg', 1.0)

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    const fileName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`
    pdf.save(fileName)

  } catch (error) {
    console.error('PDF Export Failed:', error)
    alert('Failed to export PDF. Please try again.')
  }
}


const getRenderedTemplate = () => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '210mm';
  container.style.height = '297mm';
  container.style.minHeight = '297mm';
  container.style.background = '#ffffff';
  container.style.padding = '20mm';
  container.style.boxSizing = 'border-box';
  container.style.overflow = 'hidden';
  
  // Common font imports with print styles
  const fontStyles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap');
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        color-adjust: exact;
      }
      html, body {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 0;
      }
    </style>
  `;
  
  // Render the selected template
  let templateHTML = '';
  
 const resumeElement = previewRef.current
if (!resumeElement) {
  alert('Preview not available')
  return
}

const clone = resumeElement.cloneNode(true) as HTMLElement

  
  // Wrap template in A4 container
  container.innerHTML = fontStyles + `
    <div style="
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    ">
      ${templateHTML}
    </div>
  `;
  
  return container;
};
  // Save draft to database
  const saveDraft = async () => {
    if (!user) {
      alert('Please sign in to save your resume draft')
      return
    }

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalInfo: resumeData.personalInfo,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          projects: resumeData.projects,
          selectedTemplate
        }),
      })

      if (response.ok) {
        alert('Resume draft saved successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to save draft: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Failed to save resume draft')
    }
  }

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      preview: 'Clean and contemporary design with subtle colors',
      description: 'Professional layout with modern typography and clean spacing',
      colors: { primary: '#2563eb', secondary: '#64748b', accent: '#06b6d4' }
    },
    {
      id: 'professional',
      name: 'Professional',
      preview: 'Traditional corporate style with formal layout',
      description: 'Classic business format preferred by traditional industries',
      colors: { primary: '#1f2937', secondary: '#6b7280', accent: '#374151' }
    },
    {
      id: 'creative',
      name: 'Creative',
      preview: 'Unique and eye-catching layout with vibrant colors',
      description: 'Stand out with creative design elements and bold styling',
      colors: { primary: '#7c3aed', secondary: '#a855f7', accent: '#ec4899' }
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      preview: 'Simple and elegant design focusing on content',
      description: 'Clean, distraction-free layout that lets your content shine',
      colors: { primary: '#111827', secondary: '#6b7280', accent: '#10b981' }
    },
    {
      id: 'executive',
      name: 'Executive',
      preview: 'Sophisticated design for senior-level positions',
      description: 'Premium layout with elegant typography and refined styling',
      colors: { primary: '#1e3a8a', secondary: '#475569', accent: '#f59e0b' }
    }
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
                {user ? (
                  <>
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
                      onClick={async () => {
                        await logout()
                        window.location.href = '/'
                      }}
                      className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
                      style={{
                        background: theme.theme === 'light'
                          ? "linear-gradient(to right, #f59e0b, #f97316)"
                          : "linear-gradient(to right, #ff6b00, #ff8c00)",
                        boxShadow: theme.theme === 'light'
                          ? "0 4px 14px rgba(245, 158, 11, 0.25)"
                          : "0 10px 30px rgba(255, 107, 0, 0.25)"
                      }}
                    >
                      Sign Out
                    </m.button>
                  </>
                ) : (
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/login'}
                    className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r hover:shadow-lg hover:shadow-[#3b82f6]/50 transition-all duration-300"
                    style={{
                      background: theme.theme === 'light'
                        ? "linear-gradient(to right, #3b82f6, #1d4ed8)"
                        : "linear-gradient(to right, #00d4ff, #ff6b00)",
                      boxShadow: theme.theme === 'light'
                        ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                        : "0 10px 30px rgba(0, 212, 255, 0.25)"
                    }}
                  >
                    Sign In
                  </m.button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center gap-2">
                <ThemeToggle />
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-1.5 rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                  style={{ color: theme.textPrimary }}
                >
                  {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </m.button>
              </div>
            </div>
          </div>
        </m.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden fixed top-[73px] left-0 right-0 z-40 border-b border-[#00d4ff]/50"
              style={{ background: theme.bgNavStyle?.backgroundColor || '#ffffff', backdropFilter: "blur(12px)" }}
            >
              <div className="max-w-7xl mx-auto px-3 py-2">
                <div className="flex flex-col gap-2">
                  {user ? (
                    <>
                      <m.a
                        href="/dashboard"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <BarChart3 className="w-4 h-4" />
                        Dashboard
                      </m.a>

                      <m.a
                        href="/jobs"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <Briefcase className="w-4 h-4" />
                        Jobs
                      </m.a>

                      <m.a
                        href="/applications"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <ClipboardList className="w-4 h-4" />
                        Applications
                      </m.a>

                      <m.a
                        href="/profile"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </m.a>

                      <m.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={async () => {
                          await logout()
                          setShowMobileMenu(false)
                          window.location.href = '/'
                        }}
                        className="w-full px-4 py-3 text-left text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                        style={{
                          background: theme.theme === 'light'
                            ? "linear-gradient(to right, #f59e0b, #f97316)"
                            : "linear-gradient(to right, #ff6b00, #ff8c00)",
                          boxShadow: theme.theme === 'light'
                            ? "0 4px 14px rgba(245, 158, 11, 0.25)"
                            : "0 10px 30px rgba(255, 107, 0, 0.25)"
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </m.button>
                    </>
                  ) : (
                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowMobileMenu(false)
                        window.location.href = '/login'
                      }}
                      className="w-full px-4 py-3 text-left text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      style={{
                        background: theme.theme === 'light'
                          ? "linear-gradient(to right, #3b82f6, #1d4ed8)"
                          : "linear-gradient(to right, #00d4ff, #ff6b00)",
                        boxShadow: theme.theme === 'light'
                          ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                          : "0 10px 30px rgba(0, 212, 255, 0.25)"
                      }}
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </m.button>
                  )}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

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
              style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#00ff88,#00d4aa)', color: "#fff" }}
            >
              <Download className="w-5 h-5" />
              Export PDF
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveDraft}
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
                    { id: 'personal', label: 'Personal Info', icon: User },
                    { id: 'experience', label: 'Experience', icon: Briefcase },
                    { id: 'education', label: 'Education', icon: GraduationCap },
                    { id: 'skills', label: 'Skills', icon: Zap },
                    { id: 'projects', label: 'Projects', icon: Rocket },
                    { id: 'templates', label: 'Templates', icon: PaletteIcon }
                  ].map(section => (
                    <m.button
                      key={section.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${activeSection === section.id ? 'ring-2' : ''} ${activeSection === section.id ? (theme.theme === 'light' ? 'ring-blue-500' : 'ring-cyan-400') : ''}`}
                      style={{
                        background: activeSection === section.id
                          ? (theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)')
                          : (theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.6)'),
                        color: activeSection === section.id ? '#fff' : theme.textPrimary,
                        border: `1px solid ${activeSection === section.id ? (theme.theme === 'light' ? '#3b82f6' : '#ff6b00') : theme.borderMedium}`,
                        backdropFilter: activeSection !== section.id ? 'blur(10px)' : 'none',
                        boxShadow: activeSection === section.id
                          ? (theme.theme === 'light' ? '0 4px 14px rgba(59, 130, 246, 0.25)' : '0 4px 14px rgba(255, 107, 0, 0.25)')
                          : (theme.theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.3)')
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5" />
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
                <>
                  <ResumePreview
                    theme={theme}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                    setPreviewMode={setPreviewMode}
                    templates={templates}
                    previewRef={previewRef}
                    resumeData={resumeData}
                  >
                    {selectedTemplate === 'modern' && (
                      <ModernTemplate resumeData={resumeData} />
                    )}
                    {selectedTemplate === 'professional' && (
                      <ProfessionalTemplate resumeData={resumeData} />
                    )}
                    {selectedTemplate === 'creative' && (
                      <CreativeTemplate resumeData={resumeData} />
                    )}
                    {selectedTemplate === 'minimalist' && (
                      <MinimalistTemplate resumeData={resumeData} />
                    )}
                    {selectedTemplate === 'executive' && (
                      <ExecutiveTemplate resumeData={resumeData} />
                    )}
                  </ResumePreview>
                  {/* Preview Actions */}
                  <div className="flex justify-center gap-4">
                    <m.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={exportResume}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg"
                      style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#00ff88,#00d4aa)', color: "#fff" }}
                    >
                      <Download className="w-6 h-6" />
                      Export PDF
                    </m.button>
                    <m.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveDraft}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg"
                      style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    >
                      <Save className="w-6 h-6" />
                      Save Draft
                    </m.button>
                  </div>
                </>
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
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Last Name</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Email</label>
                          <input
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Phone</label>
                          <input
                            type="tel"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Location</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Professional Summary</label>
                          <textarea
                            rows={4}
                            value={resumeData.personalInfo.summary}
                            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
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
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Position"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Location"
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
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
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="month"
                              placeholder="End Date"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <div className="md:col-span-2">
                              <textarea
                                rows={3}
                                placeholder="Describe your responsibilities and achievements..."
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </m.div>
                  )}

                  {/* Education Section */}
                  {activeSection === 'education' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Education</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addEducation}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Education
                        </m.button>
                      </div>

                      {resumeData.education.map((edu, idx) => (
                        <div
                          key={edu.id}
                          className="p-6 rounded-3xl"
                          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Education {idx + 1}</h3>
                            <button
                              onClick={() => removeEducation(edu.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Institution"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Field of Study"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="GPA (optional)"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={edu.current}
                                onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                                className="w-4 h-4"
                                style={{ accentColor: theme.textAccent }}
                              />
                              <label style={{ color: theme.textPrimary }}>Currently studying here</label>
                            </div>
                            <div></div>
                            <input
                              type="month"
                              placeholder="Start Date"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="month"
                              placeholder="End Date"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                              disabled={edu.current}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                          </div>
                        </div>
                      ))}
                    </m.div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 'skills' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Skills</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addSkill}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Skill
                        </m.button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resumeData.skills.map((skill, idx) => (
                          <div
                            key={skill.id}
                            className="p-4 rounded-xl flex items-center gap-4"
                            style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                          >
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="Skill name"
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
                              />
                            </div>
                            <select
                              value={skill.level}
                              onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                              className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                              <option value="expert">Expert</option>
                            </select>
                            <button
                              onClick={() => removeSkill(skill.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </m.div>
                  )}

                  {/* Projects Section */}
                  {activeSection === 'projects' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Projects</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addProject}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Project
                        </m.button>
                      </div>

                      {resumeData.projects.map((project, idx) => (
                        <div
                          key={project.id}
                          className="p-6 rounded-3xl"
                          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Project {idx + 1}</h3>
                            <button
                              onClick={() => removeProject(project.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Project name"
                              value={project.name}
                              onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Project URL (optional)"
                              value={project.url}
                              onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <div className="md:col-span-2">
                              <textarea
                                rows={3}
                                placeholder="Describe your project..."
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Technologies Used</label>
                              <input
                                type="text"
                                placeholder="e.g., React, Node.js, MongoDB"
                                value={project.technologies.join(', ')}
                                onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(tech => tech.trim()))}
                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
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
                      <div>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.textPrimary }}>Choose Your Template</h2>
                        <p style={{ color: theme.textSecondary }} className="mb-6">Select a template that best represents your professional style</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                          <m.div
                            key={template.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                              selectedTemplate === template.id
                                ? 'ring-2 ring-offset-2'
                                : 'hover:shadow-lg'
                            }`}
                            style={{
                              background: selectedTemplate === template.id
                                ? (theme.theme === 'light'
                                    ? `linear-gradient(135deg, ${template.colors.primary}15, ${template.colors.accent}10)`
                                    : `linear-gradient(135deg, ${template.colors.primary}25, ${template.colors.accent}20)`)
                                : theme.bgCard,
                              border: `1px solid ${selectedTemplate === template.id ? template.colors.primary : theme.borderMedium}`,
                              ringColor: template.colors.primary,
                              boxShadow: selectedTemplate === template.id
                                ? `0 10px 30px rgba(${template.colors.primary.slice(1, 3)}, ${template.colors.primary.slice(3, 5)}, ${template.colors.primary.slice(5, 7)}, 0.3)`
                                : 'none'
                            }}
                          >
                            {/* Template Preview */}
                            <div className="mb-4">
                              <div
                                className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-3"
                                style={{
                                  background: `linear-gradient(45deg, ${template.colors.primary}10, ${template.colors.accent}05)`,
                                  borderColor: template.colors.secondary
                                }}
                              >
                                <div className="text-center">
                                  <div
                                    className="w-8 h-8 rounded-full mx-auto mb-2"
                                    style={{ backgroundColor: template.colors.primary }}
                                  ></div>
                                  <div
                                    className="w-16 h-2 rounded mx-auto mb-1"
                                    style={{ backgroundColor: template.colors.secondary }}
                                  ></div>
                                  <div
                                    className="w-12 h-2 rounded mx-auto"
                                    style={{ backgroundColor: template.colors.accent }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Template Info */}
                            <div className="text-center">
                              <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary }}>
                                {template.name}
                              </h3>
                              <p className="text-sm mb-3" style={{ color: theme.textSecondary }}>
                                {template.preview}
                              </p>
                              <p className="text-xs" style={{ color: theme.textTertiary }}>
                                {template.description}
                              </p>
                            </div>

                            {/* Selected Indicator */}
                            {selectedTemplate === template.id && (
                              <div className="absolute top-3 right-3">
                                <div
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: template.colors.primary }}
                                >
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </m.div>
                        ))}
                      </div>

                      {/* Template Preview Note */}
                      <div className="mt-8 p-4 rounded-xl" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Eye className="w-5 h-5" style={{ color: theme.textAccent }} />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1" style={{ color: theme.textPrimary }}>Preview Your Template</h4>
                            <p style={{ color: theme.textSecondary }}>
                              Click "Preview Resume" above to see how your selected template will look with your content.
                              The PDF export will use your chosen template design.
                            </p>
                          </div>
                        </div>
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
  );
}