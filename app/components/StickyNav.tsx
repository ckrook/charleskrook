"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the nav bar when scroll position is greater than 100px
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ease-in-out  ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } md:hidden px-4 py-2 bg-white`}
    >
      <nav className="flex w-full font-medium bg-stone-100 dark:bg-stone-800 py-1 px-2 rounded-lg text-xs ">
        <div className="flex-1 text-center py-1 md:py-2 border-r border-stone-300 dark:border-stone-700">
          <Link href="/" className="block hover:font-bold transition-all">
            Home
          </Link>
        </div>
        <div className="flex-1 text-center py-1 md:py-2 border-r border-stone-300 dark:border-stone-700">
          <Link href="/about" className="block hover:font-bold transition-all">
            About
          </Link>
        </div>
        <div className="flex-1 text-center py-1 md:py-2 border-r border-stone-300 dark:border-stone-700">
          <Link
            href="/projects"
            className="block hover:font-bold transition-all"
          >
            Projects
          </Link>
        </div>
        <div className="flex-1 text-center py-1 md:py-2">
          <Link href="/blog" className="block hover:font-bold transition-all">
            Blog
          </Link>
        </div>
      </nav>
    </div>
  );
}
