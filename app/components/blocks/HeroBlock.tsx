import { FadeInOnScroll } from "../wrappers/FadeInOnScroll";
import Image from "next/image";

const HeroBlock = () => {
  return (
    <FadeInOnScroll duration={1.2} y={80}>
      <div className="col-span-4 sm:col-start-1 sm:col-end-9 h-[483px] bg-figma-background-primary relative">
        {/* Hero Image for Google Search Results */}

        {/* SEO content - hidden visually but accessible to search engines */}
        <div className="sr-only">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/thumb-img.png"
              alt="Charles Krook - Fullstack Engineer"
              width={200}
              height={200}
              className="rounded-lg"
              priority
            />
          </div>
          <h1>Charles Krook</h1>
          <p>Fullstack Engineer</p>
          <p>
            I build modern web applications using React, Next.js, and
            TypeScript. Passionate about building fast, accessible, and
            user-friendly digital experiences.
          </p>
        </div>
      </div>
    </FadeInOnScroll>
  );
};

export default HeroBlock;
