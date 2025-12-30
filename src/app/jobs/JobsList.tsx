import React from 'react';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import JobCard from './JobCard';

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

type JobsListProps = {
  loading: boolean;
  filteredJobs: Job[];
  theme: any;
  savedJobs: Set<string>;
  toggleSaveJob: (jobId: string) => void;
  createApplication: (job: Job) => void;
  formatSalary: (salary?: Job['salary']) => string;
  getTimeAgo: (date: Date | undefined | null) => string;
};

export default function JobsList({
  loading,
  filteredJobs,
  theme,
  savedJobs,
  toggleSaveJob,
  createApplication,
  formatSalary,
  getTimeAgo
}: JobsListProps) {
  return (
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
          <JobCard
            key={job.id}
            job={job}
            theme={theme}
            index={idx}
            savedJobs={savedJobs}
            toggleSaveJob={toggleSaveJob}
            createApplication={createApplication}
            formatSalary={formatSalary}
            getTimeAgo={getTimeAgo}
          />
        ))
      )}
    </div>
  );
}