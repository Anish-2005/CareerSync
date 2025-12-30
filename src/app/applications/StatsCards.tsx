import React from 'react';
import { motion } from 'framer-motion';

const m = motion as any;

type StatsCardsProps = {
  theme: any;
  stats: {
    total: number;
    interviewing: number;
    offers: number;
    pending: number;
  };
};

export default function StatsCards({ theme, stats }: StatsCardsProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"
    >
      <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
        <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: theme.textPrimary }}>{stats.total}</div>
        <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Total</div>
      </div>
      <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
        <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#d97706' }}>{stats.interviewing}</div>
        <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Interviewing</div>
      </div>
      <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
        <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#00ff88' }}>{stats.offers}</div>
        <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Offers</div>
      </div>
      <div className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
        <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: '#3b82f6' }}>{stats.pending}</div>
        <div className="text-xs sm:text-sm" style={{ color: theme.textSecondary }}>Pending</div>
      </div>
    </m.div>
  );
}