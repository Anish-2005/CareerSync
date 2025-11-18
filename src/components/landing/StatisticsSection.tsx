"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Target, Award } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

export default function StatisticsSection() {
  const theme = useThemeClasses()
  const isLight = theme.theme === 'light'

  // Animated counters
  const [counters, setCounters] = useState({
    users: 0,
    applications: 0,
    success: 0,
    companies: 0
  })

  const targetCounters = {
    users: 50000,
    applications: 250000,
    success: 94,
    companies: 1200
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        users: Math.min(prev.users + Math.floor(targetCounters.users / 100), targetCounters.users),
        applications: Math.min(prev.applications + Math.floor(targetCounters.applications / 100), targetCounters.applications),
        success: Math.min(prev.success + 1, targetCounters.success),
        companies: Math.min(prev.companies + Math.floor(targetCounters.companies / 100), targetCounters.companies)
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      icon: Users,
      value: counters.users.toLocaleString(),
      label: "Active Users",
      suffix: "+",
      color: "#00d4ff",
      description: "Professionals managing their careers"
    },
    {
      icon: Target,
      value: counters.applications.toLocaleString(),
      label: "Applications Tracked",
      suffix: "+",
      color: "#ff6b00",
      description: "Job applications synchronized"
    },
    {
      icon: TrendingUp,
      value: counters.success,
      label: "Success Rate",
      suffix: "%",
      color: "#00ff88",
      description: "Interview conversion rate"
    },
    {
      icon: Award,
      value: counters.companies.toLocaleString(),
      label: "Companies",
      suffix: "+",
      color: "#ff8c00",
      description: "Top companies in our network"
    }
  ]

  return (
    <section className="relative py-20 px-6 overflow-hidden"
      style={{ background: theme.theme === 'light' ? 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' : 'linear-gradient(to bottom, #0f172a, #1e293b)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        {[...Array(isLight ? 8 : 15)].map((_, i) => (
          <m.div
            key={i}
            className="absolute rounded-full opacity-20"
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i * 0.5) * 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            style={{
              left: `${10 + i * 8}%`,
              top: `${20 + i * 6}%`,
              width: `${20 + i * 5}px`,
              height: `${20 + i * 5}px`,
              background: i % 4 === 0 ? "#00d4ff" : i % 4 === 1 ? "#ff6b00" : i % 4 === 2 ? "#00ff88" : "#ff8c00",
            }}
          />
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: theme.theme === 'light' ? `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            ` : `
              linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <m.h2
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
            animate={{
              textShadow: theme.theme === 'light' ? [
                "0 1px 2px rgba(0,0,0,0.08)",
                "0 2px 4px rgba(0,0,0,0.10)",
                "0 1px 2px rgba(0,0,0,0.08)",
              ] : [
                "0 0 20px rgba(0, 212, 255, 0.6)",
                "0 0 40px rgba(255, 107, 0, 0.6)",
                "0 0 20px rgba(0, 255, 136, 0.6)",
                "0 0 20px rgba(0, 212, 255, 0.6)",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              color: theme.theme === 'light' ? '#000000' : undefined,
              backgroundImage: theme.theme === 'light'
                ? undefined
                : "linear-gradient(135deg, #ffffff 0%, #00d4ff 40%, #ff6b00 70%, #00ff88 100%)",
              backgroundSize: theme.theme === 'light' ? undefined : "300% 300%",
              WebkitBackgroundClip: theme.theme === 'light' ? undefined : "text",
              WebkitTextFillColor: theme.theme === 'light' ? undefined : "transparent",
              backgroundClip: theme.theme === 'light' ? undefined : "text",
            }}
          >
            Powering Career Success
          </m.h2>
          <m.p
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
            style={{ color: theme.textSecondary }}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Join thousands of professionals who have transformed their career trajectories with our
            <m.span
              className="text-[#00d4ff] font-semibold mx-2"
              animate={{
                color: ["#00d4ff", "#ff6b00", "#00ff88", "#00d4ff"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              intelligent platform
            </m.span>
          </m.p>
        </m.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group relative"
              >
                <m.div
                  className="relative p-8 rounded-3xl border-2 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:scale-105"
                  style={{
                    background: theme.theme === 'light'
                      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))"
                      : "linear-gradient(135deg, rgba(10, 20, 40, 0.95), rgba(26, 61, 83, 0.95))",
                    borderColor: theme.borderMedium,
                    boxShadow: theme.theme === 'light'
                      ? `0 0 30px rgba(99, 102, 241, 0.15)`
                      : `0 0 30px rgba(0, 212, 255, 0.2)`,
                  }}
                  whileHover={{
                    boxShadow: theme.theme === 'light'
                      ? "0 0 60px rgba(99, 102, 241, 0.25)"
                      : "0 0 60px rgba(0, 212, 255, 0.3)",
                  }}
                >
                  {/* Animated border */}
                  <m.div
                    className="absolute inset-0 rounded-3xl border border-transparent"
                    animate={{
                      borderImage: [
                        `linear-gradient(45deg, ${stat.color}40, rgba(255, 107, 0, 0.4), rgba(0, 255, 136, 0.4), ${stat.color}40) 1`,
                        `linear-gradient(135deg, rgba(255, 107, 0, 0.4), rgba(0, 255, 136, 0.4), ${stat.color}40, rgba(255, 107, 0, 0.4)) 1`,
                        `linear-gradient(225deg, rgba(0, 255, 136, 0.4), ${stat.color}40, rgba(255, 107, 0, 0.4), rgba(0, 255, 136, 0.4)) 1`,
                        `linear-gradient(315deg, ${stat.color}40, rgba(255, 107, 0, 0.4), rgba(0, 255, 136, 0.4), ${stat.color}40) 1`,
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{
                      borderImageSlice: 1,
                    }}
                  />

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {[...Array(isLight ? 5 : 8)].map((_, i) => (
                      <m.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full opacity-40"
                        animate={{
                          y: [0, -20, 0],
                          x: [0, Math.sin(i * 0.8) * 15, 0],
                          scale: [0, 1.2, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 4 + i * 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.1,
                        }}
                        style={{
                          left: `${15 + i * 8}%`,
                          top: `${25 + i * 6}%`,
                          background: stat.color,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <m.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        border: `1px solid ${stat.color}30`,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: stat.color }}
                      />
                    </m.div>

                    {/* Value */}
                    <m.div
                      className="mb-3"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <span
                        className="text-4xl md:text-5xl font-black"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                        <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                      </span>
                    </m.div>

                    {/* Label */}
                    <h3
                      className="text-lg md:text-xl font-bold mb-2"
                      style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                    >
                      {stat.label}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm md:text-base font-light"
                      style={{ color: theme.textSecondary }}
                    >
                      {stat.description}
                    </p>
                  </div>
                </m.div>
              </m.div>
            )
          })}
        </div>

        {/* Call to action */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <m.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: theme.textSecondary }}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Ready to join the ranks of successful professionals?
          </m.p>
          <m.button
            className="px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#ff6b00] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(0, 212, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            Start Your Journey Today
          </m.button>
        </m.div>
      </div>
    </section>
  )
}