/**
 * lib/animations.ts — BAY 04 / GARAGE FLOOR
 *
 * Mechanical/snappy motion presets. No bounces, no organic curves —
 * everything snaps into place like a workshop tool clicking shut.
 *
 * Timing convention:
 *   - Section entrances: 0.5s easeOut
 *   - Stagger between siblings: 0.06–0.10s
 *   - Hover lifts: 0.2s (snappy)
 *
 * All variants assume the consuming component uses:
 *   <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
 *     ...
 *   </motion.div>
 */

import type { Variants } from "framer-motion";

// ---- Easing ----
// Tuple cast — framer-motion v11 typing for `ease` (cubic-bezier 4-tuple) is
// inferred from the literal but `Transition["ease"]` was too narrow in some
// versions. Using a concrete tuple type avoids the build error.
export const EASE_OUT_SNAP = [0.22, 1, 0.36, 1] as [number, number, number, number];
export const EASE_OUT_MECH = [0.4, 0, 0.2, 1] as [number, number, number, number];

// ---- Viewport defaults (scroll-trigger entrance) ----
export const VP_ONCE = { once: true, margin: "-80px" } as const;
export const VP_REPEAT = { once: false, margin: "-80px" } as const;

// ---- Section entrance (fade + 20px slide-up) ----
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_SNAP },
  },
};

// Slower / deeper variant for hero sections
export const fadeUpDeep: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_SNAP },
  },
};

// Slide-in from left (used for split-layout text columns)
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_OUT_SNAP },
  },
};

// Slide-in from right (used for split-layout image columns)
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_OUT_SNAP },
  },
};

// Scale-in for badges/CTA orbs/stamp-like elements
export const stampIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_OUT_SNAP },
  },
};

// ---- Stagger container (for lists: services, reviews, why-tiles, gallery) ----
export const staggerContainer = (childDelay = 0.08, initialDelay = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: childDelay,
      delayChildren: initialDelay,
    },
  },
});

// Stagger child (use INSIDE staggerContainer parents)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_OUT_SNAP },
  },
};

// ---- Hazard tape sweep (left → right reveal, used as section divider entrance) ----
export const hazardSweep: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE_OUT_MECH },
  },
};

// ---- Bay-label drop-in (mono badges, work-order tags) ----
export const labelDrop: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_SNAP },
  },
};

// ---- Hover/tap micro-interactions (apply to motion buttons/cards) ----
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.15, ease: EASE_OUT_MECH } },
  whileTap: { scale: 0.98, y: 0, transition: { duration: 0.1 } },
};

export const hoverCardLift = {
  whileHover: {
    y: -4,
    transition: { duration: 0.2, ease: EASE_OUT_MECH },
  },
};

// ---- Kinetic word reveal (hero headline — words appear one-by-one) ----
export const kineticContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const kineticWord: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_SNAP },
  },
};

// ---- Marquee speed override helper (TrustBar already CSS-marquees; we boost it) ----
export const MARQUEE_DURATION = 30; // seconds per loop

// ---- Count-up helper (manual hook — use in ratings, review counts, stats) ----
// Usage:
//   const count = useCountUp(targetValue, isInView)
import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, trigger: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = from + (to - from) * eased;
      setValue(Math.round(next * 10) / 10); // 1 decimal
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, trigger, durationMs]);

  return value;
}
