import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building, MapPin, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

const m = motion as any;

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: Date;
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  notes?: string;
  followUpDate?: Date;
  applicationUrl?: string;
  salary?: {
    offered?: number;
    expected?: number;
    currency: string;
  };
}

type ApplicationCardProps = {
  application: Application;
  theme: any;
  index: number;
  getStatusColor: (status: Application['status']) => { bg: string; border: string; text: string };
  getStatusIcon: (status: Application['status']) => React.ReactNode;
  formatStatus: (status: Application['status']) => string;
  getTimeAgo: (date: Date | undefined | null) => string;
};

export default function ApplicationCard({
  application,
  theme,
  index,
  getStatusColor,
  getStatusIcon,
  formatStatus,
  getTimeAgo
}: ApplicationCardProps) {
  const statusColor = getStatusColor(application.status);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl hover:border-2 transition-all duration-300"
      style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6">
        {/* Application Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 truncate" style={{ color: theme.textPrimary }}>
                {application.jobTitle}
              </h3>
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
            style={{
              background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)',
              color: "#fff"
            }}
          >
            Update Status
          </m.button>
        </div>
      </div>
    </m.div>
  );
}