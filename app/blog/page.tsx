import { fetchBlogPosts } from "@/app/api/graphql";
import { BlogPost } from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import HoverImageBlogPost from "@/app/components/HoverImageBlogPost";
import PageHeader from "@/app/components/PageHeader";

export default async function BlogPage() {
  const blogPosts: BlogPost[] = await fetchBlogPosts();

  return (
    <main className=" col-start-3 col-end-11 flex flex-col scroll-auto px-4 md:px-0 pb-16">
      {/* Header Section */}
      <PageHeader
        highlightWord="Thoughts"
        titleSuffix="&amp; Reflections"
        subtitle="Articles about frontend development, design systems, and user experience"
      />

      {/* Featured Post (if exists) */}
      {blogPosts.length > 0 && (
        <section className="mb-16 md:mb-24">
          <Link href={`/blog/${blogPosts[0].slug}`} className="block group">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
              {blogPosts[0].coverimage && (
                <Image
                  src={blogPosts[0].coverimage[0].url}
                  alt={blogPosts[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              )}
            </div>
            <div className="mb-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(blogPosts[0].createdAt).toLocaleDateString()}
              </p>
            </div>
            <h2 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
              {blogPosts[0].title}
            </h2>
            <div className="inline-block bg-neutral-100 dark:bg-neutral-800 rounded-full px-4 py-2 text-sm">
              Read article
            </div>
          </Link>
        </section>
      )}

      {/* All Blog Posts */}
      <section className="mb-16">
        <h2 className="text-xl md:text-2xl font-medium mb-6">All Articles</h2>

        {blogPosts.length > 0 ? (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {blogPosts.map((post) => (
              <HoverImageBlogPost key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl p-8 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No articles yet. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="mb-8">
        <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center">
          <h2 className="text-xl md:text-2xl font-medium mb-4">Stay Updated</h2>
          <p className="text-neutral-700 dark:text-neutral-300 max-w-[600px] mx-auto mb-6">
            Subscribe to receive notifications when I publish new articles about
            design and development.
          </p>
          <Link
            href="mailto:subscribe@charleskrook.com"
            className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Subscribe
          </Link>
        </div>
      </section>
    </main>
  );
}
