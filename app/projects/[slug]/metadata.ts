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

  return {
    title: project.name,
    description,
    openGraph: {
      title: `${project.name} | ${project.role}`,
      description,
      type: "website",
    },
    twitter: {
      title: project.name,
      description,
      card: "summary_large_image",
    },
  };
}
