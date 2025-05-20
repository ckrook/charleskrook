"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DynamicMobileImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function DynamicMobileImage({
  src,
  alt,
  className = "",
}: DynamicMobileImageProps) {
  const [imageHeight, setImageHeight] = useState(300);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate and set image height on load and resize
    const calculateHeight = () => {
      if (typeof window === "undefined" || !imageRef.current) return;

      // Get viewport height
      const viewportHeight = window.innerHeight;

      // Get the current position of the top of our image container
      const rect = imageRef.current.getBoundingClientRect();
      const topPosition = rect.top;

      // Calculate available height (viewport height minus position from top)
      // Subtract some padding for bottom margin
      const availableHeight = viewportHeight - topPosition - 40;

      // Set minimum height
      const minHeight = 300;

      // Set the height to the maximum of available height or minimum height
      setImageHeight(Math.max(availableHeight, minHeight));
    };

    // Initial calculation
    calculateHeight();

    // Add event listeners for resize and orientation change
    window.addEventListener("resize", calculateHeight);
    window.addEventListener("orientationchange", calculateHeight);

    // Small timeout to ensure everything is rendered correctly
    const timeout = setTimeout(calculateHeight, 100);

    return () => {
      window.removeEventListener("resize", calculateHeight);
      window.removeEventListener("orientationchange", calculateHeight);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={imageRef}
      className="relative w-full"
      style={{ height: `${imageHeight}px` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover rounded-lg ${className}`}
        priority
      />
    </div>
  );
}
