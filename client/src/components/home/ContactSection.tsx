import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter, Github } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Thank you for your message! I will get back to you soon.",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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

  return (
    <section id="contact" className="py-20 relative" ref={sectionRef}>
      <div className="absolute top-0 left-0 -z-10 w-full h-full opacity-10 dark:opacity-5">
        <div className="w-96 h-96 rounded-full bg-gold/30 blur-3xl absolute -bottom-20 -right-20"></div>
        <div className="w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl absolute -top-20 -left-20"></div>
      </div>
      
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
            {t('contact.subtitle')}
          </motion.h2>
          <motion.h3 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-poppins"
          >
            {t('contact.title')}
          </motion.h3>
          <motion.div 
            variants={itemVariants}
            className="h-1 w-20 bg-gold mx-auto my-4"
          ></motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}>
              <h4 className="text-xl font-bold mb-4">{t('contact.formTitle')}</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label 
                    className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} 
                    htmlFor="name"
                  >
                    {t('contact.name')}
                  </label>
                  <input 
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'border-gray-300'
                    }`}
                    id="name" 
                    type="text" 
                    placeholder={t('contact.name')}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label 
                    className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} 
                    htmlFor="email"
                  >
                    {t('contact.email')}
                  </label>
                  <input 
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'border-gray-300'
                    }`}
                    id="email" 
                    type="email" 
                    placeholder={t('contact.email')}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label 
                    className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} 
                    htmlFor="subject"
                  >
                    {t('contact.subject')}
                  </label>
                  <input 
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'border-gray-300'
                    }`}
                    id="subject" 
                    type="text" 
                    placeholder={t('contact.subject')}
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-6">
                  <label 
                    className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} 
                    htmlFor="message"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea 
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold h-32 resize-none ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'border-gray-300'
                    }`}
                    id="message" 
                    placeholder={t('contact.message')}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-darkGold text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('contact.send')}
                </motion.button>
              </form>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-6">
              <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}>
                <h4 className="text-xl font-bold mb-4">{t('contact.infoTitle')}</h4>
                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('contact.infoContent')}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4">
                      <MapPin className="text-gold h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">{t('contact.location')}</h5>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        West Sumatra, Indonesia
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4">
                      <Mail className="text-gold h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">Email</h5>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        contact@aka.dev
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4">
                      <Phone className="text-gold h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="font-medium">{t('contact.phone')}</h5>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        +62 888 XXX XXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-darkCard' : 'bg-white'}`}>
                <h4 className="text-xl font-bold mb-4">{t('contact.followTitle')}</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
