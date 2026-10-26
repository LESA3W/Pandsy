"use client";

/**
 * About — HOT WIRE / LIVE EDITORIAL
 *
 * Editorial split: image card left (EditorialFrame with stamp + caption),
 * Fraunces headline + ash body right. SLOT-driven copy.
 */
import { motion } from "framer-motion";
import { EditorialFrame } from "@/components/ui/EditorialFrame";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import { SparkMark } from "@/components/ui/SparkMark";
import {
  fadeLeft,
  fadeRight,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const PROOF_POINTS = [
  {
    label: "Licensed",
    body: "Master electrician on staff, every job. We sign the permit ourselves.",
  },
  {
    label: "Hand-stamped",
    body: "Each ticket gets a stamp before we leave. Wires labeled, panels mapped.",
  },
  {
    label: "Up-front pricing",
    body: "You see the number before we touch a wire. Nothing on the invoice surprises you.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* IMAGE — left, EditorialFrame with caption strip */}
          {/* Image container shifted 40px left on desktop so the editorial
              frame bleeds toward the page edge — a deliberate asymmetric
              offset. The parent section has overflow-hidden which clips any
              bleed. On mobile/tablet the grid is single-column so the offset
              is suppressed. */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5"
          >
            <EditorialFrame
              src="{{ABOUT}}"
              alt="The crew at {{BUSINESS_NAME}}"
              stamp="Live · The crew"
              caption="The bench, the ticket book, the crew."
              aspect="aspect-[3/2] md:aspect-[4/5]"
              imgClassName="object-[-40px_center]"
            />
          </motion.div>

          {/* COPY — right */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
            >
              <StampMark label="About" meta="Who you'll meet" rotate={-1.5} />
            </motion.div>

            <h2
              data-slot="ABOUT_HEADLINE"
              className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              We pick up the phone.{" "}
              <span className="italic text-primary">We pull the permits.</span>{" "}
              We stamp the work.
            </h2>

            <CopperRule className="my-8 max-w-md" />

            <div
              data-slot="ABOUT_BODY"
              className="space-y-5 font-sans text-lg leading-relaxed text-black/60"
            >
              <p>
                {"{{BUSINESS_NAME}}"} is the licensed crew {"{{CITY}}"}{" "}
                calls when the power feels wrong. We work with{" "}
                {"{{TARGET_DESCRIPTION}}"} Sparking outlet, half-house outage
                at 11pm, a panel that hasn&apos;t been touched in too long, a
                Level 2 EV charger run going into the driveway. Same crew
                handles all of it.
              </p>
              <p className="hidden md:block">
                We do the boring parts right. Permits pulled. Inspections
                passed clean. Every breaker labeled in pen, not Sharpie. Every
                ticket hand-stamped before we drive away.
              </p>
            </div>

            {/* Proof points strip */}
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-10 grid grid-cols-1 gap-px bg-accent sm:grid-cols-3"
            >
              {PROOF_POINTS.map((p) => (
                <motion.li
                  key={p.label}
                  variants={staggerItem}
                  className="flex flex-col gap-2 bg-white p-5"
                >
                  <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                    <SparkMark size={10} /> {p.label}
                  </span>
                  <p className="font-sans text-sm leading-relaxed text-black/60">
                    {p.body}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
