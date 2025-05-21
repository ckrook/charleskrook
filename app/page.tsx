import { fetchProjects, fetchExperiences, fetchBlogPosts } from "./api/graphql";
import type { BlogPost, Experience } from "./types";
import CardItem from "./components/CardItem";
import Image from "next/image";
import ProjectCard from "./components/ProjectCard";
import ExperiencesList from "./components/ExperiencesList";
import HoverImageBlogPost from "./components/HoverImageBlogPost";
import { Work } from "./types";
import PageHeader from "./components/PageHeader";

export default async function Home() {
  const projects: Work[] = await fetchProjects();
  const experiences: Experience[] = await fetchExperiences();
  const blogPosts: BlogPost[] = await fetchBlogPosts();

  const selectedWork: Work[] = projects.filter(
    (project) => project.selectedWork === true
  );

  const sideProjects: Work[] = projects.filter(
    (project) => project.sideproject === true
  );

  return (
    <main className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-3 md:col-end-11 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-0">
      <div className="col-span-4 sm:col-start-2 sm:col-end-8 py-12 md:py-8">
        <PageHeader
          titlePrefix="Stockholm-based"
          highlightWord="frontend engineer"
          titleSuffix="crafting intuitive digital experiences"
          subtitle="Transforming complex ideas into elegant, user-centered interfaces at Umain™"
          breakAfterHighlight={true}
        />
      </div>
      {/* Selected Work Section */}
      <h2 className="col-span-4 sm:col-start-2 sm:col-end-8">Selected Work</h2>
      <div className="mb-16 md:mb-32 col-span-4 sm:col-span-8">
        <div className="flex flex-col gap-6 md:gap-8">
          {selectedWork.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Experiences Section */}
      <div className="col-span-4 sm:col-start-2 sm:col-end-8">
        <ExperiencesList experiences={experiences} />
      </div>

      {/* Blog Posts Section */}
      <section className="col-span-4 sm:col-start-2 sm:col-end-8 mb-16 md:mb-32">
        <div>
          <h2>Blog Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-4">
              {blogPosts.map((post) => (
                <HoverImageBlogPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Side Projects Section */}
      <section className="col-span-4 sm:col-start-2 sm:col-end-8 mb-16 md:mb-32">
        <div>
          <h2>Side Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {sideProjects.map((project) => (
              <div
                className="bg-gray-50 dark:bg-neutral-900 h-auto min-h-[320px] rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden"
                key={project.id}
              >
                <CardItem title={project.name} subtitle={project.role} />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {project.description.text}
                </p>
                <div className="mt-4">
                  <Image
                    src={project.showCaseImages?.[0]?.url || ""}
                    alt={project.name}
                    width={1500}
                    height={600}
                    className="transform rounded-t-lg w-full h-auto"
                  />
                </div>
                <button className="absolute bottom-4 right-4 bg-white dark:bg-neutral-900 rounded-full px-4 py-2 border border-neutral-200 dark:border-neutral-800">
                  View Project
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
