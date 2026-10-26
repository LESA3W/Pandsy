"use client";

/**
 * QuoteSection — HOT WIRE / LIVE EDITORIAL
 *
 * Editorial split: intro left, QuoteForm right on cream-deep surface.
 * Decorative crimson ribbon stripe along the top. No background image.
 */
import { motion } from "framer-motion";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import { SparkMark } from "@/components/ui/SparkMark";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function QuoteSection() {
  return (
    <section id="quote" className="relative bg-white py-8 sm:py-14 md:py-20 lg:py-24">
      {/* Top crimson ribbon — signature stripe */}
      <span aria-hidden="true" className="absolute top-0 left-0 h-1.5 w-full bg-primary" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-5 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* INTRO — left */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="lg:col-span-5"
          >
            <StampMark label="Free quote" meta="No obligation" rotate={-2} />

            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              Tell us what you&apos;re seeing.{" "}
              <span className="italic text-primary">We&apos;ll quote it before we drive over.</span>
            </h2>

            <CopperRule className="my-5 max-w-md sm:my-7" />

            <p className="font-sans text-[15px] leading-relaxed text-black/60 sm:text-lg">
              The ticket goes straight to a master electrician&apos;s phone.
              You hear back within the hour during business hours, or first
              thing next morning for after-hours requests. For emergencies,
              call directly at{" "}
              <a
                href="tel:{{PHONE_DIGITS}}"
                className="inline-flex items-center py-2 text-primary underline hover:text-primary font-medium"
              >
                {"{{PHONE}}"}
              </a>
              .
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="mt-6 space-y-3 font-sans text-[15px] text-black/60 sm:mt-8 sm:space-y-4 sm:text-base"
            >
              <motion.li variants={staggerItem} className="flex items-start gap-3">
                <SparkMark size={12} className="mt-1.5 shrink-0" />
                <span>Photos help us scope and bring the right gear.</span>
              </motion.li>
              <motion.li variants={staggerItem} className="flex items-start gap-3">
                <SparkMark size={12} className="mt-1.5 shrink-0" />
                <span>No obligation. The quote is yours to keep.</span>
              </motion.li>
              <motion.li variants={staggerItem} className="flex items-start gap-3">
                <SparkMark size={12} className="mt-1.5 shrink-0" />
                <span>Your details only go to our master electrician.</span>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* FORM — right, on cream raised surface */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="lg:col-span-7"
          >
            <div className="border border-accent bg-white p-3 sm:p-6 md:p-8 lg:p-10">
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
