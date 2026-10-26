"use client";

import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import PaperCard from "@/components/ui/PaperCard";
import { cn } from "@/lib/cn";
import {
  fadeUp,
  hoverCardLift,
  hoverLift,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Reviews. 2x2 grid. Google badge above with a "Leave a review" button.
// Stars rendered from each REVIEW star-count digit (1 through 5).

function StarRow({
  count,
  total = 5,
  size = 14,
  colorScheme = "clay",
}: {
  count: number;
  total?: number;
  size?: number;
  colorScheme?: "clay" | "secondary";
}) {
  const filledCls =
    colorScheme === "secondary"
      ? "fill-[#fbbf24] text-[#fbbf24]"
      : "fill-[#fbbf24] text-[#fbbf24]";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of ${total} stars`}>
      {Array.from({ length: total }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={cn(
            i < count ? filledCls : "fill-transparent text-black/30",
          )}
        />
      ))}
    </div>
  );
}

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

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative isolate overflow-hidden bg-white py-10 sm:py-14 md:py-20 lg:py-24"
    >
      {/* Faded watermark photo. Anchors the section in the workshop universe
          without competing with the review cards on top. Uses {{CTA}} so the
          full image rotation across the page stays balanced. */}
      <div className="absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="{{CTA}}"
          alt=""
          className="h-full w-full object-cover opacity-[0.10]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(250,246,239,0.55)" }}
        />
      </div>

      <div className="container-tight relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <SectionLabel>Voices</SectionLabel>
            <SignTitle as="h2" size="xl" className="mt-4 max-w-2xl" data-slot="REVIEWS_HEADLINE">
              What customers in {"{{CITY}}"} say.
            </SignTitle>
          </div>
        </motion.div>

        {/* Google Business badge */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={stampIn}
        >
          <PaperCard className="mt-6 sm:mt-10 px-4 py-4 sm:px-5 sm:py-5 md:px-8 md:py-6" elevation="soft">
            <div className="flex flex-col items-start gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Native <img> . Drive blocks next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="{{GOOGLE_LOGO_URL}}"
                  alt="Google"
                  className="h-6 sm:h-7 w-auto"
                />
                <div>
                  <div className="flex items-baseline gap-2">
                    {/* tabular-nums + lining-nums forces Zilla Slab to use
                        uniform-baseline lining figures instead of its default
                        oldstyle figures (which were making the "6" in 4.6/5
                        sit raised relative to the 4 and 5). */}
                    <span className="font-display text-xl sm:text-2xl font-bold text-black tabular-nums [font-variant-numeric:lining-nums_tabular-nums]">
                      {"{{GOOGLE_RATING}}"}
                      <span className="align-baseline">/5</span>
                    </span>
                    <StarRow count={5} size={16} colorScheme="secondary" />
                  </div>
                  <p className="mt-0.5 font-sans text-xs text-black/60">
                    Based on {"{{GOOGLE_REVIEW_COUNT}}"} Google reviews
                  </p>
                </div>
              </div>

              <motion.a
                href="{{GOOGLE_REVIEW_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                {...hoverLift}
                className={cn(
                  "inline-flex min-h-[44px] items-center gap-2 bg-primary px-5 py-3.5 sm:min-h-0 sm:py-3",
                  "font-display text-xs font-semibold uppercase tracking-wider text-white",
                  "transition-colors hover:bg-primary/80",
                )}
              >
                Leave a review
                <ExternalLink size={14} />
              </motion.a>
            </div>
          </PaperCard>
        </motion.div>

        {/* 2x2 review grid */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.1)}
          className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6"
        >
          {REVIEWS.map((r, i) => {
            const count = Number.parseInt(r.stars, 10) || 5;
            return (
              <motion.li key={i} variants={staggerItem} {...hoverCardLift}>
                <PaperCard className="flex h-full flex-col p-4 sm:p-6 md:p-7">
                  <StarRow count={count} />
                  <blockquote className="mt-3 sm:mt-4 flex-1 font-display text-[15px] sm:text-lg font-medium leading-snug text-black">
                    &ldquo;{r.body}&rdquo;
                  </blockquote>
                  <footer className="mt-4 sm:mt-5 flex items-center justify-between border-t border-black/15 pt-3 sm:pt-4">
                    <span className="font-sans text-sm font-medium text-black">
                      {r.name}
                    </span>
                    <span className={cn("font-sans text-xs", i % 2 !== 0 ? "text-secondary" : "text-primary")}>
                      {r.date}
                    </span>
                  </footer>
                </PaperCard>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
