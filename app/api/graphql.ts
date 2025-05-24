import { BlogPost, Experience, Work } from "../types";

/**
 * Fetch data from the GraphQL API with the provided query
 */
async function fetchGraphQL(query: string) {
  try {
    const response = await fetch(
      "https://eu-west-2.cdn.hygraph.com/content/cm8iosp2t016r07w6ztrci1jc/master",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return null;
  }
}

/**
 * Fetch all projects from the GraphQL API
 */
export async function fetchProjects(): Promise<Work[]> {
  const query = `
    query {
      projects {
        id
        slug
        sideproject
        logowhite {
          url
        }
        backgroundImage {
          url
        }
        mockupImage {
          url
        }
        selectedWork
        name
        description {
          text
        }
        role
        logo {
          url
          width
          height
        }
        brandColor {
          hex
        }
        showCaseImages {
          url
          width
          height
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.projects || [];
}

/**
 * Fetch all workplaces from the GraphQL API
 */
export async function fetchExperiences(): Promise<Experience[]> {
  const query = `
    query {
      workplaces {
        id
        name
        url
        description {
          markdown
        }
        logo {
          url
          width
          height
        }
        startDate
        endDate
        logobackgroundWhite
        role
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.workplaces || [];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const query = `
    query {
      blogs {
        id
        title
        slug
        createdAt
        updatedAt
        markdown
        coverimage {
          url
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.blogs || [];
}

/**
 * Fetch a single blog post by its slug from the GraphQL API
 */
export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const query = `
    query {
      blog(where: { slug: "${slug}" }) {
        id
        title
        slug
        createdAt
        body {
          json
        }
        updatedAt
        markdown
        coverimage {
          url
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.blog || null;
}

/**
 * Fetch a single project by its slug from the GraphQL API
 */
export async function fetchProjectBySlug(slug: string): Promise<Work | null> {
  const query = `
    query {
      project(where: { slug: "${slug}" }) {
        id
        name
        slug
        liveSite
        backgroundImage {
          url
          width
          height
        }
        mockupImage {
          url
          width
          height
        }
        bannerImage {
          url
          width
          height
        }
        technoligies {
          name
          logoWhite{
            url
          }
        }
        description {
          text
        }
        content {
          raw
          markdown
        }
        role
        logo {
          url
          width
          height
        }
        brandColor {
          hex
        }
        showCaseImages {
          url
          width
          height
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.project || null;
}

/**
 * Fetch all technologies from the GraphQL API
 */
export async function fetchTechnologies() {
  const query = `
    query {
      technologies {
        name
        logoWhite {
          url
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.technologies || [];
}
