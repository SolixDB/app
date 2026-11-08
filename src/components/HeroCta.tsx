"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const CELL = 4;
const DURATION = 400;
const REST_HEIGHT = 80;
const FULL_HEIGHT = 160;

function loadImage(src: string) {
  const img = new Image();
  img.src = src;
  return img;
}

function drawTinted(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  tint: string,
  w: number,
  h: number,
) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  ctx.drawImage(
    img,
    0,
    (h - img.naturalHeight * s) / 2,
    img.naturalWidth * s,
    img.naturalHeight * s,
  );
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "source-over";
}

function DitherBackground({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const draw = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const tint = getComputedStyle(canvas).getPropertyValue("--color-brand");
    const rest = loadImage("/hero-cta-bg.webp");
    const hover = loadImage("/hero-cta-bg-hover.webp");
    const layer = document.createElement("canvas");
    const layerCtx = layer.getContext("2d")!;
    const mask = document.createElement("canvas");
    const maskCtx = mask.getContext("2d")!;
    let width = 0;

    const applyMask = (target: CanvasRenderingContext2D, op: GlobalCompositeOperation) => {
      target.globalCompositeOperation = op;
      target.imageSmoothingEnabled = false;
      target.drawImage(mask, 0, 0, mask.width * CELL, mask.height * CELL);
      target.globalCompositeOperation = "source-over";
    };

    draw.current = () => {
      if (!width || !rest.complete || !hover.complete) return;
      const data = maskCtx.createImageData(mask.width, mask.height);
      for (let y = 0; y < mask.height; y++) {
        for (let x = 0; x < mask.width; x++) {
          const t = (BAYER[(y % 4) * 4 + (x % 4)] + 1) / 16;
          data.data[(y * mask.width + x) * 4 + 3] = t <= progress.current ? 255 : 0;
        }
      }
      maskCtx.putImageData(data, 0, 0);

      ctx.clearRect(0, 0, width, FULL_HEIGHT);
      drawTinted(ctx, rest, tint, width, REST_HEIGHT);
      ctx.clearRect(0, REST_HEIGHT, width, FULL_HEIGHT - REST_HEIGHT);
      applyMask(ctx, "destination-out");

      layerCtx.clearRect(0, 0, width, FULL_HEIGHT);
      drawTinted(layerCtx, hover, tint, width, FULL_HEIGHT);
      applyMask(layerCtx, "destination-in");
      ctx.drawImage(layer, 0, 0, width, FULL_HEIGHT);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      for (const [c, cx] of [
        [canvas, ctx],
        [layer, layerCtx],
      ] as const) {
        c.width = width * dpr;
        c.height = FULL_HEIGHT * dpr;
        cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      mask.width = Math.ceil(width / CELL);
      mask.height = Math.ceil(FULL_HEIGHT / CELL);
      draw.current();
    };

    rest.onload = hover.onload = () => draw.current();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = active ? 1 : 0;
    let last = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const delta = (now - last) / DURATION;
      last = now;
      progress.current = active
        ? Math.min(target, progress.current + delta)
        : Math.max(target, progress.current - delta);
      draw.current();
      if (progress.current !== target) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-x-0 top-0 -z-10 h-40 w-full" />;
}

export function HeroCta() {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={site.links.github}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      className="hero-cta group absolute inset-x-0 top-0 isolate flex h-20 items-center overflow-hidden pl-2 text-left transition-[height] duration-400 ease-in-out hover:h-40 focus-visible:h-40"
    >
      <DitherBackground active={active} />
      <span className="flex origin-left items-center gap-[0.55em] text-xl font-semibold leading-none tracking-[-0.05em] transition-transform duration-400 ease-in-out group-hover:scale-150 group-focus-visible:scale-150 sm:text-[28px]">
        <span aria-hidden className="hero-cta-arrow h-[1.1em] w-[1.1em] bg-current" />
        <span className="hero-cta-label">View on GitHub</span>
      </span>
    </Link>
  );
}
