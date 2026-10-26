"use client";

/**
 * ServiceAreas — "Areas we service". Light surface (bg-white) to match the
 * Testimonials band it sits beside. 30 generic "City, State" placeholders the
 * business owner swaps for the cities / towns / zones they actually cover.
 * Heading matches the heavy font-display font-black + tracking-tight-display
 * house style.
 */
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

// 30 example service areas — generic "City, State" placeholders. The business
// owner replaces these with the cities / towns / zones they actually serve.
const AREAS = Array.from({ length: 30 }, () => ({ city: "City", state: "State" }));

const reveal = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServiceAreas() {
  return (
    <section id="areas" className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={reveal} className="max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary">Service area</span>
          <h2 className="mt-3 sm:mt-4 font-display text-3xl font-black leading-[1.05] tracking-tight-display text-black sm:text-4xl md:text-5xl">Areas we service</h2>
          <p className="mt-5 flex items-start gap-2 rounded-2xl border border-primary/30 bg-primary/[0.06] px-3.5 py-2.5 font-sans text-[13px] leading-relaxed text-black/70">
            <span className="font-semibold text-primary">(e.g.)</span>
            <span>Example areas only. List any cities, towns or zones you actually serve here. You choose the coverage.</span>
          </p>
        </motion.div>
        <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 sm:mt-10 sm:grid-cols-3 sm:gap-y-4 lg:grid-cols-5">
          {AREAS.map((a, i) => (
            <li key={i} className="flex items-start gap-2">
              <MapPin size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-sans text-sm leading-tight">
                <span className="font-medium text-black">{a.city}</span>
                <span className="text-black/50">, {a.state}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
