import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, LanguageProviderProps, LanguageProviderState } from '@/types';

// Define type for translations object with index signatures to avoid TypeScript errors
type TranslationsType = {
  [language in Language]: {
    [key: string]: string;
  };
};

// Import translations
const translations: TranslationsType = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.friends': 'Friends',
    'nav.updates': 'Updates',
    'nav.admin': 'Admin',
    
    // Hero section
    'hero.greeting.morning': 'Good morning',
    'hero.greeting.afternoon': 'Good afternoon',
    'hero.greeting.evening': 'Good evening',
    'hero.greeting.night': 'Good night',
    'hero.iam': "I'm",
    'hero.web.developer': 'Web Developer from',
    'hero.short.desc': 'Crafting elegant digital experiences with modern technologies. Focused on creating responsive, accessible and high-performance web applications.',
    'hero.cta.projects': 'Explore Projects',
    'hero.cta.about': 'About Me',
    
    // About section
    'about.title': 'About',
    'about.me': 'Me',
    'about.quickfacts': 'Quick Facts',
    'about.location': 'Location',
    'about.education': 'Education',
    'about.experience': 'Experience',
    'about.skills': 'Technical Skills',
    'about.interests': 'Interests',
    
    // Projects section
    'projects.title': 'My',
    'projects.subtitle': 'Projects',
    'projects.description': 'Showcasing my latest work and personal projects. Each project represents my commitment to quality and innovation.',
    'projects.filter.all': 'All Projects',
    'projects.filter.web': 'Web Apps',
    'projects.filter.ui': 'UI Designs',
    'projects.cta.demo': 'Live Demo',
    'projects.cta.source': 'Source Code',
    'projects.cta.viewall': 'View All Projects',
    
    // Friends section
    'friends.title': 'My',
    'friends.subtitle': 'Friends',
    'friends.description': "I'm fortunate to collaborate with talented individuals who inspire me daily. Here are some of my amazing friends in the tech community.",
    
    // Updates section
    'updates.title': 'Latest',
    'updates.subtitle': 'Updates',
    'updates.description': 'Stay informed about the latest changes, improvements, and additions to my portfolio and projects.',
    'updates.filter.all': 'All Updates',
    'updates.filter.features': 'New Features',
    'updates.filter.bugs': 'Bug Fixes',
    'updates.cta.viewall': 'View All Updates',
    
    // Contact section
    'contact.title': 'Get In',
    'contact.subtitle': 'Touch',
    'contact.description': "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out through the form or my social profiles.",
    'contact.location': 'West Sumatra, Indonesia',
    'contact.connect': 'Connect With Me',
    'contact.form.title': 'Send Me a Message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    
    // Footer
    'footer.description': 'Premium portfolio of a young developer from West Sumatra, Indonesia. Creating elegant digital experiences with modern technologies.',
    'footer.quicklinks': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.blog': 'Blog',
    'footer.docs': 'Documentation',
    'footer.changelog': 'Changelog',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.copyright': '© 2023 Aka Portfolio. All rights reserved.',
    'footer.theme': 'Theme',
    'footer.language': 'English',
    'footer.sitemap': 'Sitemap',
    
    // Admin
    'admin.login': 'Admin Login',
    'admin.username': 'Username',
    'admin.password': 'Password',
    'admin.error': 'Invalid username or password. Please try again.',
    'admin.dashboard': 'Admin Dashboard',
    
    // Music player
    'music.title': 'Background Music',
    
    // Loading screen
    'loading.title': 'Loading premium experience...',
    
    // Misc
    'online': 'Online',
    'offline': 'Offline',
  },
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.projects': 'Proyek',
    'nav.friends': 'Teman',
    'nav.updates': 'Pembaruan',
    'nav.admin': 'Admin',
    
    // Hero section
    'hero.greeting.morning': 'Selamat pagi',
    'hero.greeting.afternoon': 'Selamat siang',
    'hero.greeting.evening': 'Selamat sore',
    'hero.greeting.night': 'Selamat malam',
    'hero.iam': 'Saya',
    'hero.web.developer': 'Web Developer dari',
    'hero.short.desc': 'Menciptakan pengalaman digital yang elegan dengan teknologi modern. Fokus pada pembuatan aplikasi web yang responsif, mudah diakses, dan berkinerja tinggi.',
    'hero.cta.projects': 'Jelajahi Proyek',
    'hero.cta.about': 'Tentang Saya',
    
    // About section
    'about.title': 'Tentang',
    'about.me': 'Saya',
    'about.quickfacts': 'Fakta Singkat',
    'about.location': 'Lokasi',
    'about.education': 'Pendidikan',
    'about.experience': 'Pengalaman',
    'about.skills': 'Kemampuan Teknis',
    'about.interests': 'Minat',
    
    // Projects section
    'projects.title': 'Proyek',
    'projects.subtitle': 'Saya',
    'projects.description': 'Menampilkan karya terbaru dan proyek pribadi saya. Setiap proyek mewakili komitmen saya terhadap kualitas dan inovasi.',
    'projects.filter.all': 'Semua Proyek',
    'projects.filter.web': 'Aplikasi Web',
    'projects.filter.ui': 'UI Designs',
    'projects.cta.demo': 'Demo Langsung',
    'projects.cta.source': 'Kode Sumber',
    'projects.cta.viewall': 'Lihat Semua Proyek',
    
    // Friends section
    'friends.title': 'Teman',
    'friends.subtitle': 'Saya',
    'friends.description': 'Saya beruntung dapat berkolaborasi dengan individu berbakat yang menginspirasi saya setiap hari. Berikut beberapa teman saya yang luar biasa di komunitas teknologi.',
    
    // Updates section
    'updates.title': 'Pembaruan',
    'updates.subtitle': 'Terbaru',
    'updates.description': 'Tetap mendapatkan informasi tentang perubahan, peningkatan, dan penambahan terbaru ke portofolio dan proyek saya.',
    'updates.filter.all': 'Semua Pembaruan',
    'updates.filter.features': 'Fitur Baru',
    'updates.filter.bugs': 'Perbaikan Bug',
    'updates.cta.viewall': 'Lihat Semua Pembaruan',
    
    // Contact section
    'contact.title': 'Hubungi',
    'contact.subtitle': 'Saya',
    'contact.description': 'Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau kesempatan untuk menjadi bagian dari visi Anda. Jangan ragu untuk menghubungi saya melalui formulir atau profil sosial saya.',
    'contact.location': 'Sumatera Barat, Indonesia',
    'contact.connect': 'Terhubung Dengan Saya',
    'contact.form.title': 'Kirim Pesan',
    'contact.form.name': 'Nama Anda',
    'contact.form.email': 'Email Anda',
    'contact.form.subject': 'Subjek',
    'contact.form.message': 'Pesan Anda',
    'contact.form.send': 'Kirim Pesan',
    
    // Footer
    'footer.description': 'Portofolio premium dari pengembang muda dari Sumatera Barat, Indonesia. Menciptakan pengalaman digital yang elegan dengan teknologi modern.',
    'footer.quicklinks': 'Tautan Cepat',
    'footer.resources': 'Sumber Daya',
    'footer.legal': 'Legal',
    'footer.blog': 'Blog',
    'footer.docs': 'Dokumentasi',
    'footer.changelog': 'Perubahan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.terms': 'Ketentuan Layanan',
    'footer.cookies': 'Kebijakan Cookie',
    'footer.copyright': '© 2023 Portofolio Aka. Semua hak dilindungi.',
    'footer.theme': 'Tema',
    'footer.language': 'Indonesia',
    'footer.sitemap': 'Peta Situs',
    
    // Admin
    'admin.login': 'Login Admin',
    'admin.username': 'Nama Pengguna',
    'admin.password': 'Kata Sandi',
    'admin.error': 'Nama pengguna atau kata sandi tidak valid. Silakan coba lagi.',
    'admin.dashboard': 'Dasbor Admin',
    
    // Music player
    'music.title': 'Musik Latar',
    
    // Loading screen
    'loading.title': 'Memuat pengalaman premium...',
    
    // Misc
    'online': 'Online',
    'offline': 'Offline',
  }
};

const LanguageContext = createContext<LanguageProviderState | undefined>(undefined);

const getInitialLanguage = (): Language => {
  // Check if we're on the client
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedLanguage = window.localStorage.getItem('language') as Language;
    if (storedLanguage && ['en', 'id'].includes(storedLanguage)) {
      return storedLanguage;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'id') {
      return 'id';
    }
  }
  
  // Default to English
  return 'en';
};

export function LanguageProvider({
  children,
  defaultLanguage = 'en',
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  // Sync language on mount
  useEffect(() => {
    setLanguage(getInitialLanguage());
  }, []);

  const t = (key: string): string => {
    if (!translations[language]) {
      console.warn(`Translation for language "${language}" not found.`);
      return key;
    }
    
    // Check if the key exists in the current language
    if (translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English if available
    if (translations.en[key]) {
      return translations.en[key];
    }
    
    // Last resort fallback
    return key;
  };

  const value = {
    language,
    setLanguage: (newLanguage: Language) => {
      try {
        localStorage.setItem('language', newLanguage);
      } catch (error) {
        console.error('Failed to save language to localStorage:', error);
      }
      setLanguage(newLanguage);
    },
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};
