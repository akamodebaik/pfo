"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const prevVolume = useRef(volume)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/audio/background-music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = volume

    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
  }, [volume])

  // Handle mute toggle
  useEffect(() => {
    if (!audioRef.current) return

    if (isMuted) {
      prevVolume.current = volume
      audioRef.current.volume = 0
      setVolume(0)
    } else {
      setVolume(prevVolume.current)
      audioRef.current.volume = prevVolume.current
    }
  }, [isMuted])

  // Update progress
  useEffect(() => {
    if (!audioRef.current) return

    const updateProgress = () => {
      if (!audioRef.current) return
      
      const { currentTime, duration } = audioRef.current
      if (duration) {
        setProgress((currentTime / duration) * 100)
      }
    }

    const interval = setInterval(updateProgress, 1000)

    audioRef.current.addEventListener("ended", () => {
      setIsPlaying(false)
      setProgress(0)
    })

    return () => {
      clearInterval(interval)
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {})
      }
    }
  }, [])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="fixed z-40 bottom-8 left-8">
      {/* Toggle Button */}
      <motion.button
        onClick={toggleVisibility}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle music player"
      >
        <Music className="w-5 h-5" />
      </motion.button>

      {/* Music Player */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute bottom-16 left-0 bg-card border shadow-lg rounded-lg p-4 w-72"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Background Music</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={togglePlay}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Volume slider */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-secondary rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>

              <div className="text-xs text-muted-foreground italic">
                Note: Auto-play may be blocked by your browser.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}