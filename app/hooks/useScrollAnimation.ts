"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  fallbackDelay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    fallbackDelay = 1000,
  } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) {
          setHasTriggered(true);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef || hasTriggered) return;

    // Create intersection observer with error handling
    let observer: IntersectionObserver | null = null;

    try {
      observer = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });

      observer.observe(currentRef);
    } catch (error) {
      console.warn(
        "IntersectionObserver not supported, using fallback:",
        error
      );
      // Fallback for browsers that don't support IntersectionObserver
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasTriggered(true);
      }, fallbackDelay);

      return () => clearTimeout(timer);
    }

    return () => {
      if (observer && currentRef) {
        observer.unobserve(currentRef);
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin, handleIntersection, hasTriggered, fallbackDelay]);

  return { ref, isVisible };
};
