import { fetchProjects } from "@/app/api/graphql";
import { Work } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import CardItem from "@/app/components/CardItem";
import ProjectCard from "@/app/components/ProjectCard";
import PageHeader from "../components/PageHeader";

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
    <div className="grid md:grid-cols-8 md:col-start-3 md:col-end-11 grid-cols-4 col-span-12 pb-16 px-4 md:px-0">
      <div className="sm:col-start-2 sm:col-end-8 col-span-8">
        <PageHeader
          highlightWord="Projects"
          titleSuffix="& Case Studies"
          subtitle="A collection of projects I've worked on, from e-commerce sites to design systems."
          breakAfterHighlight={false}
        />
      </div>

      <div className="mb-16 md:mb-32 col-span-4 sm:col-span-8">
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

      {/* Side Projects Section */}
      <section className="mb-16 md:mb-24 col-span-8">
        <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8 ">
          Side Projects
        </h2>
        <div>
          {sideProjects.map((project) => (
            <div className="col-12 col-sm-6 mb-4" key={project.id}>
              <Link
                href={`/projects/${project.slug}`}
                className="group d-block h-100"
              >
                <div className=" dark:bg-neutral-900 rounded-xl p-6  border-neutral-200 dark:border-neutral-800 relative overflow-hidden h-100 transition-all duration-300 ">
                  <CardItem
                    title={project.name}
                    subtitle={project.description.text}
                    rounded
                    logoImageUrl={project?.logo?.url}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* All Projects Section */}
      {projects.length > selectedWork.length + sideProjects.length && (
        <section className="mb-16">
          <div className="row">
            <div className="col-12">
              <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
                Other Projects
              </h2>
              <div className="row">
                {projects
                  .filter((p) => !p.selectedWork && !p.sideproject)
                  .map((project) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 mb-4"
                      key={project.id}
                    >
                      <Link
                        href={`/projects/${project.slug}`}
                        className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-sm transition-all d-block h-100"
                      >
                        <div className="p-4 md:p-6 rounded-lg">
                          <CardItem
                            title={project.name}
                            subtitle={project.industry}
                            logoImageUrl={project?.logo?.url}
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
