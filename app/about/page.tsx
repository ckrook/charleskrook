import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ProfileImageFlip from "../components/ProfileImageFlip";
import PageHeader from "../components/PageHeader";

export default function About() {
  // Skills array for displaying badges
  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "TailwindCSS",
    "GraphQL",
    "Node.js",
    "UI/UX Design",
    "Design Systems",
    "Accessibility",
    "Performance Optimization",
    "Responsive Design",
  ];

  return (
    <div className="grid grid-cols-8 col-start-3 col-end-11 pb-16">
      {/* Header Section */}
      <div className="col-start-2 col-end-8">
        <PageHeader
          highlightWord="Hello"
          titleSuffix="I'm Charles"
          subtitle="Frontend engineer passionate about crafting beautiful, accessible digital experiences"
          breakAfterHighlight={false}
        />
      </div>

      {/* Bio Section */}
      <section className=" col-span-8 mb-16 md:mb-24 grid grid-cols-8">
        {/* Image column */}
        <div className="col-span-2 col-md-4 d-flex justify-content-center justify-content-md-start">
          <ProfileImageFlip
            frontImage="/charles-liten.png"
            alt="Charles Krook"
          />
        </div>
        {/* Content column */}
        <div className="col-span-6 col-md-8">
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
        <div className="row">
          <div className="col-12">
            <h2 className="text-xl md:text-2xl font-medium mb-6">
              Skills & Expertise
            </h2>
            <div className="d-flex flex-wrap gap-2 md:gap-3">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  className="px-3 py-1 text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Working Process Section */}
      <section className=" col-span-8 mb-16 md:mb-24">
        <h2 className="text-xl md:text-2xl font-medium mb-6">My Approach</h2>
        <div className="row">
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="font-serif italic text-2xl text-red-500 mb-3">
                01
              </div>
              <h3 className="text-lg font-medium mb-2">Understand</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                I start by deeply understanding the problem, the users, and the
                business goals before writing any code.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="font-serif italic text-2xl text-red-500 mb-3">
                02
              </div>
              <h3 className="text-lg font-medium mb-2">Design</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                Creating thoughtful solutions that are both functionally sound
                and aesthetically pleasing.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="font-serif italic text-2xl text-red-500 mb-3">
                03
              </div>
              <h3 className="text-lg font-medium mb-2">Build & Refine</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                Implementing with clean, maintainable code and continuously
                refining based on feedback and data.
              </p>
            </div>
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
              <p className="text-neutral-700 dark:text-neutral-300 mx-auto mb-6 max-w-xl">
                Have a project in mind or just want to connect? I&apos;m always
                interested in hearing about new opportunities and creative
                collaborations.
              </p>
              <Link
                href="mailto:contact@charleskrook.com"
                className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
