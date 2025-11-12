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
} from "lucide-react"
import { RouteGuard } from "@/components/RouteGuard"
import { useAuth } from "@/contexts/AuthContext"

const m = motion as any

// Types
interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  avatar: string
  title: string
  experience: number
  skills: string[]
  resumeUrl?: string
  linkedin?: string
  github?: string
  portfolio?: string
}

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current: boolean
}

// Mock data
const mockProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Always eager to learn and tackle new challenges.",
  avatar: "",
  title: "Senior Software Engineer",
  experience: 5,
  skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL"],
  linkedin: "https://linkedin.com/in/alexjohnson",
  github: "https://github.com/alexjohnson",
  portfolio: "https://alexjohnson.dev",
}

const mockExperience: Experience[] = [
  {
    id: "1",
    company: "Google",
    position: "Senior Software Engineer",
    startDate: "2022-03-01",
    current: true,
    description: "Leading development of scalable web applications using React and Node.js. Managing a team of 4 developers and mentoring junior engineers.",
  },
  {
    id: "2",
    company: "Microsoft",
    position: "Software Engineer",
    startDate: "2020-06-01",
    endDate: "2022-02-28",
    current: false,
    description: "Developed and maintained Azure cloud services. Implemented CI/CD pipelines and improved deployment efficiency by 40%.",
  },
  {
    id: "3",
    company: "StartupXYZ",
    position: "Full Stack Developer",
    startDate: "2019-01-01",
    endDate: "2020-05-31",
    current: false,
    description: "Built the entire product from scratch using MERN stack. Handled both frontend and backend development for a team of 10.",
  },
]

const mockEducation: Education[] = [
  {
    id: "1",
    institution: "Stanford University",
    degree: "Master of Science",
    field: "Computer Science",
    startDate: "2017-09-01",
    endDate: "2019-05-31",
    current: false,
  },
  {
    id: "2",
    institution: "UC Berkeley",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2013-09-01",
    endDate: "2017-05-31",
    current: false,
  },
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [experience, setExperience] = useState<Experience[]>(mockExperience)
  const [education, setEducation] = useState<Education[]>(mockEducation)
  const [activeTab, setActiveTab] = useState<"profile" | "experience" | "education" | "settings">("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile>(mockProfile)

  const handleSaveProfile = () => {
    setProfile(editForm)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !editForm.skills.includes(skill.trim())) {
      setEditForm({
        ...editForm,
        skills: [...editForm.skills, skill.trim()],
      })
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.filter(skill => skill !== skillToRemove),
    })
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
                        {profile.name.split(" ").map(n => n[0]).join("")}
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
                        <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
                        <p className="text-xl text-[#00d4ff] font-semibold">{profile.title}</p>
                        <p className="text-gray-400">{profile.location}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-gray-400">
                          <Mail className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Phone className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <MapPin className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                          <Briefcase className="w-5 h-5 text-[#00d4ff]" />
                          <span>{profile.experience} years experience</span>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                    </div>

                    {/* Edit Button */}
                    <div className="flex gap-3">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
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
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-[#00d4ff]/20 to-[#ff6b00]/20 border border-[#00d4ff]/30 rounded-full text-[#00d4ff] font-semibold text-sm"
                      >
                        {skill}
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
                    Resume & Documents
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20">
                      <div className="flex items-center gap-4">
                        <FileText className="w-8 h-8 text-[#00d4ff]" />
                        <div>
                          <p className="text-white font-semibold">Resume_Alex_Johnson.pdf</p>
                          <p className="text-gray-400 text-sm">Last updated: Nov 10, 2024</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-lg font-bold hover:bg-[#00d4ff]/30 transition-all"
                        >
                          View
                        </m.button>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-[#ff6b00]/20 border border-[#ff6b00]/50 text-[#ff6b00] rounded-lg font-bold hover:bg-[#ff6b00]/30 transition-all"
                        >
                          Update
                        </m.button>
                      </div>
                    </div>
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
                      { label: "LinkedIn", url: profile.linkedin, icon: "💼" },
                      { label: "GitHub", url: profile.github, icon: "💻" },
                      { label: "Portfolio", url: profile.portfolio, icon: "🌐" },
                    ].map((link, idx) => (
                      <m.div
                        key={link.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{link.icon}</span>
                          <span className="text-white font-semibold">{link.label}</span>
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors text-sm break-all"
                        >
                          {link.url}
                        </a>
                      </m.div>
                    ))}
                  </div>
                </m.div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                {experience.map((exp, idx) => (
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
                              exp.current ? "Present" : new Date(exp.endDate!).toLocaleDateString("en-US", { month: "short", year: "numeric" })
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
                  transition={{ delay: experience.length * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                {education.map((edu, idx) => (
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
                              edu.current ? "Present" : new Date(edu.endDate!).toLocaleDateString("en-US", { month: "short", year: "numeric" })
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
                  transition={{ delay: education.length * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                    <label className="block text-sm font-bold text-gray-400 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Email *</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {editForm.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
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
                          addSkill((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ''
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
                      value={editForm.linkedin}
                      onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">GitHub</label>
                    <input
                      type="url"
                      value={editForm.github}
                      onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Portfolio</label>
                    <input
                      type="url"
                      value={editForm.portfolio}
                      onChange={(e) => setEditForm({ ...editForm, portfolio: e.target.value })}
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
                    onClick={handleSaveProfile}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all"
                  >
                    Save Changes
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
