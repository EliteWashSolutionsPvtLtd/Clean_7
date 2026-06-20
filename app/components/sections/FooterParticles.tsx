"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

type Variant = "main" | "copyright";

type Rgb = { r: number; g: number; b: number };

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  phase: number;
  color: Rgb;
}

const PALETTE_MAIN: Rgb[] = [
  { r: 241, g: 164, b: 134 },
  { r: 255, g: 148, b: 49 },
  { r: 145, g: 120, b: 108 },
  { r: 153, g: 138, b: 133 },
  { r: 255, g: 250, b: 248 },
];

const PALETTE_COPYRIGHT: Rgb[] = [
  { r: 221, g: 210, b: 200 },
  { r: 241, g: 164, b: 134 },
  { r: 145, g: 120, b: 108 },
  { r: 190, g: 175, b: 165 },
];

function spawnParticles(
  w: number,
  h: number,
  count: number,
  palette: Rgb[],
): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const color = palette[Math.floor(Math.random() * palette.length)]!;
    out.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.85 + Math.random() * 5.1,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(0.12 + Math.random() * 0.38),
      baseAlpha: 0.14 + Math.random() * 0.26,
      phase: Math.random() * Math.PI * 2,
      color,
    });
  }
  return out;
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function FooterParticles({ variant }: { variant: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const enabled = !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let particles: Particle[] = [];
    let visible = true;
    const palette = variant === "main" ? PALETTE_MAIN : PALETTE_COPYRIGHT;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.max(1, Math.floor(rect.width * dpr));
      const ch = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = cw;
      canvas.height = ch;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const w = rect.width;
      const h = rect.height;
      const area = w * h;
      const count =
        variant === "main"
          ? Math.min(64, Math.max(22, Math.floor(area / 14500)))
          : Math.min(30, Math.max(10, Math.floor(area / 38000)));
      particles = spawnParticles(w, h, count, palette);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0, rootMargin: "80px" },
    );
    io.observe(container);

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;

      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w < 1 || h < 1) return;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.phase += 0.011 + p.r * 0.0018;
        p.x += p.vx + Math.sin(p.phase) * 0.42;
        p.y += p.vy;

        if (p.y < -p.r * 4) {
          p.y = h + p.r * 2;
          p.x = Math.random() * w;
        }
        if (p.x < -p.r * 4) p.x = w + p.r * 2;
        if (p.x > w + p.r * 4) p.x = -p.r * 2;

        const pulse = 0.78 + 0.22 * Math.sin(p.phase * 1.6);
        const alpha = Math.min(0.78, p.baseAlpha * pulse * 1.15);
        const glowR = p.r * (variant === "main" ? 4.25 : 3.75);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        g.addColorStop(
          0,
          `rgba(${p.color.r},${p.color.g},${p.color.b},${alpha})`,
        );
        g.addColorStop(
          0.42,
          `rgba(${p.color.r},${p.color.g},${p.color.b},${alpha * 0.52})`,
        );
        g.addColorStop(1, `rgba(${p.color.r},${p.color.g},${p.color.b},0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, [enabled, variant]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
