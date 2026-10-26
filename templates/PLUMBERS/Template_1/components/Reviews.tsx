"use client";

/**
 * Reviews — 2x2 grid + Google Business badge above (claude.md rule #5).
 * 4 review placeholders: REVIEW_1..REVIEW_4 + their _NAME / _STARS / _DATE.
 */
import { motion } from "framer-motion";
import { StarRow } from "./ui/StarRow";
import { CopperRule } from "./ui/CopperRule";
import { DropSeal } from "./ui/DropSeal";
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
    <section id="reviews" className="relative bg-surface-tint py-7 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl mb-7 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
            <DropSeal size={12} tone="primary" />
            <span>What homeowners say</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tighter">
            Real Google reviews
            <br />
            <span className="text-primary">from real customers.</span>
          </h2>
        </motion.div>

        {/* Google Business badge */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
          className="bg-white border border-slate-200 p-4 sm:p-7 mb-7 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5"
        >
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Google logo — native colors preserved per claude.md rule #5 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{GOOGLE_LOGO_URL}}"
              alt="Google"
              width={36}
              height={36}
              className="block h-9 w-9 sm:h-11 sm:w-11 object-contain flex-shrink-0"
              style={{ filter: "none" }}
            />
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <span className="font-display text-2xl sm:text-3xl text-slate-900 leading-none">
                  {"{{GOOGLE_RATING}}"}
                  <span className="text-slate-500">/5</span>
                </span>
                <StarRow rating="5" size={14} />
              </div>
              <p className="font-sans text-[12px] sm:text-[14px] text-slate-600">
                Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
              </p>
            </div>
          </div>
          <motion.a
            href="{{GOOGLE_REVIEW_URL}}"
            target="_blank"
            rel="noopener noreferrer"
            {...hoverLift}
            className="inline-flex items-center gap-2 bg-primary hover:opacity-90 text-primary-text px-4 py-2.5 sm:px-5 sm:py-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-widest transition-opacity whitespace-nowrap"
          >
            Leave a review
            <ArrowUpRight size={14} strokeWidth={2} />
          </motion.a>
        </motion.div>

        {/* 2x2 grid of reviews */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200"
        >
          {REVIEWS.map((r, i) => (
            <motion.article
              key={i}
              variants={staggerItem}
              {...hoverCardLift}
              className="bg-white border border-slate-200 p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4"
            >
              <div className="flex items-start justify-between">
                <Quote
                  size={22}
                  strokeWidth={1.5}
                  className={`${i % 2 !== 0 ? "text-secondary" : "text-primary"} sm:[&]:[width:28px] sm:[&]:[height:28px]`}
                  fill="currentColor"
                  fillOpacity={0.15}
                />
                <StarRow rating={r.stars} size={14} />
              </div>
              <p className="font-display italic text-[15px] sm:text-[20px] text-slate-900 leading-relaxed flex-1">
                &ldquo;{r.body}&rdquo;
              </p>
              <CopperRule width="short" />
              <div className="flex items-baseline justify-between gap-3">
                <p className={`font-sans font-semibold text-base sm:text-lg ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                  {r.name}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
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
