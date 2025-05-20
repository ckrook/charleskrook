"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ParallaxBannerProps {
  imageUrl: string;
  altText: string;
  height?: string;
}

export default function ParallaxBanner({
  imageUrl,
  altText,
  height = "h-[400px]",
}: ParallaxBannerProps) {
  const [scrollY, setScrollY] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          setScrollY(window.scrollY);
        }
      }
    };

    // Initial call to set initial position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Negative translateY to move upward as scroll increases
  const translateY = -Math.min(scrollY * 0.2, 80);

  return (
    <div
      ref={bannerRef}
      className={`relative w-full overflow-hidden ${height}`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-zinc-900 z-0" />

      {/* Parallax image with opacity to let gradient show through */}
      <div
        className="absolute inset-0 h-[100%] w-full"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="object-cover opacity-85 mix-blend-overlay"
          priority
        />
      </div>
    </div>
  );
}
