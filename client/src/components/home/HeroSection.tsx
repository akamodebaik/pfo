import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Eye, Network } from 'lucide-react';
import { fetchIpAddress } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface HeroSectionProps {
  visitorCount: number;
}

export default function HeroSection({ visitorCount }: HeroSectionProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState(t('hero.role1'));
  
  const { data: ipAddress = 'Loading...' } = useQuery({
    queryKey: ['/api/ip-address'],
    queryFn: fetchIpAddress
  });

  // Implement typing effect
  useEffect(() => {
    const phrases = [t('hero.role1'), t('hero.role2')];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }
      
      timeout = setTimeout(type, typingSpeed);
    };
    
    let timeout = setTimeout(type, 1000);
    
    return () => clearTimeout(timeout);
  }, [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="home" className="pt-40 pb-20 min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-full h-full opacity-10 dark:opacity-5">
        <div className="w-96 h-96 rounded-full bg-gold/30 blur-3xl absolute -top-20 -right-20"></div>
        <div className="w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl absolute top-1/2 -left-20"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <motion.div 
            className="w-full md:w-1/2 order-2 md:order-1 mt-10 md:mt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-sm md:text-base uppercase tracking-widest text-gold mb-2"
            >
              {t('hero.welcome')}
            </motion.h2>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-4 text-shadow"
            >
              <span className="block">{t('hero.greeting')}</span>
              <span className="text-gold">{typedText}</span>
            </motion.h1>
            <motion.div 
              variants={itemVariants}
              className="h-1 w-20 bg-gold mb-6"
            ></motion.div>
            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg mb-8 max-w-lg"
            >
              {t('hero.intro')}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#about" 
                className="px-8 py-3 bg-gold hover:bg-darkGold text-white font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {t('hero.discover')}
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {t('hero.contact')}
              </a>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center space-x-1 text-sm"
            >
              <span className="flex items-center">
                <Eye className="h-4 w-4 text-gold mr-2" />
                <span>{visitorCount.toLocaleString()} {t('hero.visitors')}</span>
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Network className="h-4 w-4 text-gold mr-2" />
                <span>{ipAddress}</span>
              </span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.div 
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-gold p-1 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut" 
                }}
              >
                <img 
                  src="https://nauval.mycdn.biz.id/download/1741597554570.jpeg" 
                  alt="Aka's Profile Picture" 
                  className="rounded-full object-cover w-full h-full"
                />
              </motion.div>

            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut" 
          }}
        >
          <a 
            href="#about" 
            className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-gold" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
