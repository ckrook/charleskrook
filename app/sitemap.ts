import { MetadataRoute } from "next";
import { fetchProjects } from "./api/graphql";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL of your website
  const baseUrl = "https://charleskrook.com";

  // Fetch dynamic routes from CMS with error handling
  let projects: Awaited<ReturnType<typeof fetchProjects>> = [];

  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
    // Continue with empty array if fetch fails
  }

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Project routes
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Combine all routes
  return [...staticRoutes, ...projectRoutes];
}
