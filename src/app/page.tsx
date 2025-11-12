"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"
import {
  Target,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  BarChart3,
  Clock,
  Trophy,
  Play,
  Star,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Building,
  MapPin,
  DollarSign,
  FileText,
  MoreHorizontal,
  X,
  Save,
  Briefcase,
  Activity,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Settings,
} from "lucide-react"

// Cast motion to any to avoid strict prop typing issues in this file
const m = motion as any

<<<<<<< HEAD
// Types for job applications
interface JobApplication {
  id: string
  company: string
  position: string
  location: string
  salary?: string
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
  appliedDate: string
  lastUpdated: string
  notes: string
  url?: string
  contact?: string
  priority: 'low' | 'medium' | 'high'
  tags: string[]
}

// Predefined particle positions for consistent SSR/client rendering
const particlePositions = [
  { left: 12.75, top: 48.69 },
  { left: 67.23, top: 23.45 },
  { left: 34.89, top: 78.12 },
  { left: 89.34, top: 56.78 },
  { left: 45.67, top: 12.34 },
  { left: 78.90, top: 89.01 },
  { left: 23.45, top: 67.89 },
  { left: 56.78, top: 34.56 },
  { left: 91.23, top: 45.67 },
  { left: 12.34, top: 78.90 },
  { left: 67.89, top: 23.12 },
  { left: 34.56, top: 89.34 },
  { left: 89.01, top: 56.23 },
  { left: 45.12, top: 12.78 },
  { left: 78.45, top: 67.34 },
  { left: 23.78, top: 34.89 },
  { left: 56.34, top: 91.23 },
  { left: 91.78, top: 45.12 },
  { left: 12.89, top: 78.45 },
  { left: 67.34, top: 23.78 },
  { left: 34.12, top: 89.78 },
  { left: 89.56, top: 56.89 },
  { left: 45.78, top: 12.23 },
  { left: 78.12, top: 67.78 },
  { left: 23.34, top: 34.23 },
  { left: 56.89, top: 91.78 },
  { left: 91.34, top: 45.89 },
  { left: 12.56, top: 78.12 },
  { left: 67.78, top: 23.34 },
  { left: 34.89, top: 89.23 }
]

// Status configurations
const statusConfig = {
  saved: { color: '#64748b', bgColor: '#64748b20', icon: FileText, label: 'Saved' },
  applied: { color: '#00d4ff', bgColor: '#00d4ff20', icon: CheckCircle, label: 'Applied' },
  interview: { color: '#ff6b00', bgColor: '#ff6b0020', icon: ClockIcon, label: 'Interview' },
  offer: { color: '#00ff88', bgColor: '#00ff8820', icon: Trophy, label: 'Offer' },
  rejected: { color: '#ef4444', bgColor: '#ef444420', icon: XCircle, label: 'Rejected' },
  withdrawn: { color: '#8b5cf6', bgColor: '#8b5cf620', icon: AlertCircle, label: 'Withdrawn' }
}

// Priority configurations
const priorityConfig = {
  low: { color: '#64748b', bgColor: '#64748b20', label: 'Low' },
  medium: { color: '#00d4ff', bgColor: '#00d4ff20', label: 'Medium' },
  high: { color: '#ff6b00', bgColor: '#ff6b0020', label: 'High' }
}

// Helper function to get status icon component
function getStatusIcon(status: JobApplication['status']) {
  const IconComponent = statusConfig[status].icon
  return IconComponent
}

// Helper function to get priority color
function getPriorityColor(priority: JobApplication['priority']) {
  return priorityConfig[priority].color
=======
// Seeded random number generator for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getSeededRandom(seed: number) {
  return seededRandom(seed)
>>>>>>> parent of dacad16 (Update page.tsx)
}

// Client component for time display to avoid hydration issues
function TimeDisplay() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-gray-400 text-sm font-mono">
      {time}
    </div>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [viewingApplication, setViewingApplication] = useState<JobApplication | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load applications from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('careerSync_applications')
    if (saved) {
      const parsed = JSON.parse(saved)
      setApplications(parsed)
      setFilteredApplications(parsed)
    }
  }, [])

  // Filter applications based on search and filters
  useEffect(() => {
    let filtered = applications

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(app => app.priority === priorityFilter)
    }

    setFilteredApplications(filtered)
  }, [applications, searchTerm, statusFilter, priorityFilter])

  // Save to localStorage whenever applications change
  useEffect(() => {
    localStorage.setItem('careerSync_applications', JSON.stringify(applications))
  }, [applications])

  const addApplication = (application: Omit<JobApplication, 'id' | 'lastUpdated'>) => {
    const newApp: JobApplication = {
      ...application,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    }
    setApplications(prev => [...prev, newApp])
    setIsAddModalOpen(false)
  }

  const updateApplication = (updatedApp: JobApplication) => {
    setApplications(prev => prev.map(app =>
      app.id === updatedApp.id
        ? { ...updatedApp, lastUpdated: new Date().toISOString() }
        : app
    ))
    setEditingApplication(null)
  }

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id))
  }

  const getStats = () => {
    const total = applications.length
    const applied = applications.filter(app => app.status === 'applied').length
    const interviews = applications.filter(app => app.status === 'interview').length
    const offers = applications.filter(app => app.status === 'offer').length
    const successRate = total > 0 ? Math.round((offers / total) * 100) : 0

    return { total, applied, interviews, offers, successRate }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428]" style={{ fontFamily: '"Geist", sans-serif' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a1428]/80 border-b border-[#00d4ff]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b00]/50">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              CareerSync
            </span>
          </div>

          <div className="flex items-center gap-4">
            <TimeDisplay />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <BarChart3 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0a1428]/95 backdrop-blur-xl border-r border-[#00d4ff]/20 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          <div className="p-6">
            <div className="space-y-2">
              {[
                { icon: Briefcase, label: 'Applications', active: true },
                { icon: BarChart3, label: 'Analytics' },
                { icon: Users, label: 'Network' },
                { icon: Settings, label: 'Settings' }
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    item.active
                      ? 'bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff]'
                      : 'text-gray-400 hover:text-white hover:bg-[#00d4ff]/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-2">Job Applications Dashboard</h1>
            <p className="text-gray-400">Track and manage your career opportunities</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[
              { label: 'Total Applications', value: stats.total, icon: Briefcase, color: '#00d4ff' },
              { label: 'Applied', value: stats.applied, icon: CheckCircle, color: '#00d4ff' },
              { label: 'Interviews', value: stats.interviews, icon: ClockIcon, color: '#ff6b00' },
              { label: 'Offers', value: stats.offers, icon: Trophy, color: '#00ff88' },
              { label: 'Success Rate', value: `${stats.successRate}%`, icon: TrendingUp, color: '#ff6b00' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#1a3a52]/50 backdrop-blur-xl border border-[#00d4ff]/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                  <span className="text-2xl font-black text-white">{stat.value}</span>
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="bg-[#1a3a52]/50 backdrop-blur-xl border border-[#00d4ff]/20 rounded-2xl p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
                >
                  <option value="all">All Status</option>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
                >
                  <option value="all">All Priority</option>
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Application
                </button>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="bg-[#1a3a52]/50 backdrop-blur-xl border border-[#00d4ff]/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#00d4ff]/20">
              <h2 className="text-xl font-bold text-white">Your Applications ({filteredApplications.length})</h2>
            </div>

            <div className="divide-y divide-[#00d4ff]/10">
              {filteredApplications.length === 0 ? (
                <div className="p-12 text-center">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No applications found</h3>
                  <p className="text-gray-400 mb-6">Start tracking your job applications to see them here.</p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
                  >
                    Add Your First Application
                  </button>
                </div>
              ) : (
                filteredApplications.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 hover:bg-[#00d4ff]/5 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {app.company.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                            {app.position}
                          </h3>
                          <p className="text-gray-400">{app.company} • {app.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                            style={{
                              backgroundColor: statusConfig[app.status].bgColor,
                              color: statusConfig[app.status].color
                            }}
                          >
                            {(() => {
                              const IconComponent = statusConfig[app.status].icon
                              return <IconComponent className="w-3 h-3" />
                            })()}
                            {statusConfig[app.status].label}
                          </div>

                          <div
                            className="px-2 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: priorityConfig[app.priority].bgColor,
                              color: priorityConfig[app.priority].color
                            }}
                          >
                            {priorityConfig[app.priority].label}
                          </div>
                        </div>

                        <div className="text-sm text-gray-400">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setViewingApplication(app)}
                            className="p-2 text-gray-400 hover:text-[#00d4ff] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingApplication(app)}
                            className="p-2 text-gray-400 hover:text-[#00d4ff] transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Application Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingApplication) && (
          <ApplicationModal
            application={editingApplication}
            onSave={editingApplication ? updateApplication : addApplication}
            onClose={() => {
              setIsAddModalOpen(false)
              setEditingApplication(null)
            }}
          />
        )}
      </AnimatePresence>

      {/* View Application Modal */}
      <AnimatePresence>
        {viewingApplication && (
          <ViewApplicationModal
            application={viewingApplication}
            onClose={() => setViewingApplication(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Application Modal Component
function ApplicationModal({
  application,
  onSave,
  onClose
}: {
  application?: JobApplication | null
  onSave: (app: any) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    company: application?.company || '',
    position: application?.position || '',
    location: application?.location || '',
    salary: application?.salary || '',
    status: application?.status || 'saved',
    appliedDate: application?.appliedDate || new Date().toISOString().split('T')[0],
    notes: application?.notes || '',
    url: application?.url || '',
    contact: application?.contact || '',
    priority: application?.priority || 'medium',
    tags: application?.tags || []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...formData, ...(application && { id: application.id }) })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1a3a52]/95 backdrop-blur-xl border border-[#00d4ff]/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#00d4ff]/20 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {application ? 'Edit Application' : 'Add New Application'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors"
                placeholder="e.g. Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
              <input
                type="text"
                required
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors"
                placeholder="e.g. Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Salary Range</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors"
                placeholder="e.g. $120k - $150k"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as JobApplication['status'] }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
              >
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as JobApplication['priority'] }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
              >
                {Object.entries(priorityConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Application Date</label>
              <input
                type="date"
                value={formData.appliedDate}
                onChange={(e) => setFormData(prev => ({ ...prev, appliedDate: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white focus:border-[#00d4ff] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Contact Information</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors"
              placeholder="e.g. john.doe@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl text-white placeholder-gray-400 focus:border-[#00d4ff] focus:outline-none transition-colors resize-none"
              placeholder="Add any additional notes about this application..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-[#00d4ff]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {application ? 'Update Application' : 'Save Application'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

// View Application Modal Component
function ViewApplicationModal({
  application,
  onClose
}: {
  application: JobApplication
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#1a3a52]/95 backdrop-blur-xl border border-[#00d4ff]/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#00d4ff]/20 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Application Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {application.company.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{application.position}</h3>
              <p className="text-gray-400 text-lg">{application.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: statusConfig[application.status].bgColor,
                    color: statusConfig[application.status].color
                  }}
                >
                  {(() => {
                    const IconComponent = statusConfig[application.status].icon
                    return <IconComponent className="w-4 h-4" />
                  })()}
                  {statusConfig[application.status].label}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: priorityConfig[application.priority].bgColor,
                    color: priorityConfig[application.priority].color
                  }}
                >
                  {priorityConfig[application.priority].label}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <p className="text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {application.location || 'Not specified'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Salary Range</label>
                <p className="text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {application.salary || 'Not specified'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Applied Date</label>
                <p className="text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(application.appliedDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Last Updated</label>
                <p className="text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {new Date(application.lastUpdated).toLocaleDateString()}
                </p>
              </div>

              {application.url && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Job URL</label>
                  <a
                    href={application.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d4ff] hover:text-[#00d4ff]/80 transition-colors"
                  >
                    View Job Posting
                  </a>
                </div>
              )}

              {application.contact && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Contact</label>
                  <p className="text-white">{application.contact}</p>
                </div>
              )}
            </div>
          </div>

          {application.notes && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
              <div className="bg-[#0a1428]/50 border border-[#00d4ff]/20 rounded-xl p-4">
                <p className="text-white whitespace-pre-wrap">{application.notes}</p>
              </div>
            </div>
          )}

          {application.tags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {application.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#00d4ff]/20 text-[#00d4ff] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <m.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-[#ff6b00] to-[#00d4ff] rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b00]/50">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] bg-clip-text text-transparent">
              CareerSync
            </span>
          </m.div>

          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing", "Contact"].map((item) => (
              <m.a
                key={item}
                href="#"
                whileHover={{ color: "#00d4ff" }}
                className="text-gray-300 hover:text-[#00d4ff] transition-colors duration-300 text-sm font-medium"
              >
                {item}
              </m.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white text-sm font-medium rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
            >
              Sign In
            </m.button>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
            >
              Get Started
            </m.button>
          </div>
        </div>
      </m.nav>      {/* Hero Section */}
      <section className="mt-18 relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Innovative morphing background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Morphing geometric shapes */}
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
              delay: 5,
            }}
            style={{
              background: "linear-gradient(225deg, rgba(0, 255, 136, 0.2), rgba(255, 107, 0, 0.2))",
              filter: "blur(30px)",
            }}
          />

          {/* Advanced particle system */}
          {[...Array(30)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              animate={{
                x: [
                  getSeededRandom(i * 3) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  getSeededRandom(i * 3 + 1) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  getSeededRandom(i * 3 + 2) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                ],
                y: [
                  getSeededRandom(i * 3 + 10) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  getSeededRandom(i * 3 + 11) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  getSeededRandom(i * 3 + 12) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                ],
                scale: [0, 1, 0.5, 1, 0],
                opacity: [0, 0.8, 0.4, 0.8, 0],
              }}
              transition={{
                duration: 15 + getSeededRandom(i * 5) * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: getSeededRandom(i * 7) * 5,
              }}
              style={{
                background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#ff6b00" : "#00ff88",
                left: `${getSeededRandom(i * 9) * 100}%`,
                top: `${getSeededRandom(i * 11) * 100}%`,
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Liquid-like flowing elements */}
          <m.div
            className="absolute top-0 left-0 w-full h-32 opacity-30"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent)",
              filter: "blur(20px)",
            }}
          />
          <m.div
            className="absolute bottom-0 right-0 w-full h-32 opacity-20"
            animate={{
              backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 3,
            }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255, 107, 0, 0.3), transparent)",
              filter: "blur(25px)",
            }}
          />
        </div>

        {/* Content */}
        <m.div
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Innovative badge with morphing effect */}
          <m.div
            variants={itemVariants}
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 backdrop-blur-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            {/* Morphing background */}
            <m.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 0.8, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
              }}
            />
            <m.div
              className="w-3 h-3 rounded-full bg-[#00d4ff]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <span className="text-[#00d4ff] font-semibold relative z-10">Next-Generation Career Intelligence</span>
            <m.div
              className="w-2 h-2 rounded-full bg-[#ff6b00]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </m.div>

          {/* Fluid morphing headline */}
          <m.h1
            variants={itemVariants}
            className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 25%, #ff6b00 50%, #00ff88 75%, #ffffff 100%)",
              backgroundSize: "400% 400%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(0, 212, 255, 0.3))",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              textShadow: [
                "0 0 20px rgba(0, 212, 255, 0.5)",
                "0 0 40px rgba(255, 107, 0, 0.5)",
                "0 0 20px rgba(0, 255, 136, 0.5)",
                "0 0 20px rgba(0, 212, 255, 0.5)",
              ],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            CareerSync
          </m.h1>

          {/* Dynamic subheading with typing effect */}
          <m.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <span className="inline-block">
              Sync your career trajectory with
              <m.span
                className="text-[#00d4ff] font-semibold mx-2"
                animate={{
                  color: ["#00d4ff", "#ff6b00", "#00ff88", "#00d4ff"],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                intelligent networking
              </m.span>
              and quantum-powered insights.
            </span>
          </m.p>

          {/* Innovative CTA buttons with morphing effects */}
          <m.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <m.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255, 107, 0, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 text-white font-bold text-xl rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%)",
                boxShadow: "0 0 20px rgba(255, 107, 0, 0.4)",
              }}
            >
              <m.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                animate={{
                  opacity: [0, 0.3, 0.1, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(45deg, rgba(0, 212, 255, 0.3), rgba(255, 107, 0, 0.3))",
                }}
              />
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(5)].map((_, i) => (
                  <m.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.sin(i) * 15, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${60}%`,
                    }}
                  />
                ))}
              </div>
              <span className="relative z-10">Start Your Journey</span>
            </m.button>
            <m.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(0, 212, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 text-white font-bold text-xl rounded-2xl border-2 border-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300 overflow-hidden"
            >
              {/* Liquid border effect */}
              <m.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                animate={{
                  borderImage: [
                    "linear-gradient(45deg, #00d4ff, #ff6b00) 1",
                    "linear-gradient(135deg, #ff6b00, #00ff88) 1",
                    "linear-gradient(225deg, #00ff88, #00d4ff) 1",
                    "linear-gradient(45deg, #00d4ff, #ff6b00) 1",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  borderImageSlice: 1,
                }}
              />
              <span className="relative z-10">Explore Features</span>
            </m.button>
          </m.div>

          {/* Interactive floating stat with morphing effects */}
          <m.div
            variants={itemVariants}
            className="mt-24 flex justify-center"
          >
            <m.div
              className="group relative flex items-center gap-6 px-10 py-6 rounded-3xl bg-gradient-to-r from-[#1a3a52]/80 to-[#0f2540]/80 backdrop-blur-xl border border-[#00d4ff]/30 overflow-hidden cursor-pointer"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 20,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Morphing background */}
              <m.div
                className="absolute inset-0 rounded-3xl opacity-30"
                animate={{
                  scale: [1, 1.05, 0.95, 1],
                  opacity: [0.3, 0.4, 0.2, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(45deg, rgba(0, 212, 255, 0.2), rgba(255, 107, 0, 0.2))",
                }}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
                  <m.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full opacity-70"
                    animate={{
                      y: [0, -25, 0],
                      x: [0, Math.cos(i) * 20, 0],
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${15 + i * 10}%`,
                      top: `${40}%`,
                      backgroundColor: i % 2 === 0 ? "#00d4ff" : "#ff6b00",
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <m.div
                  className="w-4 h-4 rounded-full bg-[#00d4ff] shadow-lg shadow-[#00d4ff]/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 10px rgba(0, 212, 255, 0.5)",
                      "0 0 20px rgba(0, 212, 255, 0.8)",
                      "0 0 10px rgba(0, 212, 255, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-white font-bold text-lg">15,000+ Professionals Connected</span>
                <m.div
                  className="w-3 h-3 rounded-full bg-[#ff6b00] shadow-lg shadow-[#ff6b00]/50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </div>
            </m.div>
          </m.div>
        </m.div>

        {/* Minimal scroll indicator */}
        <m.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-[#00d4ff]/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#00d4ff] rounded-full mt-2 animate-pulse"></div>
          </div>
        </m.div>
      </section>

      {/* Features Section with Fluid Layout */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#0a1428] to-[#1a2d4d] overflow-hidden">
        {/* Dynamic fluid background */}
        <div className="absolute inset-0">
          {/* Organic flowing shapes */}
          {[...Array(20)].map((_, i) => (
            <m.div
              key={i}
              className="absolute opacity-10"
              animate={{
                x: [0, Math.sin(i) * 100, 0],
                y: [0, Math.cos(i) * 80, 0],
                scale: [1, 1.5, 0.8, 1],
                borderRadius: ["50% 30% 70% 20%", "30% 70% 20% 50%", "70% 20% 50% 30%", "50% 30% 70% 20%"],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                width: `${40 + i * 10}px`,
                height: `${40 + i * 10}px`,
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
                background: i % 3 === 0
                  ? "linear-gradient(45deg, rgba(0, 212, 255, 0.3), rgba(255, 107, 0, 0.3))"
                  : i % 3 === 1
                  ? "linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(0, 255, 136, 0.3))"
                  : "linear-gradient(225deg, rgba(0, 255, 136, 0.3), rgba(0, 212, 255, 0.3))",
                filter: "blur(20px)",
              }}
            />
          ))}

          {/* Fluid wave patterns */}
          <m.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 107, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
              `,
              backgroundSize: "200% 200%",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            {/* Fluid section title */}
            <m.h2
              className="text-6xl md:text-8xl font-black mb-6 leading-none"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                textShadow: [
                  "0 0 30px rgba(0, 212, 255, 0.5)",
                  "0 0 50px rgba(255, 107, 0, 0.5)",
                  "0 0 30px rgba(0, 255, 136, 0.5)",
                  "0 0 30px rgba(0, 212, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%, #00ff88 90%, #ffffff 100%)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sync Features
            </m.h2>
            <m.p
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Experience the future of career management with
              <m.span
                className="text-[#00d4ff] font-semibold mx-2"
                animate={{
                  color: ["#00d4ff", "#ff6b00", "#00ff88", "#00d4ff"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                intelligent synchronization
              </m.span>
              and quantum insights.
            </m.p>
          </m.div>

          {/* Fluid dynamic grid */}
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Target,
                title: "Smart Targeting",
                description: "AI-powered opportunity matching with predictive career trajectory analysis and intelligent connection recommendations.",
                color: "from-[#00d4ff] to-[#0088cc]",
                shadowColor: "rgba(0, 212, 255, 0.4)",
                gradient: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
                size: "large",
              },
              {
                icon: BarChart3,
                title: "Sync Analytics",
                description: "Real-time career performance metrics with advanced data visualization and trend analysis for optimal decision making.",
                color: "from-[#ff6b00] to-[#ff8c00]",
                shadowColor: "rgba(255, 107, 0, 0.4)",
                gradient: "linear-gradient(225deg, rgba(255, 107, 0, 0.1), rgba(0, 255, 136, 0.1))",
                size: "medium",
              },
              {
                icon: Clock,
                title: "Time Sync",
                description: "Intelligent scheduling with automated deadline tracking, priority management, and productivity optimization.",
                color: "from-[#00d4ff] to-[#ff6b00]",
                shadowColor: "rgba(0, 212, 255, 0.4)",
                gradient: "linear-gradient(315deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
                size: "large",
              },
              {
                icon: Users,
                title: "Network Sync",
                description: "Seamless professional networking with automated introductions, relationship management, and opportunity alerts.",
                color: "from-[#00ff88] to-[#00d4ff]",
                shadowColor: "rgba(0, 255, 136, 0.4)",
                gradient: "linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1))",
                size: "medium",
              },
              {
                icon: Shield,
                title: "Secure Sync",
                description: "Enterprise-grade data protection with end-to-end encryption, privacy controls, and secure career data management.",
                color: "from-[#ff8c00] to-[#00ff88]",
                shadowColor: "rgba(255, 140, 0, 0.4)",
                gradient: "linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(0, 255, 136, 0.1))",
                size: "large",
              },
              {
                icon: Zap,
                title: "AI Sync",
                description: "Next-generation AI assistance with personalized career coaching, opportunity prediction, and intelligent recommendations.",
                color: "from-[#00d4ff] to-[#00ff88]",
                shadowColor: "rgba(0, 212, 255, 0.4)",
                gradient: "linear-gradient(225deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1))",
                size: "medium",
              },
            ].map((feature, index) => (
              <m.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: feature.size === 'large' ? 1.08 : 1.05,
                  rotateY: feature.size === 'large' ? 8 : 5,
                  rotateX: -5,
                  z: 60,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={`group relative overflow-hidden rounded-3xl backdrop-blur-xl transition-all duration-700 cursor-pointer ${
                  feature.size === 'large'
                    ? 'md:col-span-2 lg:col-span-1 p-10'
                    : 'p-8'
                }`}
                style={{
                  background: "linear-gradient(135deg, rgba(26, 58, 82, 0.8), rgba(15, 37, 64, 0.8))",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  gridRow: feature.size === 'large' && index % 3 === 1 ? 'span 2' : 'span 1',
                }}
              >
                {/* Morphing background gradient */}
                <m.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    scale: [1, 1.02, 0.98, 1],
                    opacity: [0, 0.1, 0.05, 0.1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: feature.gradient,
                  }}
                />

                {/* Fluid particle system */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(feature.size === 'large' ? 12 : 8)].map((_, i) => (
                    <m.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-70"
                      animate={{
                        y: [0, -40, 0],
                        x: [0, Math.sin(i * 1.2) * (feature.size === 'large' ? 30 : 20), 0],
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 4 + i * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                      style={{
                        left: `${15 + i * (feature.size === 'large' ? 7 : 10)}%`,
                        top: `${25 + i * 8}%`,
                        background: `linear-gradient(45deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
                      }}
                    />
                  ))}
                </div>

                {/* Fluid icon container */}
                <m.div
                  className={`relative rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ${
                    feature.size === 'large' ? 'w-20 h-20' : 'w-16 h-16'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${feature.color})`,
                    boxShadow: `0 0 30px ${feature.shadowColor}`,
                    transform: "translateZ(25px)",
                  }}
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    scale: feature.size === 'large' ? 1.15 : 1.12,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  {/* Icon glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-50 blur-md"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color})`,
                    }}
                  />
                  <feature.icon
                    className={`relative z-10 text-white ${
                      feature.size === 'large' ? 'w-10 h-10' : 'w-8 h-8'
                    }`}
                  />
                </m.div>

                {/* Fluid content */}
                <div style={{ transform: "translateZ(15px)" }}>
                  <m.h3
                    className={`font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500 ${
                      feature.size === 'large' ? 'text-2xl' : 'text-xl'
                    }`}
                    style={{
                      background: `linear-gradient(135deg, #${feature.color.split('from-[')[1].split(']')[0]}, #${feature.color.split('to-[')[1].split(']')[0]})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    {feature.title}
                  </m.h3>
                  <p className={`text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 ${
                    feature.size === 'large' ? 'text-base' : 'text-sm'
                  }`}>
                    {feature.description}
                  </p>
                </div>

                {/* Interactive hover indicator */}
                <m.div
                  className="absolute bottom-6 right-6 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color})`,
                    boxShadow: `0 0 15px ${feature.shadowColor}`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#1a2d4d] to-[#0a1428] overflow-hidden">
        {/* HUD-style background */}
        <div className="absolute inset-0">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Animated scan lines */}
          <m.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(0, 212, 255, 0.03) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <m.h2
              className="text-6xl md:text-7xl font-black mb-6 text-white leading-none"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 212, 255, 0.6)",
                  "0 0 40px rgba(255, 107, 0, 0.6)",
                  "0 0 20px rgba(0, 255, 136, 0.6)",
                  "0 0 20px rgba(0, 212, 255, 0.6)",
                ],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 40%, #ff6b00 70%, #00ff88 100%)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CareerSync Hub
            </m.h2>
            <m.p
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Master your career trajectory with
              <m.span
                className="text-[#00d4ff] font-semibold mx-2"
                animate={{
                  color: ["#00d4ff", "#ff6b00", "#00ff88", "#00d4ff"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                intelligent synchronization
              </m.span>
              and real-time insights.
            </m.p>
          </m.div>

          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border-2 border-[#00d4ff]/50 shadow-2xl shadow-[#00d4ff]/30 backdrop-blur-xl group"
            style={{
              background: "linear-gradient(135deg, rgba(10, 20, 40, 0.95), rgba(26, 61, 83, 0.95))",
            }}
            whileHover={{
              boxShadow: "0 0 60px rgba(0, 212, 255, 0.4)",
            }}
          >
            {/* Advanced HUD corners with animation */}
            <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-[#00d4ff]/70"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-[#00d4ff]/70"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-[#00d4ff]/70"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-[#00d4ff]/70"></div>

            {/* Animated border effect */}
            <m.div
              className="absolute inset-0 rounded-3xl border border-transparent"
              animate={{
                borderImage: [
                  "linear-gradient(45deg, rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5)) 1",
                  "linear-gradient(135deg, rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5)) 1",
                  "linear-gradient(225deg, rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5)) 1",
                  "linear-gradient(315deg, rgba(0, 212, 255, 0.5), rgba(255, 107, 0, 0.5), rgba(0, 255, 136, 0.5), rgba(0, 212, 255, 0.5)) 1",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                borderImageSlice: 1,
              }}
            />

            {/* Interactive background particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(25)].map((_, i) => (
                <m.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full opacity-40"
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i * 0.8) * 25, 0],
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 5 + i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${10 + i * 3.6}%`,
                    top: `${20 + i * 3}%`,
                    background: i % 4 === 0 ? "#00d4ff" : i % 4 === 1 ? "#ff6b00" : i % 4 === 2 ? "#00ff88" : "#ff8c00",
                  }}
                />
              ))}
            </div>

            <div className="p-8 space-y-8">
              {/* Status bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse"></div>
                  <span className="text-[#00d4ff] font-bold text-sm">SYSTEM ONLINE</span>
                </div>
                <div className="text-gray-400 text-sm font-mono">
                  <TimeDisplay />
                </div>
              </div>

              {/* Enhanced tab buttons with fluid interactions */}
              <div className="flex gap-8 border-b border-[#00d4ff]/40 pb-6 mb-8">
                {["connections", "interactions", "insights"].map((tab, index) => (
                  <m.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-3 text-sm font-bold transition-all duration-500 rounded-xl overflow-hidden ${
                      activeTab === tab
                        ? "text-[#00d4ff] bg-[#00d4ff]/15 border border-[#00d4ff]/60 shadow-lg shadow-[#00d4ff]/20"
                        : "text-gray-400 hover:text-white hover:bg-[#00d4ff]/8 border border-transparent hover:border-[#00d4ff]/30"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    }}
                  >
                    {/* Tab background effect */}
                    <m.div
                      className="absolute inset-0 opacity-0"
                      animate={{
                        opacity: activeTab === tab ? 1 : 0,
                        scale: activeTab === tab ? [1, 1.05, 1] : 1,
                      }}
                      style={{
                        background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
                      }}
                    />

                    {/* Floating particles for active tab */}
                    {activeTab === tab && (
                      <div className="absolute inset-0 overflow-hidden rounded-xl">
                        {[...Array(6)].map((_, i) => (
                          <m.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#00d4ff] rounded-full opacity-60"
                            animate={{
                              y: [0, -15, 0],
                              x: [0, Math.sin(i) * 10, 0],
                              scale: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.2,
                            }}
                            style={{
                              left: `${20 + i * 12}%`,
                              top: `${70}%`,
                            }}
                          />
                        ))}
                      </div>
                    )}

                    <span className="relative z-10 capitalize tracking-wide">
                      {tab}
                    </span>

                    {/* Active tab indicator */}
                    {activeTab === tab && (
                      <m.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] via-[#ff6b00] to-[#00ff88]"
                        layoutId="activeTabIndicator"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </m.button>
                ))}
              </div>

              {/* Tab content with enhanced animations */}
              <AnimatePresence mode="wait">
                <m.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {activeTab === "connections" && (
                    <div className="space-y-6">
                      {/* Progress overview */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { label: "Active", value: "47", color: "#00d4ff" },
                          { label: "Processing", value: "23", color: "#ff6b00" },
                          { label: "Connected", value: "156", color: "#00ff88" },
                        ].map((stat, idx) => (
                          <m.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center p-4 rounded-xl bg-[#1a3a52]/50 border border-[#00d4ff]/20"
                          >
                            <div
                              className="text-2xl font-black mb-1"
                              style={{ color: stat.color }}
                            >
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-400">{stat.label}</div>
                          </m.div>
                        ))}
                      </div>

                      {[
                        { company: "Google", status: "Interview", progress: 75, priority: "high" },
                        { company: "Microsoft", status: "Applied", progress: 33, priority: "medium" },
                        { company: "Apple", status: "Offer", progress: 100, priority: "high" },
                      ].map((app, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          className="group relative flex items-center justify-between p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 overflow-hidden"
                        >
                          {/* Priority indicator */}
                          <div
                            className={`absolute left-0 top-0 bottom-0 w-1 ${
                              app.priority === 'high' ? 'bg-[#ff6b00]' :
                              app.priority === 'medium' ? 'bg-[#00d4ff]' : 'bg-gray-500'
                            }`}
                          />

                          {/* Animated background on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {app.company.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                                {app.company}
                              </p>
                              <p className="text-xs text-gray-400">{app.status}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-20 h-2 bg-[#0f2540] rounded-full overflow-hidden">
                              <m.div
                                initial={{ width: 0 }}
                                animate={{ width: `${app.progress}%` }}
                                transition={{ duration: 1.5, delay: idx * 0.2, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] rounded-full"
                              />
                            </div>
                            <span className="text-sm text-gray-400 font-mono">
                              {app.progress}%
                            </span>
                          </div>
                        </m.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "interviews" && (
                    <div className="space-y-6">
                      {/* Interview calendar view */}
                      <div className="grid grid-cols-7 gap-2 mb-6">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                          <div key={idx} className="text-center text-xs text-gray-400 py-2">
                            {day}
                          </div>
                        ))}
                        {Array.from({ length: 31 }, (_, i) => (
                          <m.div
                            key={i}
                            className={`aspect-square rounded-lg border border-[#00d4ff]/20 flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-300 ${
                              i === 14 ? 'bg-[#00d4ff]/20 border-[#00d4ff] text-[#00d4ff]' :
                              i === 17 ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-[#ff6b00]' :
                              'text-gray-400 hover:bg-[#00d4ff]/10'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {i + 1}
                          </m.div>
                        )).slice(0, 28)}
                      </div>

                      {[
                        { company: "Google", date: "Dec 15, 2:00 PM", type: "Technical", status: "confirmed" },
                        { company: "Microsoft", date: "Dec 18, 4:30 PM", type: "HR Round", status: "pending" },
                      ].map((interview, idx) => (
                        <m.div
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          className="group relative p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">
                                  {interview.company.charAt(0)}
                                </span>
                              </div>
                              <p className="font-bold text-white">{interview.company}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              interview.status === 'confirmed'
                                ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50'
                                : 'bg-[#ff6b00]/20 text-[#ff6b00] border border-[#ff6b00]/50'
                            }`}>
                              {interview.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-400">{interview.date}</p>
                              <p className="text-xs text-[#00d4ff] font-medium">{interview.type}</p>
                            </div>
                            <m.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-[#00d4ff]/20 border border-[#00d4ff]/50 rounded-lg text-[#00d4ff] text-sm font-bold hover:bg-[#00d4ff]/30 transition-all duration-300"
                            >
                              Join Call
                            </m.button>
                          </div>
                        </m.div>
                      ))}
                    </div>
                  )}

                  {activeTab === "stats" && (
                    <div className="space-y-6">
                      {/* Animated stats rings */}
                      <div className="grid grid-cols-3 gap-6">
                        {[
                          { label: "Success Rate", value: 92, max: 100, color: "#00d4ff", icon: "�" },
                          { label: "Connections Made", value: 203, max: 250, color: "#ff6b00", icon: "⚡" },
                          { label: "Interactions", value: 47, max: 60, color: "#00ff88", icon: "�" },
                        ].map((stat, idx) => (
                          <m.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative flex flex-col items-center p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20"
                          >
                            {/* Circular progress */}
                            <div className="relative w-20 h-20 mb-4">
                              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="rgba(0, 212, 255, 0.2)"
                                  strokeWidth="2"
                                />
                                <m.path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={stat.color}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: stat.value / stat.max }}
                                  transition={{ duration: 2, delay: idx * 0.3, ease: "easeOut" }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">{stat.icon}</span>
                              </div>
                            </div>

                            <div className="text-center">
                              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                              <p
                                className="text-2xl font-black"
                                style={{ color: stat.color }}
                              >
                                {stat.value}{stat.max === 100 ? '%' : ''}
                              </p>
                            </div>
                          </m.div>
                        ))}
                      </div>

                      {/* Performance graph */}
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-6 rounded-2xl bg-[#1a3a52]/50 border border-[#00d4ff]/20"
                      >
                        <h3 className="text-lg font-bold text-white mb-4">Performance Trend</h3>
                        <div className="flex items-end gap-2 h-24">
                          {[65, 72, 68, 85, 78, 92, 88].map((value, idx) => (
                            <m.div
                              key={idx}
                              initial={{ height: 0 }}
                              animate={{ height: `${value}%` }}
                              transition={{
                                duration: 1,
                                delay: idx * 0.1,
                                ease: "easeOut"
                              }}
                              className="flex-1 bg-gradient-to-t from-[#ff6b00] to-[#00d4ff] rounded-t-sm relative group"
                            >
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {value}%
                              </div>
                            </m.div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </m.div>
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          </m.div>
        </div>
      </section>

      {/* Statistics Section with Dynamic Animations */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Morphing background with fluid dynamics */}
        <div className="absolute inset-0">
          {/* Primary morphing shapes */}
          {[...Array(15)].map((_, i) => (
            <m.div
              key={i}
              className="absolute opacity-20"
              animate={{
                x: [0, Math.sin(i * 0.7) * 200, 0],
                y: [0, Math.cos(i * 0.9) * 150, 0],
                scale: [1, 1.8, 0.6, 1],
                borderRadius: ["50% 30% 70% 20%", "30% 70% 20% 50%", "70% 20% 50% 30%", "50% 30% 70% 20%"],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + i * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
              style={{
                width: `${60 + i * 15}px`,
                height: `${60 + i * 15}px`,
                left: `${(i * 6.5) % 90}%`,
                top: `${(i * 8.3) % 80}%`,
                background: i % 4 === 0
                  ? "linear-gradient(45deg, rgba(0, 212, 255, 0.4), rgba(255, 107, 0, 0.4))"
                  : i % 4 === 1
                  ? "linear-gradient(135deg, rgba(255, 107, 0, 0.4), rgba(0, 255, 136, 0.4))"
                  : i % 4 === 2
                  ? "linear-gradient(225deg, rgba(0, 255, 136, 0.4), rgba(0, 212, 255, 0.4))"
                  : "linear-gradient(315deg, rgba(255, 140, 0, 0.4), rgba(0, 212, 255, 0.4))",
                filter: "blur(25px)",
              }}
            />
          ))}

          {/* Flowing wave patterns */}
          <m.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.3) 0%, transparent 40%),
                radial-gradient(circle at 75% 75%, rgba(255, 107, 0, 0.3) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.3) 0%, transparent 40%)
              `,
              backgroundSize: "300% 300%",
            }}
          />

          {/* Dynamic particle field */}
          {[...Array(40)].map((_, i) => (
            <m.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              animate={{
                x: [
                  getSeededRandom(i * 13) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  getSeededRandom(i * 13 + 1) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                  getSeededRandom(i * 13 + 2) * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                ],
                y: [
                  getSeededRandom(i * 13 + 10) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  getSeededRandom(i * 13 + 11) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                  getSeededRandom(i * 13 + 12) * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                ],
                scale: [0, 1.5, 0.5, 1, 0],
                opacity: [0, 0.7, 0.3, 0.7, 0],
              }}
              transition={{
                duration: 18 + getSeededRandom(i * 15) * 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: getSeededRandom(i * 17) * 8,
              }}
              style={{
                background: i % 5 === 0 ? "#00d4ff" : i % 5 === 1 ? "#ff6b00" : i % 5 === 2 ? "#00ff88" : i % 5 === 3 ? "#ff8c00" : "#8b5cf6",
                left: `${getSeededRandom(i * 19) * 100}%`,
                top: `${getSeededRandom(i * 21) * 100}%`,
                filter: "blur(0.5px)",
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <m.div
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "25K+", label: "Active Users", icon: "👥", color: "#00d4ff" },
              { number: "1.2M", label: "Connections Made", icon: "⚡", color: "#ff6b00" },
              { number: "94%", label: "Success Rate", icon: "�", color: "#00ff88" },
              { number: "24/7", label: "Neural Support", icon: "🧠", color: "#ff6b00" },
            ].map((stat, idx) => (
              <m.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  z: 20,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 text-center transition-all duration-500 backdrop-blur-xl overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(5)].map((_, i) => (
                    <m.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-60"
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.sin(i * 2) * 20, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${40 + i * 10}%`,
                        backgroundColor: stat.color,
                      }}
                    />
                  ))}
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}20, transparent)`,
                  }}
                />

                {/* Icon with animation */}
                <m.div
                  className="text-4xl mb-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: idx,
                  }}
                >
                  {stat.icon}
                </m.div>

                {/* Animated counter */}
                <m.div
                  className="text-5xl md:text-6xl font-black mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: `0 0 20px ${stat.color}40`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    textShadow: `0 0 30px ${stat.color}60`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </m.div>

                <p className="text-gray-400 font-semibold text-lg group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Progress bar for percentage stats */}
                {stat.number.includes('%') && (
                  <m.div
                    className="mt-4 w-full h-1 bg-[#0f2540] rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.3 }}
                    viewport={{ once: true }}
                  >
                    <m.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${parseInt(stat.number)}%` }}
                      transition={{
                        duration: 2,
                        delay: idx * 0.4,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    />
                  </m.div>
                )}
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Dynamic background effects */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          {[...Array(12)].map((_, i) => (
            <m.div
              key={i}
              className={`absolute rounded-lg opacity-10 ${
                i % 3 === 0 ? 'w-16 h-16 bg-[#00d4ff]' :
                i % 3 === 1 ? 'w-12 h-12 bg-[#ff6b00] rounded-full' :
                'w-20 h-8 bg-[#00ff88]'
              }`}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.cos(i) * 30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: i * 0.5,
              }}
              style={{
                left: `${(i * 8) % 90}%`,
                top: `${(i * 12) % 80}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <m.h2
              className="text-5xl md:text-6xl font-black mb-4 text-white"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 212, 255, 0.5)",
                  "0 0 30px rgba(255, 107, 0, 0.5)",
                  "0 0 20px rgba(0, 212, 255, 0.5)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Dimensional Pricing
            </m.h2>
            <p className="text-gray-400 text-xl">Choose your dimension in the career multiverse</p>
          </m.div>

          <m.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Nexus Core",
                price: "Free",
                description: "Essential connections for career navigation",
                features: ["Track up to 50 opportunities", "Basic neural insights", "Mobile synchronization"],
                highlighted: false,
                color: "#00d4ff",
                icon: "🔗",
              },
              {
                name: "Quantum Pro",
                price: "$29",
                period: "/month",
                description: "Advanced intelligence for career mastery",
                features: ["Unlimited opportunity tracking", "Quantum analytics", "Neural networking", "AI-powered insights"],
                highlighted: true,
                color: "#ff6b00",
                icon: "⚡",
              },
              {
                name: "Omni Enterprise",
                price: "$79",
                period: "/month",
                description: "Complete career multiverse access",
                features: ["Everything in Quantum Pro", "Priority neural processing", "Custom integrations", "Team collaboration matrix"],
                highlighted: false,
                color: "#00ff88",
                icon: "🌌",
              },
            ].map((plan, idx) => (
              <m.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  scale: plan.highlighted ? 1.08 : 1.05,
                  rotateY: plan.highlighted ? 10 : 5,
                  rotateX: -5,
                  z: 50,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={`group relative p-8 rounded-3xl transition-all duration-500 backdrop-blur-xl overflow-hidden cursor-pointer ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-[#ff6b00]/20 to-[#00d4ff]/20 border-2 border-[#ff6b00] shadow-2xl shadow-[#ff6b00]/30"
                    : "bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Animated background glow */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${plan.color}40, transparent)`,
                  }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(8)].map((_, i) => (
                    <m.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-70"
                      animate={{
                        y: [0, -40, 0],
                        x: [0, Math.sin(i * 1.5) * 25, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                      style={{
                        left: `${15 + i * 10}%`,
                        top: `${20 + i * 8}%`,
                        backgroundColor: plan.color,
                      }}
                    />
                  ))}
                </div>

                {/* Popular badge */}
                {plan.highlighted && (
                  <m.div
                    className="absolute -top-4 left-1/2 transform translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] shadow-lg"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="text-white text-sm font-black tracking-wider">MOST POPULAR</span>
                  </m.div>
                )}

                {/* Icon with 3D effect */}
                <m.div
                  className="text-5xl mb-4 text-center"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: idx * 0.5,
                  }}
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  {plan.icon}
                </m.div>

                {/* Plan name */}
                <m.h3
                  className="text-3xl font-black text-white mb-2 text-center"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  {plan.name}
                </m.h3>

                {/* Description */}
                <p
                  className="text-gray-400 text-center mb-6"
                  style={{
                    transform: "translateZ(10px)",
                  }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div
                  className="text-center mb-8"
                  style={{
                    transform: "translateZ(15px)",
                  }}
                >
                  <m.p
                    className="text-6xl font-black mb-1"
                    style={{
                      color: plan.color,
                      textShadow: `0 0 20px ${plan.color}60`,
                    }}
                    animate={{
                      textShadow: [
                        `0 0 20px ${plan.color}60`,
                        `0 0 30px ${plan.color}80`,
                        `0 0 20px ${plan.color}60`,
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {plan.price}
                    <span className="text-2xl text-gray-400 font-normal">{plan.period}</span>
                  </m.p>
                </div>

                {/* Features */}
                <ul
                  className="space-y-4 mb-8"
                  style={{
                    transform: "translateZ(10px)",
                  }}
                >
                  {plan.features.map((feature, fIdx) => (
                    <m.li
                      key={fIdx}
                      className="flex items-center gap-3 text-gray-300 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fIdx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <m.div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${plan.color}30` }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <CheckCircle2
                          className="w-3 h-3"
                          style={{ color: plan.color }}
                        />
                      </m.div>
                      {feature}
                    </m.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <m.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 30px ${plan.color}60`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-300 relative overflow-hidden ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] text-white shadow-lg shadow-[#ff6b00]/50"
                      : "bg-[#1a3a52]/50 border border-[#00d4ff]/30 text-white hover:border-[#00d4ff]/50"
                  }`}
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  <span className="relative z-10">Get Started</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${plan.color}40, transparent)`,
                    }}
                  />
                </m.button>

                {/* Hover indicator */}
                <m.div
                  className="absolute bottom-4 right-4 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: plan.color }}
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Footer */}
      <m.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-16 px-6 border-t border-[#00d4ff]/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-[#ff6b00]" />
                <span className="font-bold text-white">CareerSync</span>
              </div>
              <p className="text-gray-400 text-sm">Connect deeply with infinite career possibilities</p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Compliance"],
              },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-[#00d4ff] transition-colors duration-300 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#00d4ff]/20 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2024 CareerSync. All rights reserved.</p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                <m.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#00d4ff" }}
                  className="text-gray-400 hover:text-[#00d4ff] transition-all duration-300 text-sm font-medium"
                >
                  {social}
                </m.a>
              ))}
            </div>
          </div>
        </div>
      </m.footer>

      {/* Enhanced floating decorative elements */}
      <m.div
        className="fixed bottom-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#ff6b00]/30 to-transparent blur-3xl pointer-events-none"
        animate={{
          y: [0, 60, 0],
          x: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <m.div
        className="fixed top-1/4 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#00d4ff]/25 to-transparent blur-3xl pointer-events-none"
        animate={{
          y: [0, -80, 0],
          x: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
      />

      <m.div
        className="fixed top-3/4 right-16 w-24 h-24 rounded-full bg-gradient-to-br from-[#00ff88]/20 to-transparent blur-2xl pointer-events-none"
        animate={{
          y: [0, 40, 0],
          x: [0, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      />

      {/* Interactive cursor follower */}
      <m.div
        className="fixed w-4 h-4 bg-[#00d4ff] rounded-full pointer-events-none z-50 mix-blend-difference opacity-0"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          left: 'var(--mouse-x, -100px)',
          top: 'var(--mouse-y, -100px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Scroll progress indicator */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] z-40"
        style={{
          scaleX: typeof window !== 'undefined' ? scrollY / (document.body.scrollHeight - window.innerHeight) : 0,
        }}
      />
    </div>
  )
}
