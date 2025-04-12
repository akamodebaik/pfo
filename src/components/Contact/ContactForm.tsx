'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ContactFormData } from '@/types';

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    
    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset status after 3 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };
  
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.subtitle')}</p>
      </motion.div>
      
      <div className="max-w-xl mx-auto">
        <motion.div
          className="card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
              {t('common.emailSuccess')}
            </div>
          )}
          
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
              {t('common.emailError')}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t('contact.nameLabel')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder={t('contact.namePlaceholder')}
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'sending'}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t('contact.emailLabel')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder={t('contact.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'sending'}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                {t('contact.messageLabel')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="form-input resize-none"
                placeholder={t('contact.messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'sending'}
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('common.sending') : t('common.submit')}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
