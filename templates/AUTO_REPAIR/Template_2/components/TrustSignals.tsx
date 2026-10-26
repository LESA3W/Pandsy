"use client";

import {
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  Receipt,
  Clock,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, VP_ONCE } from "@/lib/animations";

// Static row of typographic trust pills with mechanical micro-icons.
// Universal items only. No claims about business size or structure.
// Order tuned for the 3-column desktop grid so "12-Month Warranty" sits in the
// MIDDLE column of row 1 and "Local to {{CITY}}" sits in the MIDDLE column of
// row 2 — directly below it.
//   Row 1:  ASE-Certified  |  12-Month Warranty  |  Licensed & Insured
//   Row 2:  Honest Pricing |  Local to {{CITY}}  |  Same-Day Service
const SIGNALS: Array<{ label: string; Icon: LucideIcon }> = [
  { label: "ASE-Certified", Icon: BadgeCheck },
  { label: "12-Month Warranty", Icon: ClipboardCheck },
  { label: "Licensed & Insured", Icon: ShieldCheck },
  { label: "Honest Pricing", Icon: Receipt },
  { label: "Local to {{CITY}}", Icon: MapPin },
  { label: "Same-Day Service", Icon: Clock },
];

export default function TrustSignals() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={VP_ONCE}
      variants={fadeUp}
      className="border-y border-black/15 bg-black/5"
    >
      <div className="container-tight py-5">
        <ul
          className="grid grid-cols-2 gap-x-3 gap-y-2.5 sm:grid-cols-3 sm:justify-items-center sm:gap-x-6 sm:gap-y-3"
          aria-label="Trust signals"
        >
          {SIGNALS.map(({ label, Icon }, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-2 text-black/60"
            >
              <Icon
                size={14}
                strokeWidth={1.75}
                className={i % 2 === 0 ? "shrink-0 text-primary" : "shrink-0 text-secondary"}
                aria-hidden
              />
              <span className="small-caps text-[11px] md:text-[12px]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
