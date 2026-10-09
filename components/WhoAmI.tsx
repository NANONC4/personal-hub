"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Scene 02 — "Who am I?".
 *
 * Entrance (plays once, the first time the section is half on screen):
 *   the section starts dark with the jar far away, just a small light; the
 *   camera comes in until it's a jar of fireflies on a shelf. The lid opens,
 *   the fireflies slip out one after another and each one flies to a line of
 *   the text and writes it, left to right. Then they're loose, drifting all
 *   over the section.
 * Feature: drag a firefly back to the jar and let go. The lid opens, it
 *   drops in through the mouth and sinks to its spot inside.
 *
 * The fireflies are moved by one animation loop writing transforms directly
 * (only while the section is on screen); React only hears about releases,
 * catches and the lid.
 */

const COUNT = 7; // the heading + six lines, one firefly each

// timeline, ms from the moment it starts
const LID_AT = 2300;
const RELEASE_AT = 2500;
const STAGGER = 420;
const LID_SHUT_AT = RELEASE_AT + COUNT * STAGGER + 400;
const SWEEP_S = 0.9; // seconds for a firefly to write one line

// where each one rests inside the glass (its centre), as % of the jar box
const INSIDE: [number, number][] = [
  [46, 58], [34, 76], [62, 80], [40, 44], [60, 52], [30, 62], [66, 68],
];

const HIT = 44; // touch target, px

type Fly = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  px: number; // pointer, while dragging
  py: number;
  phase: number;
  mode: "inJar" | "exit" | "sweep" | "wander" | "drag" | "jar" | "fall";
};

const CSS = `
@keyframes bug-glow { 0%, 62% { opacity: 1 } 63%, 80% { opacity: .25 } 81%, 100% { opacity: 1 } }
@keyframes bug-flap { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes bug-flap-b { 0%, 49% { opacity: 0 } 50%, 100% { opacity: 1 } }
@keyframes jar-drift {
  0%, 100% { transform: translate(0, 0) } 25% { transform: translate(4px, -6px) }
  50% { transform: translate(-3px, -10px) } 75% { transform: translate(-5px, -3px) }
}
@keyframes steam { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes steam-b { 0%, 49% { opacity: 0 } 50%, 100% { opacity: 1 } }
@keyframes bulb { 0%, 70% { opacity: 1 } 71%, 100% { opacity: .35 } }`;

/**
 * A firefly you can tell apart from the stars: a dark little body, wings that
 * flap in two frames, and a yellow-green tail that glows and blinks.
 */
function Bug({ delay = 0 }: { delay?: number }) {
  return (
    <svg viewBox="0 0 7 8" width="21" height="24" shapeRendering="crispEdges" aria-hidden className="block">
      {/* wings, two frames */}
      <g fill="#dbeafe" fillOpacity="0.6" className="motion-safe:animate-[bug-flap_0.3s_steps(1,end)_infinite]">
        <rect x="0" y="1" width="2" height="2" />
        <rect x="5" y="1" width="2" height="2" />
      </g>
      <g fill="#dbeafe" fillOpacity="0.6" className="opacity-0 motion-safe:animate-[bug-flap-b_0.3s_steps(1,end)_infinite]">
        <rect x="1" y="2" width="1" height="2" />
        <rect x="5" y="2" width="1" height="2" />
      </g>
      {/* head + body */}
      <rect x="3" y="0" width="1" height="1" fill="#0f172a" />
      <rect x="2" y="1" width="3" height="3" fill="#1e293b" />
      {/* the light */}
      <g className="motion-safe:animate-[bug-glow_2.8s_steps(1,end)_infinite]" style={{ animationDelay: `${delay}s` }}>
        <rect x="2" y="4" width="3" height="3" fill="#d9f99d" />
        <rect x="3" y="7" width="1" height="1" fill="#bef264" />
        <rect x="3" y="5" width="1" height="1" fill="#f7fee7" />
      </g>
    </svg>
  );
}

function Jar({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 32 40" className="block h-auto w-full overflow-visible" shapeRendering="crispEdges" aria-hidden>
      {/* lid, hinged at its left corner */}
      <g
        className="transition-transform duration-500"
        style={{ transformBox: "fill-box", transformOrigin: "0 100%", transform: open ? "rotate(-16deg) translateY(-1px)" : undefined }}
      >
        <rect x="9" y="1" width="14" height="4" fill="#475569" />
        <rect x="9" y="1" width="14" height="1" fill="#94a3b8" />
      </g>
      <rect x="10" y="5" width="12" height="3" fill="#1e293b" />
      <rect x="9" y="6" width="14" height="1" fill="#b45309" />
      {/* glass. The light in the jar is the fireflies themselves: a warm tint
          over this blue night only ever came out olive. */}
      <path d="M7 9h18v2h2v25h-2v2H7v-2H5V11h2z" fill="#94b8dc" fillOpacity="0.1" />
      <path
        d="M7 9h18v2h2v25h-2v2H7v-2H5V11h2z"
        fill="none"
        stroke="#9fb3cc"
        strokeOpacity="0.7"
        strokeWidth="1"
        transform="translate(0.5 0.5) scale(0.97)"
      />
      <rect x="8" y="13" width="1" height="16" fill="#ffffff" fillOpacity="0.35" />
      <rect x="10" y="12" width="1" height="4" fill="#ffffff" fillOpacity="0.25" />
    </svg>
  );
}

/** A few things that live on the shelf next to the jar. */
function Books() {
  return (
    <svg viewBox="0 0 20 14" className="block h-auto w-full" shapeRendering="crispEdges" aria-hidden>
      <rect x="1" y="10" width="18" height="4" fill="#9d174d" />
      <rect x="1" y="10" width="18" height="1" fill="#be185d" />
      <rect x="17" y="11" width="1" height="3" fill="#fbcfe8" fillOpacity="0.6" />
      <rect x="3" y="6" width="15" height="4" fill="#0e7490" />
      <rect x="3" y="6" width="15" height="1" fill="#0891b2" />
      <rect x="16" y="7" width="1" height="3" fill="#cffafe" fillOpacity="0.6" />
      <rect x="2" y="2" width="14" height="4" fill="#334155" />
      <rect x="2" y="2" width="14" height="1" fill="#475569" />
      <rect x="14" y="3" width="1" height="3" fill="#e2e8f0" fillOpacity="0.5" />
    </svg>
  );
}

function Mug() {
  return (
    <svg viewBox="0 0 12 16" className="block h-auto w-full overflow-visible" shapeRendering="crispEdges" aria-hidden>
      {/* steam, two frames */}
      <g fill="#e2e8f0" fillOpacity="0.45" className="motion-safe:animate-[steam_1.6s_steps(1,end)_infinite]">
        <rect x="3" y="1" width="1" height="2" />
        <rect x="4" y="3" width="1" height="2" />
        <rect x="6" y="0" width="1" height="2" />
        <rect x="7" y="2" width="1" height="2" />
      </g>
      <g fill="#e2e8f0" fillOpacity="0.45" className="opacity-0 motion-safe:animate-[steam-b_1.6s_steps(1,end)_infinite]">
        <rect x="4" y="1" width="1" height="2" />
        <rect x="3" y="3" width="1" height="2" />
        <rect x="7" y="0" width="1" height="2" />
        <rect x="6" y="2" width="1" height="2" />
      </g>
      <rect x="1" y="7" width="8" height="8" fill="#cbd5e1" />
      <rect x="1" y="7" width="8" height="1" fill="#f1f5f9" />
      <rect x="2" y="8" width="6" height="1" fill="#78350f" />
      <rect x="9" y="9" width="2" height="1" fill="#cbd5e1" />
      <rect x="10" y="10" width="1" height="2" fill="#cbd5e1" />
      <rect x="9" y="12" width="2" height="1" fill="#cbd5e1" />
      <rect x="3" y="10" width="3" height="2" fill="#f472b6" fillOpacity="0.8" />
    </svg>
  );
}

function Plant() {
  return (
    <svg viewBox="0 0 12 18" className="block h-auto w-full" shapeRendering="crispEdges" aria-hidden>
      <rect x="5" y="1" width="2" height="3" fill="#22c55e" />
      <rect x="2" y="3" width="3" height="2" fill="#16a34a" />
      <rect x="7" y="4" width="3" height="2" fill="#16a34a" />
      <rect x="1" y="6" width="3" height="2" fill="#15803d" />
      <rect x="8" y="7" width="3" height="2" fill="#15803d" />
      <rect x="5" y="4" width="2" height="7" fill="#166534" />
      <rect x="3" y="7" width="3" height="2" fill="#22c55e" />
      <rect x="2" y="11" width="8" height="2" fill="#9a3412" />
      <rect x="3" y="13" width="6" height="5" fill="#7c2d12" />
    </svg>
  );
}

/** A string of little bulbs hung across the top of the section. */
const BULBS = ["#f472b6", "#38bdf8", "#fde68a", "#f472b6", "#38bdf8", "#fde68a", "#f472b6", "#38bdf8", "#fde68a", "#f472b6", "#38bdf8", "#fde68a", "#f472b6"];
function StringLights() {
  // a shallow sag, drawn as pixel steps
  const n = BULBS.length;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-20 h-16 md:top-24">
      <svg viewBox="0 0 130 16" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" shapeRendering="crispEdges">
        {Array.from({ length: 130 }, (_, x) => {
          const y = Math.round(2 + 6 * Math.sin((x / 129) * Math.PI));
          return <rect key={x} x={x} y={y} width="1" height="0.6" fill="#334155" />;
        })}
      </svg>
      {BULBS.map((c, i) => {
        const x = ((i + 0.5) / n) * 100;
        const y = 2 + 6 * Math.sin((x / 100) * Math.PI);
        return (
          <span
            key={i}
            className="absolute h-2.5 w-2 motion-safe:animate-[bulb_4s_steps(1,end)_infinite]"
            style={{ left: `${x}%`, top: `${(y / 16) * 100 + 6}%`, background: c, animationDelay: `${-((i * 1.7) % 4)}s` }}
          />
        );
      })}
    </div>
  );
}

export default function WhoAmI() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const jarRef = useRef<HTMLDivElement>(null);
  const lineEls = useRef<(HTMLElement | null)[]>([]);
  const flyEls = useRef<(HTMLButtonElement | null)[]>([]);
  const flies = useRef<Fly[]>([]);

  const [started, setStarted] = useState(false); // the entrance has begun
  const [lidOpen, setLidOpen] = useState(false);
  const [inJar, setInJar] = useState<boolean[]>(() => Array(COUNT).fill(true));
  const [allOut, setAllOut] = useState(false); // every firefly has been let out once
  const home = inJar.filter(Boolean).length;

  // the jar's box, relative to the section
  const jarBox = () => {
    const s = sectionRef.current!.getBoundingClientRect();
    const j = jarRef.current!.getBoundingClientRect();
    return { l: j.left - s.left, t: j.top - s.top, w: j.width, h: j.height };
  };
  const lineBox = (i: number) => {
    const s = sectionRef.current!.getBoundingClientRect();
    const r = lineEls.current[i]!.getBoundingClientRect();
    return { l: r.left - s.left, t: r.top - s.top, w: r.width, h: r.height };
  };

  // zoom from the jar: the camera comes in toward it, not toward the middle
  useEffect(() => {
    const g = groupRef.current;
    const j = jarRef.current;
    if (!g || !j) return;
    const place = () => {
      const scale = g.style.transform;
      g.style.transform = "none"; // measure at rest, not mid-zoom
      const gr = g.getBoundingClientRect();
      const jr = j.getBoundingClientRect();
      g.style.transform = scale;
      g.style.transformOrigin = `${jr.left - gr.left + jr.width / 2}px ${jr.top - gr.top + jr.height / 2}px`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = section.clientWidth;
    let h = section.clientHeight;
    // loose fireflies roam the whole section, away from its very edges
    const pick = (): [number, number] => [24 + Math.random() * (w - 48), 90 + Math.random() * (h - 160)];
    flies.current = Array.from({ length: COUNT }, (_, i) => ({
      x: 0, y: 0, tx: 0, ty: 0, px: 0, py: 0, phase: i * 1.7, mode: "inJar",
    }));

    let visible = false;
    let startAt = 0; // 0 = not started
    let lid = false;
    const released: boolean[] = Array(COUNT).fill(false);

    const start = () => {
      if (startAt) return;
      startAt = performance.now();
      setStarted(true);
      if (reduce) {
        // no entrance: the words are just there and the fireflies are already out
        lineEls.current.forEach((el) => {
          if (el) el.style.clipPath = "none";
        });
        flies.current.forEach((f, i) => {
          [f.x, f.y] = pick();
          [f.tx, f.ty] = [f.x, f.y];
          f.mode = "wander";
          released[i] = true;
        });
        setInJar(Array(COUNT).fill(false));
        setAllOut(true);
      }
    };

    const watch = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (e.intersectionRatio >= 0.5) start();
      },
      { threshold: [0, 0.5] },
    );
    watch.observe(section);
    const onResize = () => {
      w = section.clientWidth;
      h = section.clientHeight;
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible && startAt) {
        const t = now - startAt;
        flies.current.forEach((f, i) => {
          // let the next one out
          if (f.mode === "inJar" && !released[i] && !reduce && t >= RELEASE_AT + i * STAGGER) {
            released[i] = true;
            const j = jarBox();
            f.x = j.l + j.w / 2;
            f.y = j.t + j.h * 0.12;
            f.mode = "exit";
            setInJar((c) => c.map((v, n) => (n === i ? false : v)));
            if (i === COUNT - 1) setAllOut(true);
          }
          if (f.mode === "inJar") return;

          if (f.mode === "exit") {
            // up and out of the jar, over to the start of its line
            const L = lineBox(i);
            const ex = L.l - 8;
            const ey = L.t + L.h / 2;
            const k = Math.min(1, dt * 4.5);
            f.x += (ex - f.x) * k;
            f.y += (ey - f.y) * k;
            if (Math.hypot(ex - f.x, ey - f.y) < 5) f.mode = "sweep";
          } else if (f.mode === "sweep") {
            // along the line; the words show up behind it
            const L = lineBox(i);
            f.y = L.t + L.h / 2;
            f.x += (L.w / SWEEP_S) * dt;
            const el = lineEls.current[i];
            const done = f.x >= L.l + L.w;
            if (el) el.style.clipPath = done ? "none" : `inset(-4px ${Math.max(0, 100 - ((f.x - L.l) / L.w) * 100)}% -4px 0)`;
            if (done) {
              f.mode = "wander";
              [f.tx, f.ty] = pick();
            }
          } else if (f.mode === "drag") {
            // follows the finger a touch behind, like it's flying after it
            const k = Math.min(1, dt * 12);
            f.x += (f.px - f.x) * k;
            f.y += (f.py - f.y) * k;
          } else if (f.mode === "jar") {
            // over to the open mouth, just above the rim
            const j = jarBox();
            const mx = j.l + j.w / 2;
            const my = j.t - j.h * 0.02;
            const k = Math.min(1, dt * 5);
            f.x += (mx - f.x) * k;
            f.y += (my - f.y) * k;
            if (Math.hypot(mx - f.x, my - f.y) < 4) f.mode = "fall";
          } else if (f.mode === "fall") {
            // then down through the neck and settle into its own spot
            const j = jarBox();
            const sx = j.l + (INSIDE[i][0] / 100) * j.w;
            const sy = j.t + (INSIDE[i][1] / 100) * j.h;
            const k = Math.min(1, dt * 2.6);
            f.x += (sx - f.x) * k;
            f.y += (sy - f.y) * k;
            if (Math.hypot(sx - f.x, sy - f.y) < 1.5) {
              f.mode = "inJar";
              setInJar((c) => c.map((v, n) => (n === i ? true : v)));
            }
          } else if (!reduce) {
            // wander: drift toward a point anywhere in the section, lazily
            const dx = f.tx - f.x;
            const dy = f.ty - f.y;
            const d = Math.hypot(dx, dy);
            if (d < 4) [f.tx, f.ty] = pick();
            else {
              f.x += (dx / d) * 22 * dt;
              f.y += (dy / d) * 22 * dt;
            }
            f.phase += dt * 1.3;
          }

          const el = flyEls.current[i];
          if (el && f.mode !== "inJar") {
            const wob = f.mode === "wander" && !reduce ? Math.sin(f.phase) * 5 : 0;
            el.style.transform = `translate3d(${f.x - HIT / 2}px, ${f.y + wob - HIT / 2}px, 0)`;
            el.style.visibility = "visible";
          }
        });

        // the lid is open while the fireflies go out, and whenever one is coming home
        const wantLid =
          (t >= LID_AT && t < LID_SHUT_AT && !reduce) || flies.current.some((f) => f.mode === "jar" || f.mode === "fall");
        if (wantLid !== lid) {
          lid = wantLid;
          setLidOpen(wantLid);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      watch.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const toSection = (e: React.PointerEvent) => {
    const r = sectionRef.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  const grab = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    const f = flies.current[i];
    if (!f || f.mode !== "wander") return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    [f.px, f.py] = toSection(e);
    f.mode = "drag";
  };
  const move = (i: number) => (e: React.PointerEvent) => {
    const f = flies.current[i];
    if (f?.mode === "drag") [f.px, f.py] = toSection(e);
  };
  const drop = (i: number) => (e: React.PointerEvent) => {
    const f = flies.current[i];
    if (f?.mode !== "drag") return;
    const [x, y] = toSection(e);
    const j = jarBox();
    const pad = 22;
    const overJar = x > j.l - pad && x < j.l + j.w + pad && y > j.t - pad * 2 && y < j.t + j.h + pad;
    // let go anywhere else and it just goes back to drifting
    f.mode = overJar ? "jar" : "wander";
    if (!overJar) [f.tx, f.ty] = [x + (Math.random() - 0.5) * 120, y + (Math.random() - 0.5) * 120];
  };
  const keyCatch = (i: number) => (e: React.MouseEvent) => {
    // keyboard Enter/Space (a click with no pointer) sends it straight home
    if (e.detail !== 0) return;
    const f = flies.current[i];
    if (f && f.mode === "wander") f.mode = "jar";
  };

  // every line starts hidden (motion-safe only) and a firefly writes it in
  const LINE = "block w-fit motion-safe:[clip-path:inset(-4px_100%_-4px_0)]";
  const hint = !allOut ? "" : home === COUNT ? "เก็บไว้ครบแล้ว" : "ลากหิ่งห้อยกลับมาใส่ขวด";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 flex min-h-screen w-full flex-col justify-center overflow-hidden py-28"
    >
      <style>{CSS}</style>

      <StringLights />

      {/* the dark the jar is first seen in, soft at the section's top and bottom */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-[#070e1c] transition-opacity duration-[2200ms] ease-linear [mask-image:linear-gradient(transparent,black_18%,black_82%,transparent)] motion-reduce:hidden ${started ? "opacity-0" : "opacity-90"}`}
      />

      {/* the shelf and the words are one group, side by side in the middle of
          the screen (stacked on a phone); the whole group is what zooms in */}
      <div
        ref={groupRef}
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 transition-transform duration-[2200ms] ease-[cubic-bezier(.4,0,.2,1)] lg:flex-row lg:justify-center lg:gap-14 ${started ? "" : "motion-safe:scale-[0.14]"}`}
      >
        <div className="relative h-[400px] w-full max-w-md shrink-0 select-none md:h-[500px] lg:max-w-md">
          {/* shelf */}
          <div aria-hidden className="absolute inset-x-0 bottom-12 h-2.5 bg-[#1b3354]" />
          <div aria-hidden className="absolute inset-x-0 bottom-10 h-2 bg-[#0c1c30]" />
          <div aria-hidden className="absolute bottom-4 left-6 h-6 w-2 bg-[#0c1c30]" />
          <div aria-hidden className="absolute bottom-4 right-6 h-6 w-2 bg-[#0c1c30]" />

          <div aria-hidden className="absolute bottom-[3.6rem] left-[4%] w-24 md:w-28">
            <Books />
          </div>
          <div aria-hidden className="absolute bottom-[3.6rem] right-[20%] w-10 md:w-12">
            <Mug />
          </div>
          <div aria-hidden className="absolute bottom-[3.6rem] right-[4%] w-12 md:w-14">
            <Plant />
          </div>

          <div ref={jarRef} className="absolute bottom-[3.6rem] left-[34%] w-40 md:w-48">
            <Jar open={lidOpen} />
            {inJar.map((here, i) =>
              here ? (
                <span
                  key={i}
                  aria-hidden
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${INSIDE[i][0]}%`, top: `${INSIDE[i][1]}%` }}
                >
                  {/* starts at rest, so a firefly that just landed doesn't jump */}
                  <span
                    className="block motion-safe:animate-[jar-drift_7s_ease-in-out_infinite]"
                    style={{ animationDuration: `${6 + (i % 3)}s` }}
                  >
                    <Bug delay={-i * 0.9} />
                  </span>
                </span>
              ) : null,
            )}
          </div>

          <p aria-live="polite" className="absolute inset-x-0 bottom-0 min-h-5 text-center text-sm text-slate-400">
            {hint}
          </p>
        </div>

        <div className="w-full max-w-3xl text-left">
          <h2
            ref={(el) => {
              lineEls.current[0] = el;
            }}
            className={`${LINE} mb-8 font-[family-name:var(--font-pixel)] text-4xl uppercase tracking-wider text-white md:text-6xl`}
          >
            Who am I<span className="text-pink-400">?</span>
          </h2>
          <div className="space-y-7 text-lg leading-relaxed text-slate-200 md:text-2xl md:leading-relaxed">
            <p>
              <span
                ref={(el) => {
                  lineEls.current[1] = el;
                }}
                className={LINE}
              >
                สวัสดีครับ ผมเป็น<span className="font-semibold text-white">นักศึกษาปี 4</span>
              </span>
              <span
                ref={(el) => {
                  lineEls.current[2] = el;
                }}
                className={LINE}
              >
                คณะ<span className="text-sky-300">ดิจิทัลมีเดีย</span> สาขา<span className="text-sky-300">อินเทอร์แอคทีฟและเกม</span>
              </span>
              <span
                ref={(el) => {
                  lineEls.current[3] = el;
                }}
                className={LINE}
              >
                เรียนด้าน<span className="font-semibold text-pink-400">ออกแบบและพัฒนาเกม</span>เป็นหลัก ส่วน
                <span className="font-semibold text-sky-400">เว็บ</span>คือลองฝึกทำเอง
              </span>
            </p>
            <p className="text-slate-300">
              <span
                ref={(el) => {
                  lineEls.current[4] = el;
                }}
                className={LINE}
              >
                เว็บนี้คือพอร์ตส่วนตัวที่รวบรวมสิ่งที่ผมเคยทำไว้
              </span>
              <span
                ref={(el) => {
                  lineEls.current[5] = el;
                }}
                className={LINE}
              >
                ในบรรยากาศ <span className="font-[family-name:var(--font-pixel)] text-base text-pink-300 md:text-lg">Pixel Art</span>{" "}
                <span className="text-slate-500">&amp;</span>{" "}
                <span className="font-[family-name:var(--font-pixel)] text-base text-sky-300 md:text-lg">Lofi</span>
              </span>
              <span
                ref={(el) => {
                  lineEls.current[6] = el;
                }}
                className={LINE}
              >
                แวะดู แวะเล่นได้ตามสบายเลยครับ
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* loose fireflies, anywhere in the section */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {Array.from({ length: COUNT }, (_, i) =>
          inJar[i] ? null : (
            <button
              key={i}
              ref={(el) => {
                flyEls.current[i] = el;
              }}
              type="button"
              aria-label="หิ่งห้อย กดเพื่อส่งกลับเข้าขวด"
              onPointerDown={grab(i)}
              onPointerMove={move(i)}
              onPointerUp={drop(i)}
              onPointerCancel={drop(i)}
              onClick={keyCatch(i)}
              className="pointer-events-auto absolute left-0 top-0 flex cursor-grab touch-none items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sky-400 active:cursor-grabbing"
              // hidden until the loop has placed it, so it never flashes in the corner
              style={{ width: HIT, height: HIT, visibility: "hidden" }}
            >
              <Bug delay={-i * 0.7} />
            </button>
          ),
        )}
      </div>
    </section>
  );
}
