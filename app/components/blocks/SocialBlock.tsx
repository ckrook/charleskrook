import Link from "next/link";
import { BlockHeading } from "../parts/BlockHeading";
import { FadeInOnScroll } from "../wrappers/FadeInOnScroll";

const mockSocialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/charleskrook/",
  },
  {
    name: "GitHub",
    url: "https://github.com/ckrook",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/charleskrook",
  },
];

interface SocialBlockProps {
  socialLinks?: {
    name: string;
    url: string;
  }[];
}

const SocialBlock = ({ socialLinks = mockSocialLinks }: SocialBlockProps) => {
  return (
    <section className="my-16 col-span-12 sm:col-start-1 sm:col-end-12">
      <FadeInOnScroll duration={0.8} y={40}>
        <nav
          className="px-0 md:px-4 flex justify-center gap-4 mb-8 md:mb-16"
          aria-label="Social media links"
        >
          {mockSocialLinks.map((socialLink) => (
            <Link
              key={socialLink.name}
              href={socialLink.url}
              className="mb-10 last:mb-0 underline"
            >
              <BlockHeading>{socialLink.name}</BlockHeading>
            </Link>
          ))}
        </nav>
      </FadeInOnScroll>
    </section>
  );
};

export default SocialBlock;
