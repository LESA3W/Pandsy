"use client";

import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { RiserMark } from "./ui/RiserMark";
import { fadeUp, VP_ONCE } from "@/lib/animations";

// SpecStrip (TrustBar) — boxed area with primary corner ticks on white
// surface. STATIC row (NOT marquee). 6 universal plumbing trust signals
// separated by RiserMark. Each signal preceded by a small BrassMedallion.
const SIGNALS = [
  "Licensed & Insured",
  "Master Plumber on Staff",
  "Up-Front Pricing",
  "24/7 Emergency Service",
  "Drain & Sewer Specialists",
  "Local to {{CITY}}",
];

export function SpecStrip() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="relative bg-white border-y border-black/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8 py-4 sm:py-6">
        <div className="relative">
          {/* Primary corner ticks */}
          <CornerTick className="top-0 left-0" rotate={0} />
          <CornerTick className="top-0 right-0" rotate={90} />
          <CornerTick className="bottom-0 right-0" rotate={180} />
          <CornerTick className="bottom-0 left-0" rotate={270} />

          <div className="px-4 sm:px-8 py-3">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 lg:gap-x-6">
              {SIGNALS.map((signal, i) => (
                <li key={signal} className="flex items-center gap-3">
                  <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-black whitespace-nowrap">
                    <BrassMedallion size={6} />
                    {signal}
                  </span>
                  {i < SIGNALS.length - 1 && (
                    <RiserMark className="hidden md:inline-block text-secondary" length={20} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function CornerTick({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-3 h-3 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 w-3 h-px bg-primary" />
      <span className="absolute top-0 left-0 w-px h-3 bg-primary" />
    </span>
  );
}
