import { useEffect, useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animationClass?: string;
  delay?: number;
}

export default function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): RefObject<T> {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = true,
    animationClass = 'animate-slideUp',
    delay = 0,
  } = options;
  
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add(animationClass);
            element.style.opacity = '1';
          }, delay);
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          element.classList.remove(animationClass);
          element.style.opacity = '0';
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    element.style.opacity = '0';
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once, animationClass, delay]);
  
  return ref;
}
