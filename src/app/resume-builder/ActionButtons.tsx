import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Eye, Download, Save } from 'lucide-react';

const m = motion as any;

type ActionButtonsProps = {
  previewMode: boolean;
  setPreviewMode: (value: boolean) => void;
  exportResume: () => void;
  saveDraft: () => void;
  theme: {
    theme: string;
    bgCard: string;
    borderMedium: string;
    textPrimary: string;
  };
};

export default function ActionButtons({ previewMode, setPreviewMode, exportResume, saveDraft, theme }: ActionButtonsProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mb-8"
    >
      {/* Desktop Layout */}
      <div className="hidden sm:flex flex-wrap gap-4">
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold min-h-[48px]"
          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
        >
          {previewMode ? <Edit className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          {previewMode ? 'Edit Resume' : 'Preview Resume'}
        </m.button>

        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportResume}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold min-h-[48px]"
          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#00ff88,#00d4aa)', color: "#fff" }}
        >
          <Download className="w-5 h-5" />
          Export PDF
        </m.button>

        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveDraft}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold min-h-[48px]"
          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
        >
          <Save className="w-5 h-5" />
          Save Draft
        </m.button>
      </div>

      {/* Mobile Layout - Compact */}
      <div className="sm:hidden flex gap-3">
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPreviewMode(!previewMode)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold min-h-[48px] text-sm"
          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
        >
          {previewMode ? <Edit className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          {previewMode ? 'Edit' : 'Preview'}
        </m.button>

        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportResume}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold min-h-[48px] text-sm"
          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#00ff88,#00d4aa)', color: "#fff" }}
        >
          <Download className="w-5 h-5" />
          Export
        </m.button>

        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveDraft}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold min-h-[48px] text-sm"
          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
        >
          <Save className="w-5 h-5" />
          Save
        </m.button>
      </div>
    </m.div>
  );
}
