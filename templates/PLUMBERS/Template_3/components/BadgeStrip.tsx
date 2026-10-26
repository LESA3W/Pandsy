"use client";

import { motion } from "framer-motion";
import FlowChip from "@/components/ui/FlowChip";
import WaterDot from "@/components/ui/WaterDot";
import PressureGauge from "@/components/ui/PressureGauge";
import RippleRule from "@/components/ui/RippleRule";
import { fadeUp, VP_ONCE } from "@/lib/animations";

// BadgeStrip (TrustBar) — STATIC row of universal trust signals as FlowChips.
// One PressureGauge MeterPanel-style cell at the right end breaks the all-pill
// rhythm. White surface, RippleRule dividers above and below.

const SIGNALS = [
  "Licensed & Insured",
  "Master Plumber",
  "24/7 Emergency",
  "Up-Front Pricing",
  "Same-Day Service",
  "100% Satisfaction",
];

export default function BadgeStrip() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="relative bg-white py-7 sm:py-10 md:py-12 lg:py-14"
    >
      <RippleRule className="absolute -top-1 left-0 right-0" tone="default" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 lg:justify-start">
            {SIGNALS.map((s, i) => (
              <li key={s} className="inline-flex items-center gap-3">
                {i > 0 && s !== "100% Satisfaction" && <WaterDot size={10} className="hidden sm:inline-block" />}
                <FlowChip>{s}</FlowChip>
              </li>
            ))}
          </ul>
          {/* Trade anchor — PressureGauge breaks the SaaS-pill register */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-2.5 shadow-lift-soft">
            <PressureGauge psi={80} />
            <span className="flex flex-col leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                Pressure tested
              </span>
              <span className="font-display text-sm font-black tracking-tight-display text-black">
                80 PSI
              </span>
            </span>
          </div>
        </div>
      </div>
      <RippleRule className="absolute -bottom-1 left-0 right-0" tone="default" />
    </motion.section>
  );
}
