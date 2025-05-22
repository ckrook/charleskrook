"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function PrintableResume() {
  // Add print-specific styling when this component mounts
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "print-resume-styles";
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #printable-resume, #printable-resume * {
          visibility: visible;
        }
        #printable-resume {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background-color: white;
          color: black;
          padding: 2rem;
        }
        @page {
          size: A4;
          margin: 0.5cm;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById("print-resume-styles");
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div id="printable-resume" className="hidden print:block">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/logo-avatar.png"
                alt="Charles Krook"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold">Charles Krook</h1>
              <p>Software Engineer • Stockholm, Sweden</p>
            </div>
          </div>
          <div className="text-sm text-right">
            <p>charles.krook@example.com</p>
            <p>+46 70 123 4567</p>
            <p>github.com/charleskrook</p>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 font-serif border-b border-gray-200 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm">
            Experienced software engineer with expertise in building modern web
            applications. Skilled in React, Next.js, TypeScript, and Node.js.
            Passionate about creating user-friendly, accessible, and performant
            applications with clean code practices.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 font-serif border-b border-gray-200 pb-1">
            Work Experience
          </h2>

          <div className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium">Senior Software Engineer</h3>
              <span className="text-xs text-gray-600">2021 - Present</span>
            </div>
            <p>Tech Company AB, Stockholm</p>
            <ul className="text-sm mt-1 list-disc pl-5">
              <li>
                Led the development of a Next.js web application with TypeScript
              </li>
              <li>
                Implemented CI/CD pipelines reducing deployment time by 40%
              </li>
              <li>Mentored junior developers and conducted code reviews</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-medium">Frontend Developer</h3>
              <span className="text-xs text-gray-600">2018 - 2021</span>
            </div>
            <p>Digital Agency XYZ, Stockholm</p>
            <ul className="text-sm mt-1 list-disc pl-5">
              <li>
                Developed responsive web applications using React and Redux
              </li>
              <li>
                Collaborated with designers to implement pixel-perfect UIs
              </li>
              <li>
                Improved application performance by 30% through code
                optimization
              </li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 font-serif border-b border-gray-200 pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div>
              <h3 className="font-medium">Frontend</h3>
              <p>React, Next.js, TypeScript, HTML/CSS, Tailwind CSS</p>
            </div>
            <div>
              <h3 className="font-medium">Backend</h3>
              <p>Node.js, Express, RESTful APIs, GraphQL</p>
            </div>
            <div>
              <h3 className="font-medium">Tools & Practices</h3>
              <p>Git, GitHub Actions, Jest, Testing Library</p>
            </div>
            <div>
              <h3 className="font-medium">Other</h3>
              <p>AWS, Docker, Agile/Scrum, CI/CD</p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2 font-serif border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="flex justify-between items-baseline">
            <h3 className="font-medium">MSc in Computer Science</h3>
            <span className="text-xs text-gray-600">2014 - 2018</span>
          </div>
          <p>KTH Royal Institute of Technology, Stockholm</p>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-lg font-bold mb-2 font-serif border-b border-gray-200 pb-1">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <span className="font-medium">Swedish:</span> Native
              </p>
            </div>
            <div>
              <p>
                <span className="font-medium">English:</span> Fluent
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
