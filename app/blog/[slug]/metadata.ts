import { Metadata } from "next";
import { fetchBlogPostBySlug } from "../../api/graphql";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await fetchBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  // Extract the first few sentences of the markdown content for the description
  let description = post.markdown
    ? post.markdown.substring(0, 160).replace(/[#*`]/g, "")
    : "Read this blog post by Charles Krook";

  // Add ellipsis if description was truncated
  if (post.markdown && post.markdown.length > 160) {
    description += "...";
  }

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ["Charles Krook"],
    },
    twitter: {
      title: post.title,
      description,
      card: "summary_large_image",
    },
  };
}
