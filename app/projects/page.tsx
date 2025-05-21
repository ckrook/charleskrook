import { fetchProjects } from "@/app/api/graphql";
import { Work } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import CardItem from "@/app/components/CardItem";
import ProjectCard from "@/app/components/ProjectCard";
import PageHeader from "@/app/components/PageHeader";

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
    <div className="col-start-3 col-end-11  pb-16">
      <PageHeader
        title="Projects"
        titleSuffix="& Case Studies"
        subtitle="A collection of projects I've worked on, from e-commerce sites to design systems and content platforms."
      />

      {/* Selected Work Section */}
      <div className="grid grid-cols-8">
        <h2 className="col-start-2 col-end-8 md:text-2xl font-medium mb-6 md:mb-8">
          Featured Projects
        </h2>
      </div>
      <section className="mb-16 md:mb-24">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column gap-6 md:gap-12">
              {selectedWork.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`}>
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Side Projects Section */}
      <section className="mb-16 md:mb-24">
        <div className="row">
          <div className="col-12">
            <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
              Side Projects
            </h2>
            <div className="row">
              {sideProjects.map((project) => (
                <div className="col-12 col-sm-6 mb-4" key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group d-block h-100"
                  >
                    <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden h-100 transition-all duration-300 hover:shadow-md">
                      <CardItem
                        title={project.name}
                        subtitle={project.role}
                        logoImageUrl={project?.logo?.url}
                      />
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 mb-4">
                        {project.description.text}
                      </p>
                      {project.showCaseImages?.[0]?.url && (
                        <div className="mt-4 aspect-video relative overflow-hidden rounded-lg">
                          <Image
                            src={project.showCaseImages[0].url}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="absolute bottom-6 right-6">
                        <span className="bg-white dark:bg-neutral-800 rounded-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 transition-all duration-300 group-hover:bg-neutral-100 dark:group-hover:bg-neutral-700">
                          View Project
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
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
                        <ProjectCard project={project} variant="compact" />
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
