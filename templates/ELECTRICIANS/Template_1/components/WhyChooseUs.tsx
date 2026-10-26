"use client";

/**
 * WhyChooseUs — 4-column trust grid. Each cell: large amber Archivo ordinal
 * (01-04), Lucide icon, headline, 1-2 line description. Volt-deep surface
 * with subtle filament glow.
 */
import { ShieldCheck, Phone, DollarSign, Award } from "lucide-react";
import { motion } from "framer-motion";
import { VoltageRule } from "./ui/VoltageRule";
import { PanelLabel } from "./ui/PanelLabel";
import { FilamentGlow } from "./ui/FilamentGlow";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const REASONS = [
  {
    n: "01",
    icon: ShieldCheck,
    title: "Licensed & insured",
    body: "Every electrician on the truck is fully licensed, bonded, and insured for your protection.",
  },
  {
    n: "02",
    icon: Phone,
    title: "24/7 emergency line",
    body: "Sparking outlet at 3am? We pick up. Real people, not a call center halfway across the country.",
  },
  {
    n: "03",
    icon: DollarSign,
    title: "Up-front pricing",
    body: "You see the price before we open the panel. No surprise fees. The quote is the bill.",
  },
  {
    n: "04",
    icon: Award,
    title: "Master electrician on staff",
    body: "Our work is led by a master electrician. The hard problems get solved, not bandaged.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-primary py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* FilamentGlow is additive atmospheric — keep but it reads on the yellow fill */}
      <FilamentGlow />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-9 sm:mb-14"
        >
          <PanelLabel
            n="06"
            title="FOUR PROMISES"
            meta="CIRCUIT 06 · LIVE"
            className="mb-5 sm:mb-7"
          />
          {/* text-primary-text auto-contrasts to black on the yellow band */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-text leading-[1.02] tracking-tighter mb-4 uppercase max-w-3xl">
            Four promises. We keep all four
            <br />
            on every single call.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10 md:gap-x-8 md:gap-y-12"
        >
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            // Discreet marker: alternate the per-tile divider tone so the
            // client's 2nd brand color appears even on the primary band.
            const tone = i % 2 !== 0 ? "arc" : "amber";
            return (
              <motion.article
                key={r.title}
                variants={staggerItem}
                {...hoverCardLift}
                className="flex flex-col"
              >
                <VoltageRule width="short" tone={tone} className="mb-3 sm:mb-5" />
                {/* Large ordinal — deep black on yellow */}
                <span
                  className="font-display text-black/70 text-4xl sm:text-6xl md:text-7xl leading-none mb-3 sm:mb-4 uppercase"
                  data-slot={`WHY_TILE_${r.n}_ORDINAL`}
                >
                  {r.n}
                </span>
                <Icon
                  size={26}
                  strokeWidth={1.4}
                  className="text-black/80 mb-3 sm:mb-4 sm:!w-8 sm:!h-8"
                />
                <h3
                  className="font-display text-base sm:text-2xl text-black leading-tight mb-2 sm:mb-3 uppercase tracking-tight"
                  data-slot={`WHY_TILE_${r.n}_HEADLINE`}
                >
                  {r.title}
                </h3>
                <p className="font-sans text-[13px] sm:text-[15px] text-black/75 leading-relaxed">
                  {r.body}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
