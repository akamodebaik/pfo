"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Web Developer | UI Designer | Problem Solver"
  
  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0
    let interval: NodeJS.Timeout

    const typeText = () => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }

    interval = setInterval(typeText, 100)
    
    return () => clearInterval(interval)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-primary/5 rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-3/4 h-1/2 bg-primary/5 rounded-tl-full" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-16 md:pt-32 md:pb-32">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <div className="order-2 md:order-1">
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Welcome to my portfolio
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Aka
              </span>
            </motion.h1>
            
            <motion.div variants={itemVariants}>
              <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-2 h-8">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-xl"
            >
              A passionate developer from West Sumatra, Indonesia. I craft beautiful,
              functional websites and applications with attention to detail and user experience.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                About Me
              </Link>
            </motion.div>
          </div>
          
          {/* Hero image */}
          <motion.div 
            className="order-1 md:order-2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-primary to-primary/40 rounded-full flex items-center justify-center">
              <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    A
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}