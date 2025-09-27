import { fetchProjects, fetchExperiences, fetchClients } from "./api/graphql";
import {
  WorkSection,
  ExperiencesSection,
  HeroSection,
} from "./components/sections";

const Home = async () => {
  // Fetch data in parallel for better performance
  const [projects, experiences, clients] = await Promise.all([
    fetchProjects(),
    fetchExperiences(),
    fetchClients(),
  ]);

  const selectedWork = projects.filter((project) => project.selectedWork);

  return (
    <main className="col-start-1 col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-6 md:px-6">
      <HeroSection />
      <WorkSection selectedWork={selectedWork} clients={clients} />
      <ExperiencesSection experiences={experiences} />
    </main>
  );
};

export default Home;
