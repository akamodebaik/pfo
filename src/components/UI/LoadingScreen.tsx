'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function LoadingScreen() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-light-background via-light-background to-light-primary/5 dark:from-dark-background dark:via-dark-background dark:to-dark-primary/10">
      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.7 
        }}
        className="mb-10 relative"
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 blur-2xl bg-light-primary/20 dark:bg-dark-primary/20 rounded-full scale-150 z-[-1] animate-pulse"></div>
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100" 
          height="100" 
          viewBox="0 0 100 100"
          className="text-light-primary dark:text-dark-primary drop-shadow-lg"
        >
          <motion.path
            d="M30,20 L50,10 L70,20 L70,65 L50,75 L30,65 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M30,20 L50,30 L70,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
          <motion.path
            d="M50,30 L50,75"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
        </svg>
      </motion.div>
      
      {/* Loading text with rock emoji */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mb-10"
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {t('common.initialLoading')} <span className="inline-block animate-bounce">🗿</span>
        </motion.h2>
      </motion.div>
      
      {/* Progress bar with glass effect */}
      <div className="relative w-64 md:w-80 h-3 bg-white/10 dark:bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full rounded-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent"
        />
        
        {/* Progress percentage */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white drop-shadow-md">
          {Math.round(progress)}%
        </div>
      </div>
      
      {/* Status text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-4 text-sm text-light-muted dark:text-dark-muted loading-dots"
      >
        {progress < 30 ? "Memuat aset" : 
         progress < 60 ? "Menyiapkan tampilan" : 
         progress < 90 ? "Hampir selesai" : "Selamat datang"}
      </motion.p>
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Multiple pulsing circles with different sizes and delays */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-primary/5 dark:bg-dark-primary/10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: '800px', height: '800px', opacity: [0, 0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-accent/5 dark:bg-dark-accent/10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: '600px', height: '600px', opacity: [0, 0.4, 0] }}
          transition={{ duration: 3, delay: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-primary/5 dark:bg-dark-primary/10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: '400px', height: '400px', opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.5, delay: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
