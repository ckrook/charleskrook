import { fetchProjectBySlug } from "@/app/api/graphql";
import CardItem from "@/app/components/CardItem";
import ParallaxBanner from "@/app/components/ParallaxBanner";
import Image from "next/image";
import Link from "next/link";

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
    <main className="flex mx-auto flex-col justify-between scroll-auto">
      <div className="mx-4 rounded-lg overflow-hidden">
        <ParallaxBanner
          imageUrl={project?.bannerImage?.url || ""}
          altText={project?.name}
          height="h-[400px] md:h-[500px]"
        />
      </div>
      <div className=" mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
        {/* Back Navigation */}
        <section className="flex justify-between items-center py-4 mb-6 md:mb-12">
          <Link
            href="/"
            className="inline-block text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            ← Back to home
          </Link>
        </section>

        {/* Project Header */}
        <section className="mb-8 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="mb-8 md:mb-0">
              <div className="flex flex-col items-center md:flex-row gap-4 mb-6">
                <CardItem
                  title={project.name}
                  subtitle={project.role}
                  imageHeight={44}
                  imageWidth={44}
                  logoImageUrl={project?.logo?.url}
                />
              </div>
              <p className="mb-6">{project.description.text}</p>

              <div className="mb-6">
                <h3 className="font-medium mb-2 uppercase">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technoligies.map((technology) => (
                    <div
                      key={technology.name}
                      className="relative w-24 h-10 bg-white border border-neutral-200 rounded-md"
                    >
                      <Image
                        src={technology?.logoWhite?.url || ""}
                        alt={technology.name}
                        className="p-2"
                        objectFit="contain"
                        fill
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project details in a 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mt-8 relative before:absolute before:inset-0 before:grid before:grid-cols-2 before:content-[''] before:border-r before:border-zinc-200 dark:before:border-zinc-800 before:top-16 before:bottom-6">
                <div className="relative z-10">
                  <h3 className="font-medium mb-2 uppercase">Role</h3>
                  <p>{project.role}</p>
                </div>

                <div className="relative z-10">
                  <h3 className="font-medium mb-2 uppercase">Industry</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    E-commerce
                  </p>
                </div>

                <div className="sm:col-span-1 w-full border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2 relative z-10">
                  <h3 className="font-medium mb-2 uppercase">Live Site</h3>
                  <Link
                    href={project.liveSite}
                    className="font-medium text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.liveSite}
                  </Link>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2 relative z-10">
                  <h3 className="font-medium mb-2 uppercase">Timeline</h3>
                  <p>10 months</p>
                </div>
              </div>
            </div>

            {/* Project Featured Image */}
            <div className="col-span-1 md:col-span-2">
              {project.showCaseImages && project.showCaseImages.length > 0 && (
                <div className="mb-8">
                  <div className="relative w-full h-[300px] md:h-[500px]">
                    <Image
                      src={project.showCaseImages[0].url}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                      className="rounded-lg object-cover "
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.showCaseImages && project.showCaseImages.length > 1 && (
              <div className="col-span-2 md:col-span-3">
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:gap-6">
                  {project.showCaseImages.map((image, index) => {
                    // Skip first image
                    if (index === 0) return null;
                    return (
                      <div
                        key={image.url}
                        className="relative w-full h-[240px] md:h-[400px] lg:h-[800px]"
                      >
                        <Image
                          src={image.url}
                          alt={project.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="rounded-lg object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
