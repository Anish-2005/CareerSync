import React from 'react';
import { motion } from 'framer-motion';
import { Download, Save } from 'lucide-react';

const m = motion as any;

interface PreviewActionsProps {
  exportResume: () => void;
  saveDraft: () => void;
  theme: any;
}

const PreviewActions: React.FC<PreviewActionsProps> = ({ exportResume, saveDraft, theme }) => (
  <div className="flex justify-center gap-4">
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={exportResume}
      className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg"
      style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#00ff88,#00d4aa)', color: "#fff" }}
    >
      <Download className="w-6 h-6" />
      Export PDF
    </m.button>
    <m.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={saveDraft}
      className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg"
      style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
    >
      <Save className="w-6 h-6" />
      Save Draft
    </m.button>
  </div>
);

export default PreviewActions;
