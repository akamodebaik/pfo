"use client"

import { ReactNode, useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"
import MusicPlayer from "@/components/music-player"
import CustomCursor from "@/components/custom-cursor"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const pathname = usePathname()

  // Handle loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <div className="flex min-h-screen flex-col">
            <CustomCursor />
            <Navbar />
            <motion.main
              key={pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="flex-1"
            >
              {children}
            </motion.main>
            <MusicPlayer />
            <Footer />
            
            {showScrollToTop && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 p-2 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </button>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}