"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target, TrendingUp, Calendar, Briefcase, Clock, CheckCircle2, XCircle, AlertCircle,
  Plus, Search, Filter, BarChart3, FileText, Link as LinkIcon, MapPin, DollarSign,
  Users, Building2, Send, Eye, Edit, Trash2, ChevronRight, Activity, Zap,
  ArrowUpRight, ArrowDownRight, Star, Trophy, Flame, Coffee, Sparkles, Rocket,
  Timer, Download, Upload, Share2, Bell, Settings, Award, TrendingDown,
  ChevronLeft, ExternalLink, MessageSquare, Phone, Mail, Linkedin, Github,
  PartyPopper, Moon, Sun, Volume2, VolumeX, Palette, Glasses,
  X, Menu, User, LogOut, Send as SendIcon
} from "lucide-react"
import { RouteGuard } from "@/components/RouteGuard"
import { useAuth } from "@/contexts/AuthContext"
import { useThemeClasses } from "@/hooks/useThemeClasses"
import ThemeToggle from "@/components/ThemeToggle"

const m = motion as any

// Types
interface Application {
  _id: string
  userId?: string
  company: string
  position: string
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  applicationDate: string | Date
  lastUpdated: string | Date
  notes?: string
  salary?: string
  location?: string
  jobUrl?: string
  contactInfo?: string
  priority: 'low' | 'medium' | 'high'
  progress: number
  createdAt?: string | Date
  updatedAt?: string | Date
}

// Easter Egg: Konami Code
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function DashboardPage() {
  const { user, logout, getIdToken } = useAuth()
  const theme = useThemeClasses()

  // State
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<"all" | "applied" | "interview" | "offer" | "rejected" | "withdrawn">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [sortBy, setSortBy] = useState<"date" | "company" | "priority">("date")
  const [showAchievements, setShowAchievements] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Easter Eggs State
  const konamiRef = useRef<number>(0)
  const [partyMode, setPartyMode] = useState(false)
  const clickCountRef = useRef<number>(0)
  const [showSecretStats, setShowSecretStats] = useState(false)
  const [motivationalQuote, setMotivationalQuote] = useState("")
  const [streak, setStreak] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<number[]>([])
  const unlockedRef = useRef<number[]>([])
  const [userStats, setUserStats] = useState({
    totalApplications: 0,
    currentStreak: 0,
    longestStreak: 0,
  })

  // Motivational Quotes
  const quotes = [
    "Every application is a step closer to your dream job!",
    "You're not just applying, you're building your future!",
    "Rejection is redirection to something better!",
    "Your next opportunity is waiting! Keep going!",
    "Success is the sum of small efforts repeated!",
    "The only way to do great work is to love what you do!",
    "Believe you can and you're halfway there!",
    "Dream big, work hard, stay focused!",
  ]

  // Form state for adding applications
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'applied' as Application['status'],
    priority: 'medium' as Application['priority'],
    notes: '',
    jobUrl: '',
    contactInfo: '',
  })

  // Mounted flag to avoid setting state after unmount
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  // Helper: parse JSON safely
  const safeParseJson = async (res: Response) => {
    const txt = await res.text().catch(() => "")
    try { return txt ? JSON.parse(txt) : {} } catch { return { text: txt } }
  }

  // Fetch applications from API (with AbortController)
  const fetchApplications = useCallback(async () => {
    setLoading(true)
    setError(null)
    const controller = new AbortController()
    const signal = controller.signal

    try {
      const token = await getIdToken()
      const response = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        signal,
      })

      if (!response.ok) {
        const parsed = await safeParseJson(response).catch(() => ({}))
        console.error('Applications fetch failed:', response.status, response.statusText, parsed)
        throw new Error(parsed?.error || parsed?.message || `Failed to fetch applications: ${response.status}`)
      }

      const data = await response.json().catch(() => ({}))
      const apps = Array.isArray(data.applications) ? data.applications : []
      // Normalize date fields to ISO strings to avoid Date object mismatches
      const normalized: Application[] = apps.map((a: any) => ({
        ...a,
        applicationDate: a.applicationDate ? new Date(a.applicationDate).toISOString() : new Date().toISOString(),
        lastUpdated: a.lastUpdated ? new Date(a.lastUpdated).toISOString() : new Date().toISOString(),
      }))

      if (mountedRef.current) {
        setApplications(normalized)
        calculateStreak(normalized)
        setError(null)
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Fetch applications aborted')
      } else {
        console.error('Error fetching applications:', err)
        if (mountedRef.current) setError(err.message || 'Failed to load applications')
      }
    } finally {
      if (mountedRef.current) setLoading(false)
    }

    return () => controller.abort()
  }, [getIdToken])

  // Fetch achievements from API
  const fetchAchievements = useCallback(async () => {
    try {
      const token = await getIdToken()
      const response = await fetch('/api/user/achievements', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const parsed = await safeParseJson(response).catch(() => ({}))
        console.warn('Achievements fetch non-ok:', parsed)
        return
      }

      const data = await response.json().catch(() => ({}))
      const ids = (data.achievements || []).map((a: any) => a.id).filter((id: any) => typeof id === 'number')
      if (mountedRef.current) {
        setUnlockedAchievementIds(ids)
        unlockedRef.current = ids
        setUserStats(data.stats || { totalApplications: 0, currentStreak: 0, longestStreak: 0 })
      }
    } catch (err) {
      console.error('Error fetching achievements:', err)
    }
  }, [getIdToken])

  // Unlock achievement - idempotent check inside
  const unlockAchievement = useCallback(async (achievementId: number) => {
    if (unlockedRef.current.includes(achievementId)) return // already unlocked

    try {
      const token = await getIdToken()
      const response = await fetch('/api/user/achievements', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ achievementId }),
      })

      if (!response.ok) {
        const parsed = await safeParseJson(response).catch(() => ({}))
        console.error('Unlock achievement failed:', response.status, parsed)
        return
      }

      const data = await response.json().catch(() => ({}))
      if (data.message && mountedRef.current) {
        setUnlockedAchievementIds(prev => {
          if (prev.includes(achievementId)) return prev
          const next = [...prev, achievementId]
          unlockedRef.current = next
          return next
        })
        // Play success sound if enabled
        if (soundEnabled) playSound('success')
      }
    } catch (err) {
      console.error('Error unlocking achievement:', err)
    }
  }, [getIdToken, soundEnabled])

  // Update user stats
  const updateUserStats = useCallback(async (newStats: any) => {
    try {
      const token = await getIdToken()
      await fetch('/api/user/achievements', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stats: newStats }),
      })
    } catch (err) {
      console.error('Error updating stats:', err)
    }
  }, [getIdToken])

  useEffect(() => {
    if (!user) return
    fetchApplications()
    fetchAchievements()
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [user, fetchApplications, fetchAchievements])

  // Calculate application streak
  const calculateStreak = (apps: Application[]) => {
    if (!apps || apps.length === 0) {
      setStreak(0)
      return
    }

    // convert to unique sorted dates descending
    const dates = [...new Set(apps.map(a => new Date(a.applicationDate).toISOString().split('T')[0]))]
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    let currentStreak = 0
    let last = null

    for (const d of dates) {
      const dt = new Date(d + "T00:00:00")
      if (!last) {
        currentStreak = 1
        last = dt
      } else {
        const diff = Math.round((last.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24))
        if (diff <= 1) {
          currentStreak++
          last = dt
        } else break
      }
    }

    setStreak(currentStreak)
  }

  // Konami Code listener using ref to prevent re-registering on progress changes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const expected = KONAMI_CODE[konamiRef.current]
      if (e.key === expected) {
        konamiRef.current += 1
        if (konamiRef.current === KONAMI_CODE.length) {
          setPartyMode(true)
          konamiRef.current = 0
          setTimeout(() => setPartyMode(false), 10000)
        }
      } else {
        konamiRef.current = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Logo click Easter Egg
  const handleLogoClick = () => {
    clickCountRef.current += 1
    if (clickCountRef.current >= 10) {
      setShowSecretStats(true)
      clickCountRef.current = 0
    }
  }

  // Stats derived
  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interviewing: applications.filter((a) => a.status === "interview").length,
    offers: applications.filter((a) => a.status === "offer").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    withdrawn: applications.filter((a) => a.status === "withdrawn").length,
    responseRate: applications.length > 0
      ? Math.round(((applications.length - applications.filter((a) => a.status === "applied").length) / applications.length) * 100)
      : 0,
    highPriority: applications.filter((a) => a.priority === "high").length,
    avgDaysToResponse: (() => {
      const responded = applications.filter(a => a.status !== 'applied')
      if (responded.length === 0) return 0
      const totalDays = responded.reduce((sum, app) => {
        const applied = new Date(app.applicationDate).getTime()
        const updated = new Date(app.lastUpdated).getTime()
        return sum + Math.max(0, Math.floor((updated - applied) / (1000 * 60 * 60 * 24)))
      }, 0)
      return Math.round(totalDays / responded.length)
    })(),
    successRate: applications.length > 0
      ? Math.round((applications.filter((a) => a.status === "offer").length / applications.length) * 100)
      : 0,
  }

  // Achievements array (derived)
  const achievements = [
    { id: 1, name: "First Step", description: "Applied to your first job", unlocked: unlockedAchievementIds.includes(1), icon: Rocket },
    { id: 2, name: "Getting Started", description: "Applied to 5 jobs", unlocked: unlockedAchievementIds.includes(2), icon: Target },
    { id: 3, name: "Job Hunter", description: "Applied to 10 jobs", unlocked: unlockedAchievementIds.includes(3), icon: Briefcase },
    { id: 4, name: "Persistent", description: "Applied to 25 jobs", unlocked: unlockedAchievementIds.includes(4), icon: Trophy },
    { id: 5, name: "Dedicated", description: "Applied to 50 jobs", unlocked: unlockedAchievementIds.includes(5), icon: Award },
    { id: 6, name: "Interview Ready", description: "Got your first interview", unlocked: unlockedAchievementIds.includes(6), icon: Users },
    { id: 7, name: "Offer Received!", description: "Got your first offer", unlocked: unlockedAchievementIds.includes(7), icon: Star },
    { id: 8, name: "On Fire", description: "3-day application streak", unlocked: unlockedAchievementIds.includes(8), icon: Flame },
    { id: 9, name: "Focused", description: "5 high priority applications", unlocked: unlockedAchievementIds.includes(9), icon: Zap },
    { id: 10, name: "Success Rate", description: "Achieved 10% offer rate", unlocked: unlockedAchievementIds.includes(10), icon: TrendingUp },
  ]

  // Check and unlock achievements when applications or streak changes
  useEffect(() => {
    if (!user) return

    // small helper to process achievement checks
    const processChecks = async () => {
      try {
        if (stats.total >= 1) await unlockAchievement(1)
        if (stats.total >= 5) await unlockAchievement(2)
        if (stats.total >= 10) await unlockAchievement(3)
        if (stats.total >= 25) await unlockAchievement(4)
        if (stats.total >= 50) await unlockAchievement(5)
        if (stats.interviewing >= 1) await unlockAchievement(6)
        if (stats.offers >= 1) await unlockAchievement(7)
        if (streak >= 3) await unlockAchievement(8)
        if (stats.highPriority >= 5) await unlockAchievement(9)
        if (stats.successRate >= 10) await unlockAchievement(10)

        // Update user stats server-side (non-blocking)
        await updateUserStats({
          totalApplications: stats.total,
          currentStreak: streak,
          lastApplicationDate: applications[0]?.applicationDate,
        })
      } catch (err) {
        console.error('Error processing achievement checks:', err)
      }
    }

    processChecks()
  }, [applications, streak, stats.total, stats.interviewing, stats.offers, stats.highPriority, stats.successRate, user, unlockAchievement, updateUserStats])

  // Filter + sort
  const filteredApplications = applications
    .filter((app) => {
      const matchesTab = selectedTab === "all" || app.status === selectedTab
      const q = searchQuery.trim().toLowerCase()
      if (!q) return matchesTab
      const matchesSearch =
        app.company.toLowerCase().includes(q) ||
        app.position.toLowerCase().includes(q) ||
        (app.location && app.location.toLowerCase().includes(q))
      return matchesTab && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'company':
          return a.company.localeCompare(b.company)
        case 'priority':
          const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case 'date':
        default:
          return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
      }
    })

  // Add new application
  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const token = await getIdToken()
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          applicationDate: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const parsed = await safeParseJson(response).catch(() => ({}))
        console.error('Add application failed:', response.status, parsed)
        throw new Error(parsed?.error || parsed?.message || 'Failed to add application')
      }

      // re-fetch (keeps server as source of truth)
      await fetchApplications()
      setShowAddModal(false)
      setFormData({
        company: '',
        position: '',
        location: '',
        salary: '',
        status: 'applied',
        priority: 'medium',
        notes: '',
        jobUrl: '',
        contactInfo: '',
      })

      if (soundEnabled) playSound('success')
    } catch (err: any) {
      console.error('Error adding application:', err)
      setError(err.message || 'Failed to add application')
      setTimeout(() => { if (mountedRef.current) setError(null) }, 3000)
    }
  }

  // Delete application
  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const token = await getIdToken()
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const parsed = await safeParseJson(response).catch(() => ({}))
        console.error('Delete application failed:', response.status, parsed)
        throw new Error(parsed?.error || parsed?.message || 'Failed to delete application')
      }

      await fetchApplications()
    } catch (err: any) {
      console.error('Error deleting application:', err)
      setError(err.message || 'Failed to delete application')
      setTimeout(() => { if (mountedRef.current) setError(null) }, 3000)
    }
  }

  // Utility functions
  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "applied": return "#00d4ff"
      case "interview": return "#ff6b00"
      case "offer": return "#00ff88"
      case "rejected": return "#ff4444"
      case "withdrawn": return "#666"
      default: return "#666"
    }
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "applied": return SendIcon
      case "interview": return Users
      case "offer": return CheckCircle2
      case "rejected": return XCircle
      case "withdrawn": return AlertCircle
      default: return AlertCircle
    }
  }

  const getPriorityIcon = (priority: Application["priority"]) => {
    switch (priority) {
      case "high": return <Flame className="w-4 h-4 text-red-500 inline" />
      case "medium": return <Zap className="w-4 h-4 text-yellow-500 inline" />
      case "low": return <Target className="w-4 h-4 text-blue-500 inline" />
    }
  }

  const playSound = (type: 'success' | 'error') => {
    // placeholder hook for sound playing
    console.log(`🔊 Playing ${type} sound`)
  }

  const unlockedAchievements = achievements.filter(a => a.unlocked)

  // Render
  return (
    <RouteGuard>
      <div
        className={`min-h-screen overflow-hidden ${theme.bgPrimary}`}
        style={{ fontFamily: '"Geist", sans-serif' }}
      >
        {/* Error Notification */}
        <AnimatePresence>
          {error && (
            <m.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#ff4444]/90 to-[#ff6b00]/90 backdrop-blur-md border border-[#ff4444]/50 shadow-lg flex items-center gap-3">
                <XCircle className="w-5 h-5 text-white flex-shrink-0" />
                <p className="text-white font-semibold flex-1">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="p-1 rounded-full hover:bg-white/20 transition-all"
                >
                  <XCircle className="w-4 h-4 text-white" />
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Achievement Unlock Notification */}
        <AnimatePresence>
          {unlockedAchievements.length > 0 && unlockedAchievements.length !== achievements.filter(a => unlockedAchievementIds.includes(a.id)).length && (
            <m.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed bottom-8 right-8 z-50 max-w-sm"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00ff88]/90 to-[#00d4ff]/90 backdrop-blur-md border-2 border-[#00ff88] shadow-2xl shadow-[#00ff88]/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/20">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1 flex items-center gap-2">
                      <PartyPopper className="w-5 h-5" />
                      Achievement Unlocked!
                    </div>
                    <div className="text-white/90 text-sm">
                      {unlockedAchievements[unlockedAchievements.length - 1]?.name}
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Party Mode Confetti */}
        <AnimatePresence>
          {partyMode && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <m.div
                  key={i}
                  initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
                  animate={{
                    y: window.innerHeight + 100,
                    rotate: Math.random() * 360,
                    opacity: 0
                  }}
                  transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: ['#ff6b00', '#00d4ff', '#00ff88', '#ff4444'][Math.floor(Math.random() * 4)]
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <m.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md ${theme.bgNav} border-b ${theme.borderLight}`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <m.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 sm:gap-3 cursor-pointer"
                onClick={handleLogoClick}
              >
                <div className={`relative w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center ${partyMode ? 'animate-bounce' : ''}`}>
                  <img src="/csync.png" alt="CareerSync" className="w-full h-full object-contain" />
                </div>
                <span className="text-sm sm:text-xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
                  CareerSync
                </span>
              </m.div>

              {/* Desktop Buttons */}
              <div className="hidden sm:flex items-center gap-3">
                <ThemeToggle />
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 text-white rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                  title={soundEnabled ? "Sound On" : "Sound Off"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </m.button>

                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAchievements(true)}
                  className="px-4 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>{unlockedAchievements.length}/{achievements.length}</span>
                </m.button>

                <m.a
                  href="/profile"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                >
                  Profile
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

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center gap-2">
                <ThemeToggle />
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 text-white rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                  title={soundEnabled ? "Sound On" : "Sound Off"}
                >
                  {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </m.button>

                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-1.5 text-white rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                >
                  {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </m.button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {showMobileMenu && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="sm:hidden mt-3 pb-2"
                >
                  <div className="flex flex-col gap-2">
                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAchievements(true)
                        setShowMobileMenu(false)
                      }}
                      className="w-full px-4 py-3 text-left text-white text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Achievements
                      </div>
                      <span className="text-xs text-gray-400">{unlockedAchievements.length}/{achievements.length}</span>
                    </m.button>

                    <m.a
                      href="/profile"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 text-left text-white text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </m.a>

                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        logout()
                        setShowMobileMenu(false)
                      }}
                      className="w-full px-4 py-3 text-left text-white text-sm font-bold rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300 flex items-center gap-2"
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div className="relative z-10 pt-20 sm:pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Header with Motivational Quote */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black leading-none"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%, #00ff88 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dashboard
              </h1>

              {streak > 0 && (
                <m.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#ff6b00]/20 to-[#00ff88]/20 border border-[#ff6b00]/50 self-start sm:self-center"
                >
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6b00]" />
                  <span className="text-sm sm:text-base font-bold" style={{ color: theme.textPrimary }}>{streak} day streak!</span>
                </m.div>
              )}
            </div>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg italic flex items-center gap-2"
              style={{ color: theme.textSecondary }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#00ff88]" />
              {motivationalQuote}
            </m.p>
          </m.div>

          {/* Quick Actions Bar */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 flex flex-col sm:flex-row gap-3"
          >
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="px-4 py-3 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Application
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-3 sm:px-6 sm:py-3 rounded-xl bg-[#1a3a52]/60 border border-[#00d4ff]/20 text-white font-bold flex items-center justify-center gap-2 hover:border-[#00d4ff]/50 transition-all text-sm sm:text-base"
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </m.button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 sm:px-6 sm:py-3 rounded-xl bg-[#1a3a52]/60 border border-[#00d4ff]/20 text-white font-bold hover:border-[#00d4ff]/50 transition-all focus:outline-none focus:border-[#00d4ff]/50 text-sm sm:text-base"
            >
              <option value="date">Sort by Date</option>
              <option value="company">Sort by Company</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </m.div>

          {/* Stats Cards */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8"
          >
            {[
              { label: "Total Apps", value: stats.total, icon: Briefcase, color: "#00d4ff", subtitle: "All time" },
              { label: "Active", value: stats.applied, icon: SendIcon, color: "#00d4ff", subtitle: "Awaiting response" },
              { label: "Interviews", value: stats.interviewing, icon: Users, color: "#ff6b00", subtitle: "In progress" },
              { label: "Offers", value: stats.offers, icon: Trophy, color: "#00ff88", subtitle: "Success!" },
              { label: "Response Rate", value: `${stats.responseRate}%`, icon: TrendingUp, color: "#00ff88", subtitle: "Companies replied" },
            ].map((stat, idx) => (
              <m.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`relative p-4 sm:p-6 rounded-2xl ${theme.bgCard} hover:border-[#00d4ff]/50 transition-all duration-300 overflow-hidden group cursor-pointer`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                  style={{ background: `linear-gradient(135deg, ${stat.color}40, transparent)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: stat.color }} />
                  </div>
                  <div className="text-2xl sm:text-4xl font-black mb-1 sm:mb-2" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold mb-1" style={{ color: theme.textPrimary }}>{stat.label}</div>
                  <div className="text-xs text-gray-400 hidden sm:block">{stat.subtitle}</div>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Secret Stats (Easter Egg) */}
          <AnimatePresence>
            {showSecretStats && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 border-2 border-[#00ff88] overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-[#00ff88]" />
                  <PartyPopper className="w-6 h-6 text-[#00ff88]" />
                  <h3 className="text-xl font-bold" style={{ color: theme.textPrimary }}>Secret Stats Unlocked!</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#00ff88]">{stats.avgDaysToResponse}</div>
                    <div className="text-sm" style={{ color: theme.textSecondary }}>Avg Days to Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#ff6b00]">{stats.successRate}%</div>
                    <div className="text-sm" style={{ color: theme.textSecondary }}>Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#00d4ff]">{stats.highPriority}</div>
                    <div className="text-sm" style={{ color: theme.textSecondary }}>High Priority</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#00ff88]">{stats.withdrawn}</div>
                    <div className="text-sm" style={{ color: theme.textSecondary }}>Withdrawn</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSecretStats(false)}
                  className="mt-4 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Hide Stats
                </button>
              </m.div>
            )}
          </AnimatePresence>

          {/* Filters and Search */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 space-y-4"
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, positions, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#1a3a52]/60 border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all duration-300"
              />
            </div>

            {/* Tab Filters */}
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2">
              {[
                { label: "All", value: "all", count: stats.total, icon: Briefcase },
                { label: "Applied", value: "applied", count: stats.applied, icon: SendIcon },
                { label: "Interviewing", value: "interview", count: stats.interviewing, icon: Users },
                { label: "Offers", value: "offer", count: stats.offers, icon: Trophy },
                { label: "Rejected", value: "rejected", count: stats.rejected, icon: XCircle },
              ].map((tab) => (
                <m.button
                  key={tab.value}
                  onClick={() => setSelectedTab(tab.value as typeof selectedTab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-2 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-1 sm:gap-2 ${
                    selectedTab === tab.value
                      ? "bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white shadow-lg"
                      : "bg-[#1a3a52]/60 border border-[#00d4ff]/20 text-gray-400 hover:text-white hover:border-[#00d4ff]/50"
                  }`}
                >
                  <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  {tab.label}
                  <span
                    className={`px-1 sm:px-2 py-0.5 rounded-full text-xs font-bold ${
                      selectedTab === tab.value ? "bg-white/20" : "bg-[#00d4ff]/20"
                    }`}
                  >
                    {tab.count}
                  </span>
                </m.button>
              ))}
            </div>
          </m.div>

          {/* Applications List/Grid */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}
          >
            {/* Loading State */}
            {loading && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#ff6b00]/20 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>Loading applications...</h3>
                <p style={{ color: theme.textSecondary }}>Fetching your job applications</p>
              </m.div>
            )}

            {/* Error State */}
            {error && !loading && (
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ff4444]/20 to-[#ff6b00]/20 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-[#ff4444]" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>Failed to load applications</h3>
                <p style={{ color: theme.textSecondary }} className="mb-6">{error}</p>
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchApplications}
                  className="px-8 py-3 text-white font-bold rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
                >
                  Try Again
                </m.button>
              </m.div>
            )}

            {/* Applications */}
            {!loading && !error && (
              <AnimatePresence mode="popLayout">
                {filteredApplications.map((app, idx) => {
                  const StatusIcon = getStatusIcon(app.status)
                  const statusColor = getStatusColor(app.status)

                  return (
                    <m.div
                      key={app._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`group relative p-4 sm:p-6 rounded-2xl ${theme.bgCard} hover:border-[#00d4ff]/50 transition-all duration-300 overflow-hidden cursor-pointer`}
                      onClick={() => {
                        setSelectedApp(app)
                        setShowDetailModal(true)
                      }}
                    >
                      {/* Priority indicator */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 ${
                          app.priority === "high"
                            ? "bg-[#ff6b00]"
                            : app.priority === "medium"
                              ? "bg-[#00d4ff]"
                              : "bg-gray-500"
                        }`}
                      />

                      {/* Background glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"
                        style={{ background: `linear-gradient(135deg, ${statusColor}40, transparent)` }}
                      />

                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div
                              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                              style={{
                                background: `linear-gradient(135deg, ${statusColor}40, ${statusColor}20)`,
                              }}
                            >
                              {app.company.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-lg sm:text-xl font-bold group-hover:text-[#00d4ff] transition-colors truncate" style={{ color: theme.textPrimary }}>
                                {app.company}
                              </h3>
                              <p className="text-sm truncate" style={{ color: theme.textSecondary }}>{app.position}</p>
                            </div>
                          </div>

                          <span className="flex-shrink-0">{getPriorityIcon(app.priority)}</span>
                        </div>

                        {/* Status Badge */}
                        <div
                          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 self-start"
                          style={{
                            backgroundColor: `${statusColor}20`,
                            color: statusColor,
                            border: `1px solid ${statusColor}50`,
                          }}
                        >
                          <StatusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </div>

                        {/* Details */}
                        <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#00d4ff]" />
                            <span className="truncate">{new Date(app.applicationDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          </div>
                          {app.location && (
                            <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#ff6b00]" />
                              <span className="truncate">{app.location}</span>
                            </div>
                          )}
                          {app.salary && (
                            <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ff88]" />
                              <span className="truncate">{app.salary}</span>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3 sm:mb-4">
                          <div className="flex items-center justify-between mb-1 sm:mb-2">
                            <span className="text-xs" style={{ color: theme.textSecondary }}>Progress</span>
                            <span className="text-xs font-bold" style={{ color: statusColor }}>
                              {app.progress}%
                            </span>
                          </div>
                          <div className="h-2 bg-[#0f2540] rounded-full overflow-hidden">
                            <m.div
                              initial={{ width: 0 }}
                              animate={{ width: `${app.progress}%` }}
                              transition={{ duration: 1, delay: idx * 0.05 }}
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <m.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              setSelectedApp(app)
                              setShowDetailModal(true)
                            }}
                            className="p-1.5 sm:p-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
                            title="View Details"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </m.button>
                          {app.jobUrl && (
                            <m.a
                              href={app.jobUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e: React.MouseEvent) => e.stopPropagation()}
                              className="p-1.5 sm:p-2 rounded-lg bg-[#ff6b00]/20 border border-[#ff6b00]/50 text-[#ff6b00] hover:bg-[#ff6b00]/30 transition-all"
                              title="View Job Posting"
                            >
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            </m.a>
                          )}
                          <m.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              handleDeleteApplication(app._id)
                            }}
                            className="p-1.5 sm:p-2 rounded-lg bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444] hover:bg-[#ff4444]/30 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </m.button>
                        </div>
                      </div>
                    </m.div>
                  )
                })}
              </AnimatePresence>
            )}

            {/* Empty State */}
            {!loading && !error && filteredApplications.length === 0 && (
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#ff6b00]/20 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>No applications found</h3>
                <p style={{ color: theme.textSecondary }} className="mb-6">
                  {searchQuery ? "Try adjusting your search" : "Start tracking your job applications"}
                </p>
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="px-8 py-3 text-white font-bold rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Application
                </m.button>
              </m.div>
            )}
          </m.div>
        </div>

        {/* Add Application Modal */}
        <AnimatePresence>
          {showAddModal && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            >
              <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-3xl ${theme.bgModal} shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3" style={{ color: theme.textPrimary }}>
                    <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-[#00d4ff]" />
                    New Application
                  </h2>
                  <m.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
                  >
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </m.button>
                </div>

                <form onSubmit={handleAddApplication} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Company *</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Google, Microsoft..."
                        required
                        className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Position *</label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        placeholder="Software Engineer..."
                        required
                        className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="San Francisco, CA / Remote"
                        className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Salary Range</label>
                      <input
                        type="text"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                        placeholder="$100k - $150k"
                        className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Job URL</label>
                    <input
                      type="url"
                      value={formData.jobUrl}
                      onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
                      placeholder="https://example.com/job"
                      className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Status *</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Application['status'] })}
                        className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                      >
                        <option value="applied">Applied</option>
                        <option value="interview">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Priority</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as Application['priority'] })}
                        className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Contact Info</label>
                    <input
                      type="text"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                      placeholder="recruiter@company.com or John Doe"
                      className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2" style={{ color: theme.textSecondary }}>Notes</label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Add any additional notes about the application..."
                      className={`w-full px-3 sm:px-4 py-3 rounded-xl ${theme.bgInput} text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none text-sm sm:text-base`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <m.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAddModal(false)}
                      className={`flex-1 px-4 sm:px-6 py-3 rounded-xl ${theme.bgButtonSecondary} text-white font-bold hover:border-[#00d4ff]/50 transition-all text-sm sm:text-base`}
                    >
                      Cancel
                    </m.button>
                    <m.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      Add Application
                    </m.button>
                  </div>
                </form>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Detail Modal */}
        <AnimatePresence>
          {showDetailModal && selectedApp && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDetailModal(false)}
            >
              <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-3xl ${theme.bgModal} shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3" style={{ color: theme.textPrimary }}>
                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#00d4ff]" />
                    Application Details
                  </h2>
                  <m.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
                  >
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </m.button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Company Header */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${getStatusColor(selectedApp.status)}40, ${getStatusColor(selectedApp.status)}20)`,
                      }}
                    >
                      {selectedApp.company.charAt(0)}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2" style={{ color: theme.textPrimary }}>{selectedApp.company}</h3>
                      <p className="text-lg sm:text-xl" style={{ color: theme.textPrimary }}>{selectedApp.position}</p>
                    </div>
                    <div className="p-3 sm:p-4 bg-white/5 rounded-lg flex items-center justify-center">
                      <div className="scale-125 sm:scale-150">{getPriorityIcon(selectedApp.priority)}</div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                      <div className="text-sm mb-2" style={{ color: theme.textSecondary }}>Status</div>
                      <div
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-base sm:text-lg font-bold"
                        style={{
                          backgroundColor: `${getStatusColor(selectedApp.status)}20`,
                          color: getStatusColor(selectedApp.status),
                          border: `2px solid ${getStatusColor(selectedApp.status)}50`,
                        }}
                      >
                        {React.createElement(getStatusIcon(selectedApp.status), { className: "w-4 h-4 sm:w-5 sm:h-5" })}
                        {selectedApp.status.charAt(0).toUpperCase() + selectedApp.status.slice(1)}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                      <div className="text-sm mb-2" style={{ color: theme.textSecondary }}>Progress</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-[#1a3a52] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${selectedApp.progress}%`,
                              background: `linear-gradient(90deg, ${getStatusColor(selectedApp.status)}, ${getStatusColor(selectedApp.status)}80)`,
                            }}
                          />
                        </div>
                        <span className="text-base sm:text-lg font-bold" style={{ color: getStatusColor(selectedApp.status) }}>
                          {selectedApp.progress}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedApp.location && (
                      <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                        <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                          <MapPin className="w-4 h-4 text-[#ff6b00]" />
                          Location
                        </div>
                        <div style={{ color: theme.textPrimary }} className="font-semibold">{selectedApp.location}</div>
                      </div>
                    )}

                    {selectedApp.salary && (
                      <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                        <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                          <DollarSign className="w-4 h-4 text-[#00ff88]" />
                          Salary Range
                        </div>
                        <div style={{ color: theme.textPrimary }} className="font-semibold">{selectedApp.salary}</div>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                      <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                        <Calendar className="w-4 h-4 text-[#00d4ff]" />
                        Applied On
                      </div>
                      <div style={{ color: theme.textPrimary }} className="font-semibold">
                        {new Date(selectedApp.applicationDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                      <div className="flex items-center gap-2 text-sm mb-1" style={{ color: theme.textSecondary }}>
                        <Clock className="w-4 h-4 text-[#00d4ff]" />
                        Last Updated
                      </div>
                      <div style={{ color: theme.textPrimary }} className="font-semibold">
                        {new Date(selectedApp.lastUpdated).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  {selectedApp.contactInfo && (
                    <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                      <div className="flex items-center gap-2 text-sm mb-2" style={{ color: theme.textSecondary }}>
                        <Users className="w-4 h-4 text-[#00d4ff]" />
                        Contact Information
                      </div>
                      <div style={{ color: theme.textPrimary }} className="font-semibold">{selectedApp.contactInfo}</div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedApp.notes && (
                    <div className="p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20">
                      <div className="flex items-center gap-2 text-sm mb-2" style={{ color: theme.textSecondary }}>
                        <FileText className="w-4 h-4 text-[#00d4ff]" />
                        Notes
                      </div>
                      <div style={{ color: theme.textPrimary }} className="whitespace-pre-wrap">{selectedApp.notes}</div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedApp.jobUrl && (
                      <m.a
                        href={selectedApp.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] font-bold hover:bg-[#00d4ff]/30 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        View Job Posting
                      </m.a>
                    )}
                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDetailModal(false)}
                      className="px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all text-sm sm:text-base"
                    >
                      Close
                    </m.button>
                  </div>
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Achievements Modal */}
        <AnimatePresence>
          {showAchievements && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAchievements(false)}
            >
              <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 rounded-3xl ${theme.bgModal} shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3" style={{ color: theme.textPrimary }}>
                    <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#00ff88]" />
                    Achievements
                    <span className="text-base sm:text-lg" style={{ color: theme.textSecondary }}>({unlockedAchievements.length}/{achievements.length})</span>
                  </h2>
                  <m.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAchievements(false)}
                    className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
                  >
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </m.button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: theme.textSecondary }}>Overall Progress</span>
                    <span className="text-sm font-bold text-[#00ff88]">
                      {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-[#0f2540] rounded-full overflow-hidden">
                    <m.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff]"
                    />
                  </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-xl bg-[#0f2540]/60 border border-[#00d4ff]/20 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#00d4ff] mb-1">{userStats.totalApplications}</div>
                    <div className="text-xs" style={{ color: theme.textSecondary }}>Total Applications</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-[#0f2540]/60 border border-[#ff6b00]/20 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#ff6b00] mb-1 flex items-center justify-center gap-1">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                      {streak}
                    </div>
                    <div className="text-xs" style={{ color: theme.textSecondary }}>Current Streak</div>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-[#0f2540]/60 border border-[#00ff88]/20 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#00ff88] mb-1 flex items-center justify-center gap-1">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                      {userStats.longestStreak}
                    </div>
                    <div className="text-xs" style={{ color: theme.textSecondary }}>Longest Streak</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <m.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: achievement.id * 0.05 }}
                      className={`p-4 sm:p-6 rounded-2xl border-2 transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 border-[#00ff88]/50'
                          : 'bg-[#0f2540]/60 border-gray-700 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`p-2 sm:p-3 rounded-xl ${
                          achievement.unlocked
                            ? 'bg-gradient-to-br from-[#00ff88]/40 to-[#00d4ff]/40'
                            : 'bg-gray-800'
                        }`}>
                          <achievement.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${
                            achievement.unlocked ? 'text-[#00ff88]' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-base sm:text-lg font-bold mb-1 flex items-center gap-2`} style={{ color: achievement.unlocked ? theme.textPrimary : theme.textSecondary }}>
                            {achievement.name}
                            {achievement.unlocked && <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#00ff88]" />}
                          </h3>
                          <p className={`text-sm sm:text-base ${achievement.unlocked ? '' : 'text-gray-600'}`} style={achievement.unlocked ? { color: theme.textSecondary } : {}}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </RouteGuard>
  )
}
