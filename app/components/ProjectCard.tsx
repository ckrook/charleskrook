import Image from "next/image";
import Link from "next/link";
import CardItem from "./CardItem";
import { Work } from "../types/index";

interface ProjectCardProps {
  project: Work;
  variant?: "default" | "compact";
}

export default function ProjectCard({
  project,
  variant = "default",
}: ProjectCardProps) {
  if (variant === "compact") {
    return (
      <div className="p-4 md:p-6 rounded-lg">
        <CardItem
          title={project.name}
          subtitle={project.role}
          logoImageUrl={project?.logo?.url}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-8 md:mb-16 ">
      <div className="col-span-4 sm:col-span-8 relative w-full h-[200px] sm:h-[300px] md:h-[500px]">
        <Image
          src={project.showCaseImages?.[0]?.url || ""}
          alt={project.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
          className="rounded-lg object-cover border border-neutral-200 dark:border-neutral-800"
          priority={true}
        />
      </div>
      <div className="col-span-4 sm:col-start-2 sm:col-end-8 py-4 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-center">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {/* Logo and Title */}
            <div className="flex-shrink-0 mb-4 sm:mb-0">
              <CardItem
                title={project.name}
                subtitle={project.role}
                imageHeight={33}
                imageWidth={33}
                logoImageUrl={project?.logo?.url}
              />
            </div>
            {/* Description */}
            <p className="text-sm sm:text-base">{project.description.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
