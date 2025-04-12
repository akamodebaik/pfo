'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FloatingLogo() {
  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
    >
      <Link href="/" passHref>
        <motion.div
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-bold text-xl shadow-xl backdrop-blur-sm cursor-pointer"
          style={{ 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: -5,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          N
        </motion.div>
      </Link>
    </motion.div>
  );
}