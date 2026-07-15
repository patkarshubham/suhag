import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f3e9db 0%, #e3b8ac 60%, #b8925a 100%)",
        }}
      >
        <div
          style={{
            fontSize: 96,
            color: "#2b2420",
            fontFamily: "serif",
          }}
        >
          Suhag
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 30,
            color: "#6e1e30",
            letterSpacing: 2,
          }}
        >
          Every wedding essential, one place
        </div>
      </div>
    ),
    { ...size }
  );
}
