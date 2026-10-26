"use client";

/**
 * ServiceAreas — "Areas we service" coverage list.
 *
 * LIGHT surface to match the template's content sections (Reviews + Services
 * both bg-white). 30 generic "City, State" placeholders the business owner
 * replaces with the cities / towns / zones they actually serve. The
 * primary-tinted "(e.g.)" note makes clear these are examples, not promises.
 *
 * Heading mirrors the other section <h2>s: font-display, tracking-tight,
 * font-bold (NOT uppercase), with a primary-colored accent clause.
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
    <section id="areas" className="relative bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={reveal} className="max-w-2xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Service area</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
            Areas we <span className="text-primary">service.</span>
          </h2>
          <p className="mt-4 flex items-start gap-2 border border-primary/30 bg-primary/[0.07] px-3.5 py-2.5 font-sans text-[13px] leading-relaxed text-black/70">
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
                <span className="text-black/45">, {a.state}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
