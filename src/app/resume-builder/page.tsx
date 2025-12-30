'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Eye, Edit, Plus, Trash2, Save, Palette, Menu, X, User, Briefcase, GraduationCap, Zap, Rocket, Palette as PaletteIcon, Mail, Phone, MapPin, Code, Link, Sparkles, Lightbulb, BarChart3, ClipboardList, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import Navigation from './Navigation'
import PreviewActions from './PreviewActions'
import MobileMenu from './MobileMenu'
import Header from './Header'
import BackgroundEffects from './BackgroundEffects'
import ActionButtons from './ActionButtons'
import SidebarNavigation from './SidebarNavigation'
import MobileSectionNavigation from './MobileSectionNavigation'
import EditMode from './EditMode'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ResumePreview } from '@/components/resume/ResumePreview'
import { ModernTemplate } from '@/components/resume/templates/ModernTemplate'
import { ProfessionalTemplate } from '@/components/resume/templates/ProfessionalTemplate'
import { CreativeTemplate } from '@/components/resume/templates/CreativeTemplate'
import { MinimalistTemplate } from '@/components/resume/templates/MinimalistTemplate'
import { ExecutiveTemplate } from '@/components/resume/templates/ExecutiveTemplate'

const m = motion as any

export interface ResumeData {
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
      ;(node.style as any)['printColorAdjust'] = 'exact'
      ;(node.style as any)['colorAdjust'] = 'exact'
    })

    // Handle gradient text (bg-clip-text) by setting solid color
    clone.querySelectorAll('[class*="bg-clip-text"]').forEach(el => {
      const node = el as HTMLElement
      node.style.background = 'none'
      node.style.webkitBackgroundClip = 'initial'
      node.style.backgroundClip = 'initial'
      node.style.webkitTextFillColor = 'initial'
      node.style.color = '#7c3aed' // Solid purple color as fallback
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
        <Navigation user={user} theme={theme} logout={logout} showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />

        {/* Mobile Menu */}
        <MobileMenu user={user} theme={theme} showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} logout={logout} />

        <BackgroundEffects morphBg={morphBg} />

        {/* Main Content */}
        <div className="relative z-10 pt-20 sm:pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
          <Header theme={theme} />

          <ActionButtons previewMode={previewMode} setPreviewMode={setPreviewMode} exportResume={exportResume} saveDraft={saveDraft} theme={theme} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            {!previewMode && (
              <div className="lg:col-span-1">
                <SidebarNavigation activeSection={activeSection} setActiveSection={setActiveSection} theme={theme} />
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
                  <PreviewActions exportResume={exportResume} saveDraft={saveDraft} theme={theme} />
                </>
              ) : (
                <EditMode
                  resumeData={resumeData}
                  activeSection={activeSection}
                  updatePersonalInfo={updatePersonalInfo}
                  addExperience={addExperience}
                  updateExperience={updateExperience}
                  removeExperience={removeExperience}
                  addEducation={addEducation}
                  updateEducation={updateEducation}
                  removeEducation={removeEducation}
                  addSkill={addSkill}
                  updateSkill={updateSkill}
                  removeSkill={removeSkill}
                  addProject={addProject}
                  updateProject={updateProject}
                  removeProject={removeProject}
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                  theme={theme}
                />
              )}
            </div>
          </div>

          {/* Mobile Section Navigation */}
          {!previewMode && (
            <MobileSectionNavigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              theme={theme}
            />
          )}
        </div>
      </div>
    </RouteGuard>
  )
}
