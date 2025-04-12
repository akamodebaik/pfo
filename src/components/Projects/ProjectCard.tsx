'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project, Language } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslatedText } from '@/utils/helpers';

interface ProjectCardProps {
  project: Project;
  language: Language;
}

export default function ProjectCard({ project, language }: ProjectCardProps) {
  const { t } = useLanguage();
  
  return (
    <motion.div
      className="card overflow-hidden group"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <h3 className="text-xl font-semibold text-white mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-2">
            {getTranslatedText(project.description, language)}
          </p>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="text-xs py-1 px-2 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between mt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm py-1 px-3"
          >
            {t('common.viewProject')}
          </a>
          
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-1 px-3"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
