import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X, Lock } from 'lucide-react';
import { useTheme } from './ui/theme-provider';
import { useLanguage } from './ui/language-provider';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu on location change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/projects', label: t('nav.projects') },
    { href: '/friends', label: t('nav.friends') },
    { href: '/updates', label: t('nav.updates') },
  ];
  
  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'shadow-sm' : ''
    }`}>
      <div className="py-4 px-6 md:px-8 bg-background/80 dark:bg-card/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-playfair font-bold">A</span>
            </div>
            <span className="text-xl font-playfair font-bold text-foreground">Aka</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className={`font-montserrat font-medium text-foreground hover:text-primary transition-colors ${
                  location === item.href ? 'nav-active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors cursor-magnetic"
              aria-label="Toggle language"
            >
              <span className="text-xs font-montserrat font-medium">{language.toUpperCase()}</span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors cursor-magnetic"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-foreground" />
              ) : (
                <Moon className="h-4 w-4 text-foreground" />
              )}
            </button>
            
            <Link 
              href="/admin/login"
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-full transition-all shadow-sm hover:shadow-md cursor-magnetic"
            >
              <Lock className="h-4 w-4" />
              <span className="text-sm font-montserrat">{t('nav.admin')}</span>
            </Link>
            
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background dark:bg-card absolute w-full left-0 top-full shadow-lg overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 text-foreground hover:text-primary font-montserrat font-medium transition-colors ${
                    location === item.href ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/admin/login" 
                className="block py-2 text-foreground hover:text-primary font-montserrat font-medium transition-colors"
              >
                {t('nav.admin')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
