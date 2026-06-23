import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = "Kind Humanitarian Initiative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card. Colours are literals because satori (the renderer)
// has no access to CSS custom properties; they mirror the brand gradient.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#1f2328",
        backgroundImage:
          "linear-gradient(120deg, #345bae 0%, #426ec6 45%, #00b0f2 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "0.08em" }}>
        KHI
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 66,
            fontWeight: 600,
            lineHeight: 1.05,
            maxWidth: 920,
          }}
        >
          {site.name}
        </div>
        <div style={{ fontSize: 30, opacity: 0.92, maxWidth: 820 }}>
          Practical kindness in Abuja, Nigeria
        </div>
      </div>
    </div>,
    { ...size },
  );
}
