import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skillsData';
import { useTheme } from '@/hooks/useTheme';
import { SkillIcon } from '@/components/icons/SkillIcons';

export default function SkillsSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
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

  const skillCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.1 * i
      }
    }),
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <section 
      id="skills" 
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
            {t('skills.subtitle')}
          </motion.h2>
          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-poppins"
          >
            {t('skills.title')}
          </motion.h3>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-gold mx-auto my-4"
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              custom={index}
              variants={skillCardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover="hover"
              className={`p-6 rounded-lg shadow-md ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg ${theme === 'dark' ? skill.bgDark : skill.bgLight} flex items-center justify-center mr-4`}>
                  <div className={`h-6 w-6 ${skill.iconColor}`}>
                    <SkillIcon iconKey={skill.iconKey} />
                  </div>
                </div>
                <h4 className="text-xl font-semibold">{skill.name}</h4>
              </div>
              <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
                <motion.div 
                  className={`${skill.barColor} h-2.5 rounded-full`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                ></motion.div>
              </div>
              <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
