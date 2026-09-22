"use client";

import { useEffect, useRef } from "react";

/**
 * The page's base colour, ramped by scroll position.
 *
 * PixelSky only paints stars and a horizon glow — the large flat field behind
 * them was a hardcoded #0f172a, so tinting the sky alone barely showed. This is
 * the layer that actually carries the "it gets later as you scroll" read, with
 * PixelSky's palette following on top of it.
 *
* A negative z-index would paint this behind main's own background instead of
 * above it, since main is positioned but not a stacking context.
 *
 * Stops start on the blue of the WelcomeWindow's sky, so the page opens on the
 * same colour the visitor was just looking at through the window, and end close
 * to black under GOOD NIGHT. Nothing here goes light enough to break the page's
 * existing slate text: the lightest stop still clears 5:1 against slate-400.
 */
const STOPS: Array<[number, [number, number, number]]> = [
  [0.0, [0x16, 0x30, 0x4f]],
  [0.3, [0x12, 0x24, 0x3c]],
  [0.6, [0x0d, 0x18, 0x28]],
  [1.0, [0x07, 0x0c, 0x18]],
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function colourAt(p: number) {
  let lo = STOPS[0];
  let hi = STOPS[STOPS.length - 1];
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (p >= STOPS[i][0] && p <= STOPS[i + 1][0]) {
      lo = STOPS[i];
      hi = STOPS[i + 1];
      break;
    }
  }
  const t = hi[0] === lo[0] ? 0 : (p - lo[0]) / (hi[0] - lo[0]);
  const c = lo[1].map((v, i) => Math.round(lerp(v, hi[1][i], t)));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export default function NightDepth() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const travel = document.documentElement.scrollHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, window.scrollY / travel)) : 0;
      el.style.backgroundColor = colourAt(p);
    };
    // Lenis owns the scroll here, so read scrollY off a passive listener rather
    // than a motion value.
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
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: colourAt(0) }}
    />
  );
}
