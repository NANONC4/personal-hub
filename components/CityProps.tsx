"use client";

/*
 * The night city of the home page.
 *
 * Scrolling the page is drifting down through a city at night. Two layers:
 *  - the city on the ground stays put at the bottom of the screen: PixelSky's
 *    skyline, with a few buildings drawn in front of it here (BackgroundCity:
 *    a building with people still up, string lights across two roofs, a
 *    corner shop that closes once it's late);
 *  - the gaps between zones get things that drift past with the page: a
 *    plane, clouds, a faint roof with a cat and an antenna, a train on an
 *    elevated line, sky lanterns, and a shooting star in Good night.
 *  No buildings in the gaps themselves: the city behind already follows you.
 *
 * Everything is pixel art drawn as rects on a grid. One grid unit is
 * `--px` screen pixels (set on each band), so every prop shares one pixel
 * size. Motion is CSS only, and bands skip rendering while off screen
 * (content-visibility), which also stops their animations.
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// ---------------------------------------------------------------- palette
const NEAR = "#03070f"; // near buildings: darker than the far city and the deepest sky behind them
const EDGE = "#16243d"; // the roof line catching a little light
const WARM = "#fcd9a0";
// the buildings on the ground use PixelSky's own skyline colours (see TONES
// there), semi-transparent over the sky, so they sit among the others
const BG_BODY = "rgba(10, 18, 34, 0.86)";
const BG_EDGE = "rgba(60, 90, 135, 0.35)";
const BG_DARK = "rgba(3, 6, 12, 0.55)"; // an unlit window
const TV = "#7dd3fc";

// ---------------------------------------------------------------- pixel kit
type Rect = [x: number, y: number, w: number, h: number, fill: string];

function rects(list: Rect[], key = "r") {
  return list.map(([x, y, w, h, fill], i) => <rect key={`${key}${i}`} x={x} y={y} width={w} height={h} fill={fill} />);
}

/** Rows of characters, one per pixel; "." is empty. */
function grid(rows: string[], pal: Record<string, string>, ox = 0, oy = 0): Rect[] {
  const out: Rect[] = [];
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== ".") out.push([ox + x, oy + y, 1, 1, pal[ch]]);
    }),
  );
  return out;
}

function Sprite({
  w,
  h,
  children,
  className = "",
  style,
}: {
  w: number;
  h: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden
      className={`block overflow-visible [image-rendering:pixelated] ${className}`}
      style={{ width: `calc(${w} * var(--px))`, height: `calc(${h} * var(--px))`, ...style }}
    >
      {children}
    </svg>
  );
}

// ---------------------------------------------------------------- props
function Plane() {
  return (
    <Sprite w={18} h={6}>
      {rects(
        grid(
          [
            "..........k.......",
            ".........kk.......",
            ".kkkkkkkkkkkkkkk..",
            "kgyyyyyyyyyyyyggkk",
            ".kkkkkkkkkkkkkkkk.",
            ".......kk.........",
          ],
          { k: "#16243d", g: "#2b3f5e", y: "#fde68a" },
        ),
      )}
      <g className="motion-safe:animate-[city-blink_1.8s_steps(1,end)_infinite]">{rects([[0, 2, 1, 1, "#ef4444"]], "t")}</g>
      <g className="opacity-0 motion-safe:animate-[city-strobe_1.3s_steps(1,end)_infinite]">{rects([[10, 0, 1, 1, "#f8fafc"]], "s")}</g>
    </Sprite>
  );
}

function Cloud() {
  return (
    <Sprite w={20} h={5}>
      {rects(
        grid(
          [
            ".......cccc.........",
            "....cccCCCCccc......",
            "..ccCCCCCCCCCCccc...",
            "cccCCCCCCCCCCCCCCccc",
            ".cccccccccccccccccc.",
          ],
          { c: "#2f5a8c", C: "#3a6699" },
        ),
      )}
    </Sprite>
  );
}

function Lantern() {
  return (
    <Sprite w={6} h={8}>
      <g className="motion-safe:animate-[city-sway_3s_ease-in-out_infinite]" style={{ transformBox: "fill-box", transformOrigin: "50% 0" }}>
        {rects(grid([".aaaa.", "aAAAAa", "aAyAAa", "aAAAAa", "aAAAAa", ".aAAa."], { a: "#b45309", A: "#fbbf24", y: "#fde68a" }))}
        <g className="motion-safe:animate-[city-a_0.5s_steps(1,end)_infinite]">{rects([[2, 6, 2, 1, "#fef3c7"]], "f")}</g>
        <g className="opacity-0 motion-safe:animate-[city-b_0.5s_steps(1,end)_infinite]">
          {rects([[2, 6, 1, 1, "#fef3c7"], [3, 7, 1, 1, "#fef3c7"]], "g")}
        </g>
      </g>
    </Sprite>
  );
}

function Cat() {
  const K = "#050a14";
  return (
    <g>
      {rects(
        grid(
          [".K...K....", ".KK.KK....", ".KKKKK....", ".KKKKK....", ".KKKKK....", "..KKK.....", ".KKKKK....", "KKKKKKK...", "KKKKKKK...", "KKKKKKK..."],
          { K },
        ),
        "c",
      )}
      <g className="motion-safe:animate-[city-eyes_5s_steps(1,end)_infinite]">{rects([[2, 3, 1, 1, "#d9f99d"], [4, 3, 1, 1, "#d9f99d"]], "e")}</g>
      <g className="motion-safe:animate-[city-a_1.8s_steps(1,end)_infinite]">
        {rects([[7, 9, 1, 1, K], [8, 8, 1, 1, K], [8, 7, 1, 1, K], [9, 6, 1, 1, K]], "t")}
      </g>
      <g className="opacity-0 motion-safe:animate-[city-b_1.8s_steps(1,end)_infinite]">
        {rects([[7, 9, 1, 1, K], [8, 9, 1, 1, K], [9, 8, 1, 1, K], [9, 7, 1, 1, K]], "u")}
      </g>
    </g>
  );
}

/** Two roofs with a string of little bulbs sagging between them. */
function StringLightsScene() {
  const W = 90;
  const H = 60;
  const wire: Rect[] = [];
  const yAt = (x: number) => {
    const t = (x - 20) / 46;
    return Math.round(18 + 12 * Math.sin(Math.PI * t) + 6 * t);
  };
  for (let x = 20; x <= 66; x++) wire.push([x, yAt(x), 1, 1, "#334155"]);
  const colours = ["#f472b6", "#38bdf8", "#fde68a"];
  return (
    <Sprite w={W} h={H}>
      {rects([[0, 18, 21, H - 18, BG_BODY], [0, 18, 21, 1, BG_EDGE], [66, 24, 24, H - 24, BG_BODY], [66, 24, 24, 1, BG_EDGE], [28, 42, 30, H - 42, BG_BODY], [28, 42, 30, 1, BG_EDGE]], "b")}
      {rects([[4, 24, 1, 2, WARM], [10, 30, 1, 2, WARM], [16, 24, 1, 2, WARM], [70, 30, 1, 2, WARM], [82, 34, 1, 2, WARM], [34, 48, 1, 2, WARM]], "w")}
      {rects(wire, "x")}
      {Array.from({ length: 8 }, (_, i) => {
        const x = 23 + i * 6;
        return (
          <g key={i} className="motion-safe:animate-[city-bulb_3.6s_steps(1,end)_infinite]" style={{ animationDelay: `${-i * 0.45}s` }}>
            {rects([[x, yAt(x) + 1, 1, 2, colours[i % 3]]], `l${i}`)}
          </g>
        );
      })}
    </Sprite>
  );
}

/** A tall building next door, some windows still lit, some people still up. */
function WindowsScene({ late = false }: { late?: boolean }) {
  const W = 50;
  const H = 76;
  const win = (x: number, y: number, kind: "dark" | "lamp" | "pc" | "plant" | "warm", key: string) => {
    const base: Rect[] = [[x, y, 12, 10, BG_DARK]];
    const inner: ReactNode[] = [];
    if (kind === "warm") base.push([x + 1, y + 1, 10, 8, "#e9c989"]);
    if (kind === "lamp") base.push([x + 1, y + 1, 10, 8, WARM], [x + 7, y + 2, 3, 2, "#b45309"], [x + 8, y + 4, 1, 4, "#78350f"]);
    if (kind === "pc") {
      base.push([x + 1, y + 1, 10, 8, "#1e3a5f"], [x + 6, y + 3, 4, 3, TV], [x + 7, y + 6, 1, 2, "#0f172a"]);
      // someone at the screen, nodding along between two frames
      inner.push(
        <g key="a" className="motion-safe:animate-[city-a_1.4s_steps(1,end)_infinite]">{rects([[x + 2, y + 2, 3, 3, "#060b16"], [x + 1, y + 5, 5, 4, "#060b16"]], `${key}a`)}</g>,
        <g key="b" className="opacity-0 motion-safe:animate-[city-b_1.4s_steps(1,end)_infinite]">{rects([[x + 2, y + 3, 3, 3, "#060b16"], [x + 1, y + 6, 5, 3, "#060b16"]], `${key}b`)}</g>,
      );
    }
    if (kind === "plant") {
      base.push(
        [x + 1, y + 1, 10, 8, "#fde7b0"],
        [x + 2, y + 2, 3, 3, "#060b16"], [x + 2, y + 5, 4, 4, "#060b16"], [x + 6, y + 5, 2, 1, "#060b16"], [x + 7, y + 6, 1, 1, "#060b16"],
        [x + 8, y + 7, 3, 2, "#9a3412"], [x + 9, y + 6, 1, 1, "#16a34a"],
      );
      inner.push(<g key="d" className="motion-safe:animate-[city-drop_1.2s_steps(4,end)_infinite]">{rects([[x + 8, y + 6, 1, 1, "#38bdf8"]], `${key}d`)}</g>);
    }
    base.push([x + 6, y, 1, 10, BG_DARK]);
    return (
      <g key={key}>
        {rects(base, key)}
        {inner}
      </g>
    );
  };
  return (
    <Sprite w={W} h={H}>
      {rects([[0, 0, W, H, BG_BODY], [0, 0, W, 1, BG_EDGE], [-2, 3, W + 4, 1, BG_EDGE]], "b")}
      {/* the someone at the screen is up all night; the others go to bed */}
      {win(6, 8, late ? "dark" : "lamp", "a")}
      {win(30, 8, "dark", "b")}
      {win(6, 24, "dark", "c")}
      {win(30, 24, "pc", "d")}
      {win(6, 40, late ? "dark" : "plant", "e")}
      {win(30, 40, late ? "dark" : "warm", "f")}
      {win(6, 56, "dark", "g")}
      {win(30, 56, "dark", "h")}
    </Sprite>
  );
}

/**
 * What stands on a roof: an antenna (red light up top), a dish, a water tank,
 * and the cat. No building of its own: What I use puts it on top of the
 * game's cabinet, which is the building.
 */
export function RooftopProps({ stage = 2 }: { stage?: number }) {
  const W = 100;
  const H = 30;
  const dish = grid(["..dd...", ".d..d..", "d....d.", ".d...dd", "..dddd.", "....d..", "...ddd."], { d: "#1e293b" }, 34, 23);
  return (
    <div aria-hidden className="pointer-events-none [--px:3px] md:[--px:4px]">
      <Sprite w={W} h={H} className="!overflow-hidden">
        {/* stage 1: the antenna, dish and tank rise up onto the roof */}
        <g
          className="transition-transform duration-500 ease-out"
          style={{ transform: stage >= 1 ? undefined : "translateY(30px)" }}
        >
          {rects([[12, 8, 1, 22, "#1e293b"], [9, 14, 7, 1, "#1e293b"], [10, 19, 5, 1, "#1e293b"], [8, 24, 9, 1, "#1e293b"]], "a")}
          <g className="motion-safe:animate-[city-blink_1.8s_steps(1,end)_infinite]">{rects([[12, 6, 1, 2, "#ef4444"]], "r")}</g>
          {rects(dish, "d")}
          {rects([[70, 12, 18, 10, "#1e293b"], [70, 12, 18, 1, "#334155"], [72, 22, 1, 8, "#1e293b"], [85, 22, 1, 8, "#1e293b"], [72, 26, 14, 1, "#1e293b"]], "t")}
        </g>
        {/* stage 2: the cat hops up last, in two pixel steps */}
        <g
          className="transition-transform duration-300 ease-[steps(3,end)]"
          style={{ transform: stage >= 2 ? "translate(50px, 20px)" : "translate(50px, 32px)" }}
        >
          <Cat />
        </g>
      </Sprite>
    </div>
  );
}

/** A corner shop that's open all night (until it isn't). */
function ShopScene({ open }: { open: boolean }) {
  const W = 60;
  const H = 46;
  const body: Rect[] = [[0, 0, W, H, BG_BODY], [0, 0, W, 1, BG_EDGE]];
  const stripes: Rect[] = open
    ? [[3, 4, 54, 2, "#22c55e"], [3, 6, 54, 2, "#f97316"], [3, 8, 54, 2, "#38bdf8"]]
    : [[3, 4, 54, 6, "#111c30"]];
  const front: Rect[] = open
    ? [
        [5, 16, 32, 22, "#fef9c3"], [6, 21, 30, 1, "#d6d3a8"], [6, 27, 30, 1, "#d6d3a8"], [6, 33, 30, 1, "#d6d3a8"],
        [8, 22, 2, 4, "#f472b6"], [13, 28, 2, 4, "#38bdf8"], [18, 22, 2, 4, "#22c55e"], [25, 28, 2, 4, "#f472b6"], [30, 22, 2, 4, "#38bdf8"],
        [40, 16, 14, 22, "#e9e3b0"], [46, 16, 1, 22, BG_BODY],
      ]
    : [[5, 16, 32, 22, "#0d1829"], [40, 16, 14, 22, "#0d1829"], [46, 16, 1, 22, BG_BODY], [8, 30, 12, 1, "#1b2a44"]];
  return (
    <Sprite w={W} h={H}>
      {rects(body, "b")}
      <g className={open ? "motion-safe:animate-[city-flicker_7s_steps(1,end)_infinite]" : ""}>{rects(stripes, "s")}</g>
      {rects(front, "f")}
    </Sprite>
  );
}

/** A train of `cars` carriages, headlight at the front; `right` = heading right. */
function Train({ cars = 3, body = "#16243d", right = false }: { cars?: number; body?: string; right?: boolean }) {
  const r: Rect[] = [];
  for (let c = 0; c < cars; c++) {
    const x = c * 26;
    r.push([x, 0, 24, 11, body], [x, 0, 24, 1, "#2b3f5e"]);
    for (let k = 0; k < 5; k++) r.push([x + 2 + k * 4, 3, 3, 3, "#fde68a"]);
    r.push([x + 3, 11, 3, 1, "#0f172a"], [x + 18, 11, 3, 1, "#0f172a"]);
  }
  const w = cars * 26;
  r.push(right ? [w - 1, 3, 1, 2, "#fef3c7"] : [0, 3, 1, 2, "#fef3c7"]);
  return <Sprite w={w} h={12}>{rects(r)}</Sprite>;
}

/**
 * One elevated line: rail, pillars down into the dark, and a train crossing
 * the whole screen now and then. Lines further back are smaller and dimmer.
 */
function Line({
  top,
  px,
  dim = 1,
  cars,
  right,
  seconds,
  delay,
  pillars,
}: {
  top: string;
  px: string;
  dim?: number;
  cars: number;
  right: boolean;
  seconds: number;
  delay: number;
  pillars: number[];
}) {
  return (
    <div className="absolute inset-0" style={{ opacity: dim, ["--px" as string]: px }}>
      <div className="absolute inset-x-0 h-[calc(2*var(--px))] bg-[#1e293b]" style={{ top }} />
      {pillars.map((x) => (
        <div key={x} className="absolute bottom-0 w-[calc(2*var(--px))] bg-[#0f1a2e]" style={{ left: `${x}%`, top }} />
      ))}
      {/* starts and ends fully off screen, so it never parks at an edge */}
      <div
        className={`absolute left-0 -translate-y-full ${right ? "motion-safe:animate-[city-train-r_linear_infinite]" : "motion-safe:animate-[city-train-l_linear_infinite]"}`}
        style={{ top, animationDuration: `${seconds}s`, animationDelay: `${delay}s` }}
      >
        <Train cars={cars} right={right} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- styles
export function CityStyle() {
  return (
    <style>{`
@keyframes city-blink { 0%, 12% { opacity: 1 } 13%, 100% { opacity: .15 } }
@keyframes city-strobe { 0%, 6% { opacity: 1 } 7%, 100% { opacity: 0 } }
@keyframes city-a { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes city-b { 0%, 49% { opacity: 0 } 50%, 100% { opacity: 1 } }
@keyframes city-eyes { 0%, 92% { opacity: 1 } 93%, 96% { opacity: 0 } 97%, 100% { opacity: 1 } }
@keyframes city-bulb { 0%, 72% { opacity: 1 } 73%, 100% { opacity: .3 } }
@keyframes city-flicker { 0%, 80% { opacity: 1 } 81% { opacity: .2 } 82% { opacity: 1 } 84% { opacity: .2 } 85%, 100% { opacity: 1 } }
@keyframes city-drop { 0% { transform: translateY(0); opacity: 1 } 100% { transform: translateY(4px); opacity: 0 } }
@keyframes city-sway { 0%, 100% { transform: translateX(-6%) } 50% { transform: translateX(6%) } }
@keyframes city-fly { 0% { transform: translateX(-45vw) } 100% { transform: translateX(85vw) } }
@keyframes city-drift { 0% { transform: translateX(-40vw) } 100% { transform: translateX(110vw) } }
@keyframes city-train-l { 0% { transform: translateX(100vw) } 60%, 100% { transform: translateX(-100%) } }
@keyframes city-train-r { 0% { transform: translateX(-100%) } 60%, 100% { transform: translateX(100vw) } }
@keyframes city-spark { 0% { transform: translate(0, 0); opacity: 1 } 100% { transform: translate(var(--dx), var(--dy)); opacity: 0 } }
@keyframes city-rise { 0% { transform: translateY(20%); opacity: 0 } 6% { opacity: 1 } 90% { opacity: 1 } 100% { transform: translateY(-110vh); opacity: 0 } }
@keyframes city-shoot { 0%, 80% { transform: translate(0, 0); opacity: 0 } 81% { opacity: 1 } 92% { transform: translate(-22vw, 9vw); opacity: 0 } 100% { opacity: 0 } }
`}</style>
  );
}

// ---------------------------------------------------------------- bands
/** A strip between two zones; the near buildings fade out toward its bottom. */
function Band({ children, sky }: { children?: ReactNode; sky?: ReactNode }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 h-[46vh] min-h-[300px] w-full overflow-hidden [--px:3px] [content-visibility:auto] [contain-intrinsic-size:auto_46vh] md:[--px:4px]"
    >
      {sky}
      <div className="absolute inset-0 [mask-image:linear-gradient(black_62%,transparent)]">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------- constellations
// Shapes in stars, each in a 100 × 60 box: the stars, the order the lines
// join them in, and a colour for any star that isn't plain white.
type Shape = { stars: [number, number][]; lines: [number, number][]; tint?: Record<number, string> };

// a lemon (the owner's name): the fruit all the way round, then a leaf
const LEMON: Shape = {
  stars: [[4, 32], [17, 14], [39, 5], [62, 7], [82, 18], [96, 29], [84, 45], [62, 55], [38, 55], [16, 47], [90, 8], [98, 14]],
  lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0], [4, 10], [10, 11], [11, 5]],
  tint: { 10: "#bef264", 11: "#bef264" },
};
// a cat sitting, ears up, tail curling round
const CAT: Shape = {
  stars: [[28, 4], [36, 14], [44, 4], [48, 22], [60, 56], [20, 56], [24, 22], [78, 52], [88, 40], [84, 27]],
  lines: [[5, 6], [6, 0], [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 7], [7, 8], [8, 9]],
  tint: { 1: "#fda4af" },
};
// a game controller: the outline, then a d-pad and two buttons
const PAD: Shape = {
  stars: [[10, 24], [26, 12], [74, 12], [90, 24], [96, 46], [80, 54], [64, 40], [36, 40], [20, 54], [4, 46], [20, 26], [28, 26], [72, 22], [80, 30]],
  lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0], [10, 11], [12, 13]],
  tint: { 12: "#f472b6", 13: "#38bdf8" },
};

/**
 * Stars that join up into a shape as it scrolls up to the middle of the
 * screen: the lines draw one after another, each star lighting up as a line
 * reaches it, and it all undraws again scrolling back up. Written straight to
 * the DOM, no re-render.
 */
function Constellation({ shape, className }: { shape: Shape; className: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const lineEls = useRef<(SVGLineElement | null)[]>([]);
  const starEls = useRef<(SVGGElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const box = boxRef.current;
      if (!box) return;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // nothing until its middle is 70% of the way down the screen; all
      // joined up by the time it reaches 40%, so you watch it happen
      const mid = r.top + r.height / 2;
      const p = Math.min(1, Math.max(0, (vh * 0.7 - mid) / (vh * 0.3)));
      const n = shape.lines.length;
      const lit = new Set<number>();
      shape.lines.forEach(([a, b], i) => {
        const seg = Math.min(1, Math.max(0, p * n - i));
        const el = lineEls.current[i];
        if (el) el.style.strokeDashoffset = String(1 - seg);
        if (seg > 0) lit.add(a);
        if (seg >= 1) lit.add(b);
      });
      starEls.current.forEach((el, i) => {
        if (el) el.style.opacity = lit.has(i) ? "1" : "0.35";
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [shape]);

  return (
    <div ref={boxRef} className={`absolute ${className}`}>
      <svg viewBox="-2 -2 104 64" className="block h-auto w-full overflow-visible" aria-hidden>
        {shape.lines.map(([a, b], i) => (
          <line
            key={i}
            ref={(el) => {
              lineEls.current[i] = el;
            }}
            x1={shape.stars[a][0]}
            y1={shape.stars[a][1]}
            x2={shape.stars[b][0]}
            y2={shape.stars[b][1]}
            pathLength={1}
            stroke="#c7d7f0"
            strokeOpacity="0.35"
            strokeWidth="0.5"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        ))}
        {shape.stars.map(([x, y], i) => (
          <g
            key={i}
            ref={(el) => {
              starEls.current[i] = el;
            }}
            className="transition-opacity duration-500"
            style={{ opacity: 0.35 }}
          >
            {/* a small hard four-point star, no glow */}
            <rect x={x - 0.6} y={y - 0.6} width="1.2" height="1.2" fill={shape.tint?.[i] ?? "#fef3c7"} />
            <rect x={x - 1.8} y={y - 0.3} width="3.6" height="0.6" fill="#e2ecfb" fillOpacity="0.6" />
            <rect x={x - 0.3} y={y - 1.8} width="0.6" height="3.6" fill="#e2ecfb" fillOpacity="0.6" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Hero → Who am I: early in the night. A plane, clouds, and shapes in the stars. */
export function CityEvening() {
  return (
    <Band
      sky={
        <>
          <div className="absolute left-[30%] top-[10%] motion-safe:animate-[city-fly_38s_linear_infinite]">
            <Plane />
          </div>
          <div className="absolute left-[20%] top-[28%] opacity-80 motion-safe:animate-[city-drift_120s_linear_infinite] motion-safe:[animation-delay:-50s]">
            <Cloud />
          </div>
          {/* three shapes across the sky, at different heights and sizes */}
          <Constellation shape={LEMON} className="left-[5%] top-[30%] w-[min(40vw,340px)] md:left-[8%]" />
          <Constellation shape={PAD} className="left-[36%] top-[6%] w-[min(34vw,280px)] max-md:hidden" />
          <Constellation shape={CAT} className="right-[4%] top-[42%] w-[min(34vw,240px)] md:right-[3%]" />
        </>
      }
    >
      <div className="absolute right-[12%] top-[48%] opacity-60 motion-safe:animate-[city-drift_160s_linear_infinite] motion-safe:[animation-delay:-20s]">
        <Cloud />
      </div>
    </Band>
  );
}

// overhead wires sagging across the whole screen: [y at the ends, sag], in %
const WIRES: [number, number][] = [[18, 14], [30, 12], [44, 16], [52, 10]];
const wireY = ([y0, sag]: [number, number], t: number) => y0 + sag * Math.sin(Math.PI * t);
// birds sitting on them: [wire, position along it 0-1]
const BIRDS: [number, number][] = [[0, 0.22], [0, 0.27], [1, 0.58], [2, 0.12], [2, 0.71], [2, 0.76], [3, 0.4]];

const BIRD = "#070c18";

/** A bird sitting on a wire. Every so often it ducks its head or turns round. */
function SittingBird({ i }: { i: number }) {
  const K = BIRD;
  const up: Rect[] = [[1, 0, 2, 1, K], [0, 1, 4, 2, K], [4, 1, 1, 1, K], [1, 3, 1, 1, K], [3, 3, 1, 1, K]];
  const down: Rect[] = [[0, 1, 4, 2, K], [4, 2, 1, 1, K], [1, 3, 1, 1, K], [3, 3, 1, 1, K]];
  // each bird keeps its own slow rhythm, so they never move in step
  const t = `${2.2 + (i % 4) * 0.9}s`;
  return (
    <Sprite w={5} h={4} className={i % 2 ? "-scale-x-100" : ""}>
      <g className="motion-safe:animate-[city-a_steps(1,end)_infinite]" style={{ animationDuration: t, animationDelay: `${-i * 0.7}s` }}>
        {rects(up, "u")}
      </g>
      <g className="opacity-0 motion-safe:animate-[city-b_steps(1,end)_infinite]" style={{ animationDuration: t, animationDelay: `${-i * 0.7}s` }}>
        {rects(down, "d")}
      </g>
    </Sprite>
  );
}

/** The same bird in the air, wings beating in two frames. */
function FlyingBird() {
  const K = BIRD;
  return (
    <Sprite w={7} h={4}>
      <g className="animate-[city-a_0.24s_steps(1,end)_infinite]">
        {rects([[0, 0, 1, 1, K], [1, 1, 1, 1, K], [2, 2, 3, 1, K], [3, 1, 1, 1, K], [5, 1, 1, 1, K], [6, 0, 1, 1, K]], "a")}
      </g>
      <g className="animate-[city-b_0.24s_steps(1,end)_infinite] opacity-0">
        {rects([[2, 1, 3, 1, K], [3, 0, 1, 1, K], [0, 2, 2, 1, K], [5, 2, 2, 1, K], [1, 3, 1, 1, K], [5, 3, 1, 1, K]], "b")}
      </g>
    </Sprite>
  );
}

type Perch = { w: number; t: number };
const perchAt = ({ w, t }: Perch) => ({ left: t * 100, top: wireY(WIRES[w], t) });

/**
 * A bird on the wires. Point at it (or tap it) and it takes off, up and out
 * of the sky; a few seconds later it flies back in and lands somewhere else
 * on the wires.
 */
function WireBird({ start, i }: { start: Perch; i: number }) {
  const [perch, setPerch] = useState(start);
  // sit → leave (flying off) → away (gone) → enter (placed off-screen) → land
  const [phase, setPhase] = useState<"sit" | "leave" | "away" | "enter" | "land">("sit");
  const [off, setOff] = useState({ left: 0, top: 0 });

  const scare = () => {
    if (phase !== "sit") return;
    const p = perchAt(perch);
    const dir = p.left < 50 ? -1 : 1; // away from the middle of the screen
    setOff({ left: p.left + dir * (25 + Math.random() * 20), top: -30 - Math.random() * 20 });
    setPhase("leave");
  };

  useEffect(() => {
    let id: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;
    if (phase === "leave") id = setTimeout(() => setPhase("away"), 1100);
    if (phase === "away") {
      id = setTimeout(() => {
        const next = { w: Math.floor(Math.random() * WIRES.length), t: 0.06 + Math.random() * 0.88 };
        const p = perchAt(next);
        setPerch(next);
        setOff({ left: p.left + (Math.random() < 0.5 ? -30 : 30), top: -30 });
        setPhase("enter");
      }, 2500 + Math.random() * 3000);
    }
    // one frame parked off-screen with no transition, then glide in
    if (phase === "enter") raf = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("land")));
    if (phase === "land") id = setTimeout(() => setPhase("sit"), 1700);
    return () => {
      if (id) clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, [phase]);

  const at = phase === "leave" || phase === "away" || phase === "enter" ? off : perchAt(perch);
  const flying = phase !== "sit";
  const moving = phase === "leave" ? "transition-[left,top] duration-[1100ms] ease-in" : phase === "land" ? "transition-[left,top] duration-[1600ms] ease-out" : "";
  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-full ${moving} ${phase === "away" ? "invisible" : ""}`}
      style={{ left: `${at.left}%`, top: `${at.top}%` }}
    >
      {/* a generous hit area around a 5-pixel bird */}
      <span
        className="pointer-events-auto -m-4 block p-4"
        onPointerEnter={scare}
        onPointerDown={scare}
        aria-hidden
      >
        {flying ? <FlyingBird /> : <SittingBird i={i} />}
      </span>
    </div>
  );
}

/** Who am I → What I use: later. Overhead wires across the sky, birds on them. */
export function CityLate() {
  return (
    <Band
      sky={
        <>
          <div className="absolute left-[50%] top-[8%] opacity-60 motion-safe:animate-[city-drift_140s_linear_infinite] motion-safe:[animation-delay:-90s]">
            <Cloud />
          </div>
          {/* the wires: no poles in sight, just the lines running across */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 h-full w-full">
            {WIRES.map((w, i) => (
              <polyline
                key={i}
                fill="none"
                stroke="#0c1628"
                vectorEffect="non-scaling-stroke"
                style={{ strokeWidth: "var(--px)" }}
                points={Array.from({ length: 41 }, (_, k) => `${(k / 40) * 100},${wireY(w, k / 40).toFixed(2)}`).join(" ")}
              />
            ))}
          </svg>
          {BIRDS.map(([w, t], i) => (
            <WireBird key={i} i={i} start={{ w, t }} />
          ))}
        </>
      }
    />
  );
}

/** What I use → What I've built: the last trains go by on the elevated line. */
export function CityLastTrain() {
  return (
    <Band
      sky={
        <>
          {/* three elevated lines at three depths, trains going both ways */}
          <Line top="30%" px="2px" dim={0.5} cars={4} right seconds={26} delay={-4} pillars={[4, 19, 34, 49, 64, 79, 94]} />
          <Line top="52%" px="3px" dim={0.8} cars={3} right={false} seconds={17} delay={-11} pillars={[10, 32, 54, 76, 98]} />
          <Line top="76%" px="4px" cars={2} right seconds={13} delay={-2} pillars={[2, 30, 58, 86]} />
        </>
      }
    >
    </Band>
  );
}

// [left %, seconds to rise, delay, pixel size]; smaller = further away
const LANTERNS: [number, number, number, string][] = [
  [6, 15, -3, "3px"], [17, 19, -11, "2px"], [29, 13, -7, "4px"], [41, 21, -16, "2px"],
  [53, 16, -1, "3px"], [64, 12, -9, "4px"], [75, 18, -5, "2px"], [87, 14, -12, "3px"], [95, 20, -18, "2px"],
];

/**
 * Sky lanterns let go all over the city: spread across the whole width, each
 * at its own pace and size, rising off the top. Used in the band above Good
 * night and in Good night itself, so they carry on up through the zone.
 */
function LanternFlock() {
  // popped lanterns come back as a new one when their rise starts over
  const [popped, setPopped] = useState<boolean[]>(() => LANTERNS.map(() => false));
  const set = (i: number, v: boolean) => setPopped((p) => (p[i] === v ? p : p.map((x, n) => (n === i ? v : x))));
  return (
    <>
      {LANTERNS.map(([x, sec, delay, px], i) => (
        <div
          key={i}
          className="absolute bottom-0 motion-safe:animate-[city-rise_linear_infinite]"
          style={{ left: `${x}%`, animationDuration: `${sec}s`, animationDelay: `${delay}s`, ["--px" as string]: px }}
          onAnimationIteration={() => set(i, false)}
        >
          {popped[i] ? (
            <Sparks />
          ) : (
            // tap or click it and it bursts into a few pixel sparks
            <button
              type="button"
              aria-label="โคมลอย กดให้แตก"
              onPointerDown={() => set(i, true)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && set(i, true)}
              className="pointer-events-auto -m-3 block cursor-pointer p-3 outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <Lantern />
            </button>
          )}
        </div>
      ))}
    </>
  );
}

// eight directions a burst's sparks fly, in grid units
const SPARKS: [number, number][] = [[-5, -5], [0, -7], [5, -5], [7, 0], [5, 5], [0, 7], [-5, 5], [-7, 0]];

/** What's left of a popped lantern: a ring of sparks flying out and going dark. */
function Sparks() {
  return (
    <div aria-hidden className="relative" style={{ width: "calc(6 * var(--px))", height: "calc(8 * var(--px))" }}>
      {SPARKS.map(([dx, dy], i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 animate-[city-spark_0.7s_steps(5,end)_forwards] motion-reduce:hidden"
          style={{
            width: "var(--px)",
            height: "var(--px)",
            background: i % 2 ? "#fbbf24" : "#fef3c7",
            ["--dx" as string]: `calc(${dx} * var(--px))`,
            ["--dy" as string]: `calc(${dy} * var(--px))`,
          }}
        />
      ))}
    </div>
  );
}

export function GoodNightLanterns() {
  return (
    // full screen width, though Good night's own column is narrower
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <LanternFlock />
    </div>
  );
}

/** What I've built → Good night: the small hours. Lanterns go up. */
export function CitySmallHours() {
  return (
    <Band
      sky={
        <>
          <LanternFlock />
        </>
      }
    >
    </Band>
  );
}

/** Good night: now and then a shooting star, its tail in pixel steps. */
export function ShootingStar() {
  return (
    <div aria-hidden className="pointer-events-none absolute right-[18%] top-[14%] [--px:3px] md:[--px:4px]">
      <div className="opacity-0 motion-safe:animate-[city-shoot_11s_ease-out_infinite]">
        <Sprite w={8} h={4}>
          {rects([[0, 3, 2, 1, "#fef3c7"], [2, 2, 2, 1, "rgba(254,243,199,.6)"], [4, 1, 2, 1, "rgba(254,243,199,.35)"], [6, 0, 2, 1, "rgba(254,243,199,.15)"]])}
        </Sprite>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- the moon
/**
 * A crescent moon as pixels: a 32px disc with a second disc taken out of its
 * right side. The lit sliver has a pale rim on its outer edge, a slightly
 * deeper tone along the inner edge, and a couple of small craters. The dark
 * side isn't drawn at all. Built once, as horizontal runs.
 */
export const MOON_D = 32;
export const MOON_RECTS: Rect[] = (() => {
  const c = (MOON_D - 1) / 2;
  const R = MOON_D / 2;
  // the disc that covers the dark side, shifted right and a little up
  const sx = c + R * 0.55;
  const sy = c - R * 0.2;
  const sr = R * 0.92;
  const craters: [number, number, number][] = [[6, 12, 1.8], [8, 21, 1.5], [4.5, 17, 1.1]];
  const colour = (x: number, y: number): string | null => {
    const d = Math.hypot(x - c, y - c);
    if (d > R - 0.2) return null;
    const ds = Math.hypot(x - sx, y - sy);
    if (ds < sr) return null; // the dark side: nothing, only the crescent
    for (const [cx, cy, r] of craters) if (Math.hypot(x - cx, y - cy) <= r) return "#d8bd72";
    if (d > R - 2.2) return "#f8efcc";
    if (ds < sr + 1.8) return "#e2c97e";
    return "#f0dc98";
  };
  const out: Rect[] = [];
  for (let y = 0; y < MOON_D; y++) {
    let x = 0;
    while (x < MOON_D) {
      const col = colour(x, y);
      if (!col) {
        x++;
        continue;
      }
      let w = 1;
      while (x + w < MOON_D && colour(x + w, y) === col) w++;
      out.push([x, y, w, 1, col]);
      x += w;
    }
  }
  return out;
})();

// ---------------------------------------------------------------- the ground
/**
 * A few buildings in front of PixelSky's skyline, fixed to the bottom of the
 * screen with it (page.tsx puts both in the #night-sky layer, which the
 * welcome window lifts). It gets late as you scroll: past Good night's
 * approach the shop closes and most windows next door go dark.
 */
export function BackgroundCity() {
  const [late, setLate] = useState(false);
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      const p = travel > 0 ? window.scrollY / travel : 0;
      setLate(p > 0.72);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    // same opacity as the skyline canvas, same pixel size as its buildings
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 opacity-70 [--px:2px]">
      {/* data-skyline-gap: PixelSky leaves these spots empty in its skyline */}
      <div className="absolute bottom-0 left-[3%] flex items-end md:left-[6%]">
        <div data-skyline-gap>
          <WindowsScene late={late} />
        </div>
        <div data-skyline-gap className="hidden md:block">
          <StringLightsScene />
        </div>
      </div>
      <div data-skyline-gap className="absolute bottom-0 right-[5%] md:right-[12%]">
        <ShopScene open={!late} />
      </div>
    </div>
  );
}
