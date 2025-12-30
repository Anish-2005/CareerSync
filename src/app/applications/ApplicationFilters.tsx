import React from 'react';
import { motion } from 'framer-motion';

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

type ApplicationFiltersProps = {
  theme: any;
  applications: Application[];
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  getStatusColor: (status: Application['status']) => { bg: string; border: string; text: string };
  formatStatus: (status: Application['status']) => string;
};

export default function ApplicationFilters({
  theme,
  applications,
  statusFilter,
  setStatusFilter,
  getStatusColor,
  formatStatus
}: ApplicationFiltersProps) {
  return (
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
          const count = applications.filter(app => app.status === status).length;
          const statusColor = getStatusColor(status as Application['status']);
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
          );
        })}
      </div>
    </m.div>
  );
}