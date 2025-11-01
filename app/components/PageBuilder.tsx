import {
  HeroBlock,
  SelectedWorkBlock,
  ClientsBlock,
  ExperienceBlock,
} from "./blocks";
import type { Work, Client, Experience } from "../types";

type Block =
  | { __typename: "HeroBlock" }
  | { __typename: "SelectedWorkBlock"; selectedWork: Work[] }
  | { __typename: "ClientsBlock"; clients: Client[] }
  | { __typename: "ExperienceBlock"; experiences: Experience[] };

interface PageBuilderProps {
  blocks: Block[];
}

const BLOCK_MAP = {
  HeroBlock,
  SelectedWorkBlock,
  ClientsBlock,
  ExperienceBlock,
} as const;

const PageBuilder = ({ blocks }: PageBuilderProps) => {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = BLOCK_MAP[block.__typename];
        if (!Component) return null;
        const { __typename, ...props } = block;
        return <Component key={index} {...(props as any)} />;
      })}
    </>
  );
};

export default PageBuilder;
