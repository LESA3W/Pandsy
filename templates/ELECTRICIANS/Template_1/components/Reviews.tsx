"use client";

/**
 * Reviews — 2x2 grid + Google Business badge above (claude.md rule #5).
 * 4 review placeholders: REVIEW_1..REVIEW_4 + their _NAME / _STARS / _DATE.
 */
import { motion } from "framer-motion";
import { StarRow } from "./ui/StarRow";
import { VoltageRule } from "./ui/VoltageRule";
import { PanelLabel } from "./ui/PanelLabel";
import { ArrowUpRight, Quote } from "lucide-react";
import {
  fadeUp,
  hoverCardLift,
  hoverLift,
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
    <section id="reviews" className="relative bg-white py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="mb-7 sm:mb-10 md:mb-12"
        >
          <PanelLabel
            n="08"
            title="REAL REVIEWS"
            meta="GOOGLE VERIFIED"
            variant="dark"
            className="mb-7"
          />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.02] tracking-tighter uppercase max-w-2xl">
            Real Google reviews
            <br />
            from real homeowners.
          </h2>
        </motion.div>

        {/* Google Business badge — light card with black border */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
          className="bg-white border border-black/10 p-4 sm:p-6 md:p-7 mb-7 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Google logo — native colors preserved per claude.md rule #5 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{GOOGLE_LOGO_URL}}"
              alt="Google"
              width={44}
              height={44}
              className="block h-11 w-11 object-contain flex-shrink-0"
              style={{ filter: "none" }}
            />
            <div>
              <div className="flex items-center gap-3 mb-1">
                {/* Rating + /5 share the same text-black so both are legible on white */}
                <span className="font-display text-2xl sm:text-3xl text-black leading-none uppercase tracking-tight">
                  {"{{GOOGLE_RATING}}"}
                  <span className="text-black/45">/5</span>
                </span>
                <StarRow rating="5" size={18} tone="amber" surface="light" />
              </div>
              <p className="font-sans text-[13px] sm:text-[14px] text-black/60">
                Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
              </p>
            </div>
          </div>
          <motion.a
            href="{{GOOGLE_REVIEW_URL}}"
            target="_blank"
            rel="noopener noreferrer"
            {...hoverLift}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary text-primary-text px-5 py-3 sm:px-6 sm:py-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            Leave a review
            <ArrowUpRight size={14} strokeWidth={2} />
          </motion.a>
        </motion.div>

        {/* 2x2 grid of reviews — bg-black/10 hairlines between cells */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10"
        >
          {REVIEWS.map((r, i) => (
            <motion.article
              key={i}
              variants={staggerItem}
              {...hoverCardLift}
              className="relative bg-white p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4"
            >
              {/* Accent line at top — alternates primary / secondary so the
                  client's 2nd brand color appears across the reviews grid */}
              <span
                className={`absolute top-0 left-0 h-0.5 w-16 ${i % 2 !== 0 ? "bg-secondary" : "bg-primary"}`}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between">
                <Quote
                  size={28}
                  strokeWidth={1.5}
                  className={i % 2 !== 0 ? "text-secondary" : "text-primary"}
                  fill="currentColor"
                  fillOpacity={0.25}
                />
                <StarRow rating={r.stars} size={16} tone="amber" surface="light" />
              </div>
              <p className="font-sans text-[14px] sm:text-[16px] md:text-[17px] text-black/85 leading-relaxed flex-1">
                &ldquo;{r.body}&rdquo;
              </p>
              <VoltageRule width="short" tone="amber" />
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-black uppercase tracking-normal text-xl sm:text-2xl">
                  {r.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-black/45">
                  {r.date}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
