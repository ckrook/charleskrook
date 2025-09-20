"use client";

import { useEffect, useState } from "react";

export default function FontTest() {
  const [fontInfo, setFontInfo] = useState<any>(null);

  useEffect(() => {
    const checkFonts = () => {
      if (typeof window !== "undefined") {
        // Check CSS variables
        const rootStyles = getComputedStyle(document.documentElement);
        const bodyStyles = getComputedStyle(document.body);

        // Check font loading
        document.fonts.ready.then(() => {
          const fonts = Array.from(document.fonts).map((font) => ({
            family: font.family,
            style: font.style,
            weight: font.weight,
            status: font.status,
            loaded: font.status === "loaded",
          }));

          setFontInfo({
            cssVariables: {
              "--font-sans": rootStyles.getPropertyValue("--font-sans"),
              "--font-serif": rootStyles.getPropertyValue("--font-serif"),
            },
            bodyFontFamily: bodyStyles.fontFamily,
            loadedFonts: fonts,
            userAgent: navigator.userAgent,
            url: window.location.href,
          });
        });
      }
    };

    checkFonts();
    const timer = setTimeout(checkFonts, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Font Debug Test Page</h1>

      {/* Test Elements */}
      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-semibold">Font Test Elements:</h2>

        <div className="font-sans text-2xl p-4 border">
          Inter Test (font-sans class)
        </div>

        <div className="font-serif text-2xl p-4 border">
          Playfair Display Test (font-serif class)
        </div>

        <div
          style={{ fontFamily: "var(--font-sans)" }}
          className="text-2xl p-4 border"
        >
          Direct CSS Variable Test (Inter)
        </div>
      </div>

      {/* Debug Information */}
      {fontInfo && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Debug Information:</h2>

          <div className="mb-4">
            <h3 className="font-semibold">CSS Variables:</h3>
            <pre className="bg-white p-2 rounded text-sm overflow-auto">
              {JSON.stringify(fontInfo.cssVariables, null, 2)}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Body Font Family:</h3>
            <div className="bg-white p-2 rounded text-sm">
              {fontInfo.bodyFontFamily}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Loaded Fonts:</h3>
            <div className="bg-white p-2 rounded text-sm">
              {fontInfo.loadedFonts.map((font: any, index: number) => (
                <div
                  key={index}
                  className={font.loaded ? "text-green-600" : "text-red-600"}
                >
                  {font.family} {font.style} {font.weight} - {font.status}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Environment:</h3>
            <div className="bg-white p-2 rounded text-sm">
              <div>URL: {fontInfo.url}</div>
              <div>User Agent: {fontInfo.userAgent}</div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Debugging Instructions:</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Open Browser DevTools (F12)</li>
          <li>Go to Network tab and reload the page</li>
          <li>Filter by &quot;Font&quot; to see font file requests</li>
          <li>Check for 404 errors on font files</li>
          <li>Go to Elements tab and check CSS variables</li>
          <li>Run the console commands from the debugging guide</li>
        </ol>
      </div>
    </div>
  );
}
