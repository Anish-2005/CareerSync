import React from 'react';
import { motion } from 'framer-motion';

const m = motion as any;

interface HeaderProps {
  theme: any;
}

const Header: React.FC<HeaderProps> = ({ theme }) => (
  <m.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="mb-8 sm:mb-12"
  >
    <h1
      className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 leading-none"
      style={{
        backgroundImage: theme.theme === 'light'
          ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%)',
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: theme.textPrimary,
      }}
    >
      Resume Builder
    </h1>
    <p style={{ color: theme.textSecondary }} className="text-base sm:text-xl">
      Create a professional resume that stands out to employers
    </p>
  </m.div>
);

export default Header;
