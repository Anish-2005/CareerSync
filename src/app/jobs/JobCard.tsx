import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Briefcase, DollarSign, Users, Clock, Bookmark, BookmarkCheck } from 'lucide-react';

const m = motion as any;

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

type JobCardProps = {
  job: Job;
  theme: any;
  index: number;
  savedJobs: Set<string>;
  toggleSaveJob: (jobId: string) => void;
  createApplication: (job: Job) => void;
  formatSalary: (salary?: Job['salary']) => string;
  getTimeAgo: (date: Date | undefined | null) => string;
};

export default function JobCard({
  job,
  theme,
  index,
  savedJobs,
  toggleSaveJob,
  createApplication,
  formatSalary,
  getTimeAgo
}: JobCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
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
  );
}