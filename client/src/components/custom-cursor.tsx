import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorEnlarged, setCursorEnlarged] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Only show cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
    }
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add event listeners to magnetic elements for cursor size change
    const handleElementEnter = () => setCursorEnlarged(true);
    const handleElementLeave = () => setCursorEnlarged(false);
    
    const magneticElements = document.querySelectorAll('.cursor-magnetic');
    
    magneticElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementEnter);
      element.addEventListener('mouseleave', handleElementLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      magneticElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementEnter);
        element.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-primary/30 pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorEnlarged ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.1,
          stiffness: 150,
          damping: 15,
          scale: { duration: 0.15 },
          opacity: { duration: 0.2 }
        }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      <motion.div
        className="fixed w-3 h-3 rounded-full bg-primary pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          mass: 0.1,
          stiffness: 300,
          damping: 15,
          opacity: { duration: 0.2 }
        }}
        style={{
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
