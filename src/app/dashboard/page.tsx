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
import BackgroundEffects from "@/components/dashboard/BackgroundEffects"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import QuickActions from "@/components/dashboard/QuickActions"
import StatsCards from "@/components/dashboard/StatsCards"
import SecretStats from "@/components/dashboard/SecretStats"
import ApplicationFilters from "@/components/dashboard/ApplicationFilters"
import ApplicationsList from "@/components/dashboard/ApplicationsList"
import AddApplicationModal from "@/components/dashboard/AddApplicationModal"
import ApplicationDetailModal from "@/components/dashboard/ApplicationDetailModal"
import AchievementsModal from "@/components/dashboard/AchievementsModal"
import DashboardNavigation from "@/components/dashboard/DashboardNavigation"

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

  // --- RENDER HANDLING USING theme hook's inline style objects ---
  // Fallback helpers
  const safeBgPrimary = theme.bgPrimaryStyle || {}
  const safeBgNav = theme.bgNavStyle || {}
  const safeBorderLight = theme.borderLight || (theme.borderMedium || "#e2e8f0")
  const safeMorph1 = theme.morphShape1 || "linear-gradient(135deg, rgba(255,107,0,0.3), rgba(0,212,255,0.3))"
  const safeMorph2 = theme.morphShape2 || "linear-gradient(225deg, rgba(0,255,136,0.2), rgba(255,107,0,0.2)"
  const safeBgInput = theme.bgInputStyle || {}
  const safeBgButtonSecondary = theme.bgButtonSecondaryStyle || {}

  const unlockedAchievements = achievements.filter(a => a.unlocked)
  return (
    <RouteGuard>
      <div
        style={{ minHeight: "100vh", overflow: "hidden", fontFamily: '"Geist", sans-serif', ...(safeBgPrimary as any) }}
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
              <div className="p-4 rounded-xl bg-gradient-to-br backdrop-blur-md border shadow-lg flex items-center gap-3"
                style={{
                  background: theme.theme === 'light'
                    ? "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 101, 101, 0.1))"
                    : "linear-gradient(135deg, rgba(255, 68, 68, 0.9), rgba(255, 107, 0, 0.9))",
                  borderColor: theme.theme === 'light'
                    ? "rgba(239, 68, 68, 0.2)"
                    : "#ff4444",
                  boxShadow: theme.theme === 'light'
                    ? "0 4px 14px rgba(239, 68, 68, 0.15)"
                    : "0 10px 30px rgba(255, 68, 68, 0.25)"
                }}
              >
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
              <div className="p-6 rounded-2xl bg-gradient-to-br border-2 shadow-2xl shadow-[#00ff88]/50"
                style={{
                  background: theme.theme === 'light'
                    ? "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))"
                    : "linear-gradient(135deg, rgba(0, 255, 136, 0.9), rgba(0, 212, 255, 0.9))",
                  borderColor: theme.theme === 'light'
                    ? "rgba(34, 197, 94, 0.3)"
                    : "#00ff88",
                  boxShadow: theme.theme === 'light'
                    ? "0 10px 30px rgba(34, 197, 94, 0.15)"
                    : "0 20px 40px rgba(0, 255, 136, 0.5)"
                }}
              >
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
                    background: theme.theme === 'light'
                      ? ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 4)]
                      : ['#ff6b00', '#00d4ff', '#00ff88', '#ff4444'][Math.floor(Math.random() * 4)]
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <DashboardNavigation
          theme={theme}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          unlockedAchievementsCount={unlockedAchievements.length}
          onShowAchievements={() => setShowAchievements(true)}
          showMobileMenu={showMobileMenu}
          onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
          onLogoClick={handleLogoClick}
          partyMode={partyMode}
        />

        {/* Background Effects */}
        <BackgroundEffects theme={theme} />

        {/* Main Content */}
        <div className="relative z-10 pt-20 sm:pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Header with Motivational Quote */}
          <DashboardHeader
            theme={theme}
            streak={streak}
            motivationalQuote={motivationalQuote}
          />

          {/* Quick Actions Bar */}
          <QuickActions
            theme={theme}
            onAddApplication={() => setShowAddModal(true)}
            viewMode={viewMode}
            onToggleViewMode={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            sortBy={sortBy}
            onSortChange={(sort) => setSortBy(sort)}
          />

          {/* Stats Cards */}
          <StatsCards theme={theme} stats={stats} />

          {/* Secret Stats (Easter Egg) */}
          <SecretStats
            theme={theme}
            showSecretStats={showSecretStats}
            onClose={() => setShowSecretStats(false)}
            stats={{
              avgDaysToResponse: stats.avgDaysToResponse,
              successRate: stats.successRate,
              highPriority: stats.highPriority,
              withdrawn: stats.withdrawn
            }}
          />

          {/* Filters and Search */}
          <ApplicationFilters
            theme={theme}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            stats={stats}
          />

          {/* Applications List/Grid */}
          <ApplicationsList
            theme={theme}
            loading={loading}
            error={error}
            applications={filteredApplications}
            viewMode={viewMode}
            onViewDetails={(app) => {
              setSelectedApp(app)
              setShowDetailModal(true)
            }}
            onDelete={handleDeleteApplication}
            onRetry={fetchApplications}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getPriorityIcon={getPriorityIcon}
          />
        </div>

        {/* Add Application Modal */}
        <AddApplicationModal
          theme={theme}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={async (formData) => {
            await handleAddApplication({ preventDefault: () => {} } as any)
          }}
        />

        {/* Detail Modal */}
        <ApplicationDetailModal
          theme={theme}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          application={selectedApp}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          getPriorityIcon={getPriorityIcon}
        />

        {/* Achievements Modal */}
        <AchievementsModal
          theme={theme}
          isOpen={showAchievements}
          onClose={() => setShowAchievements(false)}
          achievements={achievements}
          unlockedAchievements={unlockedAchievements}
          userStats={userStats}
          streak={streak}
        />
      </div>
    </RouteGuard>
  )
}
