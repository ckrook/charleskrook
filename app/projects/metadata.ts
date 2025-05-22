import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore frontend development projects by Charles Krook",
  openGraph: {
    title: "Projects by Charles Krook",
    description: "Explore frontend development projects by Charles Krook",
    images: [
      {
        url: "https://charleskrook.com/projects/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Projects by Charles Krook",
      },
    ],
  },
  twitter: {
    title: "Projects by Charles Krook",
    description: "Explore frontend development projects by Charles Krook",
    images: ["https://charleskrook.com/projects/opengraph-image.png"],
    card: "summary_large_image",
  },
};
