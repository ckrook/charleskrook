"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  trigger?: string;
  once?: boolean;
  start?: string;
  end?: string;
}

interface FadeInOnScrollContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  y?: number;
  trigger?: string;
  once?: boolean;
  start?: string;
  end?: string;
}

/**
 * FadeInOnScroll - A reusable component for fade-in animations from bottom
 *
 * @param children - The content to animate
 * @param className - Additional CSS classes
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.8)
 * @param y - Y offset for the animation (default: 50)
 * @param stagger - Stagger delay between multiple items (default: 0.1)
 * @param trigger - ScrollTrigger element selector (default: "self")
 * @param once - Whether to trigger animation only once (default: true)
 * @param start - ScrollTrigger start position (default: "top 80%")
 * @param end - ScrollTrigger end position (default: "bottom 20%")
 */
export const FadeInOnScroll = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 30,
  stagger = 0.1,
  trigger = "self",
  once = true,
  start = "top 85%",
  end = "bottom 15%",
}: FadeInOnScrollProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !elementRef.current || typeof window === "undefined")
      return;

    const element = elementRef.current;
    const isSelf = trigger === "self";

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: y,
    });

    // Create animation
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      ease: "power2.out",
    });

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: isSelf ? element : trigger,
      start: start,
      end: end,
      once: once,
      animation: animation,
    });

    // Refresh ScrollTrigger to ensure proper initialization
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      scrollTrigger.kill();
      animation.kill();
    };
  }, [isClient, delay, duration, y, stagger, trigger, once, start, end]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={
        !isClient
          ? {
              opacity: 0,
              transform: `translateY(${y}px)`,
              visibility: "hidden",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

/**
 * FadeInOnScrollContainer - A container component for staggered animations
 *
 * Use this when you have multiple items that should animate in sequence
 *
 * @param children - The content to animate (should contain multiple elements)
 * @param className - Additional CSS classes
 * @param stagger - Stagger delay between items (default: 0.1)
 * @param delay - Base animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.8)
 * @param y - Y offset for the animation (default: 50)
 * @param trigger - ScrollTrigger element selector (default: "self")
 * @param once - Whether to trigger animation only once (default: true)
 * @param start - ScrollTrigger start position (default: "top 80%")
 * @param end - ScrollTrigger end position (default: "bottom 20%")
 */
export const FadeInOnScrollContainer = ({
  children,
  className = "",
  stagger = 0.15,
  delay = 0,
  duration = 0.6,
  y = 30,
  trigger = "self",
  once = true,
  start = "top 85%",
  end = "bottom 15%",
}: FadeInOnScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || typeof window === "undefined")
      return;

    const container = containerRef.current;
    const children = container.children;
    const isSelf = trigger === "self";

    // Set initial state for all children
    gsap.set(children, {
      opacity: 0,
      y: y,
    });

    // Create staggered animation
    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
      stagger: stagger,
      ease: "power2.out",
    });

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: isSelf ? container : trigger,
      start: start,
      end: end,
      once: once,
      animation: animation,
    });

    // Refresh ScrollTrigger to ensure proper initialization
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      scrollTrigger.kill();
      animation.kill();
    };
  }, [isClient, delay, duration, y, stagger, trigger, once, start, end]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={
        !isClient
          ? {
              opacity: 0,
              transform: `translateY(${y}px)`,
              visibility: "hidden",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

// Export both components as default
export default FadeInOnScroll;
