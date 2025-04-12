'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Friend } from '@/types';
import { FaGithub } from 'react-icons/fa';

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard({ friend }: FriendCardProps) {
  return (
    <motion.div
      className="card p-6 flex flex-col items-center text-center"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-light-primary dark:border-dark-primary">
        <Image
          src={friend.avatar}
          alt={friend.name}
          fill
          sizes="(max-width: 768px) 6rem, 6rem"
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1">
        {friend.name}
      </h3>
      
      <p className="text-sm text-light-muted dark:text-dark-muted mb-4">
        {friend.role}
      </p>
      
      <a
        href={friend.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm py-2 px-4 rounded-md
                   bg-light-primary/10 dark:bg-dark-primary/10 
                   text-light-primary dark:text-dark-primary
                   hover:bg-light-primary/20 dark:hover:bg-dark-primary/20 
                   transition-colors"
      >
        <FaGithub className="h-4 w-4" />
        <span>GitHub</span>
      </a>
    </motion.div>
  );
}
