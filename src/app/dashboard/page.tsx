"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Target,
  TrendingUp,
  Calendar,
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  BarChart3,
  FileText,
  Link as LinkIcon,
  MapPin,
  DollarSign,
  Users,
  Building2,
  Send,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { RouteGuard } from "@/components/RouteGuard"

const m = motion as any

// Types
interface Application {
  id: string
  company: string
  position: string
  status: "applied" | "interviewing" | "offer" | "rejected"
  appliedDate: string
  salary?: string
  location: string
  progress: number
  priority: "high" | "medium" | "low"
  nextStep?: string
  nextStepDate?: string
}

// Mock data
const mockApplications: Application[] = [
  {
    id: "1",
    company: "Google",
    position: "Senior Software Engineer",
    status: "interviewing",
    appliedDate: "2024-11-01",
    salary: "$150k - $200k",
    location: "Mountain View, CA",
    progress: 60,
    priority: "high",
    nextStep: "Technical Interview",
    nextStepDate: "2024-11-15",
  },
  {
    id: "2",
    company: "Microsoft",
    position: "Full Stack Developer",
    status: "applied",
    appliedDate: "2024-11-05",
    salary: "$120k - $160k",
    location: "Redmond, WA",
    progress: 25,
    priority: "medium",
  },
  {
    id: "3",
    company: "Apple",
    position: "iOS Developer",
    status: "offer",
    appliedDate: "2024-10-20",
    salary: "$160k - $210k",
    location: "Cupertino, CA",
    progress: 100,
    priority: "high",
    nextStep: "Offer Review",
    nextStepDate: "2024-11-18",
  },
  {
    id: "4",
    company: "Amazon",
    position: "Backend Engineer",
    status: "rejected",
    appliedDate: "2024-10-15",
    location: "Seattle, WA",
    progress: 40,
    priority: "low",
  },
  {
    id: "5",
    company: "Meta",
    position: "Frontend Engineer",
    status: "interviewing",
    appliedDate: "2024-11-08",
    salary: "$140k - $180k",
    location: "Menlo Park, CA",
    progress: 50,
    priority: "high",
    nextStep: "System Design Round",
    nextStepDate: "2024-11-16",
  },
]

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [selectedTab, setSelectedTab] = useState<"all" | "applied" | "interviewing" | "offer" | "rejected">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  // Calculate stats
  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interviewing: applications.filter((a) => a.status === "interviewing").length,
    offers: applications.filter((a) => a.status === "offer").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    responseRate: Math.round(
      ((applications.length - applications.filter((a) => a.status === "applied").length) / applications.length) * 100
    ),
  }

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesTab = selectedTab === "all" || app.status === selectedTab
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "applied":
        return "#00d4ff"
      case "interviewing":
        return "#ff6b00"
      case "offer":
        return "#00ff88"
      case "rejected":
        return "#ff4444"
      default:
        return "#666"
    }
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "applied":
        return Send
      case "interviewing":
        return Users
      case "offer":
        return CheckCircle2
      case "rejected":
        return XCircle
      default:
        return AlertCircle
    }
  }

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)
  const [selectedTab, setSelectedTab] = useState<"all" | "applied" | "interviewing" | "offer" | "rejected">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)

  // Calculate stats
  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    interviewing: applications.filter((a) => a.status === "interviewing").length,
    offers: applications.filter((a) => a.status === "offer").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    responseRate: Math.round(
      ((applications.length - applications.filter((a) => a.status === "applied").length) / applications.length) * 100
    ),
  }

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const matchesTab = selectedTab === "all" || app.status === selectedTab
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "applied":
        return "#00d4ff"
      case "interviewing":
        return "#ff6b00"
      case "offer":
        return "#00ff88"
      case "rejected":
        return "#ff4444"
      default:
        return "#666"
    }
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "applied":
        return Send
      case "interviewing":
        return Users
      case "offer":
        return CheckCircle2
      case "rejected":
        return XCircle
      default:
        return AlertCircle
    }
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
              onClick={() => setShowAddModal(true)}
              className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8c00] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Application
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
            Dashboard
          </h1>
          <p className="text-xl text-gray-400">Track and manage your career opportunities</p>
        </m.div>

        {/* Stats Cards */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {[
            { label: "Total", value: stats.total, icon: Briefcase, color: "#00d4ff", trend: "+3" },
            { label: "Applied", value: stats.applied, icon: Send, color: "#00d4ff", trend: "+2" },
            { label: "Interviewing", value: stats.interviewing, icon: Users, color: "#ff6b00", trend: "+1" },
            { label: "Offers", value: stats.offers, icon: CheckCircle2, color: "#00ff88", trend: "+1" },
            { label: "Rejected", value: stats.rejected, icon: XCircle, color: "#ff4444", trend: "0" },
            {
              label: "Response Rate",
              value: `${stats.responseRate}%`,
              icon: TrendingUp,
              color: "#00ff88",
              trend: "+5%",
            },
          ].map((stat, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                style={{ background: `linear-gradient(135deg, ${stat.color}40, transparent)` }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  <div
                    className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: `${stat.color}20`,
                      color: stat.color,
                    }}
                  >
                    {stat.trend.startsWith("+") ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.trend}
                  </div>
                </div>
                <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </m.div>
          ))}
        </m.div>

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
              placeholder="Search companies or positions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#1a3a52]/60 border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all duration-300"
            />
          </div>

          {/* Tab Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { label: "All", value: "all", count: stats.total },
              { label: "Applied", value: "applied", count: stats.applied },
              { label: "Interviewing", value: "interviewing", count: stats.interviewing },
              { label: "Offers", value: "offer", count: stats.offers },
              { label: "Rejected", value: "rejected", count: stats.rejected },
            ].map((tab) => (
              <m.button
                key={tab.value}
                onClick={() => setSelectedTab(tab.value as typeof selectedTab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  selectedTab === tab.value
                    ? "bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white shadow-lg"
                    : "bg-[#1a3a52]/60 border border-[#00d4ff]/20 text-gray-400 hover:text-white hover:border-[#00d4ff]/50"
                }`}
              >
                {tab.label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedTab === tab.value ? "bg-white/20" : "bg-[#00d4ff]/20"
                  }`}
                >
                  {tab.count}
                </span>
              </m.button>
            ))}
          </div>
        </m.div>

        {/* Applications List */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredApplications.map((app, idx) => {
              const StatusIcon = getStatusIcon(app.status)
              const statusColor = getStatusColor(app.status)

              return (
                <m.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-300 overflow-hidden cursor-pointer"
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
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                          style={{
                            background: `linear-gradient(135deg, ${statusColor}40, ${statusColor}20)`,
                          }}
                        >
                          {app.company.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                            {app.company}
                          </h3>
                          <p className="text-gray-400">{app.position}</p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${statusColor}20`,
                          color: statusColor,
                          border: `1px solid ${statusColor}50`,
                        }}
                      >
                        <StatusIcon className="w-4 h-4" />
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 text-[#00d4ff]" />
                        <span>{new Date(app.appliedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      {app.salary && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <DollarSign className="w-4 h-4 text-[#00ff88]" />
                          <span>{app.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 text-[#ff6b00]" />
                        <span>{app.location}</span>
                      </div>
                      {app.nextStep && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Clock className="w-4 h-4 text-[#00d4ff]" />
                          <span>{app.nextStep}</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm font-bold" style={{ color: statusColor }}>
                          {app.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#0f2540] rounded-full overflow-hidden">
                        <m.div
                          initial={{ width: 0 }}
                          animate={{ width: `${app.progress}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      {app.nextStepDate && (
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-[#ff6b00]" />
                          <span className="text-gray-400">
                            Next: <span className="text-white font-bold">{app.nextStepDate}</span>
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 ml-auto">
                        <m.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </m.button>
                        <m.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-[#ff6b00]/20 border border-[#ff6b00]/50 text-[#ff6b00] hover:bg-[#ff6b00]/30 transition-all"
                        >
                          <Edit className="w-4 h-4" />
                        </m.button>
                        <m.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 rounded-lg bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444] hover:bg-[#ff4444]/30 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </m.button>
                      </div>
                    </div>
                  </div>
                </m.div>
              )
            })}
          </AnimatePresence>

          {/* Empty State */}
          {filteredApplications.length === 0 && (
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#ff6b00]/20 flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No applications found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? "Try adjusting your search" : "Start tracking your job applications"}
              </p>
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="px-8 py-3 text-white font-bold rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
              >
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <m.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="relative w-full max-w-2xl p-8 rounded-3xl bg-gradient-to-br from-[#1a3a52] to-[#0f2540] border border-[#00d4ff]/30 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">New Application</h2>
                <m.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-full bg-[#ff4444]/20 border border-[#ff4444]/50 text-[#ff4444]"
                >
                  <XCircle className="w-6 h-6" />
                </m.button>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Company *</label>
                    <input
                      type="text"
                      placeholder="Google, Microsoft..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Position *</label>
                    <input
                      type="text"
                      placeholder="Software Engineer..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="San Francisco, CA"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Salary Range</label>
                    <input
                      type="text"
                      placeholder="$100k - $150k"
                      className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Status *</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all">
                      <option value="applied">Applied</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offer">Offer</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">Priority</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Notes</label>
                  <textarea
                    rows={4}
                    placeholder="Add any additional notes..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl bg-[#0f2540] border border-[#00d4ff]/20 text-white font-bold hover:border-[#00d4ff]/50 transition-all"
                  >
                    Cancel
                  </m.button>
                  <m.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white font-bold hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all"
                  >
                    Add Application
                  </m.button>
                </div>
              </form>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  </RouteGuard>
  )
}
