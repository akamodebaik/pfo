'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { calculateAge } from '@/utils/helpers';

interface AboutMeProps {
  birthdate: string;
  location: string;
  school: string;
  bio: string;
  cv: string;
}

export default function AboutMe({ birthdate, location, school, bio, cv }: AboutMeProps) {
  const { t } = useLanguage();
  const age = calculateAge(birthdate);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="card p-8 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Bio */}
          <p className="text-light-text dark:text-dark-text text-lg mb-8 leading-relaxed">
            {bio}
          </p>
          
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">
                {t('home.age')}
              </h3>
              <p className="text-light-primary dark:text-dark-primary text-lg">
                {age}
              </p>
            </div>
            
            <div className="p-4 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">
                {t('home.location')}
              </h3>
              <p className="text-light-primary dark:text-dark-primary text-lg">
                {location}
              </p>
            </div>
            
            <div className="p-4 bg-light-primary/10 dark:bg-dark-primary/10 rounded-lg">
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">
                {t('home.school')}
              </h3>
              <p className="text-light-primary dark:text-dark-primary text-lg">
                {school}
              </p>
            </div>
          </div>
          

        </motion.div>
      </div>
    </div>
  );
}
