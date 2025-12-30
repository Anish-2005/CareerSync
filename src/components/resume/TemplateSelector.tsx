import React from 'react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: (val: string) => void;
  templates: any[];
  theme: any;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, setSelectedTemplate, templates, theme }) => (
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
);
