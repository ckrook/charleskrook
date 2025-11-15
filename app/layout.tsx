import "./globals.css";
import { Playfair_Display as FontSerif, Inter } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "./components/wrappers/ThemeProvider";
import MobileMenu from "./components/MobileMenu";
import CommandMenu from "./components/wrappers/CommandMenu";
import GSAPProvider from "./components/wrappers/GSAPProvider";
import GoogleAnalytics from "./components/wrappers/GoogleAnalytics";
import Footer from "./components/Footer";
import { BlockHeading } from "./components/parts/BlockHeading";
import { BlockParagraph } from "./components/parts/BlockParagraph";
import FallingBadges from "./components/blocks/FallingBadges";

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
    default: "Charles Krook | Fullstack Engineer",
    template: "%s | Charles Krook",
  },
  description:
    "I craft modern web applications using React, Next.js, and TypeScript. Passionate about building fast, accessible, and user-friendly digital experiences that make a real impact.",
  metadataBase: new URL("https://charleskrook.com"),
  keywords: [
    "fullstack",
    "frontend",
    "backend",
    "developer",
    "engineer",
    "react",
    "nextjs",
    "stockholm",
    "web development",
    "javascript",
    "typescript",
  ],
  authors: [{ name: "Charles Krook" }],
  creator: "Charles Krook",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charleskrook.com",
    siteName: "Charles Krook",
    title: "Charles Krook | Fullstack Engineer",
    description:
      "I craft modern web applications using React, Next.js, and TypeScript. Passionate about building fast, accessible, and user-friendly digital experiences that make a real impact.",
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
    title: "Charles Krook | Fullstack Engineer",
    description:
      "I craft modern web applications using React, Next.js, and TypeScript. Passionate about building fast, accessible, and user-friendly digital experiences that make a real impact.",
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
    <html
      lang="en"
      className={cn("scroll-smooth", fontSans.variable, fontSerif.variable)}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        {/* Theme color for Safari status bar and browser UI */}
        <meta name="theme-color" content="#0c0a09" />
        <meta name="msapplication-navbutton-color" content="#0c0a09" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Charles Krook" />
        <meta name="format-detection" content="telephone=no" />
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
      <body className="min-h-screen bg-figma-background-primary font-figma antialiased text-figma-text-primary transition-colors duration-200">
        <GSAPProvider>
          <ThemeProvider>
            <CommandMenu>
              <div className="grid grid-cols-12">
                <header className="px-0 md:px-4 col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid-cols-4 sm:grid-cols-8 py-1 md:py-4 gap-4 md:gap-6 hidden md:grid">
                  {/* Logo and Name */}
                  <div className="col-span-3 sm:col-span-4 flex items-center gap-2 md:gap-4">
                    <Link href="/" className="flex items-center gap-2 md:gap-4">
                      <div className="w-[33px] h-[33px] md:w-[45px] md:h-[45px]">
                        <Image
                          src="/logo-avatar.png"
                          alt="Charles Krook"
                          className=" rounded-md"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className=" leading-tight">
                        <BlockHeading headingSize="h1">
                          Charles Krook
                        </BlockHeading>
                        <BlockParagraph>Fullstack engineer</BlockParagraph>
                      </div>
                    </Link>
                  </div>

                  {/* Navigation */}
                  <div className="col-span-1 sm:col-span-4 flex justify-end items-center">
                    {/* Desktop Navigation (visible only on desktop) */}
                    <nav className="flex justify-end items-center w-full">
                      <div className="flex overflow-hidden font-medium justify-center items-center">
                        <Link
                          href="mailto:charles@charleskrook.com"
                          className="ml-2 text-md bg-figma-surface-button text-figma-text-primary rounded-full px-4 py-2 "
                        >
                          Get in touch
                        </Link>
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
                <Footer />
              </div>

              {/* Google Analytics - Always tracking */}
              <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
            </CommandMenu>
          </ThemeProvider>
        </GSAPProvider>
      </body>
    </html>
  );
};

export default RootLayout;
