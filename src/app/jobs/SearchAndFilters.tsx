import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Filter } from 'lucide-react';

const m = motion as any;

type SearchAndFiltersProps = {
  theme: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  experienceFilter: string;
  setExperienceFilter: (experience: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

export default function SearchAndFilters({
  theme,
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  typeFilter,
  setTypeFilter,
  experienceFilter,
  setExperienceFilter,
  showFilters,
  setShowFilters
}: SearchAndFiltersProps) {
  return (
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
            className="w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 transition-all"
            style={{
              background: theme.bgInputStyle?.backgroundColor || '#ffffff',
              border: `1px solid ${theme.borderMedium}`,
              color: theme.textPrimary,
              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
            } as any}
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
            className="w-full pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 transition-all min-w-[200px]"
            style={{
              background: theme.bgInputStyle?.backgroundColor || '#ffffff',
              border: `1px solid ${theme.borderMedium}`,
              color: theme.textPrimary,
              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
            } as any}
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
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: theme.bgInputStyle?.backgroundColor || '#ffffff',
                    border: `1px solid ${theme.borderMedium}`,
                    color: theme.textPrimary,
                    '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                  } as any}
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
                  className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: theme.bgInputStyle?.backgroundColor || '#ffffff',
                    border: `1px solid ${theme.borderMedium}`,
                    color: theme.textPrimary,
                    '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                  } as any}
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
  );
}