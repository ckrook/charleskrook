"use client";
import Link from "next/link";
import { Experience } from "../types/index";
import CardItem from "./CardItem";
import { useState } from "react";

interface ExperiencesListProps {
  experiences: Experience[];
}

const formatPeriod = (startDate?: string, endDate?: string) => {
  if (!startDate) return "Now";

  const startYear = startDate ? new Date(startDate).getFullYear() : null;
  const endYear = endDate ? new Date(endDate).getFullYear() : null;

  return `${startYear} - ${endYear || "Now"}`;
};

export default function ExperiencesList({ experiences }: ExperiencesListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="mb-16 md:mb-32">
      <h2>Experiences</h2>

      <div className="flex flex-col">
        {experiences.map((experience) => {
          const period = formatPeriod(
            experience?.startDate,
            experience?.endDate
          );

          const isHovered = hoveredId === experience.id;
          const showFaded = hoveredId !== null && !isHovered;

          return (
            <Link
              target="_blank"
              href={experience.url || "#"}
              key={experience.id}
              className={`border-b py-6 md:py-8 border-neutral-200 dark:border-neutral-800 cursor-pointer transition-opacity duration-300 ${
                showFaded ? "opacity-40" : "opacity-100"
              }`}
              onMouseEnter={() => setHoveredId(experience.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex md:flex-row justify-between px-2 md:px-4 gap-4 md:gap-0">
                <CardItem
                  title={experience.name}
                  subtitle={experience.role}
                  logoImageUrl={experience?.logo?.url}
                />
                <div className="flex shrink-0 flex-col">
                  <p className="text-neutral-700">{period}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
