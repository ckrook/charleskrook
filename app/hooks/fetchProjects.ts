export interface Project {
  id: string;
  name: string;
  description: {
    text: string;
  };
  role: string;
  logo: {
    url: string;
    width: number;
    height: number;
  };
  brandColor: {
    hex: string;
  }[];
}

export interface Workplace {
  id: string;
  name: string;
  description: {
    markdown: string;
  };
  logo: {
    url: string;
  };
  startDate: string;
  endDate: string;
  clients: {
    name: string;
  }[];
}

// Cache for storing fetched data
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const fetchWithCache = async (
  url: string,
  options: RequestInit,
  cacheKey: string
) => {
  const now = Date.now();
  const cached = cache.get(cacheKey);

  // Return cached data if it's still valid
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(url, {
      ...options,
      next: { revalidate: 300 }, // Cache for 5 minutes on the server
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Cache the successful response
    cache.set(cacheKey, { data: data.data, timestamp: now });

    return data.data;
  } catch (error) {
    console.error("GraphQL fetch error:", error);

    // Return cached data if available, even if expired
    if (cached) {
      console.warn("Using expired cached data due to fetch error");
      return cached.data;
    }

    throw error;
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  const cacheKey = "projects";

  try {
    const projects = await fetchWithCache(
      "https://eu-west-2.cdn.hygraph.com/content/cm8iosp2t016r07w6ztrci1jc/master",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              projects {
                id
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
              }
            }
          `,
        }),
      },
      cacheKey
    );

    return projects.projects || [];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

export const fetchWorkplaces = async (): Promise<Workplace[]> => {
  const cacheKey = "workplaces";

  try {
    const workplaces = await fetchWithCache(
      "https://eu-west-2.cdn.hygraph.com/content/cm8iosp2t016r07w6ztrci1jc/master",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              workplaces {
                id
                name
                description {
                  markdown
                }
                logo {
                  url
                }
                startDate
                endDate
              }
            }
          `,
        }),
      },
      cacheKey
    );

    return workplaces.workplaces || [];
  } catch (error) {
    console.error("Failed to fetch workplaces:", error);
    return [];
  }
};

// Utility function to clear cache
export const clearCache = () => {
  cache.clear();
};

// Utility function to get cache stats
export const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
};
