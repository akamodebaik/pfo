"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Don't show custom cursor on mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("clickable")
        
      setIsHovering(isClickable)
    }
    
    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseover", handleMouseOver)
    
    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-primary z-[9999] pointer-events-none mix-blend-difference"
        style={{
          translateX: mousePosition.x - 10, 
          translateY: mousePosition.y - 10
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.5
        }}
      />
      
      {/* Trailing cursor shadow */}
      <motion.div
        className="fixed top-0 left-0 w-40 h-40 rounded-full border border-primary/20 z-[9998] pointer-events-none"
        style={{
          translateX: mousePosition.x - 80, 
          translateY: mousePosition.y - 80
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          mass: 0.8
        }}
      />
      
      {/* Hide default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  )
}