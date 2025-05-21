"use client";

import { useEffect, useState } from "react";
import PrintableResume from "./PrintableResume";

export default function PrintHandler() {
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+P (or Cmd+P on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        setShowResume(true);

        // Small delay to ensure the resume is rendered before printing
        setTimeout(() => {
          window.print();
          // Reset after print dialog is closed
          setShowResume(false);
        }, 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return showResume ? <PrintableResume /> : null;
}
