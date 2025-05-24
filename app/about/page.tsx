"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileImageFlip from "../components/ProfileImageFlip";
import PageHeader from "../components/PageHeader";
import { fetchTechnologies, fetchTechnologiesCount } from "../api/graphql";
import { Technology } from "../types";
import ContactModal from "../components/ContactModal";

export default function About() {
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
    <div className="grid md:grid-cols-8 md:col-start-3 md:col-end-11 grid-cols-4 col-span-12 pb-16 px-4 md:px-0">
      {/* Header Section */}
      <div className="sm:col-start-2 sm:col-end-8 col-span-8">
        <PageHeader
          highlightWord="Bonjour,"
          titleSuffix="I'm Charles"
          subtitle="Frontend engineer passionate about crafting beautiful, accessible digital experiences"
          breakAfterHighlight={false}
        />
      </div>

      {/* Bio Section */}
      <section className=" col-span-8 mb-16 md:mb-24 grid grid-cols-8 gap-4">
        {/* Image column */}
        <div className=" sm:col-span-2 col-span-8 h-64  col-md-4 d-flex justify-content-center justify-content-md-start">
          <ProfileImageFlip
            frontImage="/charles-liten.png"
            alt="Charles Krook"
          />
        </div>
        {/* Content column */}
        <div className="sm:col-span-6 col-span-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">My Journey</h2>
          <div className="space-y-4 text-neutral-800 dark:text-neutral-200">
            <p>
              Based in Stockholm, I&apos;m a frontend engineer at Umain™ with a
              passion for elegant code and thoughtful design. My work spans
              e-commerce platforms, design systems, and content-rich websites
              that prioritize user experience.
            </p>
            <p>
              My background bridges both design and development, allowing me to
              speak both languages fluently. This dual perspective helps me
              create solutions that are not only technically robust but also
              intuitive and visually cohesive.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me exploring
              Stockholm&apos;s design scene, experimenting with new web
              technologies, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className=" col-span-8 mb-16 md:mb-24">
        <div>
          <div>
            <h2 className="text-xl md:text-2xl font-medium mb-6">
              Skills & Expertise
            </h2>
            <div className="overflow-hidden rounded-md">
              <div className="border-l border-neutral-200 dark:border-neutral-700">
                <div className="grid grid-cols-2 md:grid-cols-4 -mx-px -mb-px">
                  {technologies.map((tech: Technology) => (
                    <div
                      key={tech.name}
                      className="relative h-12 bg-white p-2 dark:bg-stone-950 border-b border-r border-neutral-200 dark:border-neutral-700 flex items-center justify-center"
                    >
                      <div className="relative w-20 h-8">
                        <Image
                          src={tech.logoWhite?.url || ""}
                          alt={tech.name}
                          className="p-1 object-contain dark:hidden"
                          fill
                        />
                        <Image
                          src={tech.logoDark?.url || ""}
                          alt={tech.name}
                          className="p-1 object-contain hidden dark:block"
                          fill
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Load More Button */}
            {technologies.length < totalTechnologies && (
              <div className="mt-6 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-md transition-colors"
                >
                  {isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Working Process Section */}
      <section className="grid grid-cols-3 gap-4 col-span-8 mb-16 md:mb-24">
        <h2 className=" col-span-3 text-xl md:text-2xl font-medium mb-6">
          My Approach
        </h2>
        <div className="sm:col-span-1 col-span-3 mb-4 mb-md-0">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 ">
            <div className="font-serif italic text-2xl text-red-500 mb-3">
              01
            </div>
            <h3 className="text-lg font-medium mb-2">Understand</h3>
            <p>
              I start by deeply understanding the problem, the users, and the
              business goals before writing any code.
            </p>
          </div>
        </div>
        <div className="sm:col-span-1 col-span-3 mb-4 mb-md-0">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="font-serif italic text-2xl text-red-500 mb-3">
              02
            </div>
            <h3 className="text-lg font-medium mb-2">Design</h3>
            <p>
              Cre andating thoughtful sions that are both functionally sound and
              aesthetically pleasing.
            </p>
          </div>
        </div>
        <div className="sm:col-span-1 col-span-3 mb-4 mb-md-0">
          <div className="bg-white dark:bg-stone-950 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="font-serif italic text-2xl text-red-500 mb-3">
              03
            </div>
            <h3 className="text-lg font-medium mb-2">Build & Refine</h3>
            <p>
              Implementing with clean, maintainable code and continuously
              refining based on feedback and data.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className=" col-span-8 mb-8">
        <div className="row">
          <div className="col-12 col-lg-10 offset-lg-1">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center">
              <h2 className="text-xl md:text-2xl font-medium mb-4">
                Let&apos;s Connect
              </h2>
              <div className="mb-4">
                <p>
                  Hj ect in mind ocreativer just want to connect? I&apos;m
                  always interested in hearing about new opportunities and
                  creative collaborations.
                </p>
              </div>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
