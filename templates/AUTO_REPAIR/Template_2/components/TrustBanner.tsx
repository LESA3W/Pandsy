"use client";

/**
 * TrustBanner — full-width Google social-proof strip inside the header.
 * Per-star proportional fill + stacked customer avatars. Stars gold (#fbbf24).
 * Count: floor(reviews/10)*10, +50 floor, from {{GOOGLE_REVIEW_COUNT}}.
 */
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function RatingStars({ rating, size = 16 }: { rating: number; size?: number }) {
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
      variants={reveal}
      className="w-full border-y border-primary bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-center gap-1.5 px-3 py-2 sm:gap-3 sm:px-6 sm:py-2.5 md:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="{{GOOGLE_LOGO_URL}}" alt="Google" width={24} height={24} className="h-5 w-5 shrink-0 object-contain sm:h-7 sm:w-7" style={{ filter: "none" }} />
        <RatingStars rating={rating} size={16} />
        <span className="shrink-0 font-display text-xs leading-none text-slate-900 sm:text-base">{rating.toFixed(1)}</span>
        <span aria-hidden="true" className="hidden h-3.5 w-px bg-slate-300 sm:block" />
        <span className="shrink-0 whitespace-nowrap font-display text-xs leading-none tracking-wide text-slate-700 sm:text-base">Trusted by +{socialProof} locals</span>
        <AvatarStack border="border border-slate-300 sm:border-2" />
      </div>
    </motion.div>
  );
}
