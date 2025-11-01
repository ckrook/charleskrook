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

interface AnalyticsTrackerProps {
  measurementId: string;
}

// Analytics event tracking component that uses useSearchParams
const AnalyticsTracker = ({ measurementId }: AnalyticsTrackerProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views when the route changes
  useEffect(() => {
    if (!measurementId || measurementId === "") return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track pageview with Google Analytics
    window.gtag?.("config", measurementId, {
      page_path: url,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
};

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  if (!measurementId || measurementId === "") {
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
};

export default GoogleAnalytics;
