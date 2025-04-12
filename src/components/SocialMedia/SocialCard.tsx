'use client';

import { motion } from 'framer-motion';
import { SocialMedia } from '@/types';
import { 
  FaWhatsapp, FaTiktok, FaYoutube, FaGithub, 
  FaInstagram, FaTelegram, FaDiscord, FaLinkedin 
} from 'react-icons/fa';

interface SocialCardProps {
  social: SocialMedia;
}

export default function SocialCard({ social }: SocialCardProps) {
  // Get the appropriate icon based on the icon name
  const getIcon = () => {
    switch (social.icon) {
      case 'whatsapp':
        return <FaWhatsapp className="h-7 w-7" />;
      case 'tiktok':
        return <FaTiktok className="h-7 w-7" />;
      case 'youtube':
        return <FaYoutube className="h-7 w-7" />;
      case 'github':
        return <FaGithub className="h-7 w-7" />;
      case 'instagram':
        return <FaInstagram className="h-7 w-7" />;
      case 'telegram':
        return <FaTelegram className="h-7 w-7" />;
      case 'discord':
        return <FaDiscord className="h-7 w-7" />;
      case 'linkedin':
        return <FaLinkedin className="h-7 w-7" />;
      default:
        return <FaGithub className="h-7 w-7" />;
    }
  };
  
  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-6 flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      style={{ 
        borderTop: `3px solid ${social.color}`,
        background: `linear-gradient(to bottom, ${social.color}10, transparent)`
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className="h-16 w-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${social.color}20` }}
      >
        <div style={{ color: social.color }}>
          {getIcon()}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text">
        {social.name}
      </h3>
      
      <div 
        className="mt-4 text-xs py-1 px-3 rounded-full"
        style={{ backgroundColor: `${social.color}20`, color: social.color }}
      >
        Follow
      </div>
    </motion.a>
  );
}
