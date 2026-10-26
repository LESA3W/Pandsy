"use client";

/**
 * TrustBar — slow-scrolling ticker (different from T1's static row). Reads
 * like a service-status feed scrolling along the top of a control room.
 *
 * Per claude.md rule #11: NO heritage-locked claims, NO "Family-Owned",
 * NO ETA values.
 */
import { motion } from "framer-motion";
import { TargetMarker } from "./ui/TargetMarker";
import { fadeUp, VP_ONCE } from "@/lib/animations";

const SIGNALS = [
  "Licensed master electrician",
  "Bonded & insured",
  "NEC certified",
  "BBB A+ rated",
  "Up-front pricing",
  "Permits pulled",
  "After-hours response",
  "Local to {{CITY}}",
];

// Duplicate the array so the marquee loops seamlessly.
const TICKER = [...SIGNALS, ...SIGNALS];

export function TrustBar() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="bg-black text-white border-y border-white/10 overflow-hidden"
    >
      <div className="relative">
        <div className="flex items-center w-max animate-ticker-slide gap-x-8 sm:gap-x-10 md:gap-x-12 py-4">
          {TICKER.map((signal, i) => (
            <div key={`${signal}-${i}`} className="flex items-center gap-x-8 sm:gap-x-10 md:gap-x-12">
              <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-widest text-white/85 whitespace-nowrap font-medium">
                {signal}
              </span>
              <TargetMarker size={12} tone="sapphire" />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
