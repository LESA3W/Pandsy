"use client";

import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import AmbientCard from "@/components/ui/AmbientCard";
import HaloRule from "@/components/ui/HaloRule";
import { StarRow } from "@/components/ui/NightStar";
import SodiumButton from "@/components/ui/SodiumButton";
import {
  fadeUp,
  hoverCardLift,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * Reviews — Google Business badge above + 2x2 grid of 4 review cards.
 *
 * Per claude.md hard rule #5:
 *  - 2x2 grid on desktop (md:grid-cols-2), 1-col on mobile
 *  - Each card: stars (digit -> filled), body in quotes, name + date
 *  - Above the grid: Google badge with native <img>, rating, count, and
 *    a "Leave a review" button -> {{GOOGLE_REVIEW_URL}}
 */

type Review = {
  body: string;
  name: string;
  stars: string;
  date: string;
};

const REVIEWS: Review[] = [
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

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="bg-black py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="Customer reviews"
    >
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <NightTag>What people say after</NightTag>
          <NightTitle as="h2" size="lg" className="mt-5 text-balance">
            The work speaks. Then the customers speak.
          </NightTitle>
        </motion.div>

        {/* Google Business badge */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
          className="mt-8 sm:mt-12"
        >
          <AmbientCard className="flex flex-col items-start gap-4 p-4 sm:gap-5 sm:p-6 md:flex-row md:items-center md:justify-between md:p-7">
            <div className="flex items-center gap-5">
              {/* Native <img> — Google logo, keeps native colors */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="{{GOOGLE_LOGO_URL}}"
                alt="Google"
                className="h-9 w-auto md:h-10"
                draggable={false}
              />
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl font-bold text-white/90 sm:text-2xl md:text-3xl">
                    {"{{GOOGLE_RATING}}"}
                    <span className="text-white/60">/5</span>
                  </span>
                  <StarRow count={5} size={18} />
                </div>
                <p className="mt-1 small-caps text-[11px] text-white/60">
                  Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
                </p>
              </div>
            </div>
            <SodiumButton
              href="{{GOOGLE_REVIEW_URL}}"
              size="md"
              className="shrink-0"
            >
              Leave a review
            </SodiumButton>
          </AmbientCard>
        </motion.div>

        {/* 2x2 grid (desktop) / 1-col (mobile) */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-2 md:gap-6"
        >
          {REVIEWS.map((r, i) => (
            <motion.li key={i} variants={staggerItem} {...hoverCardLift}>
              <AmbientCard className="flex h-full flex-col p-4 sm:p-6 md:p-8">
                <StarRow count={r.stars} size={16} tone="accent" />
                <blockquote className="mt-4 flex-1 font-sans text-[15px] leading-relaxed text-white/90 sm:text-base">
                  &ldquo;{r.body}&rdquo;
                </blockquote>
                {/* Accent rule alternates so both brand colors appear in the grid */}
                <HaloRule className="my-5" align={i % 2 !== 0 ? "accent-left" : "left"} />
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-white/90">
                    {r.name}
                  </span>
                  <span className={`font-mono text-[11px] ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                    {r.date}
                  </span>
                </div>
              </AmbientCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
