import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';
import { usePortfolio } from '@/contexts/portfolio-context';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from './ui/language-provider';

export default function MusicPlayer() {
  const { portfolioData } = usePortfolio();
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const musicFile = portfolioData?.settings?.musicFile || '/music/background.mp3';
  const musicTitle = portfolioData?.settings?.musicTitle || 'Elegant Atmosphere';

  useEffect(() => {
    // Show music player after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Set volume
    audio.volume = volume / 100;
    
    // Play/pause control
    if (isPlaying) {
      audio.play().catch(e => {
        console.error('Failed to play audio:', e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
    
    // Cleanup
    return () => {
      audio.pause();
    };
  }, [isPlaying, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-4 w-4" />;
    if (volume < 50) return <Volume1 className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src={musicFile} type="audio/mpeg" />
      </audio>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 left-6 z-40 transform transition-all duration-300 opacity-90 hover:opacity-100"
          >
            <div className="music-player-bottom p-3 rounded-full shadow-md flex items-center gap-2">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              
              <div className="music-info hidden md:block">
                <p className="text-sm font-medium text-foreground">{t('music.title')}</p>
                <p className="text-xs text-muted-foreground">{musicTitle}</p>
              </div>
              
              <div className="music-controls flex items-center gap-2">
                <span className="hidden md:block">{getVolumeIcon()}</span>
                <Slider
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-16 md:w-24 h-1"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
