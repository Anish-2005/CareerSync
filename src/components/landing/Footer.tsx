"use client"

import React from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

export default function Footer() {
  const theme = useThemeClasses()
  const isLight = theme.theme === 'light'

  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Mobile App", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
    social: [
      { name: "GitHub", icon: Github, href: "https://github.com" },
      { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
      { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
      { name: "Email", icon: Mail, href: "mailto:hello@careersync.com" },
    ]
  }

  return (
    <footer className="relative overflow-hidden"
      style={{ background: theme.theme === 'light' ? 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' : 'linear-gradient(to bottom, #0a1428, #0f172a)' }}>
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: theme.theme === 'light' ? `
              linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
            ` : `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating particles */}
        {[...Array(isLight ? 8 : 12)].map((_, i) => (
          <m.div
            key={i}
            className="absolute rounded-full opacity-20"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i * 0.6) * 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 7 + i * 0.4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + i * 5}%`,
              width: `${6 + i * 1}px`,
              height: `${6 + i * 1}px`,
              background: i % 4 === 0 ? "#00d4ff" : i % 4 === 1 ? "#ff6b00" : i % 4 === 2 ? "#00ff88" : "#ff8c00",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <m.h3
                  className="text-3xl font-black mb-4"
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
                  CareerSync
                </m.h3>
                <p
                  className="text-base mb-6 max-w-md"
                  style={{ color: theme.textSecondary }}
                >
                  Transform your career journey with intelligent synchronization,
                  real-time insights, and comprehensive tracking tools designed for modern professionals.
                </p>

                {/* Newsletter signup */}
                <div className="mb-6">
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: theme.theme === 'light' ? '#374151' : '#d1d5db' }}
                  >
                    Stay updated with career tips and platform updates
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] transition-all"
                      style={{
                        background: theme.theme === 'light' ? '#ffffff' : '#1e293b',
                        borderColor: theme.borderMedium,
                        color: theme.theme === 'light' ? '#1e293b' : '#ffffff',
                      }}
                    />
                    <m.button
                      className="px-6 py-2 bg-[#00d4ff] text-white rounded-lg font-medium text-sm hover:bg-[#00d4ff]/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe
                    </m.button>
                  </div>
                </div>
              </m.div>
            </div>

            {/* Links sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              category !== 'social' && (
                <m.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h4
                    className="text-lg font-bold capitalize"
                    style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                  >
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm hover:text-[#00d4ff] transition-colors"
                          style={{ color: theme.textSecondary }}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </m.div>
              )
            ))}
          </div>

          {/* Social links */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6 mt-12"
          >
            {footerLinks.social.map((social, index) => {
              const Icon = social.icon
              return (
                <m.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full flex items-center justify-center border-2 hover:border-[#00d4ff] transition-all duration-300 group"
                  style={{
                    background: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 61, 83, 0.5)',
                    borderColor: theme.borderMedium,
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className="w-5 h-5 group-hover:text-[#00d4ff] transition-colors"
                    style={{ color: theme.textSecondary }}
                  />
                </m.a>
              )
            })}
          </m.div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t"
          style={{ borderColor: theme.borderMedium }}
        >
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm" style={{ color: theme.textSecondary }}>
                <span>© {currentYear} CareerSync. Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>for career success.</span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <a
                  href="#"
                  className="hover:text-[#00d4ff] transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="hover:text-[#00d4ff] transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="hover:text-[#00d4ff] transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}