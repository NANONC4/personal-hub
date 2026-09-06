"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Home page welcome gate — a moonlit lofi window, opened by scrolling.
 *
 * Reference vibe: a big blue night window, bright full moon, a dense city
 * skyline of lit windows, a black cat sitting on the sill, a couple of jars +
 * a vase. Two glass sashes cover the view; scrolling slides them apart (left /
 * right) to reveal the city + the NANONC4 sign, then the layer fades to hero.
 *
 * Layers, back to front:
 *   1 SKY     — moon + city, fully static. Never moves.
 *   2 SIGN    — NANONC4 on the sky.
 *   3 SASHES  — two framed glass panels, slide apart on scroll.
 *   4 SILL    — window ledge + cat + jars, static foreground.
 *
 * Progress: a plain scroll listener on an invisible spacer (framer useScroll
 * misbehaves with Lenis here). Portalled to <body>.
 */

const clamp = (n: number, a = 0, b = 1) => Math.min(Math.max(n, a), b);
const map = (v: number, inA: number, inB: number, outA: number, outB: number) =>
  outA + clamp((v - inA) / (inB - inA)) * (outB - outA);

const WIN = { top: 4, bottom: 80, left: 5, right: 95 };
const SILL = WIN.bottom;
const DARK = "#0a1424";

const STARS = [
  { l: "30%", t: "10%", s: 3, d: 0 },
  { l: "42%", t: "16%", s: 2, d: 1.4 },
  { l: "54%", t: "8%", s: 3, d: 0.7 },
  { l: "60%", t: "20%", s: 2, d: 2.1 },
  { l: "37%", t: "26%", s: 2, d: 1.1 },
  { l: "66%", t: "14%", s: 2, d: 2.6 },
  { l: "24%", t: "22%", s: 2, d: 3.2 },
  { l: "72%", t: "24%", s: 3, d: 0.4 },
];

/* skyline rows within the sky box: [x%, w%, h%] — packed, varied heights, a few towers */
const SKY_BACK: [number, number, number][] = [
  [-2, 8, 44], [5, 6, 30], [10, 7, 62], [16, 5, 38], [20, 8, 88], [27, 6, 46],
  [32, 7, 34], [38, 6, 70], [43, 8, 40], [50, 6, 96], [55, 7, 52], [61, 6, 36],
  [66, 8, 64], [73, 6, 42], [78, 7, 78], [84, 6, 34], [89, 8, 56], [95, 7, 44],
];
const SKY_FRONT: [number, number, number][] = [
  [-3, 11, 34], [6, 8, 52], [13, 7, 26], [19, 10, 44], [27, 7, 64], [33, 9, 30],
  [41, 8, 50], [48, 7, 22], [54, 10, 40], [62, 7, 58], [68, 9, 28], [76, 8, 46],
  [83, 7, 34], [89, 10, 54], [96, 8, 30],
];

/** Warm-lit window grid for one building, à la the cozy PixelSky skyline. */
function Windows({ i, cols, rows, reduce }: { i: number; cols: number; rows: number; reduce: boolean | null }) {
  return (
    <div
      className="grid content-start gap-[4px] p-[4px]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: cols * rows }).map((_, k) => {
        const seed = (i * 71 + k * 37) % 100;
        if (seed > 62) return <span key={k} className="block h-[3px] w-[3px]" />;
        const warm = seed % 5 !== 0;
        const base = warm ? "#ffc885" : "#9fc6ec";
        return (
          <motion.span
            key={k}
            className="block h-[3px] w-[3px]"
            style={{ background: base }}
            animate={reduce ? { opacity: 0.55 } : { opacity: [0.12, 0.85, 0.35, 0.75, 0.12] }}
            transition={{ duration: 6 + (seed % 7), repeat: Infinity, ease: "easeInOut", delay: (i * 0.5 + k * 0.9) % 8 }}
          />
        );
      })}
    </div>
  );
}

function SkyLayer({ reduce }: { reduce: boolean | null }) {
  return (
    <div
      className="absolute [image-rendering:pixelated]"
      style={{ top: `${WIN.top}%`, bottom: `${100 - WIN.bottom}%`, left: `${WIN.left}%`, right: `${100 - WIN.right}%` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#3f74ad] via-[#2c5988] to-[#164070]" />
      {/* moon + glow */}
      <div className="absolute left-[34%] top-[6%]">
        <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(180,210,240,0.55),transparent_70%)]" />
        <motion.div
          className="relative h-16 w-16 rounded-full bg-[#e8f0fa]"
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-2 top-4 h-2.5 w-2.5 rounded-full bg-black/[0.06]" />
          <div className="absolute right-3 top-7 h-2 w-2 rounded-full bg-black/[0.06]" />
          <div className="absolute left-6 bottom-2 h-1.5 w-1.5 rounded-full bg-black/[0.06]" />
        </motion.div>
      </div>
      {STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute bg-[#e2ecfb]"
          style={{ left: s.l, top: s.t, width: s.s, height: s.s }}
          animate={reduce ? { opacity: 0.6 } : { opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: s.d }}
        />
      ))}

      {/* haze band above the skyline */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(to_top,rgba(120,165,210,0.3),transparent)]" />

      {/* skyline — two depth rows, near-black buildings, dense warm windows */}
      <div className="absolute inset-x-0 bottom-0 h-[46%]">
        {SKY_BACK.map(([x, w, h], i) => (
          <div key={i} className="absolute bottom-0 bg-[#0c1830]" style={{ left: `${x}%`, width: `${w}%`, height: `${h}%` }}>
            <Windows i={i + 100} cols={2} rows={Math.max(3, Math.round(h / 9))} reduce={reduce} />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[34%]">
        {SKY_FRONT.map(([x, w, h], i) => (
          <div key={i} className="absolute bottom-0 bg-[#070d1c]" style={{ left: `${x}%`, width: `${w}%`, height: `${h}%` }}>
            <Windows i={i} cols={3} rows={Math.max(3, Math.round(h / 8))} reduce={reduce} />
          </div>
        ))}
      </div>

      {/* drifting motes */}
      {!reduce &&
        Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#cfe1f5]"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 80}%` }}
            animate={{ y: [0, 40], x: [0, 12], opacity: [0, 0.7, 0] }}
            transition={{ duration: 9 + (i % 5), repeat: Infinity, ease: "linear", delay: i * 1.3 }}
          />
        ))}
    </div>
  );
}

function Sash({ side, offset }: { side: "left" | "right"; offset: number }) {
  const isLeft = side === "left";
  return (
    <div
      className="absolute [image-rendering:pixelated] will-change-transform"
      style={{
        top: `${WIN.top}%`,
        bottom: `${100 - WIN.bottom}%`,
        left: isLeft ? `${WIN.left}%` : `${(WIN.left + WIN.right) / 2}%`,
        width: `${(WIN.right - WIN.left) / 2}%`,
        transform: `translateX(${(isLeft ? -1 : 1) * offset}%)`,
      }}
    >
      {/* night glass: dims the sky behind while closed */}
      <div className="absolute inset-0 bg-[#0c1c38]/45" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_38%,rgba(160,195,230,0.10)_46%,transparent_54%)]" />
      {/* sash frame + muntins (2 x 4 lites) */}
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 6px ${DARK}` }} />
      <div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2" style={{ background: DARK }} />
      {[25, 50, 75].map((y) => (
        <div key={y} className="absolute inset-x-0 h-[5px]" style={{ top: `${y}%`, background: DARK }} />
      ))}
      {/* pull handle on the meeting stile */}
      <div
        className={`absolute top-1/2 ${isLeft ? "right-1" : "left-1"} h-12 w-[6px] -translate-y-1/2 rounded bg-[#1b2c48]`}
      />
    </div>
  );
}

function OuterFrame() {
  const T = 12;
  return (
    <div
      className="pointer-events-none absolute [image-rendering:pixelated]"
      style={{ top: `${WIN.top}%`, bottom: `${100 - WIN.bottom}%`, left: `${WIN.left}%`, right: `${100 - WIN.right}%` }}
    >
      <div className="absolute" style={{ top: -T, left: -T, right: -T, height: T, background: DARK }} />
      <div className="absolute" style={{ bottom: -T, left: -T, right: -T, height: T, background: DARK }} />
      <div className="absolute" style={{ left: -T, top: -T, bottom: -T, width: T, background: DARK }} />
      <div className="absolute" style={{ right: -T, top: -T, bottom: -T, width: T, background: DARK }} />
      <div className="absolute" style={{ top: -T, left: -T, right: -T, height: 3, background: "#25395a" }} />
    </div>
  );
}

function SillStuff() {
  return (
    <>
      {/* left: a tall bottle + a mug */}
      <div className="absolute [image-rendering:pixelated]" style={{ left: "9%", bottom: `${100 - SILL}%` }}>
        <div className="relative h-16 w-14">
          <div className="absolute bottom-0 left-1 h-14 w-4 rounded-t bg-[#12335c]" />
          <div className="absolute bottom-12 left-[9px] h-3 w-1.5 bg-[#12335c]" />
          <div className="absolute bottom-0 left-7 h-6 w-6 rounded-b bg-[#0d2545]" />
          <div className="absolute bottom-2 left-[46px] h-3.5 w-3.5 rounded-full border-2 border-[#0d2545]" />
        </div>
      </div>
      {/* right: a vase with dried stems + two jars */}
      <div className="absolute [image-rendering:pixelated]" style={{ right: "9%", bottom: `${100 - SILL}%` }}>
        <div className="relative h-24 w-24">
          {[-16, -4, 8, 20].map((r, i) => (
            <div
              key={i}
              className="absolute bottom-12 right-8 w-[3px] origin-bottom rounded-t bg-[#173a63]"
              style={{ height: 34 + (i % 2) * 12, transform: `rotate(${r}deg)` }}
            >
              <div className="absolute -left-1 top-1/3 h-2 w-2 rounded-full bg-[#1c4570]" />
            </div>
          ))}
          <div className="absolute bottom-0 right-6 h-14 w-9 rounded-t-md rounded-b bg-[#0f2c50]" />
          <div className="absolute bottom-0 right-0 h-8 w-6 rounded bg-[#0d2545]" />
          <div className="absolute bottom-0 right-[68px] h-6 w-5 rounded bg-[#0d2545]" />
        </div>
      </div>
    </>
  );
}

function Sill() {
  return (
    <div className="pointer-events-none absolute inset-x-0 [image-rendering:pixelated]" style={{ top: `${SILL}%`, bottom: 0 }}>
      <div className="absolute inset-x-0 top-0 h-[10px] bg-[#132741]" />
      <div className="absolute inset-x-0 top-[10px] h-[10px] bg-[#0c1c30]" />
      <div className="absolute inset-x-0 top-[20px] bottom-0 bg-[#060d18]" />
    </div>
  );
}

export default function WelcomeWindow() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = spacerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setP(total > 0 ? clamp(-rect.top / total) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const init = requestAnimationFrame(() => {
      setMounted(true);
      measure();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(init);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const offset = map(p, 0.05, 0.64, 0, 108); // sash travel, %
  const signOpacity = map(p, 0.3, 0.5, 0, 1) * (1 - map(p, 0.82, 0.95, 0, 1));
  const signShift = map(p, 0.3, 0.7, 20, 0);
  const hintOpacity = 1 - map(p, 0, 0.12, 0, 1);
  const layerOpacity = 1 - map(p, 0.88, 1, 0, 1);
  const gone = p >= 0.999;

  return (
    <>
      <div ref={spacerRef} aria-hidden className="h-[220vh]" />
      {!mounted && <div aria-hidden className="fixed inset-0 z-[70]" style={{ background: DARK }} />}
      {mounted &&
        createPortal(
          <div
            aria-hidden
            className="fixed inset-0 z-[70] overflow-hidden [image-rendering:pixelated]"
            style={{ opacity: layerOpacity, pointerEvents: p > 0.6 ? "none" : "auto", visibility: gone ? "hidden" : "visible", background: DARK }}
          >
            <SkyLayer reduce={reduce} />

            {/* NANONC4 sign on the (static) sky */}
            <div
              className="absolute flex flex-col items-center justify-center text-center"
              style={{
                top: `${WIN.top}%`,
                bottom: `${100 - WIN.bottom + 8}%`,
                left: `${WIN.left}%`,
                right: `${100 - WIN.right}%`,
                opacity: signOpacity,
                transform: `translateY(${signShift}px)`,
              }}
            >
              <p className="mb-2 font-[family-name:var(--font-pixel)] text-[8px] uppercase tracking-[0.3em] text-sky-100/80 md:text-[10px]">
                welcome to the studio of
              </p>
              <h1 className="font-[family-name:var(--font-pixel)] text-3xl uppercase leading-none tracking-wider text-white drop-shadow-[0_0_18px_rgba(150,200,255,0.5)] md:text-5xl">
                NANO<span className="text-pink-400">NC4</span>
              </h1>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.22em] text-sky-100/70 md:text-[11px]">
                Creative Developer · Pixel Art · Mini Games
              </p>
            </div>

            <Sash side="left" offset={offset} />
            <Sash side="right" offset={offset} />
            <OuterFrame />

            <Sill />
            <SillStuff />

            <div
              className="pointer-events-none absolute bottom-[9%] left-1/2 z-10 -translate-x-1/2 text-center"
              style={{ opacity: hintOpacity }}
            >
              <p className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.35em] text-sky-100/80 md:text-xs">
                scroll to open
              </p>
              <motion.div
                animate={reduce ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mt-2 h-4 w-4 rotate-45 border-b-2 border-r-2 border-sky-100/60"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
