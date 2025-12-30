import React from 'react';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import ApplicationCard from './ApplicationCard';

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

type ApplicationsListProps = {
  loading: boolean;
  filteredApplications: Application[];
  theme: any;
  getStatusColor: (status: Application['status']) => { bg: string; border: string; text: string };
  getStatusIcon: (status: Application['status']) => React.ReactNode;
  formatStatus: (status: Application['status']) => string;
  getTimeAgo: (date: Date | undefined | null) => string;
};

export default function ApplicationsList({
  loading,
  filteredApplications,
  theme,
  getStatusColor,
  getStatusIcon,
  formatStatus,
  getTimeAgo
}: ApplicationsListProps) {
  return (
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
        filteredApplications.map((application, idx) => (
          <ApplicationCard
            key={application.id}
            application={application}
            theme={theme}
            index={idx}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            formatStatus={formatStatus}
            getTimeAgo={getTimeAgo}
          />
        ))
      )}
    </div>
  );
}