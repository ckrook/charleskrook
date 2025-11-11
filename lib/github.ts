interface GitHubPR {
  number: number;
  title: string;
  body: string;
  merged_at: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
}

interface GitHubPRResponse {
  items: GitHubPR[];
}

/**
 * Fetch merged pull requests from GitHub
 */
export async function fetchMergedPRs(
  owner: string = "ckrook",
  repo: string = "charleskrook",
  limit: number = 50
): Promise<GitHubPR[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    // Try direct PRs endpoint first (works better for private repos)
    const prsUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&sort=updated&direction=desc&per_page=${limit}`;

    const response = await fetch(prsUrl, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      // Fallback to search API if direct endpoint fails
      const query = `repo:${owner}/${repo} is:pr is:merged sort:updated-desc`;
      const searchUrl = `https://api.github.com/search/issues?q=${encodeURIComponent(
        query
      )}&per_page=${limit}`;

      const searchResponse = await fetch(searchUrl, {
        headers,
        next: { revalidate: 3600 },
      });

      if (!searchResponse.ok) {
        const errorText = await searchResponse.text();
        console.error(
          `GitHub API error (${searchResponse.status}):`,
          errorText
        );
        throw new Error(
          `GitHub API error: ${searchResponse.status} ${searchResponse.statusText}`
        );
      }

      const searchData: GitHubPRResponse = await searchResponse.json();
      const mergedPRs = searchData.items.filter((item) => item.merged_at);

      console.log(
        `Found ${mergedPRs.length} merged PRs via search API for ${owner}/${repo}`
      );

      return mergedPRs.map((item) => ({
        number: item.number,
        title: item.title,
        body: item.body || "",
        merged_at: item.merged_at,
        html_url: item.html_url,
        user: item.user,
        labels: item.labels || [],
      }));
    }

    // Process direct PRs endpoint response
    const allPRs: any[] = await response.json();

    // Filter only merged PRs and fetch full details
    const mergedPRs = allPRs.filter((pr) => pr.merged_at);

    console.log(
      `Found ${mergedPRs.length} merged PRs via direct API for ${owner}/${repo}`
    );

    // Fetch full PR details to get complete information
    const prsWithDetails = await Promise.all(
      mergedPRs.map(async (pr) => {
        const prResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/pulls/${pr.number}`,
          {
            headers,
            next: { revalidate: 3600 },
          }
        );

        if (prResponse.ok) {
          const prData = await prResponse.json();
          return {
            number: prData.number,
            title: prData.title,
            body: prData.body || "",
            merged_at: prData.merged_at,
            html_url: prData.html_url,
            user: {
              login: prData.user?.login || "",
              avatar_url: prData.user?.avatar_url || "",
            },
            labels: prData.labels || [],
          };
        }

        // Fallback to basic PR data if detail fetch fails
        return {
          number: pr.number,
          title: pr.title,
          body: pr.body || "",
          merged_at: pr.merged_at,
          html_url: pr.html_url,
          user: {
            login: pr.user?.login || "",
            avatar_url: pr.user?.avatar_url || "",
          },
          labels: pr.labels || [],
        };
      })
    );

    return prsWithDetails;
  } catch (error) {
    console.error("Error fetching GitHub PRs:", error);
    // Return empty array on error, but log the full error for debugging
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return [];
  }
}

/**
 * Format date to a readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Group PRs by date (month/year)
 */
export function groupPRsByMonth(prs: GitHubPR[]): Map<string, GitHubPR[]> {
  const grouped = new Map<string, GitHubPR[]>();

  prs.forEach((pr) => {
    const date = new Date(pr.merged_at);
    const key = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }

    grouped.get(key)!.push(pr);
  });

  return grouped;
}
