"use client";

import { motion } from "framer-motion";
import GlowDot from "@/components/ui/GlowDot";
import HaloRule from "@/components/ui/HaloRule";
import { fadeUp, VP_ONCE } from "@/lib/animations";

/**
 * Trust bar — STATIC horizontal row separated by GlowDots.
 * NOT a marquee (T1's territory). NOT tool-icon pills (T2's territory).
 *
 * All items are universal trust signals that work for any auto-repair shop
 * regardless of age, size, or location. NEVER includes "Family-Owned"
 * or any heritage-locked claim per claude.md hard rule #11.
 */
const ITEMS = [
  "ASE-Certified",
  "Licensed & Insured",
  "12-Month Warranty",
  "Honest Pricing",
  "Same-Day Service",
  "Local to {{CITY}}",
];

export default function TrustBar() {
  return (
    <motion.section
      aria-label="Trust signals"
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="relative bg-black/70 py-4 sm:py-5 md:py-6"
    >
      <HaloRule className="absolute inset-x-0 top-0" align="center" />
      <div className="container-tight overflow-hidden">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5 md:gap-x-8">
          {ITEMS.map((item, i) => (
            <li
              key={item}
              className="flex items-center gap-3 small-caps text-[10px] text-white/60 sm:text-[11px]"
            >
              <span>{item}</span>
              {i < ITEMS.length - 1 && (
                <GlowDot soft tone={i % 2 === 0 ? "amber" : "secondary"} />
              )}
            </li>
          ))}
        </ul>
      </div>
      <HaloRule className="absolute inset-x-0 bottom-0" align="center" />
    </motion.section>
  );
}
