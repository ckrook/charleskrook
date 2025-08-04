"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ImageCarouselProps {
  images: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  }[];
  cardWidth?: number;
  cardHeight?: number;
}

const ImageCarousel = React.memo(
  ({ images, cardWidth = 300, cardHeight = 200 }: ImageCarouselProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const mediasRef = useRef<HTMLDivElement>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
      if (!images || images.length === 0) return;

      const section = sectionRef.current;
      const card = cardRef.current;
      const medias = mediasRef.current;

      if (!section || !card || !medias) return;

      // Setup GSAP quickTo for smoother animations
      const xTo = gsap.quickTo(card, "x", { duration: 1, ease: "power4" });
      const yTo = gsap.quickTo(card, "y", { duration: 1, ease: "power4" });
      const rotationTo = gsap.quickTo(card, "rotation", {
        duration: 1,
        ease: "power4",
      });
      const xToMedias = gsap.quickTo(medias, "xPercent", {
        duration: 0.6,
        ease: "power2",
      });
      const yToMedias = gsap.quickTo(medias, "yPercent", {
        duration: 0.7,
        ease: "power2",
      });

      // Variables to track movement
      let oldPosX = 0;
      let oldPosY = 0;
      let incr = 0;
      let isMoving: NodeJS.Timeout;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const posX = e.clientX - rect.left;
        const posY = e.clientY - rect.top;

        // Move card to follow cursor
        xTo(posX - cardWidth / 2);
        yTo(posY - cardHeight / 2);

        // Calculate movement delta
        const valueX = (posX - oldPosX) / 2;
        const valueY = (posY - oldPosY) / 2;

        // Apply rotation based on movement speed
        rotationTo(valueX / 4);

        // Apply inertia to the media container
        const clampValueX = gsap.utils.clamp(-8, 8, valueX);
        const clampValueY = gsap.utils.clamp(-8, 8, valueY);
        xToMedias(-clampValueX);
        yToMedias(-clampValueY);

        // Reset position when cursor stops
        clearTimeout(isMoving);
        isMoving = setTimeout(() => {
          rotationTo(0);
          xToMedias(0);
          yToMedias(0);
        }, 66);

        // Change image based on cursor movement
        incr += Math.abs(valueX) + Math.abs(valueY);
        if (incr > 300) {
          incr = 0;
          setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }

        // Update old positions
        oldPosX = posX;
        oldPosY = posY;
      };

      // Add event listener
      section.addEventListener("mousemove", handleMouseMove);

      // Clean up
      return () => {
        clearTimeout(isMoving);
        section.removeEventListener("mousemove", handleMouseMove);
      };
    }, [images, cardWidth, cardHeight]);

    // Memoize the image elements to prevent unnecessary re-renders
    const imageElements = useMemo(
      () =>
        images.map((image, index) => (
          <div
            key={index}
            className={`media absolute inset-0 ${
              index === activeImageIndex ? "visible" : "invisible"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt || `Carousel image ${index + 1}`}
              width={image.width}
              height={image.height}
              className="w-full h-full object-cover"
              priority={index === 0} // Only prioritize the first image
            />
          </div>
        )),
      [images, activeImageIndex]
    );

    // If no images, don't render
    if (!images || images.length === 0) return null;

    return (
      <section
        ref={sectionRef}
        className="mwg_effect002 relative w-full h-[400px] overflow-hidden bg-gray-900"
      >
        <div
          ref={cardRef}
          className="card absolute w-[300px] h-[200px] overflow-hidden rounded-lg shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ width: cardWidth, height: cardHeight }}
        >
          <div
            ref={mediasRef}
            className="medias w-full h-full transform scale-[1.2]"
          >
            {imageElements}
          </div>
        </div>
      </section>
    );
  }
);

ImageCarousel.displayName = "ImageCarousel";

export default ImageCarousel;
