'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import Navigation from './Navigation'
import BackgroundEffects from './BackgroundEffects'
import SearchAndFilters from './SearchAndFilters'
import JobsList from './JobsList'

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
        <Navigation
          user={user}
          theme={theme}
          logout={logout}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />

        <BackgroundEffects theme={theme} />

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
          <SearchAndFilters
            theme={theme}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            experienceFilter={experienceFilter}
            setExperienceFilter={setExperienceFilter}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Job Results */}
          <JobsList
            loading={loading}
            filteredJobs={filteredJobs}
            theme={theme}
            savedJobs={savedJobs}
            toggleSaveJob={toggleSaveJob}
            createApplication={createApplication}
            formatSalary={formatSalary}
            getTimeAgo={getTimeAgo}
          />
        </div>
      </div>
    </RouteGuard>
  )
}