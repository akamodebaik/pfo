import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  return { ref, isInView };
};

export const useMagneticEffect = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = Math.floor((e.clientX - centerX) * 0.3);
      const deltaY = Math.floor((e.clientY - centerY) * 0.3);
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return ref;
};

export const useGreeting = () => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting('hero.greeting.morning');
      } else if (hour >= 12 && hour < 18) {
        setGreeting('hero.greeting.afternoon');
      } else if (hour >= 18 && hour < 22) {
        setGreeting('hero.greeting.evening');
      } else {
        setGreeting('hero.greeting.night');
      }
    };
    
    updateGreeting();
    
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return greeting;
};

export const useRippleEffect = (color = 'rgba(255, 255, 255, 0.3)') => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.backgroundColor = color;
      
      element.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };
    
    element.addEventListener('click', handleClick);
    
    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, [color]);
  
  return ref;
};
