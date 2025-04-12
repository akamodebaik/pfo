'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Home/Hero';
import AboutMe from '@/components/Home/AboutMe';
import SocialGrid from '@/components/SocialMedia/SocialGrid';
import FriendsGrid from '@/components/Friends/FriendsGrid';
import ProjectsGrid from '@/components/Projects/ProjectsGrid';
import UpdatesSection from '@/components/Updates/UpdatesSection';
import ContactForm from '@/components/Contact/ContactForm';
import LoadingScreen from '@/components/UI/LoadingScreen';
import WelcomePopup from '@/components/UI/WelcomePopup';
import { Database } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const [data, setData] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const { language } = useLanguage();
  
  // Fetch data from database.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const jsonData = await response.json();
        setData(jsonData);
        
        // Update visitor count
        fetch('/api/visitor', { method: 'POST' }).catch(error => {
          console.error('Error updating visitor count:', error);
        });
        
        // Simulate loading for demonstration purposes (3 seconds)
        setTimeout(() => {
          setLoading(false);
          
          // Show welcome popup after loading
          setTimeout(() => {
            setShowWelcomePopup(true);
            
            // Auto-hide popup after 3 seconds
            setTimeout(() => {
              setShowWelcomePopup(false);
            }, 3000);
          }, 500);
        }, 3000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Show loading screen
  if (loading) {
    return <LoadingScreen />;
  }
  
  // Show error if data is not available
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-light-text dark:text-dark-text">
          Failed to load data. Please refresh the page.
        </p>
      </div>
    );
  }
  
  return (
    <>
      {/* Welcome Popup */}
      <WelcomePopup show={showWelcomePopup} onClose={() => setShowWelcomePopup(false)} />
      
      {/* Hero Section */}
      <section id="home" className="section bg-gradient-to-r from-light-background via-light-background/90 to-light-background dark:from-dark-background dark:via-dark-background/90 dark:to-dark-background">
        <Hero
          name={data.profile.name}
          fullName={data.profile.fullName}
          avatar={data.profile.avatar}
          roles={data.profile.roles}
        />
        <AboutMe
          birthdate={data.profile.birthdate}
          location={data.profile.location}
          school={data.profile.school}
          bio={data.profile.bio[language]}
          cv={data.profile.cv[language]}
        />
      </section>
      
      {/* Social Media Section */}
      <section id="social" className="section bg-light-background/50 dark:bg-dark-background/50">
        <SocialGrid social={data.social} />
      </section>
      
      {/* Friends Section */}
      <section id="friends" className="section bg-gradient-to-r from-light-background via-light-background/90 to-light-background dark:from-dark-background dark:via-dark-background/90 dark:to-dark-background">
        <FriendsGrid friends={data.friends} />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="section bg-light-background/50 dark:bg-dark-background/50">
        <ProjectsGrid projects={data.projects} />
      </section>
      
      {/* Updates Section */}
      <section id="updates" className="section bg-gradient-to-r from-light-background via-light-background/90 to-light-background dark:from-dark-background dark:via-dark-background/90 dark:to-dark-background">
        <UpdatesSection updates={data.updates} />
      </section>
      
      {/* Contact Section */}
      <section id="more" className="section bg-light-background/50 dark:bg-dark-background/50">
        <ContactForm />
      </section>
    </>
  );
}
