"use client";

import { Quote, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import PipeTick from "@/components/ui/PipeTick";
import MeterPanel from "@/components/ui/MeterPanel";
import StarAqua from "@/components/ui/StarAqua";
import {
  fadeUp,
  hoverCardLift,
  hoverLift,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Testimonials (Reviews) — Google Business badge above + 2x2 MeterPanel grid of 4 reviews.
// MeterPanel chosen (NOT pills) to anchor the trust register.
// Inter body NOT italic — T1 owns review-italic.

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

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-white py-10 sm:py-14 md:py-20 lg:py-24">
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
            What customers say
          </p>
          <h2 className="mt-3 font-display text-3xl font-black leading-[1.05] tracking-tight-display text-black sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
            We let the work speak.
          </h2>
        </motion.div>

        {/* Google Business badge — claude.md rule #5 */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
          className="mt-7 flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-4 shadow-lift-soft sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:p-5 md:p-6"
        >
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="{{GOOGLE_LOGO_URL}}"
              alt="Google"
              className="h-8 w-auto"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-black tracking-tight-display text-black">
                  {"{{GOOGLE_RATING}}"}
                </span>
                <span className="font-mono text-xs text-black/60">/5</span>
                <StarAqua rating="5" size={16} />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-black/60">
                Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
              </p>
            </div>
          </div>
          <motion.a
            href="{{GOOGLE_REVIEW_URL}}"
            target="_blank"
            rel="noopener noreferrer"
            {...hoverLift}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-mono text-[12px] uppercase tracking-widest text-primary-text shadow-lift-soft transition-all duration-150 ease-out hover:opacity-90 hover:shadow-lift sm:text-[11px]"
          >
            Leave a review
            <ExternalLink size={12} strokeWidth={2.4} />
          </motion.a>
        </motion.div>

        {/* 2x2 grid of reviews */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2"
        >
          {REVIEWS.map((r, i) => (
            <motion.li key={i} variants={staggerItem} {...hoverCardLift}>
              <MeterPanel tone="cloud" className="h-full p-4 sm:p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <StarAqua rating={r.stars} />
                  <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-black/10 ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                    <Quote size={16} strokeWidth={1.8} />
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-black">&ldquo;{r.body}&rdquo;</p>
                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4 font-mono text-[11px] uppercase tracking-widest">
                  <span className={i % 2 !== 0 ? "text-secondary" : "text-primary"}>{r.name}</span>
                  <span className="text-black/60">{r.date}</span>
                </div>
              </MeterPanel>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
