import { fetchProjectBySlug } from "@/app/api/graphql";
import CardItem from "@/app/components/CardItem";
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
    <main className=" col-span-12 grid grid-cols-12 justify-between scroll-auto mt-16">
      <div className="col-span-12 md:col-span-8 md:col-start-3 rounded-none md:rounded-lg overflow-hidden">
        <div className="relative w-full h-[400px] md:h-[500px] bg-stone-950 gradient-to-r from-stone-950 to-stone-900">
          <Image
            src={project?.bannerImage?.url || ""}
            alt={project?.name || ""}
            fill
            objectFit="cover"
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 md:col-start-4 mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8">
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
        <section className="grid mb-8 md:mb-16">
          <div className="grid col-start-2 col-end-8 gap-6">
            <div className=" col-span-3 md:col-span-2 mb-8 md:mb-0">
              <div className="flex flex-row items-center justify-between md:flex-row gap-4 mb-6">
                <CardItem
                  title={project.name}
                  subtitle={project.role}
                  imageHeight={44}
                  imageWidth={44}
                  logoImageUrl={project?.logo?.url}
                />
                <div className="md:hidden h-full">
                  <Link
                    href={project.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block md:hidden text-center bg-stone-100 dark:bg-black hover:bg-stone-200 dark:hover:bg-stone-700 py-4 px-6 rounded-lg text-sm font-medium transition-colors h-full"
                  >
                    View Site →
                  </Link>
                </div>
              </div>
              <div className="mb-6">
                <p>{project.description.text}</p>
              </div>
              <div className="mb-6">
                <h4 className="font-medium mb-2 uppercase text-sm">
                  Technologies
                </h4>
                <div className="overflow-hidden rounded-md">
                  <div className="border-l border-neutral-200 dark:border-neutral-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 -mx-px -mb-px">
                      {project.technoligies.map((technology) => (
                        <div
                          key={technology.name}
                          className="relative h-12 bg-white dark:bg-neutral-950 border-b border-r border-neutral-200 dark:border-neutral-700 flex items-center justify-center"
                        >
                          <div className="relative w-16 h-10">
                            <Image
                              src={technology?.logoWhite?.url || ""}
                              alt={technology.name}
                              className="p-1 object-contain"
                              fill
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Project details in a 2-column grid */}
              <button className=" mb-8 w-full bg-stone-100 dark:bg-neutral-900 hover:bg-stone-200 dark:hover:bg-stone-700 py-4 px-6 rounded-lg text-sm font-medium transition-colors">
                View Site →
              </button>
            </div>

            {/* Project Featured Image */}
            <div className="">
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
