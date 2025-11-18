"use client"

import { useEffect, useState } from "react";
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

  return (
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
  );
}

           