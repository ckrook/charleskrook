import { fetchProjectBySlug } from "@/app/api/graphql";
import CardItem from "@/app/components/CardItem";
import Image from "next/image";
import Link from "next/link";
import RichTextRenderer from "@/app/components/RichTextRenderer";

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

  console.log("project.content?.raw ", project?.content?.raw);

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
        <div className="w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
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
    <main className="col-span-12 grid grid-cols-12 justify-between scroll-auto px-4 sm:px-6 md:px-8">
      {/* Hero Image Section */}
      <div className="col-span-12 rounded-lg overflow-hidden mb-8 sm:mb-12 md:mb-16">
        <div className="relative bg-[#0c0a09] aspect-[4/5] sm:aspect-[16/9]">
          <Image
            src={project?.bannerImage?.url || ""}
            alt={project?.name || ""}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="col-span-12 grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
        {/* Left Column - Project Info */}
        <div className="col-span-12 md:col-span-5">
          <div className="flex flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded flex items-center justify-center flex-shrink-0">
              {project?.logo?.url && (
                <Image
                  src={project.logo.url}
                  alt={project.name}
                  width={48}
                  height={48}
                  className="rounded-sm"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-white text-sm sm:text-base font-normal leading-[19.36px] truncate">
                {project.name}
              </h1>
              <p className="text-white text-sm sm:text-base font-normal leading-[19.36px] truncate">
                {project.role}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Project Description */}
        <div className="col-span-12 md:col-span-7">
          {parsedContent ? (
            <RichTextRenderer
              content={parsedContent}
              className="project-content"
              debug={true}
            />
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <p className="text-white font-serif text-lg sm:text-xl md:text-2xl leading-[1.3] sm:leading-[1.4] md:leading-[32px]">
                {project.description.text}
              </p>
              <p className="text-white text-sm sm:text-base leading-5 sm:leading-6">
                A selection of my work over the years that I&apos;m extra proud
                of. These projects represent my journey in crafting digital
                experiences that balance technical excellence with thoughtful
                design.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
