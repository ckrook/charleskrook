"use client";

import React from "react";

interface PageHeaderProps {
  title?: string;
  subtitle: string;
  highlightWord?: string;
  titlePrefix?: string;
  titleSuffix?: string;
  breakAfterHighlight?: boolean;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  highlightWord,
  titlePrefix = "",
  titleSuffix = "",
  breakAfterHighlight = false,
  className,
}: PageHeaderProps) {
  // Determine if we're highlighting a specific word or the entire title
  const renderTitle = () => {
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
          className={`italic font-serif inline-block relative`}
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
  };

  return (
    <section
      className={`py-8 md:py-32 d-flex flex-column align-items-center justify-content-center text-center ${className}`}
    >
      <div className="row">
        <div className="col-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-tight dark:text-white mb-4 md:mb-2">
            {renderTitle()}
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 mx-auto">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
