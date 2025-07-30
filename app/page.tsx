import { fetchProjects, fetchExperiences, fetchBlogPosts } from "./api/graphql";
import type { BlogPost, Experience } from "./types";
import { Work } from "./types";
import {
  HeroSection,
  SelectedWorkSection,
  ExperiencesSection,
  BlogPostsSection,
  SideProjectsSection,
} from "./components/sections";

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
    <main className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-0">
      <HeroSection />
      <SelectedWorkSection selectedWork={selectedWork} />
      <ExperiencesSection experiences={experiences} />
      <BlogPostsSection blogPosts={blogPosts} />
      <SideProjectsSection sideProjects={sideProjects} />
    </main>
  );
}
