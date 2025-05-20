"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-stone-100  hover:bg-stone-200 dark:bg-[#121212] text-xs md:text-sm font-medium flex items-center gap-2 transition-all duration-200 border dark:border-zinc-800 border-theme-light"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
          <span className="hidden md:inline">Dark Mode</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M5 5l1.5 1.5"></path>
            <path d="M17.5 17.5L19 19"></path>
            <path d="M5 19l1.5-1.5"></path>
            <path d="M17.5 6.5L19 5"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
          </svg>
          <span className="hidden md:inline text-white">Light Mode</span>
        </>
      )}
    </button>
  );
}
