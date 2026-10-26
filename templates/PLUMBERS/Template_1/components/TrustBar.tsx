"use client";

/**
 * TrustBar — static row (NOT marquee) of 6 universal plumbing trust signals
 * separated by DropSeal water-droplet markers. White surface.
 *
 * Per claude.md rule #11: NO heritage-locked claims, NO "Family-Owned",
 * NO ETA values. Anchored on service promises only.
 */
import { motion } from "framer-motion";
import { DropSeal } from "./ui/DropSeal";
import { fadeUp, VP_ONCE } from "@/lib/animations";

const SIGNALS = [
  "Licensed & insured",
  "Master plumber on staff",
  "24/7 emergency",
  "Up-front pricing",
  "Same-day service",
  "Local to {{CITY}}",
];

export function TrustBar() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="hidden md:block bg-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 sm:py-7">
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-8 gap-y-2 sm:gap-y-3">
          {SIGNALS.map((signal, i) => (
            <div key={signal} className="flex items-center gap-x-4 sm:gap-x-8">
              <span className="font-mono text-[10px] sm:text-[12px] uppercase tracking-widest text-slate-900 whitespace-nowrap">
                {signal}
              </span>
              {i < SIGNALS.length - 1 && (
                <DropSeal size={9} tone={i % 2 !== 0 ? "secondary" : "primary"} className="hidden sm:inline-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
