import { fetchProjectBySlug } from "@/app/api/graphql";
import CardItem from "@/app/components/parts/CardItem";
import Image from "next/image";
import Link from "next/link";
import RichTextRenderer from "@/app/components/RichTextRenderer";
import { BlockParagraph } from "@/app/components/parts/BlockParagraph";
import { BlockHeading } from "@/app/components/parts/BlockHeading";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = await fetchProjectBySlug(params.slug);
  return {
    title: project?.name || "Project Case Study",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await fetchProjectBySlug(params.slug);

  // Try to parse the raw content if it's a string
  let parsedContent = project?.content?.raw;
  if (typeof parsedContent === "string") {
    try {
      parsedContent = JSON.parse(parsedContent);
      console.log("Successfully parsed raw content");
    } catch (e) {
      console.error("Failed to parse raw content:", e);
    }
  }

  if (!project) {
    return (
      <main className="flex items-center mx-auto flex-col justify-between scroll-auto">
        <div className="px-4 sm:px-6 md:px-8">
          <section className="mb-16 md:mb-32">
            <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to home
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="col-span-12 grid grid-cols-12 justify-between scroll-auto px-4 sm:px-6 md:px-4">
      <div className="col-span-12 md:col-span-12 py-32">
        <div className="flex flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className=" flex-1">
            <BlockHeading headingSize="h1" className="text-2xl">
              {project.name}
            </BlockHeading>
            <BlockParagraph>{project.role}</BlockParagraph>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-12">
        {parsedContent && (
          <RichTextRenderer
            content={parsedContent}
            className="project-content"
          />
        )}
      </div>

      <div className="col-span-12 md:col-span-12 mb-16">
        <Image
          src={project?.bannerImage?.url}
          alt={project.name}
          width={1000}
          height={1000}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </main>
  );
}
