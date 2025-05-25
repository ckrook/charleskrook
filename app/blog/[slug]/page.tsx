import { fetchBlogPostBySlug } from "@/app/api/graphql";
import { MarkdownContent, RichTextContent } from "@/app/utils/markdown";
import { adaptRichTextFromCMS } from "@/app/utils/richTextUtils";
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

  if (!post) {
    return (
      <main className="flex items-center mx-auto flex-col justify-between scroll-auto">
        <div className="">
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

  // Use our utility to adapt the content regardless of format
  const adaptedContent = adaptRichTextFromCMS(post);

  return (
    <main className="grid grid-cols-12 col-span-12 mt-16 items-center flex-col justify-between scroll-auto">
      {/* Blog Post Content */}

      {post.coverimage &&
        Array.isArray(post.coverimage) &&
        post.coverimage[0]?.url && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-8 col-span-12 md:col-span-8 md:col-start-3 ">
            <Image
              src={post.coverimage[0].url}
              alt={post.title}
              fill
              objectFit="cover"
              className=" rounded-none md:rounded-lg"
            />
          </div>
        )}

      <section className="mb-16 md:mb-32 col-span-12 md:col-span-8 px-4 md:px-0 md:col-start-3 md:col-end-11">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            {post.title}
          </h1>
          <p className="text-neutral-600">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Render using our adapted content */}
          {adaptedContent ? (
            <RichTextContent content={adaptedContent} />
          ) : post.markdown ? (
            // Fallback to markdown if rich text isn't available
            <MarkdownContent content={post.markdown} />
          ) : (
            <p>No content available for this post.</p>
          )}
        </div>
      </section>
    </main>
  );
}
