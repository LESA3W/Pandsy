"use client";

import { motion } from "framer-motion";
import { fadeUp, VP_ONCE } from "@/lib/animations";

export function TrustBar() {
  // Universal trust signals — work for any auto-repair shop, any city.
  const items = [
    "ASE-Certified",
    "Licensed & Insured",
    "12-Month Warranty",
    "Honest Pricing",
    "Same-Day Service",
    "Local to {{CITY}}",
    "All Makes · All Models",
  ];
  // Duplicate so the marquee loops seamlessly
  const loop = [...items, ...items];

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="relative overflow-hidden border-y border-white/15 bg-black/90 py-5 [mask-image:linear-gradient(to_right,transparent_0,black_5%,black_95%,transparent_100%)]"
      aria-label="Trust signals"
    >
      <div className="flex animate-marquee whitespace-nowrap motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-8 inline-flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-white/70"
          >
            <span
              aria-hidden="true"
              className={`block h-1.5 w-1.5 rotate-45 ${i % 2 === 0 ? "bg-primary" : "bg-secondary"}`}
            />
            {item}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
