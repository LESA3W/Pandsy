"use client";

/**
 * WhyChooseUs — 4-column trust grid. Spec-sheet style: sheet number, icon,
 * promise title, fine-print description. Steel-deep dark band to break the
 * paper-white rhythm — but the sheet itself is rendered as if it were
 * blueprint cells.
 */
import { ShieldCheck, Phone, DollarSign, Award } from "lucide-react";
import { motion } from "framer-motion";
import { MeasureRule } from "./ui/MeasureRule";
import { BlueprintCell } from "./ui/BlueprintCell";
import { GridGlow } from "./ui/GridGlow";
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
    title: "After-hours response",
    body: "Sparking outlet at 3am? We pick up. Real people. No call center halfway across the country.",
  },
  {
    n: "03",
    icon: DollarSign,
    title: "Up-front pricing",
    body: "You see the price before we open the wall. No surprise fees. The quote is the bill.",
  },
  {
    n: "04",
    icon: Award,
    title: "Master on staff",
    body: "Our work is led by a master electrician. The hard problems get scoped, not bandaged.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-black text-white py-10 sm:py-14 md:py-20 lg:py-24 overflow-hidden">
      <GridGlow variant="dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-8 sm:mb-14"
        >
          <BlueprintCell
            n="06"
            title="Four standards"
            spec="held on every job / no exceptions"
            variant="light"
            className="mb-5 sm:mb-7"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-4 font-bold max-w-3xl">
            Four standards. We hold all four
            <br />
            <span className="text-primary">on every single ticket.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-8 sm:gap-y-12"
        >
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            // Alternate icon + divider tone so the client's 2nd brand color
            // appears across the trust grid (discreet, primary stays dominant).
            const isSecondary = i % 2 !== 0;
            return (
              <motion.article
                key={r.title}
                variants={staggerItem}
                {...hoverCardLift}
                className="flex flex-col"
              >
                <MeasureRule width="short" tone={isSecondary ? "secondary" : "sapphire"} className="mb-4 sm:mb-5" />
                {/* Sheet ordinal */}
                <span
                  className="font-mono text-primary text-[10px] sm:text-[11px] uppercase tracking-widest mb-2 sm:mb-3 font-medium"
                  data-slot={`WHY_TILE_${r.n}_ORDINAL`}
                >
                  Standard {r.n}
                </span>
                <Icon
                  size={28}
                  strokeWidth={1.4}
                  className={`mb-3 sm:mb-4 sm:w-8 sm:h-8 ${isSecondary ? "text-secondary" : "text-primary"}`}
                />
                <h3
                  className="font-display text-lg sm:text-2xl text-white leading-tight mb-2 sm:mb-3 font-semibold tracking-tight"
                  data-slot={`WHY_TILE_${r.n}_HEADLINE`}
                >
                  {r.title}
                </h3>
                <p className="font-sans text-[13px] sm:text-[15px] text-white/80 leading-relaxed">
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
