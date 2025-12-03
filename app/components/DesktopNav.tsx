"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DesktopNav = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    width: number;
    height: number;
    top: number;
  }>({ left: 0, width: 0, height: 0, top: 0 });

  const navItems = [
    { href: "/", label: "Home", ariaLabel: "Go to homepage" },
    { href: "/about", label: "About", ariaLabel: "View about page" },
    { href: "/projects", label: "Projects", ariaLabel: "Browse all projects" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    const updateSliderPosition = () => {
      const activeIndex = navItems.findIndex((item) => isActive(item.href));
      if (
        activeIndex !== -1 &&
        itemRefs.current[activeIndex] &&
        navRef.current
      ) {
        const activeElement = itemRefs.current[activeIndex];
        const navElement = navRef.current;

        const navRect = navElement.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();

        // Calculate height with extra padding (you can adjust the multiplier)
        const extraHeight = 8; // Add 8px extra height (4px top + 4px bottom)
        const height = activeRect.height + extraHeight;
        const top = activeRect.top - navRect.top - extraHeight / 2;

        setSliderStyle({
          left: activeRect.left - navRect.left,
          width: activeRect.width,
          height: height,
          top: top,
        });
      }
    };

    // Update on pathname change
    updateSliderPosition();

    // Also update on window resize to handle responsive changes
    window.addEventListener("resize", updateSliderPosition);
    return () => window.removeEventListener("resize", updateSliderPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <nav className="col-span-1 sm:col-span-4 flex justify-end items-center font-medium relative">
      <ol
        ref={navRef}
        className="grid grid-cols-7 justify-between items-center w-full gap-8 relative"
      >
        {/* Sliding background indicator */}
        {sliderStyle.width > 0 && (
          <div
            className="absolute bg-figma-background-secondary border border-figma-border-primary rounded-full transition-all duration-300 ease-in-out pointer-events-none"
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              height: `${sliderStyle.height}px`,
              top: `${sliderStyle.top}px`,
            }}
          />
        )}

        {navItems.map((item, index) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} className="col-span-1 relative z-10">
              <Link
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                href={item.href}
                aria-label={item.ariaLabel || item.label}
                className={cn(
                  "ml-2 text-md text-figma-text-primary rounded-full px-4 py-2 relative z-10 transition-colors",
                  active ? "" : "hover:opacity-80"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="text-right col-span-4 relative z-10">
          <Link
            href="mailto:charles@charleskrook.com"
            aria-label="Contact Charles Krook via email"
            className="ml-2 text-md text-figma-text-primary rounded-full px-4 py-2 hover:opacity-80 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default DesktopNav;
16;
