'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLanguageChange = (newLanguage: 'en' | 'id') => {
    setLanguage(newLanguage);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="relative">
      <motion.button
        className={`p-2 rounded-full flex items-center justify-center transition-colors ${
          language === 'en'
            ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
            : 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
        }`}
        onClick={toggleDropdown}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Change language"
      >
        <span className="font-semibold text-sm uppercase">
          {language}
        </span>
      </motion.button>
      
      <AnimatePresence>
        {isDropdownOpen && (
          <>
            {/* Backdrop for closing dropdown when clicking outside */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Dropdown menu */}
            <motion.div
              className="absolute top-full right-0 mt-1 z-50 bg-white dark:bg-dark-background rounded-md shadow-lg overflow-hidden min-w-[100px]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className={`w-full px-4 py-2 text-left text-sm ${
                  language === 'en'
                    ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                    : 'text-light-text dark:text-dark-text hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                }`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              
              <button
                className={`w-full px-4 py-2 text-left text-sm ${
                  language === 'id'
                    ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
                    : 'text-light-text dark:text-dark-text hover:bg-light-primary/5 dark:hover:bg-dark-primary/5'
                }`}
                onClick={() => handleLanguageChange('id')}
              >
                Indonesia
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
