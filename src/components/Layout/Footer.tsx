'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/50 dark:bg-dark-background/50 py-8 border-t border-light-border dark:border-dark-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-light-primary dark:text-dark-primary"
                viewBox="0 0 100 100"
              >
                <path
                  d="M30,20 L50,10 L70,20 L70,65 L50,75 L30,65 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M30,20 L50,30 L70,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  d="M50,30 L50,75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
              <span className="font-bold text-xl text-light-text dark:text-dark-text">
                Aka
              </span>
            </Link>
            <p className="text-light-muted dark:text-dark-muted mb-4">
              {t('common.madeWith')}
            </p>
            
            {/* Donation Links */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://saweria.co/akadev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="sr-only">Saweria</span>
              </a>
              <a
                href="https://trakteer.id/akadev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="sr-only">Trakteer</span>
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-light-text dark:text-dark-text">
              {t('nav.home')}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('social')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-light-muted dark:text-dark-muted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  {t('nav.social')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('friends')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-light-muted dark:text-dark-muted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  {t('nav.friends')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-light-muted dark:text-dark-muted hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  {t('nav.projects')}
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-light-text dark:text-dark-text">
              {t('contact.title')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-light-muted dark:text-dark-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:contact@akadev.com"
                  className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  contact@akadev.com
                </a>
              </li>
              <li className="flex items-center text-light-muted dark:text-dark-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
                <a
                  href="https://github.com/akadev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                >
                  github.com/akadev
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border text-center text-light-muted dark:text-dark-muted">
          <p>© {currentYear} Aka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
