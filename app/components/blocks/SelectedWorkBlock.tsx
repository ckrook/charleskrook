import Link from "next/link";
import ProjectCard from "../parts/ProjectCard";
import { BlockHeading } from "../parts/BlockHeading";
import { BlockParagraph } from "../parts/BlockParagraph";
import type { Work } from "../../types";
import {
  FadeInOnScroll,
  FadeInOnScrollContainer,
} from "../wrappers/FadeInOnScroll";

interface SelectedWorkBlockProps {
  selectedWork: Work[];
}

const SelectedWorkBlock = ({ selectedWork }: SelectedWorkBlockProps) => {
  return (
    <section className="my-16 col-span-8 sm:col-start-1 sm:col-end-9">
      <FadeInOnScroll duration={0.8} y={40}>
        <div className="px-0 md:px-4 flex flex-col gap-4 w-full md:w-1/2 mb-8 md:mb-16">
          <BlockHeading>Selected Projects</BlockHeading>
          <BlockParagraph>
            A selection of my work over the years that I&apos;m extra proud of.
            These projects represent my journey in crafting digital experiences
            that balance technical excellence with thoughtful design.
          </BlockParagraph>
        </div>
      </FadeInOnScroll>
      <div className="mb-16 px-0 md:px-4 md:mb-16 col-span-4 sm:col-span-8">
        <FadeInOnScrollContainer stagger={0.2} duration={0.8} y={50}>
          <div className="flex flex-col gap-6 md:gap-8">
            {selectedWork.map((project) => (
              <article key={project.id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mb-10 last:mb-0"
                  aria-label={`View ${project.name} project case study`}
                >
                  <ProjectCard project={project} />
                </Link>
              </article>
            ))}
          </div>
        </FadeInOnScrollContainer>
      </div>
    </section>
  );
};

export default SelectedWorkBlock;
