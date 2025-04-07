import { motion } from 'framer-motion';
import { Github, Globe, Linkedin } from 'lucide-react';
import { usePortfolio } from '@/contexts/portfolio-context';
import { useLanguage } from '@/components/ui/language-provider';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function Friends() {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const friends = portfolioData?.friends || [];
  
  // Default friends until we load from API
  const defaultFriends = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Senior Backend Developer',
      description: 'Specializes in scalable APIs and cloud architecture',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      githubLink: '#',
      linkedinLink: '#',
      websiteLink: '#',
      order: 1
    },
    {
      id: 2,
      name: 'Emily Chen',
      role: 'UI/UX Designer',
      description: 'Creates beautiful and intuitive user experiences',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      githubLink: '#',
      linkedinLink: '#',
      websiteLink: '#',
      order: 2
    },
    {
      id: 3,
      name: 'David Rodriguez',
      role: 'Frontend Developer',
      description: 'React expert with a passion for animations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      githubLink: '#',
      linkedinLink: '#',
      websiteLink: '#',
      order: 3
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      role: 'Full-Stack Developer',
      description: 'MERN stack specialist and tech blogger',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      githubLink: '#',
      linkedinLink: '#',
      websiteLink: '#',
      order: 4
    }
  ];
  
  const displayFriends = friends.length > 0 ? friends : defaultFriends;

  return (
    <section id="friends" className="min-h-screen py-20 pt-32 section-snap relative overflow-hidden">
      <div className="absolute top-40 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-60 left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
            {t('friends.title')} <span className="text-gold-gradient">{t('friends.subtitle')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            {t('friends.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-3xl shadow-md overflow-hidden card-hover"
            >
              <div className="flex items-center p-6">
                <div className="w-20 h-20 flex-shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary">
                    <img 
                      src={friend.image}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="ml-6 flex-1">
                  <h3 className="text-xl font-playfair font-bold text-foreground">{friend.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">{friend.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{friend.description}</p>
                  
                  <div className="flex items-center space-x-4">
                    {friend.githubLink && (
                      <a href={friend.githubLink} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    
                    {friend.linkedinLink && (
                      <a href={friend.linkedinLink} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    
                    {friend.websiteLink && (
                      <a href={friend.websiteLink} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
