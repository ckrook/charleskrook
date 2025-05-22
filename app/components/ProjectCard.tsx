"use client";
import Image from "next/image";
import CardItem from "./CardItem";
import { Work } from "../types/index";
import { useEffect, useRef, useState } from "react";

interface ProjectCardProps {
  project: Work;
  variant?: "default" | "compact";
}

export default function ProjectCard({
  project,
  variant = "default",
}: ProjectCardProps) {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

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

    if (mockupRef.current) {
      observer.observe(mockupRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (mockupRef.current) {
        observer.unobserve(mockupRef.current);
      }
    };
  }, []);

  // Calculate parallax offset - as user scrolls down, image moves up slightly
  const parallaxOffset = scrollY * 0.05; // Adjust this multiplier to control parallax intensity

  if (variant === "compact") {
    return (
      <div className="p-4 md:p-6 rounded-lg">
        <CardItem
          title={project.name}
          subtitle={project.role}
          logoImageUrl={project?.logo?.url}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-8 md:mb-16 ">
      <div className="col-span-4 sm:col-span-8 relative w-full h-[400px] sm:h-[300px] md:h-[500px] overflow-hidden rounded-lg">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={project.backgroundImage?.url || ""}
            alt={`${project.name} background`}
            fill
            className="object-cover border border-neutral-200 dark:border-neutral-800"
            priority={true}
          />
        </div>

        {/* Mockup Image displayed above the background */}
        {project.mockupImage?.url && (
          <div
            ref={mockupRef}
            className="absolute inset-0 w-full h-full flex items-center"
          >
            <div
              className="relative w-[200%] h-[200%] transform translate-x-[25%]"
              style={{
                transform: `translateY(${-parallaxOffset}px) translateX(25%) translateY(25%)`,
                transition: "transform 0.05s ease-out",
              }}
            >
              <Image
                src={project.mockupImage.url}
                alt={`${project.name} mockup`}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
                className="object-contain"
                priority={true}
              />
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-start-2 sm:col-end-8 py-4 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-center">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {/* Logo and Title */}
            <div className="flex-shrink-0 sm:mb-0">
              <CardItem
                title={project.name}
                subtitle={project.role}
                imageHeight={33}
                imageWidth={33}
                logoImageUrl={project?.logo?.url}
              />
            </div>
            {/* Description */}
            <p>{project.description.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
