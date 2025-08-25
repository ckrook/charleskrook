import Image from "next/image";

interface TrustedBySectionProps {
  logos?: Array<{
    id: string;
    name: string;
    logoUrl: string;
    altText: string;
  }>;
}

const TrustedBySection = ({ logos = [] }: TrustedBySectionProps) => {
  // Default logos if none provided - you can replace these with actual client/company logos
  const defaultLogos = [
    {
      id: "1",
      name: "Tech Company",
      logoUrl: "/images/logo1.png",
      altText: "Technology Company 1",
    },
    {
      id: "2",
      name: "Startup",
      logoUrl: "/images/logo2.png",
      altText: "Startup Company 1",
    },
    {
      id: "3",
      name: "Enterprise",
      logoUrl: "/images/logo3.png",
      altText: "Enterprise Company 1",
    },
    {
      id: "4",
      name: "Agency",
      logoUrl: "/images/logo4.png",
      altText: "Digital Agency 1",
    },
    {
      id: "5",
      name: "SaaS",
      logoUrl: "/images/logo5.png",
      altText: "SaaS Company 1",
    },
    {
      id: "6",
      name: "Consulting",
      logoUrl: "/images/logo6.png",
      altText: "Consulting Firm 1",
    },
    {
      id: "7",
      name: "E-commerce",
      logoUrl: "/images/logo7.png",
      altText: "E-commerce Company 1",
    },
    {
      id: "8",
      name: "Fintech",
      logoUrl: "/images/logo8.png",
      altText: "Fintech Company 1",
    },
  ];

  const displayLogos = logos.length > 0 ? logos : defaultLogos;

  return (
    <div className="my-16 col-span-4 sm:col-start-1 sm:col-end-9">
      <div className=" text-center w-full flex flex-col items-center justify-center">
        <h2 className="px-4 col-span-4 sm:col-start-1 sm:col-end-9 ">
          Clients I&apos;ve Worked With
        </h2>
        <p className="px-4 col-span-4 sm:col-start-1 sm:col-end-5 mb-8 w-1/2">
          A selection of the clients that have trusted me over the years.{" "}
        </p>
      </div>

      <div className="px-4 col-span-4 sm:col-span-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {displayLogos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 "
            >
              <div className="w-24 h-16 md:w-32 md:h-20 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {logo.name}
                  </span>
                </div>
                {/* Uncomment and use when you have actual logo images:
                <Image
                  src={logo.logoUrl}
                  alt={logo.altText}
                  width={128}
                  height={80}
                  className="max-w-full max-h-full object-contain"
                />
                */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;
