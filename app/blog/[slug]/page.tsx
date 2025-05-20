import { fetchBlogPostBySlug } from "@/app/api/graphql";
import { MarkdownContent } from "@/app/utils/markdown";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchBlogPostBySlug(params.slug);
  return {
    title: post?.title || "Blog Post",
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchBlogPostBySlug(params.slug);
  console.log("Markdown: ", post?.markdown);
  if (!post) {
    return (
      <main className="flex items-center mx-auto flex-col justify-between scroll-auto">
        <div className="w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
          <section className="mb-16 md:mb-32">
            <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to home
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center mx-auto flex-col justify-between scroll-auto">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
        {/* Back Navigation */}
        <section className="mb-8 md:mb-16">
          <Link
            href="/"
            className="inline-block text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            ← Back to home
          </Link>
        </section>

        {/* Blog Post Content */}
        <section className="mb-16 md:mb-32">
          <div>
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                {post.title}
              </h1>
              <p className="text-neutral-600">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>

            {post.coverimage && (
              <div className="relative w-full h-[400px] md:h-[500px] mb-8">
                <Image
                  src={post.coverimage[0].url}
                  alt={post.title}
                  fill
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-neutral-700">
                {post.body.json}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
