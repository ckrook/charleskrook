"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileImageFlipProps {
  frontImage: string;
  backImage?: string;
  alt: string;
}

export default function ProfileImageFlip({
  frontImage,
  backImage,
  alt,
}: ProfileImageFlipProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div
      className="w-64 h-64 relative cursor-pointer perspective"
      onClick={toggleFlip}
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
        >
          <div className="text-center">
            <h3 className="text-3xl font-serif italic text-neutral-800 dark:text-neutral-200">
              Charles 5 år
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
