import { Metadata } from "next";
import { fetchProjectBySlug } from "../../api/graphql";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await fetchProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const description =
    project.description?.text || `${project.name} - A project by Charles Krook`;

  const slug = params.slug;
  const ogImageUrl = `https://charleskrook.com/projects/${slug}/opengraph-image.png`;

  return {
    title: project.name,
    description,
    openGraph: {
      title: `${project.name} | ${project.role}`,
      description,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      title: project.name,
      description,
      card: "summary_large_image",
      images: [ogImageUrl],
    },
  };
}
