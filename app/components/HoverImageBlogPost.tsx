"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogPost } from "../types";

type HoverImageBlogPostProps = {
  post: BlogPost;
};

export default function HoverImageBlogPost({ post }: HoverImageBlogPostProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCoverImage = post.coverimage && post.coverimage.length > 0;
  const imageHeight = 180;
  const imageWidth = 240;
  const imageOffset = 20;

  // Track mouse position relative to the container
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative border-b py-6 md:py-8 px-4 border-neutral-200 group transition-colors "
    >
      <Link href={`/blog/${post?.slug}`} className="block">
        <div className="mb-2">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </Link>

      {/* Floating image that follows the cursor using Framer Motion */}
      {hasCoverImage && post.coverimage && (
        <motion.div
          initial={false}
          animate={{
            top: mousePosition.y - imageHeight - imageOffset,
            left: mousePosition.x + imageOffset,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 250,
            opacity: { duration: 0.2 },
          }}
          style={{
            width: imageWidth,
            height: imageHeight,
            opacity: 0,
          }}
          className="absolute z-10 hidden overflow-hidden rounded-xl shadow-lg pointer-events-none group-hover:block"
        >
          <Image
            src={post.coverimage[0].url}
            alt={post.title}
            fill
            sizes="240px"
            className="object-cover"
            priority={false}
          />
        </motion.div>
      )}
    </div>
  );
}
