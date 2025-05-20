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
      <div className="bg-neutral-100 p-4 md:p-6 rounded-lg">
        <CardItem
          title={project.name}
          subtitle={project.role}
          logoImageUrl={project?.logo?.url}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div className="col-span-1 order-1 py-6 md:py-2 border-b border-neutral-200">
        <div className="px-2 md:px-4">
          <div className="mb-4 md:mb-6">
            <CardItem
              title={project.name}
              subtitle={project.role}
              imageHeight={33}
              imageWidth={33}
              logoImageUrl={project?.logo?.url}
            />
          </div>
          <p className="mb-6">{project.description.text}</p>
          <Link
            href={`/projects/${project.slug}`}
            className="font-medium border-b-2 border-black"
          >
            Read Case Study
          </Link>
        </div>
      </div>
      <div className="col-span-1 md:col-span-2 relative h-[300px] md:h-[500px]">
        <Image
          src={project.showCaseImages?.[0]?.url || ""}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
          className="rounded-lg object-cover border border-neutral-200"
        />
      </div>
    </div>
  );
}
