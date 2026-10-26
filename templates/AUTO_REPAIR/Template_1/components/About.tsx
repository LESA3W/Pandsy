"use client";

import { motion } from "framer-motion";
import { BayLabel } from "@/components/ui/BayLabel";
import {
  fadeLeft,
  fadeRight,
  stampIn,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function About() {
  return (
    <section
      id="about"
      className="relative border-y border-white/15 bg-black/90 py-7 sm:py-12 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <div className="grid items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image — corner-clipped frame, slight asymmetric offset */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
            className="relative"
          >
            <div className="relative aspect-[16/11] max-h-[220px] overflow-hidden border border-white/15 bg-black clip-corner sm:aspect-[4/3] sm:max-h-none md:aspect-[4/4] lg:aspect-[4/5]">
              <motion.img
                src="{{ABOUT}}"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={VP_ONCE}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            {/* Floating metadata badge */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={stampIn}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-4 -right-4 hidden border border-white/15 bg-black p-5 font-mono text-[10px] uppercase tracking-widest text-white md:block"
            >
              <div className="text-white/40">Established</div>
              <div className="mt-1 font-display text-3xl text-primary">
                LOCAL
              </div>
              <div className="mt-1 text-white/60">{"{{CITY}}"}, {"{{STATE}}"}</div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
          >
            <BayLabel n="05" title="ABOUT THE SHOP" meta="LOG-ENTRY 0042" hideOnMobile />
            <h2 className="mt-5 font-display text-3xl uppercase leading-[0.95] tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              Built by people who actually fix cars.
            </h2>

            <div
              data-slot="ABOUT_BODY"
              className="mt-5 space-y-3 font-sans text-sm leading-relaxed text-white/70 sm:mt-7 sm:space-y-4 sm:text-base"
            >
              <p>
                {"{{BUSINESS_NAME}}"} is a {"{{CITY}}"} {"{{BUSINESS_TYPE}}"}{" "}
                that treats every car like the one in its driveway. We built
                this shop on a simple idea: explain the problem in plain
                language, charge a fair price, and stand behind the work.
              </p>
              <p>
                Our customers are {"{{TARGET_DESCRIPTION}}"} People who don&rsquo;t
                want a sales pitch, just an honest answer and a vehicle that
                runs the way it should. Whether it&rsquo;s a routine oil change
                or a stubborn diagnostic that three other shops couldn&rsquo;t
                figure out, we take it on the same way.
              </p>
            </div>

            <motion.dl
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-6 grid grid-cols-3 gap-3 border-t border-white/15 pt-4 sm:mt-8 sm:gap-6 sm:pt-6 md:mt-10 md:pt-8"
            >
              <motion.div variants={staggerItem}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Certified
                </dt>
                <dd className="mt-2 font-display text-2xl text-white sm:text-3xl">100%</dd>
                <dd className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  ASE Techs
                </dd>
              </motion.div>
              <motion.div variants={staggerItem}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Warranty
                </dt>
                <dd className="mt-2 font-display text-2xl text-primary sm:text-3xl">12mo</dd>
                <dd className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Parts &amp; Labor
                </dd>
              </motion.div>
              <motion.div variants={staggerItem}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Local
                </dt>
                <dd className="mt-2 font-display text-2xl text-white sm:text-3xl">
                  {"{{CITY}}"}
                </dd>
                <dd className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Owner-Operated
                </dd>
              </motion.div>
            </motion.dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
