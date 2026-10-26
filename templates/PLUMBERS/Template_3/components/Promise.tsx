"use client";

import {
  ShieldCheck,
  Clock,
  FileText,
  ThumbsUp,
} from "lucide-react";
import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import MeterPanel from "@/components/ui/MeterPanel";
import ServiceDot from "@/components/ui/ServiceDot";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Promise (WhyChooseUs) — 4-col MeterPanel grid on white surface.
// All-MeterPanel section to balance the all-pill rhythm elsewhere.

const PROMISES = [
  {
    Icon: ShieldCheck,
    label: "Licensed & Insured",
    body: "Master plumber on every crew. Permits pulled. Coverage in writing.",
  },
  {
    Icon: Clock,
    label: "24/7 Emergency",
    body: "Live dispatch around the clock. Real arrival windows, never a runaround.",
  },
  {
    Icon: FileText,
    label: "Up-Front Pricing",
    body: "Written quotes before the wrench comes out. No surprise line-items.",
  },
  {
    Icon: ThumbsUp,
    label: "100% Satisfaction",
    body: "We test every joint before we close. If it leaks, we come back.",
  },
];

export default function Promise() {
  return (
    <section className="bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
            <PipeTick />
            Why hire us
          </p>
          {/* SLOT:PROMISE_HEADLINE */}
          <h2
            data-slot="PROMISE_HEADLINE"
            className="mt-3 font-display text-3xl font-black leading-[1.05] tracking-tight-display text-black sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Four promises. Zero surprises.
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
        >
          {PROMISES.map((p, i) => (
            <motion.li key={p.label} variants={staggerItem} {...hoverCardLift}>
              <MeterPanel tone="cloud" className="h-full p-3 sm:p-6 md:p-6">
                <ServiceDot Icon={p.Icon} size="md" tone={i % 2 !== 0 ? "accent" : "default"} className="h-9 w-9 sm:h-12 sm:w-12" />
                <p className={`mt-2.5 font-display text-sm font-black tracking-tight-display text-black sm:mt-4 sm:text-lg`}>
                  {p.label}
                </p>
                <p className="mt-1.5 text-xs text-black/60 sm:mt-2 sm:text-sm">{p.body}</p>
              </MeterPanel>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
