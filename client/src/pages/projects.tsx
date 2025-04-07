import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useLanguage } from '@/components/ui/language-provider';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Projects() {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  
  const [filter, setFilter] = useState('all');
  const projects = portfolioData?.projects || [];
  
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const filtersRef = useScrollAnimation<HTMLDivElement>({ delay: 200 });
  
  // Default projects until we load from API
  const defaultProjects = [
    {
      id: 1,
      name: 'LuxeStay - Premium Booking Platform',
      description: 'A high-end accommodation booking platform built with Next.js and TailwindCSS. Features include real-time availability, integrated payment processing, and personalized recommendations.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Prisma'],
      demoLink: '#',
      sourceLink: '#',
      featured: true,
      category: 'web',
      order: 1
    },
    {
      id: 2,
      name: 'FinTrack - Financial Dashboard',
      description: 'A comprehensive financial tracking dashboard with expense categorization, budget planning, and visual analytics. Built with React and Chart.js with a clean, intuitive interface.',
      image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      tags: ['React', 'Redux', 'Chart.js', 'Firebase'],
      demoLink: '#',
      sourceLink: '#',
      featured: false,
      category: 'web',
      order: 2
    },
    {
      id: 3,
      name: 'EcoMart - Sustainable E-Commerce',
      description: 'An e-commerce platform focused on eco-friendly products with product filtering, user reviews, and secure checkout. Features a carbon footprint calculator for each purchase.',
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      tags: ['Next.js', 'Stripe', 'MongoDB', 'TailwindCSS'],
      demoLink: '#',
      sourceLink: '#',
      featured: false,
      category: 'web',
      order: 3
    }
  ];
  
  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  
  const filteredProjects = filter === 'all' 
    ? displayProjects 
    : displayProjects.filter(project => project.category === filter);

  return (
    <section id="projects" className="min-h-screen py-20 pt-32 section-snap relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-40 right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div ref={headerRef} className="flex flex-col md:flex-row items-end justify-between mb-12 opacity-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
              {t('projects.title')} <span className="text-gold-gradient">{t('projects.subtitle')}</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl">
              {t('projects.description')}
            </p>
          </div>
          
          <div ref={filtersRef} className="mt-6 md:mt-0 flex flex-wrap gap-4 opacity-0">
            <button 
              onClick={() => setFilter('all')}
              className={`px-6 py-3 font-montserrat text-sm transition-all rounded-full ${
                filter === 'all' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20'
              }`}
            >
              {t('projects.filter.all')}
            </button>
            
            <button 
              onClick={() => setFilter('web')}
              className={`px-6 py-3 font-montserrat text-sm transition-all rounded-full ${
                filter === 'web' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20'
              }`}
            >
              {t('projects.filter.web')}
            </button>
            
            <button 
              onClick={() => setFilter('ui')}
              className={`px-6 py-3 font-montserrat text-sm transition-all rounded-full ${
                filter === 'ui' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20'
              }`}
            >
              {t('projects.filter.ui')}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-3xl shadow-md overflow-hidden card-hover"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-5/12 h-60 md:h-auto">
                  <img 
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col">
                  {project.featured && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Featured</span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-playfair font-bold text-foreground mb-3">{project.name}</h3>
                  
                  <p className="text-muted-foreground flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-4">
                    {project.demoLink && (
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full transition-all shadow-sm hover:shadow-md cursor-magnetic flex items-center space-x-2"
                      >
                        <span className="font-montserrat text-sm">{t('projects.cta.demo')}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    
                    {project.sourceLink && (
                      <a 
                        href={project.sourceLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20 font-medium rounded-full transition-all cursor-magnetic flex items-center space-x-2"
                      >
                        <span className="font-montserrat text-sm">{t('projects.cta.source')}</span>
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-4 bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20 font-medium rounded-full transition-all cursor-magnetic flex items-center space-x-3">
            <span className="font-montserrat">{t('projects.cta.viewall')}</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
