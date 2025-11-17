import { useTheme } from '@/contexts/ThemeContext'

export function useThemeClasses() {
  const { theme } = useTheme()
  
  return {
    theme,
    // Inline style objects for backgrounds
    bgPrimary: theme === 'light'
      ? { background: 'linear-gradient(to bottom, #f8fafc, #eef2f7, #f8fafc)' }
      : { background: 'linear-gradient(to bottom, #0a1428, #1a2d4d, #0a1428)' },
    
    bgCard: theme === 'light'
      ? { backgroundColor: '#ffffff', borderColor: '#e2e8f0', boxShadow: '0 2px 8px rgba(15,23,42,0.06)' }
      : { background: 'linear-gradient(to bottom right, rgba(26, 58, 82, 0.6), rgba(15, 37, 64, 0.6))', borderColor: 'rgba(0, 212, 255, 0.2)' },
    
    bgNav: theme === 'light'
      ? { backgroundColor: 'rgba(255, 255, 255, 0.85)', borderColor: '#e2e8f0', boxShadow: '0 1px 4px rgba(15,23,42,0.05)' }
      : { backgroundColor: 'rgba(10, 20, 40, 0.9)', borderColor: 'rgba(0, 212, 255, 0.2)' },
    
    bgModal: theme === 'light'
      ? { background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)' }
      : { background: 'linear-gradient(to bottom right, #1a3a52, #0f2540)' },
    
    bgInput: theme === 'light'
      ? { backgroundColor: '#ffffff', borderColor: 'rgba(99, 102, 241, 0.3)' }
      : { backgroundColor: '#0f2540', borderColor: 'rgba(0, 212, 255, 0.2)' },
    
    bgButton: theme === 'light'
      ? { background: 'linear-gradient(90deg, #4f46e5, #6366f1)', boxShadow: '0 4px 18px rgba(79,70,229,0.25)' }
      : { background: 'linear-gradient(to right, #ff6b00, #00d4ff)' },
    
    bgButtonSecondary: theme === 'light'
      ? { backgroundColor: '#f1f5f9', borderColor: '#cbd5e1', color: '#334155' }
      : { backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: 'rgba(0, 212, 255, 0.5)', color: '#00d4ff' },
    
    // Color values
    textPrimary: theme === 'light' ? '#0f172a' : '#ffffff',
    textSecondary: theme === 'light' ? '#475569' : '#9ca3af',
    textTertiary: theme === 'light' ? '#64748b' : '#6b7280',
    textAccent: theme === 'light' ? '#2563eb' : '#00d4ff',
    
    // Gradient for text
    gradientText: theme === 'light'
      ? { background: 'linear-gradient(to right, #0f172a, #2563eb, #1d4ed8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
      : { background: 'linear-gradient(to right, #ffffff, #00d4ff, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
    
    // Border colors
    borderLight: theme === 'light' ? '#e2e8f0' : 'rgba(0, 212, 255, 0.2)',
    borderMedium: theme === 'light' ? '#cbd5e1' : 'rgba(0, 212, 255, 0.3)',
    borderStrong: theme === 'light' ? '#94a3b8' : 'rgba(0, 212, 255, 0.5)',
    
    // Status colors
    statusApplied: theme === 'light' ? '#2563eb' : '#00d4ff',
    statusInterview: theme === 'light' ? '#f59e0b' : '#ff6b00',
    statusOffer: theme === 'light' ? '#10b981' : '#00ff88',
    statusRejected: theme === 'light' ? '#ef4444' : '#ff4444',
    
    // Background effects for morphing shapes
    morphShape1: theme === 'light'
      ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(99, 102, 241, 0.18))'
      : 'linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(0, 212, 255, 0.3))',

    morphShape2: theme === 'light'
      ? 'linear-gradient(225deg, rgba(99, 102, 241, 0.15), rgba(29, 78, 216, 0.15))'
      : 'linear-gradient(225deg, rgba(0, 255, 136, 0.2), rgba(255, 107, 0, 0.2))',
    
    // Particle colors
    particleColors: theme === 'light'
      ? ['#2563eb', '#6366f1', '#0ea5e9']
      : ['#00d4ff', '#ff6b00', '#00ff88'],
  }
}
