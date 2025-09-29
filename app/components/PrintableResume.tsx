"use client";

import Image from "next/image";

export default function PrintableResume() {
  return (
    <div
      id="printable-resume"
      className="hidden print:block print:fixed print:inset-0 print:z-50 print:bg-white print:text-black print:p-8"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-300 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/logo-avatar.png"
                alt="Charles Krook"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-2xl font-figma font-figma-medium text-black">
                Charles Krook
              </h1>
              <p className="text-figma-base font-figma font-figma-regular text-gray-600">
                Fullstack Engineer • Stockholm, Sweden
              </p>
            </div>
          </div>
          <div className="text-figma-xs font-figma font-figma-regular text-right text-gray-600">
            <p>charles@charleskrook.com</p>
            <p>charleskrook.com</p>
            <p>github.com/charleskrook</p>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-figma-xs font-figma font-figma-regular text-black mb-4 border-b border-gray-200 pb-2">
            About
          </h2>
          <p className="text-figma-base font-figma font-figma-regular text-gray-700 leading-relaxed">
            I craft modern web applications using React, Next.js, and
            TypeScript. Passionate about building fast, accessible, and
            user-friendly digital experiences that make a real impact. With
            experience in e-commerce, digital consulting, and full-stack
            development.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-figma-xs font-figma font-figma-regular text-black mb-6 border-b border-gray-200 pb-2">
            Experience
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-figma-base font-figma font-figma-medium text-black">
                Fullstack Developer
              </h3>
              <span className="text-figma-xs font-figma font-figma-regular text-gray-500">
                Nov 2023 - Present
              </span>
            </div>
            <p className="text-figma-base font-figma font-figma-regular text-gray-600 mb-2">
              Umain
            </p>
            <p className="text-figma-base font-figma font-figma-regular text-gray-700">
              Digital consulting firm working with brands like McDonald&apos;s,
              Scania, and Biamp. Offering both web and digital services across
              various industries.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-figma-base font-figma font-figma-medium text-black">
                Frontend Developer
              </h3>
              <span className="text-figma-xs font-figma font-figma-regular text-gray-500">
                Mar 2023 - Aug 2023
              </span>
            </div>
            <p className="text-figma-base font-figma font-figma-regular text-gray-600 mb-2">
              Grebban
            </p>
            <p className="text-figma-base font-figma font-figma-regular text-gray-700">
              Retail e-commerce firm creating extraordinary e-commerce
              experiences and digital flagship stores for brands globally.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-figma-base font-figma font-figma-medium text-black">
                Frontend Developer
              </h3>
              <span className="text-figma-xs font-figma font-figma-regular text-gray-500">
                Aug 2022 - Mar 2023
              </span>
            </div>
            <p className="text-figma-base font-figma font-figma-regular text-gray-600 mb-2">
              Sopra Steria
            </p>
            <p className="text-figma-base font-figma font-figma-regular text-gray-700">
              Big tech and consulting company helping businesses with digital
              solutions and transformation.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-figma-base font-figma font-figma-medium text-black">
                Frontend Developer
              </h3>
              <span className="text-figma-xs font-figma font-figma-regular text-gray-500">
                Oct 2016 - Oct 2019
              </span>
            </div>
            <p className="text-figma-base font-figma font-figma-regular text-gray-600 mb-2">
              Freelance
            </p>
            <p className="text-figma-base font-figma font-figma-regular text-gray-700">
              Freelance developer developing sites for clients and businesses.
            </p>
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mb-8">
          <h2 className="text-figma-xs font-figma font-figma-regular text-black mb-6 border-b border-gray-200 pb-2">
            Selected Work
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-figma-base font-figma font-figma-medium text-black">
                Poc Sports
              </h3>
              <span className="text-figma-xs font-figma font-figma-regular text-gray-500">
                E-commerce
              </span>
            </div>
            <p className="text-figma-base font-figma font-figma-regular text-gray-700 mb-2">
              Led frontend for a new e-commerce platform with Centra & Next.js —
              from architecture to UI for a fast, modern customer experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Centra",
                "Next.js",
                "Tailwind",
                "Sanity",
                "Klaviyo",
                "Adyen",
                "Gladly",
                "Playwright",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-figma-xs font-figma font-figma-regular bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-figma-base font-figma font-figma-medium text-black">
                Charles Krook Portfolio
              </h3>
              <span className="text-figma-xs font-figma font-figma-regular text-gray-500">
                Personal Site
              </span>
            </div>
            <p className="text-figma-base font-figma font-figma-regular text-gray-700 mb-2">
              Personal portfolio website showcasing my work and experience,
              built with modern web technologies and design principles.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Tailwind", "Hygraph"].map((tech) => (
                <span
                  key={tech}
                  className="text-figma-xs font-figma font-figma-regular bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-figma-xs font-figma font-figma-regular text-black mb-4 border-b border-gray-200 pb-2">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <h3 className="text-figma-base font-figma font-figma-medium text-black mb-1">
                Frontend
              </h3>
              <p className="text-figma-base font-figma font-figma-regular text-gray-700">
                React, Next.js, TypeScript, HTML/CSS, Tailwind CSS
              </p>
            </div>
            <div>
              <h3 className="text-figma-base font-figma font-figma-medium text-black mb-1">
                Backend & Tools
              </h3>
              <p className="text-figma-base font-figma font-figma-regular text-gray-700">
                Node.js, GraphQL, Sanity, Hygraph, Git, CI/CD
              </p>
            </div>
            <div>
              <h3 className="text-figma-base font-figma font-figma-medium text-black mb-1">
                E-commerce
              </h3>
              <p className="text-figma-base font-figma font-figma-regular text-gray-700">
                Centra, Klaviyo, Adyen, Gladly, Playwright
              </p>
            </div>
            <div>
              <h3 className="text-figma-base font-figma font-figma-medium text-black mb-1">
                Design & UX
              </h3>
              <p className="text-figma-base font-figma font-figma-regular text-gray-700">
                Figma, Design Systems, Responsive Design
              </p>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-figma-xs font-figma font-figma-regular text-black mb-4 border-b border-gray-200 pb-2">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-figma-base font-figma font-figma-regular text-gray-700">
                <span className="font-figma-medium text-black">Swedish:</span>{" "}
                Native
              </p>
            </div>
            <div>
              <p className="text-figma-base font-figma font-figma-regular text-gray-700">
                <span className="font-figma-medium text-black">English:</span>{" "}
                Fluent
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
