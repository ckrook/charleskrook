"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type CommandMenuProps = {
  children?: React.ReactNode;
};

export default function CommandMenu({ children }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      // Close when pressing escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="max-w-xl w-full mx-auto mt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <Command className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden">
                <div className="p-3 border-b border-gray-200 dark:border-zinc-800">
                  <Command.Input
                    autoFocus
                    placeholder="Search for pages, commands..."
                    className="w-full bg-transparent border-none outline-none p-2 text-base text-black dark:text-white placeholder:text-gray-500"
                  />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-4 text-sm text-center text-gray-500">
                    No results found
                  </Command.Empty>

                  <Command.Group
                    heading="Pages"
                    className="px-2 py-1 text-xs text-gray-500 font-medium"
                  >
                    <Command.Item
                      onSelect={() => handleNavigation("/")}
                      className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white"
                    >
                      Home
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleNavigation("/about")}
                      className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white"
                    >
                      About
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleNavigation("/projects")}
                      className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white"
                    >
                      Projects
                    </Command.Item>
                    <Command.Item
                      onSelect={() => handleNavigation("/blog")}
                      className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white"
                    >
                      Blog
                    </Command.Item>
                  </Command.Group>

                  <Command.Group
                    heading="Actions"
                    className="mt-2 px-2 py-1 text-xs text-gray-500 font-medium"
                  >
                    <Command.Item
                      onSelect={() => {
                        document.documentElement.classList.toggle("dark");
                        setOpen(false);
                      }}
                      className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white"
                    >
                      Toggle Dark Mode
                    </Command.Item>
                    <Command.Item
                      onSelect={() => {
                        window.print();
                        setOpen(false);
                      }}
                      className="px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white"
                    >
                      Print Page
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-black dark:bg-white text-white dark:text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-10"
        aria-label="Open Command Menu"
      >
        <kbd className="text-xs">⌘K</kbd>
      </button>
    </>
  );
}
