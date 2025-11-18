"use client"

import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

// Predefined particle positions for consistent SSR/client rendering
const particlePositions = [
  { left: 12.75, top: 48.69 },
  { left: 67.23, top: 23.45 },
  { left: 34.89, top: 78.12 },
  { left: 89.34, top: 56.78 },
  { left: 45.67, top: 12.34 },
  { left: 78.90, top: 89.01 },
  { left: 23.45, top: 67.89 },
  { left: 56.78, top: 34.56 },
  { left: 91.23, top: 45.67 },
  { left: 12.34, top: 78.90 },
  { left: 67.89, top: 23.12 },
  { left: 34.56, top: 89.34 },
  { left: 89.01, top: 56.23 },
  { left: 45.12, top: 12.78 },
  { left: 78.45, top: 67.34 },
  { left: 23.78, top: 34.89 },
  { left: 56.34, top: 91.23 },
  { left: 91.78, top: 45.12 },
  { left: 12.89, top: 78.45 },
  { left: 67.34, top: 23.78 },
  { left: 34.12, top: 89.78 },
  { left: 89.56, top: 56.89 },
  { left: 45.78, top: 12.23 },
  { left: 78.12, top: 67.78 },
  { left: 23.34, top: 34.23 },
  { left: 56.89, top: 91.78 },
  { left: 91.34, top: 45.89 },
  { left: 12.56, top: 78.12 },
  { left: 67.78, top: 23.34 },
  { left: 34.89, top: 89.23 }
]

export default function HeroSection() {
  const { user } = useAuth()
  const theme = useThemeClasses()
  const isLight = theme.theme === 'light'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const scaleVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  }

  return (
      <section className="pt-32 md:pt-24 relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-0">
           {/* Innovative morphing background */}
           <div className="absolute inset-0 overflow-hidden">
             {/* Morphing geometric shapes */}
             <m.div
               className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 opacity-20"
               animate={{
                 borderRadius: ["50% 20% 80% 30%", "30% 80% 20% 70%", "80% 30% 50% 20%", "50% 20% 80% 30%"],
                 rotate: [0, 90, 180, 360],
                 scale: [1, 1.2, 0.8, 1],
               }}
               transition={{
                 duration: 20,
                 repeat: Number.POSITIVE_INFINITY,
                 ease: "easeInOut",
               }}
               style={{
                 background: theme.morphShape1,
                 filter: "blur(40px)",
               }}
             />
             <m.div
               className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 opacity-15"
               animate={{
                 borderRadius: ["20% 80% 30% 70%", "70% 30% 80% 20%", "30% 70% 20% 80%", "20% 80% 30% 70%"],
                 rotate: [360, 270, 180, 0],
                 scale: [0.8, 1.3, 1, 0.8],
               }}
               transition={{
                 duration: 25,
                 repeat: Number.POSITIVE_INFINITY,
                 ease: "easeInOut",
                 delay: 5,
               }}
               style={{
                 background: theme.morphShape2,
                 filter: "blur(30px)",
               }}
             />
   
             {/* Advanced particle system */}
             <div className="hidden md:block">
               {[...Array(isLight ? 10 : 30)].map((_, i) => (
                 <m.div
                   key={i}
                   className={`absolute ${isLight ? 'w-1 h-1' : 'w-2 h-2'} rounded-full`}
                   animate={{
                     x: [0, 50, -25, 0],
                     y: [0, -30, 15, 0],
                     scale: [0, 1, 0.5, 1, 0],
                     opacity: isLight ? [0, 0.6, 0.3, 0.6, 0] : [0, 0.8, 0.4, 0.8, 0],
                   }}
                   transition={{
                     duration: 15,
                     repeat: Number.POSITIVE_INFINITY,
                     ease: "easeInOut",
                     delay: i * 0.2,
                   }}
                   style={{
                     background: theme.particleColors[i % 3],
                     left: `${particlePositions[i]?.left || 50}%`,
                     top: `${particlePositions[i]?.top || 50}%`,
                     filter: isLight ? "blur(0.6px)" : "blur(1px)",
                   }}
                 />
               ))}
             </div>
   
             {/* Liquid-like flowing elements */}
             <m.div
               className="absolute top-0 left-0 w-full h-32 opacity-30"
               animate={{
                 backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
               }}
               transition={{
                 duration: 10,
                 repeat: Number.POSITIVE_INFINITY,
                 ease: "easeInOut",
               }}
               style={{
                 background: theme.theme === 'light'
                   ? "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)"
                   : `linear-gradient(90deg, transparent, ${theme.textAccent}33, transparent)`,
                 filter: "blur(20px)",
               }}
             />
             <m.div
               className="absolute bottom-0 right-0 w-full h-32 opacity-20"
               animate={{
                 backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
               }}
               transition={{
                 duration: 12,
                 repeat: Number.POSITIVE_INFINITY,
                 ease: "easeInOut",
                 delay: 3,
               }}
               style={{
                 background: theme.theme === 'light'
                   ? "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.25), transparent)"
                   : `linear-gradient(90deg, transparent, ${theme.statusInterview}40, transparent)`,
                 filter: "blur(25px)",
               }}
             />
           </div>
   
           {/* Content */}
           <m.div
             className="relative z-10 max-w-5xl mx-auto px-6 text-center"
             variants={containerVariants}
             initial="hidden"
             animate="visible"
           >
             {/* Innovative badge with morphing effect */}
             <m.div
               variants={itemVariants}
               className="relative inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-8 sm:py-2 rounded-full border backdrop-blur-xl overflow-hidden"
               style={{ ...theme.bgButtonSecondaryStyle, borderColor: theme.borderMedium }}
               whileHover={{ scale: 1.05 }}
             >
               {/* Morphing background */}
               <m.div
                 className="absolute inset-0 rounded-full"
                 animate={{
                   scale: [1, 1.2, 0.8, 1],
                   rotate: [0, 90, 180, 270, 360],
                 }}
                 transition={{
                   duration: 8,
                   repeat: Number.POSITIVE_INFINITY,
                   ease: "easeInOut",
                 }}
                 style={{
                   background: theme.theme === 'light'
                     ? "linear-gradient(45deg, rgba(99, 102, 241, 0.08), rgba(245, 158, 11, 0.08))"
                     : `linear-gradient(45deg, ${theme.textAccent}1a, ${theme.statusInterview}1a)`,
                 }}
   
               />
               <m.span
                 style={{
                   ...theme.gradientText,
                   backgroundSize: "200% 200%",
                 }}
                 animate={{
                   backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                 }}
                 transition={{
                   duration: 8,
                   repeat: Number.POSITIVE_INFINITY,
                   ease: "easeInOut",
                 }}
               >
                 Next-gen Job Tracking System
               </m.span>
               <m.div
                 className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
                 animate={{
                   scale: [1, 1.5, 1],
                   opacity: [0.7, 1, 0.7],
                 }}
                 transition={{
                   duration: 2,
                   repeat: Number.POSITIVE_INFINITY,
                   ease: "easeInOut",
                 }}
                 style={{
                   backgroundColor: theme.textAccent
                 }}
               />
   
               <m.div
                 className="w-1 h-1 sm:w-2 sm:h-2 rounded-full"
                 animate={{
                   scale: [1, 1.3, 1],
                   opacity: [0.5, 0.9, 0.5],
                 }}
                 transition={{
                   duration: 1.5,
                   repeat: Number.POSITIVE_INFINITY,
                   ease: "easeInOut",
                   delay: 0.5,
                 }}
                 style={{
                   backgroundColor: theme.statusInterview
                 }}
               />
             </m.div>
   
             {/* Fluid morphing headline */}
             <m.h1
               variants={itemVariants}
               className="mt-8 text-[12vw] sm:text-5xl md:text-7xl lg:text-9xl font-black mb-6 sm:mb-8 leading-tight tracking-tight"
               style={{
                 ...theme.gradientText,
                 filter: theme.theme === 'light'
                   ? "drop-shadow(0 2px 4px rgba(15,23,42,0.08))"
                   : "drop-shadow(0 0 40px rgba(0, 212, 255, 0.3))",
               }}
               animate={{
                 backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                 textShadow: theme.theme === 'light' ? [
                   "0 1px 2px rgba(0,0,0,0.08)",
                   "0 2px 4px rgba(0,0,0,0.10)",
                   "0 1px 2px rgba(0,0,0,0.08)",
                 ] : [
                   `0 0 20px ${theme.textAccent}80`,
                   `0 0 40px ${theme.statusInterview}80`,
                   `0 0 20px ${theme.statusOffer}80`,
                   `0 0 20px ${theme.textAccent}80`,
                 ],
               }}
               transition={{
                 duration: 12,
                 repeat: Number.POSITIVE_INFINITY,
                 ease: "easeInOut",
               }}
               whileHover={{
                 scale: 1.02,
                 transition: { duration: 0.3 },
               }}
             >
               CareerSync
             </m.h1>
   
             {/* Dynamic subheading with typing effect */}
             <m.p
               variants={itemVariants}
               className={`text-sm sm:text-base md:text-2xl ${theme.textSecondary} max-w-xl md:max-w-4xl mx-auto mb-8 md:mb-16 leading-relaxed font-light`}
               animate={{
                 opacity: [0.7, 1, 0.7],
               }}
               transition={{
                 duration: 4,
                 repeat: Number.POSITIVE_INFINITY,
                 ease: "easeInOut",
               }}
             >
               <motion.span className="text-sm sm:text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light px-4"
                 style={{ color: theme.textSecondary }}
                 animate={{
                   opacity: [0.6, 1, 0.6],
                 }}>
                 Sync your career trajectory with
                 <motion.span
                   className="font-semibold mx-2"
                   animate={{
                     color: theme.theme === 'light'
                       ? ["#4f46e5", "#f59e0b", "#10b981", "#4f46e5"]
                       : [theme.textAccent, theme.statusInterview, theme.statusOffer, theme.textAccent],
                   }}
                   transition={{
                     duration: 6,
                     repeat: Number.POSITIVE_INFINITY,
                     ease: "easeInOut",
                   }}
                 >
                   intelligent networking
                 </motion.span>
                 and quantum-powered insights.
               </motion.span>
             </m.p>
   
             {/* Innovative CTA buttons with morphing effects */}
             <m.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-8">
               <m.button
                 onClick={() => user ? window.location.href = '/dashboard' : window.location.href = '/login'}
                 whileHover={{
                   scale: 1.05,
                   boxShadow: theme.theme === 'light'
                     ? "0 8px 30px rgba(37,99,235,0.08)"
                     : `0 0 40px ${theme.statusInterview}99`,
                 }}
                 whileTap={{ scale: 0.95 }}
                 className={`group relative px-6 py-3 sm:px-12 sm:py-6 font-bold text-lg sm:text-xl rounded-2xl overflow-hidden ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                 style={{
                   background: theme.theme === 'light'
                     ? "linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)"
                     : `linear-gradient(135deg, ${theme.statusInterview} 0%, ${theme.statusOffer} 100%)`,
                   boxShadow: theme.theme === 'light'
                     ? "0 6px 16px rgba(15,23,42,0.06)"
                     : `0 0 20px ${theme.statusInterview}80`,
                 }}
               >
                 <m.div
                   className="absolute inset-0 opacity-0 group-hover:opacity-100"
                   animate={{
                     opacity: [0, 0.3, 0.1, 0.3, 0],
                   }}
                   transition={{
                     duration: 3,
                     repeat: Number.POSITIVE_INFINITY,
                     ease: "easeInOut",
                   }}
                   style={{
                     background: theme.theme === 'light'
                       ? "linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(245, 158, 11, 0.2))"
                       : `linear-gradient(45deg, ${theme.textAccent}33, ${theme.statusInterview}33)`,
                   }}
                 />
                 {/* Floating particles */}
                 <div className="absolute inset-0 overflow-hidden rounded-2xl">
                   {[...Array(isLight ? 3 : 5)].map((_, i) => (
                     <m.div
                       key={i}
                       className={`absolute ${isLight ? 'w-1 h-1' : 'w-1 h-1'} rounded-full`}
                       animate={{
                         y: [0, -20, 0],
                         x: [0, Math.sin(i) * 15, 0],
                         scale: [0, 1, 0],
                       }}
                       transition={{
                         duration: 2,
                         repeat: Number.POSITIVE_INFINITY,
                         delay: i * 0.2,
                       }}
                       style={{
                         left: `${20 + i * 18}%`,
                         top: `${60}%`,
                         background: isLight ? 'rgba(37,99,235,0.12)' : 'rgba(255,255,255,0.6)'
                       }}
                     />
                   ))}
                 </div>
                 <span className="relative z-10" style={{ color: '#ffffff' }}>Start Your Journey</span>
               </m.button>
               <m.a
                 href="#features"
                 whileHover={{
                   scale: 1.05,
                   backgroundColor: theme.theme === 'light'
                     ? "rgba(99, 102, 241, 0.08)"
                     : `${theme.textAccent}1a`,
                 }}
                 whileTap={{ scale: 0.95 }}
                 className={`group relative px-6 py-3 sm:px-12 sm:py-6 font-bold text-lg sm:text-xl rounded-2xl border-2 transition-all duration-300 overflow-hidden ${theme.theme === 'light' ? 'text-gray-900' : 'text-white'}`}
                 style={{
                   borderColor: theme.textAccent,
                 }}
               >
                 {/* Liquid border effect */}
                 <m.div
                   className="absolute inset-0 rounded-2xl border-2 border-transparent"
                   animate={{
                     borderImage: theme.theme === 'light' ? [
                       "linear-gradient(45deg, #4f46e5, #f59e0b) 1",
                       "linear-gradient(135deg, #f59e0b, #10b981) 1",
                       "linear-gradient(225deg, #10b981, #4f46e5) 1",
                       "linear-gradient(45deg, #4f46e5, #f59e0b) 1",
                     ] : [
                       `linear-gradient(45deg, ${theme.textAccent}, ${theme.statusInterview}) 1`,
                       `linear-gradient(135deg, ${theme.statusInterview}, ${theme.statusOffer}) 1`,
                       `linear-gradient(225deg, ${theme.statusOffer}, ${theme.textAccent}) 1`,
                       `linear-gradient(45deg, ${theme.textAccent}, ${theme.statusInterview}) 1`,
                     ],
                   }}
                   transition={{
                     duration: 4,
                     repeat: Number.POSITIVE_INFINITY,
                     ease: "easeInOut",
                   }}
                   style={{
                     borderImageSlice: 1,
                   }}
                 />
                 <span className="relative z-10">Explore Features</span>
               </m.a>
             </m.div>
   
             {/* Interactive floating stat with morphing effects */}
             <m.div
               variants={itemVariants}
               className="mt-12 md:mt-24 flex justify-center"
             >
               <m.div
                 className="group relative flex items-center gap-6 px-4 py-4 sm:px-10 sm:py-6 rounded-3xl backdrop-blur-xl overflow-hidden cursor-pointer"
                 style={{
                   background: theme.theme === 'light'
                     ? 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(249, 250, 251, 0.8))'
                     : 'linear-gradient(to right, rgba(26, 58, 82, 0.8), rgba(15, 37, 64, 0.8))',
                   borderColor: theme.borderMedium,
                   borderWidth: '1px',
                   borderStyle: 'solid',
                   transformStyle: "preserve-3d",
                 }}
                 whileHover={{
                   scale: 1.05,
                   rotateY: 5,
                   z: 20,
                 }}
                 transition={{
                   type: "spring",
                   stiffness: 300,
                   damping: 20,
                 }}
               >
                 {/* Morphing background */}
                 <m.div
                   className="absolute inset-0 rounded-3xl opacity-30"
                   animate={{
                     scale: [1, 1.05, 0.95, 1],
                     opacity: [0.3, 0.4, 0.2, 0.3],
                   }}
                   transition={{
                     duration: 6,
                     repeat: Number.POSITIVE_INFINITY,
                     ease: "easeInOut",
                   }}
                   style={{
                     background: theme.theme === 'light'
                       ? "linear-gradient(45deg, rgba(99, 102, 241, 0.15), rgba(245, 158, 11, 0.15))"
                       : `linear-gradient(45deg, ${theme.textAccent}26, ${theme.statusInterview}26)`,
                   }}
                 />
   
                 {/* Floating particles */}
                 <div className="absolute inset-0 overflow-hidden rounded-3xl">
                   {[...Array(8)].map((_, i) => (
                     <m.div
                       key={i}
                       className="absolute w-1 h-1 rounded-full opacity-70"
                       animate={{
                         y: [0, -25, 0],
                         x: [0, Math.cos(i) * 20, 0],
                         scale: [0, 1.5, 0],
                         opacity: [0, 0.8, 0],
                       }}
                       transition={{
                         duration: 3,
                         repeat: Number.POSITIVE_INFINITY,
                         delay: i * 0.3,
                       }}
                       style={{
                         left: `${15 + i * 10}%`,
                         top: `${40}%`,
                        backgroundColor: i % 2 === 0
                          ? (theme.theme === 'light' ? '#4f46e5' : theme.textAccent)
                          : (theme.theme === 'light' ? '#f59e0b' : theme.statusInterview),
                       }}
                     />
                   ))}
                 </div>
   
                 <div className="flex items-center gap-4 relative z-10">
                   <m.div
                     className="w-4 h-4 rounded-full shadow-lg"
                     animate={{
                       scale: [1, 1.15, 1],
                       boxShadow: theme.theme === 'light' ? [
                         "0 6px 14px rgba(15,23,42,0.06)",
                         "0 8px 20px rgba(15,23,42,0.06)",
                         "0 6px 14px rgba(15,23,42,0.06)",
                       ] : [
                         `0 0 10px ${theme.textAccent}80`,
                         `0 0 20px ${theme.textAccent}cc`,
                         `0 0 10px ${theme.textAccent}80`,
                       ],
                     }}
                     style={{
                       backgroundColor: theme.textAccent
                     }}
                     transition={{
                       duration: 2,
                       repeat: Number.POSITIVE_INFINITY,
                       ease: "easeInOut",
                     }}
                   />
                   <span className="font-bold text-lg bottom-5" style={{ color: theme.textPrimary }}>15,000+ Professionals Connected</span>
                   <m.div
                     className="w-3 h-3 rounded-full shadow-lg"
                     animate={{
                       scale: [1, 1.2, 1],
                       opacity: [0.7, 1, 0.7],
                     }}
                     transition={{
                       duration: 1.5,
                       repeat: Number.POSITIVE_INFINITY,
                       ease: "easeInOut",
                       delay: 0.5,
                     }}
                     style={{
                       backgroundColor: theme.statusInterview,
                      boxShadow: theme.theme === 'light'
                        ? '0 6px 12px rgba(245, 158, 11, 0.08)'
                        : `0 0 15px ${theme.statusInterview}80`
                     }}
                   />
                 </div>
               </m.div>
             </m.div>
           </m.div>
   
           {/* Minimal scroll indicator */}
           <m.div
             className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
             animate={{
               y: [0, 10, 0],
             }}
             transition={{
               duration: 2,
               repeat: Number.POSITIVE_INFINITY,
               ease: "easeInOut",
             }}
           >
             <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: theme.borderMedium }}>
               <div className="w-1 h-3 rounded-full mt-2 animate-pulse" style={{ backgroundColor: theme.textAccent }}></div>
             </div>
           </m.div>
         </section>
  )
}