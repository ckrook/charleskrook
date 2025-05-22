import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Charles Krook - frontend engineer based in Stockholm",
  openGraph: {
    title: "About Charles Krook",
    description:
      "Learn about Charles Krook - frontend engineer based in Stockholm",
    images: [
      {
        url: "https://charleskrook.com/about/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "About Charles Krook - Frontend Engineer",
      },
    ],
  },
  twitter: {
    title: "About Charles Krook",
    description:
      "Learn about Charles Krook - frontend engineer based in Stockholm",
    images: ["https://charleskrook.com/about/opengraph-image.png"],
    card: "summary_large_image",
  },
};
