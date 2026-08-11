"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#09090b] text-slate-300 py-8 px-6 border-t border-slate-900">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-4">
        <p className="font-[family-name:var(--font-pixel)] text-[10px] tracking-widest uppercase text-slate-600/50">
          © {new Date().getFullYear()} PIXEL ENGINEER. CRAFTED IN THE DEAD OF NIGHT.
        </p>
      </div>
    </footer>
  );
}
