import ExperiencesList from "../ExperiencesList";
import type { Experience } from "../../types";

interface ExperiencesSectionProps {
  experiences: Experience[];
}

const ExperiencesSection = ({ experiences }: ExperiencesSectionProps) => {
  return (
    <div className="py-16 px-4 col-span-4 sm:col-start-1 sm:col-end-9">
      <ExperiencesList experiences={experiences} />
    </div>
  );
};

export default ExperiencesSection;
