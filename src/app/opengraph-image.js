import { ImageResponse } from "next/og";

export const alt = "Manish Khadka – Full Stack Developer in Kathmandu, Nepal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111111 60%, #0f2e26 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 36, color: "#1DCD9F", fontWeight: 700 }}>MNZ</div>
        <div style={{ fontSize: 80, fontWeight: 700, marginTop: 24 }}>Manish Khadka</div>
        <div style={{ fontSize: 44, color: "#d1d5db", marginTop: 12 }}>Full Stack Developer</div>
        <div style={{ fontSize: 30, color: "#9ca3af", marginTop: 40 }}>
          Java Spring Boot · Node.js · React · Next.js — Kathmandu, Nepal
        </div>
      </div>
    ),
    size
  );
}
