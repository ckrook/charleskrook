import { fetchProjects, fetchExperiences, fetchBlogPosts } from "./api/graphql";
import {
  SelectedWorkSection,
  ExperiencesSection,
  HeroSection,
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
    <main className="col-start-1 col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-4">
      <HeroSection />
      <SelectedWorkSection selectedWork={selectedWork} />
      <ExperiencesSection experiences={experiences} />
    </main>
  );
};

export default Home;
