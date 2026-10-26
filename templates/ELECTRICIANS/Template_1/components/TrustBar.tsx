"use client";

/**
 * TrustBar — static row (NOT marquee) of universal electrician trust signals
 * separated by VoltageMeter glyphs. Volt-panel surface with hairline borders.
 *
 * Per claude.md rule #11: NO heritage-locked claims, NO "Family-Owned",
 * NO ETA values. Anchored on service promises only.
 */
import { motion } from "framer-motion";
import { VoltageMeter } from "./ui/VoltageMeter";
import { fadeUp, VP_ONCE } from "@/lib/animations";

const SIGNALS = [
  "Licensed master electrician",
  "Bonded & insured",
  "NEC certified",
  "BBB A+ rated",
  "Up-front pricing",
  "Permits pulled",
  "Code-compliant work",
  "Local to {{CITY}}",
];

export function TrustBar() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="hidden sm:block bg-black/5 border-y border-black/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 sm:py-6 md:py-7">
        <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-3">
          {SIGNALS.map((signal, i) => (
            <div key={signal} className="flex items-center gap-x-5 sm:gap-x-7">
              <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-black/75 whitespace-nowrap">
                {signal}
              </span>
              {i < SIGNALS.length - 1 && (
                <VoltageMeter size={10} tone="amber" className="hidden sm:inline-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
