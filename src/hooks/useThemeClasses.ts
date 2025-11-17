import { useTheme } from '@/contexts/ThemeContext'

export function useThemeClasses() {
  const { theme } = useTheme()
  
  return {
    theme,
    // Class names for backgrounds
    bgPrimary: 'bg-primary',
    bgPrimaryStyle: theme === 'light' ? { backgroundColor: '#f8fafc' } : { backgroundColor: '#0a1428' },
    
    bgCard: 'bg-card',
    bgCardStyle: theme === 'light' ? { backgroundColor: '#ffffff' } : { backgroundColor: '#1a2d4d' },
    
    bgNav: 'bg-nav',
    bgNavStyle: theme === 'light' ? { backgroundColor: '#f1f5f9' } : { backgroundColor: '#0f2540' },
    
    bgModal: 'bg-modal',
    bgModalStyle: theme === 'light' ? { backgroundColor: 'rgba(255, 255, 255, 0.95)' } : { backgroundColor: 'rgba(26, 58, 82, 0.95)' },
    
    bgInput: 'bg-input',
    bgInputStyle: theme === 'light' ? { backgroundColor: '#ffffff' } : { backgroundColor: '#0f2540' },
    
    bgButton: 'bg-button',
    bgButtonStyle: theme === 'light' ? { backgroundColor: '#4f46e5' } : { backgroundColor: '#ff6b00' },
    
    bgButtonSecondary: 'bg-button-secondary',
    bgButtonSecondaryStyle: theme === 'light' ? { backgroundColor: 'transparent' } : { backgroundColor: 'rgba(0, 212, 255, 0.1)' },
    
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
