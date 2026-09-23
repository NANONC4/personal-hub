"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PixelHeart } from "@/components/PixelIcons";
import type { Project } from "@/data/projects";

/** Long ease-out. Fast at the start, settles slowly — reads calm rather than snappy. */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * How much scroll each slide is worth, on top of the one screen the stage
 * occupies. Half a viewport is about four wheel notches through Lenis — enough
 * for the transition to land, short enough that three projects don't feel like
 * a chore.
 */
const VH_PER_SLIDE = 50;

/**
 * The label has to match what the link actually opens: `demo` is a live site for
 * the web projects but a Drive build for the Unity one.
 */
function outboundLink(p: Project) {
  if (p.links.demo) {
    return { href: p.links.demo, label: p.type === "game" ? "โหลดตัวเกม" : "เปิดเว็บจริง" };
  }
  if (p.links.github) return { href: p.links.github, label: "ดูโค้ดบน GitHub" };
  if (p.links.document) return { href: p.links.document, label: "อ่านเอกสาร" };
  return null;
}

/* ------------------------------------------------------------------ visual */

/* Same wood as WelcomeWindow. Shape follows the lofi "window seat" look:
   a wide centre opening, a narrow fixed pane either side with a transom
   near the top, and one long sill with a few pots on it. */
const WOOD = "#0a1424";
const WOOD_LIT = "#25395a";

/** A narrow fixed side pane: night glass, a couple of stars, a transom bar. */
function SidePane({ side }: { side: "left" | "right" }) {
  const stars = side === "left" ? [[30, 12], [62, 44], [22, 70]] : [[58, 16], [28, 52], [70, 78]];
  return (
    <div aria-hidden className="relative h-full overflow-hidden bg-[linear-gradient(to_bottom,#1a2d52,#0f1d38)] [image-rendering:pixelated]">
      {stars.map(([x, y]) => (
        <span key={`${x}-${y}`} className="absolute h-[2px] w-[2px] bg-[#cfe1f5]/70" style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_38%,rgba(160,195,230,0.10)_46%,transparent_54%)]" />
      {/* transom */}
      <div className="absolute inset-x-0 top-[24%] h-[8px]" style={{ background: WOOD }} />
      <div className="absolute inset-0 shadow-[inset_0_0_0_2px_#25395a]" />
    </div>
  );
}

/** Leafy plant in a round pot. `size` scales the whole thing. */
function LeafyPlant({ className = "" }: { className?: string }) {
  const leaves: [number, number, number][] = [
    [-62, 16, 30], [-38, 22, 44], [-12, 26, 54], [14, 24, 50], [40, 20, 42], [64, 14, 28],
  ];
  return (
    <div aria-hidden className={`absolute bottom-full [image-rendering:pixelated] ${className}`}>
      <div className="relative h-24 w-20">
        {leaves.map(([r, w, h], i) => (
          <div
            key={i}
            className={`absolute bottom-9 left-1/2 origin-bottom rounded-[50%_50%_45%_45%/65%_65%_35%_35%] ${i % 2 ? "bg-[#1d4677]" : "bg-[#24568c]"}`}
            style={{ width: w, height: h, marginLeft: -w / 2, transform: `rotate(${r}deg)` }}
          />
        ))}
        <div className="absolute bottom-0 left-1/2 h-10 w-14 -translate-x-1/2 rounded-b-[12px] rounded-t-sm bg-[#22365a]" />
        <div className="absolute bottom-9 left-1/2 h-2 w-16 -translate-x-1/2 rounded-sm bg-[#2f4a73]" />
      </div>
    </div>
  );
}

/** Small succulent in a short pot. */
function Succulent({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute bottom-full [image-rendering:pixelated] ${className}`}>
      <div className="relative h-14 w-12">
        {[-40, -18, 0, 18, 40].map((r, i) => (
          <div
            key={r}
            className={`absolute bottom-5 left-1/2 h-7 w-3 origin-bottom rounded-t-full ${i % 2 ? "bg-[#1d4677]" : "bg-[#24568c]"}`}
            style={{ marginLeft: -6, transform: `rotate(${r}deg)` }}
          />
        ))}
        <div className="absolute bottom-0 left-1/2 h-6 w-10 -translate-x-1/2 rounded-b-md bg-[#22365a]" />
        <div className="absolute bottom-5 left-1/2 h-1.5 w-11 -translate-x-1/2 bg-[#2f4a73]" />
      </div>
    </div>
  );
}

/**
 * The project shot as the view out of a lofi window: wide centre opening,
 * narrow side panes, one long sill with pots. Falls back to an honest
 * stand-in if the image fails — PRODUCT.md forbids passing a placeholder off
 * as content.
 */
function SlideVisual({ project, className = "aspect-[16/10]" }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = project.gallery[0];

  return (
    <div className={`relative w-full ${className}`}>
      {/* soft lamp light from the room, pooling on the sill */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -bottom-6 top-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(251,191,36,0.12),transparent_65%)]"
      />

      {/* the window: outer frame, three lites split by mullions */}
      <div
        className="absolute inset-x-[3%] bottom-4 top-0 grid grid-cols-[13%_1fr_13%] gap-[10px] p-[10px]"
        style={{ background: WOOD, boxShadow: `inset 0 3px 0 ${WOOD_LIT}` }}
      >
        <SidePane side="left" />

        <div className="relative overflow-hidden bg-[#0b1220]">
          {src && !failed ? (
            <Image
              src={src}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 45vw, 80vw"
              className="object-cover object-top"
              onError={() => setFailed(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3
                         bg-[linear-gradient(to_right,#94a3b810_1px,transparent_1px),linear-gradient(to_bottom,#94a3b810_1px,transparent_1px)]
                         bg-[size:16px_16px]"
            >
              <span className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-[0.3em] text-slate-600">
                {project.category}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-slate-700">
                ภาพตัวอย่างกำลังมา
              </span>
            </div>
          )}
          <div aria-hidden className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_2px_#25395a,inset_0_-22px_28px_-12px_rgba(251,191,36,0.14)]" />
        </div>

        <SidePane side="right" />
      </div>

      {/* sill: runs past the frame on both sides, pots stand on it */}
      <div className="absolute inset-x-0 bottom-0 h-4 [image-rendering:pixelated]">
        <div className="absolute inset-x-0 top-0 h-[6px] bg-[#1b2c48]" />
        <div className="absolute inset-x-0 top-[6px] h-[5px] bg-[#132741]" />
        <div className="absolute inset-x-0 top-[11px] bottom-0 bg-[#060d18]" />
        <LeafyPlant className="left-[2%] origin-bottom-left scale-[0.55] md:scale-100" />
        <Succulent className="left-[12%] origin-bottom-left scale-[0.55] md:scale-90" />
        <Succulent className="right-[12%] origin-bottom-right scale-[0.5] md:scale-75" />
        <LeafyPlant className="right-[2%] origin-bottom-right scale-[0.45] md:scale-[0.8]" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- slide */

function SlideBody({ project, reduce }: { project: Project; reduce: boolean }) {
  const link = outboundLink(project);

  const slide = {
    enter: { opacity: 0, x: reduce ? 0 : 48 },
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0.2 : 0.7, ease: EASE, staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.06 },
    },
    exit: { opacity: 0, x: reduce ? 0 : -48, transition: { duration: reduce ? 0.15 : 0.45, ease: EASE } },
  };
  const line = {
    enter: { opacity: 0, y: reduce ? 0 : 18 },
    center: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.6, ease: EASE } },
    exit: { opacity: 0, y: reduce ? 0 : -10, transition: { duration: 0.25 } },
  };

  return (
    <motion.article
      variants={slide}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 flex flex-col justify-center"
    >
      <motion.div variants={line}>
        {/* fixed height, not an aspect ratio — the stage is pinned to the
            viewport, so the slide has to fit a screen it cannot grow past */}
        <SlideVisual project={project} className="h-[34vh]" />
      </motion.div>

      <motion.h3
        variants={line}
        className="mt-7 font-[family-name:var(--font-pixel)] text-2xl uppercase tracking-wider text-white lg:text-3xl"
      >
        {project.title}
      </motion.h3>

      <motion.p variants={line} className="mt-4 line-clamp-3 max-w-[62ch] leading-relaxed text-slate-400">
        {project.description}
      </motion.p>

      <motion.div variants={line} className="mt-6 flex flex-col gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {project.stack.slice(0, 4).join(" · ")}
        </span>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-pink-400 transition-colors hover:text-pink-300"
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </motion.div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------- stage */

export default function ProjectSlides({ projects }: { projects: Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion() ?? false;
  const count = projects.length;

  // Lenis runs the page, and framer's useScroll does not stay in step with it —
  // read the rect straight off a passive scroll listener instead.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      setActive(Math.min(count - 1, Math.floor(p * count)));
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
  }, [count]);

  // Clicking the index drops you in the middle of that slide's scroll band.
  const jumpTo = useCallback(
    (i: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (travel * (i + 0.5)) / count, behavior: reduce ? "auto" : "smooth" });
    },
    [count, reduce]
  );

  const current = projects[active];

  return (
    <>
      {/* ---------- desktop: the stage pins, the slides move ---------- */}
      <div
        ref={wrapRef}
        className="relative hidden md:block"
        style={{ height: `${count * VH_PER_SLIDE + 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-16 px-6 lg:gap-24">
            {/* index */}
            <div className="flex flex-col justify-center">
              <h2 className="font-[family-name:var(--font-pixel)] text-4xl uppercase leading-[1.1] tracking-wider text-white lg:text-6xl">
                What I&apos;ve Built
              </h2>

              <ol className="mt-12 flex flex-col gap-1">
                {projects.map((p, i) => {
                  const on = i === active;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-current={on ? "true" : undefined}
                        className="group flex w-full items-center gap-4 py-3 text-left"
                      >
                        <span
                          className={`font-mono text-[11px] tabular-nums transition-colors ${
                            on ? "text-pink-400" : "text-slate-600 group-hover:text-slate-500"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`h-2 w-2 shrink-0 transition-colors ${
                            on ? "bg-pink-400" : "bg-slate-700 group-hover:bg-slate-600"
                          }`}
                        />
                        <span
                          className={`font-[family-name:var(--font-pixel)] text-sm uppercase tracking-wider transition-colors ${
                            on ? "text-white" : "text-slate-600 group-hover:text-slate-400"
                          }`}
                        >
                          {p.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* both exits from this section live here, inside it — floating
                  them after the stage put them on top of the closing */}
              <div className="mt-12 flex flex-col items-start gap-6">
                <Link
                  href="/showreel"
                  className="group border-2 border-pink-500/50 px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-pink-400 transition-all hover:bg-pink-500 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    Watch the showreel
                    <PixelHeart className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
                  </span>
                </Link>

                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-white"
                >
                  View all works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* slide */}
            <div className="relative h-[76vh]">
              <AnimatePresence initial={false}>
                <SlideBody key={current.id} project={current} reduce={reduce} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- mobile: no pinning, one project per block ---------- */}
      <div className="pb-28 md:hidden md:pb-0">
        <div className="px-6">
          <h2 className="font-[family-name:var(--font-pixel)] text-3xl uppercase leading-[1.1] tracking-wider text-white">
            What I&apos;ve Built
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-20 px-6">
          {projects.map((p, i) => {
            const link = outboundLink(p);
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduce ? 0.2 : 0.8, ease: EASE }}
              >
                <span className="font-mono text-[11px] tabular-nums text-pink-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-3">
                  <SlideVisual project={p} />
                </div>
                <h3 className="mt-6 font-[family-name:var(--font-pixel)] text-xl uppercase tracking-wider text-white">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-4 leading-relaxed text-slate-400">{p.description}</p>
                <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-slate-500">
                  {p.stack.slice(0, 3).join(" · ")}
                </p>
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-pink-400"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 px-6">
          <Link
            href="/showreel"
            className="border-2 border-pink-500/50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-pink-400"
          >
            <span className="flex items-center gap-2">
              Watch the showreel
              <PixelHeart className="h-4 w-4 shrink-0 opacity-70" />
            </span>
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500"
          >
            View all works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
