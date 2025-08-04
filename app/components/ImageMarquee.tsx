"use client";

import React, { useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageMarqueeProps {
  images?: string[];
  defaultImages?: boolean;
}

const ImageMarquee = React.memo(
  ({ images = [], defaultImages = true }: ImageMarqueeProps) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Memoize the display images to prevent unnecessary re-computation
    const displayImages = useMemo(() => {
      if (defaultImages && images.length === 0) {
        return Array.from({ length: 5 }).map((_, i) => `/img${i + 1}.png`);
      }
      return images;
    }, [images, defaultImages]);

    useEffect(() => {
      if (!marqueeRef.current || !containerRef.current) return;

      const marquee = marqueeRef.current;
      const container = containerRef.current;

      // Calculate the width of the marquee content
      const marqueeWidth = marquee.scrollWidth;

      // Create the horizontal scroll animation
      const horizontalScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: `+=${marqueeWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate the marquee's x position
      horizontalScrollTimeline.to(marquee, {
        x: -marqueeWidth + window.innerWidth,
        ease: "none",
        duration: 1,
      });

      // Clean up ScrollTrigger when component unmounts
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }, [displayImages]);

    // Memoize the image elements for better performance
    const imageElements = useMemo(
      () =>
        displayImages.map((src, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={src}
              alt={`Marquee image ${index + 1}`}
              width={800}
              height={800}
              className="object-cover rounded-lg"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        )),
      [displayImages]
    );

    return (
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div
          ref={marqueeRef}
          className="flex absolute top-1/2 transform -translate-y-3/4 space-x-4"
        >
          {imageElements}
        </div>
      </div>
    );
  }
);

ImageMarquee.displayName = "ImageMarquee";

export default ImageMarquee;
