"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Check, Star, Zap, Crown } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

export default function PricingSection() {
  const theme = useThemeClasses()
  const isLight = theme.theme === 'light'
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: "Starter",
      icon: Star,
      price: billingCycle === 'monthly' ? 0 : 0,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: "Perfect for getting started",
      features: [
        "Up to 50 applications",
        "Basic analytics",
        "Email support",
        "Mobile app access"
      ],
      popular: false,
      color: theme.textSecondary
    },
    {
      name: "Professional",
      icon: Zap,
      price: billingCycle === 'monthly' ? 29 : 290,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: "For serious job seekers",
      features: [
        "Unlimited applications",
        "Advanced analytics",
        "Priority support",
        "Interview tracking",
        "Resume optimization",
        "Company insights"
      ],
      popular: true,
      color: theme.textAccent
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: billingCycle === 'monthly' ? 99 : 990,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: "For teams and organizations",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Custom integrations",
        "Dedicated support",
        "Advanced reporting",
        "White-label options"
      ],
      popular: false,
      color: theme.statusApplied
    }
  ]

  return (
    <section className="relative py-20 px-6 overflow-hidden"
      style={{ background: theme.theme === 'light' ? 'linear-gradient(to bottom, #ffffff, #f1f5f9)' : 'linear-gradient(to bottom, #0a1428, #0f172a)' }}>
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Geometric patterns */}
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
          <div className="w-full h-full border-2 rounded-full" style={{ borderColor: theme.textAccent }}></div>
          <div className="absolute top-4 left-4 w-24 h-24 border-2 rounded-full" style={{ borderColor: theme.statusInterview }}></div>
          <div className="absolute top-8 left-8 w-16 h-16 border-2 rounded-full" style={{ borderColor: theme.statusOffer }}></div>
        </div>

        <div className="absolute bottom-20 right-10 w-40 h-40 opacity-10">
          <div className="w-full h-full border-2 transform rotate-45" style={{ borderColor: theme.statusApplied }}></div>
          <div className="absolute top-6 left-6 w-28 h-28 border-2 transform rotate-45" style={{ borderColor: theme.textAccent }}></div>
        </div>

        {/* Floating particles */}
        {[...Array(isLight ? 12 : 20)].map((_, i) => (
          <m.div
            key={i}
            className="absolute rounded-full opacity-20"
            animate={{
              y: [0, -40, 0],
              x: [0, Math.sin(i * 0.7) * 25, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.2,
            }}
            style={{
              left: `${15 + i * 6}%`,
              top: `${30 + i * 4}%`,
              width: `${8 + i * 2}px`,
              height: `${8 + i * 2}px`,
              background: i % 4 === 0 ? theme.textAccent : i % 4 === 1 ? theme.statusInterview : i % 4 === 2 ? theme.statusOffer : theme.statusApplied,
            }}
          />
        ))}
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
            Choose Your Plan
          </m.h2>
          <m.p
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light mb-8"
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
            Select the perfect plan to accelerate your career journey with our
            <m.span
              className="font-semibold mx-2"
              style={{ color: theme.textAccent }}
              animate={{
                color: [theme.textAccent, theme.statusInterview, theme.statusOffer, theme.textAccent],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              comprehensive features
            </m.span>
          </m.p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-lg font-medium`}
              style={{ color: billingCycle === 'monthly' ? theme.textAccent : theme.textSecondary }}
            >
              Monthly
            </span>
            <m.button
              className="relative w-16 h-8 rounded-full p-1 cursor-pointer overflow-hidden"
              style={{
                background: theme.theme === 'light' ? theme.borderMedium : theme.borderStrong,
              }}
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              whileTap={{ scale: 0.95 }}
            >
              <m.div
                className="w-6 h-6 rounded-full shadow-md"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                animate={{
                  x: billingCycle === 'yearly' ? 8 : 0,
                  backgroundColor: billingCycle === 'yearly' ? theme.textAccent : (theme.theme === 'light' ? '#ffffff' : theme.bgCard),
                }}
              />
            </m.button>
            <div className="flex flex-col items-start">
              <span
                className={`text-lg font-medium`}
                style={{ color: billingCycle === 'yearly' ? theme.textAccent : theme.textSecondary }}
              >
                Yearly
              </span>
              <span className="text-sm font-bold" style={{ color: theme.statusOffer }}>Save 20%</span>
            </div>
          </div>
        </m.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className={`relative group h-full ${plan.popular ? 'md:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg" style={{ background: `linear-gradient(to right, ${theme.textAccent}, ${theme.statusInterview})` }}>
                      Most Popular
                    </div>
                  </div>
                )}

                <m.div
                  className={`relative p-8 rounded-3xl border-2 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:scale-105 h-full flex flex-col ${
                    plan.popular ? 'shadow-2xl' : ''
                  }`}
                  style={{
                    background: theme.theme === 'light'
                      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))"
                      : "linear-gradient(135deg, rgba(10, 20, 40, 0.95), rgba(26, 61, 83, 0.95))",
                    borderColor: plan.popular ? theme.textAccent : theme.borderMedium,
                    boxShadow: plan.popular
                      ? (theme.theme === 'light'
                          ? `0 0 40px ${theme.textAccent}4d`
                          : `0 0 40px ${theme.textAccent}66`)
                      : (theme.theme === 'light'
                          ? "0 0 20px rgba(99, 102, 241, 0.1)"
                          : `0 0 20px ${theme.textAccent}26`),
                  }}
                  whileHover={{
                    boxShadow: plan.popular
                      ? `0 0 60px ${theme.textAccent}66`
                      : (theme.theme === 'light'
                          ? "0 0 40px rgba(99, 102, 241, 0.2)"
                          : `0 0 40px ${theme.textAccent}3d`),
                  }}
                >
                  {/* Animated border for popular plan */}
                  {plan.popular && (
                    <m.div
                      className="absolute inset-0 rounded-3xl border border-transparent"
                      animate={{
                        borderImage: [
                          `linear-gradient(45deg, ${theme.textAccent}99, ${theme.statusInterview}99, ${theme.statusOffer}99, ${theme.textAccent}99) 1`,
                          `linear-gradient(135deg, ${theme.statusInterview}99, ${theme.statusOffer}99, ${theme.textAccent}99, ${theme.statusInterview}99) 1`,
                          `linear-gradient(225deg, ${theme.statusOffer}99, ${theme.textAccent}99, ${theme.statusInterview}99, ${theme.statusOffer}99) 1`,
                          `linear-gradient(315deg, ${theme.textAccent}99, ${theme.statusInterview}99, ${theme.statusOffer}99, ${theme.textAccent}99) 1`,
                        ],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      style={{
                        borderImageSlice: 1,
                      }}
                    />
                  )}

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {[...Array(isLight ? 6 : 10)].map((_, i) => (
                      <m.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full opacity-40"
                        animate={{
                          y: [0, -25, 0],
                          x: [0, Math.sin(i * 0.8) * 20, 0],
                          scale: [0, 1.2, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 5 + i * 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.15,
                        }}
                        style={{
                          left: `${20 + i * 6}%`,
                          top: `${30 + i * 4}%`,
                          background: plan.color,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Icon */}
                    <m.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${plan.color}20, ${plan.color}10)`,
                        border: `1px solid ${plan.color}30`,
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
                        style={{ color: plan.color }}
                      />
                    </m.div>

                    {/* Plan name */}
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: theme.theme === 'light' ? '#1e293b' : '#ffffff' }}
                    >
                      {plan.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm mb-6"
                      style={{ color: theme.textSecondary }}
                    >
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span
                          className="text-5xl font-black"
                          style={{ color: plan.color }}
                        >
                          ${plan.price}
                        </span>
                        <span
                          className="text-lg"
                          style={{ color: theme.textSecondary }}
                        >
                          /{plan.period}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && plan.price > 0 && (
                        <p className="text-sm font-medium mt-1" style={{ color: theme.statusOffer }}>
                          Save ${(plan.price * 12 * 0.2).toFixed(0)} annually
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, featureIndex) => (
                        <m.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3"
                        >
                          <Check
                            className="w-5 h-5 flex-shrink-0"
                            style={{ color: plan.color }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: theme.theme === 'light' ? '#374151' : '#d1d5db' }}
                          >
                            {feature}
                          </span>
                        </m.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <m.button
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                        plan.popular
                          ? 'text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      style={plan.popular ? {
                        backgroundImage: `linear-gradient(135deg, ${theme.textAccent}, ${theme.statusInterview})`,
                        backgroundSize: "200% 200%",
                      } : {}}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: plan.popular ? `0 0 30px ${theme.textAccent}66` : undefined,
                      }}
                      whileTap={{ scale: 0.98 }}
                      animate={plan.popular ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      } : {}}
                      transition={{
                        duration: plan.popular ? 3 : 0.2,
                        repeat: plan.popular ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                    >
                      {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                    </m.button>
                  </div>
                </m.div>
              </m.div>
            )
          })}
        </div>

        {/* FAQ or additional info */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p
            className="text-lg mb-6"
            style={{ color: theme.textSecondary }}
          >
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" style={{ color: theme.statusOffer }} />
              <span style={{ color: theme.textSecondary }}>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" style={{ color: theme.statusOffer }} />
              <span style={{ color: theme.textSecondary }}>Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" style={{ color: theme.statusOffer }} />
              <span style={{ color: theme.textSecondary }}>24/7 support</span>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}