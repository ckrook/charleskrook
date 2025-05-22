import { Metadata } from "next";

// OG image URL from opengraph.xyz's CDN
const ogImageUrl =
  "https://opengraph.b-cdn.net/production/images/a9acc92f-1fe6-45e1-b798-666380e626e2.png?token=9xefLA4KJdml_EVI6bX1bYgmYrneDGZnIbXfewXZ9zo&height=630&width=1200&expires=33283914200";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore frontend development projects by Charles Krook",
  openGraph: {
    title: "Projects by Charles Krook",
    description: "Explore frontend development projects by Charles Krook",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Projects by Charles Krook",
      },
    ],
  },
  twitter: {
    title: "Projects by Charles Krook",
    description: "Explore frontend development projects by Charles Krook",
    images: [ogImageUrl],
    card: "summary_large_image",
  },
};
