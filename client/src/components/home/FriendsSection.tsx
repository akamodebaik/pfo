import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { friendsData } from '@/data/friendsData';
import { useTheme } from '@/hooks/useTheme';

export default function FriendsSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const friendsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const scrollLeft = () => {
    if (friendsContainerRef.current) {
      friendsContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (friendsContainerRef.current) {
      friendsContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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

  const friendCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.1 * i
      }
    }),
    hover: { 
      y: -5,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <section 
      id="friends" 
      className={`py-20 ${theme === 'dark' ? 'bg-darkBg/50' : 'bg-gray-50'}`}
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-sm md:text-base uppercase tracking-widest text-gold mb-2"
          >
            {t('friends.subtitle')}
          </motion.h2>
          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-poppins"
          >
            {t('friends.title')}
          </motion.h3>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-gold mx-auto my-4"
          ></motion.div>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={scrollLeft}
              className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </motion.div>
          
          <motion.div 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={scrollRight}
              className={`w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
          
          <div 
            ref={friendsContainerRef}
            className="flex overflow-x-auto no-scrollbar gap-6 pb-4 snap-x snap-mandatory"
          >
            {friendsData.map((friend, index) => (
              <motion.div
                key={friend.id}
                custom={index}
                variants={friendCardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                className={`min-w-[280px] md:min-w-[340px] rounded-xl shadow-lg snap-start ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}
              >
                <div className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gold">
                    <img 
                      src={friend.image} 
                      alt={friend.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-1">{friend.name}</h4>
                  <p className="text-gold text-sm mb-3">{friend.role}</p>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {friend.description}
                  </p>
                  <div className="flex justify-center">
                    {friend.social.tiktok && (
                      <a 
                        href={friend.social.tiktok} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-pink-500 hover:text-pink-600 transition-colors"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 448 512">
                          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                        </svg>
                      </a>
                    )}
                    {friend.social.github && (
                      <a 
                        href={friend.social.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} transition-colors`}
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
