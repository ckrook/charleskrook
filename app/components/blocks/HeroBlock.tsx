import { BlockHeading } from "../parts/BlockHeading";
import { BlockParagraph } from "../parts/BlockParagraph";

const HeroBlock = ({
  heading,
  description,
}: {
  heading?: string;
  description?: string;
}) => {
  return (
    <div className="col-span-8 sm:col-start-1 sm:col-end-9 py-48 bg-figma-background-primary relative text-center">
      <BlockHeading headingSize="h1">{heading}</BlockHeading>
      <BlockParagraph>{description}</BlockParagraph>
    </div>
  );
};

export default HeroBlock;
