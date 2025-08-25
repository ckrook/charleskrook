"use client";

import React, { useMemo } from "react";

interface PageHeaderProps {
  title?: string;
  subtitle: string;
  highlightWord?: string;
  titlePrefix?: string;
  titleSuffix?: string;
  breakAfterHighlight?: boolean;
  className?: string;
}

const PageHeader = React.memo(
  ({
    title,
    subtitle,
    highlightWord,
    titlePrefix = "",
    titleSuffix = "",
    breakAfterHighlight = false,
    className,
  }: PageHeaderProps) => {
    // Memoize the title rendering to prevent unnecessary re-computation
    const renderedTitle = useMemo(() => {
      if (!highlightWord && title) {
        // No highlight word specified, apply styling to entire title
        return (
          <span
            className="italic font-serif inline-block relative"
            style={{
              textDecorationColor: "#F91414",
              textDecorationThickness: "2px",
              textUnderlineOffset: "4px",
            }}
          >
            {title}
          </span>
        );
      }

      // Highlight specific word
      return (
        <>
          {titlePrefix && <>{titlePrefix} </>}
          <span
            className="italic font-serif inline-block relative"
            style={{
              textDecorationColor: "#F91414",
              textDecorationThickness: "2px",
              textUnderlineOffset: "4px",
            }}
          >
            {highlightWord}
          </span>{" "}
          {breakAfterHighlight && <br />}
          {titleSuffix}
        </>
      );
    }, [title, highlightWord, titlePrefix, titleSuffix, breakAfterHighlight]);

    return (
      <header
        className={`py-16 text-start md:py-48 d-flex flex-column align-items-center justify-content-center md:text-center ${
          className || ""
        }`}
        role="banner"
      >
        <div className="row">
          <div className="col-12">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-tight dark:text-white mb-2 md:mb-2"
              id="page-title"
            >
              {renderedTitle}
            </h1>
            <p
              className="text-lg text-neutral-600 dark:text-neutral-400"
              aria-describedby="page-title"
            >
              {subtitle}
            </p>
          </div>
        </div>
      </header>
    );
  }
);

PageHeader.displayName = "PageHeader";

export default PageHeader;
