'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@/types';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  eyeComfort: boolean;
  toggleEyeComfort: () => void;
};

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  eyeComfort: false,
  toggleEyeComfort: () => {},
});

// Provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [eyeComfort, setEyeComfort] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  
  // Effect to detect system theme preference
  useEffect(() => {
    setMounted(true);
    
    // Check for stored theme
    const storedTheme = localStorage.getItem('theme') as Theme;
    const storedEyeComfort = localStorage.getItem('eyeComfort') === 'true';
    
    if (storedTheme && (storedTheme === 'dark' || storedTheme === 'light')) {
      setThemeState(storedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
    
    // Check for stored eye comfort setting
    setEyeComfort(storedEyeComfort);
  }, []);
  
  // Effect to update document class when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Remove old theme class
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Update eye comfort class
    if (eyeComfort) {
      root.classList.add('eye-comfort');
    } else {
      root.classList.remove('eye-comfort');
    }
    
    // Store theme preference
    localStorage.setItem('theme', theme);
    localStorage.setItem('eyeComfort', String(eyeComfort));
  }, [theme, eyeComfort, mounted]);
  
  // Set theme handler
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  // Toggle eye comfort mode
  const toggleEyeComfort = () => {
    setEyeComfort(prev => !prev);
  };
  
  // Don't render until client-side to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, eyeComfort, toggleEyeComfort }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
