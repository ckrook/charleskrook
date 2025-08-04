import { fetchProjects, fetchExperiences, fetchBlogPosts } from "./api/graphql";
import type { BlogPost, Experience, Work } from "./types";
import {
  HeroSection,
  SelectedWorkSection,
  ExperiencesSection,
  BlogPostsSection,
  SideProjectsSection,
} from "./components/sections";

const Home = async () => {
  // Fetch data in parallel for better performance
  const [projects, experiences, blogPosts] = await Promise.all([
    fetchProjects(),
    fetchExperiences(),
    fetchBlogPosts(),
  ]);

  const selectedWork = projects.filter((project) => project.selectedWork);
  const sideProjects = projects.filter((project) => project.sideproject);

  return (
    <main className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-0">
      <HeroSection />
      <SelectedWorkSection selectedWork={selectedWork} />
      <ExperiencesSection experiences={experiences} />
      <BlogPostsSection blogPosts={blogPosts} />
      <SideProjectsSection sideProjects={sideProjects} />
    </main>
  );
};

export default Home;
