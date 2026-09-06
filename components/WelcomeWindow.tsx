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

/* skyline rows within the sky box: [x%, w%, h%] */
const SKY_BACK: [number, number, number][] = [
  [0, 9, 30], [8, 7, 20], [14, 8, 42], [21, 6, 26], [26, 9, 52], [34, 7, 32],
  [40, 8, 46], [47, 6, 24], [52, 9, 40], [60, 7, 30], [66, 8, 50], [73, 7, 28],
  [79, 9, 44], [87, 7, 24], [92, 9, 38],
];
const SKY_FRONT: [number, number, number][] = [
  [-2, 12, 22], [9, 9, 34], [17, 7, 16], [23, 11, 40], [33, 8, 20], [40, 10, 30],
  [49, 7, 18], [55, 11, 36], [65, 8, 22], [72, 10, 32], [81, 8, 18], [87, 12, 30],
];

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
      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(to_top,rgba(120,165,210,0.35),transparent)]" />

      {/* skyline — two depth rows, lots of lit windows */}
      <div className="absolute inset-x-0 bottom-0 h-[40%]">
        {SKY_BACK.map(([x, w, h], i) => (
          <div key={i} className="absolute bottom-0 bg-[#173a63]" style={{ left: `${x}%`, width: `${w}%`, height: `${h}%` }}>
            <div className="grid grid-cols-2 content-start gap-[4px] p-[3px]">
              {Array.from({ length: 8 }).map((_, k) => (
                <span key={k} className="block h-[3px] w-[3px] bg-[#8fbde8]" style={{ opacity: (i + k) % 3 ? 0.5 : 0.15 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[28%]">
        {SKY_FRONT.map(([x, w, h], i) => (
          <div key={i} className="absolute bottom-0 bg-[#0f2748]" style={{ left: `${x}%`, width: `${w}%`, height: `${h}%` }}>
            <div className="grid grid-cols-3 content-start gap-[4px] p-[4px]">
              {Array.from({ length: 12 }).map((_, k) => (
                <motion.span
                  key={k}
                  className="block h-[3px] w-[3px]"
                  style={{ background: (i * 3 + k) % 4 === 0 ? "#ffd48a" : "#a9d0f2" }}
                  animate={reduce ? { opacity: 0.6 } : { opacity: [0.2, 0.95, 0.2] }}
                  transition={{ duration: 5 + ((i + k) % 6), repeat: Infinity, ease: "easeInOut", delay: (i * 0.7 + k) % 7 }}
                />
              ))}
            </div>
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

function Cat({ reduce }: { reduce: boolean | null }) {
  // one continuous silhouette: haunch → back → head → ears → chest, seen from
  // behind with the head tipped up toward the moon. Tail curls round the front.
  return (
    <motion.div
      className="absolute origin-bottom"
      style={{ left: "52%", bottom: `${100 - SILL}%`, width: 138, height: 208 }}
      animate={reduce ? undefined : { rotate: [0, -1.2, 0, 0.8, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 138 208" className="h-full w-full" aria-hidden>
        {/* tail */}
        <path
          d="M40 202 C15 208 -6 200 3 183 C13 190 28 190 44 195 Z"
          fill="#050a15"
        />
        {/* body + head + ears, single smooth outline */}
        <path
          d="M46 208
             C30 178 25 146 33 112
             C36 96 40 84 51 74
             C44 60 43 43 53 31
             C55 24 55 16 52 6
             C63 12 70 21 72 32
             C77 26 87 26 92 32
             C95 21 103 13 114 8
             C111 19 111 28 104 38
             C112 50 114 66 106 80
             C116 92 120 106 114 126
             C121 156 117 184 104 208
             Z"
          fill="#060c18"
        />
      </svg>
    </motion.div>
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
            <Cat reduce={reduce} />

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
