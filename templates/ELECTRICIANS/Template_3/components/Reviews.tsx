"use client";

/**
 * Reviews — HOT WIRE / LIVE EDITORIAL
 *
 * 2x2 desktop grid (claude.md hard rule #5), Google Business badge above with
 * native <img> for {{GOOGLE_LOGO_URL}}, crimson "Leave a review" stamp button.
 *
 * Each review card: cream raised surface, StarRow crimson-tinted, italic
 * Fraunces quote body, mono ash byline. LiveWireGlyph dividers between rows
 * on desktop (replaces T2 SchematicMark roles).
 */
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { StarRow } from "@/components/ui/StarRow";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";
import { SparkMark } from "@/components/ui/SparkMark";
import {
  fadeUp,
  hoverCardLift,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const REVIEWS = [
  {
    body: "{{REVIEW_1}}",
    name: "{{REVIEW_1_NAME}}",
    stars: "{{REVIEW_1_STARS}}",
    date: "{{REVIEW_1_DATE}}",
  },
  {
    body: "{{REVIEW_2}}",
    name: "{{REVIEW_2_NAME}}",
    stars: "{{REVIEW_2_STARS}}",
    date: "{{REVIEW_2_DATE}}",
  },
  {
    body: "{{REVIEW_3}}",
    name: "{{REVIEW_3_NAME}}",
    stars: "{{REVIEW_3_STARS}}",
    date: "{{REVIEW_3_DATE}}",
  },
  {
    body: "{{REVIEW_4}}",
    name: "{{REVIEW_4_NAME}}",
    stars: "{{REVIEW_4_STARS}}",
    date: "{{REVIEW_4_DATE}}",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-8 flex flex-col items-start gap-4 sm:mb-12 sm:gap-5"
        >
          <StampMark label="Reviews" meta="What customers wrote" rotate={-1.5} />
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl">
            The ticket book{" "}
            <span className="italic text-primary">, in their words.</span>
          </h2>
          <CopperRule className="max-w-sm" />
        </motion.div>

        {/* Google Business badge — cream raised card */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
          className="mb-8 inline-flex w-full max-w-2xl flex-col gap-4 border border-accent bg-white p-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
        >
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{GOOGLE_LOGO_URL}}"
              alt="Google"
              width={36}
              height={36}
              className="flex-shrink-0"
              style={{ objectFit: "contain", display: "block" }}
            />
            <div>
              <p className="flex items-baseline gap-2 font-display text-2xl font-bold leading-none tracking-tight text-black">
                {"{{GOOGLE_RATING}}"}
                <span className="font-sans text-sm font-normal text-black/60">/ 5</span>
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-black/60">
                Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
              </p>
              <div className="mt-2">
                <StarRow rating="5" tone="crimson" size={14} />
              </div>
            </div>
          </div>

          <a
            href="{{GOOGLE_REVIEW_URL}}"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-text px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
          >
            <SparkMark size={11} tone="cream" /> Leave a review
          </a>
        </motion.div>

        {/* 2x2 grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 gap-px bg-accent sm:grid-cols-2"
        >
          {REVIEWS.map((r, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              {...hoverCardLift}
              className="relative flex flex-col gap-3 bg-white p-4 sm:gap-4 sm:p-6 md:p-8"
            >
              <Quote
                size={28}
                strokeWidth={1.4}
                className={`opacity-70 ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}
                aria-hidden="true"
              />
              <p className="font-display text-base font-medium italic leading-snug text-black sm:text-lg">
                {r.body}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-accent pt-4">
                <div>
                  {/* Reviewer accent alternates primary / secondary so the
                      client's 2nd brand color appears across the reviews grid */}
                  <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                    {r.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black/60">
                    {r.date}
                  </p>
                </div>
                <StarRow rating={r.stars} tone="crimson" size={14} />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
