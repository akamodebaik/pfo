import { Language } from '@/types';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Import translations
import enTranslations from '@/locales/en.json';
import idTranslations from '@/locales/id.json';

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Available translations
const translations: Translations = {
  en: enTranslations,
  id: idTranslations,
};

/**
 * Get the current language from cookies
 */
export function getLanguage(): Language {
  const cookieStore = cookies();
  const langCookie = cookieStore.get('language');
  return (langCookie?.value as Language) || 'id';
}

/**
 * Set language in cookie
 */
export function setLanguage(
  language: Language,
  response: NextResponse
): NextResponse {
  response.cookies.set({
    name: 'language',
    value: language,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });

  return response;
}

/**
 * Translate a key based on current language
 */
export function translate(key: string, language: Language = 'id'): string {
  const parts = key.split('.');
  let result = translations[language];

  for (const part of parts) {
    if (result && result[part]) {
      result = result[part] as any;
    } else {
      // Fallback to English if key not found in current language
      result = getNestedValue(translations.en, parts);
      break;
    }
  }

  return typeof result === 'string' ? result : key;
}

/**
 * Helper to get nested value from object
 */
function getNestedValue(obj: any, parts: string[]): string {
  let current = obj;
  
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return parts.join('.');
    }
  }
  
  return typeof current === 'string' ? current : parts.join('.');
}

/**
 * Format a date according to the current language
 */
export function formatDate(date: string, language: Language = 'id'): string {
  return new Date(date).toLocaleDateString(
    language === 'en' ? 'en-US' : 'id-ID',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
}
