'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { t, language } = useLanguage();
  
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
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-subtitle">{t('projects.subtitle')}</p>
      </motion.div>
      
      <div className="relative w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-6 space-x-6 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {projects.map((project) => (
            <div key={project.id} className="flex-shrink-0 w-80 md:w-96 snap-start">
              <ProjectCard
                project={project}
                language={language}
              />
            </div>
          ))}
        </motion.div>
        
        {/* Scroll indicators/shadows */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-12 h-40 bg-gradient-to-r from-light-background dark:from-dark-background to-transparent z-10"></div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-40 bg-gradient-to-l from-light-background dark:from-dark-background to-transparent z-10"></div>
        
        {/* Scroll instruction */}
        <div className="text-center mt-4 text-light-muted dark:text-dark-muted text-sm">
          <span>⟵ {t('common.scrollHorizontally')} ⟶</span>
        </div>
      </div>
      
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
