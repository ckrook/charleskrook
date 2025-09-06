"use client";

import Link from "next/link";
import { useState } from "react";
import type { Experience } from "../types/index";
import CardItem from "./CardItem";
import Image from "next/image";

interface ExperiencesListProps {
  experiences: Experience[];
}

const formatPeriod = (startDate?: string, endDate?: string) => {
  if (!startDate) return "Now";

  const startYear = startDate ? new Date(startDate).getFullYear() : null;
  const endYear = endDate ? new Date(endDate).getFullYear() : null;

  return `${startYear} - ${endYear || "Now"}`;
};

const ExperiencesList = ({ experiences }: ExperiencesListProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="mb-16 md:mb-32">
      <h2>Experiences</h2>
      <p className="col-span-4 sm:col-start-1 sm:col-end-4 mb-8 w-full md:w-1/2 text-stone-400">
        <span className="text-black dark:text-white">
          My professional journey across different companies and roles.{" "}
        </span>
        Each experience has shaped my approach to frontend development and
        taught me valuable lessons about building scalable, user-focused
        applications.
      </p>
      <div className="flex flex-col">
        {experiences.map((experience) => {
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
            className: `border-b py-6 md:py-8 border-neutral-200 dark:border-neutral-800 transition-opacity duration-300 ${
              showFaded ? "opacity-40" : "opacity-100"
            } ${hasUrl ? "cursor-pointer" : "cursor-default"}`,
            onMouseEnter: () => setHoveredId(experience.id),
            onMouseLeave: () => setHoveredId(null),
          };

          const content = (
            <div className="flex md:flex-row justify-between gap-4 md:gap-0">
              <CardItem
                title={experience.name}
                subtitle={experience.role}
                logoImageUrl={experience?.logo?.url}
              />
              <div className="flex shrink-0 flex-col">
                <p className="text-neutral-700">{period}</p>
              </div>
            </div>
          );

          // Render as a link only if URL exists
          return hasUrl ? (
            <Link target="_blank" href={experience.url || "#"} {...commonProps}>
              {content}
              <div className="flex flex-col gap-2 mt-6">
                {experience.clients.map((client) => (
                  <div
                    key={client.name}
                    className="flex justify-between border-b pb-4 border-neutral-200 dark:border-neutral-800 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-2">
                      <div className=" bg-gray-200 w-12 h-12 rounded-sm"></div>
                      <div>{client.name}</div>
                    </div>
                    <div className=" flex items-center justify-center">
                      <Image
                        src="/arrowb.svg"
                        alt="Arrow right"
                        className="w-4 h-4"
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Link>
          ) : (
            <div {...commonProps}>{content}</div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperiencesList;
