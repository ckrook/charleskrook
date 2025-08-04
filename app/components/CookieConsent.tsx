"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const hasConsent = localStorage.getItem("cookie-consent") === "true";
    if (!hasConsent) {
      // Show the banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);

    // Dispatch a custom event to notify other components about consent update
    const consentEvent = new Event("consentUpdated");
    window.dispatchEvent(consentEvent);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-md z-50 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-4 md:p-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-medium text-black dark:text-white">
                Cookie Consent
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                aria-label="Close cookie consent"
              >
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              This website uses cookies to enhance your browsing experience. By
              clicking &ldquo;Accept&rdquo;, you consent to the use of cookies
              for analytics, personalized content and ads.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-1">
              <button
                onClick={acceptCookies}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Accept
              </button>
              <Link
                href="/privacy-policy"
                className="px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
