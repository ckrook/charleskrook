"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const [translateY, setTranslateY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);
  const isLowEndDevice = useRef(false);

  // Throttled scroll handler using requestAnimationFrame for performance
  const handleScroll = useCallback(() => {
    lastScrollY.current = window.scrollY;

    if (!ticking.current && !isLowEndDevice.current) {
      window.requestAnimationFrame(() => {
        if (bannerRef.current) {
          const rect = bannerRef.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

          if (isVisible) {
            // Negative translateY to move upward as scroll increases
            const newTranslateY = -Math.min(lastScrollY.current * 0.2, 80);
            setTranslateY(newTranslateY);
          }
        }
        ticking.current = false;
      });

      ticking.current = true;
    }
  }, []);

  const updateViewportHeight = useCallback(() => {
    setViewportHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    // Check if device might be low-end (simple heuristic)
    try {
      const navigator = window.navigator as any;
      const deviceMemory = navigator.deviceMemory;
      const connection = navigator.connection;

      if (
        (deviceMemory && deviceMemory <= 2) ||
        (connection &&
          (connection.effectiveType === "slow-2g" ||
            connection.effectiveType === "2g"))
      ) {
        isLowEndDevice.current = true;
      }
    } catch (e) {
      // If we can't detect, assume it's not a low-end device
      isLowEndDevice.current = false;
    }

    // Initial calls to set initial values
    handleScroll();
    updateViewportHeight();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, [handleScroll, updateViewportHeight]);

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

      {/* Parallax image with opacity to let gradient show through */}
      <div
        className="absolute inset-0 h-[100%] w-full"
        style={{
          transform: `translateY(${isLowEndDevice.current ? 0 : translateY}px)`,
          willChange: isLowEndDevice.current ? "auto" : "transform",
        }}
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
