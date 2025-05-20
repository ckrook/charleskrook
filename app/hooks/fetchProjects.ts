export type Project = {
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
};

export async function fetchProjects() {
  try {
    const response = await fetch(
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
      }
    );

    const data = await response.json();
    return data.data.projects;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return [];
  }
}

export type Workplace = {
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
};

export async function fetchWorkplaces() {
  try {
    const response = await fetch(
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
      }
    );

    const data = await response.json();
    return data.data.workplaces;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return [];
  }
}
