'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Update } from '@/types';
import { formatDate, getTranslatedText } from '@/utils/helpers';

interface UpdatesSectionProps {
  updates: Update[];
}

export default function UpdatesSection({ updates }: UpdatesSectionProps) {
  const { t, language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">{t('updates.title')}</h2>
        <p className="section-subtitle">{t('updates.subtitle')}</p>
      </motion.div>
      
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l-2 border-light-primary dark:border-dark-primary pl-8 pb-6">
          {updates.map((update, index) => (
            <motion.div
              key={index}
              className="mb-10 relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute top-0 -left-[42px] h-6 w-6 rounded-full bg-light-primary dark:bg-dark-primary flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-white dark:bg-dark-background" />
              </div>
              
              {/* Date */}
              <div className="text-sm font-medium text-light-primary dark:text-dark-primary mb-2">
                {formatDate(update.date, language)}
              </div>
              
              {/* Card */}
              <div className="card p-5">
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                  {getTranslatedText(update.title, language)}
                </h3>
                <p className="text-light-muted dark:text-dark-muted">
                  {getTranslatedText(update.description, language)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
