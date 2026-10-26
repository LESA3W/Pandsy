"use client";

/**
 * TrustBanner — full-width Google social-proof strip, flush under the fixed
 * header, spanning the hero. Proportional star fill (e.g. 4.7 → 4 full + 70%
 * of the 5th) via a per-star empty/full overlay clipped to the decimal width.
 *
 * Count rule: floor(reviews / 10) * 10 with a +50 floor, from the existing
 * {{GOOGLE_REVIEW_COUNT}} placeholder. Stars gold (#fbbf24) regardless of theme.
 */
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { labelDrop } from "@/lib/animations";

function RatingStars({ rating, size = 16 }: { rating: number; size?: number }) {
  // Per-star fill: floor(rating) full stars, the next filled to the decimal
  // remainder (e.g. 4.7 -> 4 full + 5th at 70%), the rest empty outlines.
  const fullStars = Math.floor(rating);
  const partialFill = (rating - fullStars) * 100;
  const Empty = () => <Star size={size} strokeWidth={1.5} className="text-[#fbbf24]" />;
  const Full = () => <Star size={size} strokeWidth={1.5} className="fill-[#fbbf24] text-[#fbbf24]" />;
  return (
    <span className="inline-flex shrink-0 items-center" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        if (i < fullStars) return <Full key={i} />;
        if (i === fullStars && partialFill > 0) {
          return (
            <span key={i} className="relative inline-flex">
              <Empty />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${partialFill}%` }}>
                <Full />
              </span>
            </span>
          );
        }
        return <Empty key={i} />;
      })}
    </span>
  );
}

const AVATARS = ["pp1", "pp2", "pp3", "pp4", "pp5"];

function AvatarStack({ border }: { border: string }) {
  return (
    <span className="-ml-[2px] flex shrink-0 items-center -space-x-2 sm:-ml-px sm:-space-x-2.5">
      {AVATARS.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p}
          src={`/avatars/${p}.jpg`}
          alt=""
          width={32}
          height={32}
          draggable={false}
          style={{ zIndex: AVATARS.length - i }}
          className={`relative h-[17px] w-[17px] rounded-full object-cover sm:h-[27px] sm:w-[27px] ${border}`}
        />
      ))}
    </span>
  );
}

export function TrustBanner() {
  const rating = parseFloat("{{GOOGLE_RATING}}") || 5;
  const reviewCount = parseInt("{{GOOGLE_REVIEW_COUNT}}", 10) || 0;
  const socialProof = Math.max(50, Math.floor(reviewCount / 10) * 10);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={labelDrop}
      className="w-full border-y border-primary"
    >
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-center gap-1.5 px-3 py-2 sm:gap-3 sm:px-6 sm:py-2.5 md:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="{{GOOGLE_LOGO_URL}}"
          alt="Google"
          width={24}
          height={24}
          className="h-5 w-5 shrink-0 object-contain sm:h-7 sm:w-7"
          style={{ filter: "none" }}
        />
        <RatingStars rating={rating} size={16} />
        <span className="shrink-0 font-display text-xs leading-none text-white sm:text-base">
          {rating.toFixed(1)}
        </span>
        <span aria-hidden="true" className="hidden h-3.5 w-px bg-white/25 sm:block" />
        <span className="shrink-0 whitespace-nowrap font-display text-xs leading-none tracking-wide text-white/90 sm:text-base">
          Trusted by +{socialProof} locals
        </span>
        <AvatarStack border="border border-zinc-300 sm:border-2" />
      </div>
    </motion.div>
  );
}
