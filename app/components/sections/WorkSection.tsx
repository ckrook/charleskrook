import Link from "next/link";
import ProjectCard from "../ProjectCard";
import CardItem from "../CardItem";
import type { Work, Client } from "../../types";
import Image from "next/image";
import { FadeInOnScroll, FadeInOnScrollContainer } from "../FadeInOnScroll";

interface WorkSectionProps {
  selectedWork: Work[];
  clients: Client[];
}

const WorkSection = ({ selectedWork, clients }: WorkSectionProps) => {
  return (
    <div className="my-16 col-span-4 sm:col-start-1 sm:col-end-9">
      <FadeInOnScroll duration={0.8} y={40}>
        <h2 className="px-0 md:px-4 col-span-4 sm:col-start-1 sm:col-end-9 text-figma-xs font-figma font-figma-regular text-figma-text-primary">
          Selected work
        </h2>
        <p className="px-0 md:px-4 col-span-4 sm:col-start-1 sm:col-end-5 mb-8 w-full md:w-1/2 text-figma-base font-figma font-figma-medium text-figma-text-primary">
          A selection of my work over the years that I&apos;m extra proud of.
          These projects represent my journey in crafting digital experiences
          that balance technical excellence with thoughtful design.
        </p>
      </FadeInOnScroll>
      <div className="mb-16 px-0 md:px-4 md:mb-32 col-span-4 sm:col-span-8">
        <FadeInOnScrollContainer stagger={0.2} duration={0.8} y={50}>
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
        </FadeInOnScrollContainer>

        {/* Clients section */}
        {clients && clients.length > 0 && (
          <FadeInOnScroll duration={0.8} y={40}>
            <div className="mt-16">
              <h2 className="px-0 col-span-4 sm:col-start-1 sm:col-end-9 text-figma-xs font-figma font-figma-regular text-figma-text-primary">
                Projects
              </h2>
              <FadeInOnScrollContainer stagger={0.1} duration={0.6} y={25}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-20">
                  {clients.map((client, index) => {
                    if (client.name === "Poc Sports") return null;
                    return (
                      <CardItem
                        key={index}
                        title={client.name}
                        subtitle={client.role}
                        logoImageUrl={client.logo?.url}
                        imageWidth={48}
                        imageHeight={48}
                        arrow={true}
                        linkUrl={client.liveSite}
                      />
                    );
                  })}
                </div>
              </FadeInOnScrollContainer>
            </div>
          </FadeInOnScroll>
        )}
      </div>
    </div>
  );
};

export default WorkSection;
