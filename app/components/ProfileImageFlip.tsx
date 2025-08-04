"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileImageFlipProps {
  frontImage: string;
  backImage?: string;
  alt: string;
  onFlip?: (isFlipped: boolean) => void;
}

const ProfileImageFlip = React.memo(
  ({ frontImage, backImage, alt, onFlip }: ProfileImageFlipProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = useCallback(() => {
      const newFlippedState = !isFlipped;
      setIsFlipped(newFlippedState);
      onFlip?.(newFlippedState);
    }, [isFlipped, onFlip]);

    return (
      <div
        className="w-full h-full relative cursor-pointer perspective"
        onMouseEnter={toggleFlip}
        onMouseLeave={toggleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`${isFlipped ? "Flip back to" : "Flip to see"} ${alt}`}
        aria-pressed={isFlipped}
      >
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <motion.div
            className="absolute w-full h-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
            aria-hidden={isFlipped}
          >
            <Image
              src={frontImage}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </motion.div>

          {/* Back */}
          <motion.div
            className="absolute w-full h-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 d-flex align-items-center justify-content-center"
            style={{
              backfaceVisibility: "hidden",
              rotateY: "180deg",
            }}
            aria-hidden={!isFlipped}
          >
            <div className="text-center p-4">
              <h3 className="text-3xl font-serif italic text-neutral-800 dark:text-neutral-200">
                {backImage ? (
                  <Image
                    src={backImage}
                    alt={`${alt} back view`}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  "Profile"
                )}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }
);

ProfileImageFlip.displayName = "ProfileImageFlip";

export default ProfileImageFlip;
