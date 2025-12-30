import React from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Zap, Rocket, Palette as PaletteIcon } from 'lucide-react';

const m = motion as any;

const sections = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Zap },
  { id: 'projects', label: 'Projects', icon: Rocket },
  { id: 'templates', label: 'Templates', icon: PaletteIcon }
];

interface MobileSectionNavigationProps {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
  theme: {
    theme: 'light' | 'dark';
    textPrimary: string;
    borderMedium: string;
    bgCard: string;
  };
}

export default function MobileSectionNavigation({ activeSection, setActiveSection, theme }: MobileSectionNavigationProps) {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg"
      style={{
        borderTop: `1px solid ${theme.borderMedium}`,
        background: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)'
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {sections.map(section => {
          const isActive = activeSection === section.id;
          return (
            <m.button
              key={section.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection(section.id)}
              className="flex flex-col items-center justify-center p-2 rounded-lg min-w-[60px] transition-all"
              style={{
                background: isActive
                  ? (theme.theme === 'light' ? 'linear-gradient(135deg,#3b82f6,#1d4ed8)' : 'linear-gradient(135deg,#ff6b00,#00d4ff)')
                  : 'transparent',
                color: isActive ? '#fff' : theme.textPrimary,
              }}
            >
              <section.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-white' : ''}`} />
              <span className="text-xs font-medium truncate">{section.label}</span>
            </m.button>
          );
        })}
      </div>
    </div>
  );
}