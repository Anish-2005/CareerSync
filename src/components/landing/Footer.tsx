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
    <footer className="relative overflow-hidden" aria-labelledby="footer-heading"
      style={{ background: theme.theme === 'light' ? 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' : 'linear-gradient(to bottom, #0a1428, #0f172a)' }}>
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Background effects - hidden on small screens for performance */}
      <div className="absolute inset-0 pointer-events-none sm:block">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: theme.theme === 'light' ? `
              linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
            ` : `
              linear-gradient(rgba(0, 212, 255, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating particles - reduced and only visible on md+ */}
        <div className="hidden md:block">
          {[...Array(isLight ? 6 : 8)].map((_, i) => (
            <m.div
              key={i}
              className="absolute rounded-full opacity-20"
              animate={{
                y: [0, -20 - (i % 4) * 4, 0],
                x: [0, Math.sin(i * 0.6) * 12, 0],
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 6 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.15,
              }}
              style={{
                left: `${8 + i * 9}%`,
                top: `${18 + (i % 4) * 6}%`,
                width: `${6 + (i % 4) * 2}px`,
                height: `${6 + (i % 4) * 2}px`,
                background: i % 4 === 0 ? theme.textAccent : i % 4 === 1 ? theme.statusInterview : i % 4 === 2 ? theme.statusOffer : theme.statusApplied,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand / newsletter section */}
            <div className="lg:col-span-2">
              <m.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <m.h3
                  className="text-2xl sm:text-3xl font-black mb-3"
                  animate={{}}
                  style={{
                    color: theme.theme === 'light' ? '#000000' : undefined,
                    backgroundImage: theme.theme === 'light' ? undefined : `linear-gradient(135deg, #ffffff 0%, ${theme.textAccent} 40%, ${theme.statusInterview} 70%, ${theme.statusOffer} 100%)`,
                    backgroundSize: theme.theme === 'light' ? undefined : "300% 300%",
                    WebkitBackgroundClip: theme.theme === 'light' ? undefined : "text",
                    WebkitTextFillColor: theme.theme === 'light' ? undefined : "transparent",
                    backgroundClip: theme.theme === 'light' ? undefined : "text",
                  }}
                >
                  CareerSync
                </m.h3>
                <p
                  className="text-sm sm:text-base mb-5 max-w-md"
                  style={{ color: theme.textSecondary }}
                >
                  Transform your career journey with intelligent synchronization,
                  real-time insights, and comprehensive tracking tools designed for modern professionals.
                </p>

                {/* Newsletter signup - stacks on small screens */}
                <div className="mb-6">
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: theme.theme === 'light' ? '#374151' : '#d1d5db' }}
                  >
                    Stay updated with career tips and platform updates
                  </p>

                  <form className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                    <input
                      type="email"
                      aria-label="Email address"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all"
                      style={{
                        background: theme.theme === 'light' ? '#ffffff' : '#0f1724',
                        borderColor: theme.borderMedium,
                        color: theme.theme === 'light' ? '#1e293b' : '#ffffff',
                        '--tw-ring-color': theme.textAccent,
                      } as React.CSSProperties}
                    />

                    <m.button
                      type="submit"
                      className="px-6 py-2 text-white rounded-lg font-medium text-sm w-full sm:w-auto"
                      style={{
                        background: theme.textAccent,
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Subscribe
                    </m.button>
                  </form>
                </div>
              </m.div>
            </div>

            {/* Links sections - will wrap nicely on small screens */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              category !== 'social' && (
                <m.div
                  key={category}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.06 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h4
                    className="text-md sm:text-lg font-semibold capitalize"
                    style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                  >
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm block transition-colors"
                          style={{
                            color: theme.textSecondary,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = theme.textAccent)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
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

          {/* Social links - responsive placement */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            viewport={{ once: true }}
            className="flex justify-center sm:justify-start gap-4 mt-8 sm:mt-12 flex-wrap"
          >
            {footerLinks.social.map((social, index) => {
              const Icon = social.icon
              return (
                <m.a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 group"
                  style={{
                    background: theme.theme === 'light' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(26, 61, 83, 0.5)',
                    borderColor: theme.borderMedium,
                  }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${theme.textAccent}4d` }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-colors"
                    style={{
                      color: theme.textSecondary,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = theme.textAccent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
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
              <div className="flex items-center gap-2 text-sm text-center md:text-left" style={{ color: theme.textSecondary }}>
                <span>© {currentYear} CareerSync. Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>for career success.</span>
              </div>

              <div className="flex items-center gap-6 text-sm flex-wrap justify-center md:justify-end">
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: theme.textSecondary }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = theme.textAccent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: theme.textSecondary }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = theme.textAccent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="transition-colors"
                  style={{ color: theme.textSecondary }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = theme.textAccent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = theme.textSecondary)}
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
