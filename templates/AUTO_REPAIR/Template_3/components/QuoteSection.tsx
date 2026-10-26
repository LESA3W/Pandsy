"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import AmbientCard from "@/components/ui/AmbientCard";
import QuoteForm from "@/components/forms/QuoteForm";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * Quote section — primary lead engine. Copy + 4 service-promise bullets
 * on the left, QuoteForm on the right inside an AmbientCard.
 *
 * Bullets are universal service guarantees (NOT tenure claims).
 */
const PROMISES = [
  "ASE-certified hands on every diagnosis",
  "12-month warranty on parts and labor",
  "Honest estimate before any work begins",
  "OEM-grade parts, never bargain substitutes",
];

export default function QuoteSection() {
  return (
    <section
      id="quote"
      className="bg-black/70 py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="Quote request"
    >
      <div className="container-tight">
        <div className="grid gap-6 sm:gap-10 md:gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
          {/* LEFT — copy + bullets */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
          >
            <NightTag>Tell us what is going on</NightTag>
            <NightTitle as="h2" size="lg" className="mt-5 text-balance">
              Send the details. We will come back with a number.
            </NightTitle>
            <p className="mt-6 max-w-lg font-sans text-[15px] leading-relaxed text-white/60 sm:text-base">
              No upsell, no pressure, no jargon you have to translate. Tell us
              the make, the model, and what it is doing wrong. We will reply
              with a written estimate inside one business day.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="mt-7 space-y-3 sm:mt-10 sm:space-y-4"
            >
              {PROMISES.map((p, i) => {
                const useSecondary = i % 2 === 1;
                return (
                  <motion.li
                    key={p}
                    variants={staggerItem}
                    className="flex items-start gap-3"
                  >
                    <span
                      className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center ${
                        useSecondary
                          ? "border border-secondary/60 bg-secondary/10 text-secondary"
                          : "border border-primary/60 bg-primary/10 text-primary"
                      }`}
                    >
                      <Check size={12} strokeWidth={2.5} aria-hidden />
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-white/90">
                      {p}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* RIGHT — the form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
          >
            <AmbientCard elevated className="p-4 sm:p-6 md:p-8">
              <QuoteForm />
            </AmbientCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
