'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FaEye } from 'react-icons/fa';

export default function EyeComfortToggle() {
  const { eyeComfort, toggleEyeComfort } = useTheme();
  
  return (
    <motion.button
      className={`p-2 rounded-full transition-colors ${
        eyeComfort
          ? 'bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary'
          : 'bg-light-border/50 text-light-muted dark:bg-dark-border/50 dark:text-dark-muted'
      }`}
      onClick={toggleEyeComfort}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={eyeComfort ? 'Disable eye comfort mode' : 'Enable eye comfort mode'}
    >
      <FaEye className="h-5 w-5" />
    </motion.button>
  );
}
