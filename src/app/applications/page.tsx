'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import Navigation from './Navigation'
import BackgroundEffects from './BackgroundEffects'
import StatsCards from './StatsCards'
import ApplicationFilters from './ApplicationFilters'
import { Clock, Eye, Calendar, CheckCircle, XCircle, AlertCircle, FileText, Building, MapPin, ExternalLink } from 'lucide-react'
import ApplicationsList from './ApplicationsList'

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
          <StatsCards theme={theme} stats={stats} />

          {/* Filters */}
          <ApplicationFilters
            theme={theme}
            applications={applications}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            getStatusColor={getStatusColor}
            formatStatus={formatStatus}
          />

          {/* Applications List */}
          <ApplicationsList
            loading={loading}
            filteredApplications={filteredApplications}
            theme={theme}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            formatStatus={formatStatus}
            getTimeAgo={getTimeAgo}
          />
        </div>
      </div>
    </RouteGuard>
  )
}