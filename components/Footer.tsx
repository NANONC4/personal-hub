"use client";

import Link from "next/link";

const LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    // relative + z so the page's fixed PixelSky layer can't paint over the text
    <footer className="relative z-10 w-full border-t border-slate-800 bg-[#09090b] px-6 py-10 text-slate-300">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6">
        {/* a way out of every page */}
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-pink-400 md:text-xs"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:diaframpton771@gmail.com"
            className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-pink-400 md:text-xs"
          >
            Email
          </a>
        </nav>

        {/* narrow screens can't take the wide tracking without breaking mid-word */}
        <p className="text-balance px-2 text-center font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-wide text-slate-400 md:tracking-widest">
          © {new Date().getFullYear()} PIXEL ENGINEER. CRAFTED IN THE DEAD OF NIGHT.
        </p>
      </div>
    </footer>
  );
}
