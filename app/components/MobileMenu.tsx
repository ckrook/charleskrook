"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.height = "100%";
      document.documentElement.style.position = "fixed";
      document.documentElement.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
    };
  }, [isOpen]);

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on resize if window becomes desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  // Close menu on navigation
  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? "bg-white dark:bg-zinc-950 " : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center h-14 px-4">
          {/* Logo and Name */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-[33px] h-[33px]">
              <Image
                src="/logo-avatar.png"
                alt="Charles Krook"
                width={100}
                height={100}
              />
            </div>
            <p className="flex flex-col font-medium text-black dark:text-white text-sm">
              <span>Charles Krook</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">
                Frontend Engineer
              </span>
            </p>
          </Link>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}

            {/* Hamburger Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-center items-center w-10 h-10 relative z-[101]"
              aria-label="Toggle menu"
            >
              <div
                className={`relative w-5 h-4 ${
                  isOpen ? "hamburger-active" : ""
                }`}
              >
                <span className="hamburger-line absolute top-0"></span>
                <span className="hamburger-line absolute top-1/2 -translate-y-1/2"></span>
                <span className="hamburger-line absolute bottom-0"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white dark:bg-zinc-950 z-[99] flex flex-col md:hidden"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="h-16"></div> {/* Space for the fixed header */}
            <nav className="flex flex-col items-start justify-center flex-1 px-8 pt-1 font-serif italic">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="py-6 w-full border-b border-neutral-100 dark:border-neutral-800"
              >
                <Link
                  href="/"
                  onClick={handleNavigate}
                  className="block text-2xl font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="py-6 w-full border-b border-neutral-100 dark:border-neutral-800"
              >
                <Link
                  href="/about"
                  onClick={handleNavigate}
                  className="block text-2xl font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                >
                  About
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="py-6 w-full border-b border-neutral-100 dark:border-neutral-800"
              >
                <Link
                  href="/projects"
                  onClick={handleNavigate}
                  className="block text-2xl font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="py-6 w-full"
              >
                <Link
                  href="/blog"
                  onClick={handleNavigate}
                  className="block text-2xl font-medium text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </motion.div>
            </nav>
            <div className="p-8 text-xs text-gray-500">
              © 2025 Charles Krook
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
