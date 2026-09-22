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
 * same colour the visitor was just looking at through the window, and end near
 * black under GOOD NIGHT — a ~25x swing in luminance, because a ramp nobody
 * notices is not worth having. The sections sitting on the light end had their
 * muted slate text lifted a step to stay readable against it.
 */
const STOPS: Array<[number, [number, number, number]]> = [
  // The welcome gate covers roughly the first quarter of the page, so the
  // lightest stop is held to 0.25 rather than 0 — otherwise the brightest blue
  // would spend its whole life hidden behind the window.
  [0.0, [0x2e, 0x5c, 0x8f]],
  [0.25, [0x2e, 0x5c, 0x8f]],
  [0.45, [0x1e, 0x3f, 0x66]],
  [0.65, [0x14, 0x28, 0x45]],
  [0.85, [0x0a, 0x14, 0x25]],
  [1.0, [0x05, 0x08, 0x0f]],
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
