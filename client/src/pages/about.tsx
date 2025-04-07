import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Code } from 'lucide-react';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useLanguage } from '@/components/ui/language-provider';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function About() {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  
  const imageRef = useScrollAnimation<HTMLDivElement>();
  const contentRef = useScrollAnimation<HTMLDivElement>();
  
  const bio = portfolioData?.bio;
  const skills = portfolioData?.skills || [];
  const interests = portfolioData?.interests || [];

  // These are required for our initial load before we get data from the API
  const defaultSkills = [
    { id: 1, name: 'React', icon: 'react', category: 'frontend' },
    { id: 2, name: 'Node.js', icon: 'node-js', category: 'backend' },
    { id: 3, name: 'TypeScript', icon: 'typescript', category: 'language' },
    { id: 4, name: 'TailwindCSS', icon: 'tailwind', category: 'styling' },
    { id: 5, name: 'MongoDB', icon: 'mongodb', category: 'database' },
    { id: 6, name: 'Git', icon: 'git', category: 'tools' },
  ];
  
  const defaultInterests = [
    { id: 1, name: 'Web Development', icon: 'code' },
    { id: 2, name: 'Hiking', icon: 'mountain' },
    { id: 3, name: 'Reading', icon: 'book' },
    { id: 4, name: 'Photography', icon: 'camera' },
  ];

  // Function to get appropriate icon for a skill or interest
  const getIconClass = (iconName: string) => {
    // Map icon names to classes
    const iconMap: Record<string, string> = {
      'react': 'fab fa-react',
      'node-js': 'fab fa-node-js',
      'typescript': 'fab fa-js',
      'tailwind': 'fab fa-css3',
      'mongodb': 'fas fa-database',
      'git': 'fab fa-github',
      'code': 'fas fa-laptop-code',
      'mountain': 'fas fa-mountain',
      'book': 'fas fa-book',
      'camera': 'fas fa-camera',
    };
    
    return iconMap[iconName] || 'fas fa-star';
  };

  return (
    <section id="about" className="min-h-screen py-20 pt-32 section-snap relative overflow-hidden">
      <div className="absolute top-40 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <motion.div 
            ref={imageRef} 
            className="w-full md:w-5/12 relative opacity-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-32">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/20 z-0"></div>
                <img 
                  src={bio?.workspaceImage}
                  alt="Aka's workspace" 
                  className="w-full aspect-[4/5] object-cover rounded-3xl shadow-md relative z-10"
                />
              </div>
              
              <div className="mt-8 p-6 bg-card rounded-2xl shadow-md">
                <h3 className="text-xl font-playfair font-bold text-foreground mb-4">{t('about.quickfacts')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('about.location')}</p>
                      <p className="font-medium text-foreground">{bio?.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('about.education')}</p>
                      <p className="font-medium text-foreground">{bio?.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('about.experience')}</p>
                      <p className="font-medium text-foreground">{bio?.experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            ref={contentRef}
            className="w-full md:w-7/12 opacity-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              {t('about.title')} <span className="text-gold-gradient">{t('about.me')}</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              {bio?.longDescription.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg">{paragraph}</p>
              ))}
              
              <div className="pt-6">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">{t('about.skills')}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(skills.length > 0 ? skills : defaultSkills).map((skill) => (
                    <div key={skill.id} className="p-4 bg-secondary dark:bg-secondary rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <i className={getIconClass(skill.icon)}></i>
                        </div>
                        <span className="font-medium text-foreground">{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">{t('about.interests')}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(interests.length > 0 ? interests : defaultInterests).map((interest) => (
                    <div key={interest.id} className="p-4 bg-secondary dark:bg-secondary rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <i className={getIconClass(interest.icon)}></i>
                        </div>
                        <span className="font-medium text-foreground">{interest.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
