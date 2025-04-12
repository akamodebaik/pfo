'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function SecondaryLoading() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="relative">
        {/* Gradient glow behind loading spinner */}
        <div className="absolute inset-0 blur-xl bg-light-primary/20 dark:bg-dark-primary/20 rounded-full scale-150 z-[-1] animate-pulse"></div>
        
        <motion.div
          className="relative w-24 h-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {/* Outer circle */}
          <div className="absolute top-0 left-0 w-full h-full border-4 border-light-primary/20 dark:border-dark-primary/20 rounded-full" />
          
          {/* Inner spinning circle */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-light-primary dark:border-t-dark-primary border-r-light-primary/50 dark:border-r-dark-primary/50 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-light-primary dark:bg-dark-primary rounded-full" />
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.p
          className="text-xl font-medium text-light-text dark:text-dark-text"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {t('common.secondaryLoading')} <span className="inline-block animate-bounce">:)</span>
        </motion.p>
        
        {/* Additional loading info */}
        <p className="text-sm text-light-muted dark:text-dark-muted mt-2 loading-dots">
          Menyiapkan data
        </p>
      </motion.div>
      
      {/* Decorative dots */}
      <div className="absolute bottom-10 flex space-x-2 mt-6">
        {[1, 2, 3].map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 rounded-full bg-light-primary dark:bg-dark-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              delay: dot * 0.2,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    </div>
  );
}
