import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/config/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#030408";
const BRAND = "#1665ff";
const HEADLINE = ["The open", "data layer."];
const TAGLINE = "The open-source Rust data layer for blockchains, now on Stellar.";
const CTA = "solixdb.com";
const BAND = { width: size.width, height: 132 };

async function loadPoppins(weight: number, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Poppins:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Failed to load Poppins ${weight}`);
  return fetch(url).then((res) => res.arrayBuffer());
}

function asset(file: string) {
  return join(process.cwd(), "public", file);
}

async function dataUri(file: string, type: string) {
  const buffer = await readFile(asset(file));
  return `data:${type};base64,${buffer.toString("base64")}`;
}

// Same multiply tint the hero CTA canvas applies; satori can't decode WebP or blend.
async function tintedDither() {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(BRAND.slice(i, i + 2), 16) / 255);
  const buffer = await sharp(asset("hero-cta-bg-hover.webp"))
    .resize(BAND.width, BAND.height, { fit: "cover" })
    .removeAlpha()
    .linear([r, g, b], [0, 0, 0])
    .png()
    .toBuffer();
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

export default async function OpengraphImage() {
  const [medium, semibold, logo, dither, arrow] = await Promise.all([
    loadPoppins(500, HEADLINE.join("") + TAGLINE),
    loadPoppins(600, CTA),
    dataUri("logo.png", "image/png"),
    tintedDither(),
    dataUri("cta-arrow.svg", "image/svg+xml"),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: INK,
        color: "white",
        fontFamily: "Poppins",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px 0" }}>
        <img src={logo} alt="" width={156} height={42} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 64,
            fontSize: 112,
            fontWeight: 500,
            lineHeight: 0.85,
            letterSpacing: "-0.06em",
          }}
        >
          {HEADLINE.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
        <div style={{ marginTop: 40, fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em" }}>
          {TAGLINE}
        </div>
      </div>

      <div style={{ display: "flex", position: "relative", height: BAND.height }}>
        <img src={dither} alt="" {...BAND} style={{ position: "absolute", top: 0, left: 0 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            paddingLeft: 72,
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.05em",
          }}
        >
          <img src={arrow} alt="" width={36} height={36} />
          {CTA}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Poppins", data: medium, weight: 500, style: "normal" },
        { name: "Poppins", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
