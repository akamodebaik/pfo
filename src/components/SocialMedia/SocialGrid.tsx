'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { SocialMedia } from '@/types';
import SocialCard from './SocialCard';

interface SocialGridProps {
  social: SocialMedia[];
}

export default function SocialGrid({ social }: SocialGridProps) {
  const { t } = useLanguage();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">{t('social.title')}</h2>
        <p className="section-subtitle">{t('social.subtitle')}</p>
      </motion.div>
      
      <div className="relative w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {social.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-64 snap-start">
              <SocialCard social={item} />
            </div>
          ))}
        </motion.div>
        
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-16 bg-gradient-to-r from-light-background dark:from-dark-background to-transparent z-10"></div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-16 bg-gradient-to-l from-light-background dark:from-dark-background to-transparent z-10"></div>
      </div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
