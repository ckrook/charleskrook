import Link from "next/link";
import CardItem from "../CardItem";
import type { Work } from "../../types";

interface SideProjectsSectionProps {
  sideProjects: Work[];
}

const SideProjectsSection = ({ sideProjects }: SideProjectsSectionProps) => {
  return (
    <section className="py-16 px-4 col-span-4 sm:col-start-1 sm:col-end-9">
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
  );
};

export default SideProjectsSection;
