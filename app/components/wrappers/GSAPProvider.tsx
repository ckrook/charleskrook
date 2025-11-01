"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPProviderProps {
  children: React.ReactNode;
}

export const GSAPProvider = ({ children }: GSAPProviderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);

    // Initialize ScrollTrigger only on client
    if (typeof window !== "undefined") {
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });

      // Refresh ScrollTrigger after component mount
      ScrollTrigger.refresh();
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined") {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  // Prevent hydration mismatch by not rendering GSAP-dependent content on server
  if (!isClient) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

export default GSAPProvider;
