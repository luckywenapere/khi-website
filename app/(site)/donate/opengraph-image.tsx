import { ImageResponse } from "next/og";

export const alt = "Donate to Kind Humanitarian Initiative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Tailored Donate social card. Colours are literals — satori has no access to
// CSS custom properties; they mirror the brand gradient.
export default function DonateOpengraphImage() {
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
        KHI · DONATE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.05,
            maxWidth: 940,
          }}
        >
          Your gift goes straight to the work
        </div>
        <div style={{ fontSize: 30, opacity: 0.92, maxWidth: 860 }}>
          Exam fees, hygiene kits, food packs, and youth leadership in Abuja.
        </div>
      </div>
    </div>,
    { ...size },
  );
}
