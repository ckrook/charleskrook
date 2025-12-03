import { fetchProjects } from "@/app/api/graphql";
import { Work } from "@/app/types";
import Link from "next/link";
import CardItem from "@/app/components/parts/CardItem";
import ProjectCard from "@/app/components/parts/ProjectCard";
import HeroBlock from "../components/blocks/HeroBlock";
import { FadeInOnScroll } from "../components/wrappers/FadeInOnScroll";
import StructuredData from "../components/StructuredData";

export default async function Projects() {
  const projects: Work[] = await fetchProjects();

  // Separate projects into categories
  const selectedWork = projects.filter(
    (project) => project.selectedWork === true
  );
  const sideProjects = projects.filter(
    (project) => project.sideproject === true
  );

  return (
    <>
      <StructuredData type="projects" />
      <main className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-0">
        <HeroBlock
          heading="Projects"
          description="A selection of projects I've worked on. Some of them are side projects, some of them are work projects."
        />

        <section className="px-4  col-span-4 sm:col-span-8 mb-16 md:mb-32">
          <div className="flex flex-col gap-6 md:gap-8">
            {selectedWork.map((project, index) => (
              <FadeInOnScroll
                key={project.id}
                delay={0.2 + index * 0.3}
                duration={0.8}
                y={60}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="mb-10 last:mb-0"
                  aria-label={`View ${project.name} project case study`}
                >
                  <ProjectCard project={project} />
                </Link>
              </FadeInOnScroll>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
