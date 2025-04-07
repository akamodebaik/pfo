import { Link } from 'wouter';
import { useTheme } from './ui/theme-provider';
import { useLanguage } from './ui/language-provider';
import { Moon, Sun, Globe } from 'lucide-react';
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram
} from 'react-icons/fa';

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };
  
  return (
    <footer className="py-16 bg-secondary dark:bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-10 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-playfair font-bold">A</span>
              </div>
              <span className="text-2xl font-playfair font-bold text-foreground">Aka</span>
            </div>
            
            <p className="text-muted-foreground">
              {t('footer.description')}
            </p>
            
            <div className="flex items-center space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-playfair font-bold text-foreground mb-4">{t('footer.quicklinks')}</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.home')}</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</Link></li>
                <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.projects')}</Link></li>
                <li><Link href="/friends" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.friends')}</Link></li>
                <li><Link href="/updates" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.updates')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-playfair font-bold text-foreground mb-4">{t('footer.resources')}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.blog')}</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.docs')}</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.changelog')}</a></li>
                <li><Link href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.admin')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-playfair font-bold text-foreground mb-4">{t('footer.legal')}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.privacy')}</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.terms')}</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">{t('footer.cookies')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            {t('footer.copyright')}
          </p>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span className="text-sm">{t('footer.theme')}</span>
            </button>
            
            <span className="text-muted-foreground/20">|</span>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm">{language === 'en' ? 'English' : 'Indonesia'}</span>
            </button>
            
            <span className="text-muted-foreground/20">|</span>
            
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm">{t('footer.sitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
