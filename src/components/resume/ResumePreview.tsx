import { motion as m } from 'framer-motion';
import { Edit, Eye } from 'lucide-react';
import React from 'react';

interface ResumePreviewProps {
  theme: any;
  selectedTemplate: string;
  setSelectedTemplate: (val: string) => void;
  setPreviewMode: (val: boolean) => void;
  templates: any[];
  previewRef: React.RefObject<HTMLDivElement>;
  resumeData: any;
  children?: React.ReactNode;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  theme,
  selectedTemplate,
  setSelectedTemplate,
  setPreviewMode,
  templates,
  previewRef,
  resumeData,
  children,
}) => (
  <div className="space-y-6">
    {/* Preview Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 w-full">
      <div>
        <h2 className="text-lg sm:text-2xl font-bold" style={{ color: theme.textPrimary }}>Resume Preview</h2>
        <p className="text-xs sm:text-base" style={{ color: theme.textSecondary }}>Previewing: <span className="font-semibold capitalize">{selectedTemplate}</span> template</p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        {/* Template Switcher in Preview */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs sm:text-sm font-medium" style={{ color: theme.textSecondary }}>Template:</span>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="px-2 sm:px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-xs sm:text-sm w-full sm:w-auto"
            style={{
              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
              border: `1px solid ${theme.borderMedium}`,
              color: theme.textPrimary,
              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
            } as any}
          >
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPreviewMode(false)}
          className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold w-full sm:w-auto"
          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#6b7280,#4b5563)' : 'linear-gradient(90deg,#374151,#1f2937)', color: "#fff" }}
        >
          <Edit className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-xs sm:text-base">Back to Edit</span>
        </m.button>
      </div>
    </div>

    {/* Preview Info Banner */}
    <div className="p-3 sm:p-4 rounded-xl" style={{ background: theme.theme === 'light' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))' : 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.05))', border: `1px solid ${theme.theme === 'light' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 212, 255, 0.2)'}` }}>
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
        <div className="flex-shrink-0">
          <Eye className="w-4 sm:w-5 h-4 sm:h-5" style={{ color: theme.textAccent }} />
        </div>
        <div>
          <h4 className="font-semibold mb-1 text-xs sm:text-base" style={{ color: theme.textPrimary }}>Preview Your Template</h4>
          <p className="text-xs sm:text-base" style={{ color: theme.textSecondary }}>
            This is how your resume will look with the selected template. Switch templates using the dropdown above, then export as PDF when you're satisfied with the design.
          </p>
        </div>
      </div>
    </div>

    {/* Resume Preview Container */}
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-0">
      <div
        ref={previewRef}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full"
      >
        {children}
      </div>
    </div>
  </div>
);
