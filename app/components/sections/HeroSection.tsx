import { FadeInOnScroll } from "../FadeInOnScroll";

const HeroSection = () => {
  return (
    <FadeInOnScroll duration={1.2} y={80}>
      <div className="col-span-4 sm:col-start-1 sm:col-end-9 h-[483px] bg-figma-background-primary"></div>
    </FadeInOnScroll>
  );
};

export default HeroSection;
