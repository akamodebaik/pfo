import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getScrollProgress } from '@/lib/utils';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress on scroll
    const handleScroll = () => {
      setProgress(getScrollProgress());
    };

    // Initial check
    handleScroll();

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gold origin-left z-50"
      style={{ scaleX: progress }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress }}
      transition={{ ease: "easeOut" }}
    />
  );
}