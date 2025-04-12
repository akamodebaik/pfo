'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

export default function NavbarAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio('/audio/background.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    setAudioElement(audio);

    // Cleanup on component unmount
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      className="flex items-center justify-center w-8 h-8 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary"
      onClick={toggleAudio}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isPlaying ? (
        <FaVolumeUp className="w-4 h-4" />
      ) : (
        <FaVolumeMute className="w-4 h-4" />
      )}
    </motion.button>
  );
}