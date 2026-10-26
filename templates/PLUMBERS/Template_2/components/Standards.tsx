"use client";

import {
  ShieldCheck,
  ClipboardCheck,
  Award,
  Clock4,
} from "lucide-react";
import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Standards (WhyChooseUs) — 4-col trust grid on white surface.
// Each cell: PlateLine top, Lucide icon (in primary), Space Mono "STANDARD 0N"
// kicker, IBM Plex Serif title, Work Sans body.
const STANDARDS = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    body: "Bonded plumbers, current with state code, all the paperwork on hand.",
  },
  {
    icon: ClipboardCheck,
    title: "Up-front written quote",
    body: "You approve the price before we work. No add-on charges at the end.",
  },
  {
    icon: Award,
    title: "Master plumber on staff",
    body: "A senior plumber reviews every ticket and signs off the test.",
  },
  {
    icon: Clock4,
    title: "Same-day & 24/7 emergency",
    body: "Most jobs scheduled same day. The emergency line is answered around the clock.",
  },
];

export function Standards() {
  return (
    <section id="standards" className="relative bg-surface-tint py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
            <BrassMedallion size={9} />
            Shop standards
          </p>
          <PlateLine tone="primary" className="mt-5 max-w-[200px]" />
          {/* SLOT:STANDARDS_HEADLINE */}
          <h2
            data-slot="STANDARDS_HEADLINE"
            className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-slate-900"
          >
            Plumbing you don&apos;t have to think about again.
          </h2>
          <p className="mt-3 sm:mt-4 text-[15px] sm:text-base text-slate-500 max-w-xl">
            Four things we promise on every ticket. They are not negotiable.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="mt-9 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200"
        >
          {STANDARDS.map((s, i) => (
            <motion.article
              key={s.title}
              variants={staggerItem}
              {...hoverCardLift}
              className="relative bg-white p-4 sm:p-6 lg:p-8 group hover:bg-surface-tint transition-colors"
            >
              <PlateLine tone="primary" className="absolute top-0 left-0 right-0" />
              <div className="pt-3">
                <p className={`font-mono text-[10px] uppercase tracking-widest ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                  Standard {String(i + 1).padStart(2, "0")}
                </p>
                <s.icon
                  size={24}
                  strokeWidth={1.5}
                  className={`mt-4 sm:mt-5 ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}
                  aria-hidden="true"
                />
                <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-xl font-semibold text-slate-900 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 sm:mt-2.5 text-[13px] sm:text-sm leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
