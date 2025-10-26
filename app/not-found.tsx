"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    // Prevent scrolling on the body
    document.body.style.overflow = "hidden";

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <main className="col-start-1 col-end-13 px-4 md:px-4 h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Message */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/page-not-found.png"
            alt="404"
            quality={100}
            width={400}
            height={400}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="bg-figma-surface-button text-figma-text-header rounded-figma-sm px-6 py-3 text-sm font-medium hover:bg-opacity-80 transition-all duration-200"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="text-figma-text-secondary hover:text-figma-text-primary transition-colors duration-200 text-sm font-medium"
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
