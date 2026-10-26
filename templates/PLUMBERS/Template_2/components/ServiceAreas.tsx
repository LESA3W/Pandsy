"use client";

/**
 * ServiceAreas — "Areas we service". Light surface (bg-surface-tint) to match
 * the ClientNotes band it sits beside. 30 generic "City, State" placeholders the
 * business owner swaps for the cities / towns / zones they actually cover.
 * Heading matches the centered serif font-display + font-semibold tracking-tight
 * house style used by ClientNotes.
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

export function ServiceAreas() {
  return (
    <section id="areas" className="relative bg-surface-tint py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={reveal} className="max-w-2xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-primary">Service area</span>
          <h2 className="mt-5 sm:mt-7 font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-slate-900">Areas we service</h2>
          <p className="mt-5 sm:mt-6 inline-flex items-start gap-2 border border-primary/30 bg-primary/[0.06] px-3.5 py-2.5 text-left font-sans text-[13px] leading-relaxed text-slate-600">
            <span className="font-semibold text-primary">(e.g.)</span>
            <span>Example areas only. List any cities, towns or zones you actually serve here. You choose the coverage.</span>
          </p>
        </motion.div>
        <ul className="mt-9 sm:mt-12 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 sm:gap-y-4 lg:grid-cols-5">
          {AREAS.map((a, i) => (
            <li key={i} className="flex items-start gap-2">
              <MapPin size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-sans text-sm leading-tight">
                <span className="font-medium text-slate-900">{a.city}</span>
                <span className="text-slate-500">, {a.state}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
