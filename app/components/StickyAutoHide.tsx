"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SHOW_AT_TOP_PX = 50;
const SCROLL_DELTA_THRESHOLD = 5;

export function StickyAutoHide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) return;
      if (y < SHOW_AT_TOP_PX) {
        setHidden(false);
      } else {
        setHidden(delta > 0);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-out will-change-transform",
        hidden ? "-translate-y-full" : "translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
