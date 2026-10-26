"use client";

/**
 * WhyChooseUs — 4-column trust grid. Each cell: large Lucide icon, title,
 * 1-2 line description. Primary-rule top border on each cell. Dark surface.
 */
import { motion } from "framer-motion";
import { ShieldCheck, Phone, DollarSign, Award } from "lucide-react";
import { CopperRule } from "./ui/CopperRule";
import { DropSeal } from "./ui/DropSeal";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    body: "Every plumber on the truck is fully licensed, bonded, and insured for your protection.",
  },
  {
    icon: Phone,
    title: "24/7 emergency line",
    body: "Burst pipe at 3am? We pick up. Real people, not a call center halfway across the country.",
  },
  {
    icon: DollarSign,
    title: "Up-front pricing",
    body: "You see the price before we lift a wrench. No surprise fees. The quote is the bill.",
  },
  {
    icon: Award,
    title: "Master plumber on staff",
    body: "Our work is led by a master plumber. The hard problems get solved, not bandaged.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-surface-tint py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Subtle wash */}
      <div
        className="absolute inset-0 bg-flow-wash opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl mb-7 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
            <DropSeal size={12} tone="primary" />
            <span>Why homeowners stay with us</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tighter mb-3 sm:mb-4">
            Four promises. We keep all four
            <br />
            <span className="text-primary">on every single call.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-10"
        >
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.article
                key={r.title}
                variants={staggerItem}
                {...hoverCardLift}
                className="flex flex-col"
              >
                <CopperRule width="short" className="mb-3 sm:mb-6" />
                <Icon
                  size={24}
                  strokeWidth={1.4}
                  className={`${i % 2 !== 0 ? "text-secondary" : "text-primary"} mb-2.5 sm:mb-5 sm:[&]:[width:36px] sm:[&]:[height:36px]`}
                />
                <h3 className="font-display text-base sm:text-2xl text-slate-900 leading-tight mb-2 sm:mb-3">
                  {r.title}
                </h3>
                <p className="font-sans text-[12px] sm:text-[15px] text-slate-600 leading-relaxed">
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
