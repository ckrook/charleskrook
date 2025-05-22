import { ImageResponse } from "next/og";

// Image metadata
export const alt = "About Charles Krook - Frontend Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Image generation
export default async function Image() {
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
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#111" }}>About Charles Krook</span>
        </div>
        <div style={{ fontSize: 32, opacity: 0.8 }}>
          Stockholm-based Frontend Engineer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
