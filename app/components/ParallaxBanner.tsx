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
  height = "h-[400px] md:h-[400px]",
}: ParallaxBannerProps) {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
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

    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    // Initial calls to set initial values
    handleScroll();
    updateViewportHeight();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  // Reduce parallax effect and limit the maximum movement
  const translateY = -Math.min(scrollY * 0.1, 40);

  return (
    <div
      ref={bannerRef}
      className={`relative w-full overflow-hidden ${height}`}
      style={{
        height:
          viewportHeight > 0 && window.innerWidth < 768
            ? `${Math.min(viewportHeight * 0.7, 1000)}px`
            : undefined,
      }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 to-zinc-900 z-0" />

      {/* Parallax image with extra height to prevent showing background */}
      <div
        className="absolute inset-0 h-[120%] w-full"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <Image
          src={imageUrl}
          alt={altText}
          fill
          unoptimized
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
