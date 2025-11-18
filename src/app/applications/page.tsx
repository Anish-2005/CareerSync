'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Building, MapPin, Clock, CheckCircle, XCircle, AlertCircle, Eye, FileText, ExternalLink, Menu, X, BarChart3, Briefcase, User, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import ThemeToggle from '@/components/ThemeToggle'

const m = motion as any

interface Application {
  id: string
  jobId: string
  jobTitle: string
  company: string
  location: string
  appliedDate: Date
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  notes?: string
  followUpDate?: Date
  applicationUrl?: string
  salary?: {
    offered?: number
    expected?: number
    currency: string
  }
}

export default function ApplicationsPage() {
  const { user, logout } = useAuth()
  const theme = useThemeClasses()
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [statusFilter, setStatusFilter] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch applications from API
  const fetchApplications = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const token = await user.getIdToken()
      const params = new URLSearchParams()
      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter)
      }

      const response = await fetch(`/api/applications?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }

      const data = await response.json()
      setApplications(data.applications)
      setFilteredApplications(data.applications)
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [user])

  // Filter applications based on status
  useEffect(() => {
    if (!statusFilter || statusFilter === 'all') {
      setFilteredApplications(applications)
    } else {
      setFilteredApplications(applications.filter(app => app.status === statusFilter))
    }
  }, [applications, statusFilter])

  // Refetch when status filter changes
  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [statusFilter])

  const createApplication = async (job: any) => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const applicationData = {
        jobId: job._id || job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        status: 'pending',
        notes: '',
        salary: job.salary ? { expected: job.salary.min, currency: job.salary.currency } : undefined,
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      })

      if (response.ok) {
        // Refresh applications list
        fetchApplications()
        alert('Application submitted successfully!')
      } else {
        alert('Failed to submit application')
      }
    } catch (err) {
      console.error('Error creating application:', err)
      alert('Failed to submit application')
    }
  }

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending': return { bg: 'rgba(156,163,175,0.12)', border: 'rgba(156,163,175,0.28)', text: '#6b7280' }
      case 'reviewing': return { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.28)', text: '#3b82f6' }
      case 'interview': return { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.28)', text: '#d97706' }
      case 'offer': return { bg: 'rgba(0,255,136,0.12)', border: 'rgba(0,255,136,0.28)', text: '#00ff88' }
      case 'rejected': return { bg: 'rgba(255,68,68,0.12)', border: 'rgba(255,68,68,0.28)', text: '#ff4444' }
      case 'withdrawn': return { bg: 'rgba(107,114,128,0.12)', border: 'rgba(107,114,128,0.28)', text: '#6b7280' }
      default: return { bg: 'rgba(156,163,175,0.12)', border: 'rgba(156,163,175,0.28)', text: '#6b7280' }
    }
  }

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'reviewing': return <Eye className="w-4 h-4" />
      case 'interview': return <Calendar className="w-4 h-4" />
      case 'offer': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      case 'withdrawn': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatStatus = (status: Application['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const getTimeAgo = (date: Date | undefined | null) => {
    if (!date) return 'Unknown'

    const now = new Date()
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }

  const getStats = () => {
    const total = applications.length
    const interviewing = applications.filter(app => app.status === 'interview').length
    const offers = applications.filter(app => app.status === 'offer').length
    const pending = applications.filter(app => app.status === 'pending' || app.status === 'reviewing').length

    return { total, interviewing, offers, pending }
  }

  const stats = getStats()

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
                      href="/resume-builder"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium rounded-full"
                      style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                    >
                      Resume Builder
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
                        href="/resume-builder"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <FileText className="w-4 h-4" />
                        Resume Builder
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
              background: theme.theme === 'light'
                ? 'linear-gradient(135deg, rgba(59,130,246,0.6), rgba(29,78,216,0.6))'
                : 'linear-gradient(135deg, rgba(255,107,0,0.5), rgba(0,212,255,0.5))',
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
              background: theme.theme === 'light'
                ? 'linear-gradient(135deg, rgba(16,185,129,0.45), rgba(59,130,246,0.45))'
                : 'linear-gradient(135deg, rgba(0,212,255,0.45), rgba(255,107,0,0.45))',
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
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-3 sm:mb-4 leading-tight"
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
              My Applications
            </h1>
            <p style={{ color: theme.textSecondary }} className="text-sm sm:text-base md:text-xl">Track your job applications and stay organized</p>
          </m.div>

          {/* Stats Cards */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
              <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: theme.textPrimary }}>{stats.total}</div>
              <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Total</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
              <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#d97706' }}>{stats.interviewing}</div>
              <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Interviewing</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
              <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#00ff88' }}>{stats.offers}</div>
              <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Offers</div>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
              <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#3b82f6' }}>{stats.pending}</div>
              <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Pending</div>
            </div>
          </m.div>

          {/* Filters */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-4 sm:mb-6"
          >
            <div className="flex flex-wrap gap-2 sm:gap-2">
              <button
                onClick={() => setStatusFilter('')}
                className="px-3 sm:px-4 py-2 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all min-w-0 flex-shrink-0"
                style={{
                  background: !statusFilter ? (theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)') : theme.bgCard,
                  color: !statusFilter ? '#fff' : theme.textPrimary,
                  border: `1px solid ${theme.borderMedium}`,
                  boxShadow: !statusFilter ? `0 0 0 2px ${theme.theme === 'light' ? '#3b82f6' : '#00d4ff'}` : undefined
                }}
              >
                All ({applications.length})
              </button>
              {['pending', 'reviewing', 'interview', 'offer', 'rejected'].map(status => {
                const count = applications.filter(app => app.status === status).length
                const statusColor = getStatusColor(status as Application['status'])
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className="px-3 sm:px-4 py-2 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all min-w-0 flex-shrink-0"
                    style={{
                      background: statusFilter === status ? statusColor.bg : theme.bgCard,
                      color: statusFilter === status ? statusColor.text : theme.textPrimary,
                      border: `1px solid ${theme.borderMedium}`,
                      boxShadow: statusFilter === status ? `0 0 0 2px ${statusColor.border}` : undefined
                    }}
                  >
                    {formatStatus(status as Application['status'])} ({count})
                  </button>
                )
              })}
            </div>
          </m.div>

          {/* Applications List */}
          <div className="space-y-4">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl animate-pulse"
                  style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6">
                    <div className="flex-1">
                      <div className="h-5 sm:h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                      <div className="h-3 sm:h-4 bg-gray-300 rounded mb-3 sm:mb-4 w-1/2"></div>
                      <div className="h-3 sm:h-4 bg-gray-300 rounded w-1/3"></div>
                    </div>
                    <div className="h-8 sm:h-10 bg-gray-300 rounded-lg sm:rounded-xl w-20 sm:w-24"></div>
                  </div>
                </m.div>
              ))
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: theme.textTertiary }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>No applications found</h3>
                <p style={{ color: theme.textSecondary }}>Try adjusting your filter or start applying to jobs!</p>
              </div>
            ) : (
              filteredApplications.map((application, idx) => {
                const statusColor = getStatusColor(application.status)
                return (
                  <m.div
                    key={application.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl hover:border-2 transition-all duration-300"
                    style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6">
                      {/* Application Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 truncate" style={{ color: theme.textPrimary }}>{application.jobTitle}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3" style={{ color: theme.textSecondary }}>
                              <div className="flex items-center gap-1 min-w-0">
                                <Building className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="font-semibold truncate">{application.company}</span>
                              </div>
                              <div className="flex items-center gap-1 min-w-0">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{application.location}</span>
                              </div>
                              <div className="flex items-center gap-1 min-w-0">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">Applied {getTimeAgo(application.appliedDate)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status and Notes */}
                        <div className="mb-3 sm:mb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 mb-3">
                            <span
                              className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold self-start"
                              style={{ background: statusColor.bg, border: `1px solid ${statusColor.border}`, color: statusColor.text }}
                            >
                              {getStatusIcon(application.status)}
                              {formatStatus(application.status)}
                            </span>
                            {application.followUpDate && (
                              <span className="text-xs sm:text-sm" style={{ color: theme.textTertiary }}>
                                Follow up: {new Date(application.followUpDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>

                          {application.notes && (
                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textTertiary }}>
                              {application.notes}
                            </p>
                          )}
                        </div>

                        {/* Salary Info */}
                        {application.salary && (
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                            {application.salary.expected && (
                              <div style={{ color: theme.textSecondary }}>
                                Expected: ${application.salary.expected.toLocaleString()}
                              </div>
                            )}
                            {application.salary.offered && (
                              <div style={{ color: '#00ff88', fontWeight: 'bold' }}>
                                Offered: ${application.salary.offered.toLocaleString()}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 lg:min-w-[140px] sm:min-w-[120px]">
                        {application.applicationUrl && (
                          <m.a
                            href={application.applicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex-1 sm:flex-none"
                            style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">View Application</span>
                            <span className="sm:hidden">View</span>
                          </m.a>
                        )}

                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm flex-1 sm:flex-none"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          Update Status
                        </m.button>
                      </div>
                    </div>
                  </m.div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </RouteGuard>
  )
}