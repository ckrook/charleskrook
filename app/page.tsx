import { fetchProjects, fetchExperiences } from "./api/graphql";
import {
  SelectedWorkSection,
  ExperiencesSection,
  HeroSection,
} from "./components/sections";

const Home = async () => {
  // Fetch data in parallel for better performance
  const [projects, experiences] = await Promise.all([
    fetchProjects(),
    fetchExperiences(),
  ]);

  const selectedWork = projects.filter((project) => project.selectedWork);

  return (
    <main className="col-start-1 col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-6 md:px-6">
      <HeroSection />
      <SelectedWorkSection selectedWork={selectedWork} />
      <ExperiencesSection experiences={experiences} />
    </main>
  );
};

export default Home;
