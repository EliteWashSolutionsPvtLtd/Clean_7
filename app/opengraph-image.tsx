import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Wash and Wow — laundry, dry cleaning, pickup and delivery in India";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #2d1810 0%, #4a3d36 42%, #c45c26 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: 56,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Wash and Wow
          </span>
          <span
            style={{
              fontSize: 34,
              color: "rgba(255,255,255,0.92)",
              maxWidth: 900,
            }}
          >
            Laundry · Dry cleaning · Pickup & delivery
          </span>
          <span style={{ fontSize: 26, color: "rgba(255,255,255,0.78)" }}>
            washandwow.in
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
