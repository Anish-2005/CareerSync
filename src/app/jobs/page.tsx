'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Building, Clock, Bookmark, BookmarkCheck, Filter, Briefcase, DollarSign, Users, Menu, X, BarChart3, ClipboardList, FileText, User, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import ThemeToggle from '@/components/ThemeToggle'

const m = motion as any

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  salary?: {
    min: number
    max: number
    currency: string
  }
  description: string
  requirements: string[]
  postedDate: Date
  applicationDeadline?: Date
  companyLogo?: string
  tags: string[]
  remote: boolean
  experience: string
}

export default function JobsPage() {
  const { user, logout } = useAuth()
  const theme = useThemeClasses()
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [experienceFilter, setExperienceFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (searchQuery) params.append('search', searchQuery)
      if (locationFilter) params.append('location', locationFilter)
      if (typeFilter) params.append('type', typeFilter)
      if (experienceFilter) params.append('experience', experienceFilter)

      const response = await fetch(`/api/jobs?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }

      const data = await response.json()
      setJobs(data.jobs)
      setFilteredJobs(data.jobs)
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  // Fetch saved jobs
  const fetchSavedJobs = async () => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/saved-jobs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const savedJobIds: Set<string> = new Set(data.savedJobs.map((saved: any) => (saved.jobId?.id || saved.jobId) as string))
        setSavedJobs(savedJobIds)
      }
    } catch (err) {
      console.error('Error fetching saved jobs:', err)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchJobs()
    if (user) {
      fetchSavedJobs()
    }
  }, [user])

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesType = !typeFilter || job.type === typeFilter
      const matchesExperience = !experienceFilter || job.experience === experienceFilter

      return matchesSearch && matchesLocation && matchesType && matchesExperience
    })

    setFilteredJobs(filtered)
  }, [jobs, searchQuery, locationFilter, typeFilter, experienceFilter])

  const toggleSaveJob = async (jobId: string) => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const isCurrentlySaved = savedJobs.has(jobId)

      if (isCurrentlySaved) {
        // Unsave job
        const response = await fetch(`/api/saved-jobs?jobId=${jobId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (response.ok) {
          setSavedJobs(prev => {
            const newSet = new Set(prev)
            newSet.delete(jobId)
            return newSet
          })
        }
      } else {
        // Save job
        const response = await fetch('/api/saved-jobs', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jobId }),
        })

        if (response.ok) {
          setSavedJobs(prev => new Set([...prev, jobId]))
        }
      }
    } catch (err) {
      console.error('Error toggling save job:', err)
    }
  }

  const createApplication = async (job: Job) => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        status: 'pending',
        notes: '',
        salary: job.salary && job.salary.min ? { expected: job.salary.min, currency: job.salary.currency } : undefined,
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
        alert('Application submitted successfully!')
        // Optionally navigate to applications page
        // window.location.href = '/applications'
      } else {
        alert('Failed to submit application')
      }
    } catch (err) {
      console.error('Error creating application:', err)
      alert('Failed to submit application')
    }
  }

  const formatSalary = (salary?: Job['salary']) => {
    if (!salary || !salary.min || !salary.max) return 'Salary not disclosed'
    if (salary.currency === 'USD/hour') {
      return `$${salary.min}-${salary.max}/hour`
    }
    return `$${salary.min.toLocaleString()}-${salary.max.toLocaleString()}`
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
                      href="/applications"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium rounded-full"
                      style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                    >
                      Applications
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
                ? 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.6), rgba(29,78,216,0.4))'
                : 'radial-gradient(circle at 30% 30%, rgba(0,212,255,0.6), rgba(255,107,0,0.4))',
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
                ? 'radial-gradient(circle at 70% 70%, rgba(16,185,129,0.5), rgba(59,130,246,0.3))'
                : 'radial-gradient(circle at 70% 70%, rgba(255,107,0,0.5), rgba(0,212,255,0.3))',
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
              Find Your Dream Job
            </h1>
            <p style={{ color: theme.textSecondary }} className="text-base sm:text-xl">Discover opportunities that match your skills and career goals</p>
          </m.div>

          {/* Search and Filters */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme.textTertiary }} />
                <input
                  type="text"
                  placeholder="Search jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: theme.bgInputStyle?.backgroundColor || '#ffffff',
                    border: `1px solid ${theme.borderMedium}`,
                    color: theme.textPrimary,
                    '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                  } as any}
                />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: theme.textTertiary }} />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 transition-all min-w-[200px]"
                  style={{
                    background: theme.bgInputStyle?.backgroundColor || '#ffffff',
                    border: `1px solid ${theme.borderMedium}`,
                    color: theme.textPrimary,
                    '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                  } as any}
                />
              </div>

              {/* Filter Toggle */}
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 rounded-2xl font-bold flex items-center gap-2"
                style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
              >
                <Filter className="w-5 h-5" />
                Filters
              </m.button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-6 rounded-2xl"
                  style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Job Type</label>
                      <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                        style={{
                          background: theme.bgInputStyle?.backgroundColor || '#ffffff',
                          border: `1px solid ${theme.borderMedium}`,
                          color: theme.textPrimary,
                          '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                        } as any}
                      >
                        <option value="">All Types</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Experience Level</label>
                      <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                        style={{
                          background: theme.bgInputStyle?.backgroundColor || '#ffffff',
                          border: `1px solid ${theme.borderMedium}`,
                          color: theme.textPrimary,
                          '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                        } as any}
                      >
                        <option value="">All Levels</option>
                        <option value="Entry-level">Entry Level</option>
                        <option value="Mid-level">Mid Level</option>
                        <option value="Senior">Senior</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setTypeFilter('')
                          setExperienceFilter('')
                          setLocationFilter('')
                          setSearchQuery('')
                        }}
                        className="w-full px-4 py-3 rounded-xl font-bold"
                        style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>

          {/* Job Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 sm:p-6 rounded-3xl animate-pulse"
                  style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    <div className="h-10 bg-gray-300 rounded-xl w-full mt-4"></div>
                  </div>
                </m.div>
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Briefcase className="w-16 h-16 mx-auto mb-4" style={{ color: theme.textTertiary }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>No jobs found</h3>
                <p style={{ color: theme.textSecondary }}>Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              filteredJobs.map((job, idx) => (
                <m.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 sm:p-6 rounded-3xl hover:border-2 transition-all duration-300 group flex flex-col h-full"
                  style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                >
                  <div className="flex flex-col h-full">
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2" style={{ color: theme.textPrimary }}>{job.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3" style={{ color: theme.textSecondary }}>
                          <div className="flex items-center gap-1 min-w-0">
                            <Building className="w-4 h-4 flex-shrink-0" />
                            <span className="font-semibold truncate">{job.company}</span>
                          </div>
                          <div className="flex items-center gap-1 min-w-0">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <m.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSaveJob(job.id)}
                        className="p-2 rounded-xl flex-shrink-0 ml-2"
                        style={{
                          background: savedJobs.has(job.id) ? "rgba(0,255,136,0.12)" : "rgba(156,163,175,0.12)",
                          border: `1px solid ${savedJobs.has(job.id) ? "rgba(0,255,136,0.28)" : "rgba(156,163,175,0.28)"}`,
                          color: savedJobs.has(job.id) ? "#00ff88" : "#6b7280"
                        }}
                      >
                        {savedJobs.has(job.id) ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                      </m.button>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                        <Briefcase className="w-4 h-4 flex-shrink-0" style={{ color: theme.textAccent }} />
                        <span className="capitalize text-sm truncate">{job.type.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                        <DollarSign className="w-4 h-4 flex-shrink-0" style={{ color: theme.textAccent }} />
                        <span className="text-sm truncate">{formatSalary(job.salary)}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                        <Users className="w-4 h-4 flex-shrink-0" style={{ color: theme.textAccent }} />
                        <span className="text-sm truncate">{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                        <Clock className="w-4 h-4 flex-shrink-0" style={{ color: theme.textAccent }} />
                        <span className="text-sm truncate">{getTimeAgo(job.postedDate)}</span>
                      </div>
                    </div>

                    {/* Job Description */}
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: theme.textTertiary }}>
                      {job.description.length > 120 ? `${job.description.substring(0, 120)}...` : job.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2 py-1 rounded-full text-xs font-semibold truncate max-w-[100px]"
                          style={{
                            background: theme.theme === 'light' ? 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(29,78,216,0.08))' : 'linear-gradient(90deg, rgba(0,212,255,0.08), rgba(255,107,0,0.06))',
                            border: `1px solid ${theme.borderMedium}`,
                            color: theme.textAccent
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 3 && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ color: theme.textTertiary }}>
                          +{job.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Apply Button */}
                    <div className="mt-auto">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => createApplication(job)}
                        className="w-full px-4 py-3 rounded-xl font-bold text-sm"
                        style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                      >
                        Apply Now
                      </m.button>

                      {job.applicationDeadline && (
                        <div className="text-center mt-2">
                          <p className="text-xs" style={{ color: theme.textTertiary }}>
                            Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </m.div>
              ))
            )}
          </div>
        </div>
      </div>
    </RouteGuard>
  )
}