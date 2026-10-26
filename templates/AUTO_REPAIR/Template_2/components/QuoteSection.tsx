"use client";

import { Check, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import PaperCard from "@/components/ui/PaperCard";
import QuoteForm from "@/components/forms/QuoteForm";
import {
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// QuoteSection. 2-col on desktop. Left column carries copy + an explicit
// photo card showing the shop. Right column is the form in a paper card.
export default function QuoteSection() {
  return (
    <section id="quote" className="relative isolate overflow-hidden bg-black/5 py-10 sm:py-14 md:py-20 lg:py-24">
      {/* Soft section watermark. Reuses {{SERVICES_IMAGE}} so the workshop
          appears behind even on cream surfaces. Heavy stone-soft tint on top. */}
      <div className="absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="{{SERVICES_IMAGE}}"
          alt=""
          className="h-full w-full object-cover opacity-[0.08]"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(235,229,216,0.55)" }}
        />
      </div>

      <div className="container-tight relative z-10">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
          >
            <SectionLabel>Get a quote</SectionLabel>
            <SignTitle as="h2" size="xl" className="mt-4">
              Tell us about your car. We will tell you the truth.
            </SignTitle>
            <p className="mt-4 sm:mt-5 max-w-md font-sans text-[14px] sm:text-base text-black/60">
              Send a quick note and we will get back to you within one
              business day with a real estimate, written down, with no
              pressure to book.
            </p>

            {/* Photo card. Reuses {{GALLERY_2}} cropped wide. Acts as the
                visual anchor for the copy column — an action shot from the
                gallery so the form column does not feel disconnected. */}
            <div className="mt-6 sm:mt-8 relative aspect-[16/9] max-h-[220px] sm:max-h-none overflow-hidden bg-black/10 shadow-paper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="{{GALLERY_2}}"
                alt="Workshop in action"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 hidden md:inline-flex items-center gap-2 bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                <Wrench size={12} strokeWidth={2} className="text-primary" />
                <span className="small-caps text-[10px] text-black/60">
                  Diagnostic floor · {"{{CITY}}"}
                </span>
              </div>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.07, 0.25)}
              className="mt-6 sm:mt-8 flex flex-col gap-3 sm:gap-4"
            >
              {[
                "Free written estimates on all jobs.",
                "Photos and notes from our diagnostic.",
                "Prices broken out by part and labor.",
                "No work without your green light.",
              ].map((line, i) => (
                <motion.li
                  key={i}
                  variants={staggerItem}
                  className="flex items-start gap-3 font-sans text-sm text-black"
                >
                  <Check
                    size={18}
                    strokeWidth={2}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  {line}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
          >
            <PaperCard className="p-4 sm:p-6 md:p-8" elevation="lift">
              <QuoteForm />
            </PaperCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
