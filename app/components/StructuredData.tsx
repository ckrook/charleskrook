import type { Work } from "../types";

interface StructuredDataProps {
  type?: "home" | "about" | "projects" | "project";
  projectData?: Work;
}

const StructuredData = ({
  type = "home",
  projectData,
}: StructuredDataProps) => {
  const baseUrl = "https://charleskrook.com";
  const personImage = `${baseUrl}/logo-avatar.png`;
  const ogImage = `${baseUrl}/opengraph-image.png`;

  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charles Krook",
    jobTitle: "Fullstack Engineer",
    description:
      "I craft modern web applications using React, Next.js, and TypeScript. Passionate about building fast, accessible, and user-friendly digital experiences that make a real impact.",
    url: baseUrl,
    image: personImage,
    email: "charles.krook@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stockholm",
      addressCountry: "SE",
    },
    sameAs: [
      "https://www.linkedin.com/in/charleskrook/",
      "https://github.com/ckrook",
      "https://twitter.com/charleskrook",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Umain",
      url: "https://umain.com",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Web Development",
      "Fullstack Development",
      "Frontend Development",
      "Backend Development",
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Charles Krook",
    url: baseUrl,
    description:
      "Portfolio website of Charles Krook, a fullstack engineer based in Stockholm, Sweden.",
    publisher: {
      "@type": "Person",
      name: "Charles Krook",
    },
    image: ogImage,
    inLanguage: "en-US",
  };

  // Organization Schema for Umain
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Umain",
    url: "https://umain.com",
  };

  // CreativeWork Schema for projects (if on project page)
  const projectSchema = projectData
    ? (() => {
        const schema: Record<string, any> = {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: projectData.name,
          url:
            projectData.liveSite || `${baseUrl}/projects/${projectData.slug}`,
          creator: {
            "@type": "Person",
            name: "Charles Krook",
          },
        };

        if (projectData.description?.text) {
          schema.description = projectData.description.text;
        }

        const imageUrl =
          projectData.bannerImage?.url || projectData.backgroundImage?.url;
        if (imageUrl) {
          schema.image = imageUrl;
        }

        if (projectData.technoligies && projectData.technoligies.length > 0) {
          schema.keywords = projectData.technoligies
            .map((tech) => tech.name)
            .join(", ");
        }

        return schema;
      })()
    : null;

  // CollectionPage Schema for projects listing
  const collectionPageSchema =
    type === "projects"
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Projects | Charles Krook",
          description: "Portfolio projects by Charles Krook",
          url: `${baseUrl}/projects`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [],
          },
        }
      : null;

  // AboutPage Schema
  const aboutPageSchema =
    type === "about"
      ? {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About | Charles Krook",
          description:
            "About Charles Krook, a fullstack engineer based in Stockholm, Sweden.",
          url: `${baseUrl}/about`,
          mainEntity: {
            "@type": "Person",
            name: "Charles Krook",
          },
        }
      : null;

  // Combine all relevant schemas
  const schemas = [
    personSchema,
    websiteSchema,
    organizationSchema,
    ...(projectSchema ? [projectSchema] : []),
    ...(collectionPageSchema ? [collectionPageSchema] : []),
    ...(aboutPageSchema ? [aboutPageSchema] : []),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
