import { useTheme } from '@/contexts/ThemeContext'

export function useThemeClasses() {
  const { theme } = useTheme()
  
  return {
    // Background classes
    bgPrimary: theme === 'light' 
      ? 'bg-gradient-to-b from-[#f0f4f8] via-[#e1e8ed] to-[#f0f4f8]'
      : 'bg-gradient-to-b from-[#0a1428] via-[#1a2d4d] to-[#0a1428]',
    
    bgCard: theme === 'light'
      ? 'bg-white/95 border-indigo-200/50'
      : 'bg-gradient-to-br from-[#1a3a52]/60 to-[#0f2540]/60 border-[#00d4ff]/20',
    
    bgNav: theme === 'light'
      ? 'bg-white/90 border-indigo-200/30'
      : 'bg-[#0a1428]/90 border-[#00d4ff]/20',
    
    bgModal: theme === 'light'
      ? 'bg-gradient-to-br from-white to-gray-50'
      : 'bg-gradient-to-br from-[#1a3a52] to-[#0f2540]',
    
    bgInput: theme === 'light'
      ? 'bg-white border-indigo-200'
      : 'bg-[#0f2540] border-[#00d4ff]/20',
    
    // Text classes
    textPrimary: theme === 'light' ? 'text-slate-900' : 'text-white',
    textSecondary: theme === 'light' ? 'text-slate-600' : 'text-gray-400',
    textTertiary: theme === 'light' ? 'text-slate-500' : 'text-gray-500',
    textAccent: theme === 'light' ? 'text-indigo-600' : 'text-[#00d4ff]',
    
    // Gradient text
    gradientText: theme === 'light'
      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 bg-clip-text text-transparent'
      : 'bg-gradient-to-r from-[#ffffff] via-[#00d4ff] to-[#ff6b00] bg-clip-text text-transparent',
    
    // Border classes
    borderLight: theme === 'light' ? 'border-indigo-100' : 'border-[#00d4ff]/20',
    borderMedium: theme === 'light' ? 'border-indigo-200' : 'border-[#00d4ff]/30',
    borderStrong: theme === 'light' ? 'border-indigo-400' : 'border-[#00d4ff]/50',
    
    // Button classes
    buttonPrimary: theme === 'light'
      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
      : 'bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] text-white hover:shadow-[#ff6b00]/50',
    
    buttonSecondary: theme === 'light'
      ? 'bg-white border-indigo-200 text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50'
      : 'bg-[#00d4ff]/20 border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30',
    
    // Status colors
    statusApplied: theme === 'light' ? '#4f46e5' : '#00d4ff',
    statusInterview: theme === 'light' ? '#f59e0b' : '#ff6b00',
    statusOffer: theme === 'light' ? '#10b981' : '#00ff88',
    statusRejected: theme === 'light' ? '#ef4444' : '#ff4444',
    
    // Accent colors
    accentPrimary: theme === 'light' ? '#4f46e5' : '#00d4ff',
    accentSecondary: theme === 'light' ? '#f59e0b' : '#ff6b00',
    accentSuccess: theme === 'light' ? '#10b981' : '#00ff88',
    
    // Hover effects
    hoverCard: theme === 'light'
      ? 'hover:bg-white hover:border-indigo-300 hover:shadow-lg'
      : 'hover:border-[#00d4ff]/50',
  }
}
