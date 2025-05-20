import { fetchProjects, fetchExperiences, fetchBlogPosts } from "./api/graphql";
import type { BlogPost, Experience } from "./types";
import CardItem from "./components/CardItem";
import Image from "next/image";
import IntroSection from "./components/IntroSection";
import Link from "next/link";
import ProjectCard from "./components/ProjectCard";
import ExperiencesList from "./components/ExperiencesList";
import HoverImageBlogPost from "./components/HoverImageBlogPost";
import { Work } from "./types";

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
    <main className="mx-auto w-full max-w-[1400px] flex flex-col justify-between scroll-auto px-4 md:px-0">
      <div className="flex flex-col items-start justify-start">
        <div className="py-24">
          <IntroSection />
        </div>
      </div>
      <div className="w-full max-w-[1400px]">
        {/* Selected Work Section */}
        <section className="mb-16 md:mb-32">
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
              Selected Work
            </h2>
            <div className="flex flex-col gap-6 md:gap-8">
              {selectedWork.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Experiences Section */}
        <ExperiencesList experiences={experiences} />

        {/* Blog Posts Section */}
        <section className="mb-16 md:mb-32">
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
              Blog Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              <div className="col-span-4">
                {blogPosts.map((post) => (
                  <HoverImageBlogPost key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Side Projects Section */}
        <section className="mb-16 md:mb-32">
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-6 md:mb-8">
              Side Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {sideProjects.map((project) => (
                <div
                  className="bg-gray-50 h-128 rounded-xl p-4 border border-neutral-200 relative overflow-hidden"
                  key={project.id}
                >
                  <CardItem title={project.name} subtitle={project.role} />
                  <p className="text-sm text-neutral-600">
                    {project.description.text}
                  </p>
                  <div className="mt-4 ">
                    <Image
                      src={project.showCaseImages?.[0]?.url || ""}
                      alt={project.name}
                      width={1500}
                      height={600}
                      className="transform rounded-t-lg"
                    />
                  </div>
                  <button className="absolute bottom-4 right-4 bg-white rounded-full px-4 py-2 border border-neutral-200">
                    View Project
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
