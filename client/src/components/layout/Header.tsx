import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Battery, Moon, Sun, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

interface HeaderProps {
  isSoundPlaying: boolean;
  toggleSound: () => void;
}

export default function Header({ isSoundPlaying, toggleSound }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const { time, batteryLevel, batteryCharging } = useRealTimeData();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('navigation.home') },
    { href: '#about', label: t('navigation.about') },
    { href: '#skills', label: t('navigation.skills') },
    { href: '#projects', label: t('navigation.projects') },
    { href: '#friends', label: t('navigation.friends') },
    { href: '#contact', label: t('navigation.contact') }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 w-full backdrop-blur-md z-40 transition-all duration-300",
        isScrolled ? "shadow-md" : "",
        theme === 'dark' ? 'bg-black/90 text-white' : 'bg-white/90 text-gray-800'
      )}
    >
      <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
        <button 
          onClick={() => window.location.href = '#home'} 
          className="text-xl md:text-2xl font-bold font-poppins flex items-center hover:opacity-90 transition-opacity focus:outline-none"
        >
          <span className="text-gold">Aka</span>
        </button>
        
        <div className="flex items-center gap-4 md:gap-6">
          {/* System Stats */}
          <div className="hidden md:flex items-center text-xs space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gold" />
              <span>{time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Battery className={cn("h-4 w-4", batteryCharging ? "text-green-500" : "text-gold")} />
              <span>{batteryLevel !== null ? `${batteryLevel}%` : 'N/A'}</span>
            </div>
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-gold" />
            ) : (
              <Moon className="h-5 w-5 text-gray-800" />
            )}
          </button>
          
          {/* Sound Toggle */}
          <button 
            onClick={toggleSound}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sound"
          >
            {isSoundPlaying ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </button>
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="text-sm font-medium px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle language"
          >
            {i18n.language === 'en' ? 'EN' : 'ID'}
          </button>
          
          {/* Admin Login Link */}
          <Link href="/login" className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded bg-gold hover:bg-darkGold text-white transition-all duration-300 ease-in-out transform hover:scale-105">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "px-4 pb-4 md:hidden backdrop-blur-md transition-all duration-300",
        isMobileMenuOpen ? "block" : "hidden",
        theme === 'dark' ? 'bg-black/90' : 'bg-white/90'
      )}>
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <button 
              key={link.href}
              onClick={() => {
                window.location.href = link.href;
                setIsMobileMenuOpen(false);
              }}
              className="py-2 hover:text-gold transition-colors text-left w-full"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex items-center text-xs mt-4 space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-gold" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Battery className={cn("h-4 w-4", batteryCharging ? "text-green-500" : "text-gold")} />
            <span>{batteryLevel !== null ? `${batteryLevel}%` : 'N/A'}</span>
          </div>
        </div>
      </div>
      
      {/* Desktop Menu */}
      <div className={cn(
        "hidden md:block border-t transition-colors",
        theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
      )}>
        <div className="container mx-auto px-4 py-2">
          <ul className="flex justify-center space-x-8 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button 
                  onClick={() => window.location.href = link.href}
                  className="py-2 hover:text-gold transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
