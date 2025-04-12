'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface WelcomePopupProps {
  show: boolean;
  onClose: () => void;
}

export default function WelcomePopup({ show, onClose }: WelcomePopupProps) {
  const { t } = useLanguage();
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Popup content */}
          <motion.div
            className="relative bg-white dark:bg-dark-background rounded-lg shadow-xl p-6 max-w-md w-full text-center z-10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Stone emoji */}
            <div className="text-6xl mb-4">🗿</div>
            
            {/* Welcome message */}
            <h2 className="text-xl font-medium text-light-text dark:text-dark-text mb-4">
              {t('common.welcomePopup')}
            </h2>
            
            {/* Close button */}
            <button
              className="mt-4 px-4 py-2 bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary rounded-md hover:bg-light-primary/20 dark:hover:bg-dark-primary/20 transition-colors"
              onClick={onClose}
            >
              {t('common.close')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
