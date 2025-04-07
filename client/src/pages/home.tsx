import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, User, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useLanguage } from '@/components/ui/language-provider';
import { useGreeting } from '@/utils/animations';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Home() {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  const greeting = useGreeting();
  
  const containerRef = useScrollAnimation<HTMLElement>();
  const textRef = useScrollAnimation<HTMLDivElement>({ delay: 300 });
  const descriptionRef = useScrollAnimation<HTMLParagraphElement>({ delay: 600 });
  const ctaRef = useScrollAnimation<HTMLDivElement>({ delay: 900 });
  const socialRef = useScrollAnimation<HTMLDivElement>({ delay: 1200 });
  const imageRef = useScrollAnimation<HTMLDivElement>({ delay: 100 });
  
  const bio = portfolioData?.bio;

  return (
    <section id="home" ref={containerRef} className="min-h-screen flex items-center justify-center relative section-snap pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient z-0"></div>
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-10 left-0 w-60 h-60 bg-primary/10 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 relative z-10 flex flex-col-reverse md:flex-row items-center">
        <div className="w-full md:w-1/2 space-y-8 mt-12 md:mt-0">
          <div ref={textRef} className="opacity-0">
            <p className="text-primary font-medium text-lg md:text-xl mb-2">{t(greeting)}</p>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-foreground leading-tight">
              {t('hero.iam')} <span className="text-gold-gradient">{bio?.name}</span>, <br />
              {t('hero.web.developer')} <br />
              {bio?.location}
            </h1>
          </div>
          
          <p ref={descriptionRef} className="text-lg text-muted-foreground max-w-xl opacity-0">
            {bio?.shortDescription || t('hero.short.desc')}
          </p>
          
          <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
            <Link href="/projects">
              <a className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full transition-all shadow-sm hover:shadow-md cursor-magnetic flex items-center space-x-3 relative overflow-hidden">
                <span className="relative z-10 font-montserrat text-sm md:text-base">{t('hero.cta.projects')}</span>
                <ArrowRight className="h-5 w-5 relative z-10" />
              </a>
            </Link>
            
            <Link href="/about">
              <a className="px-8 py-4 bg-transparent hover:bg-foreground/5 text-foreground border border-foreground/20 font-medium rounded-full transition-all cursor-magnetic flex items-center space-x-3">
                <span className="font-montserrat text-sm md:text-base">{t('hero.cta.about')}</span>
                <User className="h-5 w-5" />
              </a>
            </Link>
          </div>
          
          <div ref={socialRef} className="flex items-center space-x-6 pt-6 opacity-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href={`mailto:${bio?.email || 'contact@aka.dev'}`} className="text-foreground hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div ref={imageRef} className="w-full md:w-1/2 flex justify-center md:justify-end relative opacity-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            <img 
              src={bio?.avatar}
              alt={`${bio?.name} - Web Developer`}
              className="relative z-10 rounded-full w-60 h-60 md:w-72 md:h-72 object-cover border-4 border-background dark:border-card shadow-md"
            />
            <div className="absolute -bottom-4 -right-4 z-20 flex items-center justify-center">
              <div className="bg-card p-3 rounded-2xl shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-foreground">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Link href="/about">
          <a className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-md">
            <ArrowRight className="h-5 w-5 text-primary transform rotate-90" />
          </a>
        </Link>
      </motion.div>
    </section>
  );
}
