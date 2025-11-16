"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { BlockParagraph } from "./parts/BlockParagraph";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
  ];

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-center items-center w-10 h-10 relative z-[101]"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <div className="text-xl">Close</div>
        ) : (
          <div className="text-xl">Menu</div>
        )}
      </button>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-stone-950 z-[99] flex flex-col md:hidden"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="h-16"></div> {/* Space for the fixed header */}
            <nav className="flex flex-col items-start justify-center flex-1 px-8 pt-1 italic text-right">
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.1 }}
                    className="py-6 w-full text-6xl"
                  >
                    <Link href={item.href} onClick={handleNavigate}>
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="py-6 w-full"
              >
                <Link
                  href="mailto:charles@charleskrook.com"
                  onClick={handleNavigate}
                  className="block text-6xl font-medium text-white transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>
            <BlockParagraph className=" px-2 py-2 text-white">
              © {new Date().getFullYear()} Charles Krook
            </BlockParagraph>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;
