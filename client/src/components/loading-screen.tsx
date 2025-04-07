import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useLanguage } from './ui/language-provider';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  const [progress, setProgress] = useState(10);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  
  const loadingPhrases = portfolioData?.settings?.loadingPhrases || [
    "Preparing greatness...",
    "Loading Aka's energy...",
    "Crafting premium experience...",
    "Polishing the interface...",
    "Arranging the pixels...",
    "Charging creative powers...",
    "Setting up workspace...",
    "Collecting inspirations...",
    "Brewing code magic..."
  ];

  useEffect(() => {
    let phraseInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    
    // Change phrase every 2 seconds
    phraseInterval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2000);
    
    // Update progress
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 15) + 5;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress === 100) {
          clearInterval(progressInterval);
          
          // When progress is 100%, show the loader for a bit longer then fade out
          setTimeout(() => {
            setVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 500);
        }
        
        return newProgress;
      });
    }, 500);
    
    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, [loadingPhrases.length, onLoadingComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-40 relative mb-8">
              <div className="absolute inset-0 rounded-full border-[3px] border-primary/30"></div>
              <motion.div 
                className="absolute inset-0 rounded-full border-[3px] border-primary border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-playfair text-primary font-bold">Aka</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhraseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-montserrat text-foreground font-medium text-center px-8 min-h-[2em]"
              >
                {loadingPhrases[currentPhraseIndex]}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 w-40 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full shimmer"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
