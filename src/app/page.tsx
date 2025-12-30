"use client"

import { useEffect, useState } from "react";
import Head from "next/head";
import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import StatisticsSection from "@/components/landing/StatisticsSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import { useThemeClasses } from "@/hooks/useThemeClasses";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const theme = useThemeClasses();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CareerSync",
    "description": "Sync your career trajectory with intelligent tracking, application management, and real-time insights.",
    "url": "https://careersync.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "CareerSync Team"
    },
    "featureList": [
      "Job Application Tracking",
      "Resume Builder",
      "Career Analytics",
      "Interview Preparation",
      "Professional Networking"
    ],
    "screenshot": "/csync.png"
  };

  return (
    <>
      <Head>
        <title>CareerSync - Track Your Career Journey | Professional Career Management</title>
        <meta name="description" content="Sync your career trajectory with intelligent tracking, application management, and real-time insights. Manage job applications, build resumes, and advance your career with AI-powered tools." />
        <meta name="keywords" content="career tracking, job applications, resume builder, career management, job search, professional development" />
        <link rel="canonical" href="https://careersync.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <div
        className={`overflow-hidden`}
        style={{ ...theme.bgPrimaryStyle, fontFamily: '"Geist", sans-serif' }}
      >
        <Navigation />
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <StatisticsSection />
        <PricingSection />
        <Footer />

        {/* Scroll progress indicator */}
        <div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff6b00] to-[#00d4ff] z-40"
          style={{
            transform: `scaleX(${typeof window !== 'undefined' ? scrollY / (document.body.scrollHeight - window.innerHeight) : 0})`,
            transformOrigin: 'left',
          }}
        />
      </div>
    </>
  );
}

           