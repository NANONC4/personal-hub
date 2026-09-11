"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

/** Long ease-out. Fast at the start, settles slowly — reads calm rather than snappy. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** How much scroll each slide is worth, on top of the one screen the stage occupies. */
const VH_PER_SLIDE = 80;

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

/**
 * The project shot, or an honest stand-in. Every path in data/projects.ts is a
 * 404 until Dia exports real screenshots, so the fallback has to look chosen
 * rather than broken — PRODUCT.md forbids passing a placeholder off as content.
 */
function SlideVisual({ project, className = "aspect-[16/10]" }: { project: Project; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = project.gallery[0];

  return (
    <div className={`relative w-full border border-slate-700/70 bg-[#0b1220] ${className}`}>
      {src && !failed ? (
        <Image
          src={src}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
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

              <Link
                href="/portfolio"
                className="group mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-white"
              >
                View all works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
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
      <div className="md:hidden">
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

        <div className="mt-16 px-6">
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
