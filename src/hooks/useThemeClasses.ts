import { useTheme } from '@/contexts/ThemeContext'

export function useThemeClasses() {
  const { theme } = useTheme()
  
  return {
    theme,
    // Inline style objects for backgrounds
    bgPrimary: theme === 'light' 
      ? { background: 'linear-gradient(to bottom, #f0f4f8, #e1e8ed, #f0f4f8)' }
      : { background: 'linear-gradient(to bottom, #0a1428, #1a2d4d, #0a1428)' },
    
    bgCard: theme === 'light'
      ? { backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(99, 102, 241, 0.2)' }
      : { background: 'linear-gradient(to bottom right, rgba(26, 58, 82, 0.6), rgba(15, 37, 64, 0.6))', borderColor: 'rgba(0, 212, 255, 0.2)' },
    
    bgNav: theme === 'light'
      ? { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: 'rgba(99, 102, 241, 0.2)' }
      : { backgroundColor: 'rgba(10, 20, 40, 0.9)', borderColor: 'rgba(0, 212, 255, 0.2)' },
    
    bgModal: theme === 'light'
      ? { background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)' }
      : { background: 'linear-gradient(to bottom right, #1a3a52, #0f2540)' },
    
    bgInput: theme === 'light'
      ? { backgroundColor: '#ffffff', borderColor: 'rgba(99, 102, 241, 0.3)' }
      : { backgroundColor: '#0f2540', borderColor: 'rgba(0, 212, 255, 0.2)' },
    
    bgButton: theme === 'light'
      ? { background: 'linear-gradient(to right, #4f46e5, #9333ea)' }
      : { background: 'linear-gradient(to right, #ff6b00, #00d4ff)' },
    
    bgButtonSecondary: theme === 'light'
      ? { backgroundColor: '#ffffff', borderColor: 'rgba(99, 102, 241, 0.3)', color: '#4f46e5' }
      : { backgroundColor: 'rgba(0, 212, 255, 0.2)', borderColor: 'rgba(0, 212, 255, 0.5)', color: '#00d4ff' },
    
    // Color values
    textPrimary: theme === 'light' ? '#0f172a' : '#ffffff',
    textSecondary: theme === 'light' ? '#475569' : '#9ca3af',
    textTertiary: theme === 'light' ? '#64748b' : '#6b7280',
    textAccent: theme === 'light' ? '#4f46e5' : '#00d4ff',
    
    // Gradient for text
    gradientText: theme === 'light'
      ? { background: 'linear-gradient(to right, #4f46e5, #9333ea, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
      : { background: 'linear-gradient(to right, #ffffff, #00d4ff, #ff6b00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
    
    // Border colors
    borderLight: theme === 'light' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(0, 212, 255, 0.2)',
    borderMedium: theme === 'light' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(0, 212, 255, 0.3)',
    borderStrong: theme === 'light' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(0, 212, 255, 0.5)',
    
    // Status colors
    statusApplied: theme === 'light' ? '#4f46e5' : '#00d4ff',
    statusInterview: theme === 'light' ? '#f59e0b' : '#ff6b00',
    statusOffer: theme === 'light' ? '#10b981' : '#00ff88',
    statusRejected: theme === 'light' ? '#ef4444' : '#ff4444',
    
    // Background effects for morphing shapes
    morphShape1: theme === 'light'
      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(245, 158, 11, 0.2))'
      : 'linear-gradient(135deg, rgba(255, 107, 0, 0.3), rgba(0, 212, 255, 0.3))',
    
    morphShape2: theme === 'light'
      ? 'linear-gradient(225deg, rgba(16, 185, 129, 0.15), rgba(99, 102, 241, 0.15))'
      : 'linear-gradient(225deg, rgba(0, 255, 136, 0.2), rgba(255, 107, 0, 0.2))',
    
    // Particle colors
    particleColors: theme === 'light'
      ? ['#4f46e5', '#f59e0b', '#10b981']
      : ['#00d4ff', '#ff6b00', '#00ff88'],
  }
}
