import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const PINYON_TTF =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/pinyonscript/PinyonScript-Regular.ttf";

async function loadPinyon(): Promise<ArrayBuffer> {
  const r = await fetch(PINYON_TTF);
  if (!r.ok) throw new Error(`Failed to load Pinyon Script (${r.status})`);
  return r.arrayBuffer();
}

export default async function AppleIcon() {
  const fontData = await loadPinyon();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #FFF4E6 0%, #F5E0B9 60%, #EF6F6C 130%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 20%, rgba(247,201,72,0.55), transparent 55%)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "relative",
            fontFamily: "Pinyon",
            lineHeight: 0.85,
          }}
        >
          <span
            style={{
              fontSize: 120,
              color: "#2B1D18",
              position: "relative",
              zIndex: 1,
            }}
          >
            L
          </span>
          <span
            style={{
              fontSize: 120,
              color: "#EF6F6C",
              marginLeft: -38,
              position: "relative",
              zIndex: 0,
            }}
          >
            F
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Pinyon",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
