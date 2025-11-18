"use client"

import { motion } from "framer-motion"
import {
  Target,
  BarChart3,
  Clock,
  Users,
  Shield,
  Zap,
} from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

export default function FeaturesSection() {
  const theme = useThemeClasses()

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

  return (
    <section id="features" className="relative py-12 md:py-24 px-4 md:px-6 overflow-hidden scroll-mt-24"
      style={{ background: theme.theme === 'light' ? 'linear-gradient(to bottom, #f0f4f8, #e1e8ed)' : 'linear-gradient(to bottom, #0a1428, #1a2d4d)' }}>
      {/* Dynamic fluid background */}
      <div className="absolute inset-0 hidden md:block">
        {/* Organic flowing shapes */}
        {[...Array(theme.theme === 'light' ? 10 : 20)].map((_, i) => (
          <m.div
            key={i}
            className="absolute opacity-10"
            animate={{
              x: [0, Math.sin(i * 0.7) * 200, 0],
              y: [0, Math.cos(i * 0.9) * 150, 0],
              scale: [1, 1.8, 0.6, 1],
              borderRadius: ["50% 30% 70% 20%", "30% 70% 20% 50%", "70% 20% 50% 30%", "50% 30% 70% 20%"],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            style={{
              width: `${60 + i * 15}px`,
              height: `${60 + i * 15}px`,
              left: `${(i * 6.5) % 90}%`,
              top: `${(i * 8.3) % 80}%`,
              background: i % 4 === 0
                ? "linear-gradient(45deg, rgba(0, 212, 255, 0.4), rgba(255, 107, 0, 0.4))"
                : i % 4 === 1
                  ? "linear-gradient(135deg, rgba(255, 107, 0, 0.4), rgba(0, 255, 136, 0.4))"
                  : i % 4 === 2
                    ? "linear-gradient(225deg, rgba(0, 255, 136, 0.4), rgba(0, 212, 255, 0.4))"
                    : "linear-gradient(315deg, rgba(255, 140, 0, 0.4), rgba(0, 212, 255, 0.4))",
              filter: theme.theme === 'light' ? "blur(10px)" : "blur(20px)",
            }}
          />
        ))}

        {/* Fluid wave patterns */}
        <m.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage: theme.theme === 'light' ? `
              radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)
            ` : `
              radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 107, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
            `,
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-20"
        >
          {/* Fluid section title */}
          <m.h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-none"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              textShadow: theme.theme === 'light' ? [
                "0 1px 2px rgba(0,0,0,0.06)",
                "0 2px 6px rgba(0,0,0,0.08)",
                "0 1px 2px rgba(0,0,0,0.06)",
              ] : [
                "0 0 30px rgba(0, 212, 255, 0.5)",
                "0 0 50px rgba(255, 107, 0, 0.5)",
                "0 0 30px rgba(0, 255, 136, 0.5)",
                "0 0 30px rgba(0, 212, 255, 0.5)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
                backgroundImage: theme.theme === 'light'
                  ? "linear-gradient(135deg, #1e293b 0%, #4f46e5 30%, #f59e0b 60%, #10b981 90%, #1e293b 100%)"
                  : `linear-gradient(135deg, #ffffff 0%, ${theme.textAccent} 30%, ${theme.statusInterview} 60%, ${theme.statusOffer} 90%, #ffffff 100%)`,
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Sync Features
          </m.h2>
          <m.p
            className="text-sm sm:text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light px-4"
            style={{ color: theme.textSecondary }}
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Experience the future of career management with
            <m.span
              className="font-semibold mx-2"
              animate={{
                  color: theme.theme === 'light'
                    ? ["#4f46e5", "#f59e0b", "#10b981", "#4f46e5"]
                    : [theme.textAccent, theme.statusInterview, theme.statusOffer, theme.textAccent],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              intelligent synchronization
            </m.span>
            and quantum insights.
          </m.p>
        </m.div>

        {/* Fluid dynamic grid */}
        <m.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Target,
              title: "Smart Targeting",
              description: "AI-powered opportunity matching with predictive career trajectory analysis and intelligent connection recommendations.",
              color: theme.theme === 'light' ? "from-[#4f46e5] to-[#6366f1]" : "from-[#00d4ff] to-[#0088cc]",
              shadowColor: theme.theme === 'light' ? "rgba(99, 102, 241, 0.3)" : "rgba(0, 212, 255, 0.4)",
              gradient: theme.theme === 'light' ? "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(245, 158, 11, 0.08))" : "linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
              size: "large",
            },
            {
              icon: BarChart3,
              title: "Sync Analytics",
              description: "Real-time career performance metrics with advanced data visualization and trend analysis for optimal decision making.",
              color: theme.theme === 'light' ? "from-[#f59e0b] to-[#fb923c]" : "from-[#ff6b00] to-[#ff8c00]",
              shadowColor: theme.theme === 'light' ? "rgba(245, 158, 11, 0.3)" : "rgba(255, 107, 0, 0.4)",
              gradient: theme.theme === 'light' ? "linear-gradient(225deg, rgba(245, 158, 11, 0.08), rgba(16, 185, 129, 0.08))" : "linear-gradient(225deg, rgba(255, 107, 0, 0.1), rgba(0, 255, 136, 0.1))",
              size: "medium",
            },
            {
              icon: Clock,
              title: "Time Sync",
              description: "Intelligent scheduling with automated deadline tracking, priority management, and productivity optimization.",
              color: theme.theme === 'light' ? "from-[#4f46e5] to-[#f59e0b]" : "from-[#00d4ff] to-[#ff6b00]",
              shadowColor: theme.theme === 'light' ? "rgba(99, 102, 241, 0.3)" : "rgba(0, 212, 255, 0.4)",
              gradient: theme.theme === 'light' ? "linear-gradient(315deg, rgba(99, 102, 241, 0.08), rgba(245, 158, 11, 0.08))" : "linear-gradient(315deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 0, 0.1))",
              size: "large",
            },
            {
              icon: Users,
              title: "Network Sync",
              description: "Seamless professional networking with automated introductions, relationship management, and opportunity alerts.",
              color: theme.theme === 'light' ? "from-[#10b981] to-[#4f46e5]" : "from-[#00ff88] to-[#00d4ff]",
              shadowColor: theme.theme === 'light' ? "rgba(16, 185, 129, 0.3)" : "rgba(0, 255, 136, 0.4)",
              gradient: theme.theme === 'light' ? "linear-gradient(45deg, rgba(16, 185, 129, 0.08), rgba(99, 102, 241, 0.08))" : "linear-gradient(45deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1))",
              size: "medium",
            },
            {
              icon: Shield,
              title: "Secure Sync",
              description: "Enterprise-grade data protection with end-to-end encryption, privacy controls, and secure career data management.",
              color: theme.theme === 'light' ? "from-[#fb923c] to-[#10b981]" : "from-[#ff8c00] to-[#00ff88]",
              shadowColor: theme.theme === 'light' ? "rgba(251, 146, 60, 0.3)" : "rgba(255, 140, 0, 0.4)",
              gradient: theme.theme === 'light' ? "linear-gradient(135deg, rgba(251, 146, 60, 0.08), rgba(16, 185, 129, 0.08))" : "linear-gradient(135deg, rgba(255, 140, 0, 0.1), rgba(0, 255, 136, 0.1))",
              size: "large",
            },
            {
              icon: Zap,
              title: "AI Sync",
              description: "Next-generation AI assistance with personalized career coaching, opportunity prediction, and intelligent recommendations.",
              color: theme.theme === 'light' ? "from-[#4f46e5] to-[#10b981]" : "from-[#00d4ff] to-[#00ff88]",
              shadowColor: theme.theme === 'light' ? "rgba(99, 102, 241, 0.3)" : "rgba(0, 212, 255, 0.4)",
              gradient: theme.theme === 'light' ? "linear-gradient(225deg, rgba(99, 102, 241, 0.08), rgba(16, 185, 129, 0.08))" : "linear-gradient(225deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1))",
              size: "medium",
            },
          ].map((feature, index) => (
            <m.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: feature.size === 'large' ? 1.08 : 1.05,
                rotateY: feature.size === 'large' ? 8 : 5,
                z: 60,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className={`group relative overflow-hidden rounded-2xl md:rounded-3xl backdrop-blur-xl transition-all duration-700 cursor-pointer ${feature.size === 'large'
                  ? 'md:col-span-2 lg:col-span-1 p-6 md:p-10'
                  : 'p-5 md:p-8'
                }`}
              style={{
                background: theme.theme === 'light'
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(249, 250, 251, 0.9))"
                  : "linear-gradient(135deg, rgba(26, 58, 82, 0.8), rgba(15, 37, 64, 0.8))",
                border: `1px solid ${theme.borderLight}`,
                transformStyle: "preserve-3d",
                perspective: "1000px",
                gridRow: feature.size === 'large' && index % 3 === 1 ? 'span 2' : 'span 1',
              }}
            >
              {/* Morphing background gradient */}
              <m.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                animate={{
                  scale: [1, 1.02, 0.98, 1],
                  opacity: [0, 0.1, 0.05, 0.1, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  background: feature.gradient,
                }}
              />

              {/* Fluid particle system */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl hidden md:block">
                {[...Array(theme.theme === 'light' ? (feature.size === 'large' ? 6 : 4) : (feature.size === 'large' ? 12 : 8))].map((_, i) => (
                  <m.div
                    key={i}
                    className={`absolute ${theme.theme === 'light' ? 'w-1 h-1' : 'w-1 h-1'} rounded-full opacity-70`}
                    animate={{
                      y: [0, -40, 0],
                      x: [0, Math.sin(i * 1.2) * (theme.theme === 'light' ? (feature.size === 'large' ? 20 : 12) : (feature.size === 'large' ? 30 : 20)), 0],
                      scale: [0, 1.5, 0],
                      opacity: theme.theme === 'light' ? [0, 0.5, 0] : [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 4 + i * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    style={{
                      left: `${15 + i * (feature.size === 'large' ? 7 : 10)}%`,
                      top: `${25 + i * 8}%`,
                      background: `linear-gradient(45deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`,
                    }}
                  />
                ))}
              </div>

              {/* Fluid icon container */}
              <m.div
                className={`relative rounded-2xl flex items-center justify-center mb-4 md:mb-8 group-hover:scale-110 transition-transform duration-500 ${feature.size === 'large' ? 'w-14 h-14 md:w-20 md:h-20' : 'w-12 h-12 md:w-16 md:h-16'
                  }`}
                style={{
                  background: `linear-gradient(135deg, ${feature.color})`,
                  boxShadow: `0 0 30px ${feature.shadowColor}`,
                  transform: "translateZ(25px)",
                }}
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  scale: feature.size === 'large' ? 1.15 : 1.12,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                {/* Icon glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-50 blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color})`,
                  }}
                />
                <feature.icon
                  className={`relative z-10 ${feature.size === 'large' ? 'w-10 h-10' : 'w-8 h-8'
                    }`}
                  style={{
                    color: theme.theme === 'light' ? '#1e293b' : '#ffffff',
                  }}
                />
              </m.div>

              {/* Fluid content */}
              <div style={{ transform: "translateZ(15px)" }}>
                <m.h3
                  className={`font-bold mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500 ${feature.size === 'large' ? 'text-lg md:text-2xl' : 'text-base md:text-xl'
                    }`}
                  style={{
                    color: theme.textPrimary,
                    backgroundImage: `linear-gradient(135deg, #${feature.color.split('from-[')[1].split(']')[0]}, #${feature.color.split('to-[')[1].split(']')[0]})`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  {feature.title}
                </m.h3>
                <p className={`leading-relaxed transition-colors duration-300 ${feature.size === 'large' ? 'text-sm md:text-base' : 'text-xs md:text-sm'
                  }`}
                  style={{ color: theme.textSecondary }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Interactive hover indicator */}
              <m.div
                className="absolute bottom-6 right-6 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${feature.color})`,
                  boxShadow: `0 0 15px ${feature.shadowColor}`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}