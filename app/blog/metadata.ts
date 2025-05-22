import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read about frontend development, design, and web technologies",
  openGraph: {
    title: "Blog by Charles Krook",
    description:
      "Read about frontend development, design, and web technologies",
    images: [
      {
        url: "https://charleskrook.com/blog/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Blog by Charles Krook",
      },
    ],
  },
  twitter: {
    title: "Blog by Charles Krook",
    description:
      "Read about frontend development, design, and web technologies",
    images: ["https://charleskrook.com/blog/opengraph-image.png"],
    card: "summary_large_image",
  },
};
