import { FadeInOnScroll } from "../FadeInOnScroll";

const HeroSection = () => {
  return (
    <FadeInOnScroll duration={1.2} y={80}>
      <div className="col-span-4 sm:col-start-1 sm:col-end-9 h-[483px] bg-figma-background-primary">
        {/* SEO content - hidden visually but accessible to search engines */}
        <div className="sr-only">
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

export default HeroSection;
