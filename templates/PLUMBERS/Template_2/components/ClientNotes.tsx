"use client";

import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { BrassMedallion } from "./ui/BrassMedallion";
import { PlateLine } from "./ui/PlateLine";
import { StarBrass } from "./ui/StarBrass";
import {
  fadeUp,
  hoverCardLift,
  hoverLift,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// ClientNotes (Reviews) — Google Business badge above + 2x2 grid of 4
// reviews. Each card: PlateLine top, primary StampSealLabel "REF: NOTE-01"
// in top-right, Quote icon as a small "stamp", review body in Work Sans
// (NOT italic), name + date in Space Mono caps.
const REVIEWS = [
  { body: "{{REVIEW_1}}", name: "{{REVIEW_1_NAME}}", stars: "{{REVIEW_1_STARS}}", date: "{{REVIEW_1_DATE}}" },
  { body: "{{REVIEW_2}}", name: "{{REVIEW_2_NAME}}", stars: "{{REVIEW_2_STARS}}", date: "{{REVIEW_2_DATE}}" },
  { body: "{{REVIEW_3}}", name: "{{REVIEW_3_NAME}}", stars: "{{REVIEW_3_STARS}}", date: "{{REVIEW_3_DATE}}" },
  { body: "{{REVIEW_4}}", name: "{{REVIEW_4_NAME}}", stars: "{{REVIEW_4_STARS}}", date: "{{REVIEW_4_DATE}}" },
];

export function ClientNotes() {
  return (
    <section id="reviews" className="relative bg-surface-tint py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-primary">
            <BrassMedallion size={9} />
            Client notes
          </p>
          <h2 className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-slate-900">
            What homeowners filed after the job.
          </h2>
        </motion.div>

        {/* Google Business badge */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
          className="mt-9 sm:mt-12 flex justify-center"
        >
          <div className="relative bg-white border border-slate-200 px-4 sm:px-6 py-4 sm:py-5 max-w-2xl w-full">
            <PlateLine tone="primary" className="absolute top-0 left-0 right-0" />
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <span className="inline-flex shrink-0">
                <img
                  src="{{GOOGLE_LOGO_URL}}"
                  alt="Google"
                  className="h-6 w-auto max-w-[110px] sm:h-7 sm:max-w-none object-contain select-none"
                  draggable={false}
                />
              </span>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold text-slate-900">
                    {"{{GOOGLE_RATING}}"}/5
                  </span>
                  <StarBrass digit="5" size={14} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
                </p>
              </div>
              <motion.a
                href="{{GOOGLE_REVIEW_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                {...hoverLift}
                className="inline-flex items-center justify-center bg-primary px-5 py-3 sm:px-4 sm:py-2.5 font-mono text-[13px] sm:text-[11px] uppercase tracking-widest text-primary-text hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Leave a note
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* 2x2 grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="mt-9 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {REVIEWS.map((r, i) => (
            <motion.article
              key={i}
              variants={staggerItem}
              {...hoverCardLift}
              className="relative bg-white border border-slate-200 p-4 sm:p-6 md:p-8"
            >
              <span className={`sm:absolute sm:top-3 sm:right-3 mb-3 sm:mb-0 inline-block font-mono text-[10px] uppercase tracking-widest ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                REVIEW: {i + 1}
              </span>

              <div className="pt-1 sm:pt-4 flex items-center gap-3">
                <Quote
                  size={22}
                  strokeWidth={1.5}
                  className={i % 2 !== 0 ? "text-secondary" : "text-primary"}
                  aria-hidden="true"
                />
                <StarBrass digit={r.stars} size={14} />
              </div>
              <p className="mt-4 sm:mt-5 font-sans text-[14px] sm:text-base leading-relaxed text-slate-900">
                &ldquo;{r.body}&rdquo;
              </p>
              <div className="mt-5 sm:mt-7 pt-3 sm:pt-4 border-t border-slate-200 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-slate-900">{r.name}</span>
                <span className="text-slate-500">{r.date}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
