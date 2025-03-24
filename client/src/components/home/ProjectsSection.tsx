import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '@/data/projectsData';
import { useTheme } from '@/hooks/useTheme';

export default function ProjectsSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const scrollLeft = () => {
    if (projectsContainerRef.current) {
      projectsContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (projectsContainerRef.current) {
      projectsContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const projectCardVariants = {
    hidden: { y: 30, opacity: 0, rotateY: 15 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateY: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.2 * i
      }
    }),
    hover: { 
      y: -5,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <section id="projects" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-sm md:text-base uppercase tracking-widest text-gold mb-2"
          >
            {t('projects.subtitle')}
          </motion.h2>
          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-poppins"
          >
            {t('projects.title')}
          </motion.h3>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-gold mx-auto my-4"
          ></motion.div>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={scrollLeft}
              className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </motion.div>
          
          <motion.div 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={scrollRight}
              className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
          
          <div 
            ref={projectsContainerRef}
            className="flex overflow-x-auto no-scrollbar gap-6 pb-4 snap-x snap-mandatory"
          >
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={projectCardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              className={`min-w-[300px] md:min-w-[340px] rounded-xl overflow-hidden shadow-lg backface-hidden snap-start ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}
            >
              <div className="relative overflow-hidden h-48">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className={`absolute top-4 right-4 ${project.tagColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {project.tag}
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  {project.liveUrl !== "#" ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gold hover:text-darkGold transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 inline mr-1" /> {t('projects.liveDemo')}
                    </a>
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed">
                      <ExternalLink className="h-4 w-4 inline mr-1" /> {t('projects.comingSoon')}
                    </span>
                  )}
                  
                  {project.codeUrl !== "#" ? (
                    <a 
                      href={project.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gold hover:text-darkGold transition-colors"
                    >
                      <Code className="h-4 w-4 inline mr-1" /> {t('projects.sourceCode')}
                    </a>
                  ) : (
                    <span className="text-gray-400 cursor-not-allowed">
                      <Code className="h-4 w-4 inline mr-1" /> {t('projects.comingSoon')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
