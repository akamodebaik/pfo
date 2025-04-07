import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useLanguage } from '@/components/ui/language-provider';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { format } from 'date-fns';

export default function Updates() {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  
  const [filter, setFilter] = useState('all');
  const updates = portfolioData?.updates || [];
  
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const filtersRef = useScrollAnimation<HTMLDivElement>({ delay: 200 });
  
  // Default updates until we load from API
  const defaultUpdates = [
    {
      id: 1,
      title: 'Added Dark Mode Support',
      description: 'Implemented smooth dark mode transition with automatic system preference detection and manual toggle option for better accessibility.',
      date: '2023-10-15T00:00:00Z',
      category: 'feature',
      order: 1
    },
    {
      id: 2,
      title: 'Improved Animation Performance',
      description: 'Optimized all Framer Motion animations for better performance on mobile devices and reduced layout shifts during transitions.',
      date: '2023-10-10T00:00:00Z',
      category: 'enhancement',
      order: 2
    },
    {
      id: 3,
      title: 'Fixed Mobile Navigation Issues',
      description: 'Resolved navigation menu display problems on smaller screens and improved touch interaction areas for better mobile usability.',
      date: '2023-10-05T00:00:00Z',
      category: 'bug',
      order: 3
    },
    {
      id: 4,
      title: 'Added EcoMart Project',
      description: 'Launched a new sustainable e-commerce project with innovative features and comprehensive documentation.',
      date: '2023-10-01T00:00:00Z',
      category: 'project',
      order: 4
    }
  ];
  
  const displayUpdates = updates.length > 0 ? updates : defaultUpdates;
  
  const filteredUpdates = filter === 'all' 
    ? displayUpdates 
    : displayUpdates.filter(update => update.category === filter);
  
  const getCategoryBadge = (category: string) => {
    switch(category) {
      case 'feature':
        return (
          <div className="inline-block px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full mb-2">
            New Feature
          </div>
        );
      case 'enhancement':
        return (
          <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-medium rounded-full mb-2">
            Enhancement
          </div>
        );
      case 'bug':
        return (
          <div className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-medium rounded-full mb-2">
            Bug Fix
          </div>
        );
      case 'project':
        return (
          <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-500 text-xs font-medium rounded-full mb-2">
            New Project
          </div>
        );
      default:
        return (
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
            Update
          </div>
        );
    }
  };

  return (
    <section id="updates" className="min-h-screen py-20 pt-32 section-snap relative overflow-hidden">
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-40 right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div ref={headerRef} className="flex flex-col md:flex-row items-end justify-between mb-12 opacity-0">
          <div>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
              {t('updates.title')} <span className="text-gold-gradient">{t('updates.subtitle')}</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl">
              {t('updates.description')}
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
              {t('updates.filter.all')}
            </button>
            
            <button 
              onClick={() => setFilter('feature')}
              className={`px-6 py-3 font-montserrat text-sm transition-all rounded-full ${
                filter === 'feature' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20'
              }`}
            >
              {t('updates.filter.features')}
            </button>
            
            <button 
              onClick={() => setFilter('bug')}
              className={`px-6 py-3 font-montserrat text-sm transition-all rounded-full ${
                filter === 'bug' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20'
              }`}
            >
              {t('updates.filter.bugs')}
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-3xl shadow-md p-6 card-hover"
            >
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:w-3/12 mb-4 md:mb-0">
                  {getCategoryBadge(update.category)}
                  <p className="text-muted-foreground text-sm">
                    {update.date ? format(new Date(update.date), 'MMMM d, yyyy') : ''}
                  </p>
                </div>
                
                <div className="md:w-7/12 md:px-6">
                  <h3 className="text-xl font-playfair font-bold text-foreground mb-2">{update.title}</h3>
                  <p className="text-muted-foreground">
                    {update.description}
                  </p>
                </div>
                
                <div className="md:w-2/12 mt-4 md:mt-0 flex md:justify-end">
                  <button className="text-primary hover:text-primary/90 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <button className="px-8 py-4 bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20 font-medium rounded-full transition-all cursor-magnetic flex items-center space-x-3">
            <span className="font-montserrat">{t('updates.cta.viewall')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
