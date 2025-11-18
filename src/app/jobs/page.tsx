'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Building, Clock, Bookmark, BookmarkCheck, Filter, Briefcase, DollarSign, Users } from 'lucide-react'
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
  const { user } = useAuth()
  const theme = useThemeClasses()
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [experienceFilter, setExperienceFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none transition-all"
                  style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
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
                  className="w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none transition-all min-w-[200px]"
                  style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
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
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
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
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ background: theme.bgInput, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
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
          <div className="space-y-4 sm:space-y-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-3xl animate-pulse"
                  style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    <div className="h-10 bg-gray-300 rounded-xl w-24"></div>
                  </div>
                </m.div>
              ))
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
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
                  className="p-4 sm:p-8 rounded-3xl hover:border-2 transition-all duration-300 group"
                  style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>{job.title}</h3>
                          <div className="flex items-center gap-4 mb-3" style={{ color: theme.textSecondary }}>
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              <span className="font-semibold">{job.company}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{getTimeAgo(job.postedDate)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Save Button */}
                        <m.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleSaveJob(job.id)}
                          className="p-2 rounded-xl"
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                          <Briefcase className="w-4 h-4" style={{ color: theme.textAccent }} />
                          <span className="capitalize">{job.type.replace('-', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                          <DollarSign className="w-4 h-4" style={{ color: theme.textAccent }} />
                          <span>{formatSalary(job.salary)}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: theme.textSecondary }}>
                          <Users className="w-4 h-4" style={{ color: theme.textAccent }} />
                          <span>{job.experience}</span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: theme.textTertiary }}>
                        {job.description.length > 200 ? `${job.description.substring(0, 200)}...` : job.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.slice(0, 4).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-3 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: theme.theme === 'light' ? 'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(29,78,216,0.08))' : 'linear-gradient(90deg, rgba(0,212,255,0.08), rgba(255,107,0,0.06))',
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textAccent
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {job.tags.length > 4 && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ color: theme.textTertiary }}>
                            +{job.tags.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Requirements */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2" style={{ color: theme.textPrimary }}>Key Requirements:</h4>
                        <ul className="text-sm" style={{ color: theme.textTertiary }}>
                          {job.requirements.slice(0, 2).map((req, reqIdx) => (
                            <li key={reqIdx} className="flex items-center gap-2">
                              <span style={{ color: theme.textAccent }}>•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex flex-col gap-3 lg:min-w-[200px]">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => createApplication(job)}
                        className="w-full px-6 py-4 rounded-2xl font-bold text-sm sm:text-base"
                        style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                      >
                        Apply Now
                      </m.button>

                      {job.applicationDeadline && (
                        <div className="text-center">
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