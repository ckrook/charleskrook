import { ImageResponse } from "next/og";
import { fetchProjectBySlug } from "../../api/graphql";

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
  const project = await fetchProjectBySlug(params.slug);

  return [
    {
      contentType: "image/png",
      size: size,
      id: "og-image",
      alt: project?.name || "Project",
    },
  ];
}

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await fetchProjectBySlug(params.slug);
  const name = project?.name || "Project";
  const role = project?.role || "";
  const brandColor = project?.brandColor?.[0]?.hex || "#111";

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
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: brandColor,
          }}
        />
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            maxWidth: "80%",
            textAlign: "center",
            color: brandColor,
          }}
        >
          {name}
        </div>
        {role && (
          <div style={{ fontSize: 28, opacity: 0.8, marginTop: 8 }}>{role}</div>
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
          Project by Charles Krook | Frontend Engineer
        </div>
      </div>
    ),
    { ...size }
  );
}
