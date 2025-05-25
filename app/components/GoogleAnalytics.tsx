"use client";

import { useEffect, Suspense, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

// Declare the gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      id: string,
      config?: {
        page_path?: string;
        cookie_flags?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

// Analytics event tracking component that uses useSearchParams
function AnalyticsTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);

  // Check for cookie consent
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent") === "true";
      setHasConsent(consent);
    };

    // Check initial consent
    checkConsent();

    // Set up event listener for consent changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cookie-consent") {
        checkConsent();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Track page views when the route changes
  useEffect(() => {
    if (!measurementId || measurementId === "" || !hasConsent) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track pageview with Google Analytics
    window.gtag?.("config", measurementId, {
      page_path: url,
    });
  }, [pathname, searchParams, measurementId, hasConsent]);

  return null;
}

export default function GoogleAnalytics({
  measurementId,
}: {
  measurementId: string;
}) {
  const [hasConsent, setHasConsent] = useState(false);

  // Check for cookie consent
  useEffect(() => {
    // Function to check cookie consent
    const checkConsent = () => {
      const consent = localStorage.getItem("cookie-consent") === "true";
      setHasConsent(consent);
    };

    // Initial check
    checkConsent();

    // Listen for changes in consent
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cookie-consent") {
        checkConsent();
      }
    };

    // Custom event listener for when consent is given from CookieConsent component
    const handleConsentChange = () => checkConsent();
    window.addEventListener("consentUpdated", handleConsentChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("consentUpdated", handleConsentChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (!measurementId || measurementId === "" || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
