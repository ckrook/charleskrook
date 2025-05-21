"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
    <div className="md:hidden z-50">
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex flex-col justify-center items-center w-10 h-10 relative z-50 ${
          isOpen ? "hamburger-active" : ""
        }`}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line mt-1.5"></span>
        <span className="hamburger-line mt-1.5"></span>
      </button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white dark:bg-zinc-950 z-40 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">CK</span>
                </div>
                <div className="text-sm font-medium">Menu</div>
              </div>
              <ThemeToggle />
            </div>
            <nav className="flex flex-col items-start justify-center flex-1 px-8 pt-12">
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
    </div>
  );
}
