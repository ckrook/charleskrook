import "./globals.css";
import { Playfair_Display as FontSerif, Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Image from "next/image";
import NowPlaying from "./components/NowPlaying";
import Link from "next/link";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import StickyNav from "./components/StickyNav";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-white dark:bg-zinc-950 font-sans antialiased text-black dark:text-white transition-colors duration-200",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <ThemeProvider>
          <StickyNav />
          <div className="flex-col items-center scroll-auto">
            <header className=" mx-auto w-full max-w-[1400px]  flex flex-col py-4 md:py-8 px-4 gap-4 md:gap-6">
              <div className="grid grid-cols-3 items-center justify-between">
                <div className="flex items-center gap-2 md:gap-4 col-span-2 md:col-span-1">
                  <div className="w-10 h-10 md:w-12 md:h-12">
                    <Image
                      src="/logo-avatar.png"
                      alt="Charles Krook"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="flex flex-col font-medium text-black dark:text-white text-sm md:text-base">
                    <span>Charles Krook</span>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                      Software Engineer Stockholm, Sweden
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-end md:hidden">
                  <ThemeToggle />
                </div>

                {/* Responsive navigation */}
                <nav className="flex w-full col-span-3 md:col-span-1 font-medium bg-stone-100 dark:bg-[#121212] py-1 px-2 md:px-4 rounded-lg text-xs md:text-sm mt-4 md:mt-0">
                  <div className="flex-1 text-center py-1 md:py-2 border-r border-stone-300 dark:border-stone-700">
                    <Link
                      href="/"
                      className="block hover:font-bold transition-all"
                    >
                      Home
                    </Link>
                  </div>
                  <div className="flex-1 text-center py-1 md:py-2 border-r border-stone-300 dark:border-stone-700">
                    <Link
                      href="/about"
                      className="block hover:font-bold transition-all"
                    >
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
                    <Link
                      href="/blog"
                      className="block hover:font-bold transition-all"
                    >
                      Blog
                    </Link>
                  </div>
                </nav>

                {/* Desktop-only ThemeToggle */}
                <div className="hidden md:flex items-center justify-end md:col-span-1">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main>{children}</main>

            <footer className="w-full max-w-[1400px] px-4 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <NowPlaying />
              <small className="text-gray-600 dark:text-gray-400">
                &copy; 2025
              </small>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
