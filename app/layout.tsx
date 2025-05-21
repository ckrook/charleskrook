import "./globals.css";
import { Playfair_Display as FontSerif, Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Image from "next/image";
import NowPlaying from "./components/NowPlaying";
import Link from "next/link";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import PrintHandler from "./components/PrintHandler";
import MobileMenu from "./components/MobileMenu";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white dark:bg-zinc-950 font-sans antialiased text-black dark:text-white transition-colors duration-200",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <ThemeProvider>
          <div className="grid grid-cols-12 max-w-[1600px] mx-auto">
            <header className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-3 md:col-end-11 grid-cols-4 sm:grid-cols-8 py-1 md:py-4 px-4 gap-4 md:gap-6 hidden md:grid">
              {/* Logo and Name */}
              <div className="col-span-3 sm:col-span-4 flex items-center gap-2 md:gap-4">
                <Link href="/" className="flex items-center gap-2 md:gap-4">
                  <div className="w-[33px] h-[33px] md:w-10 md:h-10">
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
                      Frontend Engineer
                    </span>
                  </p>
                </Link>
              </div>

              {/* Navigation */}
              <div className="col-span-1 sm:col-span-4 flex justify-end items-center">
                {/* Desktop Navigation (visible only on desktop) */}
                <nav className="flex justify-end items-center w-full">
                  <div className="flex dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <Link
                      href="/"
                      className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors rounded-md"
                    >
                      Home
                    </Link>
                    <Link
                      href="/about"
                      className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors rounded-md"
                    >
                      About
                    </Link>
                    <Link
                      href="/projects"
                      className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors rounded-md"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/blog"
                      className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors rounded-md"
                    >
                      Blog
                    </Link>
                  </div>
                  {/* Desktop ThemeToggle */}
                  <div className="ml-4 flex">
                    <ThemeToggle />
                  </div>
                </nav>
              </div>
            </header>

            {/* Mobile Menu (shown only on mobile) */}
            <div className="md:hidden">
              <MobileMenu />
              {/* Spacer for fixed mobile header */}
              <div className="h-16"></div>
            </div>

            {children}

            <footer className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-3 md:col-end-11 mx-auto w-full px-4 py-8">
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                <div className="col-span-4 sm:col-span-6">
                  <NowPlaying />
                </div>
                <div className="col-span-4 sm:col-span-2 flex justify-start sm:justify-end items-center">
                  cmd + P
                  <small className="text-gray-600 dark:text-gray-400">
                    &copy; 2025
                  </small>
                </div>
              </div>
            </footer>
          </div>
          <PrintHandler />
        </ThemeProvider>
      </body>
    </html>
  );
}
