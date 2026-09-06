"use client";
import { useEffect, useRef } from "react";

type PixelSkyProps = {
  className?: string;
  /**
   * Opt-in lofi atmosphere layer: real-time day/night tint, warm horizon glow,
   * a distant pixel skyline with flickering windows, drifting fireflies, soft fog
   * and the occasional "make a wish" shooting star. Defaults to false so every
   * existing usage keeps the plain starfield untouched.
   */
  cozy?: boolean;
};

/** Palette keyframes across a 24h day. Values are interpolated by local time. */
type Mood = {
  h: number;
  star: [number, number, number];
  starA: number;
  glow: [number, number, number];
  glowA: number;
  meteor: number;
  fire: number;
};

const MOODS: Mood[] = [
  { h: 0, star: [200, 215, 255], starA: 1.0, glow: [30, 41, 90], glowA: 0.26, meteor: 0.12, fire: 0.9 },
  { h: 5, star: [208, 200, 228], starA: 0.82, glow: [72, 60, 112], glowA: 0.3, meteor: 0.08, fire: 0.7 },
  { h: 7, star: [255, 222, 194], starA: 0.42, glow: [240, 162, 122], glowA: 0.34, meteor: 0.02, fire: 0.35 },
  { h: 11, star: [222, 227, 246], starA: 0.16, glow: [128, 156, 205], glowA: 0.18, meteor: 0.0, fire: 0.12 },
  { h: 16, star: [222, 227, 246], starA: 0.2, glow: [150, 150, 210], glowA: 0.2, meteor: 0.0, fire: 0.18 },
  { h: 18, star: [255, 200, 182], starA: 0.5, glow: [250, 140, 150], glowA: 0.36, meteor: 0.03, fire: 0.5 },
  { h: 20, star: [210, 216, 255], starA: 0.9, glow: [58, 50, 120], glowA: 0.3, meteor: 0.1, fire: 0.85 },
  { h: 24, star: [200, 215, 255], starA: 1.0, glow: [30, 41, 90], glowA: 0.26, meteor: 0.12, fire: 0.9 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function moodAt(date: Date): Mood {
  const hour = date.getHours() + date.getMinutes() / 60;
  let lo = MOODS[0];
  let hi = MOODS[MOODS.length - 1];
  for (let i = 0; i < MOODS.length - 1; i++) {
    if (hour >= MOODS[i].h && hour <= MOODS[i + 1].h) {
      lo = MOODS[i];
      hi = MOODS[i + 1];
      break;
    }
  }
  const t = hi.h === lo.h ? 0 : (hour - lo.h) / (hi.h - lo.h);
  return {
    h: hour,
    star: [lerp(lo.star[0], hi.star[0], t), lerp(lo.star[1], hi.star[1], t), lerp(lo.star[2], hi.star[2], t)],
    starA: lerp(lo.starA, hi.starA, t),
    glow: [lerp(lo.glow[0], hi.glow[0], t), lerp(lo.glow[1], hi.glow[1], t), lerp(lo.glow[2], hi.glow[2], t)],
    glowA: lerp(lo.glowA, hi.glowA, t),
    meteor: lerp(lo.meteor, hi.meteor, t),
    fire: lerp(lo.fire, hi.fire, t),
  };
}

export default function PixelSky({
  className = "absolute inset-0 z-0 overflow-hidden pointer-events-none",
  cozy = false,
}: PixelSkyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let mood = moodAt(new Date());
    const moodTimer = cozy
      ? window.setInterval(() => {
          mood = moodAt(new Date());
        }, 60_000)
      : 0;

    // ---- Distant pixel skyline (regenerated on resize) --------------------
    type Window_ = { x: number; y: number; s: number; lit: number; target: number; next: number };
    type Building = { x: number; w: number; h: number; windows: Window_[] };
    let skyline: Building[] = [];

    const buildSkyline = () => {
      skyline = [];
      if (!cozy) return;
      let x = -20;
      while (x < width + 20) {
        const w = 24 + Math.floor(Math.random() * 46);
        const h = 40 + Math.floor(Math.random() * Math.min(180, height * 0.28));
        const windows: Window_[] = [];
        for (let wx = x + 6; wx < x + w - 6; wx += 10) {
          for (let wy = height - h + 10; wy < height - 10; wy += 12) {
            if (Math.random() < 0.55) {
              windows.push({
                x: wx,
                y: wy,
                s: 4,
                lit: Math.random() < 0.5 ? Math.random() : 0,
                target: Math.random() < 0.5 ? 0.8 + Math.random() * 0.2 : 0,
                next: performance.now() + 2000 + Math.random() * 6000,
              });
            }
          }
        }
        skyline.push({ x, w, h, windows });
        x += w + Math.floor(Math.random() * 10);
      }
    };

    // ---- Fireflies ------------------------------------------------------------
    type Fly = { x: number; y: number; vy: number; phase: number; sway: number; amp: number };
    let flies: Fly[] = [];
    const buildFlies = () => {
      flies = [];
      if (!cozy) return;
      const count = reduceMotion ? 10 : 24;
      for (let i = 0; i < count; i++) {
        flies.push({
          x: Math.random() * width,
          y: height * 0.35 + Math.random() * height * 0.6,
          vy: reduceMotion ? 0 : 0.1 + Math.random() * 0.18,
          phase: Math.random() * Math.PI * 2,
          sway: 0.006 + Math.random() * 0.01,
          amp: 0.3 + Math.random() * 0.7,
        });
      }
    };

    // ---- Fog bands ----------------------------------------------------------
    const fog = [
      { y: 0.62, x: 0, speed: 0.12 },
      { y: 0.78, x: 0, speed: -0.08 },
    ];

    // ---- "make a wish" ----------------------------------------------------------
    type Wish = { x: number; y: number; life: number };
    let wishes: Wish[] = [];
    let lastWishAt = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      buildSkyline();
      buildFlies();
    };
    window.addEventListener("resize", resize);
    resize();

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      fadeSpeed: number;
      isFadingIn: boolean;
      isFalling: boolean;
      fallSpeedX: number;
      fallSpeedY: number;
      wished: boolean;

      constructor(forceFullOpacity = false) {
        // Spawn anywhere on the screen
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        // Chance to be a falling star (meteor). In cozy mode this tracks the
        // time of day (no meteors around midday, more at night).
        const meteorChance = cozy ? Math.max(0.06, mood.meteor * 0.7) : 0.15;
        this.isFalling = Math.random() < meteorChance;
        this.wished = false;

        if (this.isFalling) {
          this.size = Math.random() < 0.5 ? 4 : 8; // Longer streaks for falling
          this.fallSpeedX = -(Math.random() * 3 + 3); // Fall bottom-left
          this.fallSpeedY = Math.random() * 3 + 3;
          this.fadeSpeed = Math.random() * 0.01 + 0.01; // Slower fade for meteors
        } else {
          // Blinking stars
          const sizes = [4, 4, 6, 8]; // Big pixelated sizes
          this.size = sizes[Math.floor(Math.random() * sizes.length)];
          this.fallSpeedX = 0;
          this.fallSpeedY = 0;
          this.fadeSpeed = Math.random() * 0.02 + 0.015; // Random blink speed
        }

        // If it's the initial load, randomize current opacity so they don't all blink together
        this.opacity = forceFullOpacity ? Math.random() : 0;
        this.isFadingIn = !forceFullOpacity;
      }

      update() {
        if (this.isFadingIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 1) {
            this.opacity = 1;
            this.isFadingIn = false;
          }
        } else {
          this.opacity -= this.fadeSpeed;
        }

        if (this.isFalling) {
          this.x += this.fallSpeedX;
          this.y += this.fallSpeedY;

          // Rare, rate-limited "make a wish" trailing a meteor.
          if (cozy && !this.wished && this.y > height * 0.25) {
            this.wished = true;
            const now = performance.now();
            if (now - lastWishAt > 18_000 && Math.random() < 0.85) {
              lastWishAt = now;
              wishes.push({ x: this.x - 60, y: this.y + 18, life: 0 });
            }
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;

        const currentOpacity = this.opacity * (cozy ? mood.starA : 1);
        if (currentOpacity <= 0.01) return;
        const [r, g, b] = cozy ? mood.star : [255, 255, 255];

        // 1. Drop shadow (blueish, to lift the star off the background)
        ctx.fillStyle = `rgba(2, 132, 199, ${currentOpacity * 0.3})`;
        if (this.isFalling) {
          ctx.fillRect(Math.floor(this.x) + 4, Math.floor(this.y) + 4, this.size * 2, this.size / 2);
        } else {
          ctx.fillRect(Math.floor(this.x) + 4, Math.floor(this.y) + 4, this.size, this.size);
        }

        // 2. Main star
        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${currentOpacity})`;
        if (this.isFalling) {
          ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size * 2, this.size / 2);
        } else {
          ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
        }
      }
    }

    let stars: Star[] = [];
    const maxStars = 50;
    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star(true));
    }

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0 });
    observer.observe(canvas);

    const drawHorizonGlow = () => {
      const [r, g, b] = mood.glow;
      const cy = height * 1.18;
      const radius = Math.max(width * 0.55, height * 0.6);
      const grad = ctx.createRadialGradient(width * 0.5, cy, 0, width * 0.5, cy, radius);
      grad.addColorStop(0, `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${mood.glowA})`);
      grad.addColorStop(0.6, `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${mood.glowA * 0.28})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, height * 0.45, width, height * 0.55);
    };

    const drawSkyline = (now: number) => {
      for (const bld of skyline) {
        ctx.fillStyle = "rgba(4, 8, 18, 0.85)";
        ctx.fillRect(Math.floor(bld.x), Math.floor(height - bld.h), bld.w, bld.h);
        for (const win of bld.windows) {
          if (now > win.next) {
            win.target = Math.random() < 0.55 ? 0.75 + Math.random() * 0.25 : 0;
            win.next = now + 2500 + Math.random() * 7000;
          }
          win.lit += (win.target - win.lit) * 0.02;
          if (win.lit > 0.02) {
            ctx.fillStyle = `rgba(255, 200, 130, ${win.lit * 0.9})`;
            ctx.fillRect(win.x, win.y, win.s, win.s);
          }
        }
      }
    };

    const drawFog = (delta: number) => {
      if (reduceMotion) return;
      for (const band of fog) {
        band.x -= band.speed * delta;
        if (band.x < -width) band.x += width;
        const grad = ctx.createLinearGradient(0, height * band.y, 0, height * (band.y + 0.22));
        grad.addColorStop(0, "rgba(150, 165, 190, 0)");
        grad.addColorStop(0.5, "rgba(150, 165, 190, 0.07)");
        grad.addColorStop(1, "rgba(150, 165, 190, 0)");
        ctx.fillStyle = grad;
        const y = height * band.y;
        ctx.fillRect(band.x, y, width, height * 0.22);
        ctx.fillRect(band.x + width, y, width, height * 0.22);
      }
    };

    const drawFlies = (now: number, delta: number) => {
      for (const f of flies) {
        f.y -= f.vy * delta;
        f.phase += f.sway * delta;
        const px = f.x + Math.sin(f.phase) * 14 * f.amp;
        if (f.y < height * 0.26) {
          f.y = height + Math.random() * 40;
          f.x = Math.random() * width;
        }
        const pulse = 0.5 + 0.5 * (0.5 + 0.5 * Math.sin(now * 0.002 + f.phase));
        const a = pulse * Math.max(0.35, mood.fire);
        if (a <= 0.02) continue;
        ctx.fillStyle = `rgba(255, 205, 120, ${a * 0.25})`;
        ctx.fillRect(Math.floor(px) - 7, Math.floor(f.y) - 7, 18, 18);
        ctx.fillStyle = `rgba(255, 220, 150, ${a * 0.5})`;
        ctx.fillRect(Math.floor(px) - 3, Math.floor(f.y) - 3, 10, 10);
        ctx.fillStyle = `rgba(255, 248, 210, ${a})`;
        ctx.fillRect(Math.floor(px), Math.floor(f.y), 5, 5);
      }
    };

    const drawWishes = (delta: number) => {
      wishes = wishes.filter((w) => w.life < 1);
      for (const w of wishes) {
        w.life += 0.004 * delta;
        w.y -= 0.15 * delta;
        const a = Math.sin(w.life * Math.PI) * 0.7;
        if (a <= 0.02) continue;
        ctx.font = "14px ui-monospace, Menlo, monospace";
        ctx.fillStyle = `rgba(255, 224, 160, ${a * 0.4})`;
        ctx.fillText("✧ make a wish", w.x + 1, w.y + 1);
        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.fillText("✧ make a wish", w.x, w.y);
      }
    };

    let lastFrame = performance.now();

    const render = () => {
      const now = performance.now();
      // delta normalised to ~60fps steps, clamped so a tab-return doesn't lurch
      const delta = Math.min((now - lastFrame) / 16.667, 3);
      lastFrame = now;

      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        if (cozy) {
          drawHorizonGlow();
          drawFog(delta);
          drawSkyline(now);
        }

        for (let i = stars.length - 1; i >= 0; i--) {
          const star = stars[i];
          star.update();
          star.draw(ctx);

          if (star.opacity <= 0 && !star.isFadingIn) {
            stars.splice(i, 1);
            stars.push(new Star());
          }

          if (star.isFalling && (star.x < -20 || star.y > height + 20)) {
            stars.splice(i, 1);
            stars.push(new Star());
          }
        }

        if (cozy) {
          drawFlies(now, delta);
          drawWishes(delta);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (moodTimer) window.clearInterval(moodTimer);
    };
  }, [cozy]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
