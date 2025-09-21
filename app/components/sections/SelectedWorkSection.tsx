import Link from "next/link";
import ProjectCard from "../ProjectCard";
import type { Work } from "../../types";

interface SelectedWorkSectionProps {
  selectedWork: Work[];
}

const SelectedWorkSection = ({ selectedWork }: SelectedWorkSectionProps) => {
  return (
    <div className="my-16 col-span-4 sm:col-start-1 sm:col-end-9">
      <h2 className="px-0 md:px-4 col-span-4 sm:col-start-1 sm:col-end-9 text-figma-xs font-figma font-figma-regular text-figma-text-primary">
        Selected work
      </h2>
      <p className="px-0 md:px-4 col-span-4 sm:col-start-1 sm:col-end-5 mb-8 w-full md:w-1/2 text-figma-base font-figma font-figma-medium text-figma-text-primary">
        A selection of my work over the years that I&apos;m extra proud of.
        These projects represent my journey in crafting digital experiences that
        balance technical excellence with thoughtful design.
      </p>
      <div className="mb-16 px-0 md:px-4 md:mb-32 col-span-4 sm:col-span-8">
        <div className="flex flex-col gap-6 md:gap-8">
          {selectedWork.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="mb-10 last:mb-0"
            >
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectedWorkSection;
