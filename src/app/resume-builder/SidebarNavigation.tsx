import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Zap, Rocket, Palette as PaletteIcon } from 'lucide-react';

const m = motion as any;

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'templates', label: 'Templates', icon: PaletteIcon }
];

interface SidebarNavigationProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  theme: {
    theme: 'light' | 'dark';
    textPrimary: string;
    borderMedium: string;
  };
}

export default function SidebarNavigation({ activeSection, setActiveSection, theme }: SidebarNavigationProps) {
  return (
    <div className="sticky top-24 space-y-4">
      {sections.map(section => (
        <m.button
          key={section.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveSection(section.id)}
          className={`w-full p-4 rounded-xl text-left transition-all ${activeSection === section.id ? 'ring-2' : ''} ${activeSection === section.id ? (theme.theme === 'light' ? 'ring-blue-500' : 'ring-cyan-400') : ''}`}
          style={{
            background: activeSection === section.id
              ? (theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)')
              : (theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.6)'),
            color: activeSection === section.id ? '#fff' : theme.textPrimary,
            border: `1px solid ${activeSection === section.id ? (theme.theme === 'light' ? '#3b82f6' : '#ff6b00') : theme.borderMedium}`,
            backdropFilter: activeSection !== section.id ? 'blur(10px)' : 'none',
            boxShadow: activeSection === section.id
              ? (theme.theme === 'light' ? '0 4px 14px rgba(59, 130, 246, 0.25)' : '0 4px 14px rgba(255, 107, 0, 0.25)')
              : (theme.theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.3)')
          }}
        >
          <div className="flex items-center gap-3">
            <section.icon className="w-5 h-5" />
            <span className="font-semibold">{section.label}</span>
          </div>
        </m.button>
      ))}
    </div>
  );
}
