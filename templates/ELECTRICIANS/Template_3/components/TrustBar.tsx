"use client";

/**
 * TrustBar — HOT WIRE / LIVE EDITORIAL
 *
 * Static crimson ribbon with copper-rule separators between trust items.
 * Geist Mono uppercase items. Different from T1 static row with VoltageMeter
 * separators and T2 slow-scrolling steel ticker.
 *
 * Universal trust signals only (no time-anchored or family claims).
 */
import { motion } from "framer-motion";
import { SparkMark } from "@/components/ui/SparkMark";
import { fadeUp, VP_ONCE } from "@/lib/animations";

const ITEMS = [
  "Licensed Master Electrician",
  "Bonded & Insured",
  "Up-Front Pricing",
  "24/7 Emergency",
  "Permits Pulled",
  "NEC Certified",
  "Code-Stamped Work",
  "Local to {{CITY}}",
];

export function TrustBar() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      aria-label="Trust signals"
      className="hidden md:block relative bg-primary text-primary-text"
    >
      {/* Top + bottom hairline pinstripe */}
      <span aria-hidden="true" className="absolute top-0 left-0 h-px w-full bg-primary" />
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full bg-primary" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 py-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em]">
          {ITEMS.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              <span>{item}</span>
              {i < ITEMS.length - 1 ? (
                <SparkMark size={9} tone="ink" className="opacity-50" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
