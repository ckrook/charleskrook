import { fetchMergedPRs, formatDate, groupPRsByMonth } from "@/lib/github";
import Link from "next/link";
import { Metadata } from "next";
import HeroBlock from "../components/blocks/HeroBlock";
import { FadeInOnScroll } from "../components/wrappers/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Recent updates and improvements to charleskrook.com",
};

const ChangelogPage = async () => {
  let prs: Awaited<ReturnType<typeof fetchMergedPRs>> = [];
  let error: string | null = null;

  try {
    prs = await fetchMergedPRs();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to fetch PRs:", err);
  }

  const groupedPRs = groupPRsByMonth(prs);

  return (
    <main className="col-start-1 col-end-13 grid grid-cols-4 sm:grid-cols-8 justify-between scroll-auto px-4 md:px-4">
      <HeroBlock />

      <div className="col-span-4 sm:col-start-1 sm:col-end-9 mb-16 md:mb-32">
        <FadeInOnScroll duration={0.8} y={40}>
          <h2 className="px-0 md:px-4 col-span-4 sm:col-start-1 sm:col-end-9 text-figma-xs font-figma font-figma-regular text-figma-text-primary">
            Changelog
          </h2>
          <p className="px-0 md:px-4 col-span-4 sm:col-start-1 sm:col-end-5 mb-8 w-full md:w-1/2 text-figma-base font-figma font-figma-medium text-figma-text-primary">
            Recent updates and improvements to the site. A log of all merged
            pull requests and changes.
          </p>
        </FadeInOnScroll>

        <div className="px-0 md:px-4 col-span-4 sm:col-span-8">
          {error ? (
            <FadeInOnScroll delay={0.2} duration={0.8} y={40}>
              <div className="text-red-500 dark:text-red-400">
                <p className="font-figma font-figma-medium mb-2">
                  Error loading changelog:
                </p>
                <p className="text-sm font-figma font-figma-regular">{error}</p>
                <p className="text-xs mt-4 text-figma-text-tertiary font-figma font-figma-regular">
                  If the repository is private, make sure to set the
                  GITHUB_TOKEN environment variable.
                </p>
              </div>
            </FadeInOnScroll>
          ) : prs.length === 0 ? (
            <FadeInOnScroll delay={0.2} duration={0.8} y={40}>
              <div className="text-figma-text-tertiary font-figma font-figma-regular">
                <p>No merged pull requests found.</p>
                <p className="text-xs mt-2">
                  Check the server console for debugging information.
                </p>
              </div>
            </FadeInOnScroll>
          ) : (
            <div className="flex flex-col">
              {Array.from(groupedPRs.entries())
                .sort(([, prsA], [, prsB]) => {
                  // Sort by the most recent PR in each group, most recent first
                  const latestA = prsA[0]?.merged_at || "";
                  const latestB = prsB[0]?.merged_at || "";
                  return (
                    new Date(latestB).getTime() - new Date(latestA).getTime()
                  );
                })
                .map(([month, monthPRs], monthIndex) => (
                  <div key={month} className="mb-16 md:mb-24">
                    <FadeInOnScroll
                      delay={0.2 + monthIndex * 0.1}
                      duration={0.8}
                      y={40}
                    >
                      <h3 className="text-figma-xs font-figma font-figma-regular text-figma-text-primary mb-6">
                        {month}
                      </h3>
                    </FadeInOnScroll>
                    <div className="flex flex-col">
                      {monthPRs
                        .sort((a, b) => {
                          // Sort PRs within month by date, most recent first
                          return (
                            new Date(b.merged_at).getTime() -
                            new Date(a.merged_at).getTime()
                          );
                        })
                        .map((pr, index) => (
                          <Link
                            key={pr.number}
                            href={pr.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <FadeInOnScroll
                              delay={0.3 + monthIndex * 0.1 + index * 0.05}
                              duration={0.6}
                              y={25}
                            >
                              <div className="border-b py-6 md:py-4 border-figma-border-primary flex md:flex-row justify-between gap-4 md:gap-0 transition-opacity duration-300 group-hover:opacity-80">
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-figma-base font-figma font-figma-medium text-figma-text-primary mb-2 group-hover:text-figma-text-secondary transition-colors">
                                    {pr.title}
                                  </h4>

                                  <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-xs text-figma-text-tertiary font-figma font-figma-regular">
                                      {formatDate(pr.merged_at)}
                                    </span>
                                    {pr.labels.length > 0 && (
                                      <div className="flex gap-2 flex-wrap">
                                        {pr.labels.map((label) => (
                                          <span
                                            key={label.name}
                                            className="text-xs px-2 py-0.5 rounded-full font-figma font-figma-regular"
                                            style={{
                                              backgroundColor: `#${label.color}20`,
                                              color: `#${label.color}`,
                                            }}
                                          >
                                            {label.name}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex shrink-0 items-start">
                                  <span className="text-xs text-figma-text-tertiary font-figma font-figma-regular group-hover:text-figma-text-primary transition-colors">
                                    #{pr.number}
                                  </span>
                                </div>
                              </div>
                            </FadeInOnScroll>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChangelogPage;
