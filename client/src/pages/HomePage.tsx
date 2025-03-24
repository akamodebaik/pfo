import { useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProgressBar from '@/components/shared/ProgressBar';
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import SkillsSection from '@/components/home/SkillsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import FriendsSection from '@/components/home/FriendsSection';
import ContactSection from '@/components/home/ContactSection';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  const { isSoundPlaying, toggleSound, visitorCount } = useAppContext();
  
  // Initialize smooth scroll effect - simplified
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"], button[data-href^="#"]');
      
      if (anchor) {
        const targetId = anchor.getAttribute('href') || anchor.getAttribute('data-href');
        if (targetId && targetId !== '#') {
          e.preventDefault();
          document.querySelector(targetId)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Set page title dynamically from site config
  useEffect(() => {
    document.title = `${siteConfig.name} | ${siteConfig.title}`;
  }, []);

  return (
    <div className="animate-fadeIn">
      <ProgressBar />
      
      <Header 
        isSoundPlaying={isSoundPlaying}
        toggleSound={toggleSound}
      />
      
      <main>
        <HeroSection visitorCount={visitorCount} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <FriendsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
