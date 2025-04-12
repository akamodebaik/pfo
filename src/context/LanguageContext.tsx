'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '@/types';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translations
import enTranslations from '@/locales/en.json';
import idTranslations from '@/locales/id.json';

// Get nested value from object
function getNestedValue(obj: any, path: string): string {
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      return path;
    }
  }
  
  return typeof current === 'string' ? current : path;
}

// Provider component
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('id');
  const [translations, setTranslations] = useState<any>(idTranslations);
  
  // Effect to load stored language preference
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'id')) {
      setLanguageState(storedLanguage);
      setTranslations(storedLanguage === 'en' ? enTranslations : idTranslations);
    }
  }, []);
  
  // Set language handler
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    setTranslations(newLanguage === 'en' ? enTranslations : idTranslations);
    
    // Call server to set language in cookie
    fetch('/api/language', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: newLanguage }),
    }).catch(error => console.error('Error setting language cookie:', error));
  };
  
  // Translation function
  const t = (key: string): string => {
    return getNestedValue(translations, key) || getNestedValue(enTranslations, key) || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
