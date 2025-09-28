"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CardItem from "./CardItem";
import type { Work } from "../types/index";
import { FadeInOnScroll } from "./FadeInOnScroll";

interface ProjectCardProps {
  project: Work;
  variant?: "default" | "compact";
  linkUrl?: string;
}

const ProjectCard = ({
  project,
  variant = "default",
  linkUrl,
}: ProjectCardProps) => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Store the current value of the ref
    const currentRef = mockupRef.current;

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Set up intersection observer for the parallax effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only apply parallax when the element is visible
          if (entry.isIntersecting) {
            window.addEventListener("scroll", handleScroll, { passive: true });
          } else {
            window.removeEventListener("scroll", handleScroll);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Calculate parallax offset - as user scrolls down, image moves up slightly
  const parallaxOffset = scrollY * 0.05; // Adjust this multiplier to control parallax intensity

  if (variant === "compact") {
    return (
      <FadeInOnScroll duration={0.6} y={30}>
        <div className="p-4 md:p-6 rounded-lg">
          <CardItem
            title={project.name}
            subtitle={project.industry}
            logoImageUrl={project?.logo?.url}
          />
        </div>
      </FadeInOnScroll>
    );
  }

  return (
    <FadeInOnScroll duration={0.8} y={60}>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
        <div className="col-span-4 sm:col-span-8 relative w-full aspect-[1/1] sm:aspect-[6/3] overflow-hidden rounded-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={project.backgroundImage?.url || ""}
              alt={`${project.name} background`}
              fill
              className="object-cover "
              priority={true}
            />
          </div>

          {/* Logo displayed on the left side of the card  */}
          <div className="absolute top-0 left-[20%] w-[100px] h-full items-center hidden md:flex">
            <Image
              src={project.logowhite?.url || ""}
              alt={`${project.name} logo`}
              fill
              className="object-contain md:translate-x-[30%] md:translate-y-[2%]"
              priority={true}
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
            />
          </div>

          {/* Mockup Image displayed above the background */}
          {project.mockupImage?.url && (
            <div
              ref={mockupRef}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <div
                className="relative h-[600px] md:h-auto w-full md:w-[200%] aspect-[3/2] flex items-center justify-center md:justify-end"
                style={{
                  transform: `translateY(${-parallaxOffset}px)`,
                  transition: "transform 0.05s ease-out",
                }}
              >
                <div className="relative w-[400%] md:w-full h-full">
                  <Image
                    src={project.mockupImage.url}
                    alt={`${project.name} mockup`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
                    className="object-contain transform-gpu translate-y-[25%] md:translate-x-[20%] md:translate-y-[20%]"
                    priority={true}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-4 sm:col-span-8 py-4 md:py-8">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 sm:gap-8">
            {/* Logo and Title */}
            <div className="col-span-4 sm:col-span-4">
              <CardItem
                title={project.name}
                subtitle={project.industry}
                imageHeight={33}
                imageWidth={33}
                logoImageUrl={project?.logo?.url}
                asLink={false}
              />
            </div>
            {/* Description */}
            <div className="col-span-4 sm:col-span-4">
              <p className="text-figma-text-primary text-figma-base font-figma font-figma-medium">
                {project.description.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
};

export default ProjectCard;
