import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

export default function Preloader() {
  const { theme } = useTheme();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: 'reverse' as const,
        duration: 0.8,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, rotateY: -90 },
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          variants={logoVariants}
          className="mb-8 inline-block"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gold to-darkGold flex items-center justify-center shadow-xl">
            <span className="text-4xl font-bold text-white">A</span>
          </div>
        </motion.div>

        <div className="mb-6 flex space-x-3 justify-center">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              className="w-3 h-3 rounded-full bg-gold/80"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            />
          ))}
        </div>

        <motion.div variants={textVariants}>
          <p className="text-lg font-medium text-foreground/80">
            Loading Experience
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Please wait while content is being prepared
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}