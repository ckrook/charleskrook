"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// This component helps debug GSAP animations
// Remove this in production
export const AnimationDebug = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;

    // Log GSAP and ScrollTrigger status
    console.log("GSAP loaded:", !!gsap);
    console.log("ScrollTrigger loaded:", !!ScrollTrigger);
    console.log("ScrollTrigger instances:", ScrollTrigger.getAll().length);

    // Add a simple test animation to verify GSAP is working
    const testElement = document.createElement("div");
    testElement.style.position = "fixed";
    testElement.style.top = "10px";
    testElement.style.right = "10px";
    testElement.style.background = "red";
    testElement.style.color = "white";
    testElement.style.padding = "10px";
    testElement.style.borderRadius = "5px";
    testElement.style.zIndex = "9999";
    testElement.textContent = "GSAP Working!";
    document.body.appendChild(testElement);

    // Animate the test element
    gsap.from(testElement, {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });

    // Remove after 3 seconds
    setTimeout(() => {
      gsap.to(testElement, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        onComplete: () => {
          document.body.removeChild(testElement);
        },
      });
    }, 3000);

    return () => {
      if (document.body.contains(testElement)) {
        document.body.removeChild(testElement);
      }
    };
  }, [isClient]);

  return null;
};

export default AnimationDebug;
