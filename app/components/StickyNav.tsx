"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Use useCallback to memoize the scroll handler for better performance
  const handleScroll = useCallback(() => {
    // Show the nav bar when scroll position is greater than 100px
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 100);
  }, []);

  useEffect(() => {
    // Add scroll event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } md:hidden px-4 py-2 bg-white dark:bg-zinc-950`}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex w-full font-medium bg-stone-100 dark:bg-stone-800 py-1 px-2 rounded-lg text-xs">
        <div className="flex-1 text-center py-1 md:py-2 border-r border-neutral-200 dark:border-neutral-800">
          <Link
            href="/"
            className="block hover:font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Navigate to home page"
          >
            Home
          </Link>
        </div>
        <div className="flex-1 text-center py-1 md:py-2 border-r border-neutral-200 dark:border-neutral-800">
          <Link
            href="/about"
            className="block hover:font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Navigate to about page"
          >
            About
          </Link>
        </div>
        <div className="flex-1 text-center py-1 md:py-2 border-r border-neutral-200 dark:border-neutral-800">
          <Link
            href="/projects"
            className="block hover:font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Navigate to projects page"
          >
            Projects
          </Link>
        </div>
        <div className="flex-1 text-center py-1 md:py-2">
          <Link
            href="/blog"
            className="block hover:font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Navigate to blog page"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav;
