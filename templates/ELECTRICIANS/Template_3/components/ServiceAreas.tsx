"use client";

/**
 * ServiceAreas — HOT WIRE / LIVE EDITORIAL — "Areas we service" coverage list.
 *
 * LIGHT surface to match the template's content sections (Reviews + Services
 * both bg-white). 30 generic "City, State" placeholders the business owner
 * replaces with the cities / towns / zones they actually serve. The
 * primary-tinted "(e.g.)" note makes clear these are examples, not promises.
 *
 * Heading mirrors the other section <h2>s: font-display, tracking-tighter,
 * font-bold with an italic primary accent clause, fronted by a StampMark and
 * underlined by a CopperRule (the template's signature atoms).
 */
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { StampMark } from "@/components/ui/StampMark";
import { CopperRule } from "@/components/ui/CopperRule";

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
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={reveal} className="flex max-w-2xl flex-col items-start gap-4 sm:gap-5">
          <StampMark label="Coverage" meta="Where we work" rotate={-2} />
          <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tighter text-black sm:text-4xl md:text-5xl">
            Areas we service<span className="italic text-primary">, on the map.</span>
          </h2>
          <p className="flex items-start gap-2 border border-primary/30 bg-primary/[0.07] px-3.5 py-2.5 font-sans text-[13px] leading-relaxed text-black/70">
            <span className="font-semibold text-primary">(e.g.)</span>
            <span>Example areas only. List any cities, towns or zones you actually serve here. You choose the coverage.</span>
          </p>
          <CopperRule className="max-w-sm" />
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
