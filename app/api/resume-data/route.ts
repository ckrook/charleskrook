import { NextResponse } from "next/server";

// This function would connect to your actual CMS
async function fetchDataFromCMS() {
  // Replace this with your actual CMS integration code
  // For example, using a headless CMS client like Contentful, Sanity, etc.

  // Example:
  // const client = createClient({...})
  // const data = await client.getEntries({...})

  // For now, we'll return sample data
  return {
    personalInfo: {
      name: "Charles Krook",
      title: "Software Engineer",
      location: "Stockholm, Sweden",
      email: "charles.krook@example.com",
      phone: "+46 70 123 4567",
      github: "github.com/charleskrook",
      avatar: "/logo-avatar.png",
    },
    summary:
      "Experienced software engineer with expertise in building modern web applications and scalable systems. Passionate about user experience, performance optimization, and clean code practices. Skilled in React, Next.js, TypeScript, and Node.js.",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Company AB",
        location: "Stockholm",
        period: "2021 - Present",
        description: [
          "Led a team of 5 developers to build and maintain a Next.js 13 web application with TypeScript and Tailwind CSS",
          "Implemented CI/CD pipelines with GitHub Actions, reducing deployment time by 40%",
          "Architected a scalable microservices backend using Node.js and GraphQL",
          "Mentored junior developers and conducted regular code reviews",
        ],
      },
      {
        title: "Frontend Developer",
        company: "Digital Agency XYZ",
        location: "Stockholm",
        period: "2018 - 2021",
        description: [
          "Developed responsive web applications using React and Redux for clients in fintech and e-commerce",
          "Collaborated with UX/UI designers to implement pixel-perfect interfaces",
          "Improved application performance by 30% through code optimization and lazy loading strategies",
          "Built accessible components following WCAG guidelines",
        ],
      },
      {
        title: "Web Developer",
        company: "Startup Inc.",
        location: "Stockholm",
        period: "2016 - 2018",
        description: [
          "Developed and maintained company website using JavaScript, HTML, and CSS",
          "Implemented responsive designs and optimized site performance",
          "Integrated third-party APIs for payment processing and user authentication",
        ],
      },
    ],
    skills: [
      {
        category: "Frontend",
        items:
          "React, Next.js, TypeScript, JavaScript, HTML/CSS, Tailwind CSS, Redux",
      },
      {
        category: "Backend",
        items: "Node.js, Express, RESTful APIs, GraphQL, PostgreSQL, MongoDB",
      },
      {
        category: "Tools & Practices",
        items:
          "Git, GitHub Actions, Jest, Testing Library, Storybook, Agile/Scrum",
      },
      {
        category: "Other",
        items:
          "AWS, Docker, Kubernetes, CI/CD, System Design, Performance Optimization",
      },
    ],
    education: [
      {
        degree: "MSc in Computer Science",
        institution: "KTH Royal Institute of Technology, Stockholm",
        period: "2014 - 2016",
      },
      {
        degree: "BSc in Information Technology",
        institution: "Uppsala University, Uppsala",
        period: "2011 - 2014",
      },
    ],
    languages: [
      {
        language: "Swedish",
        proficiency: "Native",
      },
      {
        language: "English",
        proficiency: "Fluent",
      },
      {
        language: "German",
        proficiency: "Basic",
      },
    ],
  };
}

export async function GET() {
  try {
    const data = await fetchDataFromCMS();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching resume data:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume data" },
      { status: 500 }
    );
  }
}
