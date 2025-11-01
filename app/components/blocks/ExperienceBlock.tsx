"use client";

import Link from "next/link";
import { useState } from "react";
import type { Experience } from "../../types";
import CardItem from "../parts/CardItem";
import { FadeInOnScroll } from "../wrappers/FadeInOnScroll";

interface ExperienceBlockProps {
  experiences: Experience[];
}

const formatPeriod = (startDate?: string, endDate?: string) => {
  if (!startDate) return "Now";

  const startYear = startDate ? new Date(startDate).getFullYear() : null;
  const endYear = endDate ? new Date(endDate).getFullYear() : null;

  return `${startYear} - ${endYear || "Now"}`;
};

const ExperienceBlock = ({ experiences }: ExperienceBlockProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="py-16 px-0 md:px-4 col-span-4 sm:col-start-1 sm:col-end-9">
      <section className="mb-16 md:mb-32">
        <FadeInOnScroll delay={0.4}>
          <h2 className="text-figma-xs font-figma font-figma-regular text-figma-text-primary">
            Experiences
          </h2>
          <p className="col-span-4 sm:col-start-1 sm:col-end-4 mb-8 w-full md:w-1/2 text-figma-base font-figma font-figma-medium text-figma-text-primary">
            My professional journey across different companies and roles. Each
            experience has shaped my approach to frontend development and taught
            me valuable lessons about building scalable, user-focused
            applications.
          </p>
        </FadeInOnScroll>
        <div className="flex flex-col">
          {experiences.map((experience, index) => {
            const period = formatPeriod(
              experience?.startDate,
              experience?.endDate
            );

            const isHovered = hoveredId === experience.id;
            const showFaded = hoveredId !== null && !isHovered;
            const hasUrl = !!experience.url;

            // Common props shared between link and div
            const commonProps = {
              key: experience.id,
              className: `transition-opacity duration-300 ${
                showFaded ? "opacity-40" : "opacity-100"
              } ${hasUrl ? "cursor-pointer" : "cursor-default"}`,
              onMouseEnter: () => setHoveredId(experience.id),
              onMouseLeave: () => setHoveredId(null),
            };

            const content = (
              <div className="border-b py-6 md:py-8 border-figma-border-primary flex md:flex-row justify-between gap-4 md:gap-0">
                <CardItem
                  title={experience.name}
                  subtitle={experience.role}
                  logoImageUrl={experience?.logo?.url}
                  asLink={false}
                />
                <div className="flex shrink-0 flex-col">
                  <p className="text-figma-text-tertiary font-figma font-figma-regular">
                    {period}
                  </p>
                </div>
              </div>
            );

            // Render as a link only if URL exists
            return hasUrl ? (
              <Link
                target="_blank"
                href={experience.url || "#"}
                {...commonProps}
              >
                <FadeInOnScroll delay={0.4 + index * 0.1} duration={0.6} y={25}>
                  {content}
                </FadeInOnScroll>
              </Link>
            ) : (
              <div {...commonProps}>
                <FadeInOnScroll delay={0.4 + index * 0.1} duration={0.6} y={25}>
                  {content}
                </FadeInOnScroll>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ExperienceBlock;
