import { ImageResponse } from "next/og";
import { fetchBlogPostBySlug } from "../../api/graphql";

// Route segment config
export const runtime = "edge";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export async function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetchBlogPostBySlug(params.slug);

  return [
    {
      contentType: "image/png",
      size: size,
      id: "twitter-image",
      alt: post?.title || "Blog post",
    },
  ];
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPostBySlug(params.slug);
  const title = post?.title || "Blog post";
  const date = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "#f1f5f9",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#000",
          textAlign: "center",
          padding: 40,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#111" }}>{title}</span>
        </div>
        {date && (
          <div style={{ fontSize: 24, opacity: 0.8, marginTop: 16 }}>
            {date}
          </div>
        )}
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
            marginTop: 32,
            position: "absolute",
            bottom: 40,
          }}
        >
          Charles Krook | Frontend Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
