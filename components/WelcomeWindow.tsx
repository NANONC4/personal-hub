"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Firefly } from "@/components/Firefly";
import { HERO_BOX, HeroContent } from "@/components/HeroLightOn";

/**
 * Home page welcome gate — a moonlit lofi window, opened by scrolling.
 *
 * Reference vibe: a big blue night window, bright full moon, a dense city
 * skyline of lit windows, a black cat sitting on the sill, a couple of jars +
 * a vase. Two glass sashes cover the view; scrolling slides them apart (left /
 * right), then we fly out through the opening and the hero is simply what
 * was outside all along (scene 00 → 01 of docs/animation-plan.md).
 *
 * Layers, back to front:
 *   1 SKY     — moon + city. Fades out on the fly-through, leaving the page's
 *               own sky (NightDepth + PixelSky) behind it.
 *   2 HERO    — a still copy of the hero, readable through the glass from the
 *               first frame, growing to its real size as we pass through.
 *   3 ROOM    — wall, sashes, frame, sill, jars. Sashes slide apart, then the
 *               whole room scales up past the edges of the screen.
 *   4 LIGHT   — the small light: slips out through the gap and settles in the
 *               hero's lamp, which switches on as it lands.
 *
 * At p = 1 the copy is pixel-identical to the real hero sitting at the top of
 * the screen, so the gate hides and the page carries on with no seam. Every
 * move is tied to scroll — nothing makes anyone wait.
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

/* Skyline rows within the sky box: [x%, w%, h%].
   Slim towers packed close, matching the proportions the cozy PixelSky canvas
   draws on the hero (24–70px wide against the viewport) — a dense city, not a
   row of fat blocks. */
const SKY_BACK: [number, number, number][] = [
  [-2, 4, 42], [2, 3, 28], [5, 4, 58], [9, 3, 35], [12, 4, 72], [16, 3, 30],
  [19, 4, 50], [23, 3, 40], [26, 4, 64], [30, 3, 26], [33, 4, 55], [37, 3, 44],
  [40, 4, 80], [44, 3, 32], [47, 4, 60], [51, 3, 38], [54, 4, 70], [58, 3, 29],
  [61, 4, 52], [65, 3, 45], [68, 4, 66], [72, 3, 31], [75, 4, 57], [79, 3, 41],
  [82, 4, 74], [86, 3, 27], [89, 4, 49], [93, 3, 36], [96, 4, 62],
];
const SKY_FRONT: [number, number, number][] = [
  [-2, 5, 30], [3, 4, 46], [7, 5, 22], [12, 4, 38], [16, 5, 26], [21, 4, 52],
  [25, 5, 20], [30, 4, 34], [34, 5, 44], [39, 4, 24], [43, 5, 36], [48, 4, 50],
  [52, 5, 28], [57, 4, 42], [61, 5, 23], [66, 4, 48], [70, 5, 32], [75, 4, 26],
  [79, 5, 40], [84, 4, 21], [88, 5, 34], [93, 4, 45], [97, 5, 29],
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
        // sparse scatter rather than a filled grid — same read as the canvas city
        if (seed > 46) return <span key={k} className="block h-[3px] w-[3px]" />;
        const warm = seed % 6 !== 0;
        const base = warm ? "#ffc885" : "#9fc6ec";
        // most windows sit steady; only a few breathe, slowly
        if (reduce || seed % 10 >= 3) {
          return (
            <span
              key={k}
              className="block h-[3px] w-[3px]"
              style={{ background: base, opacity: 0.42 + (seed % 5) * 0.07 }}
            />
          );
        }
        return (
          <span
            key={k}
            className="block h-[3px] w-[3px] animate-[win-breathe_13s_ease-in-out_infinite]"
            style={{ background: base, animationDuration: `${13 + (seed % 8)}s`, animationDelay: `${-((i * 0.5 + k * 0.9) % 10)}s` }}
          />
        );
      })}
    </div>
  );
}

const SkyLayer = memo(function SkyLayer({ reduce }: { reduce: boolean | null }) {
  return (
    <div
      className="absolute [image-rendering:pixelated]"
      style={{ top: `${WIN.top}%`, bottom: `${100 - WIN.bottom}%`, left: `${WIN.left}%`, right: `${100 - WIN.right}%` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#3f74ad] via-[#2c5988] to-[#164070]" />
      {/* moon + glow */}
      <div className="absolute left-[34%] top-[6%]">
        <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(180,210,240,0.55),transparent_70%)]" />
        <div
          className={`relative h-16 w-16 rounded-full bg-[#e8f0fa] ${reduce ? "" : "animate-[moon-bob_11s_ease-in-out_infinite]"}`}
        >
          <div className="absolute left-2 top-4 h-2.5 w-2.5 rounded-full bg-black/[0.06]" />
          <div className="absolute right-3 top-7 h-2 w-2 rounded-full bg-black/[0.06]" />
          <div className="absolute left-6 bottom-2 h-1.5 w-1.5 rounded-full bg-black/[0.06]" />
        </div>
      </div>
      {STARS.map((s, i) => (
        <div
          key={i}
          className={`absolute bg-[#e2ecfb] ${reduce ? "opacity-60" : "animate-[star-twinkle_3.6s_ease-in-out_infinite]"}`}
          style={{ left: s.l, top: s.t, width: s.s, height: s.s, animationDelay: `${-s.d}s` }}
        />
      ))}

      {/* haze band above the skyline */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(to_top,rgba(120,165,210,0.3),transparent)]" />

      {/* skyline — two depth rows, near-black buildings, dense warm windows */}
      <div className="absolute inset-x-0 bottom-0 h-[46%]">
        {SKY_BACK.map(([x, w, h], i) => (
          <div key={i} className="absolute bottom-0 bg-[#0c1830]" style={{ left: `${x}%`, width: `${w}%`, height: `${h}%` }}>
            <Windows i={i + 100} cols={2} rows={Math.max(2, Math.round(h / 11))} reduce={reduce} />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[34%]">
        {SKY_FRONT.map(([x, w, h], i) => (
          <div key={i} className="absolute bottom-0 bg-[#070d1c]" style={{ left: `${x}%`, width: `${w}%`, height: `${h}%` }}>
            <Windows i={i} cols={2} rows={Math.max(2, Math.round(h / 10))} reduce={reduce} />
          </div>
        ))}
      </div>

      {/* drifting motes */}
      {!reduce &&
        Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-[#cfe1f5] opacity-0 animate-[mote-drift_9s_linear_infinite]"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 80}%`, animationDuration: `${9 + (i % 5)}s`, animationDelay: `${i * 1.3}s` }}
          />
        ))}
    </div>
  );
});

function Sash({ side, sashRef }: { side: "left" | "right"; sashRef: React.Ref<HTMLDivElement> }) {
  const isLeft = side === "left";
  return (
    <div
      ref={sashRef}
      className="absolute [image-rendering:pixelated] will-change-transform"
      style={{
        top: `${WIN.top}%`,
        bottom: `${100 - WIN.bottom}%`,
        left: isLeft ? `${WIN.left}%` : `${(WIN.left + WIN.right) / 2}%`,
        width: `${(WIN.right - WIN.left) / 2}%`,
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

/** Darkness around the opening. Part of the room, so it flies away with it. */
function Wall() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        top: `${WIN.top}%`,
        bottom: `${100 - WIN.bottom}%`,
        left: `${WIN.left}%`,
        right: `${100 - WIN.right}%`,
        boxShadow: `0 0 0 200vmax ${DARK}`,
      }}
    />
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

  // Scroll moves the layers by writing their styles directly. Re-rendering the
  // gate on every scroll frame (hundreds of painted windows) held a throttled
  // laptop to 20fps on the fly-through; React only hears about the three
  // moments that change what's on the page.
  const [open, setOpen] = useState(false); // past the sashes: clicks go through
  const [lampLit, setLampLit] = useState(false); // the small light has landed
  const [gone, setGone] = useState(false); // handed over to the real hero

  const skyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const sashLRef = useRef<HTMLDivElement>(null);
  const sashRRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLSpanElement>(null);
  const flyRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!mounted) return;
    const origin = `50% ${(WIN.top + WIN.bottom) / 2}%`;
    for (const el of [skyRef.current, heroRef.current, roomRef.current]) if (el) el.style.transformOrigin = origin;

    // Two phases across the spacer, each one screen tall, all tied to scroll.
    //   0    → 0.44  sashes slide apart; the hero is already readable behind them
    //   0.5  → 0.92  fly-through: the room scales past the screen edges, the
    //                hero copy grows to full size, the painted sky gives way
    //   0.92 → 1     hold, then hand over to the real hero
    const apply = (p: number) => {
      const offset = map(p, 0.06, 0.44, 0, 108); // sash travel, %
      const fly = map(p, 0.5, 0.92, 0, 1);
      const ease = fly * fly * (3 - 2 * fly);
      if (sashLRef.current) sashLRef.current.style.transform = `translateX(${-offset}%)`;
      if (sashRRef.current) sashRRef.current.style.transform = `translateX(${offset}%)`;
      if (roomRef.current) {
        roomRef.current.style.transform = `scale(${reduce ? 1 : 1 + ease * 2.4})`;
        roomRef.current.style.opacity = String(reduce ? 1 - map(p, 0.5, 0.9, 0, 1) : 1 - map(p, 0.8, 0.94, 0, 1));
      }
      if (heroRef.current) heroRef.current.style.transform = `scale(${reduce ? 1 : 0.6 + ease * 0.4})`;
      if (skyRef.current) {
        // gone before the page's own skyline shows, so the two cities never overlap
        skyRef.current.style.opacity = String(1 - map(p, 0.5, 0.7, 0, 1));
        skyRef.current.style.transform = `scale(${reduce ? 1 : 1 + ease * 0.12})`;
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - map(p, 0, 0.1, 0, 1));

      // the small light: out through the gap between the sashes, a lazy arc,
      // then onto the lamp, positioned straight from the lamp's live rect
      const dot = flyRef.current;
      const lamp = lampRef.current;
      if (dot && lamp) {
        const visible = !reduce && p > 0.3 && p < 0.9;
        dot.style.opacity = visible ? String(map(p, 0.3, 0.36, 0, 1)) : "0";
        if (visible) {
          const t = map(p, 0.3, 0.9, 0, 1);
          const k = t * t * (3 - 2 * t);
          const r = lamp.getBoundingClientRect();
          const sx = window.innerWidth / 2;
          const sy = window.innerHeight * 0.45;
          const x = sx + (r.left + r.width / 2 - 3 - sx) * k;
          const y = sy + (r.top + 5 - sy) * k - Math.sin(Math.PI * k) * 90;
          dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }

      setOpen(p > 0.5);
      setLampLit(p >= 0.9);
      setGone(p >= 0.999);
    };

    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = spacerRef.current;
      if (!el) return;
      // p reaches 1 exactly when the hero has settled at the top of the screen
      const rect = el.getBoundingClientRect();
      apply(rect.height > 0 ? clamp(-rect.top / rect.height) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted, reduce]);

  useEffect(() => {
    const init = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(init);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.gate = gone ? "done" : "closed";
    return () => {
      delete root.dataset.gate;
    };
  }, [gone]);

  /** Scroll past the spacer so the gate finishes opening on its own. */
  const openGate = useCallback(() => {
    const el = spacerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top + rect.height,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [reduce]);

  // Esc dismisses the gate, like any other overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") openGate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openGate]);

  return (
    <>
      {/* two screens: one for the gate, one to fly through it */}
      <div ref={spacerRef} aria-hidden className="h-[200vh]" />
      {!mounted && <div aria-hidden className="fixed inset-0 z-[70]" style={{ background: DARK }} />}
      {mounted &&
        createPortal(
          <div
            aria-hidden
            onClick={openGate}
            className="fixed inset-0 z-[70] overflow-hidden [image-rendering:pixelated]"
            style={{
              pointerEvents: open ? "none" : "auto",
              visibility: gone ? "hidden" : "visible",
              cursor: open ? "default" : "pointer",
            }}
          >
            <div ref={skyRef} className="absolute inset-0 will-change-transform">
              <SkyLayer reduce={reduce} />
            </div>

            {/* the hero, already out there on the sky (a still copy: inert, so
                its link can't be tabbed to while the real one is hidden) */}
            <div ref={heroRef} inert className="absolute inset-0 will-change-transform" style={{ transform: "scale(0.6)" }}>
              <div className={HERO_BOX}>
                <HeroContent lightsOn={lampLit} lampRef={lampRef} />
              </div>
            </div>

            <div ref={roomRef} className="absolute inset-0 will-change-transform">
              <Wall />
              <Sash side="left" sashRef={sashLRef} />
              <Sash side="right" sashRef={sashRRef} />
              <OuterFrame />
              <Sill />
              <SillStuff />
            </div>

            <Firefly ref={flyRef} className="fixed opacity-0" />

            <div ref={hintRef} className="pointer-events-none absolute bottom-[9%] left-1/2 z-10 -translate-x-1/2 text-center">
              <p className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.35em] text-sky-100/80 md:text-xs">
                scroll or click to open
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
