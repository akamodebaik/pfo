"use client"

import Link from "next/link"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { Home } from "lucide-react"

export default function NotFound() {
  useEffect(() => {
    // Disable body scroll when component mounts
    document.body.style.overflow = "hidden"
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background overflow-hidden p-4">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-primary/5 rounded-full" />
        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-primary/5 rounded-full" />
      </div>
      
      <div className="w-full max-w-md text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            404
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute inset-0 -z-20 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}