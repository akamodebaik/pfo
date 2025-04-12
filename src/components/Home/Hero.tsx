'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  name: string;
  fullName: string;
  avatar: string;
  roles: string[];
}

export default function Hero({ name, fullName, avatar, roles }: HeroProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const { t } = useLanguage();
  
  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [roles.length]);
  
  return (
    <div className="container mx-auto px-4 pt-20 md:pt-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl text-light-muted dark:text-dark-muted mb-2">
            {t('home.greeting')}
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-4">
            {fullName}
          </h1>
          
          <div className="h-8 mb-6">
            <motion.div
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-light-primary dark:text-dark-primary"
            >
              {roles[currentRoleIndex]}
            </motion.div>
          </div>
          
          <div className="flex space-x-4">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('nav.projects')}
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('more')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('contact.title')}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Avatar */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-light-primary/20 to-light-secondary/20 dark:from-dark-primary/20 dark:to-dark-secondary/20 rounded-full animate-pulse-slow" />
            <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white dark:border-dark-border shadow-lg">
              <Image
                src={avatar}
                alt={name}
                fill
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
