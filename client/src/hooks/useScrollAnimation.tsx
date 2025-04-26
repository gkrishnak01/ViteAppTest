import { useEffect, useState, useRef } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  once?: boolean;
}

export const useScrollAnimation = ({ 
  threshold = 0.1, 
  once = true 
}: UseScrollAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, once]);

  return { ref, isVisible };
};

export default useScrollAnimation;
