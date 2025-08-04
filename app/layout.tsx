import "./globals.css";
import { Playfair_Display as FontSerif, Inter } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "./components/ThemeProvider";
import ThemeToggle from "./components/ThemeToggle";
import PrintHandler from "./components/PrintHandler";
import MobileMenu from "./components/MobileMenu";
import CommandMenu from "./components/CommandMenu";
import GoogleAnalytics from "./components/GoogleAnalytics";
import NowPlaying from "./components/NowPlaying";
import CookieConsent from "./components/CookieConsent";

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

// OG image URL from opengraph.xyz's CDN
const ogImageUrl =
  "https://opengraph.b-cdn.net/production/images/a9acc92f-1fe6-45e1-b798-666380e626e2.png?token=9xefLA4KJdml_EVI6bX1bYgmYrneDGZnIbXfewXZ9zo&height=630&width=1200&expires=33283914200";

// Get the Google Analytics Measurement ID from environment variables
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const metadata: Metadata = {
  title: {
    default: "Charles Krook | Frontend Engineer",
    template: "%s | Charles Krook",
  },
  description:
    "Frontend engineer passionate about crafting beautiful, accessible digital experiences",
  metadataBase: new URL("https://charleskrook.com"),
  keywords: [
    "frontend",
    "developer",
    "engineer",
    "react",
    "nextjs",
    "stockholm",
    "web development",
  ],
  authors: [{ name: "Charles Krook" }],
  creator: "Charles Krook",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charleskrook.com",
    siteName: "Charles Krook",
    title: "Charles Krook | Frontend Engineer",
    description:
      "Frontend engineer passionate about crafting beautiful, accessible digital experiences",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Charles Krook - Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charles Krook | Frontend Engineer",
    description:
      "Frontend engineer passionate about crafting beautiful, accessible digital experiences",
    images: [ogImageUrl],
    creator: "@charleskrook",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-white dark:bg-zinc-950 font-sans antialiased text-black dark:text-white transition-colors duration-200",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <ThemeProvider>
          <CommandMenu>
            <div className="grid grid-cols-12">
              <header className="px-4 col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid-cols-4 sm:grid-cols-8 py-1 md:py-4 gap-4 md:gap-6 hidden md:grid">
                {/* Logo and Name */}
                <div className="col-span-3 sm:col-span-4 flex items-center gap-2 md:gap-4">
                  <Link href="/" className="flex items-center gap-2 md:gap-2">
                    <div className="w-[33px] h-[33px] md:w-8 md:h-8">
                      <Image
                        src="/logo-avatar.png"
                        alt="Charles Krook"
                        className=" rounded-lg"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="flex flex-col font-medium text-black dark:text-white md:text-base text-sm">
                      <span className="text-sm">Charles Krook</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 -mt-1">
                        Frontend Engineer
                      </span>
                    </p>
                  </Link>
                </div>

                {/* Navigation */}
                <div className="col-span-1 sm:col-span-4 flex justify-end items-center">
                  {/* Desktop Navigation (visible only on desktop) */}
                  <nav className="flex justify-end items-center w-full">
                    <div className="flex border-neutral-200 dark:border-neutral-800 overflow-hidden font-medium">
                      <Link
                        href="/"
                        className="px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors rounded-md"
                      >
                        Home
                      </Link>
                      <Link
                        href="/projects"
                        className="px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors rounded-md"
                      >
                        Projects
                      </Link>
                    </div>
                    {/* Desktop ThemeToggle */}
                    {/* <div className="ml-4 flex">
                      <ThemeToggle />
                    </div> */}
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
              <footer className="md:flex md:col-span-6 md:col-start-4 col-span-12 flex-col justify-center text-center md:justify-between items-center py-4">
                <div>
                  <NowPlaying />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  &copy; {new Date().getFullYear()} Charles Krook. All rights
                  reserved.
                </span>
              </footer>
            </div>

            {/* Cookie Consent Banner - Loaded before Google Analytics */}
            <CookieConsent />

            {/* Google Analytics - Only initialized after consent */}
            <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
          </CommandMenu>
          <PrintHandler />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
