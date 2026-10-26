"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SignTitle from "@/components/ui/SignTitle";
import LocalBadge from "@/components/ui/LocalBadge";
import StatBlock from "@/components/ui/StatBlock";
import {
  fadeLeft,
  fadeRight,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// AboutStory. Story-driven 2-col block. Image left, narrative right.
// Copy is intentionally business-agnostic: works for a shop opened yesterday
// or one running for 50 years. No "decades", no "neighborhood institution",
// no "generations of trust". See claude.md forbidden-copy rules.
export default function AboutStory() {
  return (
    <section id="about" className="bg-black/5 py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="container-tight">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="relative"
          >
            <div className="relative aspect-[16/10] max-h-[220px] sm:max-h-none overflow-hidden bg-black/10 sm:aspect-[3/2] md:aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="{{ABOUT}}"
                alt="Inside the shop"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            {/* Discrete photo caption row, integrated below the image (no
                floating sticker overlay). Reads as image metadata, not as
                an editorial stamp. */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
              transition={{ delay: 0.4 }}
              className="mt-3 flex items-center justify-between border-t border-black/15 pt-3"
            >
              <span className="small-caps text-[10px] tracking-wider text-black/50">
                Inside the shop
              </span>
              <LocalBadge />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
            className="flex flex-col justify-center"
          >
            <SectionLabel>Our story</SectionLabel>
            <SignTitle
              as="h2"
              size="xl"
              className="mt-4"
              data-slot="ABOUT_HEADLINE"
            >
              A shop run by people who actually fix cars.
            </SignTitle>

            <div
              className="mt-4 sm:mt-6 flex flex-col gap-3 sm:gap-4 font-sans text-[14px] leading-relaxed sm:text-base text-black/60"
            >
              <p data-slot="ABOUT_PARAGRAPH_1">
                {"{{BUSINESS_NAME}}"} runs on one rule. Tell the customer the
                truth, and only do the work that needs doing. That rule shows
                up in every estimate, every diagnostic, every repair we hand
                back.
              </p>
              <p data-slot="ABOUT_PARAGRAPH_2">
                Every technician is ASE certified. Every diagnostic is shown
                to you before we touch a wrench. Every repair leaves our
                shop with a 12-month warranty, written down, with your name
                on it.
              </p>
              <p data-slot="ABOUT_PARAGRAPH_3">
                {"{{TARGET_DESCRIPTION}}"} If that sounds like you, we will
                take good care of your vehicle.
              </p>
            </div>

            {/* Three stats. All agnostic to shop age. No "Years serving",
                no "Established 19XX", no generations. Service guarantees only. */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6 border-t border-black/15 pt-5 sm:pt-8"
            >
              <motion.div variants={staggerItem}>
                <StatBlock value="ASE" label="Certified technicians" />
              </motion.div>
              <motion.div variants={staggerItem}>
                <StatBlock value="OEM" label="Parts on every repair" tone="clay" />
              </motion.div>
              <motion.div variants={staggerItem}>
                <StatBlock value="12mo" label="Warranty on repairs" tone="secondary" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
