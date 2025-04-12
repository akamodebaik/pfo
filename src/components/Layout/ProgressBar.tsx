'use client';

import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how much has been scrolled
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollTop / scrollHeight;
      
      setScrollProgress(progress);
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-light-primary dark:bg-dark-primary z-50 transition-all duration-300"
      style={{ width: `${scrollProgress * 100}%` }}
    />
  );
}
