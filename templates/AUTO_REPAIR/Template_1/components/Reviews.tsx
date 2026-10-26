"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { BayLabel } from "@/components/ui/BayLabel";
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
    report: "REPORT #4471",
  },
  {
    body: "{{REVIEW_2}}",
    name: "{{REVIEW_2_NAME}}",
    stars: "{{REVIEW_2_STARS}}",
    date: "{{REVIEW_2_DATE}}",
    report: "REPORT #4488",
  },
  {
    body: "{{REVIEW_3}}",
    name: "{{REVIEW_3_NAME}}",
    stars: "{{REVIEW_3_STARS}}",
    date: "{{REVIEW_3_DATE}}",
    report: "REPORT #4502",
  },
  {
    body: "{{REVIEW_4}}",
    name: "{{REVIEW_4_NAME}}",
    stars: "{{REVIEW_4_STARS}}",
    date: "{{REVIEW_4_DATE}}",
    report: "REPORT #4517",
  },
];

function StarRow({ stars }: { stars: string }) {
  const n = (() => {
    const parsed = parseInt(stars, 10);
    return Number.isFinite(parsed) && parsed >= 1 && parsed <= 5 ? parsed : 5;
  })();
  return (
    <div className="flex" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < n ? "fill-[#fbbf24] text-[#fbbf24]" : "text-white/20"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-black py-7 sm:py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <BayLabel n="08" title="WHAT CUSTOMERS SAY" meta="VERIFIED · GOOGLE-BACKED" hideOnMobile />
            <h2 className="mt-5 max-w-3xl font-display text-3xl uppercase leading-none tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              Trusted by drivers in {"{{CITY}}"}.
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60">
            <div className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={16} className="fill-[#fbbf24] text-[#fbbf24]" />
              ))}
            </div>
            <span>{"{{GOOGLE_RATING}}"} · {"{{GOOGLE_REVIEW_COUNT}}"}+ reviews</span>
          </div>
        </motion.div>

        {/* Google Reviews badge — verified social proof */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
          className="mt-8 grid gap-px bg-black-border sm:mt-10 md:mt-12 md:grid-cols-[1fr_auto]"
        >
          <div className="flex flex-col items-start gap-3 bg-black/90 p-5 sm:gap-4 sm:p-6 md:flex-row md:items-center md:gap-8 md:p-8">
            <div className="flex shrink-0 items-center justify-center bg-white p-3">
              <img
                src={"{{GOOGLE_LOGO_URL}}"}
                alt="Google"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-2xl tracking-tight text-white sm:text-4xl md:text-5xl">
                  {"{{GOOGLE_RATING}}"}<span className="text-white/40">/5</span>
                </span>
                <div className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={18} className="fill-[#fbbf24] text-[#fbbf24]" />
                  ))}
                </div>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/60">
                Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
              </p>
            </div>
          </div>

          <motion.a
            href="{{GOOGLE_REVIEW_URL}}"
            target="_blank"
            rel="noopener noreferrer"
            {...hoverLift}
            aria-label="Leave a review on Google"
            className="group inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 font-display text-sm uppercase tracking-wider text-primary-text transition-colors hover:bg-white sm:px-6 sm:py-5 sm:text-lg md:w-auto md:px-8 md:py-6 md:text-2xl"
          >
            Leave a review
            <ArrowUpRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:[&]:size-5"
            />
          </motion.a>
        </motion.div>

        {/* 2x2 grid of 4 reviews */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="mt-8 grid grid-cols-1 gap-px bg-black-border sm:mt-10 md:mt-12 md:grid-cols-2"
        >
          {REVIEWS.map((r, i) => (
            <motion.li
              key={r.report}
              variants={staggerItem}
              {...hoverCardLift}
              className="flex flex-col bg-black/90 p-5 sm:p-6 md:p-7 lg:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-3 sm:pb-4">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${i % 2 !== 0 ? "text-secondary" : "text-primary"}`}>
                  {r.report}
                </span>
                <StarRow stars={r.stars} />
              </div>

              <blockquote
                data-slot={`REVIEW_${i + 1}_BODY`}
                className="mt-4 font-sans text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base"
              >
                &ldquo;{r.body}&rdquo;
              </blockquote>

              <div className="mt-auto pt-5 sm:pt-8">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-display text-xl uppercase tracking-normal text-white sm:text-2xl">
                    {r.name}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/55">
                    {r.date}
                  </div>
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/55">
                  {"{{CITY}}"}, {"{{STATE}}"} · CUSTOMER {String(i + 1).padStart(3, "0")}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
