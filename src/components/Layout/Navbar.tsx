'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/UI/ThemeSwitcher';
import LanguageSwitcher from '@/components/UI/LanguageSwitcher';
import EyeComfortToggle from '@/components/UI/EyeComfortToggle';
import NavbarAudioToggle from '@/components/UI/NavbarAudioToggle';
import { scrollToElement } from '@/utils/helpers';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle navigation click
  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollToElement(id);
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-white/90 dark:bg-dark-background/90 shadow-md backdrop-blur-md'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Aka"
              width={40}
              height={40}
              className="mr-2"
              sizes="40px"
              priority
            />
            <span className="font-bold text-xl text-light-text dark:text-dark-text">
              Aka
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick('home')}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => handleNavClick('social')}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {t('nav.social')}
            </button>
            <button
              onClick={() => handleNavClick('friends')}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {t('nav.friends')}
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {t('nav.projects')}
            </button>
            <button
              onClick={() => handleNavClick('updates')}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {t('nav.updates')}
            </button>
            <button
              onClick={() => handleNavClick('more')}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {t('nav.more')}
            </button>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <NavbarAudioToggle />
            <LanguageSwitcher />
            <ThemeSwitcher />
            <EyeComfortToggle />
            
            {isAuthenticated ? (
              <Link
                href="/admin/dashboard"
                className="btn-primary hidden md:block"
              >
                {t('common.admin')}
              </Link>
            ) : (
              <Link
                href="/admin"
                className="btn-primary hidden md:block"
              >
                {t('common.login')}
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-md text-light-text dark:text-dark-text md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-white dark:bg-dark-background rounded-md shadow-lg">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick('home')}
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => handleNavClick('social')}
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {t('nav.social')}
              </button>
              <button
                onClick={() => handleNavClick('friends')}
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {t('nav.friends')}
              </button>
              <button
                onClick={() => handleNavClick('projects')}
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {t('nav.projects')}
              </button>
              <button
                onClick={() => handleNavClick('updates')}
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {t('nav.updates')}
              </button>
              <button
                onClick={() => handleNavClick('more')}
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {t('nav.more')}
              </button>
              
              {isAuthenticated ? (
                <Link
                  href="/admin/dashboard"
                  className="btn-primary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('common.admin')}
                </Link>
              ) : (
                <Link
                  href="/admin"
                  className="btn-primary text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('common.login')}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
