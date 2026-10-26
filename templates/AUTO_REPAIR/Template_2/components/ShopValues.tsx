"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import {
  fadeUp,
  hoverCardLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const VALUES = [
  {
    roman: "i",
    title: "We diagnose before we quote.",
    body: "No charge for a proper look. You see what we see, then you decide.",
  },
  {
    roman: "ii",
    title: "We use OEM or premium parts.",
    body: "Cheap parts cost more in the long run. You get parts that last.",
  },
  {
    roman: "iii",
    title: "We back every repair.",
    body: "Twelve-month, twelve-thousand-mile warranty on every job, in writing.",
  },
  {
    roman: "iv",
    title: "We finish when we say we will.",
    body: "Same-day service on most jobs. If it slips, you hear it from us first.",
  },
];

// ShopValues. Four typographic value tiles on a stone-divided grid.
// Numbered subtly with small Roman numerals in clay italic.
export default function ShopValues() {
  return (
    <section className="bg-white py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <SectionLabel>Why people stay</SectionLabel>
          <SignTitle as="h2" size="xl" className="mt-4">
            Four things we will not compromise on.
          </SignTitle>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={staggerContainer(0.1, 0.15)}
          className="mt-6 sm:mt-10 grid gap-px bg-black/10 grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map(({ roman, title, body }, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              {...hoverCardLift}
              className="flex flex-col gap-2 sm:gap-3 bg-white p-4 transition-colors hover:bg-black/5 sm:p-6 md:p-8"
            >
              <span className={`font-display text-xl sm:text-2xl font-normal italic ${i % 2 === 0 ? "text-primary" : "text-secondary"}`}>
                {roman}.
              </span>
              <p className="font-display text-base sm:text-xl font-semibold leading-tight text-black">
                {title}
              </p>
              <p className="font-sans text-[13px] sm:text-sm text-black/60">{body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
