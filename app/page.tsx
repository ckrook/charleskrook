import { fetchProjects, fetchExperiences, fetchBlogPosts } from "./api/graphql";
import type { BlogPost, Experience } from "./types";
import CardItem from "./components/CardItem";
import ProjectCard from "./components/ProjectCard";
import ExperiencesList from "./components/ExperiencesList";
import HoverImageBlogPost from "./components/HoverImageBlogPost";
import { Work } from "./types";
import PageHeader from "./components/PageHeader";
import Link from "next/link";

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
      <div className="col-span-4 sm:col-start-1 sm:col-end-9">
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
              <Link
                target="_blank"
                href={project.liveSite || "#"}
                className=""
                key={project.id}
              >
                <CardItem
                  title={project.name}
                  subtitle={project.industry}
                  logoImageUrl={project?.logo?.url}
                  rounded={true}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
