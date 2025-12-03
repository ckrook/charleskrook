import { fetchProjects, fetchExperiences, fetchClients } from "./api/graphql";
import HeroBlock from "./components/blocks/HeroBlock";
import SocialBlock from "./components/blocks/SocialBlock";
import PageBuilder from "./components/PageBuilder";

const Home = async () => {
  // Fetch data in parallel for better performance
  const [projects, experiences, clients] = await Promise.all([
    fetchProjects(),
    fetchExperiences(),
    fetchClients(),
  ]);

  const selectedWork = projects.filter((project) => project.selectedWork);

  const page = {
    blocks: [
      {
        __typename: "SelectedWorkBlock" as const,
        selectedWork,
      },
      {
        __typename: "ClientsBlock" as const,
        clients,
      },
      {
        __typename: "ExperienceBlock" as const,
        experiences,
      },
    ],
  };

  return (
    <main className="col-start-1 col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-4">
      <HeroBlock
        heading="Charles Krook | Fullstack engineer"
        description="I'm a fullstack engineer based in Stockholm, Sweden."
      />
      <PageBuilder blocks={page.blocks} />
      <SocialBlock />
    </main>
  );
};

export default Home;
