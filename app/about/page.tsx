"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchTechnologies, fetchTechnologiesCount } from "../api/graphql";
import type { Technology } from "../types";
import HeroBlock from "../components/blocks/HeroBlock";
import { BlockHeading } from "../components/parts/BlockHeading";
import { BlockParagraph } from "../components/parts/BlockParagraph";
import Link from "next/link";
import StructuredData from "../components/StructuredData";

const About = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [totalTechnologies, setTotalTechnologies] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch technologies on the client-side with pagination
  useEffect(() => {
    const loadTechnologies = async () => {
      setIsLoading(true);
      try {
        // Fetch the total count first
        const count = await fetchTechnologiesCount();
        setTotalTechnologies(count);

        // Get the first page of technologies
        const techs = await fetchTechnologies(0, itemsPerPage);
        setTechnologies(techs);
      } catch (error) {
        console.error("Error loading technologies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTechnologies();
  }, []);

  // Load more technologies when page changes
  useEffect(() => {
    const loadMoreTechnologies = async () => {
      if (currentPage === 1) return; // First page is already loaded

      setIsLoading(true);
      try {
        const skip = (currentPage - 1) * itemsPerPage;
        const newTechs = await fetchTechnologies(skip, itemsPerPage);

        // Append new technologies to existing ones
        setTechnologies((prevTechs) => [...prevTechs, ...newTechs]);
      } catch (error) {
        console.error("Error loading more technologies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoreTechnologies();
  }, [currentPage]);

  // Function to load more technologies
  const loadMore = () => {
    if (isLoading) return;
    if (technologies.length >= totalTechnologies) return;

    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <StructuredData type="about" />
      <main className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-0 md:px-4">
        {/* Header Section */}
        <HeroBlock
          heading="About"
          description="Charles Krook is a fullstack engineer based in Stockholm, Sweden."
        />

        {/* Bio Section */}
        <article className="px-4 sm:px-4 col-span-8 col-start-1 col-end-9 mb-16 md:mb-24 columns-1 sm:columns-2 [column-gap:3rem] md:[column-gap:5rem]">
          <BlockParagraph className=" text-white mb-4">
            I&apos;m Charles, a Stockholm-based fullstack engineer at{" "}
            <Link
              href="https://umain.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Umain website (opens in new tab)"
            >
              Umain
            </Link>
            , where I focus on the kind of details that decide whether a product
            feels considered or not.
          </BlockParagraph>
          <BlockParagraph className=" text-white mb-4">
            My work spans e-commerce platforms, design systems, and
            content-driven sites — I gravitate toward projects where the
            engineering exists to serve the design, not the other way around.
          </BlockParagraph>
          <BlockParagraph className=" text-white mb-4">
            Outside of work I spend time outdoors whenever I can, mostly on the
            road bike or in cold water around the archipelago.
          </BlockParagraph>
          <BlockParagraph className=" text-white mb-4">
            I grew up just outside Stockholm, spent a few years moving between
            cities, and came back in 2019. Since then I&apos;ve been working
            across a handful of companies and side projects.
          </BlockParagraph>
        </article>

        {/* Skills Section */}
        <section className="col-span-12 sm:col-span-8 sm:col-start-1 sm:col-end-8 mb-16 md:mb-24">
          <div>
            <div className="overflow-hidden rounded-2xl">
              <div className="border-neutral-200 dark:border-neutral-700 marquee-container">
                <div className="marquee-scroll">
                  {/* First set of technologies */}
                  <div className="flex gap-8 items-center pr-8">
                    {technologies.map((tech: Technology) => (
                      <div key={tech.name} className="flex-shrink-0">
                        <div className="relative w-20 h-8">
                          <Image
                            src={tech.logoDark?.url || ""}
                            alt={tech.name}
                            className="p-1 object-contain"
                            fill
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Duplicated set for seamless loop */}
                  <div
                    className="flex gap-8 items-center pr-8"
                    aria-hidden="true"
                  >
                    {technologies.map((tech: Technology) => (
                      <div
                        key={`${tech.name}-duplicate`}
                        className="flex-shrink-0"
                      >
                        <div className="relative w-20 h-8">
                          <Image
                            src={tech.logoDark?.url || ""}
                            alt={tech.name}
                            className="p-1 object-contain"
                            fill
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="col-span-8 col-start-1 col-end-9 px-4 mb-16 md:mb-24">
          <div className="rounded-2xl bg-figma-background-secondary p-8 md:p-12">
            <BlockHeading
              headingSize="h2"
              className="text-[20px] leading-[1.5] mb-3"
            >
              Get in touch
            </BlockHeading>
            <BlockParagraph className="mb-8 max-w-[480px]">
              Got something to build, or just want to connect? <br />
              The inbox is open.
            </BlockParagraph>
            <div className="flex flex-wrap gap-3">
              <Link
                href="mailto:charles.krook@gmail.com"
                aria-label="Contact Charles Krook via email"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-figma-text-primary text-figma-background-primary hover:opacity-85 transition-opacity"
              >
                Send an email
              </Link>
              <Link
                href="https://www.linkedin.com/in/charleskrook/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Charles Krook's LinkedIn profile"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-figma-background-primary text-figma-text-primary border border-figma-border-primary hover:opacity-85 transition-opacity"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
