import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

  return (
    <section id="about" className="py-20 relative" ref={sectionRef}>
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
            {t('about.subtitle')}
          </motion.h2>
          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-poppins"
          >
            {t('about.title')}
          </motion.h3>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-gold mx-auto my-4"
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full h-80 rounded-lg overflow-hidden gradient-border">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                  alt="Programming" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 bg-white dark:bg-darkCard rounded-lg shadow-lg w-40 hidden md:block">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('about.experience')}</p>
                  <p className="text-2xl font-bold text-gold">{t('about.experienceTime')}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4 font-poppins">
              {t('about.intro')} <span className="text-gold">Aka</span>
            </h3>
            <p className="mb-6">
              {t('about.content1')}
            </p>
            <p className="mb-6">
              {t('about.content2')}
            </p>
            <p className="mb-8">
              {t('about.content3')}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-semibold mb-2">{t('about.name')}</h4>
                <p>Aka</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('about.from')}</h4>
                <p>West Sumatra, Indonesia</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('about.age')}</h4>
                <p>15 years</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">{t('about.status')}</h4>
                <p>Junior High School Student</p>
              </div>
            </div>
            
            <motion.div 
              className="p-4 bg-gold/10 border-l-4 border-gold rounded"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <p className="italic text-gold">
                {t('about.quote')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
