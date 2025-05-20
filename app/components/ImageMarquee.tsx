"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ImageMarqueeProps = {
  images?: string[];
  defaultImages?: boolean;
};

export default function ImageMarquee({
  images = [],
  defaultImages = true,
}: ImageMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use default images if none are provided
  const displayImages =
    defaultImages && images.length === 0
      ? Array.from({ length: 5 }).map((_, i) => `/img${i + 1}.png`)
      : images;

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
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        ref={marqueeRef}
        className="flex absolute top-1/2 transform -translate-y-3/4 space-x-4"
      >
        {displayImages.map((src, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={src}
              alt={`Marquee image ${index + 1}`}
              width={800}
              height={800}
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
