"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchTechnologies, fetchTechnologiesCount } from "../api/graphql";
import type { Technology } from "../types";
import HeroBlock from "../components/blocks/HeroBlock";
import { BlockHeading } from "../components/parts/BlockHeading";
import { BlockParagraph } from "../components/parts/BlockParagraph";
import Link from "next/link";

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
    <main className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-0 md:px-4">
      {/* Header Section */}
      <HeroBlock />

      {/* Bio Section */}
      <section className="px-4 sm:px-4 col-span-8 col-start-1 col-end-9 mb-16 md:mb-24  columns-1 sm:columns-2">
        <BlockParagraph className=" text-white mb-4">

          Hi I&apos;m Charles! Stockholm based fullstack engineer, I&apos;m a
          frontend engineer at{" "}
          <Link href="https://umain.com" target="_blank">
            Umain
          </Link>{" "}
          who likes to build stuff both at work and on the side. My previous
          work spans across e-commerce platforms, design systems, and
          content-driven websites that puts the user at the center.
        </BlockParagraph>
        <BlockParagraph className=" text-white mb-4">
          I&apos;m a big fan of the nature. Whenever I get the chance, I like to
          go for a swim or a bike ride on my road bike.
        </BlockParagraph>
        <BlockParagraph className=" text-white mb-4">
          I grew up outside of Stockholm and moved across different cities until
          I ended up in Stockholm again in 2019. Since then I have been jumping
          around at different companies and projects.
        </BlockParagraph>
      </section>

      {/* Skills Section */}
      <section className="col-span-12 sm:col-span-8 sm:col-start-1 sm:col-end-8 mb-16 md:mb-24">
        <div>
          <div className="overflow-hidden rounded-md">
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
      <section className="col-span-4 sm:col-span-4 sm:col-start-3 mb-8">
        <div className="  p-6 md:p-8 rounded-xl  dark:border-neutral-800 text-center">
          <BlockHeading>Let&apos;s Connect</BlockHeading>
          <div className="mb-4">
            <BlockParagraph>
              Have a project in mind or just want to connect?
            </BlockParagraph>
          </div>
          <Link
            href="mailto:charles.krook@gmail.com"
            target="_blank"
            className="inline-block bg-black text-white  px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
