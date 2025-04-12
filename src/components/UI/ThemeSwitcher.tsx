'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setIsAnimating(false);
    }, 300);
  };
  
  return (
    <motion.button
      className={`relative p-2 rounded-full transition-colors ${
        theme === 'dark'
          ? 'bg-dark-primary/10 text-dark-primary'
          : 'bg-light-primary/10 text-light-primary'
      }`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Sun icon */}
      <motion.div
        initial={{ opacity: theme === 'dark' ? 0 : 1, rotate: 0 }}
        animate={{ 
          opacity: theme === 'dark' ? 0 : 1,
          rotate: isAnimating ? 180 : 0,
          scale: isAnimating ? 0.5 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FaSun className="h-5 w-5" />
      </motion.div>
      
      {/* Moon icon */}
      <motion.div
        initial={{ opacity: theme === 'dark' ? 1 : 0, rotate: 0 }}
        animate={{ 
          opacity: theme === 'dark' ? 1 : 0,
          rotate: isAnimating ? 180 : 0,
          scale: isAnimating ? 0.5 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <FaMoon className="h-5 w-5" />
      </motion.div>
      
      {/* Invisible placeholder for consistent button size */}
      <div className="h-5 w-5 opacity-0">
        <FaSun />
      </div>
    </motion.button>
  );
}
