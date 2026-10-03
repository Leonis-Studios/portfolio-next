import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

// Social preview card (LinkedIn, Discord, X, iMessage...). Rendered once at build time.
export const alt = `${site.name}, ${site.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const background = await readFile(join(process.cwd(), "public/images/HWP_Static_BG_1920x1080.png"));
  const logo = await readFile(join(process.cwd(), "public/Hassan_Lion_Website_1_Logo.png"));
  const toDataUrl = (png: Buffer) => `data:image/png;base64,${png.toString("base64")}`;

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
          backgroundColor: "#000",
          backgroundImage: `url(${toDataUrl(background)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 72px",
            borderRadius: 24,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
          }}
        >
          <img src={toDataUrl(logo)} width={140} height={140} alt="" />
          <div style={{ fontSize: 88, fontWeight: 700, marginTop: 16 }}>{site.name}</div>
          <div style={{ fontSize: 40, color: "#f5c542", marginTop: 8 }}>{site.jobTitle}</div>
        </div>
      </div>
    ),
    size,
  );
}
