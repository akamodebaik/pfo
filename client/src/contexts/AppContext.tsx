import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { siteConfig } from '@/config/site';

interface AppContextProps {
  isSoundPlaying: boolean;
  toggleSound: () => void;
  visitorCount: number;
  language: 'en' | 'id';
  setLanguage: (lang: 'en' | 'id') => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Initialize states from site configuration
  const [isSoundPlaying, setIsSoundPlaying] = useState(siteConfig.backgroundMusic.autoplay);
  const [language, setLanguage] = useState<'en' | 'id'>(siteConfig.defaultLanguage as 'en' | 'id');
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    // Create audio element if not exists
    if (!document.getElementById('bgMusic')) {
      const audio = document.createElement('audio');
      audio.id = 'bgMusic';
      audio.loop = true;
      audio.src = siteConfig.backgroundMusic.src;
      audio.volume = siteConfig.backgroundMusic.volume;
      document.body.appendChild(audio);
    }
    
    audioRef.current = document.getElementById('bgMusic') as HTMLAudioElement;
    
    // Play music if autoplay is enabled
    if (siteConfig.backgroundMusic.autoplay && audioRef.current) {
      // Need user interaction first, we'll handle this in the toggle function
      setIsSoundPlaying(true);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);
  
  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.lang = language;
  }, [language]);
  
  // Get visitor count from API
  const { data: visitorData } = useQuery({
    queryKey: ['/api/visitor-count'],
    queryFn: async () => {
      const response = await fetch('/api/visitor-count');
      if (!response.ok) {
        throw new Error('Failed to fetch visitor count');
      }
      return response.json();
    }
  });
  
  const toggleSound = () => {
    if (!audioRef.current) return;
    
    if (isSoundPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    
    setIsSoundPlaying(!isSoundPlaying);
  };
  
  return (
    <AppContext.Provider value={{
      isSoundPlaying,
      toggleSound,
      visitorCount: visitorData?.count || 0, // Use 0 instead of mock data
      language,
      setLanguage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
