"use client";

/**
 * WhyChooseUs — HOT WIRE / LIVE EDITORIAL
 *
 * 3 editorial proof-point columns separated by LiveWireGlyph hooks. NOT T1
 * voltage-meter columns and NOT T2 schematic-mark columns.
 *
 * No tenure, age, family, or "since 19XX" claims (claude.md hard rule #11).
 */
import { motion } from "framer-motion";
import { LiveWireGlyph } from "@/components/ui/LiveWireGlyph";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const POINTS = [
  {
    kicker: "01",
    title: "We answer.",
    body:
      "A real person picks up. Day, night, holiday. Every emergency call gets a master electrician on the line, not a script.",
  },
  {
    kicker: "02",
    title: "We quote it first.",
    body:
      "Before the first wire moves, the price is in your hand. Up-front pricing means no surprises on the invoice.",
  },
  {
    kicker: "03",
    title: "We stamp the ticket.",
    body:
      "Every job gets a hand-stamp before we leave. Permits pulled, inspections passed, labels in pen, work signed.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-8 flex flex-col items-start gap-4 sm:mb-12 sm:gap-5"
        >
          <StampMark label="Why us" meta="The bar we set" rotate={-1.8} />
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Three things every crew should do.{" "}
            <span className="italic text-primary">All three, every time.</span>
          </h2>
          <CopperRule className="hidden md:flex max-w-sm" />
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0"
        >
          {POINTS.map((p, idx) => (
            <motion.li
              key={p.kicker}
              variants={staggerItem}
              {...hoverCardLift}
              className="relative px-0 sm:px-7 first:pl-0 last:pr-0"
            >
              {/* Vertical wire glyph between columns (desktop only) */}
              {idx > 0 ? (
                <span className="hidden sm:block absolute left-0 top-3 -translate-x-1/2">
                  <LiveWireGlyph height={64} tone="accent" />
                </span>
              ) : null}

              {/* Kicker accent alternates primary / secondary so the client's
                  2nd brand color appears across the proof-point columns */}
              <span className={`block font-mono text-[11px] font-medium uppercase tracking-[0.28em] ${idx % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                / {p.kicker}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-black sm:text-2xl">
                {p.title}
              </h3>
              <p className="mt-3 font-sans text-[15px] leading-relaxed text-black/60 sm:text-base">
                {p.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
