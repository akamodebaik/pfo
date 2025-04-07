import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Github, Linkedin, Twitter, Instagram, Send } from 'lucide-react';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useLanguage } from '@/components/ui/language-provider';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { apiRequest } from '@/lib/queryClient';

export default function ContactSection() {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const leftColRef = useScrollAnimation<HTMLDivElement>();
  const rightColRef = useScrollAnimation<HTMLDivElement>({ delay: 200 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For demo we'll just show a success toast instead of actually sending
      // In a real app, you would call an API endpoint here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Message sent!',
        description: 'Thanks for reaching out. I\'ll get back to you soon.',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Send message error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const bio = portfolioData?.bio;

  return (
    <section id="contact" className="min-h-screen py-20 pt-32 section-snap relative overflow-hidden">
      <div className="absolute top-40 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div 
            ref={leftColRef}
            className="space-y-8 opacity-0"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
              {t('contact.title')} <span className="text-gold-gradient">{t('contact.subtitle')}</span>
            </h2>
            
            <p className="text-lg text-muted-foreground">
              {t('contact.description')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{bio?.location || t('contact.location')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{bio?.email || 'contact@aka.dev'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{bio?.phone || '+62 812 3456 7890'}</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h3 className="text-xl font-playfair font-bold text-foreground mb-4">{t('contact.connect')}</h3>
              
              <div className="flex items-center space-x-6">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-card shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-card shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-card shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-card shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div 
            ref={rightColRef}
            className="bg-card rounded-3xl shadow-md p-8 opacity-0"
          >
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">{t('contact.form.title')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-foreground">
                  {t('contact.form.name')}
                </label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
                  {t('contact.form.email')}
                </label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-foreground">
                  {t('contact.form.subject')}
                </label>
                <Input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-foreground">
                  {t('contact.form.message')}
                </label>
                <Textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Hello, I'd like to talk about..." 
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center space-x-3"
                disabled={isSubmitting}
              >
                <span className="font-montserrat">
                  {isSubmitting ? 'Sending...' : t('contact.form.send')}
                </span>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
