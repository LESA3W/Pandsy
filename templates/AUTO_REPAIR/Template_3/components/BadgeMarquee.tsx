"use client";

/**
 * BadgeMarquee — full-width strip under the hero, scrolls left, showing
 * category certifications + serviced car brands. Slows on hover and resumes
 * from its current position (Web Animations API playbackRate). Border = main
 * color (border-primary), background = black. Static generic assets in
 * /public/badges/ (per-category, not placeholders).
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BADGES = ["aaa_badge", "ase_badge", "auto-repair_bbb_badge"];
const CARS = [
  "audi", "bmw", "chevrolet", "dodge", "ford", "honda", "hyundai",
  "jeep", "kia", "mercedes", "mini-cooper", "nissan", "porsche", "toyota",
];

// aaa, car, ase, car, bbb, car, ... (one badge then one car)
const SEQUENCE = CARS.flatMap((car, i) => [BADGES[i % BADGES.length], `${car}_logo`]);

// Logos wider than 250px native render at h-100; square 250px ones at h-140.
const WIDE = new Set([
  "aaa_badge", "auto-repair_bbb_badge",
  "audi_logo", "chevrolet_logo", "ford_logo", "honda_logo", "hyundai_logo",
  "jeep_logo", "kia_logo", "mini-cooper_logo", "nissan_logo", "toyota_logo",
]);

function label(name: string): string {
  if (name.endsWith("_badge")) {
    const tag = name.replace(/_badge$/, "").replace(/^auto-repair_/, "");
    return `${tag.toUpperCase()} certified`;
  }
  return name.replace(/_logo$/, "").replace(/-/g, " ");
}

export function BadgeMarquee() {
  const loop = [...SEQUENCE, ...SEQUENCE];
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = el.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
      { duration: 60000, iterations: Infinity, easing: "linear" },
    );
    animRef.current = anim;
    return () => anim.cancel();
  }, []);

  const setRate = (rate: number) => {
    if (animRef.current) animRef.current.playbackRate = rate;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Certifications and serviced brands"
      onMouseEnter={() => setRate(0.35)}
      onMouseLeave={() => setRate(1)}
      className="relative overflow-hidden border-y border-primary bg-black py-2.5 sm:py-4"
    >
      <div className="[mask-image:linear-gradient(to_right,transparent_0,black_6%,black_94%,transparent_100%)]">
        <div ref={trackRef} className="flex w-max items-center">
          {loop.map((name, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${name}-${i}`}
              src={`/badges/${name}.webp`}
              alt={label(name)}
              className={`mx-[18px] sm:mx-[29.5px] w-auto shrink-0 object-contain ${WIDE.has(name) ? "h-[51px] sm:h-[85px]" : "h-[71px] sm:h-[119px]"}`}
              loading="lazy"
              draggable={false}
              aria-hidden={i >= SEQUENCE.length ? true : undefined}
            />
          ))}
        </div>
      </div>

      <p className="pointer-events-none absolute inset-x-0 bottom-1.5 z-10 translate-y-[5px] px-4 text-center font-mono text-[10px] italic uppercase tracking-widest text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.9)] sm:text-[11px]">
        Feature any certifications &amp; brands you want here
      </p>
    </motion.section>
  );
}
