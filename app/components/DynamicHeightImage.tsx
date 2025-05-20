"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface DynamicHeightImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function DynamicHeightImage({
  src,
  alt,
  className = "",
}: DynamicHeightImageProps) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    // Function to calculate available height
    const calculateHeight = () => {
      if (typeof window === "undefined") return;

      // Get current scroll position
      const scrollY = window.scrollY;

      // Get total viewport height
      const viewportHeight = window.innerHeight;

      // Get the element's position relative to the viewport
      const element = document.getElementById("dynamic-image-container");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;

      // Calculate available height (viewport height minus element's top position)
      // Subtract a small amount (100px) to provide some padding at the bottom
      const availableHeight = viewportHeight - (rect.top + 100);

      // Set a minimum height
      const minHeight = 300;
      const calculatedHeight = Math.max(availableHeight, minHeight);

      setHeight(calculatedHeight);
    };

    // Calculate initial height
    calculateHeight();

    // Recalculate when window resizes
    window.addEventListener("resize", calculateHeight);
    window.addEventListener("scroll", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
      window.removeEventListener("scroll", calculateHeight);
    };
  }, []);

  return (
    <div
      id="dynamic-image-container"
      className="relative w-full"
      style={{ height: height ? `${height}px` : "300px" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
        className={`object-cover rounded-lg ${className}`}
      />
    </div>
  );
}
