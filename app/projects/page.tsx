import { fetchProjects } from "@/app/api/graphql";
import { Work } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import CardItem from "@/app/components/CardItem";
import ProjectCard from "@/app/components/ProjectCard";
import PageHeader from "../components/PageHeader";
import { HeroSection } from "../components/sections";

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
    <main className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-0">
      <HeroSection />

      <section className="col-span-4 sm:col-span-8 mb-16 md:mb-32">
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
      </section>

      {/* Side Projects Section */}
      <section className="col-span-4 sm:col-span-8 mb-16 md:mb-24">
        <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
          Side Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sideProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block h-full"
            >
              <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden h-full transition-all duration-300 hover:shadow-md">
                <CardItem
                  title={project.name}
                  subtitle={project.description.text}
                  rounded
                  logoImageUrl={project?.logo?.url}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Projects Section */}
      {projects.length > selectedWork.length + sideProjects.length && (
        <section className="col-span-4 sm:col-span-8 mb-16">
          <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects
              .filter((p) => !p.selectedWork && !p.sideproject)
              .map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-sm transition-all block h-full"
                >
                  <div className="p-4 md:p-6 rounded-lg">
                    <CardItem
                      title={project.name}
                      subtitle={project.industry}
                      logoImageUrl={project?.logo?.url}
                    />
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}
